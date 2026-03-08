'use client'

export function LotusMandala({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 1000 510"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            preserveAspectRatio="xMidYMax meet"
        >
            {/* Center is now EXACTLY at bottom edge */}
            <g transform="translate(500, 510)">

                {/* Center semicircles */}
                <circle r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.30" />
                <circle r="32" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />

                {/* Middle petals — 12 */}
                {Array.from({ length: 60 }).map((_, i) => (
                    <g key={`mid-${i}`} transform={`rotate(${i * 30})`}>
                        <path
                            d="M0,-50 C30,-110 55,-200 0,-300 C-55,-200 -30,-110 0,-50Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.34"
                            fill="none"
                        />
                    </g>
                ))}

                {/* Accent dots */}
                {Array.from({ length: 16 }).map((_, i) => (
                    <g key={`dot-${i}`} transform={`rotate(${i * 30})`}>
                        <circle
                            cx="0"
                            cy="-65"
                            r="2.5"
                            fill="currentColor"
                            opacity="0.2"
                        />
                    </g>
                ))}
            </g>
        </svg>
    )
}
