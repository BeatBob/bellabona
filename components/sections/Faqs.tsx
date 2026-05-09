import { Section } from '../ui/Section'
import type { HomepageFaqs } from '../../sanity/lib/types'

type Props = { data: HomepageFaqs }

export function Faqs({ data }: Props) {
  const { heading, items } = data
  if (!heading || !items?.length) return null

  return (
    <Section spacing="default">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-balance text-brand-dark sm:text-4xl lg:text-5xl">
        {heading}
      </h2>

      <div className="mt-10 flex flex-col sm:mt-14">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border-b border-brand-dark/15 py-5 sm:py-6 [&[open]_.faq-icon]:rotate-45"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-brand-dark">
              <span className="text-base sm:text-lg">{item.question}</span>
              <span className="faq-icon flex size-6 flex-shrink-0 items-center justify-center rounded-full text-brand-dark/70 transition-transform">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-dark/75 sm:text-base">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  )
}
