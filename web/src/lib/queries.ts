// GROQ queries. Every image is projected with IMAGE so the asset reference is
// dereferenced into { _id, url, metadata { lqip, dimensions } }: that gives us
// width/height attributes (no layout shift) and a blurred placeholder for free.

const IMAGE = `{ ..., asset->{ _id, url, metadata { lqip, dimensions } } }`;
const SEO = `seo{ ..., image${IMAGE} }`;
const STAT = `{ _id, kicker, value, label, unit }`;

export const settingsQuery = `*[_id == "siteSettings"][0]{
  ...,
  "stats": stats[]->${STAT},
  ${SEO}
}`;

export const galleriesQuery = `*[_type == "gallery" && defined(slug.current)] | order(order asc, title asc){
  _id,
  title,
  "slug": slug.current,
  tagline,
  intro,
  cover${IMAGE},
  "photos": coalesce(photos[]${IMAGE}, []),
  ${SEO}
}`;

export const homeQuery = `*[_id == "homePage"][0]{
  ...,
  hero{ ..., image${IMAGE} },
  recentFrames[]${IMAGE},
  instagramPosts[]{ ..., image${IMAGE} },
  ${SEO}
}`;

export const aboutQuery = `*[_id == "aboutPage"][0]{
  ...,
  portrait${IMAGE},
  ${SEO}
}`;

export const experienceQuery = `*[_id == "experiencePage"][0]{
  ...,
  featured{ ..., image${IMAGE}, stat->${STAT} },
  entries[]{ ..., stat->${STAT} },
  photos[]${IMAGE},
  ${SEO}
}`;

export const contactQuery = `*[_id == "contactPage"][0]{
  ...,
  image${IMAGE},
  ${SEO}
}`;
