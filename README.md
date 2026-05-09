# Bella&Bona — Homepage Case Study

Next.js 16 (App Router) + Sanity v3 + Tailwind v4. Sized to the 4–6 hr brief: priority is rendering, schema, and SEO — not pixel polish.

> **Live:** https://bellabona-sable.vercel.app/

### PageSpeed Insights

| Desktop | Mobile |
|---|---|
| ![Desktop PageSpeed result](public/pagespeed%20result/pagespeed.web.dev%20-%20desktop.png) | ![Mobile PageSpeed result](public/pagespeed%20result/pagespeed.web.dev%20-%20mobile.png) |

## Setup

```bash
npm install
cp .env.example .env.local   # fill SANITY_*, REVALIDATE_SECRET, NEXT_PUBLIC_SITE_URL
npm run dev                  # app: localhost:3000 · studio: localhost:3000/studio
```

Optional seeding (Studio works without it):
```bash
SANITY_WRITE_TOKEN=<editor> node scripts/seed.mjs               # full bootstrap
SANITY_WRITE_TOKEN=<editor> node scripts/seed-organization.mjs  # JSON-LD org from bellabona.com
SANITY_WRITE_TOKEN=<editor> node scripts/seed-faqs.mjs          # FAQ content
```

## Rendering — ISR with on-demand revalidation

`revalidate: 3600` on the homepage; tagged fetches (`homepage`, `siteSettings`) for surgical busts via `app/api/revalidate/route.ts` (Sanity webhook target). The homepage changes infrequently — SSR per request would waste compute and worsen TTFB without editorial benefit. ISR keeps the page edge-served and instantly updatable.

A single GROQ query loads every section. **No `useEffect` for content.** Hero is the LCP element: `next/image` with `priority`, `sizes`, explicit dimensions, LQIP from Sanity asset metadata. All sections are Server Components — the only client surface in the build is `/studio`. Header dropdowns and the mobile menu are CSS-only (`group-hover`, `<details>/<summary>`). No GSAP / Framer.

Marketing chrome lives under `app/(site)/` so it scopes to the public site and never bleeds into Studio.

## Sanity — schema decisions

- **`seo` is a reusable object** referenced via a single `seo` field per document (`metaTitle`, `metaDescription`, `slug`, `ogImage`, `canonicalUrl`). Editor UI collapses it; content fields never mix with metadata.
- **`homepage` is a singleton with typed sections** (Hero, LogoBar, Stats, Meals, Features, CtaBanner, Steps, Testimonial, CtaBannerSecondary, Faqs) — not a free-form page builder. Brief is one page; a builder would be over-engineering.
- **`siteSettings` singleton** owns chrome (logos, navLinks with optional `children`, CTAs, footer columns/social, `organization` for JSON-LD). One source of truth.
- **`organization.address` / `contactPoint`** are first-class structured fields — they flow straight into `PostalAddress` / `ContactPoint` JSON-LD, no parsing.
- **Portable Text** for the hero subheadline (no raw HTML).
- **`imageWithAlt`** enforces alt text at the schema level. **Field labels and `description` strings** target editors, not devs.
- **Fallback policy:** `lib/fallback.ts` provides only minimum chrome; missing Sanity content renders nothing rather than placeholder text.

## SEO

- `generateMetadata` reads the Sanity `seo` object — title, description, canonical, OG image, Twitter card. `metadataBase` set in root layout. No meta hardcoded in `layout.tsx`.
- **Organization JSON-LD** (inline `<script type="application/ld+json">`) — name, url, logo, sameAs, `PostalAddress`, `ContactPoint`. Strong local + B2B SERP signals.
- **FAQPage JSON-LD** generated from `homepage.faqs.items` — eligible for SERP FAQ rich results.
- **`hreflang`** rendered for every entry in `LOCALES` (currently `['en']`). `app/sitemap.ts` and `app/robots.ts` are locale-aware Next metadata files; `/studio` and `/api/` are disallowed.
- One `<h1>` per page; semantic `<nav> / <main> / <section> / <footer>` throughout.

## i18n

EN only ships, but the code is locale-parameterized end-to-end: `lib/i18n.ts` exports `LOCALES`, `DEFAULT_LOCALE`, `localeUrl(locale, path)`. Adding `'de'` to `LOCALES` activates DE hreflang + sitemap + the Navigation `LocaleSwitcher`'s disabled DE pill. GROQ queries are content-shape agnostic — DE slots in via Sanity field-level localization. `next-intl` deferred: extra surface area for one English page.

## Trade-offs

- **No design system.** Tailwind primitives + a small section component set. A real migration gets a token + typography scale + Storybook.
- **No preview/draft mode.** `draftMode()` + `previewDrafts` is a known follow-up.
- **No tests.** A 4–6 hr build isn't the place; the schema + rendering choices are the artifact under review.
- **`/api/revalidate` is GET-with-secret.** Sufficient for a Sanity webhook; production wants POST + HMAC.
- **Single locale dataset.** DE is structurally supported but not populated.

## What I'd do with more time

Wire `next-intl` + ship a DE pass · HMAC-verified revalidate · `@sanity/visual-editing` for inline preview · Tailwind v4 typography/spacing tokens · Storybook · Playwright smoke tests for LCP + metadata · CSP via `next.config.ts`.

## Structure

```
app/
  layout.tsx           root: metadataBase, fonts
  robots.ts            /robots.txt
  sitemap.ts           /sitemap.xml
  (site)/
    layout.tsx         Nav + Footer
    page.tsx           ISR Server Component, generateMetadata, JSON-LD
  api/revalidate/      secret-gated revalidateTag endpoint
  studio/              embedded Sanity Studio
components/
  sections/            Hero, LogoBar, Stats, Meals, Features, CtaBanner, Steps, Testimonial, Faqs
  site/                Navigation, Footer
  ui/                  Button, CtaLink, SanityImage, Section
sanity/
  schemas/             homepage, siteSettings, objects/{seo,cta,imageWithAlt}
  lib/                 client, fetch, image, queries, types
lib/
  data.ts              tagged fetch wrappers
  i18n.ts              LOCALES, DEFAULT_LOCALE, localeUrl
  jsonld.ts            Organization + FAQPage generators
  fallback.ts          minimum chrome
scripts/
  seed*.mjs            bootstrap + targeted patches
```
