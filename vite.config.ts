import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Kodun GitHub Actions'ta mı yoksa senin bilgisayarında mı (APK için) çalıştığını algılar
const isGitHub = process.env.GITHUB_ACTIONS === 'true';

// GitHub'daysa '/261sh/', değilse (APK) './' kullanır.
const basePath = isGitHub ? '/261sh/' : './';

export default defineConfig(() => {
  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: basePath,
          name: 'TCDD 261 Sinyalizasyon ve Haberleşme Şefliği',
          short_name: 'TCDD Saha',
          description: 'TCDD 261 Sinyalizasyon ve Haberleşme Şefliği Saha Veri Asistanı',
          theme_color: '#1e3a8a',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait',
          start_url: basePath,
          scope: basePath,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
