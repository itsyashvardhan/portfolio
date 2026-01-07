'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

export default function VerifyPage() {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/ssh/login')
            }
        }
        checkSession()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Get the TOTP factor ID
        const { data: factors, error: listError } = await supabase.auth.mfa.listFactors()

        if (listError || !factors || factors.totp.length === 0) {
            setError('No 2FA setup found.')
            setLoading(false)
            return
        }

        const factorId = factors.totp[0].id

        const { data, error } = await supabase.auth.mfa.challengeAndVerify({
            factorId,
            code
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/ssh') // Redirect to dashboard on success
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Verification</h1>
                <p className={styles.subtitle}>Enter the 6-digit code from your authenticator app.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className={styles.input}
                        placeholder="000000"
                        maxLength={6}
                        autoFocus
                    />

                    {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                    <button type="submit" className={styles.verifyBtn} disabled={loading || code.length !== 6}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>

                    <p className={styles.info}>
                        Secure access for admin
                    </p>
                </form>
            </div>
        </div>
    )
}
