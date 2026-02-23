import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Loading state — shows spinner and disables */
    loading?: boolean
    /** Label while in loading state */
    loadingLabel?: string
    /** Button content */
    children: ReactNode
    /** Visual variant */
    variant?: 'primary' | 'danger' | 'success'
    /** Additional CSS classes */
    className?: string
}

const VARIANT_CLASSES: Record<string, string> = {
    primary:
        'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-200/50',
    danger:
        'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200/50',
    success:
        'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-200/50',
}

export default function GradientButton({
    loading = false,
    loadingLabel = 'Aguarde...',
    children,
    variant = 'primary',
    className = '',
    disabled,
    ...rest
}: GradientButtonProps) {
    const isDisabled = disabled || loading

    return (
        <button
            disabled={isDisabled}
            className={`text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
            {...rest}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    {loadingLabel}
                </span>
            ) : (
                children
            )}
        </button>
    )
}
