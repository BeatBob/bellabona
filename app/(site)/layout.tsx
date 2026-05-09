import type { ReactNode } from 'react'

import { Footer } from '../../components/site/Footer'
import { Navigation } from '../../components/site/Navigation'
import { getSiteSettings } from '../../lib/data'
import { FALLBACK_SITE_SETTINGS } from '../../lib/fallback'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = (await getSiteSettings()) ?? FALLBACK_SITE_SETTINGS

  return (
    <>
      <Navigation settings={settings} />
      <main id="main" className="flex-1 pt-[72px] sm:pt-[88px]">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  )
}
