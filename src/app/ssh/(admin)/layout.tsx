import React from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { adminUsers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import styles from './layout.module.css'
import Link from 'next/link'
import MobileNav from './MobileNav'

// Environment variable for logo/branding
const logoText = process.env.NEXT_PUBLIC_LOGO_TEXT || '◈'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    // Redirect to login if not authenticated
    if (!session) {
        redirect('/ssh/login')
    }

    // Check if user still exists in admin_users
    const [user] = await db
        .select({ id: adminUsers.id, totp_enabled: adminUsers.totp_enabled })
        .from(adminUsers)
        .where(eq(adminUsers.id, session.userId))
        .limit(1)

    if (!user) {
        redirect('/ssh/login')
    }

    // Check MFA status
    if (user.totp_enabled && !session.mfaVerified) {
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
