'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

type Platform = 'macOS' | 'Windows' | 'Linux'

interface PlatformConfig {
    icon: React.ReactNode
    title: string
    subtitle: string
    installCommand: string
    commandLabel: string
    hint: string
    requirements: string[]
    comingSoon?: boolean
}

// Platform icons
const AppleIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
)

const LinuxIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.002c-.06-.135-.12-.2-.184-.268-.193-.135-.406-.199-.603-.336-.19-.135-.367-.332-.534-.468v-.002c.045-.135.089-.135.089-.198.045-.134.068-.134.114-.2.134-.134.267-.2.4-.2h.003c-.135-.067-.135-.135-.198-.202-.064-.135-.134-.268-.31-.4-.175-.135-.37-.2-.58-.334-.208-.134-.4-.268-.598-.4v-.003l-.003.003c-.21-.4-.477-.867-.81-1.335a5.723 5.723 0 00-1.27-1.267v-.002c-.08-.067-.15-.135-.228-.202-.078-.067-.15-.135-.228-.2-.152-.134-.303-.267-.454-.4-.15-.135-.303-.267-.454-.4v-.003l-.003.003a8.994 8.994 0 01-.198-.135 2.403 2.403 0 00-.178-.133 2.403 2.403 0 00-.333-.2 3.693 3.693 0 00-.665-.336c.4-.2.743-.535 1.027-.866.285-.334.543-.668.743-1.002.2-.336.35-.67.434-1.002.085-.336.136-.67.115-1.002v-.003c-.02-.338-.125-.67-.295-.936a1.97 1.97 0 00-.576-.667 1.97 1.97 0 00-.803-.4c-.292-.067-.6-.1-.934-.1h-.05zm-3.903.267c.083 0 .166.003.249.01.09 0 .19.007.286.021l.002.003c.148.018.291.041.43.084.14.044.272.097.397.172l.003.003c.103.063.2.134.29.214l.001.003c.097.088.188.184.27.286.085.103.162.213.232.328.07.116.13.24.18.37.112.29.166.6.165.924-.001.323-.054.658-.165.981-.187.547-.45 1.079-.772 1.565l-.002.002a9.95 9.95 0 01-1.07 1.314c-.164.166-.336.322-.515.468l-.002.002c-.193.158-.295.22-.51.377l-.002.002c-.167.122-.326.253-.477.392-.151.14-.296.287-.433.441l-.002.002c-.22.248-.418.517-.594.803-.176.286-.326.588-.452.904-.126.316-.224.645-.295.985-.07.34-.11.691-.11 1.049-.001.358.04.723.123 1.089.082.365.207.728.375 1.079.168.35.38.686.636 1.002.256.315.556.607.9.87.343.264.73.497 1.16.695.432.197.906.358 1.426.477.52.118 1.088.19 1.7.208.612.018 1.265-.024 1.964-.137v-.002c.375-.056.771-.137 1.184-.245a14.16 14.16 0 00.972-.314" />
    </svg>
)

const WindowsIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
)

export default function InstallPage() {
    const [platform, setPlatform] = useState<Platform>('Linux')
    const [mounted, setMounted] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setMounted(true)
        const userAgent = window.navigator.userAgent
        const navPlatform = window.navigator.platform

        if (navPlatform.indexOf('Mac') !== -1 || /iPhone|iPad|iPod/.test(userAgent)) {
            setPlatform('macOS')
        } else if (navPlatform.indexOf('Win') !== -1) {
            setPlatform('Windows')
        } else {
            setPlatform('Linux')
        }
    }, [])


    const platformConfigs: Record<Platform, PlatformConfig> = {
        macOS: {
            icon: <AppleIcon />,
            title: 'macOS',
            subtitle: 'Intel & Apple Silicon',
            installCommand: 'curl -fsSL https://yashvs.dev/spectral/install.sh | bash',
            commandLabel: 'Terminal',
            hint: 'Open Terminal and paste the command above',
            requirements: [
                'macOS 11.0 Big Sur or later',
                'curl (pre-installed)',
                'Terminal or iTerm2'
            ],
            comingSoon: true
        },
        Linux: {
            icon: <LinuxIcon />,
            title: 'Linux',
            subtitle: 'Debian/Ubuntu & more',
            installCommand: 'curl -fsSL https://yashvs.dev/spectral/install.sh | bash',
            commandLabel: 'Terminal',
            hint: 'Open your terminal and paste the command above',
            requirements: [
                'Debian, Ubuntu, or compatible distro',
                'curl installed',
                'sudo access for installation'
            ]
        },
        Windows: {
            icon: <WindowsIcon />,
            title: 'Windows',
            subtitle: 'Windows 10/11',
            installCommand: 'irm https://yashvs.dev/spectral/install.sh | iex',
            commandLabel: 'PowerShell',
            hint: 'Run PowerShell as Administrator and paste the command above',
            requirements: [
                'Windows 10 (1903+) or Windows 11',
                'PowerShell 5.1 or later',
                'Administrator privileges'
            ],
            comingSoon: true
        }
    }

    const currentConfig = platformConfigs[platform]

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentConfig.installCommand)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!mounted) return null

    return (
        <div className={styles.page}>
            <div className={styles.docsLayout}>
                {/* Left Sidebar - Platform Selector */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <Image
                            src="/spectral-logo.png"
                            alt="Spectral"
                            width={128}
                            height={128}
                            className={styles.sidebarLogo}
                        />
                    </div>
                    <h1 className={styles.sidebarTitle}>Spectral</h1>
                    <nav className={styles.platformNav}>
                        <span className={styles.navLabel}>Platforms</span>
                        {(['macOS', 'Linux', 'Windows'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p)}
                                className={`${styles.platformBtn} ${platform === p ? styles.active : ''}`}
                            >
                                <span className={styles.platformIcon}>
                                    {platformConfigs[p].icon}
                                </span>
                                <div className={styles.platformInfo}>
                                    <span className={styles.platformName}>{platformConfigs[p].title}</span>
                                    <span className={styles.platformMeta}>{platformConfigs[p].subtitle}</span>
                                </div>
                            </button>
                        ))}
                    </nav>

                    <div className={styles.sidebarFooter}>
                        <a
                            href="https://github.com/itsyashvardhan/spectral-tui/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.releasesLink}
                        >
                            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            All Releases
                        </a>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.content}>
                    <header className={styles.contentHeader}>
                        <div className={styles.breadcrumb}>
                            <span>Documentation</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span>Installation</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span className={styles.breadcrumbCurrent}>{currentConfig.title}</span>
                        </div>
                        <h1 className={styles.pageTitle}>
                            Install Spectral on {currentConfig.title}
                        </h1>
                        <p className={styles.pageSubtitle}>
                            Precision intelligence for your workspace. One command to get started.
                        </p>
                    </header>

                    {/* Install Command Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Quick Install</h2>

                        {currentConfig.comingSoon ? (
                            <div className={styles.comingSoonCard}>
                                <div className={styles.comingSoonIcon}>
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                                <h3 className={styles.comingSoonTitle}>Coming Soon</h3>
                                <p className={styles.comingSoonText}>
                                    {currentConfig.title} support is currently under development.
                                    We&apos;re working hard to bring Spectral to your platform.
                                </p>
                                <div className={styles.comingSoonActions}>
                                    <a
                                        href="https://github.com/itsyashvardhan/spectral-tui"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.comingSoonBtn}
                                    >
                                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                        </svg>
                                        Watch on GitHub
                                    </a>
                                    <button
                                        onClick={() => setPlatform('Linux')}
                                        className={styles.comingSoonBtnAlt}
                                    >
                                        Try Linux Version
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className={styles.sectionDesc}>
                                    Copy and paste the following command into your {currentConfig.commandLabel}:
                                </p>

                                <div className={styles.codeBlock}>
                                    <div className={styles.codeHeader}>
                                        <span className={styles.codeLabel}>{currentConfig.commandLabel}</span>
                                        <button onClick={handleCopy} className={styles.copyBtn}>
                                            {copied ? (
                                                <>
                                                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                                                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                                    </svg>
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                                                        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                                                        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                                                    </svg>
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className={styles.codeContent}>
                                        <code>
                                            <span className={styles.codeDim}>$</span>{' '}
                                            <span className={styles.codeCmd}>curl</span>{' '}
                                            <span className={styles.codeFlag}>-sSL</span>{' '}
                                            <span className={styles.codeUrl}>https://yashvs.dev/spectral/install.sh</span>{' '}
                                            <span className={styles.codePipe}>|</span>{' '}
                                            <span className={styles.codeCmd}>bash</span>
                                        </code>
                                    </div>
                                </div>

                                <p className={styles.hint}>
                                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className={styles.hintIcon}>
                                        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" />
                                    </svg>
                                    {currentConfig.hint}
                                </p>

                                {/* Direct Download Section (Linux only) */}
                                {platform === 'Linux' && (
                                    <section className={styles.directDownload}>
                                        <h3 className={styles.downloadTitle}>Direct Download</h3>
                                        <p className={styles.downloadDesc}>
                                            Prefer to install manually? Download the Debian package directly.
                                        </p>
                                        <div className={styles.downloadActions}>
                                            <a
                                                href="https://github.com/itsyashvardhan/spectral-tui/releases/download/v1.0.2/spectral_1.0.2_all.deb"
                                                className={styles.downloadBtn}
                                            >
                                                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                                </svg>
                                                Download .deb
                                            </a>
                                            <div className={styles.downloadMeta}>
                                                <div className={styles.metaRow}>
                                                    <span>v1.0.2</span>
                                                    <span className={styles.metaSep}>·</span>
                                                    <span>spectral_1.0.2_all.deb</span>
                                                </div>
                                                <div className={styles.checksumRow}>
                                                    <span className={styles.checksumLabel}>SHA256:</span>
                                                    <code className={styles.checksumValue}>5903b7387502f0a9a8bec5cfcd25fdea7a91a2c71f030806a27a7a2a9d1fbfa8</code>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </>
                        )}
                    </section>

                </main>

                {/* Right Sidebar - Requirements & Install Details */}
                <aside className={styles.rightSidebar}>
                    {/* Requirements Section */}
                    <div className={styles.rightSection}>
                        <h3 className={styles.rightSectionTitle}>Requirements</h3>
                        <ul className={styles.requirementsList}>
                            {currentConfig.requirements.map((req, idx) => (
                                <li key={idx} className={styles.requirementItem}>
                                    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={styles.checkIcon}>
                                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                    </svg>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What's Installed Section */}
                    <div className={styles.rightSection}>
                        <h3 className={styles.rightSectionTitle}>What Gets Installed</h3>
                        <div className={styles.installDetails}>
                            <div className={styles.installItem}>
                                <span className={styles.installLabel}>Binary</span>
                                <code className={styles.installValue}>spectral</code>
                            </div>
                            <div className={styles.installItem}>
                                <span className={styles.installLabel}>Location</span>
                                <code className={styles.installValue}>
                                    {platform === 'Windows' ? '%LOCALAPPDATA%\\Spectral' : '/usr/local/bin'}
                                </code>
                            </div>
                            <div className={styles.installItem}>
                                <span className={styles.installLabel}>Version</span>
                                <code className={styles.installValue}>1.0.2</code>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className={styles.trustToast}>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className={styles.trustIcon}>
                            <path d="M8.533.133a1.75 1.75 0 00-1.066 0l-5.25 1.68A1.75 1.75 0 001 3.48V7c0 1.566.32 3.182 1.303 4.682.983 1.498 2.585 2.813 5.032 3.855a1.7 1.7 0 001.33 0c2.447-1.042 4.049-2.357 5.032-3.855C14.68 10.182 15 8.566 15 7V3.48a1.75 1.75 0 00-1.217-1.667L8.533.133zm-.61 1.429a.25.25 0 01.153 0l5.25 1.68a.25.25 0 01.174.238V7c0 1.358-.275 2.666-1.057 3.86-.784 1.194-2.121 2.34-4.366 3.297a.2.2 0 01-.154 0c-2.245-.956-3.582-2.104-4.366-3.298C2.775 9.666 2.5 8.36 2.5 7V3.48a.25.25 0 01.174-.237l5.25-1.68zM9.5 6.5a1.5 1.5 0 01-.75 1.3v1.45a.75.75 0 01-1.5 0V7.8a1.5 1.5 0 111.75-1.3z" />
                        </svg>
                        <div className={styles.trustToastContent}>
                            <strong>Official Source</strong>
                            <span>Authenticated distribution. All builds signed and verified.</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
