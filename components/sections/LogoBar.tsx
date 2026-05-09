import { SanityImage } from '../ui/SanityImage'
import { Section } from '../ui/Section'
import type { HomepageData } from '../../sanity/lib/types'

type Props = { data: NonNullable<HomepageData['logoBar']> }

export function LogoBar({ data }: Props) {
  const { eyebrow, logos } = data
  if (!logos?.length) return null

  return (
    <Section spacing="default">
      <div className="mx-auto flex w-full max-w-[1040px] flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20">
        {eyebrow ? (
          <p className="text-lg text-brand-dark/80 sm:text-xl">{eyebrow}</p>
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 opacity-70">
          {logos.map((item) => (
            <li key={item.name} className="grayscale">
              <SanityImage
                image={item.logo}
                width={180}
                height={48}
                sizes="180px"
                alt={`${item.name} logo`}
                className="h-10 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
