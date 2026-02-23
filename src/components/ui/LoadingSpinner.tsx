interface LoadingSpinnerProps {
    /** Size class for width/height (default: 'w-10 h-10') */
    size?: string
    /** Optional label displayed below the spinner */
    label?: string
    /** Whether to render as a full-screen centered layout */
    fullScreen?: boolean
}

export default function LoadingSpinner({
    size = 'w-10 h-10',
    label,
    fullScreen = false,
}: LoadingSpinnerProps) {
    const spinner = (
        <div className="text-center">
            <div
                className={`${size} border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto${label ? ' mb-4' : ''}`}
            />
            {label && <p className="text-slate-400 font-medium">{label}</p>}
        </div>
    )

    if (fullScreen) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                {spinner}
            </div>
        )
    }

    return spinner
}
