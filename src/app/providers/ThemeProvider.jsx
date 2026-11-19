import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const resolveTheme = (preferredTheme) => {
  if (preferredTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return preferredTheme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('kalma-theme') || 'system'
    return saved
  })

  useEffect(() => {
    const root = document.documentElement
    const resolved = resolveTheme(theme)
    root.setAttribute('data-theme', resolved)
    root.style.colorScheme = resolved
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      resolved === 'dark' ? '#121A16' : '#FAF7F0',
    )
    localStorage.setItem('kalma-theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        const resolved = resolveTheme('system')
        document.documentElement.setAttribute('data-theme', resolved)
        document.documentElement.style.colorScheme = resolved
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme: resolveTheme(theme),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}
