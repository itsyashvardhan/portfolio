import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { getSiteConfig } from '@/lib/site-config'
import styles from './page.module.css'

export default async function Home() {
  const site = await getSiteConfig()

  return (
    <div className={styles.landing}>
      <div className={styles.themeToggleWrap}>
        <ThemeToggle />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.name}>{site.heroName}</h1>
          {site.heroPhonetic && <p className={styles.phonetic}>{site.heroPhonetic}</p>}
          <p className={styles.philosophy}>{site.heroTagline}</p>
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
          <Link href="/india-ai" className={styles.link}>
            <span className={styles.icon}>AI</span>
            <span className={styles.label}>AI</span>
          </Link>
          <Link href="/about" className={styles.link}>
            <span className={styles.icon}>@</span>
            <span className={styles.label}>About</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
