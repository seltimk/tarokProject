import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml', 'offline.html'],
      manifest: {
        name: 'Kalma',
        short_name: 'Kalma',
        description: 'Bible and dictionary platform for Nigerian languages',
        theme_color: '#0F5132',
        background_color: '#FAF7F0',
        display: 'standalone',
        start_url: '/',
        lang: 'en',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
})
