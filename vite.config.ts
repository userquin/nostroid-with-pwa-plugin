import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const injectRegister = (process.env.SW_INLINE ?? 'auto') as 'inline' | 'auto' | 'script'
const selfDestroying = process.env.SW_DESTROY === 'true'

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  optimizeDeps: {
      include: ['readable-stream'],
  },
  plugins: [
    VitePWA({
      mode: 'development',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'claims-sw.ts',
      base: '/',
      includeAssets: ['favicon.svg'],
      injectRegister,
      selfDestroying,
      manifest: {
        name: 'PWA Router',
        short_name: 'PWA Router',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: true/*process.env.SW_DEV === 'true'*/,
        type: 'module',
        /* when using generateSW the PWA plugin will switch to classic */
        navigateFallback: 'index.html',
      },
    }),
  ],
})
