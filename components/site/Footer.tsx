import Link from 'next/link'

import type { SiteSettings } from '../../sanity/lib/types'

type Props = { settings: SiteSettings }

export function Footer({ settings }: Props) {
  const { siteName, footerColumns, footerNote } = settings

  return (
    <footer className="bg-brand-lime text-brand-dark">
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-0 pt-16 sm:px-12 sm:pt-24">
        {footerColumns?.length ? (
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-display text-sm font-semibold tracking-tight">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.links?.map((link) => (
                    <li key={`${col.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-dark/80 transition-colors hover:text-brand-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-16 select-none text-center" aria-hidden="true">
          <span className="block font-display font-extrabold uppercase tracking-[0.02em] leading-[0.85] text-brand-dark text-[20vw] sm:text-[18vw]">
            {siteName.replace(/\s+/g, '')}
          </span>
        </div>

        {footerNote ? (
          <p className="border-t border-brand-dark/15 py-4 text-center text-xs text-brand-dark/70">
            {footerNote}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
