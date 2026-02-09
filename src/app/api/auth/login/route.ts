import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession } from '@/lib/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const LOGIN_RATE_LIMIT = { maxAttempts: 5, windowSeconds: 15 * 60 } // 5 attempts per 15 min

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = getClientIp(request.headers)
        const limiter = rateLimit(`login:${ip}`, LOGIN_RATE_LIMIT)

        if (!limiter.success) {
            const retryAfter = Math.ceil((limiter.resetAt - Date.now()) / 1000)
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(retryAfter) },
                }
            )
        }

        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { error: 'Password is required' },
                { status: 400 }
            )
        }

        const user = await verifyPassword(password)

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Check if user has TOTP enabled
        const needsMfa = user.totp_enabled || false

        await createSession({
            userId: user.id,
            email: user.email,
            mfaVerified: !needsMfa, // true if no TOTP, false if TOTP enabled
        })

        return NextResponse.json({
            success: true,
            needsMfa,
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
