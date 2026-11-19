import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en.json'
import ha from '@/locales/ha.json'
import yo from '@/locales/yo.json'
import ig from '@/locales/ig.json'
import fr from '@/locales/fr.json'
import ar from '@/locales/ar.json'
import es from '@/locales/es.json'
import pt from '@/locales/pt.json'

const savedLanguage = localStorage.getItem('kalma-language')
const browserLanguage = navigator.language?.split('-')[0] || 'en'
const defaultLanguage = savedLanguage || ['en', 'ha', 'yo', 'ig', 'fr', 'ar', 'es', 'pt'].includes(browserLanguage)
  ? savedLanguage || browserLanguage
  : 'en'

const resources = {
  en: { translation: en },
  ha: { translation: ha },
  yo: { translation: yo },
  ig: { translation: ig },
  fr: { translation: fr },
  ar: { translation: ar },
  es: { translation: es },
  pt: { translation: pt },
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
