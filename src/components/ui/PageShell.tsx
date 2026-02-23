import { type ReactNode } from 'react'
import Navbar from '@/components/Navbar'

interface PageShellProps {
    children: ReactNode
    /** Whether to show the logged-in variant of the navbar */
    isLoggedIn?: boolean
    /** Extra classes for the outer wrapper */
    className?: string
}

/**
 * Shared page wrapper used by all authenticated pages.
 * Provides consistent Navbar + layout structure.
 */
export default function PageShell({
    children,
    isLoggedIn = false,
    className = '',
}: PageShellProps) {
    return (
        <div className={`min-h-screen bg-slate-50 ${className}`}>
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="pt-24 pb-16 px-4">{children}</main>
        </div>
    )
}
