'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from '../new/page.module.css'

export default function EditWorkPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        role: '',
        description: '',
        problem: '',
        constraints: '',
        decisions: '',
        tech_context: '',
        outcome: '',
        body: '',
        tech_stack: '',
        repo_url: '',
        demo_url: '',
        demo_label: '',
        project_status: 'active' as 'active' | 'archived' | 'in-progress',
        featured: false,
        status: 'draft' as 'draft' | 'published',
        display_order: 0,
    })

    useEffect(() => {
        if (!id) return
        let isMounted = true
        const loadWork = async () => {
            const { data, error } = await supabase
                .from('works')
                .select('*')
                .eq('id', id)
                .single()

            if (!isMounted) return

            if (error) {
                alert('Error fetching work: ' + error.message)
                router.push('/ssh/works')
                return
            }

            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    role: data.role || '',
                    description: data.description || '',
                    problem: data.problem || '',
                    constraints: data.constraints || '',
                    decisions: data.decisions || '',
                    tech_context: data.tech_context || '',
                    outcome: data.outcome || '',
                    body: data.body || '',
                    tech_stack: data.tech_stack?.join(', ') || '',
                    repo_url: data.repo_url || '',
                    demo_url: data.demo_url || '',
                    demo_label: data.demo_label || '',
                    project_status: data.project_status || 'active',
                    featured: data.featured || false,
                    status: data.status || 'draft',
                    display_order: data.display_order || 0,
                })
            }
            setLoading(false)
        }
        loadWork()
        return () => { isMounted = false }
    }, [id, router, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const dataToSave = {
            ...formData,
            tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
            repo_url: formData.repo_url || null,
            demo_url: formData.demo_url || null,
            demo_label: formData.demo_label || null,
            description: formData.description || null,
        }

        const { error } = await supabase
            .from('works')
            .update(dataToSave)
            .eq('id', id)

        if (error) {
            alert('Error updating work: ' + error.message)
            setSaving(false)
        } else {
            router.push('/ssh/works')
        }
    }

    if (loading) return <div className={styles.page}><p>Loading...</p></div>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Edit Work</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Role</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className={styles.input}
                            placeholder="e.g., Product & Solutions Engineer"
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Display Order</label>
                        <input
                            type="number"
                            value={formData.display_order}
                            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Short Description (for cards)</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={styles.textarea}
                        rows={2}
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            value={formData.tech_stack}
                            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                            className={styles.input}
                            placeholder="Next.js, TypeScript, Supabase"
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Project Status</label>
                        <select
                            value={formData.project_status}
                            onChange={(e) => setFormData({ ...formData, project_status: e.target.value as 'active' | 'archived' | 'in-progress' })}
                            className={styles.select}
                        >
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                            <option value="in-progress">In Progress</option>
                        </select>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Repo URL</label>
                        <input
                            type="url"
                            value={formData.repo_url}
                            onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                            className={styles.input}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Demo URL</label>
                        <input
                            type="url"
                            value={formData.demo_url}
                            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                            className={styles.input}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Demo Button Label</label>
                    <input
                        type="text"
                        value={formData.demo_label}
                        onChange={(e) => setFormData({ ...formData, demo_label: e.target.value })}
                        className={styles.input}
                        placeholder="Live Demo → (default if empty)"
                    />
                    <span className={styles.hint}>Custom text for the demo link button (e.g., &quot;Live&quot;, &quot;Try It&quot;, &quot;View Site&quot;)</span>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Full Case Study (Markdown) - Optional</label>
                    <textarea
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        className={styles.textarea}
                        rows={10}
                        placeholder="Detailed write-up..."
                    />
                    <span className={styles.hint}>If this is filled, it will be shown instead of the sections below.</span>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Problem</label>
                    <textarea
                        value={formData.problem}
                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                        className={styles.textarea}
                        rows={3}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Constraints</label>
                    <textarea
                        value={formData.constraints}
                        onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                        className={styles.textarea}
                        rows={3}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Decisions</label>
                    <textarea
                        value={formData.decisions}
                        onChange={(e) => setFormData({ ...formData, decisions: e.target.value })}
                        className={styles.textarea}
                        rows={3}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Technical Context</label>
                    <textarea
                        value={formData.tech_context}
                        onChange={(e) => setFormData({ ...formData, tech_context: e.target.value })}
                        className={styles.textarea}
                        rows={2}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Outcome</label>
                    <textarea
                        value={formData.outcome}
                        onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                        className={styles.textarea}
                        rows={2}
                    />
                </div>

                <div className={styles.row}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        Featured (Shows at top)
                    </label>

                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                        className={styles.select}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={() => router.push('/ssh/works')} className={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>
                        {saving ? 'Updating...' : 'Update Work'}
                    </button>
                </div>
            </form>
        </div>
    )
}
