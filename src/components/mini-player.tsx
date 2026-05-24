'use client'

import { useAudio } from '@/context/audio-context'
import { usePathname } from 'next/navigation'

export function MiniPlayer() {
    const { state, track, progress, duration, toggle, seek, skip } = useAudio()
    const pathname = usePathname()

    const isOnSourcePage = track ? pathname === `/blog/${track.slug}` : false
    const isActive = state === 'playing' || state === 'paused'

    if (!isActive || !track || isOnSourcePage) return null

    const fmt = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
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
                    from { opacity:0; transform:translateY(12px) scale(0.97); }
                    to   { opacity:1; transform:translateY(0) scale(1); }
                }
                .mini-slider {
                    -webkit-appearance:none; appearance:none;
                    height:3px; border-radius:2px;
                    background:var(--color-border); outline:none; cursor:pointer; width:100%;
                }
                .mini-slider::-webkit-slider-thumb {
                    -webkit-appearance:none; appearance:none;
                    width:10px; height:10px; border-radius:50%;
                    background:var(--color-text); cursor:pointer;
                }
                .mini-slider::-moz-range-thumb {
                    width:10px; height:10px; border-radius:50%;
                    background:var(--color-text); border:none; cursor:pointer;
                }
            `}</style>

            {/* Title + controls row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Artwork dot */}
                <div style={{
                    width: '30px', height: '30px', borderRadius: '6px', flexShrink: 0,
                    background: state === 'playing' ? 'var(--color-text)' : 'var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 200ms ease',
                }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={state === 'playing' ? 'var(--color-bg)' : 'var(--color-text-tertiary)'}>
                        {state === 'playing'
                            ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                            : <polygon points="5,3 19,12 5,21"/>
                        }
                    </svg>
                </div>

                {/* Title + time */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {track.title}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                        {duration > 0 ? `${fmt(progress)} / ${fmt(duration)}` : 'loading…'}
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => skip(-10)} aria-label="-10s" style={miniBtn}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 5V1L6 6l5 5V7a6 6 0 1 1-6 6H3a9 9 0 1 0 9-9z"/>
                        </svg>
                    </button>
                    <button onClick={toggle} aria-label={state === 'playing' ? 'Pause' : 'Play'} style={miniBtn}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            {state === 'playing'
                                ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                                : <polygon points="5,3 19,12 5,21"/>
                            }
                        </svg>
                    </button>
                    <button onClick={() => skip(10)} aria-label="+10s" style={miniBtn}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M13 5V1l5 5-5 5V7a6 6 0 1 0 6 6h2a9 9 0 1 1-9-9z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Seek slider */}
            <input
                type="range"
                min={0}
                max={duration || 100}
                value={progress}
                step={0.5}
                onChange={(e) => { if (duration) seek(parseFloat(e.target.value) / duration) }}
                aria-label="Seek"
                className="mini-slider"
                style={{ accentColor: 'var(--color-text)' }}
            />
        </div>
    )
}

const miniBtn: React.CSSProperties = {
    width: '26px', height: '26px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    color: 'var(--color-text)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', padding: 0,
}
