import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

// Environment variable for logo/branding
const logoText = process.env.NEXT_PUBLIC_LOGO_TEXT || '◈'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layout}>
            <nav className={styles.nav}>
                <div className={`container ${styles.navContainer}`}>
                    <Link href="/" className={styles.logo}>{logoText}</Link>
                    <ul className={styles.links}>
                        <li><Link href="/works" className={styles.link} prefetch={true}>Works</Link></li>
                        <li><Link href="/blog" className={styles.link} prefetch={true}>Blog</Link></li>
                        <li><Link href="/about" className={styles.link} prefetch={true}>About</Link></li>
                    </ul>
                </div>
            </nav>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <div className="container">
                    <p>© {new Date().getFullYear()} | Designed & built with intention.</p>
                </div>
            </footer>
        </div>
    )
}
