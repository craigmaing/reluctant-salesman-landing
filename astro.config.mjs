// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      assetsInlineLimit: 0 // Prevent inlining to allow caching
    }
  },
  build: {
    inlineStylesheets: 'never' // Allow CSS to be cached separately
  },
  server: {
    headers: {
      // Cache static assets for 1 year
      '/assets/*': 'Cache-Control: public, max-age=31536000, immutable',
      // Cache HTML for 1 hour
      '/': 'Cache-Control: public, max-age=3600, must-revalidate'
    }
  }
});