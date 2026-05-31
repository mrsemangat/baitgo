import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green' | 'soft' | 'premium'
}

export function Badge({ className, variant = 'soft', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
        {
          'bg-[#F5E6C8] text-[#8B6914]': variant === 'gold',
          'bg-[#E8F5ED] text-[#1B6B3A]': variant === 'green',
          'bg-gray-100 text-gray-600': variant === 'soft',
          'bg-gradient-to-r from-[#C9A84C] to-[#F5D57A] text-white': variant === 'premium',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
