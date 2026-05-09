import { CtaLink } from '../ui/CtaLink'
import { PortableText } from '../ui/PortableText'
import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageHero } from '../../sanity/lib/types'

type Props = { data: HomepageHero }

export function Hero({ data }: Props) {
  const { headline, subheadline, cta, backgroundImage } = data

  return (
    <Section spacing="default">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <div className="flex flex-col justify-between rounded-3xl bg-brand-green p-8 text-brand-lime sm:p-12">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-balance text-brand-lime">
            {headline}
          </h1>
          <div className="mt-8 space-y-6 text-base text-brand-lime sm:text-lg">
            <PortableText value={subheadline} />
            {cta ? (
              <CtaLink
                cta={cta}
                variant="secondary"
                size="lg"
                className="w-full rounded-full! border-transparent bg-brand-lime text-brand-green hover:bg-brand-lime/90 hover:text-brand-green sm:w-auto"
              />
            ) : null}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[420px]">
          <SanityImage
            image={backgroundImage}
            width={960}
            height={720}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  )
}
