// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin. Used for canonical URLs, OG tags, JSON-LD and the sitemap.
const SITE = process.env.PUBLIC_SITE_URL || 'https://tve.photo';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app'],
    },
  },
  integrations: [
    sitemap({
      // /portfolio/ only redirects to the first gallery; keep it out of the sitemap.
      filter: (page) => !/\/portfolio\/$/.test(page) && !page.includes('/404'),
    }),
  ],
});
