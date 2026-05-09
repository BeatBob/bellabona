import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

import { SanityImage } from '../ui/SanityImage'
import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaGooglePlay,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { Mail } from 'lucide-react'

import type { SiteSettings, SocialPlatform } from '../../sanity/lib/types'

type Props = { settings: SiteSettings }

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const ICONS: Record<SocialPlatform, IconComponent> = {
  google: FaGoogle,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  apple: FaApple,
  googleplay: FaGooglePlay,
}

export function Footer({ settings }: Props) {
  const { siteName, logoFooter, footerColumns, footerSocial, footerNote } = settings
  const wordmark = siteName.replace(/\s*&\s*/g, '').replace(/\s+/g, '')

  return (
    <footer className="bg-brand-green text-brand-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-24 pb-4 sm:px-10 sm:pt-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {footerSocial ? <SocialColumn social={footerSocial} /> : null}

          {footerColumns?.map((col) =>
            col.links?.length ? (
              <div key={col.heading}>
                {col.heading ? (
                  <h3 className="font-display text-base font-bold tracking-tight text-brand-cream">
                    {col.heading}
                  </h3>
                ) : null}
                <ul className="mt-7 space-y-6">
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm leading-snug text-brand-cream/85 transition-colors hover:text-brand-lime"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null,
          )}
        </div>
      </div>

      <div
        className="mt-16 w-full overflow-hidden select-none sm:mt-24"
        aria-hidden="true"
      >
        {logoFooter?.asset ? (
          <div className="relative mx-[-4%] flex w-[108%] justify-center">
            <SanityImage
              image={logoFooter}
              width={1600}
              height={400}
              sizes="108vw"
              className="h-auto w-full object-contain"
            />
          </div>
        ) : (
          <span className="mx-[-4%] block w-[108%] whitespace-nowrap text-center font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.85] text-brand-lime text-[26vw]">
            {wordmark}
          </span>
        )}
      </div>

      {footerNote ? (
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-10">
          <p className="border-t border-brand-cream/30 py-5 text-center text-xs text-brand-cream/80">
            {footerNote}
          </p>
        </div>
      ) : null}
    </footer>
  )
}

function SocialColumn({ social }: { social: NonNullable<SiteSettings['footerSocial']> }) {
  const { heading, body, email, links } = social
  return (
    <div>
      {heading ? (
        <h3 className="font-display text-base font-bold tracking-tight text-brand-cream">
          {heading}
        </h3>
      ) : null}
      {body ? (
        <p className="mt-6 max-w-[240px] text-sm leading-snug text-brand-cream/85">{body}</p>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          className="mt-7 inline-flex items-center gap-2 text-sm text-brand-cream/90 transition-colors hover:text-brand-lime"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {email}
        </a>
      ) : null}
      {links?.length ? (
        <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((link, i) => {
            const Icon = ICONS[link.platform]
            const a11y = link.label ?? link.platform
            return (
              <li key={`${link.platform}-${i}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={a11y}
                  className="inline-flex items-center gap-2 text-brand-cream transition-colors hover:text-brand-lime"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {link.label ? <span className="text-sm font-medium">{link.label}</span> : null}
                </a>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
