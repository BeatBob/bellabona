import type { SiteSettings } from '../sanity/lib/types'
import { SITE_URL } from './i18n'

export function organizationJsonLd(settings: SiteSettings) {
  const org = settings.organization
  const addr = org?.address
  const cp = org?.contactPoint

  const address =
    addr && (addr.streetAddress || addr.addressLocality || addr.addressCountry)
      ? {
          '@type': 'PostalAddress',
          ...(addr.streetAddress ? { streetAddress: addr.streetAddress } : {}),
          ...(addr.postalCode ? { postalCode: addr.postalCode } : {}),
          ...(addr.addressLocality ? { addressLocality: addr.addressLocality } : {}),
          ...(addr.addressRegion ? { addressRegion: addr.addressRegion } : {}),
          ...(addr.addressCountry ? { addressCountry: addr.addressCountry } : {}),
        }
      : null

  const contactPoint =
    cp && (cp.email || cp.telephone)
      ? {
          '@type': 'ContactPoint',
          ...(cp.email ? { email: cp.email } : {}),
          ...(cp.telephone ? { telephone: cp.telephone } : {}),
          ...(cp.contactType ? { contactType: cp.contactType } : {}),
          ...(cp.areaServed?.length ? { areaServed: cp.areaServed } : {}),
          ...(cp.availableLanguage?.length ? { availableLanguage: cp.availableLanguage } : {}),
        }
      : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org?.legalName ?? settings.siteName,
    url: org?.url ?? SITE_URL,
    ...(org?.logoUrl ? { logo: org.logoUrl } : {}),
    ...(org?.sameAs?.length ? { sameAs: org.sameAs } : {}),
    ...(address ? { address } : {}),
    ...(contactPoint ? { contactPoint } : {}),
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.answer,
      },
    })),
  }
}
