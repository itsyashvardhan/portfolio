'use client'

import { useAudio } from '@/context/audio-context'

interface AudioPlayerProps {
    slug: string
    title: string
}

export function AudioPlayer({ slug, title }: AudioPlayerProps) {
    const { state, track, progress, duration, load, seek } = useAudio()

    const isThis = track?.slug === slug
    const activeState = isThis ? state : 'idle'
    const activeProgress = isThis ? progress : 0
    const activeDuration = isThis ? duration : 0

    const fmt = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isThis || !activeDuration) return
        const rect = e.currentTarget.getBoundingClientRect()
        seek((e.clientX - rect.left) / rect.width)
    }

    const pct = activeDuration ? (activeProgress / activeDuration) * 100 : 0

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            marginBottom: '32px',
            userSelect: 'none',
        }}>
            {/* Play/Pause */}
            <button
                onClick={() => load(slug, title)}
                disabled={activeState === 'loading'}
                aria-label={activeState === 'playing' ? 'Pause' : 'Listen hands-free'}
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    background: activeState === 'playing' ? 'var(--color-text)' : 'transparent',
                    color: activeState === 'playing' ? 'var(--color-bg)' : 'var(--color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: activeState === 'loading' ? 'wait' : 'pointer',
                    flexShrink: 0,
                    transition: 'background 200ms ease, color 200ms ease',
                }}
            >
                {activeState === 'loading' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                ) : activeState === 'playing' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                    </svg>
                ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                    </svg>
                )}
            </button>

            {/* Label */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Listen hands-free
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                    {activeState === 'error' ? 'unavailable' : activeState === 'loading' ? 'loading...' : activeDuration ? fmt(activeDuration) : 'continues while you browse'}
                </span>
            </div>

            {/* Progress bar */}
            {(isThis && (activeState !== 'idle' && activeState !== 'error')) && (
                <div
                    onClick={handleSeek}
                    style={{
                        flex: 1,
                        height: '3px',
                        background: 'var(--color-border)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        position: 'relative',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        left: 0, top: 0,
                        height: '100%',
                        width: `${pct}%`,
                        background: 'var(--color-text)',
                        borderRadius: '2px',
                        transition: 'width 0.1s linear',
                    }}/>
                </div>
            )}

            {/* Time */}
            {isThis && activeDuration > 0 && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                    {fmt(activeProgress)} / {fmt(activeDuration)}
                </span>
            )}
        </div>
    )
}
