import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.wordmark} aria-label="Loading">
                <span className={styles.wordmarkText}>यश</span>
                <span className={styles.wordmarkShine} aria-hidden="true" />
            </div>
        </div>
    )
}
