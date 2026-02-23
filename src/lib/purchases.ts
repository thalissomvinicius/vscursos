// ─── Purchase & Email Helpers ──────────────────────────────────────
// Extracted from api/admin/users/route.ts for reusability and clarity.

import { getSupabaseAdmin } from '@/lib/supabase'
import nodemailer from 'nodemailer'
import {
    buildAdminWelcomeEmailHtml,
    buildAdminWelcomeEmailText,
    buildWelcomeEmailHtml,
    buildWelcomeEmailText,
} from '@/lib/email-templates'

// ─── Purchase Upsert ──────────────────────────────────────────────

interface UpsertPurchaseParams {
    supabase: ReturnType<typeof getSupabaseAdmin>
    userId: string
    email: string
    paid: boolean
}

export async function upsertPurchase(params: UpsertPurchaseParams): Promise<{ ok: boolean; error?: string }> {
    const payload = {
        email: params.email,
        user_id: params.userId,
        stripe_session_id: `admin-${Date.now()}`,
        stripe_customer_id: `manual-${params.userId}`,
        paid: params.paid,
    }

    const { data: existingByUser, error: findByUserError } = await params.supabase
        .from('purchases')
        .select('user_id, email')
        .eq('user_id', params.userId)
        .limit(1)

    if (findByUserError) {
        return { ok: false, error: findByUserError.message || 'Erro ao consultar acesso' }
    }

    if (existingByUser && existingByUser.length > 0) {
        const { error: updateError } = await params.supabase
            .from('purchases')
            .update(payload)
            .eq('user_id', params.userId)
        if (updateError) {
            return { ok: false, error: updateError.message || 'Erro ao atualizar acesso' }
        }
        return { ok: true }
    }

    if (params.email) {
        const { data: existingByEmail, error: findByEmailError } = await params.supabase
            .from('purchases')
            .select('user_id, email')
            .eq('email', params.email)
            .limit(1)

        if (findByEmailError) {
            return { ok: false, error: findByEmailError.message || 'Erro ao consultar acesso' }
        }

        if (existingByEmail && existingByEmail.length > 0) {
            const { error: updateByEmailError } = await params.supabase
                .from('purchases')
                .update(payload)
                .eq('email', params.email)
            if (updateByEmailError) {
                return { ok: false, error: updateByEmailError.message || 'Erro ao atualizar acesso' }
            }
            return { ok: true }
        }
    }

    const { error: insertError } = await params.supabase
        .from('purchases')
        .insert(payload)

    if (insertError) {
        return { ok: false, error: insertError.message || 'Erro ao liberar acesso' }
    }

    return { ok: true }
}

// ─── Welcome Email Sending ─────────────────────────────────────────

interface SendWelcomeEmailParams {
    to: string
    name: string
    password: string
    grantAccess: boolean
    adminEmail: string
    origin: string
    isAdminUser?: boolean
}

export async function sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<{ sent: boolean; error?: string }> {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 465)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !user || !pass) {
        return { sent: false, error: 'SMTP não configurado' }
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    })

    const fromAddress = process.env.SMTP_FROM || user
    const loginUrl = `${params.origin}/login`

    try {
        const subject = params.isAdminUser
            ? 'Acesso Administrativo - VS Cursos'
            : 'Bem-vindo à VS Cursos — Dados de acesso'

        const textContent = params.isAdminUser
            ? buildAdminWelcomeEmailText({
                name: params.name,
                email: params.to,
                password: params.password,
                loginUrl,
            })
            : buildWelcomeEmailText({
                name: params.name,
                email: params.to,
                password: params.password,
                loginUrl,
                grantAccess: params.grantAccess,
            })

        const htmlContent = params.isAdminUser
            ? buildAdminWelcomeEmailHtml({
                name: params.name,
                email: params.to,
                password: params.password,
                loginUrl,
            })
            : buildWelcomeEmailHtml({
                name: params.name,
                email: params.to,
                password: params.password,
                loginUrl,
                grantAccess: params.grantAccess,
            })

        await transporter.sendMail({
            from: `VS Cursos <${fromAddress}>`,
            to: params.to,
            replyTo: params.adminEmail,
            subject,
            text: textContent,
            html: htmlContent,
        })
        return { sent: true }
    } catch (error) {
        console.error('Error sending welcome email:', error)
        return { sent: false, error: 'Falha ao enviar e-mail' }
    }
}
