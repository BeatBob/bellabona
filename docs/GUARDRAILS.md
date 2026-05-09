# Guardrails

## Hard Requirements

### Rendering
- SSR or ISR for Sanity content. Document the choice (per-section if relevant) in README.
- **No `useEffect` for above-the-fold content.**
- All content sections are Server Components.

### Performance / Core Web Vitals
- Hero image: `next/image` with `priority`, correct `sizes`, explicit dimensions (or `fill` with sized container).
- Animations: CSS only. **No GSAP. No Framer Motion.**
- Reserve image space → no CLS.
- Target Lighthouse Performance ≥ 95.

### Sanity Schema
- **SEO fields live in a separate `seo` object**, not mixed with content fields.
  - `seo.metaTitle`, `seo.metaDescription`, `seo.ogImage`, `seo.canonicalUrl?`
- Homepage sections: Hero, LogoBar, Features, FinalCTA.
- Hero: headline, subheadline (Portable Text), CTA text+link, background image with alt.
- Navigation + Footer in a `siteSettings` singleton (logo, nav, CTA, footer columns).
- Portable Text for rich text. Field names intuitive for non-dev editors.

### SEO
- `generateMetadata` pulling from Sanity SEO fields (no hardcoded meta in `layout.tsx`).
- Organization JSON-LD via `next/script` `type="application/ld+json"` (name, url, logo, sameAs).
- `hreflang` tags structured so adding `de` requires no refactor.
- Canonical URL set. OG image from Sanity. Proper robots.

### i18n
- English only for the test. Code structured for DE/EN: locale as a parameter (routes/queries), not hardcoded. Decision noted in README.

### Accessibility
- Semantic HTML (`nav`, `main`, `section`, `footer`).
- Alt text from Sanity. Sufficient contrast. Keyboard-navigable nav.

## Red Flags — Do NOT Do
- `useEffect` fetching Sanity data in client components.
- Hardcoding visible content in JSX.
- Heavy animation libs (GSAP, Framer Motion).
- Mixing SEO fields with content fields in schema.
- Skipping JSON-LD or hreflang.
- Hardcoded meta tags in `layout.tsx`.
- Over-engineering. The brief says don't.
