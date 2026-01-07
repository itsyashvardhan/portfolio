'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './MobileNav.module.css'

// Environment variable for logo/branding
const logoText = process.env.NEXT_PUBLIC_LOGO_TEXT || '◈'

const navLinks = [
    { href: '/ssh', label: 'Dashboard' },
    { href: '/ssh/writing', label: 'Writing' },
    { href: '/ssh/works', label: 'Works' },
    { href: '/ssh/profile', label: 'Profile' },
    { href: '/ssh/experience', label: 'Experience' },
    { href: '/ssh/skills', label: 'Skills' },
    { href: '/ssh/education', label: 'Education' },
    { href: '/ssh/achievements', label: 'Achievements' },
    { href: '/ssh/settings', label: 'Settings' },
]

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <div className={styles.logo}>
                    <span>{logoText}</span>
                    <span className={styles.adminBadge}>Admin</span>
                </div>
                <button
                    className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Slide-out Menu */}
            <nav className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.menuHeader}>
                    <span className={styles.menuTitle}>Navigation</span>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>
                <div className={styles.menuLinks}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <form action="/api/auth/signout" method="post" className={styles.signoutForm}>
                    <button type="submit" className={styles.signoutBtn}>Sign Out</button>
                </form>
            </nav>
        </>
    )
}
