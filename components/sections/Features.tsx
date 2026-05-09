import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['features']> }

export function Features({ data }: Props) {
  const { heading, subheading, cards, image, benefits } = data
  const hasCards = !!cards?.length
  const hasBottomRow = !!image?.asset || !!benefits?.length
  if (!hasCards && !hasBottomRow) return null

  return (
    <Section spacing="default">
      {(heading || subheading) && (
        <div className="mx-auto max-w-3xl text-center">
          {heading ? (
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="mt-4 text-base text-brand-dark/75 sm:text-lg">{subheading}</p>
          ) : null}
        </div>
      )}

      {hasCards ? (
        <ul className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {cards!.map((card) => (
            <li
              key={`${card.value}-${card.title}`}
              className="flex min-h-[260px] flex-col justify-between rounded-3xl bg-brand-green p-8 text-brand-cream sm:p-10"
            >
              <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {card.value}
              </p>
              <div className="mt-12">
                <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="mt-2 text-sm text-brand-cream/80 sm:text-base">{card.description}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {hasBottomRow ? (
        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {image?.asset ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <SanityImage
                image={image}
                width={720}
                height={540}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          {benefits?.length ? (
            <ul className="flex flex-col justify-center gap-6 rounded-3xl bg-brand-stone p-8 sm:p-10">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <SanityImage
                      image={b.icon}
                      width={28}
                      height={28}
                      sizes="28px"
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-brand-dark sm:text-xl">
                      {b.title}
                    </p>
                    {b.description ? (
                      <p className="mt-1 text-base text-brand-dark/70 sm:text-lg">
                        {b.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </Section>
  )
}
