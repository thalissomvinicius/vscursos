import { getSupabaseAdmin } from '@/lib/supabase'
import { isAdmin } from '@/lib/admin'
import { upsertPurchase, sendWelcomeEmail } from '@/lib/purchases'
import { NextRequest, NextResponse } from 'next/server'

// ─── Admin Verification Helper ─────────────────────────────────────

async function verifyAdmin(req: NextRequest) {
    const email = req.headers.get('x-user-email')
    if (!email) return null
    if (isAdmin(email)) return email

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.auth.admin.listUsers()
    if (error) {
        console.error('Error checking admin user:', error)
        return null
    }
    const adminMatch = data.users.find(user => user.email?.toLowerCase() === email.toLowerCase())
    if (adminMatch && isAdmin(email, adminMatch.user_metadata)) return email
    return null
}

// ─── GET — List all users with access status ───────────────────────

export async function GET(req: NextRequest) {
    const adminEmail = await verifyAdmin(req)
    if (!adminEmail) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()

    try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

        if (authError) {
            console.error('Error listing users:', authError)
            return NextResponse.json({ error: 'Erro ao listar usuários' }, { status: 500 })
        }

        const { data: purchases } = await supabase
            .from('purchases')
            .select('user_id, email, paid')

        const users = authData.users.map(u => {
            const purchase = purchases?.find(p => p.user_id === u.id || p.email === u.email)
            return {
                id: u.id,
                email: u.email || '',
                name: u.user_metadata?.name || u.user_metadata?.full_name || '',
                created_at: u.created_at,
                has_access: purchase?.paid || false,
                is_admin: !!u.user_metadata?.is_admin,
            }
        })

        return NextResponse.json({ users })
    } catch (error) {
        console.error('Error in GET /api/admin/users:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// ─── POST — Create new user ────────────────────────────────────────

export async function POST(req: NextRequest) {
    const adminEmail = await verifyAdmin(req)
    if (!adminEmail) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()

    try {
        const { name, email, password, grantAccess, isAdminUser } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Senha deve ter no mínimo 6 caracteres' }, { status: 400 })
        }

        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name: name || '', is_admin: !!isAdminUser },
        })

        if (authError) {
            if (authError.message.includes('already been registered')) {
                return NextResponse.json({ error: 'Este e-mail já está cadastrado' }, { status: 400 })
            }
            console.error('Error creating user:', authError)
            return NextResponse.json({ error: authError.message }, { status: 500 })
        }

        if (!authUser?.user) {
            return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
        }

        let purchaseError: string | null = null
        if (grantAccess) {
            const purchaseResult = await upsertPurchase({
                supabase,
                userId: authUser.user.id,
                email,
                paid: true,
            })
            if (!purchaseResult.ok) {
                purchaseError = purchaseResult.error || 'Erro ao liberar acesso'
            }
        }

        const origin = new URL(req.url).origin
        const emailResult = await sendWelcomeEmail({
            to: email,
            name: name || '',
            password,
            grantAccess: !!grantAccess,
            adminEmail,
            origin,
            isAdminUser: !!isAdminUser,
        })

        console.log(`✅ User created by admin: ${email} (access: ${grantAccess ? 'yes' : 'no'})`)

        return NextResponse.json({
            user: {
                id: authUser.user.id,
                email,
                name: name || '',
                created_at: authUser.user.created_at,
                has_access: !!grantAccess && !purchaseError,
            },
            email_sent: emailResult.sent,
            email_error: emailResult.sent ? null : emailResult.error,
            purchase_error: purchaseError,
        })
    } catch (error) {
        console.error('Error in POST /api/admin/users:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// ─── PATCH — Toggle access ─────────────────────────────────────────

export async function PATCH(req: NextRequest) {
    const adminEmail = await verifyAdmin(req)
    if (!adminEmail) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()

    try {
        const { userId, email, grantAccess } = await req.json()

        if (!userId) {
            return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 })
        }

        if (grantAccess) {
            const purchaseResult = await upsertPurchase({
                supabase,
                userId,
                email: email || '',
                paid: true,
            })
            if (!purchaseResult.ok) {
                return NextResponse.json({ error: purchaseResult.error || 'Erro ao liberar acesso' }, { status: 500 })
            }
        } else {
            const { data: revokedByUser, error: revokeError } = await supabase
                .from('purchases')
                .update({ paid: false })
                .eq('user_id', userId)
                .select('user_id')
            if (revokeError) {
                return NextResponse.json({ error: 'Erro ao revogar acesso' }, { status: 500 })
            }
            if ((!revokedByUser || revokedByUser.length === 0) && email) {
                const { error: revokeByEmailError } = await supabase
                    .from('purchases')
                    .update({ paid: false })
                    .eq('email', email)
                if (revokeByEmailError) {
                    return NextResponse.json({ error: 'Erro ao revogar acesso' }, { status: 500 })
                }
            }
        }

        console.log(`✅ Access ${grantAccess ? 'granted' : 'revoked'} for user ${userId}`)

        return NextResponse.json({ success: true, has_access: grantAccess })
    } catch (error) {
        console.error('Error in PATCH /api/admin/users:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// ─── DELETE — Remove user ──────────────────────────────────────────

export async function DELETE(req: NextRequest) {
    const adminEmail = await verifyAdmin(req)
    if (!adminEmail) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()

    try {
        const { userId } = await req.json()

        if (!userId) {
            return NextResponse.json({ error: 'userId é obrigatório' }, { status: 400 })
        }

        // Security check: Protect main admin
        const { data: userToDelete, error: fetchError } = await supabase.auth.admin.getUserById(userId)
        if (fetchError || !userToDelete?.user) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
        }

        if (userToDelete.user.email === 'thalissomvinicius7@gmail.com') {
            return NextResponse.json({ error: 'Ação não permitida: Este é o administrador principal.' }, { status: 403 })
        }

        // Delete purchase record
        await supabase.from('purchases').delete().eq('user_id', userId)

        // Delete progress records
        await supabase.from('progress').delete().eq('user_id', userId)

        // Delete from Supabase Auth
        const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)

        if (deleteError) {
            console.error('Error deleting user:', deleteError)
            return NextResponse.json({ error: 'Erro ao excluir usuário' }, { status: 500 })
        }

        console.log(`✅ User deleted: ${userId}`)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error in DELETE /api/admin/users:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}
