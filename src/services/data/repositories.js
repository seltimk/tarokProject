import { getDataAdapter } from '@/services/data/adapters.js'

const adapter = getDataAdapter()

const getTranslations = async () => {
  if (adapter instanceof Object && 'fetchJson' in adapter) {
    return adapter.fetchJson('/data/bible/translations.json')
  }
  return []
}

export const bibleRepository = {
  async getTranslations() {
    return getTranslations()
  },

  async getBooks(translationId = 'eng') {
    const data = await adapter.fetchJson(`/data/bible/${translationId}.json`)
    return Object.keys(data.books || {})
  },

  async getChapter(translationId = 'eng', book = 'John', chapter = 1) {
    const data = await adapter.fetchJson(`/data/bible/${translationId}.json`)
    return (data.books?.[book]?.[chapter] || []).map((verse) => ({
      ...verse,
      reference: `${book} ${chapter}:${verse.verse}`,
    }))
  },

  async searchVerses(translationId = 'eng', query = '') {
    const data = await adapter.fetchJson(`/data/bible/${translationId}.json`)
    if (!query.trim()) return []
    const lower = query.trim().toLowerCase()

    return Object.entries(data.books || {}).flatMap(([book, chapters]) =>
      Object.entries(chapters).flatMap(([chapter, verses]) =>
        verses
          .filter((verse) => verse.text.toLowerCase().includes(lower))
          .map((verse) => ({
            ...verse,
            book,
            chapter,
            reference: `${book} ${chapter}:${verse.verse}`,
          })),
      ),
    )
  },
}

export const dictionaryRepository = {
  async search(query = '') {
    const resource = await adapter.fetchJson('/data/dictionary/entries.json')
    if (!query.trim()) return resource.entries || []
    const normalized = query.trim().toLowerCase()

    return (resource.entries || []).filter((entry) => {
      const haystack = [entry.term, entry.meanings.join(' '), Object.values(entry.translations || {}).join(' ')].join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  },

  async getEntry(term = 'love') {
    const resource = await adapter.fetchJson('/data/dictionary/entries.json')
    const entries = resource.entries || []
    return entries.find((entry) => entry.term.toLowerCase() === term.toLowerCase()) || entries[0]
  },
}
