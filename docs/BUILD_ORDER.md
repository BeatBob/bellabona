# Build Order

1. Scaffold Next.js + TypeScript + Tailwind ✅
2. Initialize Sanity Studio v3 (embedded at `/studio`) ✅ (deps installed)
3. Create Sanity schemas — order matters:
   - `objects/seo.ts` (reusable SEO object, **separate from content**)
   - `homepage.ts` (Hero, LogoBar, Features, FinalCTA + `seo` field)
   - `siteSettings.ts` (singleton: logo, nav, CTA, footer)
4. Sanity client + GROQ queries (`/sanity/lib/{client,queries}.ts`)
5. Wire `app/page.tsx` as Server Component fetching from Sanity
6. Build **Hero first** (LCP-critical) with `next/image priority`
7. Remaining components: Navigation, LogoBar, Features, FinalCTA, Footer
8. SEO wiring: `generateMetadata`, Organization JSON-LD, hreflang, canonical
9. Seed minimal Sanity content for testing
10. Deploy to Vercel; run Lighthouse on the deployed URL
11. Fix any perf/SEO red flags
12. Write README (see `README_OUTLINE.md`)
13. Final review & submit

## Suggested File Structure
```
/app
  /page.tsx              Server Component, fetches from Sanity
  /layout.tsx            Root layout
  /studio/[[...tool]]/page.tsx   Embedded Sanity Studio
  /components
    Navigation.tsx
    Hero.tsx
    LogoBar.tsx
    Features.tsx
    FinalCTA.tsx
    Footer.tsx
/sanity
  /schemas
    homepage.ts
    siteSettings.ts
    /objects/seo.ts      Reusable SEO object
  /lib
    client.ts
    queries.ts           GROQ
/lib
  metadata.ts            generateMetadata helpers
  jsonld.ts              Organization schema generator
sanity.config.ts
```
