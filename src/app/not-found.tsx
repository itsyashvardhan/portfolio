import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={styles.container}>
    <h2><Link href="/">Return</Link></h2>
        </div>
    )
}
