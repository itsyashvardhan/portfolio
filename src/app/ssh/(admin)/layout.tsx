import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import styles from './layout.module.css'
import Link from 'next/link'
import MobileNav from './MobileNav'

// Allowed admin emails - comma-separated list from env variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim())
    .filter(Boolean)

// Environment variable for logo/branding
const logoText = process.env.NEXT_PUBLIC_LOGO_TEXT || '◈'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    // If Supabase not configured, redirect to login
    if (!supabase) {
        redirect('/ssh/login')
    }

    const { data: { user } } = await supabase.auth.getUser()

    // Redirect to login if not authenticated
    if (!user) {
        redirect('/ssh/login')
    }

    // Check if user email is in allowed list
    if (!ADMIN_EMAILS.includes(user.email || '')) {
        await supabase.auth.signOut()
        redirect('/')
    }

    // Check MFA status
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (aal && aal.currentLevel !== 'aal2' && aal.nextLevel === 'aal2') {
        redirect('/verify')
    }

    return (
        <div className={styles.layout}>
            {/* Mobile Navigation */}
            <MobileNav />

            {/* Desktop Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <span>{logoText}</span>
                    <span className={styles.adminBadge}>Admin</span>
                </div>
                <nav className={styles.nav}>
                    <Link href="/ssh" className={styles.navLink}>Dashboard</Link>
                    <Link href="/ssh/writing" className={styles.navLink}>Writing</Link>
                    <Link href="/ssh/works" className={styles.navLink}>Works</Link>
                    <Link href="/ssh/profile" className={styles.navLink}>Profile</Link>
                    <Link href="/ssh/experience" className={styles.navLink}>Experience</Link>
                    <Link href="/ssh/skills" className={styles.navLink}>Skills</Link>
                    <Link href="/ssh/education" className={styles.navLink}>Education</Link>
                    <Link href="/ssh/achievements" className={styles.navLink}>Achievements</Link>
                    <Link href="/ssh/settings" className={styles.navLink}>Settings</Link>
                </nav>
                <form action="/api/auth/signout" method="post" className={styles.signout}>
                    <button type="submit" className={styles.signoutBtn}>Sign Out</button>
                </form>
            </aside>
            <main className={styles.main}>{children}</main>
        </div>
    )
}
