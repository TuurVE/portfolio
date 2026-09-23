# TVE.photo

Portfolio site for Tuur Van Eynde, a Belgian sports photographer.

| Folder    | What                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| `web/`    | Astro site. Fully static, hosted as a Cloudflare Worker (static assets only). |
| `studio/` | Sanity Studio, where Tuur edits all text and photos. Hosted on `tve-photo.sanity.studio`. |

```
Tuur publishes in Sanity ──webhook──▶ Cloudflare Workers Builds deploy hook
                                       └─ npx astro build → npx wrangler deploy → tve.photo
Visitors ──▶ tve.photo (static HTML/CSS, a little JS)
         └─▶ cdn.sanity.io (images, resized/cropped/WebP/AVIF on the fly)
```

There is no backend. The contact form posts to Web3Forms.

---

## Local development

Requires Node 22.12+.

```sh
# Website (runs on demo content until .env has a Sanity project ID)
cd web
cp .env.example .env
npm install
npm run dev            # http://localhost:4321

# Studio
cd studio
cp .env.example .env   # fill in SANITY_STUDIO_PROJECT_ID
npm install
npm run dev            # http://localhost:3333
```

Without `PUBLIC_SANITY_PROJECT_ID`, the site uses the demo content in `web/src/lib/fallback.ts`, which copies the approved design, with placeholder frames instead of photos. On Cloudflare the build fails when the ID is missing, so demo content can't be published by accident.

Useful commands in `web/`: `npm run check` (type check), `npm run build`, `npm run preview` (serves `dist/` through Wrangler, the same way Cloudflare does).

### How the code is organised (web)

```
src/lib/sanity.ts     Sanity client + image URL/srcset helpers
src/lib/queries.ts    GROQ queries (one per page + settings + galleries)
src/lib/content.ts    Loaders used by pages (memoised, with demo fallback), routing helpers
src/lib/seo.ts        JSON-LD: Person, ProfessionalService, WebSite, ImageGallery/ImageObject
src/lib/fallback.ts   Demo content (= design copy)
src/components/       Header, Footer, Photo (responsive Sanity image), Lightbox, …
src/pages/            index, about, experience, contact, portfolio/[slug], 404, robots.txt
```

If you know Drupal: Sanity document types are like content types, `studio/schemaTypes/` is the field configuration, and GROQ plays the role of Views. Astro pages are templates that run once at build time. The output is plain HTML files.

---

## One-time setup

### 1. Sanity

1. Create a project at <https://www.sanity.io/manage> (free plan) with a **public** `production` dataset.
2. Put the project ID in `studio/.env` and `web/.env`.
3. Load the design copy as starting content. It fills in every page, the stats and the four (empty) galleries. It skips documents that already exist.
   ```sh
   cd studio && npx sanity login && npm run seed
   ```
4. Deploy the Studio: `npm run deploy` (in `studio/`). Its URL is **https://tve-photo.sanity.studio**. If that name is taken, change `studioHost` in `sanity.cli.ts`.
   The project ID is baked in at build time from `studio/.env`.
5. Invite Tuur under *Manage → Members* with the **Editor** role.

The site reads the public dataset without a token. Build-time fetches are server-side, so no CORS origin is needed for the site. `localhost:3333` is added automatically for the Studio.

### 2. Cloudflare Worker (Workers Builds)

*Workers & Pages → Create → Import a repository →* this repo, then:

| Setting                  | Value                                   |
| ------------------------ | --------------------------------------- |
| Root directory           | `web`                                   |
| Build command            | `npx astro build`                       |
| Deploy command           | `npx wrangler deploy`                   |
| Build variables          | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET=production`, `PUBLIC_WEB3FORMS_KEY` |

The Worker name (`tve-photo`) comes from `web/wrangler.jsonc` and must match the name in the dashboard. It serves `web/dist` as static assets, uses `404.html` for unknown URLs and forces trailing slashes.

**Custom domain:** *Worker → Settings → Domains & Routes → Add → Custom domain*. Add `tve.photo`, then add `www.tve.photo` as well and redirect it with a Redirect Rule (`www.tve.photo/*` → `https://tve.photo/${1}`, 301).

### 3. Rebuild on publish

1. *Worker → Settings → Build → Deploy hooks → Create* (branch `main`). Copy the URL.
2. *sanity.io/manage → API → Webhooks → Create*:
   - URL: the deploy hook URL
   - Dataset: `production`, trigger on create/update/delete
   - Filter: `!(_id in path("drafts.**"))`, so only published changes trigger a build
   - HTTP method: POST, no projection needed

Publishing in the Studio updates the live site in about a minute.

### 4. Contact form

Create an access key at <https://web3forms.com> using the address the messages should go to, and set it as `PUBLIC_WEB3FORMS_KEY`. The key is meant to be public. Spam protection uses a honeypot field. Without JavaScript the form still works: Web3Forms redirects back to `/contact/?sent=1`.

### 5. Analytics & search

- **Cloudflare Web Analytics**: *Worker → Settings → enable Web Analytics* (or *Analytics & Logs → Web Analytics → Add site*). It's cookieless, so no consent banner is needed.
- **Google Search Console**: add a *Domain* property for `tve.photo` and verify it with the TXT record in Cloudflare DNS. Then submit `https://tve.photo/sitemap-index.xml`.
- **AI search (GEO)**: `robots.txt` allows all crawlers. Cloudflare's *Security → Bots → "Block AI bots"* and *AI Crawl Control* (managed robots.txt) can override that. Turn them off if Tuur wants to show up in ChatGPT, Perplexity and similar.

### 6. DNS move checklist

Before switching nameservers to Cloudflare, copy **all** existing records (especially `MX`, `TXT`/SPF/DKIM for email). Cloudflare imports most of them but not always all. After the switch, remove the old Pixieset `A`/`CNAME` records, unless Pixieset stays in use for client galleries on a subdomain (e.g. `clients.tve.photo`).

---

## Editing guide (for Tuur)

Everything is in the Studio at **tve-photo.sanity.studio**. Nothing on the site needs code.

- **Pages** (Home, About, Experience, Contact): open the page, change the text, and click **Publish**. The site updates within a minute or two.
- **Portfolio galleries**: open a sport and **drag a batch of photos** onto *Photos* to upload them all at once. Drag to reorder. The first photo is shown large at the top.
  - Click a photo to add **alt text** (what's in the photo, for Google and for blind visitors) and an optional **caption** (who, what, when).
  - Use **hotspot** (the circle in the image editor) on the action. Grid thumbnails are cropped, and the crop stays centred on the hotspot. The full-screen viewer always shows the whole photo.
  - Upload web-sized exports (~3000 px long edge, JPEG).
- **Home → Recent frames / Instagram**: use *Select → Browse* to pick photos you already uploaded, so you don't upload them twice. Alt text and captions are copied from the gallery automatically.
- **Stats** (the big numbers such as 30+ and 24H): edit them under *Stats*. The same number is used on the home page and the Experience page. *Site settings → Stats* picks which four appear on the home page.
- **Menu, Instagram handle, footer text**: *Site settings*.
- **SEO**: every page and gallery has an *SEO* tab with a Google title, a description and a share image. They can stay empty; the site falls back to sensible defaults.
- Changing a gallery's **web address** after launch breaks existing links. Avoid it.

---

## Decisions & open questions

- **Language**: the site is English only for now (`<html lang="en">`, `og:locale en_GB`). The design copy is English. Adding Dutch later means using Sanity's field-level translation (e.g. `@sanity/language-filter` or document-level i18n), routes under `/nl/`, and `hreflang` links in `BaseLayout.astro`.
- **`/portfolio/`** has no design of its own. It redirects to the first gallery (lowest *Position*), and every sport has its own URL: `/portfolio/<slug>/`.
- **Fonts** are self-hosted (`@fontsource`). Loading Google Fonts from Google's servers has been ruled a GDPR issue in the EU.
- **Images** are not copied into the build. They come straight from Sanity's CDN (`cdn.sanity.io`) with `auto=format`, a `srcset`, and a blurred placeholder while loading. Proxying them through `tve.photo/img/…` with a Worker (so image search credits the domain) is a possible later step.
- **Open**: current registrar for `tve.photo` (Cloudflare Registrar may not support `.photo`; check before transferring), whether Pixieset stays for client delivery, and which DNS records need to be kept.
