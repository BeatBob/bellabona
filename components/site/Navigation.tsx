import Link from 'next/link'

import { CtaLink } from '../ui/CtaLink'
import { SanityImage } from '../ui/SanityImage'
import type { NavLink, SiteSettings } from '../../sanity/lib/types'

type Props = { settings: SiteSettings }

const linkClass =
  'text-sm font-medium text-brand-dark transition-colors hover:text-brand-green cursor-pointer'

export function Navigation({ settings }: Props) {
  const { siteName, logo, navLinks, headerCta } = settings

  return (
    <header className="bg-brand-cream">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-5 sm:px-12">
        <Link href="/" aria-label={`${siteName} home`} className="flex items-center gap-2">
          {logo?.asset ? (
            <SanityImage image={logo} width={120} height={28} sizes="120px" />
          ) : (
            <span className="font-display text-lg font-bold tracking-tight text-brand-dark">
              {siteName}
            </span>
          )}
        </Link>

        {navLinks?.length ? (
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <NavItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <CtaLink cta={headerCta} variant="primary" size="md" />
      </div>
    </header>
  )
}

function NavItem({ link }: { link: NavLink }) {
  if (link.children?.length) {
    return (
      <details className="group relative">
        <summary
          className={`${linkClass} flex list-none items-center gap-1 select-none [&::-webkit-details-marker]:hidden`}
        >
          {link.label}
          <Chevron />
        </summary>
        <div className="absolute left-1/2 z-20 mt-3 -translate-x-1/2 rounded-2xl border border-brand-dark/10 bg-brand-cream p-2 shadow-lg ring-1 ring-brand-dark/5">
          <ul className="min-w-[200px]">
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
      </details>
    )
  }

  if (!link.href) return <span className={linkClass}>{link.label}</span>
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
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
