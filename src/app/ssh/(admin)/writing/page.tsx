'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

interface Blog {
    id: string
    title: string
    slug: string
    body: string
    excerpt: string
    banner_image?: string
    read_time?: number
    tags: string[]
    status: 'draft' | 'published'
    created_at: string
    updated_at: string
}

export default function AdminBlogPage() {
    const [Blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        body: '',
        excerpt: '',
        banner_image: '',
        read_time: 5,
        tags: '',
        status: 'draft' as 'draft' | 'published',
    })
    const supabase = createClient()

    useEffect(() => {
        let isMounted = true
        const loadBlogs = async () => {
            const { data } = await supabase
                .from('Blog')
                .select('*')
                .order('created_at', { ascending: false })

            if (isMounted) {
                if (data) setBlogs(data)
                setLoading(false)
            }
        }
        loadBlogs()
        return () => { isMounted = false }
    }, [supabase, refreshKey])

    const refresh = () => setRefreshKey(k => k + 1)

    const generateSlug = (title: string) => {
        return title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData({
            ...formData,
            title,
            slug: formData.slug || generateSlug(title),
        })
    }

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            body: '',
            excerpt: '',
            banner_image: '',
            read_time: 5,
            tags: '',
            status: 'draft',
        })
        setEditingId(null)
    }

    const startEdit = (blog: Blog) => {
        setFormData({
            title: blog.title,
            slug: blog.slug,
            body: blog.body,
            excerpt: blog.excerpt || '',
            banner_image: blog.banner_image || '',
            read_time: blog.read_time || 5,
            tags: blog.tags?.join(', ') || '',
            status: blog.status,
        })
        setEditingId(blog.id)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const dataToSave = {
            title: formData.title,
            slug: formData.slug,
            body: formData.body,
            excerpt: formData.excerpt,
            banner_image: formData.banner_image || null,
            read_time: formData.read_time,
            status: formData.status,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            published_at: formData.status === 'published' ? new Date().toISOString() : null
        }

        if (editingId) {
            await supabase
                .from('Blog')
                .update(dataToSave)
                .eq('id', editingId)
        } else {
            await supabase
                .from('Blog')
                .insert([dataToSave])
        }

        resetForm()
        refresh()
    }

    const deleteBlog = async (id: string) => {
        if (!confirm('Are you sure you want to delete this?')) return
        await supabase.from('Blog').delete().eq('id', id)
        refresh()
    }

    const toggleStatus = async (Blog: Blog) => {
        const newStatus = Blog.status === 'published' ? 'draft' : 'published'
        await supabase
            .from('Blog')
            .update({ status: newStatus })
            .eq('id', Blog.id)
        refresh()
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Blog</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>{editingId ? 'Edit Post' : 'New Post'}</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
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
                        <label className={styles.label}>Banner Image URL</label>
                        <input
                            type="text"
                            value={formData.banner_image}
                            onChange={(e) => setFormData({ ...formData, banner_image: e.target.value })}
                            className={styles.input}
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Read Time (mins)</label>
                        <input
                            type="number"
                            value={formData.read_time}
                            onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Tags (comma separated)</label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className={styles.input}
                        placeholder="architecture, scaling, backend"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Excerpt</label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className={styles.textarea}
                        rows={2}
                        placeholder="Brief description..."
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Content (Markdown)</label>
                    <textarea
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        className={styles.textarea}
                        rows={10}
                    />
                </div>

                <div className={styles.formActions}>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                        className={styles.select}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    {editingId && (
                        <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" className={styles.saveBtn}>
                        {editingId ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>

            <div className={styles.list}>
                <h2 className={styles.listTitle}>All Posts</h2>
                {Blogs.length === 0 ? (
                    <p className={styles.empty}>No posts yet.</p>
                ) : (
                    Blogs.map((Blog) => (
                        <div key={Blog.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemTitle}>{Blog.title}</h3>
                                <span className={`${styles.status} ${Blog.status === 'published' ? styles.published : styles.draft}`}>
                                    {Blog.status}
                                </span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => toggleStatus(Blog)} className={styles.actionBtn}>
                                    {Blog.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <button onClick={() => startEdit(Blog)} className={styles.actionBtn}>Edit</button>
                                <button onClick={() => deleteBlog(Blog.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
