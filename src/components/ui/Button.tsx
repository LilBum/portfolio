import type { MouseEventHandler, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function Button({
  href,
  children,
  variant = 'primary',
  external,
  className,
  onClick,
}: Props) {
  const base =
    'inline-flex max-w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-center text-sm font-semibold transition-all duration-200 active:translate-y-px'

  const styles: Record<NonNullable<Props['variant']>, string> = {
    primary:
      'bg-accent text-bg shadow-[0_12px_30px_-10px_rgba(167,139,250,0.6)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-10px_rgba(167,139,250,0.75)] hover:brightness-110',
    ghost:
      'border border-border bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent',
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, styles[variant], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
