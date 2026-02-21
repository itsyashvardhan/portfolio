interface IndicMarkProps {
    className?: string
}

export function IndicMark({ className }: IndicMarkProps) {
    return (
        <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="indic-mark-grad" x1="24" y1="24" x2="96" y2="96" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#7DD3FC" />
                    <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
            </defs>

            <rect x="10" y="10" width="100" height="100" rx="24" stroke="#FFFFFF" strokeOpacity="0.14" />

            {/* Abstract Indic headline bar + stem geometry */}
            <path
                d="M30 42H90"
                stroke="url(#indic-mark-grad)"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M42 42V78"
                stroke="url(#indic-mark-grad)"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M42 64C42 55 49 48 58 48C66 48 72 53 72 61C72 70 66 76 57 76H48"
                stroke="url(#indic-mark-grad)"
                strokeWidth="4"
                strokeLinecap="round"
            />

            <circle cx="60" cy="60" r="36" stroke="#FFFFFF" strokeOpacity="0.08" />
        </svg>
    )
}
