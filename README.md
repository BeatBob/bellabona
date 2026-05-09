# Bella&Bona — Homepage Case Study

A technical evaluation build: the Bella&Bona homepage rebuilt on **Next.js 14 (App Router) + Sanity v3**, sized to a 4–6 hour scope. The goal of this repo isn't pixel-perfect parity with the existing HubSpot site — it's to demonstrate the rendering, schema, and SEO decisions I'd bring to the full migration.

> **Live preview:** _TBD — Vercel URL on deploy._
> **Lighthouse:** _TBD — measured on the deployed URL, not localhost._

---

## 1. Tech Stack & Setup

Next.js 14+ (App Router), TypeScript, Tailwind CSS, Sanity v3 with the Studio embedded at `/studio`, deployed to Vercel. No additional runtime dependencies beyond the strict stack.

```bash
# 1. install
npm install

# 2. environment — copy and fill in
cp .env.local.example .env.local
# NEXT_PUBLIC_SANITY_PROJECT_ID=...
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_READ_TOKEN=...   # only needed for draft previews

# 3. dev
npm run dev
# → app:    http://localhost:3000
# → studio: http://localhost:3000/studio
```

---

## 2. Rendering Strategy

**ISR with on-demand revalidation, default revalidate = 1 hour.** The homepage is content-driven but changes infrequently; SSR on every request would waste compute and give worse TTFB without any editorial benefit. ISR keeps the page statically served at the edge while remaining instantly updatable from the Studio via a webhook → `revalidateTag`.

| Section      | Strategy                  | Why                                                                 |
|--------------|---------------------------|---------------------------------------------------------------------|
| Hero         | ISR (`revalidate: 3600`)  | LCP-critical; must be statically served. Editor changes are rare.   |
| LogoBar      | ISR                       | Same dataset as hero; bundled in the same query.                    |
| Features     | ISR                       | Bundled in the page query.                                          |
| FinalCTA     | ISR                       | Same.                                                               |
| Studio (`/studio`) | Client-only          | Sanity Studio is a SPA; no SSR concerns.                            |

A single GROQ query fetches all sections at build/revalidate time — no per-section round-trips. **No `useEffect` for content fetching anywhere.**

---

## 3. Sanity Schema Decisions

- **`seo` is a reusable object type, never inlined with content fields.** Every routable document references it via a single `seo` field. This keeps the editor UI clean (SEO collapses into its own panel), prevents accidental mixing of marketing copy with metadata, and makes it trivial to add the same SEO contract to future pages.
- **`homepage` is a singleton** with a typed `sections` shape rather than a free-form page builder. Scope is one page; a page builder would be over-engineering.
- **`siteSettings` is a separate singleton** for navigation, logo, footer columns, and the global CTA. Editors update chrome in one place and it propagates everywhere.
- **Portable Text** for the hero subheadline and any rich body copy — gives editors inline emphasis without exposing raw HTML.
- Field names use editor-facing language (`headline`, `subheadline`, `ctaLabel`) instead of dev shorthand.
- Image fields require alt text at the schema level.

---

## 4. SEO Implementation

Added beyond the brief:

- **`generateMetadata`** in `app/page.tsx` reads `seo.metaTitle`, `seo.metaDescription`, `seo.ogImage`, and `seo.canonicalUrl` from Sanity. No meta tags are hardcoded in `layout.tsx`.
- **Organization JSON-LD** injected via `next/script` with `type="application/ld+json"` — `name`, `url`, `logo`, `sameAs[]` (social profiles from `siteSettings`). Improves brand SERP rendering and is a free win HubSpot wasn't doing.
- **`hreflang` tags** rendered from a locale list. Currently only `en` is active, but the helper takes a locale array — adding `de` is a one-line config change, no code refactor.
- **Canonical URL** set per page from the SEO object, with a sensible fallback to `NEXT_PUBLIC_SITE_URL` + path.
- **Open Graph image** sourced from Sanity, not a static asset.

---

## 5. i18n Approach

English only ships in this test, but the code is **locale-parameterized end-to-end**:

- Route shape leaves room for `app/[locale]/page.tsx` without restructuring.
- GROQ queries accept `locale` and content fields are scoped so DE translations slot in as siblings, not parallel documents.
- The `hreflang` helper iterates a `locales` array.
- `next-intl` is **not** installed for this test — I'd add it for the full migration, but for one English page it would be extra surface area for no benefit.

---

## 6. Performance

Target: **Lighthouse Performance ≥ 95** on the deployed URL.

- **Hero image** uses `next/image` with `priority`, an explicit `sizes` attribute matched to the layout, and explicit dimensions — no CLS, prioritized LCP fetch.
- **No client-side animation libraries.** All motion is CSS transitions. GSAP and Framer Motion would each ship more JS than the entire homepage runtime.
- **Server Components by default.** The only client component is the mobile nav toggle.
- **Image space reserved** at the container level for every Sanity-driven image.
- **Fonts** via `next/font` (Geist), self-hosted, preloaded, with `display: swap`.

---

## 7. Trade-offs (4–6 hr scope)

- **No full design system.** Tailwind primitives + a small set of section components. A real migration gets a token layer, typography scale, and a Storybook.
- **Placeholder Sanity content.** Schemas are production-ready; the seed dataset is just enough to demonstrate every field.
- **No preview mode / draft mode wired in.** The hooks are obvious (`draftMode()` + perspective `previewDrafts`) but not worth the time on a single static page.
- **No tests.** A 4–6 hr build is the wrong place for a test suite; the schema and rendering choices are the artifact under review.
- **Single locale dataset.** DE is structurally supported but not populated.
- **No CMS webhook → revalidation route shipped.** The ISR config is in place; the webhook handler is a 20-line addition I'd do on day one of the real migration.

---

## 8. What I'd Do Differently With More Time

- Wire `next-intl` and ship a real DE translation pass.
- Add the `/api/revalidate` webhook handler and configure Sanity to call it on publish.
- Build a typography + spacing token layer in Tailwind config, replacing ad-hoc utility classes.
- Add `@sanity/visual-editing` for inline preview from the Studio.
- Pull a real font subset (Latin + Latin-ext for DE) instead of Geist's defaults.
- Author component-level Storybook stories — useful both as a design QA surface and as documentation for the next dev.
- Add Playwright smoke tests for the hero LCP element and the metadata pipeline.

---

## Project Structure

```
app/
  layout.tsx                  # root, no hardcoded meta
  page.tsx                    # Server Component, ISR, fetches Sanity
  studio/[[...tool]]/page.tsx # embedded Sanity Studio
  components/                 # Hero, Navigation, LogoBar, Features, FinalCTA, Footer
sanity/
  schemas/
    homepage.ts
    siteSettings.ts
    objects/seo.ts            # reusable, separate from content
  lib/
    client.ts
    queries.ts
lib/
  metadata.ts                 # generateMetadata helper
  jsonld.ts                   # Organization schema
sanity.config.ts
```
