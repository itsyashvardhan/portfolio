import { jwtVerify } from 'jose'
import { NextResponse, type NextRequest } from 'next/server'

function getJwtSecret() {
    const secret = process.env.JWT_SECRET
    if (!secret) return null
    return new TextEncoder().encode(secret)
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow login page and auth API routes without session
    if (
        pathname === '/ssh/login' ||
        pathname.startsWith('/api/auth/')
    ) {
        return NextResponse.next()
    }

    const secret = getJwtSecret()
    if (!secret) {
        return NextResponse.next()
    }

    const token = request.cookies.get('session')?.value

    // Protected routes: /ssh/*, /verify/*
    if (pathname.startsWith('/ssh') || pathname.startsWith('/verify')) {
        if (!token) {
            return NextResponse.redirect(new URL('/ssh/login', request.url))
        }

        try {
            const { payload } = await jwtVerify(token, secret)

            // If user has MFA but hasn't verified, redirect to /verify
            // (except if already on /verify)
            if (!pathname.startsWith('/verify') && payload.mfaVerified === false) {
                // Check if user has TOTP enabled — we store this in the JWT
                // The session is created with mfaVerified=false when TOTP is enabled
                return NextResponse.redirect(new URL('/verify', request.url))
            }

            // If on /verify and already MFA verified, redirect to dashboard
            if (pathname.startsWith('/verify') && payload.mfaVerified === true) {
                return NextResponse.redirect(new URL('/ssh', request.url))
            }

            return NextResponse.next()
        } catch {
            // Invalid token — clear it and redirect to login
            const response = NextResponse.redirect(new URL('/ssh/login', request.url))
            response.cookies.set('session', '', { maxAge: 0, path: '/' })
            return response
        }
    }

    return NextResponse.next()
}

// Only run middleware on admin routes - public pages don't need auth
export const config = {
    matcher: [
        '/ssh/:path*',
        '/verify/:path*',
        '/api/auth/:path*',
    ],
}

