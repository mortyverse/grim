import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    // SaaS Style: Slightly less rounded (xl -> lg or even md), cleaner transitions
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm', // Solid Black
      outline: 'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 shadow-sm', // White with border
      ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900', // Transparent
      link: 'text-neutral-900 underline-offset-4 hover:underline',
    }

    const sizes = {
      default: 'h-10 px-5 py-2.5 text-sm', // Standard SaaS button size
      sm: 'h-9 px-4 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }