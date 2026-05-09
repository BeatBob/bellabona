import { SanityImage } from '../ui/SanityImage'
import type { HomepageTestimonial } from '../../sanity/lib/types'

type Props = { data: HomepageTestimonial }

export function Testimonial({ data }: Props) {
  const { heading, leftImage, quote, authorName, authorTitle, rightImage } = data
  if (!heading || !quote) return null

  return (
    <section className="pb-12 sm:pb-20 lg:pb-28">
      <div className="w-full overflow-hidden bg-brand-lime py-12 sm:py-16 lg:py-20">
        <h2 className="mx-auto max-w-3xl px-4 text-center font-display text-2xl font-bold tracking-tight text-balance text-brand-green sm:px-10 sm:text-3xl lg:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 hidden items-stretch gap-6 xl:flex">
          {leftImage?.asset ? (
            <div className="relative -ml-[260px] w-[520px] flex-shrink-0 overflow-hidden rounded-2xl">
              <SanityImage
                image={leftImage}
                width={1040}
                height={1040}
                sizes="520px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : null}

          <figure className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-brand-green px-6 py-20 text-center text-brand-cream sm:px-10 sm:py-24 lg:py-28">
            <blockquote className="font-display text-xl leading-snug text-brand-cream text-balance sm:text-2xl lg:text-3xl">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {authorName || authorTitle ? (
              <figcaption className="mt-8 text-sm text-brand-cream/85">
                {authorName ? <p className="font-semibold">{authorName}</p> : null}
                {authorTitle ? <p className="text-brand-cream/70">{authorTitle}</p> : null}
              </figcaption>
            ) : null}
          </figure>

          {rightImage?.asset ? (
            <div className="relative -mr-[260px] w-[520px] flex-shrink-0 overflow-hidden rounded-2xl">
              <SanityImage
                image={rightImage}
                width={1040}
                height={1040}
                sizes="520px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-10 px-4 sm:px-10 xl:hidden">
          <figure className="mx-auto flex w-full max-w-[640px] flex-col items-center justify-center rounded-2xl bg-brand-green px-6 py-12 text-center text-brand-cream sm:px-10 sm:py-16">
            <blockquote className="font-display text-base leading-snug text-brand-cream text-balance sm:text-lg">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {authorName || authorTitle ? (
              <figcaption className="mt-8 text-sm text-brand-cream/85">
                {authorName ? <p className="font-semibold">{authorName}</p> : null}
                {authorTitle ? <p className="text-brand-cream/70">{authorTitle}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  )
}
