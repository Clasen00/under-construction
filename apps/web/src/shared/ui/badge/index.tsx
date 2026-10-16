import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full text-xs font-semibold leading-none tabular-nums',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-accent text-foreground',
        destructive: 'bg-error text-on-accent',
        outline: 'border border-border bg-background text-foreground',
      },
      size: {
        default: 'h-5 min-w-5 px-1.5',
        sm: 'h-4 min-w-4 px-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
