import { type ReactNode } from 'react'

type BadgeType = 'success' | 'error' | 'warning' | 'info'

interface StatusBadgeProps {
    type: BadgeType
    children: ReactNode
    className?: string
}

const STYLES: Record<BadgeType, string> = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-500',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
}

export default function StatusBadge({ type, children, className = '' }: StatusBadgeProps) {
    return (
        <div
            className={`border rounded-lg p-3 text-sm text-center ${STYLES[type]} ${className}`}
        >
            {children}
        </div>
    )
}
