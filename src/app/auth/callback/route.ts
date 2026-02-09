import { NextResponse } from 'next/server'

// OAuth callback is no longer used with Neon DB / password auth
// Redirect to login page
export async function GET(request: Request) {
    const { origin } = new URL(request.url)
    return NextResponse.redirect(`${origin}/ssh/login`)
}
