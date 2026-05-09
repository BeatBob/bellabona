import type { SiteSettings } from '../sanity/lib/types'
import { SITE_URL } from './i18n'

export function organizationJsonLd(settings: SiteSettings) {
  const org = settings.organization

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org?.legalName ?? settings.siteName,
    url: org?.url ?? SITE_URL,
    ...(org?.logoUrl ? { logo: org.logoUrl } : {}),
    ...(org?.sameAs?.length ? { sameAs: org.sameAs } : {}),
  }
}
