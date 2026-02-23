'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MODULE_SLUGS, CORE_MODULE_SLUGS } from '@/lib/constants'

interface UseProgressReturn {
    /** List of completed module slugs */
    completedModules: string[]
    /** Set of completed slugs for quick lookups */
    completedSet: Set<string>
    /** Whether all 5 content modules are completed */
    allModulesCompleted: boolean
    /** Whether all modules + prova-final are completed */
    allCompleted: boolean
    /** Loading state */
    isLoading: boolean
    /** Manually refresh progress */
    refresh: () => Promise<void>
}

/**
 * Custom hook that fetches and caches module progress for a user.
 * Replaces duplicated progress-fetching logic in dashboard and prova pages.
 */
export function useProgress(userId: string | null | undefined): UseProgressReturn {
    const [completedModules, setCompletedModules] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const completedSet = new Set(completedModules)
    const allModulesCompleted = CORE_MODULE_SLUGS.every((slug) => completedSet.has(slug))
    const allCompleted = MODULE_SLUGS.every((slug) => completedSet.has(slug))

    async function fetchProgress() {
        if (!userId) {
            setIsLoading(false)
            return
        }

        const { data } = await supabase
            .from('progress')
            .select('module_slug')
            .eq('user_id', userId)
            .eq('completed', true)

        setCompletedModules(data?.map((item) => item.module_slug) || [])
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProgress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    return {
        completedModules,
        completedSet,
        allModulesCompleted,
        allCompleted,
        isLoading,
        refresh: fetchProgress,
    }
}
