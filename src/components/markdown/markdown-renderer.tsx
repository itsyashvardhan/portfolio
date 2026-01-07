// ============================================
// MARKDOWN RENDERING COMPONENT
// Supports: headings, code, images, links, lists
// ============================================

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import styles from './markdown.module.css'

interface MarkdownRendererProps {
    content: string
    className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={`${styles.markdown} ${className || ''}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                    // Custom heading rendering
                    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
                    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,

                    // Paragraphs
                    p: ({ children }) => <p className={styles.p}>{children}</p>,

                    // Links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className={styles.link}
                            target={href?.startsWith('http') ? '_blank' : undefined}
                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            {children}
                        </a>
                    ),

                    // Images with Next.js Image optimization
                    img: ({ src, alt }) => {
                        if (!src) return null

                        const imgSrc = typeof src === 'string' ? src : ''
                        if (!imgSrc) return null

                        // External images
                        if (imgSrc.startsWith('http')) {
                            return (
                                <span className={styles.imageWrapper}>
                                    <img
                                        src={imgSrc}
                                        alt={alt || ''}
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                    {alt && <span className={styles.imageCaption}>{alt}</span>}
                                </span>
                            )
                        }
                        // Internal images with Next.js optimization
                        return (
                            <span className={styles.imageWrapper}>
                                <Image
                                    src={imgSrc}
                                    alt={alt || ''}
                                    width={800}
                                    height={450}
                                    className={styles.image}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                {alt && <span className={styles.imageCaption}>{alt}</span>}
                            </span>
                        )
                    },

                    // Code blocks
                    pre: ({ children }) => (
                        <pre className={styles.pre}>{children}</pre>
                    ),
                    code: ({ className, children, ...props }) => {
                        const isInline = !className
                        if (isInline) {
                            return <code className={styles.inlineCode} {...props}>{children}</code>
                        }
                        return <code className={`${styles.code} ${className || ''}`} {...props}>{children}</code>
                    },

                    // Lists
                    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
                    ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
                    li: ({ children }) => <li className={styles.li}>{children}</li>,

                    // Blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className={styles.blockquote}>{children}</blockquote>
                    ),

                    // Horizontal rule
                    hr: () => <hr className={styles.hr} />,

                    // Tables
                    table: ({ children }) => (
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>{children}</table>
                        </div>
                    ),
                    th: ({ children }) => <th className={styles.th}>{children}</th>,
                    td: ({ children }) => <td className={styles.td}>{children}</td>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
