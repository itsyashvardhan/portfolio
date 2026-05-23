'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
    slug: string
}

export function AudioPlayer({ slug }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle')
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const fmt = (s: number) => {
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const load = async () => {
        if (audioUrl) {
            toggle()
            return
        }
        setState('loading')
        try {
            const res = await fetch(`/api/blog/${slug}/audio`)
            if (!res.ok) throw new Error('failed')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
            setState('playing')
        } catch {
            setState('error')
        }
    }

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play()
            setState('playing')
        } else {
            audio.pause()
            setState('paused')
        }
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !audioUrl) return
        audio.src = audioUrl
        audio.play().then(() => setState('playing')).catch(() => setState('paused'))
        const onTime = () => setProgress(audio.currentTime)
        const onLoad = () => setDuration(audio.duration)
        const onEnd = () => setState('paused')
        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('loadedmetadata', onLoad)
        audio.addEventListener('ended', onEnd)
        return () => {
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('loadedmetadata', onLoad)
            audio.removeEventListener('ended', onEnd)
        }
    }, [audioUrl])

    useEffect(() => {
        return () => { if (audioUrl) URL.revokeObjectURL(audioUrl) }
    }, [audioUrl])

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current
        if (!audio || !duration) return
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        audio.currentTime = ratio * duration
    }

    const pct = duration ? (progress / duration) * 100 : 0

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
            <audio ref={audioRef} preload="none" />

            {/* Play/Pause button */}
            <button
                onClick={load}
                disabled={state === 'loading'}
                aria-label={state === 'playing' ? 'Pause audio' : 'Play audio'}
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    background: state === 'playing' ? 'var(--color-text)' : 'transparent',
                    color: state === 'playing' ? 'var(--color-bg)' : 'var(--color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: state === 'loading' ? 'wait' : 'pointer',
                    flexShrink: 0,
                    transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease',
                }}
            >
                {state === 'loading' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                ) : state === 'playing' ? (
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
                    Audio
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                    {state === 'error' ? 'unavailable' : state === 'loading' ? 'loading...' : duration ? fmt(duration) : 'listen'}
                </span>
            </div>

            {/* Progress bar */}
            {(audioUrl || state === 'loading') && (
                <div
                    onClick={seek}
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
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${pct}%`,
                        background: 'var(--color-text)',
                        borderRadius: '2px',
                        transition: 'width 0.1s linear',
                    }}/>
                </div>
            )}

            {/* Time */}
            {audioUrl && duration > 0 && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                    {fmt(progress)} / {fmt(duration)}
                </span>
            )}

            {/* Voice tag */}
            <span style={{ fontSize: '9px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>
                {state === 'error' ? '' : 'ElevenLabs · River'}
            </span>
        </div>
    )
}
