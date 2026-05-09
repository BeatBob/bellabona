import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type Props = {
  as?: ElementType
  tone?: 'cream' | 'green' | 'lime' | 'plain'
  spacing?: 'tight' | 'default'
  containerClassName?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

const tones = {
  cream: 'bg-brand-cream text-brand-dark',
  green: 'bg-brand-green text-brand-cream',
  lime: 'bg-brand-lime text-brand-dark',
  plain: '',
}

const spacings = {
  tight: 'pb-8 sm:pb-10',
  default: 'pb-12 sm:pb-20 lg:pb-28',
}

export function Section({
  as: Tag = 'section',
  tone = 'plain',
  spacing = 'default',
  className = '',
  containerClassName = '',
  children,
  ...rest
}: Props) {
  return (
    <Tag className={`${tones[tone]} ${spacings[spacing]} ${className}`} {...rest}>
      <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-10 ${containerClassName}`}>
        {children}
      </div>
    </Tag>
  )
}
