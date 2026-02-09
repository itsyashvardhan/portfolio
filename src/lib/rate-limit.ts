/**
 * Simple in-memory rate limiter for serverless environments.
 * Uses a sliding window approach with automatic cleanup.
 *
 * Note: In a multi-instance deployment (e.g., Vercel), each instance
 * has its own memory, so this provides per-instance rate limiting.
 * For stricter limits, consider Vercel KV or Upstash Redis.
 */

interface RateLimitEntry {
    count: number
    resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
    const now = Date.now()
    if (now - lastCleanup < CLEANUP_INTERVAL) return
    lastCleanup = now

    for (const [key, entry] of store) {
        if (now > entry.resetAt) {
            store.delete(key)
        }
    }
}

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    maxAttempts: number
    /** Window duration in seconds */
    windowSeconds: number
}

export interface RateLimitResult {
    success: boolean
    remaining: number
    resetAt: number
}

/**
 * Check and consume a rate limit token for the given key.
 */
export function rateLimit(
    key: string,
    config: RateLimitConfig
): RateLimitResult {
    cleanup()

    const now = Date.now()
    const windowMs = config.windowSeconds * 1000
    const entry = store.get(key)

    // No existing entry or window expired — start fresh
    if (!entry || now > entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs })
        return {
            success: true,
            remaining: config.maxAttempts - 1,
            resetAt: now + windowMs,
        }
    }

    // Within window — check limit
    if (entry.count >= config.maxAttempts) {
        return {
            success: false,
            remaining: 0,
            resetAt: entry.resetAt,
        }
    }

    // Increment and allow
    entry.count++
    return {
        success: true,
        remaining: config.maxAttempts - entry.count,
        resetAt: entry.resetAt,
    }
}

/**
 * Get a rate limit key from a request's IP address.
 * Falls back to a generic key if IP can't be determined.
 */
export function getClientIp(headers: Headers): string {
    return (
        headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headers.get('x-real-ip') ||
        'unknown'
    )
}
