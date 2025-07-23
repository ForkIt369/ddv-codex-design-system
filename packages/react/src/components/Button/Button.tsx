import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  // Base styles - mathematical harmony with 8px grid
  [
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-[280ms] ease-in-out', // 280ms harmonic timing
    'rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'active:scale-[0.98]', // Subtle press feedback
    'select-none', // Prevent text selection
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r text-black shadow-lg',
          'hover:shadow-xl hover:translate-y-[-2px]',
          'focus-visible:ring-offset-gray-900',
        ],
        secondary: [
          'bg-gray-800 text-white border border-gray-700',
          'hover:bg-gray-700 hover:border-gray-600',
          'focus-visible:ring-gray-600 focus-visible:ring-offset-gray-900',
        ],
        tertiary: [
          'bg-transparent text-current',
          'hover:bg-white/5',
          'focus-visible:ring-current focus-visible:ring-offset-transparent',
        ],
        ghost: [
          'bg-transparent text-current',
          'hover:bg-white/10',
          'focus-visible:ring-current focus-visible:ring-offset-transparent',
        ],
      },
      size: {
        xs: 'h-8 px-3 text-xs gap-1.5', // 32px height (8px × 4)
        sm: 'h-10 px-4 text-sm gap-2', // 40px height (8px × 5) - minimum touch target
        md: 'h-12 px-6 text-base gap-2', // 48px height (8px × 6)
        lg: 'h-14 px-8 text-lg gap-3', // 56px height (8px × 7)
        xl: 'h-16 px-10 text-xl gap-3', // 64px height (8px × 8)
      },
      agent: {
        bigSis: [
          'from-cyan-500 to-blue-600',
          'hover:from-cyan-400 hover:to-blue-500',
          'focus-visible:ring-cyan-500',
        ],
        bro: [
          'from-orange-500 to-red-600',
          'hover:from-orange-400 hover:to-red-500',
          'focus-visible:ring-orange-500',
        ],
        lilSis: [
          'from-purple-500 to-pink-600',
          'hover:from-purple-400 hover:to-pink-500',
          'focus-visible:ring-purple-500',
        ],
        cbo: [
          'from-green-500 to-emerald-600',
          'hover:from-green-400 hover:to-emerald-500',
          'focus-visible:ring-green-500',
        ],
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    compoundVariants: [
      // Primary variants need agent colors
      {
        variant: 'primary',
        agent: undefined,
        className: 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    agent,
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant, size, agent, fullWidth, loading }),
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner className="animate-spin" />
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);