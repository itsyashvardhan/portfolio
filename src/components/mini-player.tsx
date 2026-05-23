'use client'

import { useAudio } from '@/context/audio-context'
import { usePathname } from 'next/navigation'

export function MiniPlayer() {
    const { state, track, progress, duration, toggle, seek } = useAudio()
    const pathname = usePathname()

    // Only show when audio is active and user has navigated away from the source post
    const isOnSourcePage = track ? pathname === `/blog/${track.slug}` : false
    const isActive = state === 'playing' || state === 'paused'

    if (!isActive || !track || isOnSourcePage) return null

    const fmt = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const pct = duration ? (progress / duration) * 100 : 0

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        seek((e.clientX - rect.left) / rect.width)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '300px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            userSelect: 'none',
            animation: 'miniPlayerIn 220ms cubic-bezier(0.16,1,0.3,1)',
        }}>
            <style>{`
                @keyframes miniPlayerIn {
                    from { opacity: 0; transform: translateY(12px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>

            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: '32px', height: '32px',
                    borderRadius: '6px',
                    background: state === 'playing' ? 'var(--color-text)' : 'var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 200ms ease',
                }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={state === 'playing' ? 'var(--color-bg)' : 'var(--color-text-tertiary)'}>
                        {state === 'playing'
                            ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                            : <polygon points="5,3 19,12 5,21"/>
                        }
                    </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {track.title}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                        {duration > 0 ? `${fmt(progress)} / ${fmt(duration)}` : 'loading…'}
                    </div>
                </div>
                <button
                    onClick={toggle}
                    aria-label={state === 'playing' ? 'Pause' : 'Resume'}
                    style={{
                        width: '28px', height: '28px',
                        borderRadius: '50%',
                        border: '1px solid var(--color-border)',
                        background: 'transparent',
                        color: 'var(--color-text)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        {state === 'playing'
                            ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                            : <polygon points="5,3 19,12 5,21"/>
                        }
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <div
                onClick={handleSeek}
                style={{
                    width: '100%',
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
        </div>
    )
}
