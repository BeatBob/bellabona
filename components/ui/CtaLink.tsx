import { Button } from './Button'
import type { CtaValue } from '../../sanity/lib/types'

type Props = {
  cta: CtaValue
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'md' | 'lg'
  className?: string
}

export function CtaLink({ cta, variant = 'primary', size = 'md', className }: Props) {
  if (!cta?.label || !cta?.href) return null
  return (
    <Button href={cta.href} variant={variant} size={size} className={className}>
      {cta.label}
    </Button>
  )
}
