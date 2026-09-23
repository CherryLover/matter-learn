// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Cloudflare adapter — uncomment when deploying to Cloudflare Workers/Pages with SSR
// import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://matter-learn.flyooo.uk',
  output: 'static',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      // "/" renders the Chinese home page but its canonical is /zh/, so only
      // list the canonical language URLs.
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // adapter: cloudflare(),
});
