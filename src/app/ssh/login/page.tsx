'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

// Admin email from environment variable
const ADMIN_EMAIL = process.env.ADMIN_EMAILS?.split(',')[0]?.trim() || 'admin@example.com'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const supabase = createClient()

    const handleMagicLink = async () => {
        setLoading(true)
        setError('')

        const { error: loginError } = await supabase.auth.signInWithOtp({
            email: ADMIN_EMAIL,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`,
            }
        })

        if (loginError) {
            setError(loginError.message)
            setLoading(false)
        } else {
            setSent(true)
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.checkmark}>✓</div>
                    <h1 className={styles.title}>Check your email</h1>
                    <p className={styles.subtitle}>
                        Magic login sent<br />
                    </p>
                    <p className={styles.note}>
                        Click the link in the email to sign in.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Admin</h1>
                <p className={styles.subtitle}>Access your portfolio dashboard</p>

                {error && <div className={styles.error}>{error}</div>}

                <button
                    onClick={handleMagicLink}
                    disabled={loading}
                    className={styles.submitBtn}
                >
                    {loading ? 'Sending...' : 'Send Magic Link'}
                </button>

                <p className={styles.note}>
                    A login link will be sent to your email.
                </p>
            </div>
        </div>
    )
}
