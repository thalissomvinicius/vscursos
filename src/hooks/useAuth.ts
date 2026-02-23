'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { isAdmin } from '@/lib/admin'
import { ROUTES } from '@/lib/constants'
import type { AuthUser } from '@/types'

interface UseAuthOptions {
    /** Where to redirect if not authenticated (default: /login) */
    redirectTo?: string
    /** If true, does not redirect on missing session */
    optional?: boolean
}

interface UseAuthReturn {
    user: AuthUser | null
    isLoading: boolean
    isAdmin: boolean
}

/**
 * Custom hook that loads the Supabase session and optionally redirects
 * unauthenticated users. Replaces the duplicated auth-check pattern
 * found in dashboard, modulo/[slug], certificado, prova, and admin pages.
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
    const { redirectTo = ROUTES.LOGIN, optional = false } = options
    const router = useRouter()

    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        async function loadAuth() {
            const {
                data: { user: authUser },
            } = await supabase.auth.getUser()

            if (!authUser) {
                if (!optional) {
                    router.push(redirectTo)
                }
                setIsLoading(false)
                return
            }

            setUser({
                id: authUser.id,
                email: authUser.email || '',
                name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
            })

            setAdmin(isAdmin(authUser.email, authUser.user_metadata))
            setIsLoading(false)
        }

        loadAuth()
    }, [router, redirectTo, optional])

    return { user, isLoading, isAdmin: admin }
}
