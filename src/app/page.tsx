import Link from 'next/link'
import styles from './page.module.css'

// Environment variables for branding
const heroName = process.env.NEXT_PUBLIC_HERO_NAME || 'Your Name'
const heroPhonetic = process.env.NEXT_PUBLIC_HERO_PHONETIC || ''
const heroTagline = process.env.NEXT_PUBLIC_HERO_TAGLINE || 'I design systems that ship.'

export default function Home() {
  return (
    <div className={styles.landing}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.name}>{heroName}</h1>
          {heroPhonetic && <p className={styles.phonetic}>{heroPhonetic}</p>}
          <p className={styles.philosophy}>{heroTagline}</p>
        </header>

        <nav className={styles.nav}>
          <Link href="/blog" className={styles.link}>
            <span className={styles.icon}>¶</span>
            <span className={styles.label}>Blog</span>
          </Link>
          <Link href="/works" className={styles.link}>
            <span className={styles.icon}>◈</span>
            <span className={styles.label}>Works</span>
          </Link>
          <Link href="/about" className={styles.link}>
            <span className={styles.icon}>@</span>
            <span className={styles.label}>About</span>
          </Link>
        </nav>
      </div>

      {/* Subtle Footer */}
      <footer className={styles.footer}>
        <span className={styles.copyright}>© 2026 Crafted with Intention</span>
      </footer>
    </div>
  )
}



