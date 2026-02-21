'use client'

import { useState } from 'react'

type ShareLinkProps = {
    url: string
    className?: string
}

export function ShareLink({ url, className }: ShareLinkProps) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'shared'>('idle')

    const setTransientStatus = (nextStatus: 'copied' | 'shared') => {
        setStatus(nextStatus)
        window.setTimeout(() => setStatus('idle'), 1600)
    }

    const onShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ url, title: 'India AI Directory' })
                setTransientStatus('shared')
                return
            }

            await navigator.clipboard.writeText(url)
            setTransientStatus('copied')
        } catch {
            // Intentionally silent: canceled share should not show an error.
        }
    }

    const labelMap = {
        idle: 'Share this page',
        copied: 'Link copied',
        shared: 'Shared',
    } as const

    const statusLabel = labelMap[status]

    return (
        <button
            type="button"
            onClick={onShare}
            className={className}
            data-status={status}
            aria-label={statusLabel}
            title={statusLabel}
        >
            {status === 'idle' && (
                <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                    <path d="M12 16V4" />
                    <path d="m7 9 5-5 5 5" />
                </svg>
            )}

            {status !== 'idle' && <span aria-hidden="true">✓</span>}
        </button>
    )
}
