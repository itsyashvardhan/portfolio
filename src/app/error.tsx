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
                <h1 className={styles.message}>
                    Something went wrong
                </h1>
                <button
                    onClick={reset}
                    className={styles.link}
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
