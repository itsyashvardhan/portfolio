import { NextRequest, NextResponse } from 'next/server'
import { getSession, createSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { adminUsers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import * as totp from '@/lib/totp'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const TOTP_RATE_LIMIT = { maxAttempts: 5, windowSeconds: 5 * 60 } // 5 attempts per 5 min

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = getClientIp(request.headers)
        const limiter = rateLimit(`totp:${ip}`, TOTP_RATE_LIMIT)

        if (!limiter.success) {
            const retryAfter = Math.ceil((limiter.resetAt - Date.now()) / 1000)
            return NextResponse.json(
                { error: 'Too many verification attempts. Please try again later.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(retryAfter) },
                }
            )
        }

        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const { code } = await request.json()
        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 })
        }

        const [user] = await db
            .select({ totp_secret: adminUsers.totp_secret })
            .from(adminUsers)
            .where(eq(adminUsers.id, session.userId))
            .limit(1)

        if (!user?.totp_secret) {
            return NextResponse.json({ error: 'TOTP not configured' }, { status: 400 })
        }

        const isValid = await totp.verify(user.totp_secret, code)

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
        }

        await createSession({
            userId: session.userId,
            email: session.email,
            mfaVerified: true,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('TOTP verify error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
