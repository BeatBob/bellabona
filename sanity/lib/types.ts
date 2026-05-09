import type { PortableTextBlock } from '@portabletext/types'

// Shared primitives ────────────────────────────────────────────────────────
export type SanityImageRef = {
  asset: { _ref: string; _type: 'reference' } | { url: string; metadata?: { lqip?: string } }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; right: number; bottom: number; left: number }
}

export type CtaValue = { label: string; href: string } | null

// Homepage ─────────────────────────────────────────────────────────────────
export type HomepageHero = {
  headline: string
  subheadline?: PortableTextBlock[]
  cta: CtaValue
  backgroundImage: SanityImageRef
}

export type HomepageLogo = { name: string; logo: SanityImageRef }

export type HomepageFeatureItem = {
  title: string
  description: string
  icon: SanityImageRef
}

export type HomepageData = {
  hero: HomepageHero
  logoBar?: { eyebrow?: string; logos?: HomepageLogo[] }
  features?: { heading?: string; subheading?: string; items?: HomepageFeatureItem[] }
  finalCta?: {
    heading: string
    body?: string
    cta: CtaValue
    backgroundImage?: SanityImageRef | null
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImageRef | null
    canonicalUrl?: string
  }
}

// Site settings ────────────────────────────────────────────────────────────
export type NavChildLink = { label: string; href: string }
export type NavLink = { label: string; href?: string; children?: NavChildLink[] }
export type FooterColumn = { heading: string; links?: NavChildLink[] }

export type SocialPlatform =
  | 'google'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'apple'
  | 'googleplay'

export type FooterSocialLink = { platform: SocialPlatform; href: string; label?: string }

export type FooterSocial = {
  heading?: string
  body?: string
  email?: string
  links?: FooterSocialLink[]
}

export type SiteSettings = {
  siteName: string
  logoHeader?: SanityImageRef | null
  logoFooter?: SanityImageRef | null
  navLinks?: NavLink[]
  headerCta: CtaValue
  headerSecondaryCta?: CtaValue
  footerSocial?: FooterSocial
  footerColumns?: FooterColumn[]
  footerNote?: string
  organization?: {
    legalName: string
    url: string
    logoUrl?: string
    sameAs?: string[]
    address?: {
      streetAddress?: string
      postalCode?: string
      addressLocality?: string
      addressRegion?: string
      addressCountry?: string
    }
    contactPoint?: {
      email?: string
      telephone?: string
      contactType?: string
      areaServed?: string[]
      availableLanguage?: string[]
    }
  }
}
