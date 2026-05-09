import { CtaLink } from '../ui/CtaLink'
import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageCtaBanner } from '../../sanity/lib/types'

type Props = { data: HomepageCtaBanner; variant?: 'coral' | 'green' }

export function CtaBanner({ data, variant = 'coral' }: Props) {
  const { heading, description, cta, image } = data
  if (!heading) return null

  const isGreen = variant === 'green'
  const bgClass = isGreen ? 'bg-brand-lime' : 'bg-brand-coral-light'
  const headingClass = isGreen ? 'text-brand-green' : 'text-brand-coral-dark'
  const descriptionClass = isGreen ? 'text-brand-green/85' : 'text-brand-coral-dark/85'
  const ctaClass = isGreen
    ? 'rounded-full! w-full bg-brand-green! text-brand-lime hover:bg-brand-dark! sm:w-auto'
    : 'rounded-full! w-full bg-brand-coral-dark! text-white hover:bg-brand-coral! hover:text-white sm:w-auto'

  return (
    <Section spacing="default">
      <div className={`grid items-stretch gap-6 rounded-3xl p-8 sm:p-12 lg:grid-cols-2 lg:p-16 ${bgClass}`}>
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h2 className={`font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl ${headingClass}`}>
              {heading}
            </h2>
            {description ? (
              <p className={`text-base leading-relaxed sm:text-lg ${descriptionClass}`}>
                {description}
              </p>
            ) : null}
          </div>
          {cta ? (
            <div>
              <CtaLink cta={cta} variant="primary" size="lg" className={ctaClass} />
            </div>
          ) : null}
        </div>

        {image?.asset ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[320px]">
            <SanityImage
              image={image}
              width={720}
              height={540}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </Section>
  )
}
