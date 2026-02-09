'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function VerifyPage() {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/verify-totp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Verification failed')
                setLoading(false)
            } else {
                router.push('/ssh')
            }
        } catch {
            setError('Network error. Please try again.')
            setLoading(false)
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

                    {error && <p className={styles.error}>{error}</p>}

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
