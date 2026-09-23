// Demo content, copied from the approved design. Used when no Sanity project
// is configured (local development) and as a per-document fallback while the
// CMS is still empty. Photos have no asset, so they render as placeholders.

import type {
  AboutPage,
  ContactPage,
  ExperiencePage,
  Gallery,
  HomePage,
  Photo,
  SiteSettings,
  Stat,
} from './types';

const ph = (placeholder: string, caption?: string): Photo => ({ placeholder, caption });

const stats: Record<string, Stat> = {
  stvv: { _id: 'stat-stvv', kicker: 'STVV', value: '10', label: 'Pro League games', unit: 'matches' },
  thes: { _id: 'stat-thes', kicker: 'Thes Sport', value: '30+', label: 'Games in 1.5 seasons', unit: 'games covered' },
  amateur: { _id: 'stat-amateur', kicker: 'Amateur football', value: '10+', label: 'Amateur games', unit: 'games covered' },
  jumping: { _id: 'stat-jumping', kicker: 'Horse jumping', value: '3', label: 'International jumpings', unit: 'international shows' },
  zolder: { _id: 'stat-zolder', kicker: 'Zolder 2025', value: '24H', label: 'Team Belgium Racing', unit: 'trackside' },
};

export const fallbackSettings: SiteSettings = {
  siteTitle: 'TVE.photo',
  photographerName: 'Tuur Van Eynde',
  jobTitle: 'Sports photographer',
  description: 'Sports photography from Belgium. Football, cycling, motorsport and events.',
  location: 'Belgium',
  instagramHandle: 'tve.photo',
  navigation: [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Experience', page: 'experience' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Contact', page: 'contact' },
  ],
  stats: [stats.stvv, stats.thes, stats.jumping, stats.zolder],
  seo: {
    title: 'TVE.photo — Sports photography, Belgium',
    description:
      'Tuur Van Eynde is a Belgian sports photographer covering Pro League football, cycling, motorsport and equestrian events.',
  },
};

const ids = {
  football: ['DSC04468', '312', 'DSC06163', 'DSC06140', 'DSC04078', 'DSC01800', 'DSC01785', 'DSC03987', 'DSC04235', 'DSC04022', 'DSC02737', 'DSC02245', 'DSC01845', 'DSC02150', 'DSC08020'],
  cycling: ['DSC02996', 'DSC07752', 'IMG_20260824_162742', 'IMG_20260824_162714', 'DSC05644', 'DSC03852', 'DSC03052', 'DSC03090', 'DSC03277', 'DSC03197', 'DSC_0676', 'DSC03913', 'DSC00002', 'DSC_0601', 'DSC_0607'],
  motorsport: ['DSC09877', 'DSC00670', 'DSC00470', 'DSC00827', 'DSC00846', 'DSC_0141', 'DSC09563', 'DSC_0115', 'DSC08900', 'DSC09619', 'DSC_0032', 'DSC_0114', 'DSC09750', 'DSC09449', 'DSC_0622'],
  event: ['DSC04333', 'DSC03749', 'DSC03761', 'DSC04201', 'DSC03851', 'DSC04089', 'DSC03641', 'DSC03872', 'DSC04302', 'DSC03864'],
};

const gallery = (slug: keyof typeof ids, title: string, tagline: string, cover: string): Gallery => ({
  _id: `gallery-${slug}`,
  title,
  slug,
  tagline,
  cover: ph(cover),
  photos: ids[slug].map((id) => ph(id, 'Caption — who, what, when')),
});

export const fallbackGalleries: Gallery[] = [
  gallery('football', 'Football', 'Pro League, youth & amateur', 'DSC06163'),
  gallery('cycling', 'Cycling', 'Races & the roadside', 'DSC02996'),
  gallery('motorsport', 'Motorsport', 'Track, pitlane & paddock', 'DSC09877'),
  gallery('event', 'Event', 'Horse jumping & more', 'DSC04333'),
];

export const fallbackHome: HomePage = {
  hero: {
    eyebrow: 'Sports photography — Belgium',
    headline: 'High-speed action.\nRaw emotion.\nDefining moments.',
    intro: 'I specialise in dynamic sports photography that freezes time and tells the story behind every play.',
    image: ph('HERO · DSC04468'),
    primaryCtaLabel: 'View portfolio',
    secondaryCtaLabel: 'Get in touch',
  },
  sportsTitle: 'Four sports, one eye',
  recentTitle: 'Recent frames',
  recentCtaLabel: 'Full portfolio',
  recentFrames: ['DSC04468', 'DSC07752', 'DSC02434', 'DSC04235', 'DSC_0141', 'DSC03933', 'DSC_0114', 'DSC02132'].map((id) => ph(id)),
  statsTitle: 'Where I’ve stood',
  statsCtaLabel: 'See experience',
  instagramTitle: 'Follow me on Instagram',
  instagramCtaLabel: 'Follow @tve.photo',
  instagramPosts: [
    { url: 'https://www.instagram.com/p/DcTuiYFjHtz/', image: ph('Instagram post 1') },
    { url: 'https://www.instagram.com/p/Db2pnnljAJP/', image: ph('Instagram post 2') },
    { url: 'https://www.instagram.com/p/DbiEhLODKTm/', image: ph('Instagram post 3') },
    { url: 'https://www.instagram.com/p/DbbElwljGd8/', image: ph('Instagram post 4') },
  ],
};

const para = (text: string, key: string) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
});

export const fallbackAbout: AboutPage = {
  title: 'About me',
  portrait: ph('Portrait', 'Tuur Van Eynde — on the sideline'),
  lead: 'Hi, I’m Tuur Van Eynde, a 19-year-old sports photographer from Belgium.',
  body: [
    para(
      'After finishing secondary school with a diploma in Print Media, I’m now studying Sports Management. What started as a camera on the sidelines has grown into sports photography across football, cycling, motorsport and equestrian events.',
      'p1',
    ),
    para(
      'I focus on action, authenticity and detail — whether it’s during a race, in the pitlane or behind the scenes.',
      'p2',
    ),
  ],
  facts: [
    { label: 'Based in', value: 'Belgium' },
    { label: 'Studying', value: 'Sports Management' },
    { label: 'Background', value: 'Print Media' },
    { label: 'Shoots', value: 'Football · Cycling · Motorsport · Events' },
  ],
  primaryCtaLabel: 'View my portfolio',
  secondaryCtaLabel: 'Contact me',
  goalEyebrow: 'My goal',
  goalText: 'To tell the full story of sport through powerful images that leave a lasting impression.',
};

export const fallbackExperience: ExperiencePage = {
  title: 'Experience',
  intro: 'From the Pro League to international show jumping and a 24-hour race — a selection of where I’ve worked.',
  featured: {
    image: ph('DSC03987', 'STVV — Pro League'),
    category: 'Pro League · Football',
    title: 'STVV',
    stat: stats.stvv,
    meta: 'Home & away · Play-off 1',
    matches: [
      'STVV – KVC Westerlo',
      'STVV – KRC Genk',
      'STVV – RSC Anderlecht',
      'STVV – Club Brugge',
      'STVV – SK Beveren',
      'STVV – Zulte Waregem',
      'STVV – Cercle Brugge',
      'KRC Genk – STVV',
      'STVV – Union SG',
      'STVV – Play-off 1',
    ],
  },
  moreTitle: 'Beyond the Pro League',
  entries: [
    { category: 'Football · Club media', title: 'Thes Sport', stat: stats.thes, details: ['1.5 seasons'] },
    { category: 'Football', title: 'Amateur games', stat: stats.amateur, details: ['Local & regional football'] },
    {
      category: 'Equestrian',
      title: 'Horse jumping',
      stat: stats.jumping,
      details: ['Jumping Maastricht', 'Jumping Mechelen', 'Jumping Amsterdam'],
    },
    { category: 'Motorsport · Endurance', title: '24 Hours of Zolder 2025', stat: stats.zolder, details: ['Team Belgium Racing'] },
  ],
  photos: ['DSC07983', 'DSC05642', 'DSC02062'].map((id) => ph(id, 'Caption — who, what, when')),
  ctaText: 'Covering a match, race or event?',
  ctaLabel: 'Get in touch',
};

export const fallbackContact: ContactPage = {
  title: 'Let’s work together',
  intro: 'Club, athlete or event organiser? Tell me about your match, race or event and I’ll get back to you.',
  image: ph('DSC08020'),
  submitLabel: 'Send message',
  successMessage: 'Thanks — your message is on its way. I’ll get back to you soon.',
};
