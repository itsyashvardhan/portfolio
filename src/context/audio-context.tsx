'use client'

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

type AudioState = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

interface AudioTrack {
    slug: string
    title: string
}

interface AudioContextValue {
    state: AudioState
    track: AudioTrack | null
    progress: number
    duration: number
    load: (slug: string, title: string) => void
    toggle: () => void
    seek: (ratio: number) => void
    skip: (seconds: number) => void
    preload: (slug: string) => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

export function useAudio() {
    const ctx = useContext(AudioCtx)
    if (!ctx) throw new Error('useAudio must be used inside AudioProvider')
    return ctx
}

function apiUrl(slug: string) {
    return `/api/blog/${slug}/audio`
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [state, setState] = useState<AudioState>('idle')
    const [track, setTrack] = useState<AudioTrack | null>(null)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (audioRef.current) return
        const audio = new Audio()
        audio.preload = 'none'
        audioRef.current = audio

        const onTime  = () => setProgress(audio.currentTime)
        const onMeta  = () => setDuration(audio.duration)
        const onEnd   = () => setState('paused')
        const onError = () => setState('error')
        // When enough data is buffered to start playing, clear loading state
        const onCanPlay = () => {
            setState(prev => prev === 'loading' ? 'paused' : prev)
        }

        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('loadedmetadata', onMeta)
        audio.addEventListener('ended', onEnd)
        audio.addEventListener('error', onError)
        audio.addEventListener('canplay', onCanPlay)

        return () => {
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('loadedmetadata', onMeta)
            audio.removeEventListener('ended', onEnd)
            audio.removeEventListener('error', onError)
            audio.removeEventListener('canplay', onCanPlay)
            audio.pause()
        }
    }, [])

    // Preload: set src + buffer silently so play is instant
    const preload = useCallback((slug: string) => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.src.endsWith(apiUrl(slug))) return  // already set
        audio.src = apiUrl(slug)
        audio.preload = 'auto'
        // Don't play — just let the browser buffer
    }, [])

    const load = useCallback((slug: string, title: string) => {
        const audio = audioRef.current
        if (!audio) return

        // Same track — toggle play/pause
        if (track?.slug === slug) {
            if (audio.paused) {
                audio.play().catch(() => setState('error'))
                setState('playing')
            } else {
                audio.pause()
                setState('paused')
            }
            return
        }

        // New track — src may already be preloaded or needs setting
        if (!audio.src.endsWith(apiUrl(slug))) {
            audio.src = apiUrl(slug)
            audio.preload = 'auto'
        }

        setTrack({ slug, title })
        setProgress(0)
        setDuration(0)
        setState('loading')

        // play() will succeed once enough is buffered; browser shows loading state meanwhile
        audio.play()
            .then(() => {
                setState('playing')
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title,
                        artist: 'Yashvardhan Singh',
                        album: 'yashvardhan.dev',
                    })
                    navigator.mediaSession.setActionHandler('play',  () => { audio.play(); setState('playing') })
                    navigator.mediaSession.setActionHandler('pause', () => { audio.pause(); setState('paused') })
                    navigator.mediaSession.setActionHandler('seekto', (d) => {
                        if (d.seekTime != null) audio.currentTime = d.seekTime
                    })
                }
            })
            .catch(() => setState('error'))
    }, [track])

    const toggle = useCallback(() => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().catch(() => setState('error'))
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

    const skip = useCallback((seconds: number) => {
        const audio = audioRef.current
        if (!audio) return
        audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds))
    }, [])

    return (
        <AudioCtx.Provider value={{ state, track, progress, duration, load, toggle, seek, skip, preload }}>
            {children}
        </AudioCtx.Provider>
    )
}
