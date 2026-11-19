import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { bibleRepository } from '@/services/data/repositories.js'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const { data: translations = [] } = useQuery({
    queryKey: ['translations'],
    queryFn: bibleRepository.getTranslations,
  })

  const { data: verses = [] } = useQuery({
    queryKey: ['home-verses'],
    queryFn: () => bibleRepository.getChapter('eng', 'John', 1),
  })

  const featured = verses[0] || {
    reference: 'John 1:1',
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
  }

  return (
    <div className="page-shell">
      <header className="intro-card">
        <div>
          <p className="eyebrow">{t('home.greeting')}</p>
          <h1>{t('app.tagline')}</h1>
        </div>
        <div className="lang-badge">{i18n.resolvedLanguage?.toUpperCase()}</div>
      </header>

      <section className="stat-grid">
        <article className="mini-card">
          <span>{translations.length}</span>
          <small>Translations</small>
        </article>
        <article className="mini-card">
          <span>4</span>
          <small>Books</small>
        </article>
        <article className="mini-card">
          <span>12</span>
          <small>Saved notes</small>
        </article>
      </section>

      <section className="feature-panel">
        <div className="panel-header">
          <h2>{t('home.featured')}</h2>
          <Link to="/bible">{t('common.read')}</Link>
        </div>
        <p className="verse-text">“{featured.text}”</p>
        <small className="reference">{featured.reference}</small>
      </section>

      <section className="sections-grid">
        <article className="panel-surface">
          <h3>{t('home.recent')}</h3>
          <ul className="list-plain">
            <li>John 1 • 4 verses</li>
            <li>Psalm 23 • 3 verses</li>
            <li>Weekly prayer • 1 note</li>
          </ul>
        </article>
        <article className="panel-surface">
          <h3>{t('home.notes')}</h3>
          <ul className="list-plain">
            <li>Grace is seen in daily faith.</li>
            <li>Peace comes through stillness.</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
