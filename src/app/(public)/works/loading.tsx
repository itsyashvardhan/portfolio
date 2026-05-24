import rootStyles from '../../loading.module.css'
import styles from './page.module.css'

function Skel({ w = '100%', h = '16px', style }: { w?: string; h?: string; style?: React.CSSProperties }) {
    return <div className={rootStyles.skel} style={{ width: w, height: h, ...style }} />
}

export default function WorksLoading() {
    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Works</h1>
                    <Skel w="340px" h="20px" style={{ marginTop: '12px' }} />
                    <Skel w="70px" h="14px" style={{ marginTop: '10px' }} />
                </div>
            </section>

            <section className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} style={{
                            padding: '28px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            pointerEvents: 'none',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                        <Skel w="52px" h="20px" style={{ borderRadius: '100px' }} />
                                        <Skel w="70px" h="20px" style={{ borderRadius: '100px' }} />
                                    </div>
                                    <Skel w="55%" h="24px" />
                                    <Skel w="100%" h="15px" style={{ marginTop: '12px' }} />
                                    <Skel w="90%" h="15px" style={{ marginTop: '6px' }} />
                                    <Skel w="70%" h="15px" style={{ marginTop: '6px' }} />
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
                                        {Array.from({ length: 4 }).map((_, j) => (
                                            <Skel key={j} w="60px" h="22px" style={{ borderRadius: '100px' }} />
                                        ))}
                                    </div>
                                </div>
                                <Skel w="28px" h="28px" style={{ borderRadius: '50%', flexShrink: 0 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
