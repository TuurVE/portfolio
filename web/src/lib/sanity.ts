import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Photo } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';

/**
 * Without a project ID the site renders the built-in demo content from
 * ./fallback.ts, so it can be developed before Sanity is set up. On Cloudflare
 * Workers Builds (WORKERS_CI=1) a missing ID is a configuration error: we'd
 * rather fail the build than publish demo content to tve.photo.
 */
export const isDemo = !projectId;

if (isDemo && process.env.WORKERS_CI) {
  throw new Error(
    'PUBLIC_SANITY_PROJECT_ID is not set. Add it under Workers → Settings → Build → Variables.',
  );
}

export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      // Builds only run on publish, so always read fresh data from the API
      // rather than the (slightly delayed) CDN cache.
      useCdn: false,
      perspective: 'published',
    })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export async function fetchQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params);
}

/* ------------------------------------------------------------------------ */
/* Images                                                                    */
/* ------------------------------------------------------------------------ */

export function hasImage(photo: Photo | null | undefined): photo is Photo & { asset: { _id: string } } {
  return Boolean(builder && photo?.asset?._id);
}

/** Pixel size of the image after the editor's crop, used for width/height attributes. */
export function croppedSize(photo: Photo): { width: number; height: number } | null {
  const dims = photo.asset?.metadata?.dimensions;
  if (!dims) return null;
  const c = photo.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  return {
    width: Math.round(dims.width * (1 - c.left - c.right)),
    height: Math.round(dims.height * (1 - c.top - c.bottom)),
  };
}

/**
 * Builds a CDN URL. With `aspect` the image is cropped to that ratio around
 * the editor's hotspot; without it the (cropped) original ratio is kept.
 */
export function imageUrl(
  photo: Photo,
  width: number,
  opts: { aspect?: number; format?: 'jpg' | 'webp'; quality?: number } = {},
): string {
  if (!builder || !photo.asset?._id) return '';
  // Hand the builder a plain image record (asset ref + crop + hotspot); our
  // asset is dereferenced, and the builder would otherwise try to parse its url.
  const source = { asset: { _ref: photo.asset._id }, crop: photo.crop, hotspot: photo.hotspot };
  let b = builder.image(source).width(width).quality(opts.quality ?? 80);
  if (opts.aspect) b = b.height(Math.round(width / opts.aspect)).fit('crop');
  else b = b.fit('max');
  b = opts.format ? b.format(opts.format) : b.auto('format');
  return b.url();
}

export function imageSrcset(photo: Photo, widths: number[], aspect?: number): string {
  const size = croppedSize(photo);
  // Never ask the CDN to upscale beyond the original.
  const usable = size ? widths.filter((w) => w <= size.width) : widths;
  const list = usable.length ? usable : [size?.width ?? widths[0]];
  return list.map((w) => `${imageUrl(photo, w, { aspect })} ${w}w`).join(', ');
}
