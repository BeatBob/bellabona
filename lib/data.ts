import 'server-only'

import { sanityFetch } from '../sanity/lib/fetch'
import { homepageQuery, siteSettingsQuery } from '../sanity/lib/queries'
import type { HomepageData, SiteSettings } from '../sanity/lib/types'

export function getHomepage(): Promise<HomepageData | null> {
  return sanityFetch<HomepageData | null>({
    query: homepageQuery,
    tags: ['homepage'],
  })
}

export function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })
}
