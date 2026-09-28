// Shapes of the data the site renders. They mirror the Sanity schemas in
// /studio/schemaTypes after the GROQ projections in ./queries.ts.

import type { PortableTextBlock } from '@portabletext/types';

export interface ImageAsset {
  _id: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: { width: number; height: number; aspectRatio: number };
  };
}

/** A Sanity image field with the asset dereferenced, plus our alt/caption sub-fields. */
export interface Photo {
  _key?: string;
  asset?: ImageAsset | null;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
  /** Only used by demo content: the file name shown on the placeholder. */
  placeholder?: string;
}

export interface Seo {
  title?: string;
  description?: string;
  image?: Photo;
  noIndex?: boolean;
}

export type PageKey = 'home' | 'about' | 'experience' | 'portfolio' | 'contact';

export interface NavItem {
  _key?: string;
  label: string;
  page: PageKey;
}

export interface Stat {
  _id: string;
  kicker: string;
  value: string;
  label: string;
  unit?: string;
}

export interface SiteSettings {
  siteTitle: string;
  photographerName: string;
  jobTitle?: string;
  description: string;
  location: string;
  email?: string;
  instagramHandle?: string;
  navigation: NavItem[];
  stats: Stat[];
  licenseUrl?: string;
  seo?: Seo;
}

export interface Gallery {
  _id: string;
  title: string;
  slug: string;
  tagline?: string;
  intro?: string;
  cover?: Photo;
  photos: Photo[];
  seo?: Seo;
  shownOnHomepage?: boolean;
}

export interface HomePage {
  hero: {
    headline: string;
    intro?: string;
    image?: Photo;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  sportsTitle?: string;
  recentTitle?: string;
  recentCtaLabel?: string;
  recentFrames?: Photo[];
  statsTitle?: string;
  statsCtaLabel?: string;
  instagramTitle?: string;
  instagramCtaLabel?: string;
  instagramPosts?: { _key?: string; url?: string; image?: Photo }[];
  seo?: Seo;
}

export interface AboutPage {
  title: string;
  portrait?: Photo;
  lead?: string;
  body?: PortableTextBlock[];
  facts?: { _key?: string; label: string; value: string }[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  goalEyebrow?: string;
  goalText?: string;
  seo?: Seo;
}

export interface ExperienceEntry {
  _key?: string;
  category?: string;
  title: string;
  stat?: Stat | null;
  details?: string[];
}

export interface ExperiencePage {
  title: string;
  intro?: string;
  featured?: {
    image?: Photo;
    category?: string;
    title: string;
    stat?: Stat | null;
    meta?: string;
    matches?: string[];
  };
  moreTitle?: string;
  entries?: ExperienceEntry[];
  photos?: Photo[];
  ctaText?: string;
  ctaLabel?: string;
  seo?: Seo;
}

export interface ContactPage {
  title: string;
  intro?: string;
  image?: Photo;
  submitLabel?: string;
  successMessage?: string;
  seo?: Seo;
}
