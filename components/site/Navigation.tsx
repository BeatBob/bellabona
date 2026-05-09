import Link from 'next/link'

import { CtaLink } from '../ui/CtaLink'
import { SanityImage } from '../ui/SanityImage'
import { DEFAULT_LOCALE, LOCALES } from '../../lib/i18n'
import type { NavLink, SiteSettings } from '../../sanity/lib/types'

type Props = { settings: SiteSettings }

const linkClass =
  'text-sm font-medium text-brand-dark transition-colors hover:text-brand-green cursor-pointer'

export function Navigation({ settings }: Props) {
  const { siteName, logoHeader, navLinks, headerCta, headerSecondaryCta } = settings
  const wordmark = siteName.replace(/\s*&\s*/g, '').replace(/\s+/g, '')

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-4 sm:gap-8 sm:px-10 sm:py-5">
        <Link href="/" aria-label={`${siteName} home`} className="flex shrink-0 items-center">
          {logoHeader?.asset ? (
            <SanityImage image={logoHeader} width={160} height={28} sizes="(max-width: 640px) 120px, 160px" />
          ) : (
            <span className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-green sm:text-3xl">
              {wordmark}
            </span>
          )}
        </Link>

        {navLinks?.length ? (
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <NavItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="ml-auto flex items-center gap-3 sm:gap-6">
          {headerSecondaryCta?.label && headerSecondaryCta.href ? (
            <Link
              href={headerSecondaryCta.href}
              className="hidden text-sm font-medium text-brand-dark underline underline-offset-4 transition-colors hover:text-brand-green lg:inline"
            >
              {headerSecondaryCta.label}
            </Link>
          ) : null}

          <CtaLink cta={headerCta} variant="primary" size="md" />

          <LocaleSwitcher />

          {navLinks?.length ? <MobileMenu links={navLinks} secondaryCta={headerSecondaryCta} /> : null}
        </div>
      </div>
    </header>
  )
}

function NavItem({ link }: { link: NavLink }) {
  if (link.children?.length) {
    // CSS-only hover dropdown — group-hover + focus-within keeps it keyboard accessible without JS.
    return (
      <div className="group relative">
        <button
          type="button"
          className={`${linkClass} m-0 inline-flex items-center gap-1 border-0 bg-transparent p-0 font-[inherit] leading-[inherit] select-none`}
          aria-haspopup="true"
        >
          {link.label}
          <Chevron />
        </button>
        <div className="pointer-events-none invisible absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <ul className="min-w-[220px] rounded-2xl border border-brand-dark/10 bg-brand-cream p-2 shadow-lg ring-1 ring-brand-dark/5">
            {link.children.map((child, i) => (
              <li key={`${child.label}-${i}`}>
                <Link
                  href={child.href}
                  className="block rounded-lg px-3 py-2 text-sm text-brand-dark transition-colors hover:bg-brand-cream-2 hover:text-brand-green"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (!link.href) return <span className={linkClass}>{link.label}</span>
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  )
}

function MobileMenu({
  links,
  secondaryCta,
}: {
  links: NavLink[]
  secondaryCta?: SiteSettings['headerSecondaryCta']
}) {
  return (
    <details className="relative md:hidden [&[open]>summary>svg.close]:block [&[open]>summary>svg.open]:hidden">
      <summary
        aria-label="Toggle menu"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-brand-dark/5 [&::-webkit-details-marker]:hidden"
      >
        <svg className="open" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
        <svg className="close hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-[min(92vw,320px)] rounded-2xl border border-brand-dark/10 bg-brand-cream p-3 shadow-xl ring-1 ring-brand-dark/5">
        <ul className="flex flex-col">
          {links.map((link, i) => (
            <li key={`${link.label}-${i}`} className="border-b border-brand-dark/5 last:border-b-0">
              {link.children?.length ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-cream-2 [&::-webkit-details-marker]:hidden">
                    {link.label}
                    <Chevron />
                  </summary>
                  <ul className="ml-2 mb-1">
                    {link.children.map((child, j) => (
                      <li key={`${child.label}-${j}`}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-brand-dark/80 hover:bg-brand-cream-2 hover:text-brand-green"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : link.href ? (
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-cream-2 hover:text-brand-green"
                >
                  {link.label}
                </Link>
              ) : (
                <span className="block px-3 py-2.5 text-sm text-brand-dark/60">{link.label}</span>
              )}
            </li>
          ))}
          {secondaryCta?.label && secondaryCta.href ? (
            <li>
              <Link
                href={secondaryCta.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark underline underline-offset-4 hover:text-brand-green"
              >
                {secondaryCta.label}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </details>
  )
}

function LocaleSwitcher() {
  const visible = ['en', 'de'] as const

  return (
    <div
      role="group"
      aria-label="Language"
      className="hidden items-center rounded-full bg-brand-dark/5 p-1 sm:inline-flex"
    >
      {visible.map((locale) => {
        const enabled = (LOCALES as readonly string[]).includes(locale)
        const active = locale === (DEFAULT_LOCALE as string) && enabled
        const label = locale === 'de' ? 'DU' : locale.toUpperCase()

        const base =
          'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors'
        const cls = active
          ? `${base} bg-brand-cream text-brand-dark shadow-sm`
          : enabled
            ? `${base} text-brand-dark/70 hover:text-brand-dark cursor-pointer`
            : `${base} text-brand-dark/40 cursor-not-allowed`

        if (!enabled) {
          return (
            <span key={locale} className={cls} aria-disabled="true">
              {label}
            </span>
          )
        }
        return (
          <Link
            key={locale}
            href={locale === (DEFAULT_LOCALE as string) ? '/' : `/${locale}`}
            className={cls}
            aria-current={active ? 'true' : undefined}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}

function Chevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-150 group-open:rotate-180"
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
