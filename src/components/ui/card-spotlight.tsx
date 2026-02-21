'use client'

import type { ReactNode } from 'react'
import styles from './card-spotlight.module.css'

interface CardSpotlightProps {
    className?: string
    children: ReactNode
}

export function CardSpotlight({ className = '', children }: CardSpotlightProps) {
    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        event.currentTarget.style.setProperty('--spotlight-x', `${x}px`)
        event.currentTarget.style.setProperty('--spotlight-y', `${y}px`)
    }

    return (
        <div
            className={`${styles.spotlight} ${className}`.trim()}
            onPointerMove={handlePointerMove}
        >
            <div className={styles.content}>{children}</div>
        </div>
    )
}
