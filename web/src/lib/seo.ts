// Structured data (JSON-LD) builders. Search engines and AI answer engines use
// these to understand who Tuur is and who owns the photos.

import { imageUrl, hasImage } from './sanity';
import { altFor, instagramUrl } from './content';
import type { Gallery, SiteSettings } from './types';

export function personId(site: URL) {
  return new URL('/#person', site).href;
}

export function personSchema(settings: SiteSettings, site: URL) {
  const insta = instagramUrl(settings);
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: settings.photographerName,
    jobTitle: settings.jobTitle || 'Sports photographer',
    url: new URL('/about/', site).href,
    address: { '@type': 'PostalAddress', addressCountry: 'BE' },
    ...(insta ? { sameAs: [insta] } : {}),
  };
}

export function businessSchema(settings: SiteSettings, site: URL) {
  return {
    '@type': 'ProfessionalService',
    '@id': new URL('/#business', site).href,
    name: settings.siteTitle,
    description: settings.seo?.description || settings.description,
    url: site.href,
    founder: { '@id': personId(site) },
    areaServed: settings.location || 'Belgium',
    knowsAbout: ['Sports photography', 'Football photography', 'Cycling photography', 'Motorsport photography'],
    ...(settings.email ? { email: settings.email } : {}),
  };
}

export function websiteSchema(settings: SiteSettings, site: URL) {
  return {
    '@type': 'WebSite',
    '@id': new URL('/#website', site).href,
    name: settings.siteTitle,
    url: site.href,
    inLanguage: 'en',
    publisher: { '@id': personId(site) },
  };
}

/** ImageGallery with one ImageObject per photo, carrying creator/copyright/licence info. */
export function gallerySchema(gallery: Gallery, settings: SiteSettings, site: URL, pageUrl: string) {
  const year = new Date().getFullYear();
  const license = settings.licenseUrl || new URL('/contact/', site).href;
  return {
    '@type': 'ImageGallery',
    name: `${gallery.title} photography`,
    url: pageUrl,
    author: { '@id': personId(site) },
    associatedMedia: gallery.photos.filter(hasImage).map((p) => ({
      '@type': 'ImageObject',
      contentUrl: imageUrl(p, 2000, { format: 'jpg' }),
      thumbnailUrl: imageUrl(p, 480, { format: 'jpg' }),
      name: altFor(p, `${gallery.title} photo`),
      ...(p.caption ? { caption: p.caption } : {}),
      creator: { '@type': 'Person', name: settings.photographerName, '@id': personId(site) },
      creditText: `${settings.photographerName} / ${settings.siteTitle}`,
      copyrightHolder: { '@id': personId(site) },
      copyrightNotice: `© ${year} ${settings.photographerName}`,
      license,
      acquireLicensePage: new URL('/contact/', site).href,
    })),
  };
}
