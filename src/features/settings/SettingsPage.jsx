import { useTranslation } from 'react-i18next'
import { useTheme } from '@/app/providers/ThemeProvider.jsx'

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Hausa', value: 'ha' },
  { label: 'Yorùbá', value: 'yo' },
  { label: 'Igbo', value: 'ig' },
  { label: 'Français', value: 'fr' },
  { label: 'العربية', value: 'ar' },
  { label: 'Español', value: 'es' },
  { label: 'Português', value: 'pt' },
]

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme, resolvedTheme } = useTheme()

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('kalma-language', nextLanguage)
  }

  return (
    <div className="page-shell">
      <section className="settings-panel">
        <h2>{t('settings.title')}</h2>

        <label className="field-row">
          <span>{t('settings.theme')}</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="light">{t('theme.light')}</option>
            <option value="dark">{t('theme.dark')}</option>
            <option value="system">{t('theme.system')}</option>
          </select>
        </label>

        <label className="field-row">
          <span>{t('settings.language')}</span>
          <select value={i18n.resolvedLanguage} onChange={handleLanguageChange}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <div className="meta-card">
          <strong>{t('settings.about')}</strong>
          <p>
            {t('settings.version')}: {import.meta.env.VITE_APP_VERSION || '0.1.0'}
          </p>
          <p>Current theme: {resolvedTheme}</p>
        </div>
      </section>
    </div>
  )
}
