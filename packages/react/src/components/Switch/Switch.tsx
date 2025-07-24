import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva(
  [
    'relative inline-flex items-center',
    'rounded-full',
    'transition-all duration-[280ms] ease-in-out',
    'cursor-pointer',
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black/95',
  ],
  {
    variants: {
      size: {
        sm: 'w-8 h-4', // 32px × 16px
        md: 'w-10 h-5', // 40px × 20px
        lg: 'w-12 h-6', // 48px × 24px
        xl: 'w-14 h-7', // 56px × 28px
      },
      agent: {
        bigSis: [
          'focus-within:ring-cyan-500/50',
          'data-[state=checked]:bg-cyan-500',
          'data-[state=unchecked]:bg-gray-600',
        ],
        bro: [
          'focus-within:ring-orange-500/50',
          'data-[state=checked]:bg-orange-500',
          'data-[state=unchecked]:bg-gray-600',
        ],
        lilSis: [
          'focus-within:ring-purple-500/50',
          'data-[state=checked]:bg-purple-500',
          'data-[state=unchecked]:bg-gray-600',
        ],
        cbo: [
          'focus-within:ring-green-500/50',
          'data-[state=checked]:bg-green-500',
          'data-[state=unchecked]:bg-gray-600',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
    },
  }
);

const thumbVariants = cva(
  [
    'absolute top-0.5 left-0.5',
    'bg-white',
    'rounded-full',
    'shadow-lg',
    'transition-all duration-[280ms] ease-in-out',
    'transform',
  ],
  {
    variants: {
      size: {
        sm: 'w-3 h-3', // 12px
        md: 'w-4 h-4', // 16px
        lg: 'w-5 h-5', // 20px
        xl: 'w-6 h-6', // 24px
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', checked: true, class: 'translate-x-4' },
      { size: 'md', checked: true, class: 'translate-x-5' },
      { size: 'lg', checked: true, class: 'translate-x-6' },
      { size: 'xl', checked: true, class: 'translate-x-7' },
    ],
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  labelPosition?: 'left' | 'right';
  description?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = 'md',
      agent = 'bigSis',
      label,
      labelPosition = 'right',
      description,
      checked,
      defaultChecked,
      disabled,
      onCheckedChange,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const isControlled = checked !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className={cn('inline-flex items-start gap-3', className)}>
        {label && labelPosition === 'left' && (
          <label
            htmlFor={inputId}
            className={cn(
              'cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="text-sm font-medium text-gray-300">{label}</span>
            {description && (
              <span className="block text-xs text-gray-500 mt-0.5">
                {description}
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className="sr-only peer"
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={handleChange}
            aria-label={label || 'Toggle switch'}
            aria-describedby={description ? `${inputId}-description` : undefined}
            {...props}
          />
          <label
            htmlFor={inputId}
            data-state={
              isControlled
                ? checked
                  ? 'checked'
                  : 'unchecked'
                : undefined
            }
            className={cn(
              switchVariants({ size, agent }),
              disabled && 'opacity-50 cursor-not-allowed',
              'peer-focus:outline-none'
            )}
          >
            <span
              className={cn(
                thumbVariants({
                  size,
                  checked: isControlled ? checked : defaultChecked,
                }),
                'peer-checked:translate-x-full'
              )}
            />
          </label>
        </div>

        {label && labelPosition === 'right' && (
          <label
            htmlFor={inputId}
            className={cn(
              'cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="text-sm font-medium text-gray-300">{label}</span>
            {description && (
              <span
                id={`${inputId}-description`}
                className="block text-xs text-gray-500 mt-0.5"
              >
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';