import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { bibleRepository } from '@/services/data/repositories.js'

const BOOK_OPTIONS = ['John', 'Psalm', 'Genesis', 'Proverbs']

export default function BiblePage() {
  const { t } = useTranslation()
  const { data: translations = [] } = useQuery({
    queryKey: ['translations'],
    queryFn: bibleRepository.getTranslations,
  })

  const [selectedTranslation, setSelectedTranslation] = useState('eng')
  const [book, setBook] = useState('John')
  const [chapter, setChapter] = useState(1)

  const { data: chapterVerses = [] } = useQuery({
    queryKey: ['chapter', selectedTranslation, book, chapter],
    queryFn: () => bibleRepository.getChapter(selectedTranslation, book, chapter),
  })

  const parallelTranslations = useMemo(() => {
    const items = translations.filter((item) => item.id !== selectedTranslation)
    return [selectedTranslation, items[0]?.id || 'hau']
  }, [selectedTranslation, translations])

  return (
    <div className="page-shell">
      <div className="toolbar-card">
        <label>
          <span>{t('bible.translation')}</span>
          <select value={selectedTranslation} onChange={(event) => setSelectedTranslation(event.target.value)}>
            {translations.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span>{t('bible.book')}</span>
          <select value={book} onChange={(event) => setBook(event.target.value)}>
            {BOOK_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>{t('bible.chapter')}</span>
          <select value={chapter} onChange={(event) => setChapter(Number(event.target.value))}>
            {[1, 2, 3].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="parallel-columns">
        {parallelTranslations.filter(Boolean).map((translationId) => (
          <div key={translationId} className="parallel-panel">
            <div className="panel-header">
              <h3>{translations.find((item) => item.id === translationId)?.name || translationId}</h3>
              <span>{book} {chapter}</span>
            </div>
            {chapterVerses.length ? (
              <div className="verse-list">
                {chapterVerses.map((verse) => (
                  <p key={verse.reference} className="verse-item">
                    <span className="verse-number">{verse.verse}</span>
                    {verse.text}
                  </p>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>{t('empty.title')}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
