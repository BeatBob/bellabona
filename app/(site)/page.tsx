import type { Metadata } from 'next'
import Link from 'next/link'

import { CtaBanner } from '../../components/sections/CtaBanner'
import { Faqs } from '../../components/sections/Faqs'
import { Features } from '../../components/sections/Features'
import { Hero } from '../../components/sections/Hero'
import { LogoBar } from '../../components/sections/LogoBar'
import { Meals } from '../../components/sections/Meals'
import { Stats } from '../../components/sections/Stats'
import { Steps } from '../../components/sections/Steps'
import { Testimonial } from '../../components/sections/Testimonial'
import { getHomepage, getSiteSettings } from '../../lib/data'
import { FALLBACK_SITE_SETTINGS } from '../../lib/fallback'
import { DEFAULT_LOCALE, LOCALES, localeUrl } from '../../lib/i18n'
import { faqJsonLd, organizationJsonLd } from '../../lib/jsonld'
import { urlFor } from '../../sanity/lib/image'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage()
  const seo = homepage?.seo

  const title = seo?.metaTitle ?? 'Bella&Bona'
  const description =
    seo?.metaDescription ?? 'Workplace meals delivered to teams across Munich.'
  const canonical = seo?.canonicalUrl ?? localeUrl(DEFAULT_LOCALE, '/')

  const ogImageUrl =
    seo?.ogImage?.asset && 'url' in seo.ogImage.asset
      ? urlFor(seo.ogImage).width(1200).height(630).fit('crop').auto('format').url()
      : undefined

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, '/')])),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  }
}

export default async function HomePage() {
  const [homepage, settingsData] = await Promise.all([getHomepage(), getSiteSettings()])
  const settings = settingsData ?? FALLBACK_SITE_SETTINGS

  const jsonLd = organizationJsonLd(settings)
  const faqLd =
    homepage?.faqs?.heading && homepage.faqs.items?.length
      ? faqJsonLd(homepage.faqs.items)
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      {homepage?.hero ? (
        <Hero data={homepage.hero} />
      ) : (
        <EmptyState message="Publish the Homepage document in /studio to render the hero." />
      )}
      {homepage?.logoBar?.logos?.length ? <LogoBar data={homepage.logoBar} /> : null}
      {homepage?.stats?.items?.length ? <Stats data={homepage.stats} /> : null}
      {homepage?.meals?.heading && homepage.meals.items?.length ? (
        <Meals data={homepage.meals} />
      ) : null}
      {homepage?.features?.cards?.length || homepage?.features?.benefits?.length ? (
        <Features data={homepage.features!} />
      ) : null}
      {homepage?.ctaBanner?.heading ? <CtaBanner data={homepage.ctaBanner} /> : null}
      {homepage?.steps?.heading && homepage.steps.items?.length ? (
        <Steps data={homepage.steps} />
      ) : null}
      {homepage?.testimonial?.heading && homepage.testimonial.quote ? (
        <Testimonial data={homepage.testimonial} />
      ) : null}
      {homepage?.ctaBannerSecondary?.heading ? (
        <CtaBanner data={homepage.ctaBannerSecondary} variant="green" />
      ) : null}
      {homepage?.faqs?.heading && homepage.faqs.items?.length ? (
        <Faqs data={homepage.faqs} />
      ) : null}
    </>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-brand-dark">No content yet</h1>
      <p className="mt-2 text-brand-dark/75">{message}</p>
      <Link
        href="/studio"
        className="mt-6 inline-flex rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-brand-cream cursor-pointer transition-colors hover:bg-brand-dark"
      >
        Open Studio
      </Link>
    </section>
  )
}
