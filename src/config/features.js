import { lazy } from 'react'

const HomePage = lazy(() => import('@/features/home/HomePage.jsx'))
const BiblePage = lazy(() => import('@/features/bible/BiblePage.jsx'))
const DictionaryPage = lazy(() => import('@/features/dictionary/DictionaryPage.jsx'))
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage.jsx'))

export const featureRegistry = [
  {
    id: 'home',
    name: 'Home',
    icon: 'FaHome',
    route: '/',
    component: HomePage,
    navOrder: 0,
  },
  {
    id: 'bible',
    name: 'Bible',
    icon: '📖',
    route: '/bible',
    component: BiblePage,
    navOrder: 1,
  },
  {
    id: 'dictionary',
    name: 'Dictionary',
    icon: '📚',
    route: '/dictionary',
    component: DictionaryPage,
    navOrder: 2,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    route: '/settings',
    component: SettingsPage,
    navOrder: 3,
  },

    {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    route: '/settings',
    component: SettingsPage,
    navOrder: 3,
  },
]

export default featureRegistry
