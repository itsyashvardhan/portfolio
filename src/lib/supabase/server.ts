import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    // Return mock if Supabase is not configured
    if (!supabaseUrl || !supabaseKey) {
        return {
            auth: {
                getUser: async () => ({ data: { user: null }, error: null }),
                signOut: async () => ({ error: null }),
                mfa: {
                    getAuthenticatorAssuranceLevel: async () => ({ data: { currentLevel: null, nextLevel: null }, error: null }),
                    listFactors: async () => ({ data: { totp: [] }, error: null }),
                    enroll: async () => ({ data: null, error: new Error('Not configured') }),
                    challengeAndVerify: async () => ({ data: null, error: new Error('Not configured') }),
                    unenroll: async () => ({ data: null, error: new Error('Not configured') }),
                }
            },
            from: () => ({
                select: () => ({ data: [], error: null, order: () => ({ data: [], error: null }) }),
            }),
        } as unknown as ReturnType<typeof createServerClient>
    }

    const cookieStore = await cookies()

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                try {
                    cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: object }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // Server Component - ignore
                }
            },
        },
    })
}
