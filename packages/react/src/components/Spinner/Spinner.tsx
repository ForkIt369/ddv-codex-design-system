import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Spinner Variants
const spinnerVariants = cva(
  [
    'inline-block',
    'animate-spin',
    'rounded-full',
    'border-2',
    'border-current',
    'border-r-transparent',
  ],
  {
    variants: {
      size: {
        xs: 'w-3 h-3', // 12px
        sm: 'w-4 h-4', // 16px
        md: 'w-6 h-6', // 24px
        lg: 'w-8 h-8', // 32px
        xl: 'w-10 h-10', // 40px
        '2xl': 'w-12 h-12', // 48px
        '3xl': 'w-16 h-16', // 64px
      },
      agent: {
        bigSis: 'text-cyan-500',
        bro: 'text-orange-500',
        lilSis: 'text-purple-500',
        cbo: 'text-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  fullScreen?: boolean;
  overlay?: boolean;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      agent = 'bigSis',
      label,
      labelPosition = 'bottom',
      fullScreen = false,
      overlay = false,
      ...props
    },
    ref
  ) => {
    const spinner = (
      <div
        ref={ref}
        role="status"
        aria-label={label || 'Loading'}
        className={cn(spinnerVariants({ size, agent }), className)}
        {...props}
      >
        <span className="sr-only">{label || 'Loading...'}</span>
      </div>
    );

    if (!label && !fullScreen && !overlay) {
      return spinner;
    }

    const content = (
      <div
        className={cn(
          'flex items-center justify-center',
          labelPosition === 'top' && 'flex-col-reverse',
          labelPosition === 'bottom' && 'flex-col',
          labelPosition === 'left' && 'flex-row-reverse',
          labelPosition === 'right' && 'flex-row',
          (labelPosition === 'left' || labelPosition === 'right') && 'gap-3',
          (labelPosition === 'top' || labelPosition === 'bottom') && 'gap-2'
        )}
      >
        {spinner}
        {label && (
          <span
            className={cn(
              'text-gray-400',
              size === 'xs' && 'text-xs',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg',
              size === 'xl' && 'text-xl',
              size === '2xl' && 'text-2xl',
              size === '3xl' && 'text-3xl'
            )}
          >
            {label}
          </span>
        )}
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {content}
        </div>
      );
    }

    if (overlay) {
      return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-inherit">
          {content}
        </div>
      );
    }

    return content;
  }
);

Spinner.displayName = 'Spinner';

// Dots Spinner
export interface DotsSpinnerProps extends Omit<SpinnerProps, 'children'> {
  count?: number;
}

export const DotsSpinner = forwardRef<HTMLDivElement, DotsSpinnerProps>(
  ({ count = 3, size = 'md', agent = 'bigSis', className, ...props }, ref) => {
    const dotSizeMap = {
      xs: 'w-1 h-1',
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3',
      '2xl': 'w-3.5 h-3.5',
      '3xl': 'w-4 h-4',
    };

    const gapMap = {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
      xl: 'gap-2.5',
      '2xl': 'gap-3',
      '3xl': 'gap-4',
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn('flex items-center', gapMap[size || 'md'], className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full animate-pulse',
              dotSizeMap[size || 'md'],
              agent === 'bigSis' && 'bg-cyan-500',
              agent === 'bro' && 'bg-orange-500',
              agent === 'lilSis' && 'bg-purple-500',
              agent === 'cbo' && 'bg-green-500'
            )}
            style={{
              animationDelay: `${index * 150}ms`,
              animationDuration: '1.4s',
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

DotsSpinner.displayName = 'DotsSpinner';

// Pulse Spinner
export const PulseSpinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', agent = 'bigSis', className, ...props }, ref) => {
    const sizeMap = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
      '2xl': 'w-12 h-12',
      '3xl': 'w-16 h-16',
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn('relative', sizeMap[size || 'md'], className)}
        {...props}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full animate-ping',
            agent === 'bigSis' && 'bg-cyan-500',
            agent === 'bro' && 'bg-orange-500',
            agent === 'lilSis' && 'bg-purple-500',
            agent === 'cbo' && 'bg-green-500'
          )}
          style={{ animationDuration: '1.5s' }}
        />
        <div
          className={cn(
            'relative rounded-full',
            sizeMap[size || 'md'],
            agent === 'bigSis' && 'bg-cyan-500',
            agent === 'bro' && 'bg-orange-500',
            agent === 'lilSis' && 'bg-purple-500',
            agent === 'cbo' && 'bg-green-500'
          )}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

PulseSpinner.displayName = 'PulseSpinner';

// Bars Spinner
export const BarsSpinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', agent = 'bigSis', className, ...props }, ref) => {
    const barHeightMap = {
      xs: 'h-3',
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
      xl: 'h-10',
      '2xl': 'h-12',
      '3xl': 'h-16',
    };

    const gapMap = {
      xs: 'gap-0.5',
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1',
      xl: 'gap-1.5',
      '2xl': 'gap-1.5',
      '3xl': 'gap-2',
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn('flex items-center', gapMap[size || 'md'], className)}
        {...props}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-1 animate-bounce',
              barHeightMap[size || 'md'],
              agent === 'bigSis' && 'bg-cyan-500',
              agent === 'bro' && 'bg-orange-500',
              agent === 'lilSis' && 'bg-purple-500',
              agent === 'cbo' && 'bg-green-500'
            )}
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: '1.2s',
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

BarsSpinner.displayName = 'BarsSpinner';

// Grid Spinner (3x3 grid)
export const GridSpinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', agent = 'bigSis', className, ...props }, ref) => {
    const gridSizeMap = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
      '2xl': 'w-24 h-24',
      '3xl': 'w-32 h-32',
    };

    const dotSizeMap = {
      xs: 'w-1 h-1',
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5',
      '3xl': 'w-6 h-6',
    };

    const gapMap = {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
      xl: 'gap-2.5',
      '2xl': 'gap-3',
      '3xl': 'gap-4',
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'grid grid-cols-3',
          gridSizeMap[size || 'md'],
          gapMap[size || 'md'],
          className
        )}
        {...props}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full animate-pulse',
              dotSizeMap[size || 'md'],
              agent === 'bigSis' && 'bg-cyan-500',
              agent === 'bro' && 'bg-orange-500',
              agent === 'lilSis' && 'bg-purple-500',
              agent === 'cbo' && 'bg-green-500'
            )}
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: '1.5s',
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

GridSpinner.displayName = 'GridSpinner';