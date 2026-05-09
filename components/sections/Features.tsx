import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['features']> }

export function Features({ data }: Props) {
  const { heading, subheading, items } = data
  if (!items?.length) return null

  return (
    <Section spacing="default">
      {(heading || subheading) && (
        <div className="mx-auto max-w-2xl text-center">
          {heading ? (
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="mt-4 text-base text-brand-dark/75 sm:text-lg">{subheading}</p>
          ) : null}
        </div>
      )}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-3xl bg-brand-cream-2 p-8 transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
              <SanityImage
                image={item.icon}
                width={28}
                height={28}
                sizes="28px"
                className="h-7 w-7 object-contain"
              />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-brand-dark/75 sm:text-base">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
