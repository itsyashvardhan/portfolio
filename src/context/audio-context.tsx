'use client'

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

type AudioState = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

interface AudioTrack {
    slug: string
    title: string
    url: string
}

interface AudioContextValue {
    state: AudioState
    track: AudioTrack | null
    progress: number
    duration: number
    load: (slug: string, title: string) => Promise<void>
    toggle: () => void
    seek: (ratio: number) => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

export function useAudio() {
    const ctx = useContext(AudioCtx)
    if (!ctx) throw new Error('useAudio must be used inside AudioProvider')
    return ctx
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [state, setState] = useState<AudioState>('idle')
    const [track, setTrack] = useState<AudioTrack | null>(null)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    // Stable audio element — created once, never torn down
    useEffect(() => {
        if (audioRef.current) return
        const audio = new Audio()
        audio.preload = 'none'
        audioRef.current = audio

        const onTime = () => setProgress(audio.currentTime)
        const onMeta = () => setDuration(audio.duration)
        const onEnd = () => setState('paused')
        const onError = () => setState('error')

        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('loadedmetadata', onMeta)
        audio.addEventListener('ended', onEnd)
        audio.addEventListener('error', onError)

        return () => {
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('loadedmetadata', onMeta)
            audio.removeEventListener('ended', onEnd)
            audio.removeEventListener('error', onError)
            audio.pause()
        }
    }, [])

    const load = useCallback(async (slug: string, title: string) => {
        const audio = audioRef.current
        if (!audio) return

        // Already loaded — just toggle
        if (track?.slug === slug) {
            if (audio.paused) {
                audio.play().catch(() => setState('paused'))
                setState('playing')
            } else {
                audio.pause()
                setState('paused')
            }
            return
        }

        setState('loading')
        try {
            const res = await fetch(`/api/blog/${slug}/audio`)
            if (!res.ok) throw new Error('fetch failed')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)

            // Revoke previous object URL
            if (track?.url) URL.revokeObjectURL(track.url)

            audio.src = url
            setTrack({ slug, title, url })
            setProgress(0)
            setDuration(0)

            await audio.play()
            setState('playing')

            // Media Session API — shows in OS/browser media controls
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title,
                    artist: 'Yashvardhan Singh',
                    album: 'yashvardhan.dev',
                })
                navigator.mediaSession.setActionHandler('play', () => { audio.play(); setState('playing') })
                navigator.mediaSession.setActionHandler('pause', () => { audio.pause(); setState('paused') })
                navigator.mediaSession.setActionHandler('seekto', (d) => {
                    if (d.seekTime != null) audio.currentTime = d.seekTime
                })
            }
        } catch {
            setState('error')
        }
    }, [track])

    const toggle = useCallback(() => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().catch(() => setState('paused'))
            setState('playing')
        } else {
            audio.pause()
            setState('paused')
        }
    }, [])

    const seek = useCallback((ratio: number) => {
        const audio = audioRef.current
        if (!audio || !duration) return
        audio.currentTime = ratio * duration
    }, [duration])

    return (
        <AudioCtx.Provider value={{ state, track, progress, duration, load, toggle, seek }}>
            {children}
        </AudioCtx.Provider>
    )
}
