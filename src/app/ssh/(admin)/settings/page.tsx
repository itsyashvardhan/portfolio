'use client'

import React, { useState, useEffect } from 'react'
import { adminFetch, adminAction } from '@/lib/admin-api'
import QRCode from 'qrcode'
import styles from './page.module.css'

interface SiteSettings {
    id: string
    key: string
    value: string
    description: string
}

const DEFAULT_SETTINGS = [
    { key: 'site_title', description: 'Site title displayed in browser tab' },
    { key: 'site_description', description: 'Meta description for SEO' },
    { key: 'hero_name', description: 'Name displayed on homepage' },
    { key: 'email', description: 'Contact email address' },
    { key: 'github_url', description: 'GitHub profile URL' },
    { key: 'linkedin_url', description: 'LinkedIn profile URL' },
    { key: 'twitter_url', description: 'Twitter/X profile URL' },
    { key: 'about_intro', description: 'Introduction paragraph on About page' },
    { key: 'about_bio', description: 'Full biography on About page' },
]

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    // MFA State
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [mfaData, setMfaData] = useState<any>(null)
    const [verifyCode, setVerifyCode] = useState('')
    const [showQR, setShowQR] = useState(false)

    useEffect(() => {
        fetchSettings()
        checkMFAStatus()
    }, [])

    const checkMFAStatus = async () => {
        try {
            const data = await adminFetch('mfa_status')
            if (data?.isEnrolled) setIsEnrolled(true)
        } catch {
            // ignore
        }
    }

    const fetchSettings = async () => {
        try {
            const data = await adminFetch('settings')
            if (data) {
                const settingsMap: Record<string, string> = {}
                data.forEach((item: SiteSettings) => {
                    settingsMap[item.key] = item.value
                })
                setSettings(settingsMap)
            }
        } catch {
            // ignore
        }
        setLoading(false)
    }

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage('')

        try {
            const payload = DEFAULT_SETTINGS.map(s => ({
                key: s.key,
                value: settings[s.key] || '',
                description: s.description,
            }))

            await adminAction('settings', 'upsert', payload)
            setMessage('Settings saved successfully!')
        } catch {
            setMessage('Error saving settings.')
        }

        setSaving(false)
        setTimeout(() => setMessage(''), 3000)
    }

    const handleEnrollMFA = async () => {
        try {
            const result = await adminAction('mfa', 'enroll', {})
            const data = result.data

            const url = await QRCode.toDataURL(data.uri)
            setMfaData({ ...data, qr_code_url: url })
            setShowQR(true)
        } catch (error) {
            setMessage('Error starting enrollment')
        }
    }

    const handleVerifyMFA = async () => {
        try {
            await adminAction('mfa', 'verify_and_enable', { code: verifyCode })
            setIsEnrolled(true)
            setShowQR(false)
            setMfaData(null)
            setVerifyCode('')
            setMessage('2FA Enabled Successfully!')
        } catch {
            setMessage('Invalid code. Please try again.')
        }
    }

    const handleUnenrollMFA = async () => {
        if (!confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) return

        try {
            await adminAction('mfa', 'unenroll', {})
            setIsEnrolled(false)
            setMessage('2FA Disabled')
        } catch {
            setMessage('Error disabling 2FA')
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Configure your portfolio site metadata and content</p>

            <div className={styles.sections}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Security (2FA)</h2>
                    <p className={styles.label} style={{ marginBottom: '1rem' }}>
                        Secure your account with Two-Factor Authentication using an Authenticator app (Google Authenticator, Authy, etc).
                    </p>

                    {isEnrolled ? (
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <span className={styles.status} style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>
                                    ✓ 2FA is Enabled
                                </span>
                            </div>
                            <button
                                onClick={handleUnenrollMFA}
                                className={`${styles.saveBtn} ${styles.disableBtn}`}
                            >
                                Disable 2FA
                            </button>
                        </div>
                    ) : (
                        <div>
                            {!showQR ? (
                                <button onClick={handleEnrollMFA} className={styles.saveBtn}>
                                    Enable 2FA
                                </button>
                            ) : (
                                <div className={styles.qrContainer}>
                                    <h3 style={{ color: '#000', marginBottom: '0.5rem' }}>Scan with Authenticator App</h3>
                                    {mfaData?.qr_code_url && (
                                        <img src={mfaData.qr_code_url} alt="QR Code" className={styles.qrCode} />
                                    )}
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Or enter this code manually:</p>
                                    <div className={styles.secret}>{mfaData?.secret}</div>

                                    <div className={styles.verifyRow}>
                                        <input
                                            type="text"
                                            value={verifyCode}
                                            onChange={(e) => setVerifyCode(e.target.value)}
                                            placeholder="000 000"
                                            maxLength={6}
                                            className={styles.verifyInput}
                                        />
                                        <button onClick={handleVerifyMFA} className={styles.verifyBtn}>
                                            Verify & Enable
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Site Metadata</h2>

                    <div className={styles.field}>
                        <label className={styles.label}>Site Title</label>
                        <input
                            type="text"
                            value={settings.site_title || ''}
                            onChange={(e) => handleChange('site_title', e.target.value)}
                            className={styles.input}
                            placeholder="Your Name - Portfolio"
                        />
                        <span className={styles.hint}>Displayed in browser tab</span>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Site Description</label>
                        <textarea
                            value={settings.site_description || ''}
                            onChange={(e) => handleChange('site_description', e.target.value)}
                            className={styles.textarea}
                            rows={2}
                            placeholder="A brief description for search engines..."
                        />
                        <span className={styles.hint}>Meta description for SEO</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Homepage</h2>

                    <div className={styles.field}>
                        <label className={styles.label}>Display Name</label>
                        <input
                            type="text"
                            value={settings.hero_name || ''}
                            onChange={(e) => handleChange('hero_name', e.target.value)}
                            className={styles.input}
                            placeholder="Your Name"
                        />
                        <span className={styles.hint}>Large name displayed on homepage</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Social Links</h2>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                value={settings.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={styles.input}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>GitHub URL</label>
                            <input
                                type="url"
                                value={settings.github_url || ''}
                                onChange={(e) => handleChange('github_url', e.target.value)}
                                className={styles.input}
                                placeholder="https://github.com/username"
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                value={settings.linkedin_url || ''}
                                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                                className={styles.input}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Twitter/X URL</label>
                            <input
                                type="url"
                                value={settings.twitter_url || ''}
                                onChange={(e) => handleChange('twitter_url', e.target.value)}
                                className={styles.input}
                                placeholder="https://twitter.com/username"
                            />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>About Page</h2>

                    <div className={styles.field}>
                        <label className={styles.label}>Introduction</label>
                        <textarea
                            value={settings.about_intro || ''}
                            onChange={(e) => handleChange('about_intro', e.target.value)}
                            className={styles.textarea}
                            rows={3}
                            placeholder="A short introduction..."
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Full Bio</label>
                        <textarea
                            value={settings.about_bio || ''}
                            onChange={(e) => handleChange('about_bio', e.target.value)}
                            className={styles.textarea}
                            rows={6}
                            placeholder="Your complete biography..."
                        />
                    </div>
                </section>
            </div>

            <div className={styles.footer}>
                {message && <span className={styles.message}>{message}</span>}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={styles.saveBtn}
                >
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    )
}
