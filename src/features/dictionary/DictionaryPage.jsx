import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { dictionaryRepository } from '@/services/data/repositories.js'

export default function DictionaryPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('love')

  const { data: results = [] } = useQuery({
    queryKey: ['dictionary', query],
    queryFn: () => dictionaryRepository.search(query),
  })

  return (
    <div className="page-shell">
      <div className="search-box">
        <input
          aria-label={t('dictionary.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('dictionary.searchPlaceholder')}
        />
      </div>

      <div className="chip-row">
        {['en', 'ha', 'yo', 'ig'].map((lang) => (
          <button key={lang} type="button" className="chip" aria-pressed={false}>
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <section className="result-list">
        {results.length ? (
          results.map((entry) => (
            <article key={entry.term} className="result-card">
              <div className="result-header">
                <h3>{entry.term}</h3>
                <span>{entry.partOfSpeech}</span>
              </div>
              <p>{entry.meanings.join(', ')}</p>
              <ul>
                {entry.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <p>{t('empty.title')}</p>
          </div>
        )}
      </section>
    </div>
  )
}
