import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    // Skip middleware if Supabase is not configured
    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.next()
    }

    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                supabaseResponse = NextResponse.next({
                    request,
                })
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options)
                )
            },
        },
    })

    // Refresh session if it exists
    await supabase.auth.getUser()

    return supabaseResponse
}

// Only run middleware on admin routes - public pages don't need auth
export const config = {
    matcher: [
        '/ssh/:path*',
        '/verify/:path*',
        '/auth/:path*',
        '/api/auth/:path*',
    ],
}

