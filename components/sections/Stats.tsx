import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['stats']> }

export function Stats({ data }: Props) {
  const items = data.items
  if (!items?.length) return null

  return (
    <Section spacing="default">
      <ul className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {items.map((item) => (
          <li
            key={`${item.value}-${item.label}`}
            className="flex min-h-[260px] flex-col justify-between rounded-3xl bg-brand-stone p-8 sm:p-10"
          >
            <p className="font-display text-5xl font-bold tracking-tight text-brand-dark sm:text-6xl">
              {item.value}
            </p>
            <p className="mt-12 text-base text-brand-dark/80 sm:text-lg">{item.label}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
