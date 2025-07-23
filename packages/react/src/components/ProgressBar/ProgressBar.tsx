import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const progressBarVariants = cva(
  [
    'relative',
    'overflow-hidden',
    'bg-white/5',
    'backdrop-blur-sm',
  ],
  {
    variants: {
      size: {
        xs: 'h-1', // 4px
        sm: 'h-2', // 8px
        md: 'h-3', // 12px
        lg: 'h-4', // 16px
        xl: 'h-6', // 24px
      },
      variant: {
        default: 'rounded-full',
        squared: 'rounded-none',
        rounded: 'rounded-lg',
      },
      agent: {
        bigSis: '',
        bro: '',
        lilSis: '',
        cbo: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      agent: 'bigSis',
    },
  }
);

const progressFillVariants = cva(
  [
    'h-full',
    'transition-all duration-[560ms] ease-out', // 2x base timing for smooth progress
    'relative',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-full',
        squared: 'rounded-none',
        rounded: 'rounded-lg',
      },
      agent: {
        bigSis: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
        bro: 'bg-gradient-to-r from-orange-500 to-orange-400',
        lilSis: 'bg-gradient-to-r from-purple-500 to-purple-400',
        cbo: 'bg-gradient-to-r from-green-500 to-green-400',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
      striped: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      agent: 'bigSis',
      animated: false,
      striped: false,
    },
  }
);

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  indeterminate?: boolean;
  segments?: Array<{
    value: number;
    color?: string;
    label?: string;
  }>;
  containerClassName?: string;
  fillClassName?: string;
  labelClassName?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      label,
      showValue = false,
      animated = false,
      striped = false,
      indeterminate = false,
      segments,
      size = 'md',
      variant = 'default',
      agent = 'bigSis',
      className,
      containerClassName,
      fillClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Agent-based stripes
    const stripeStyles = {
      bigSis: 'from-cyan-500/50 to-transparent',
      bro: 'from-orange-500/50 to-transparent',
      lilSis: 'from-purple-500/50 to-transparent',
      cbo: 'from-green-500/50 to-transparent',
    };

    // Render segmented progress
    if (segments && segments.length > 0) {
      const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);
      let cumulativePercentage = 0;

      return (
        <div className={containerClassName}>
          {(label || showValue) && (
            <div className="flex justify-between items-center mb-2">
              {label && (
                <span className={cn('text-sm font-medium text-gray-300', labelClassName)}>
                  {label}
                </span>
              )}
              {showValue && (
                <span className="text-sm text-gray-500 tabular-nums">
                  {value}/{max}
                </span>
              )}
            </div>
          )}
          <div
            ref={ref}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label || 'Progress'}
            className={cn(progressBarVariants({ size, variant, agent }), className)}
            {...props}
          >
            {segments.map((segment, index) => {
              const segmentPercentage = (segment.value / totalValue) * percentage;
              const left = cumulativePercentage;
              cumulativePercentage += segmentPercentage;

              return (
                <div
                  key={index}
                  className={cn(
                    'absolute h-full transition-all duration-[560ms] ease-out',
                    variant === 'default' && 'first:rounded-l-full last:rounded-r-full',
                    variant === 'rounded' && 'first:rounded-l-lg last:rounded-r-lg'
                  )}
                  style={{
                    left: `${left}%`,
                    width: `${segmentPercentage}%`,
                    backgroundColor: segment.color,
                  }}
                  title={segment.label}
                />
              );
            })}
          </div>
        </div>
      );
    }

    // Render standard progress
    return (
      <div className={containerClassName}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className={cn('text-sm font-medium text-gray-300', labelClassName)}>
                {label}
              </span>
            )}
            {showValue && !indeterminate && (
              <span className="text-sm text-gray-500 tabular-nums">
                {size === 'xs' || size === 'sm' 
                  ? `${Math.round(percentage)}%`
                  : `${value}/${max} (${Math.round(percentage)}%)`
                }
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
          className={cn(progressBarVariants({ size, variant, agent }), className)}
          {...props}
        >
          <div
            className={cn(
              progressFillVariants({ variant, agent, animated, striped }),
              fillClassName
            )}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              transform: indeterminate ? 'translateX(-100%)' : undefined,
              animation: indeterminate
                ? 'indeterminate 1.5s ease-in-out infinite'
                : undefined,
            }}
          >
            {/* Stripes overlay */}
            {striped && (
              <div
                className={cn(
                  'absolute inset-0',
                  'bg-gradient-to-r',
                  stripeStyles[agent],
                  'bg-[length:20px_20px]',
                  animated && 'animate-stripe-slide'
                )}
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 20px
                  )`,
                }}
              />
            )}
            
            {/* Shine effect */}
            <div
              className={cn(
                'absolute inset-0',
                'bg-gradient-to-r from-transparent via-white/20 to-transparent',
                'w-1/3',
                '-skew-x-12',
                'animate-shine'
              )}
            />
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// Circular progress variant
export interface CircularProgressProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'value'> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  showValue?: boolean;
  label?: string;
  animated?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 64, // 8 * 8px
  strokeWidth = 4,
  agent = 'bigSis',
  showValue = true,
  label,
  animated = false,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const agentColors = {
    bigSis: '#00D4FF',
    bro: '#FF9500',
    lilSis: '#D946EF',
    cbo: '#30D158',
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      <div className="relative">
        <svg
          width={size}
          height={size}
          className={cn('transform -rotate-90', className)}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/10"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={agentColors[agent]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-[560ms] ease-out',
              animated && 'animate-pulse'
            )}
          />
        </svg>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-white tabular-nums">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-sm text-gray-400">{label}</span>
      )}
    </div>
  );
};