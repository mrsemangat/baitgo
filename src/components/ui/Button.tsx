'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#1B6B3A] hover:bg-[#0D4A28] text-white focus:ring-[#1B6B3A] active:scale-95': variant === 'primary',
            'bg-[#C9A84C] hover:bg-[#b8963d] text-white focus:ring-[#C9A84C] active:scale-95': variant === 'gold',
            'bg-transparent hover:bg-black/5 text-[#1B6B3A] focus:ring-[#1B6B3A]': variant === 'ghost',
            'border-2 border-[#1B6B3A] text-[#1B6B3A] hover:bg-[#1B6B3A] hover:text-white focus:ring-[#1B6B3A]': variant === 'outline',
            'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500': variant === 'danger',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-base px-6 py-3': size === 'md',
            'text-lg px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
