// Fallback for the bare-minimum chrome (siteName, logo, organization).
// Nav, CTAs, and footer content come from Sanity only — if the editor hasn't
// published them, those slots simply don't render.
import type { SiteSettings } from '../sanity/lib/types'

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteName: 'Bella&Bona',
  logoHeader: null,
  logoFooter: null,
  headerCta: null,
  organization: {
    legalName: 'Bella&Bona GmbH',
    url: 'https://bellabona.com',
  },
}
