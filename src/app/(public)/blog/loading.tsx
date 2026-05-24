import rootStyles from '../../loading.module.css'
import styles from './page.module.css'

function Skel({ w = '100%', h = '16px', style }: { w?: string; h?: string; style?: React.CSSProperties }) {
    return <div className={rootStyles.skel} style={{ width: w, height: h, ...style }} />
}

export default function BlogLoading() {
    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Blog</h1>
                    <Skel w="320px" h="20px" style={{ marginTop: '12px' }} />
                    <Skel w="80px" h="14px" style={{ marginTop: '10px' }} />
                </div>
            </section>

            <section className="container">
                <div className={styles.grid}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={styles.card} style={{ pointerEvents: 'none' }}>
                            {/* banner placeholder */}
                            <Skel w="100%" h="180px" style={{ borderRadius: '6px 6px 0 0', flexShrink: 0 }} />
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta} style={{ display: 'flex', gap: '8px' }}>
                                    <Skel w="80px" h="12px" />
                                    <Skel w="60px" h="12px" />
                                </div>
                                <Skel w="85%" h="22px" style={{ marginTop: '10px' }} />
                                <Skel w="60%" h="22px" style={{ marginTop: '6px' }} />
                                <Skel w="100%" h="14px" style={{ marginTop: '12px' }} />
                                <Skel w="80%" h="14px" style={{ marginTop: '6px' }} />
                                <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                                    <Skel w="52px" h="22px" style={{ borderRadius: '100px' }} />
                                    <Skel w="64px" h="22px" style={{ borderRadius: '100px' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
