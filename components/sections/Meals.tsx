import { CtaLink } from '../ui/CtaLink'
import { SanityImage } from '../ui/SanityImage'
import type { HomepageMealItem, HomepageMeals } from '../../sanity/lib/types'

type Props = { data: HomepageMeals }

export function Meals({ data }: Props) {
  const { heading, items, cta } = data
  if (!heading || !items?.length) return null

  return (
    <section className="pb-12 sm:pb-20 lg:pb-28">
      <div className="w-full bg-brand-lime py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="px-4 text-center font-display text-3xl font-bold tracking-tight text-balance text-brand-green sm:px-10 sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {/* Mobile: horizontal scroll, hidden scrollbar */}
          <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:mt-14 sm:px-10 md:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((item, i) => (
              <div key={i} className="w-[80%] flex-shrink-0 snap-start">
                <MealCard item={item} />
              </div>
            ))}
          </div>

          {/* Desktop: 3-col grid */}
          <div className="mt-10 hidden grid-cols-3 gap-6 px-4 sm:mt-14 sm:px-10 md:grid">
            {items.map((item, i) => (
              <MealCard key={i} item={item} />
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
        </div>
      </div>
    </section>
  )
}

function MealCard({ item }: { item: HomepageMealItem }) {
  return (
    <article className="flex flex-col rounded-3xl bg-white p-4 sm:p-5">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        {item.image?.asset ? (
          <SanityImage
            image={item.image}
            width={600}
            height={600}
            sizes="(min-width: 768px) 33vw, 80vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-brand-stone" aria-hidden />
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-3 rounded-full border border-brand-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-brand-dark sm:text-base">
          {item.tag}
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold text-brand-dark sm:text-xl">
        {item.title}
      </h3>
      {item.ratingPercent || item.reviewCount ? (
        <p className="mt-1 flex items-center gap-2 text-sm text-brand-dark/75">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-brand-green">
            <path
              d="M6 6V3.5a1.5 1.5 0 0 1 3 0V6h3a1.5 1.5 0 0 1 1.5 1.5L13 12.5A2 2 0 0 1 11 14H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2zm-3 0H2v8h1V6z"
              fill="currentColor"
            />
          </svg>
          <span>
            {item.ratingPercent ? <strong className="font-semibold">{item.ratingPercent}</strong> : null}
            {item.ratingPercent && item.reviewCount ? ' ' : null}
            {item.reviewCount ? `(${item.reviewCount})` : null}
          </span>
        </p>
      ) : null}
    </article>
  )
}
