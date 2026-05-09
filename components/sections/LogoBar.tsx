import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['logoBar']> }

export function LogoBar({ data }: Props) {
  const { eyebrow, logos } = data
  if (!logos?.length) return null

  return (
    <Section spacing="tight">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-wider text-brand-dark/70">
            {eyebrow}
          </p>
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
          {logos.map((item) => (
            <li key={item.name} className="grayscale">
              <SanityImage
                image={item.logo}
                width={120}
                height={32}
                sizes="120px"
                alt={`${item.name} logo`}
                className="h-7 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
