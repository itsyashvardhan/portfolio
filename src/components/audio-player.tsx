'use client'

import { useAudio } from '@/context/audio-context'

interface AudioPlayerProps {
    slug: string
    title: string
}

export function AudioPlayer({ slug, title }: AudioPlayerProps) {
    const { state, track, progress, duration, load, seek, skip } = useAudio()

    const isThis = track?.slug === slug
    const activeState = isThis ? state : 'idle'
    const activeProgress = isThis ? progress : 0
    const activeDuration = isThis ? duration : 0

    const fmt = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const pct = activeDuration ? (activeProgress / activeDuration) * 100 : 0
    const isLoaded = isThis && activeDuration > 0
    const isActive = isThis && (activeState === 'playing' || activeState === 'paused' || activeState === 'loading')

    return (
        <div style={{
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            marginBottom: '32px',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>
            {/* Top row: button + label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Play/Pause */}
                <button
                    onClick={() => load(slug, title)}
                    disabled={activeState === 'loading'}
                    aria-label={activeState === 'playing' ? 'Pause' : 'Listen hands-free'}
                    style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        border: '1px solid var(--color-border)',
                        background: activeState === 'playing' ? 'var(--color-text)' : 'transparent',
                        color: activeState === 'playing' ? 'var(--color-bg)' : 'var(--color-text)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Listen hands-free
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                        {activeState === 'error'
                            ? 'unavailable'
                            : activeState === 'loading'
                            ? 'enriching audio experience…'
                            : isLoaded
                            ? `${fmt(activeProgress)} / ${fmt(activeDuration)}`
                            : 'continues while you browse'}
                    </span>
                </div>

                {/* Skip controls — only when loaded */}
                {isLoaded && (
                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button
                            onClick={() => skip(-10)}
                            aria-label="Back 10 seconds"
                            title="−10s"
                            style={skipBtnStyle}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5V1L7 6l5 5V7a7 7 0 1 1-7 7h-2a9 9 0 1 0 9-9z"/>
                                <text x="8" y="17" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">10</text>
                            </svg>
                        </button>
                        <button
                            onClick={() => skip(10)}
                            aria-label="Forward 10 seconds"
                            title="+10s"
                            style={skipBtnStyle}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5V1l5 5-5 5V7a7 7 0 1 0 7 7h2a9 9 0 1 1-9-9z"/>
                                <text x="8" y="17" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">10</text>
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Slider — only when active */}
            {isActive && (
                <>
                    <style>{sliderCss}</style>
                    <input
                        type="range"
                        min={0}
                        max={activeDuration || 100}
                        value={activeProgress}
                        step={0.5}
                        onChange={(e) => {
                            if (activeDuration) seek(parseFloat(e.target.value) / activeDuration)
                        }}
                        aria-label="Seek"
                        className="audio-seek-slider"
                        style={{ width: '100%', accentColor: 'var(--color-text)' }}
                    />
                </>
            )}
        </div>
    )
}

const skipBtnStyle: React.CSSProperties = {
    width: '28px', height: '28px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
}

const sliderCss = `
.audio-seek-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 3px;
    border-radius: 2px;
    background: var(--color-border);
    outline: none;
    cursor: pointer;
}
.audio-seek-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--color-text);
    cursor: pointer;
}
.audio-seek-slider::-moz-range-thumb {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--color-text);
    border: none;
    cursor: pointer;
}
`
