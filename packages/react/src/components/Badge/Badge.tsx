import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-full',
    'transition-all duration-[280ms] ease-in-out',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'bg-transparent border',
        soft: '',
        dot: 'pl-1.5',
      },
      size: {
        xs: 'text-xs px-2 py-0.5', // 20px height
        sm: 'text-sm px-2.5 py-1', // 24px height
        md: 'text-sm px-3 py-1.5', // 28px height
        lg: 'text-base px-4 py-2', // 36px height
      },
      agent: {
        bigSis: '',
        bro: '',
        lilSis: '',
        cbo: '',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        agent: 'bigSis',
        class: 'bg-cyan-500 text-white hover:bg-cyan-400',
      },
      {
        variant: 'solid',
        agent: 'bro',
        class: 'bg-orange-500 text-white hover:bg-orange-400',
      },
      {
        variant: 'solid',
        agent: 'lilSis',
        class: 'bg-purple-500 text-white hover:bg-purple-400',
      },
      {
        variant: 'solid',
        agent: 'cbo',
        class: 'bg-green-500 text-white hover:bg-green-400',
      },
      // Outline variants
      {
        variant: 'outline',
        agent: 'bigSis',
        class: 'border-cyan-500/50 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/10',
      },
      {
        variant: 'outline',
        agent: 'bro',
        class: 'border-orange-500/50 text-orange-400 hover:border-orange-500 hover:bg-orange-500/10',
      },
      {
        variant: 'outline',
        agent: 'lilSis',
        class: 'border-purple-500/50 text-purple-400 hover:border-purple-500 hover:bg-purple-500/10',
      },
      {
        variant: 'outline',
        agent: 'cbo',
        class: 'border-green-500/50 text-green-400 hover:border-green-500 hover:bg-green-500/10',
      },
      // Soft variants
      {
        variant: 'soft',
        agent: 'bigSis',
        class: 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30',
      },
      {
        variant: 'soft',
        agent: 'bro',
        class: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        variant: 'soft',
        agent: 'lilSis',
        class: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
      },
      {
        variant: 'soft',
        agent: 'cbo',
        class: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'sm',
      agent: 'bigSis',
    },
  }
);

const dotVariants = cva(
  'w-2 h-2 rounded-full mr-1.5 flex-shrink-0',
  {
    variants: {
      agent: {
        bigSis: 'bg-cyan-500',
        bro: 'bg-orange-500',
        lilSis: 'bg-purple-500',
        cbo: 'bg-green-500',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'solid',
      size = 'sm',
      agent = 'bigSis',
      removable = false,
      onRemove,
      dot = false,
      pulse = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const showDot = dot || variant === 'dot';

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant: showDot ? 'dot' : variant, size, agent }),
          className
        )}
        {...props}
      >
        {showDot && (
          <span className={cn(dotVariants({ agent, pulse }))} />
        )}
        {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              'ml-1.5 -mr-1 flex-shrink-0',
              'text-current opacity-60 hover:opacity-100',
              'transition-opacity duration-[140ms]',
              'focus:outline-none focus:opacity-100'
            )}
            aria-label="Remove"
          >
            <svg
              className={cn(
                size === 'xs' && 'w-3 h-3',
                size === 'sm' && 'w-3.5 h-3.5',
                size === 'md' && 'w-4 h-4',
                size === 'lg' && 'w-4.5 h-4.5'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';