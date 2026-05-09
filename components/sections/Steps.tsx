import { CtaLink } from '../ui/CtaLink'
import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageSteps } from '../../sanity/lib/types'

type Props = { data: HomepageSteps }

export function Steps({ data }: Props) {
  const { heading, items, cta } = data
  if (!heading || !items?.length) return null

  return (
    <Section spacing="default">
      <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-balance text-brand-dark sm:text-4xl lg:text-5xl">
        {heading}
      </h2>

      <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
        {items.map((item, i) => (
          <article key={i} className="flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <SanityImage
                image={item.image}
                width={720}
                height={720}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-lime px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
              {item.label}
            </span>

            <h3 className="mt-4 font-display text-xl font-bold text-brand-dark sm:text-2xl">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 sm:text-base">
                {item.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      {cta ? (
        <div className="mt-10 flex justify-center sm:mt-14">
          <CtaLink
            cta={cta}
            variant="primary"
            size="lg"
            className="rounded-full! bg-brand-green! text-brand-cream hover:bg-brand-dark!"
          />
        </div>
      ) : null}
    </Section>
  )
}
