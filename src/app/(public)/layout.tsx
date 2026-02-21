import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'
import { ThemeToggle } from '@/components/theme-toggle'

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
                    <div className={styles.navActions}>
                        <ul className={styles.links}>
                            <li><Link href="/works" className={styles.link} prefetch={true}>Works</Link></li>
                            <li><Link href="/india-ai" className={styles.link} prefetch={true}>AI</Link></li>
                            <li><Link href="/blog" className={styles.link} prefetch={true}>Blog</Link></li>
                            <li><Link href="/about" className={styles.link} prefetch={true}>About</Link></li>
                        </ul>
                        <ThemeToggle />
                    </div>
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
