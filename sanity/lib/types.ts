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

export type HomepageFeatureCard = {
  value: string
  title: string
  description?: string
}

export type HomepageFeatureBenefit = {
  icon: SanityImageRef
  title: string
  description?: string
}

export type HomepageStatItem = { value: string; label: string }

export type HomepageCtaBanner = {
  heading: string
  description?: string
  cta: CtaValue
  image?: SanityImageRef | null
}

export type HomepageFaqItem = { question: string; answer: string }

export type HomepageFaqs = {
  heading: string
  items?: HomepageFaqItem[]
}

export type HomepageMealItem = {
  tag: string
  title: string
  ratingPercent?: string
  reviewCount?: string
  image?: SanityImageRef | null
}

export type HomepageMeals = {
  heading: string
  items?: HomepageMealItem[]
  cta?: CtaValue
}

export type HomepageStep = {
  label: string
  title: string
  description?: string
  image: SanityImageRef
}

export type HomepageSteps = {
  heading: string
  items?: HomepageStep[]
  cta?: CtaValue
}

export type HomepageTestimonial = {
  heading: string
  leftImage?: SanityImageRef | null
  quote: string
  authorName?: string
  authorTitle?: string
  rightImage?: SanityImageRef | null
}

export type HomepageData = {
  hero: HomepageHero
  logoBar?: { eyebrow?: string; logos?: HomepageLogo[] }
  stats?: { items?: HomepageStatItem[] }
  ctaBanner?: HomepageCtaBanner
  features?: {
    heading?: string
    subheading?: string
    cards?: HomepageFeatureCard[]
    image?: SanityImageRef | null
    benefits?: HomepageFeatureBenefit[]
  }
  testimonial?: HomepageTestimonial
  ctaBannerSecondary?: HomepageCtaBanner
  steps?: HomepageSteps
  meals?: HomepageMeals
  faqs?: HomepageFaqs
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
