'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    // Return a mock client if not configured (for development)
    if (!supabaseUrl || !supabaseKey) {
        return {
            auth: {
                signInWithOAuth: async () => ({ error: new Error('Not configured') }),
                signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
                getUser: async () => ({ data: { user: null }, error: null }),
                getSession: async () => ({ data: { session: null }, error: null }),
                signOut: async () => ({ error: null }),
                mfa: {
                    listFactors: async () => ({ data: { totp: [] }, error: null }),
                    challengeAndVerify: async () => ({ data: null, error: null }),
                }
            },
            from: () => ({
                select: () => ({ data: [], error: null, order: () => ({ data: [], error: null }) }),
                insert: () => ({ error: null }),
                update: () => ({ eq: () => ({ error: null }) }),
                delete: () => ({ eq: () => ({ error: null }) }),
            }),
        } as unknown as ReturnType<typeof createBrowserClient>
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
