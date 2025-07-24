import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva(
  [
    'relative flex items-center justify-center',
    'border-2 border-white/30',
    'rounded',
    'transition-all duration-[280ms] ease-in-out',
    'cursor-pointer',
    'hover:border-white/50',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/95',
  ],
  {
    variants: {
      size: {
        sm: 'w-4 h-4', // 16px
        md: 'w-5 h-5', // 20px
        lg: 'w-6 h-6', // 24px
        xl: 'w-7 h-7', // 28px
      },
      agent: {
        bigSis: [
          'focus-visible:ring-cyan-500/50',
          'data-[state=checked]:bg-cyan-500',
          'data-[state=checked]:border-cyan-500',
          'data-[state=indeterminate]:bg-cyan-500',
          'data-[state=indeterminate]:border-cyan-500',
        ],
        bro: [
          'focus-visible:ring-orange-500/50',
          'data-[state=checked]:bg-orange-500',
          'data-[state=checked]:border-orange-500',
          'data-[state=indeterminate]:bg-orange-500',
          'data-[state=indeterminate]:border-orange-500',
        ],
        lilSis: [
          'focus-visible:ring-purple-500/50',
          'data-[state=checked]:bg-purple-500',
          'data-[state=checked]:border-purple-500',
          'data-[state=indeterminate]:bg-purple-500',
          'data-[state=indeterminate]:border-purple-500',
        ],
        cbo: [
          'focus-visible:ring-green-500/50',
          'data-[state=checked]:bg-green-500',
          'data-[state=checked]:border-green-500',
          'data-[state=indeterminate]:bg-green-500',
          'data-[state=indeterminate]:border-green-500',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = 'md',
      agent = 'bigSis',
      label,
      description,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled,
      onCheckedChange,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const isControlled = checked !== undefined;

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (onCheckedChange) {
        if (indeterminate) {
          onCheckedChange('indeterminate');
        } else {
          onCheckedChange(e.target.checked);
        }
      }
    };

    const state = indeterminate
      ? 'indeterminate'
      : isControlled
      ? checked
        ? 'checked'
        : 'unchecked'
      : undefined;

    return (
      <div className={cn('inline-flex items-start gap-3', className)}>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="checkbox"
            id={inputId}
            className="sr-only peer"
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={handleChange}
            aria-label={label || 'Checkbox'}
            aria-describedby={description ? `${inputId}-description` : undefined}
            {...props}
          />
          <label
            htmlFor={inputId}
            data-state={state}
            className={cn(
              checkboxVariants({ size, agent }),
              disabled && 'opacity-50 cursor-not-allowed',
              'peer-focus:outline-none'
            )}
          >
            <svg
              className={cn(
                'w-full h-full p-0.5',
                'text-white',
                'opacity-0 scale-0',
                'transition-all duration-[140ms]',
                'data-[state=checked]:opacity-100 data-[state=checked]:scale-100',
                'data-[state=indeterminate]:opacity-100 data-[state=indeterminate]:scale-100'
              )}
              data-state={state}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              {indeterminate ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
          </label>
        </div>

        {(label || description) && (
          <label
            htmlFor={inputId}
            className={cn(
              'cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label && (
              <span className="text-sm font-medium text-gray-300">{label}</span>
            )}
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

Checkbox.displayName = 'Checkbox';