import Link from 'next/link'
import styles from './page.module.css'

export default function AdminDashboard() {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Manage your portfolio content</p>

            <div className={styles.grid}>
                <Link href="/ssh/works" className={styles.card}>
                    <h2>Works</h2>
                    <p>Manage your projects and case studies</p>
                </Link>
                <Link href="/ssh/blog" className={styles.card}>
                    <h2>Blog</h2>
                    <p>Create and edit blog posts</p>
                </Link>
                <Link href="/ssh/experience" className={styles.card}>
                    <h2>Experience</h2>
                    <p>Update your work history</p>
                </Link>
                <Link href="/ssh/settings" className={styles.card}>
                    <h2>Settings</h2>
                    <p>Configure site metadata</p>
                </Link>
            </div>
        </div>
    )
}
