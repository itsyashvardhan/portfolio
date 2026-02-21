import type { Metadata } from 'next'
import { indiaAiDirectory } from '@/lib/india-ai-data'
import { ShareLink } from '@/components/share-link'
import { SearchableDirectory } from './searchable-directory'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'India AI Directory',
  description:
    'AI Summit India exhibitor contact database organized by sector. Static local data, no database dependency.',
}

export default function IndiaAiPage() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>India AI Summit Directory</h1>
          <p className={styles.description}>
            {indiaAiDirectory.title}.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Organizations</span>
              <strong>{indiaAiDirectory.totalOrganizations}</strong>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Categories</span>
              <strong>{indiaAiDirectory.sectionCount}</strong>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Share</span>
              <ShareLink
                url="https://yashvardhan.dev/india-ai"
                className={styles.shareButton}
              />
            </div>
          </div>
        </div>
      </section>
      <SearchableDirectory sections={indiaAiDirectory.sections} />
    </div>
  )
}
