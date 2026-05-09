import type { MetadataRoute } from 'next'

import { LOCALES, localeUrl } from '../lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localeUrl(locale, '/'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, '/')])),
    },
  }))
}
