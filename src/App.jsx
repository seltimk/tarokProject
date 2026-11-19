import { Suspense } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppProviders from '@/app/providers/AppProviders.jsx'
import { useTheme } from '@/app/providers/ThemeProvider.jsx'
import { appConfig } from '@/config/app.config.js'
import featureRegistry from '@/config/features.js'
import NotFoundPage from '@/features/NotFoundPage.jsx'
import '@/styles/tokens.css'
import '@/styles/themes.css'
import '@/styles/global.css'
import './App.css'
import { FaHome } from 'react-icons/fa';

function AppShell() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <aside className="sidebar">
        <div className="brand-block">
          <img src={appConfig.logoPath} alt={appConfig.name} className="brand-logo" />
          <div>
            <h1>{appConfig.name}</h1>
            <p>{appConfig.tagline}</p>
          </div>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          {featureRegistry.map((feature) => (

            <NavLink
              key={feature.id}
              to={feature.route}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              end={feature.route === '/'}
            >
              <span className="nav-icon" aria-hidden="true">{feature.icon}</span>
              {t(`nav.${feature.id}`) || feature.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main id="content" className="content-panel">
        <header className="app-header">
          <div>
            <p className="eyebrow">{appConfig.name}</p>
            <h2>{t('home.tagline')}</h2>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        <Suspense fallback={<div className="loading-panel">Loading…</div>}>
          <Routes>
            {featureRegistry.map((feature) => (
              <Route key={feature.id} path={feature.route} element={<feature.component />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <nav className="bottom-nav" aria-label="Quick navigation">
        {featureRegistry.map((feature) => (
          <NavLink
            key={feature.id}
            to={feature.route}
            className={({ isActive }) => `bottom-link ${isActive ? 'is-active' : ''}`}
            end={feature.route === '/'}
          >
            <span aria-hidden="true">{feature.icon}</span>
            <small>{feature.name}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  )
}
