'use client'

import { useEffect } from 'react'
import styles from './not-found.module.css'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.code} style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}>
                    Something went wrong
                </h1>
                <p className={styles.message}>
                    An unexpected error occurred.
                </p>
                <button
                    onClick={reset}
                    className={styles.link}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                    }}
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
