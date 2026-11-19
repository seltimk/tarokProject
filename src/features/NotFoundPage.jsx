import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="page-shell centered-panel">
      <h1>{t('notfound.title')}</h1>
      <p>{t('notfound.message')}</p>
      <Link to="/" className="primary-link">Back home</Link>
    </div>
  )
}
