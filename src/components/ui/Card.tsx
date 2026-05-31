import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'green'
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        {
          'bg-white shadow-sm border border-[rgba(201,168,76,0.12)]': variant === 'default',
          'bg-[#F5E6C8] border border-[rgba(201,168,76,0.3)]': variant === 'gold',
          'bg-[#1B6B3A] text-white': variant === 'green',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-bold text-lg text-[#1a1a1a]', className)} {...props}>{children}</h3>
}
