# Code Quality Bar

Every change must clear this bar before being considered done. If something on this list can't be satisfied, surface the trade-off explicitly.

## Correctness
- Verify the change actually works — run it, don't just compile it.
- Implementation is the *correct* fix, not a workaround that papers over the symptom.
- All call sites and adjacent code paths are considered, not just the line being edited.

## Readability & maintainability
- DRY: extract repeated logic into a named helper or component once it appears 3+ times.
- Names describe intent (`hero.backgroundImage`, not `img1`). A future collaborator can navigate without asking.
- File and component boundaries are obvious. No 800-line god-files.

## Type safety
- No `any`, no implicit `any`. If a third-party type is wrong, narrow with a typed assertion + a one-line comment explaining why.
- Error suppression comments (`// @ts-expect-error`, `// eslint-disable-next-line`) must include a *reason*. Never suppress globally.
- Prefer `unknown` + a narrowing check over `any`.

## Responsive design
- Layouts work from 360 px (small phone) up. Test at common breakpoints: 360, 768, 1024, 1440.
- No horizontal scroll. No content cut off. Tap targets ≥ 44 px.

## Performance
- No avoidable client JS — Server Components by default; `'use client'` only where interactivity demands it.
- Images via `next/image` with `sizes` set; LCP image gets `priority`.
- No client-side data fetching for above-the-fold content.
- No layout shift (CLS) — every image and ad-shaped element has reserved space.
- Fonts via `next/font`, preloaded, with `display: swap`.

## Memory / egress / quota safety (important)
- No unbounded GROQ queries (`*[_type == ...]` with no projection or limit).
- No `useEffect` polling without cleanup.
- No fetching the same resource on every render — memoize or move to a server boundary.
- Watch out for accidental Sanity image URL builds in render loops — build outside the map.
- Be deliberate about ISR `revalidate` values; don't accidentally make every request a build.

## Error handling
- Async boundaries (Server Components, route handlers, generateMetadata) handle missing data without throwing. Render a sensible fallback.
- User-facing errors are humane, never raw stack traces.
- Never silently `catch (e) {}` — log or rethrow, with intent.

## Accessibility
- Semantic HTML (`nav`, `main`, `section`, `header`, `footer`, `button` vs. `a`, `h1` once per page).
- Every image has alt text (sourced from Sanity, not hardcoded).
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text.
- Keyboard reachable: visible focus ring; tab order matches reading order.
- ARIA only when no semantic element fits. Don't `role="button"` on a `<div>` if `<button>` works.

## Security
- No secrets in client bundles. `NEXT_PUBLIC_*` is the only env-var prefix that ships to the browser.
- Sanity tokens stay server-only.
- Sanitize any HTML rendered from Portable Text or external sources.
- Validate all external input at boundaries.

## SEO / Core Web Vitals / AI surfaces
- `generateMetadata` per route, sourced from Sanity SEO fields. Never hardcoded in `layout.tsx`.
- Organization JSON-LD on the homepage.
- `hreflang` tags rendered for every active locale.
- One `<h1>` per page; heading hierarchy not skipped.
- Canonical URL set.
- LCP < 2.5s, CLS < 0.1, INP < 200ms on the deployed URL.
- No `noindex` unless intentional. `robots.txt` is sane.

## Visual polish & brand
- Reference brand colors and tokens live in `app/globals.css` and the Tailwind config. **Use the tokens.** Don't reach for arbitrary hex values.
- Interactive elements show `cursor-pointer` (or `cursor-not-allowed` when disabled).
- Hover/focus/active states have intentional color choices — including tooltips, popovers, dropdowns.
- Light and dark themes both validated. Token usage covers both.
- No off-brand colors leaking through (e.g., default Tailwind blue links).

## Lint / typecheck gate
- `npm run lint` passes with zero warnings.
- `npx tsc --noEmit` passes.
- Ship nothing that doesn't satisfy both.
