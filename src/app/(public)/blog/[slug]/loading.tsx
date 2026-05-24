import rootStyles from '../../../loading.module.css'
import styles from '../page.module.css'

function Skel({ w = '100%', h = '16px', style }: { w?: string; h?: string; style?: React.CSSProperties }) {
    return <div className={rootStyles.skel} style={{ width: w, height: h, ...style }} />
}

export default function BlogPostLoading() {
    return (
        <div className={styles.page}>
            <article className={`container`} style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
                {/* back link */}
                <Skel w="100px" h="14px" style={{ marginBottom: '32px' }} />

                {/* meta */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Skel w="90px" h="13px" />
                    <Skel w="70px" h="13px" />
                </div>

                {/* title */}
                <Skel w="90%" h="36px" />
                <Skel w="65%" h="36px" style={{ marginTop: '8px' }} />

                {/* tags */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <Skel w="64px" h="24px" style={{ borderRadius: '100px' }} />
                    <Skel w="80px" h="24px" style={{ borderRadius: '100px' }} />
                    <Skel w="56px" h="24px" style={{ borderRadius: '100px' }} />
                </div>

                {/* audio player placeholder */}
                <Skel w="100%" h="60px" style={{ marginTop: '32px', borderRadius: '8px' }} />

                {/* body paragraphs */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? '40px' : '24px' }}>
                        {i % 3 === 0 && <Skel w="50%" h="22px" style={{ marginBottom: '12px' }} />}
                        <Skel w="100%" h="15px" style={{ marginBottom: '6px' }} />
                        <Skel w="100%" h="15px" style={{ marginBottom: '6px' }} />
                        <Skel w={`${70 + (i % 3) * 10}%`} h="15px" />
                    </div>
                ))}
            </article>
        </div>
    )
}
