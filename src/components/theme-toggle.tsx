'use client'

import styles from './theme-toggle.module.css'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
}

export function ThemeToggle() {
    const toggleTheme = () => {
        const root = document.documentElement
        const currentTheme: Theme = root.classList.contains('theme-dark') ? 'dark' : 'light'
        const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'
        applyTheme(nextTheme)
        window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            title="Toggle dark and light mode"
        >
            <span className={styles.iconWrap} aria-hidden="true">
                <span className={`${styles.icon} ${styles.sun}`}>☼</span>
                <span className={`${styles.icon} ${styles.moon}`}>☾</span>
            </span>
        </button>
    )
}
