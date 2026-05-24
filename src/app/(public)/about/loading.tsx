import rootStyles from '../../loading.module.css'
import styles from './page.module.css'

function Skel({ w = '100%', h = '16px', style }: { w?: string; h?: string; style?: React.CSSProperties }) {
    return <div className={rootStyles.skel} style={{ width: w, height: h, ...style }} />
}

export default function AboutLoading() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        {/* Avatar */}
                        <Skel w="80px" h="80px" style={{ borderRadius: '50%', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <h1 className={styles.name}>Yashvardhan Singh</h1>
                            <Skel w="200px" h="18px" style={{ marginTop: '8px' }} />
                            <Skel w="140px" h="14px" style={{ marginTop: '8px' }} />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                                <Skel w="80px" h="32px" style={{ borderRadius: '6px' }} />
                                <Skel w="80px" h="32px" style={{ borderRadius: '6px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '64px' }}>
                {/* Bio */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>About</h2>
                    <Skel w="100%" h="15px" style={{ marginTop: '12px' }} />
                    <Skel w="100%" h="15px" style={{ marginTop: '6px' }} />
                    <Skel w="75%" h="15px" style={{ marginTop: '6px' }} />
                </section>

                {/* Experience */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className={styles.experienceCard} style={{ marginTop: '20px' }}>
                            <Skel w="55%" h="18px" />
                            <Skel w="36%" h="14px" style={{ marginTop: '6px' }} />
                            <Skel w="100%" h="14px" style={{ marginTop: '10px' }} />
                            <Skel w="85%" h="14px" style={{ marginTop: '5px' }} />
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Skel key={i} w={`${50 + (i % 4) * 15}px`} h="28px" style={{ borderRadius: '100px' }} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
