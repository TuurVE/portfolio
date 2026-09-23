// One place pages get their data from. Each loader fetches from Sanity when a
// project is configured and falls back to demo content otherwise (or when the
// document hasn't been created in the Studio yet). Results are memoised for
// the duration of the build, so shared data (settings, galleries) is fetched once.

import { fetchQuery } from './sanity';
import * as q from './queries';
import * as fb from './fallback';
import type {
  AboutPage,
  ContactPage,
  ExperiencePage,
  Gallery,
  HomePage,
  PageKey,
  Photo,
  SiteSettings,
} from './types';

const cache = new Map<string, Promise<unknown>>();

function load<T>(key: string, query: string, fallback: T): Promise<T> {
  if (!cache.has(key)) {
    // A document that doesn't exist yet in the Studio falls back to demo content.
    cache.set(key, fetchQuery<T>(query).then((doc) => doc ?? fallback));
  }
  return cache.get(key) as Promise<T>;
}

export const getSettings = () =>
  load<SiteSettings>('settings', q.settingsQuery, fb.fallbackSettings).then((s) => ({
    ...s,
    siteTitle: s.siteTitle || fb.fallbackSettings.siteTitle,
    photographerName: s.photographerName || fb.fallbackSettings.photographerName,
    navigation: s.navigation?.length ? s.navigation : fb.fallbackSettings.navigation,
    stats: (s.stats ?? []).filter(Boolean),
  }));

export const getGalleries = () => load<Gallery[]>('galleries', q.galleriesQuery, fb.fallbackGalleries);

export const getHome = () => load<HomePage>('home', q.homeQuery, fb.fallbackHome);
export const getAbout = () => load<AboutPage>('about', q.aboutQuery, fb.fallbackAbout);
export const getExperience = () => load<ExperiencePage>('experience', q.experienceQuery, fb.fallbackExperience);
export const getContact = () => load<ContactPage>('contact', q.contactQuery, fb.fallbackContact);

/* ------------------------------------------------------------------------ */
/* Routing helpers                                                           */
/* ------------------------------------------------------------------------ */

export const galleryPath = (g: Pick<Gallery, 'slug'>) => `/portfolio/${g.slug}/`;

export function pagePath(page: PageKey, galleries: Gallery[]): string {
  switch (page) {
    case 'home':
      return '/';
    case 'portfolio':
      return galleries[0] ? galleryPath(galleries[0]) : '/portfolio/';
    default:
      return `/${page}/`;
  }
}

export function instagramUrl(settings: SiteSettings): string | undefined {
  const handle = settings.instagramHandle?.replace(/^@/, '').trim();
  return handle ? `https://www.instagram.com/${handle}/` : undefined;
}

/* ------------------------------------------------------------------------ */
/* Photo metadata                                                            */
/* ------------------------------------------------------------------------ */

export interface PhotoInfo {
  alt?: string;
  caption?: string;
  gallery: Gallery;
}

/**
 * Photos picked on the home page are the same assets as in the galleries.
 * This index lets those picks inherit the alt text / caption Tuur already
 * wrote in the gallery, so he only has to write them once.
 */
export async function getPhotoIndex(): Promise<Map<string, PhotoInfo>> {
  const galleries = await getGalleries();
  const index = new Map<string, PhotoInfo>();
  for (const gallery of galleries) {
    for (const p of [gallery.cover, ...gallery.photos]) {
      const id = p?.asset?._id;
      if (!id) continue;
      const prev = index.get(id);
      index.set(id, {
        gallery: prev?.gallery ?? gallery,
        alt: prev?.alt || p.alt,
        caption: prev?.caption || p.caption,
      });
    }
  }
  return index;
}

/** Alt text with sensible fallbacks, so no image ever ships with an empty alt by accident. */
export function altFor(photo: Photo | undefined, fallback: string, index?: Map<string, PhotoInfo>): string {
  const fromIndex = photo?.asset?._id ? index?.get(photo.asset._id) : undefined;
  return photo?.alt?.trim() || fromIndex?.alt?.trim() || photo?.caption?.trim() || fromIndex?.caption?.trim() || fallback;
}
