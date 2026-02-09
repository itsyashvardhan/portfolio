import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { adminUsers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getJwtSecret() {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET environment variable is required')
    return new TextEncoder().encode(secret)
}

export interface SessionPayload {
    userId: string
    email: string
    mfaVerified: boolean
}

export async function createSession(payload: SessionPayload): Promise<void> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_MAX_AGE}s`)
        .sign(getJwtSecret())

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    })
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, getJwtSecret())
        return payload as unknown as SessionPayload
    } catch {
        return null
    }
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    })
}

export async function verifyPassword(password: string) {
    const users = await db
        .select()
        .from(adminUsers)
        .limit(1)

    if (users.length === 0) return null

    for (const user of users) {
        const valid = await bcrypt.compare(password, user.password_hash)
        if (valid) return user
    }

    return null
}

export async function requireAuth(): Promise<SessionPayload> {
    const session = await getSession()
    if (!session) {
        throw new Error('Unauthorized')
    }
    return session
}

export async function requireFullAuth(): Promise<SessionPayload> {
    const session = await requireAuth()

    // Check if user has TOTP enabled but hasn't verified yet
    const [user] = await db
        .select({ totp_enabled: adminUsers.totp_enabled })
        .from(adminUsers)
        .where(eq(adminUsers.id, session.userId))
        .limit(1)

    if (user?.totp_enabled && !session.mfaVerified) {
        throw new Error('MFA required')
    }

    return session
}
