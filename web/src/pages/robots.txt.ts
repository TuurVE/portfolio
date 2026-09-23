import type { APIRoute } from 'astro';

// AI crawlers are allowed on purpose (GEO). If Cloudflare's "Block AI bots"
// setting is on, it overrides this file — check it in the Cloudflare dashboard.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
