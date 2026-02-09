'use client'

import { useState, useEffect } from 'react'
import { adminFetch, adminAction } from '@/lib/admin-api'
import styles from '../experience/page.module.css'

export default function AdminProfilePage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        profile_image: '',
        location: '',
        available_for_work: true,
        resume_url: '',
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const data = await adminFetch('profile')

        if (data) {
            setFormData({
                name: data.name || '',
                title: data.title || '',
                bio: data.bio || '',
                profile_image: data.profile_image || '',
                location: data.location || '',
                available_for_work: data.available_for_work ?? true,
                resume_url: data.resume_url || '',
            })
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        await adminAction('profile', 'upsert', formData)

        setSaving(false)
        alert('Profile updated!')
    }

    if (loading) return <div className={styles.page}><p>Loading...</p></div>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Profile</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>About Me Information</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Job Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Bio (Markdown)</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className={styles.textarea}
                        rows={10}
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Profile Image URL</label>
                        <input
                            type="text"
                            value={formData.profile_image}
                            onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Resume URL</label>
                        <input
                            type="text"
                            value={formData.resume_url}
                            onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.checkbox} style={{ marginTop: '24px' }}>
                            <input
                                type="checkbox"
                                checked={formData.available_for_work}
                                onChange={(e) => setFormData({ ...formData, available_for_work: e.target.checked })}
                            />
                            Available for Work
                        </label>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
