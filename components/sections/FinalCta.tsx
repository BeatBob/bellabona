import { CtaLink } from '../ui/CtaLink'
import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['finalCta']> }

export function FinalCta({ data }: Props) {
  const { heading, body, cta } = data

  return (
    <Section tone="green" spacing="default">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
          {heading}
        </h2>
        {body ? (
          <p className="mt-5 text-base text-brand-cream/85 sm:text-lg text-balance">{body}</p>
        ) : null}
        {cta ? (
          <div className="mt-8">
            <CtaLink cta={cta} variant="secondary" size="lg" />
          </div>
        ) : null}
      </div>
    </Section>
  )
}
