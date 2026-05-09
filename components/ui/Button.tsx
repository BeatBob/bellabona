import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-[background,color,box-shadow,transform] duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green focus-visible:ring-offset-brand-cream disabled:opacity-60 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-green text-white rounded-full hover:bg-brand-dark active:translate-y-px',
  secondary:
    'bg-brand-cream text-brand-green border border-brand-green rounded-xl hover:bg-brand-cream-2 active:translate-y-px',
  tertiary:
    'bg-transparent text-brand-green hover:text-brand-dark underline-offset-4 hover:underline px-0',
}

const sizes: Record<Size, string> = {
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'children' | 'className'
  >

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'className'
  >

function classes(variant: Variant, size: Size, extra?: string) {
  const sizeClass = variant === 'tertiary' ? '' : sizes[size]
  return [base, variants[variant], sizeClass, extra].filter(Boolean).join(' ')
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const cls = classes(variant, size, className)

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest
    if (isExternal(href)) {
      return (
        <a {...anchorRest} href={href} rel="noopener noreferrer" target="_blank" className={cls}>
          {children}
        </a>
      )
    }
    return (
      <Link {...anchorRest} href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {children}
    </button>
  )
}
