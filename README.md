# Bella&Bona — Homepage Case Study

A technical evaluation build: the Bella&Bona homepage rebuilt on **Next.js 16 (App Router) + Sanity v3 + Tailwind v4**, sized to a 4–6 hour scope. The goal isn't pixel-perfect parity with the existing HubSpot site — it's to demonstrate the rendering, schema, and SEO decisions I'd bring to the full migration.

> **Live preview:** _TBD — Vercel URL on deploy._
> **Lighthouse:** _TBD — measured on the deployed URL, not localhost._

---

## 1. Tech Stack & Setup

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Sanity v3 with the Studio embedded at `/studio`, deployed to Vercel. `react-icons` for brand icons (Lucide dropped them in v0.500). No other runtime deps beyond the strict stack.

```bash
# 1. install
npm install

# 2. environment — copy and fill in
cp .env.example .env.local
# NEXT_PUBLIC_SANITY_PROJECT_ID=...
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_READ_TOKEN=...     # for Studio drafts
# SANITY_WRITE_TOKEN=...        # only for seed scripts
# REVALIDATE_SECRET=...         # shared with the Sanity webhook

# 3. dev
npm run dev
# → app:    http://localhost:3000
# → studio: http://localhost:3000/studio

# 4. seed (optional — Studio works without this)
SANITY_WRITE_TOKEN=<editor-token> node scripts/seed.mjs               # full bootstrap
SANITY_WRITE_TOKEN=<editor-token> node scripts/seed-footer.mjs        # patch footer only
SANITY_WRITE_TOKEN=<editor-token> node scripts/seed-organization.mjs  # patch JSON-LD org
```

Marketing chrome (Nav, Footer) lives under the `app/(site)/` route group so it scopes to the public site and never bleeds into `/studio`.

---

## 2. Rendering Strategy

**ISR with on-demand revalidation, default `revalidate = 3600`.** The homepage is content-driven but changes infrequently; SSR per request would waste compute and worsen TTFB without editorial benefit. ISR keeps the page statically served at the edge while remaining instantly updatable from the Studio via webhook → `revalidateTag`.

| Section            | Strategy                | Why                                                     |
|--------------------|-------------------------|---------------------------------------------------------|
| Hero               | ISR (`revalidate: 3600`)| LCP-critical; statically served; rare editor changes.   |
| LogoBar / Features | ISR                     | Bundled in the same GROQ query.                         |
| Header / Footer    | ISR (siteSettings)      | Fetched once per page render; tag-revalidated together. |
| Studio (`/studio`) | Client-only             | Sanity Studio is a SPA; no SSR concerns.                |

A single GROQ query fetches each document at build/revalidate time — no per-section round-trips. **No `useEffect` for content fetching anywhere.**

**On-demand revalidation:** `app/api/revalidate/route.ts` accepts `?secret=<REVALIDATE_SECRET>&tag=siteSettings|homepage` and calls `revalidateTag(tag, 'default')`. Configured as a Sanity webhook (production-only — Sanity rejects localhost), publishing in the Studio rebusts within a single request cycle.

---

## 3. Sanity Schema Decisions

- **`seo` is a reusable object type, never inlined with content fields.** Documents reference it via a single `seo` field. The editor UI collapses SEO into its own panel, marketing copy never gets mixed with metadata, and adding the same contract to future pages is trivial.
- **`homepage` is a singleton** with typed sections (Hero, LogoBar, Features) — not a free-form page builder. The brief is one page; a page builder would be over-engineering.
- **`siteSettings` singleton** owns chrome: `logoHeader`, `logoFooter` (split so the giant footer mark can be a different asset/crop), `navLinks` (with optional `children` for dropdowns), `headerCta`, `headerSecondaryCta`, `footerSocial`, `footerColumns`, `footerNote`, and `organization` (JSON-LD source — see §4). Editors update chrome in one place and it propagates everywhere.
- **`organization.address` and `organization.contactPoint`** are first-class structured fields, not free text. They flow straight into JSON-LD as `PostalAddress` and `ContactPoint`.
- **Portable Text** for the hero subheadline. Editors get inline emphasis; we never expose raw HTML.
- Field names use editor-facing language (`headline`, `subheadline`, `Header navigation`) and `description:` strings explain non-obvious fields.
- Image fields require alt text at the schema level (`imageWithAlt` object).
- **`siteSettings` groups** (`identity`, `navigation`, `footer`, `organization (JSON-LD)`) make the editor form scannable.

**Fallback policy:** `lib/fallback.ts` provides only the bare-minimum chrome (`siteName`, logos null, organization stub). Nav links, footer columns, CTAs come from Sanity only — if the editor hasn't published them, those slots simply don't render.

---

## 4. SEO Implementation

- **`generateMetadata`** in `app/(site)/page.tsx` reads `seo.metaTitle`, `seo.metaDescription`, `seo.ogImage`, `seo.canonicalUrl` from Sanity. No meta tags hardcoded in `layout.tsx`.
- **Organization JSON-LD** injected via `next/script` with `type="application/ld+json"`:
  - `name`, `url`, `logo`, `sameAs[]` (always)
  - `address` as `PostalAddress` (street, postalCode, locality, region, country) — strong local-SEO signal for a Munich-based B2B brand
  - `contactPoint` as `ContactPoint` (email, telephone, contactType, areaServed, availableLanguage) — material for B2B SERP surfaces
- **`hreflang`** rendered for every entry in `LOCALES`. Currently `['en']`; adding `'de'` is a one-line config change.
- **Canonical URL** set per page from the SEO object, falling back to `localeUrl(locale, path)`.
- **Open Graph + Twitter card** images sourced from Sanity, not static assets.

---

## 5. i18n Approach

English only ships in this test, but the code is **locale-parameterized end-to-end**:

- `lib/i18n.ts` exports `LOCALES`, `DEFAULT_LOCALE`, `localeUrl(locale, path)`. Adding `'de'` to `LOCALES` activates DE hreflang and routing helpers.
- The Navigation `LocaleSwitcher` already renders the EN/DE pill pair — the disabled DE pill becomes clickable as soon as the locale is enabled.
- GROQ queries are content-shape-agnostic; DE translations slot in as field-level Sanity localization (or a parallel locale-keyed document) without restructuring.
- `next-intl` is **not** installed. For one English page it would be extra surface area for no benefit; I'd add it for the real migration.

---

## 6. Performance

Target: **Lighthouse Performance ≥ 95** on the deployed URL.

- **Hero image** uses `next/image` with `priority`, explicit `sizes` matched to the layout, and explicit dimensions — no CLS, prioritized LCP fetch.
- **Zero client JS for chrome.** Header dropdowns use `group-hover` + `group-focus-within`; the mobile menu uses `<details>`/`<summary>` with nested `<details>` for sub-items. No `'use client'` boundary anywhere on the homepage.
- **No animation libraries.** GSAP and Framer Motion would each ship more JS than the entire page runtime. All motion is CSS transitions.
- **Server Components everywhere.** The Sanity Studio is the only client surface, and it's route-isolated.
- **Image space reserved** at the container level for every Sanity-driven image; LQIP from Sanity asset metadata.
- **Fonts** via `next/font`, self-hosted, preloaded, `display: swap`.
- **Tailwind v4** with the `@theme inline` token layer in `app/globals.css` — brand colors (`--color-brand-green: #024930`, `--color-brand-lime: #e6ffa9`) are CSS custom properties, not arbitrary hex values in JSX.

---

## 7. Trade-offs (4–6 hr scope)

- **No full design system.** Tailwind primitives + a small set of section components. A real migration gets a token layer, typography scale, and Storybook.
- **Placeholder copy.** Schemas are production-ready; the seed dataset is just enough to exercise every field. Real organization data (address, contact) is sourced from bellabona.com's imprint via `scripts/seed-organization.mjs`.
- **No preview / draft mode.** Hooks are obvious (`draftMode()` + perspective `previewDrafts`) but not worth the time on a single static page.
- **No tests.** A 4–6 hr build is the wrong place for a suite; the schema and rendering choices are the artifact under review.
- **Single locale dataset.** DE is structurally supported (LOCALES, hreflang, LocaleSwitcher) but not populated.
- **`/api/revalidate` is GET-with-secret.** Sufficient for a Sanity webhook; a real deployment would want POST + body signature verification.
- **No CSP headers.** Trivial to add in `next.config.ts`; left out to keep dev iteration friction low.

---

## 8. What I'd Do Differently With More Time

- Wire `next-intl` and ship a real DE translation pass.
- Harden `/api/revalidate` with HMAC body verification instead of a query-string secret.
- Add `@sanity/visual-editing` for inline Studio preview.
- Build a typography + spacing token layer in Tailwind v4 `@theme`, replacing ad-hoc utility classes.
- Author Storybook stories per section — design QA + onboarding doc for the next dev.
- Add Playwright smoke tests for the hero LCP element and the metadata pipeline.
- Add a CSP and a small set of security headers via `next.config.ts`.

---

## Project Structure

```
app/
  layout.tsx                       # root, no hardcoded meta
  globals.css                      # Tailwind v4 @theme tokens
  (site)/
    layout.tsx                     # Nav + Footer + main padding for fixed header
    page.tsx                       # Server Component, ISR, fetches Sanity
  api/revalidate/route.ts          # secret-gated revalidateTag endpoint
  studio/[[...tool]]/page.tsx      # embedded Sanity Studio
components/
  sections/                        # Hero, LogoBar, Features
  site/                            # Navigation, Footer
  ui/                              # Button, CtaLink, SanityImage
sanity/
  schemas/
    homepage.ts
    siteSettings.ts
    objects/                       # seo.ts, cta.ts, imageWithAlt.ts
  lib/
    client.ts, fetch.ts, image.ts, queries.ts, types.ts
lib/
  data.ts        # tagged fetch wrappers (siteSettings, homepage)
  fallback.ts    # bare-minimum chrome
  i18n.ts        # LOCALES, DEFAULT_LOCALE, localeUrl
  jsonld.ts      # Organization schema generator
scripts/
  seed.mjs                 # full bootstrap
  seed-footer.mjs          # patch footer fields only
  seed-organization.mjs    # patch JSON-LD organization (real data from bellabona.com)
sanity.config.ts
```
