import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    // Base styles
    'w-full',
    'bg-white/5 backdrop-blur-sm',
    'border border-white/20',
    'rounded-lg',
    'text-white placeholder:text-gray-500',
    'transition-all duration-[280ms] ease-in-out',
    'outline-none',
    // Focus styles
    'focus:border-white/40',
    'focus:bg-white/10',
    'focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:bg-white/[0.02]',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm', // 32px height
        md: 'h-10 px-4 text-base', // 40px height - minimum touch target
        lg: 'h-12 px-5 text-base', // 48px height
        xl: 'h-14 px-6 text-lg', // 56px height
      },
      agent: {
        bigSis: [
          'focus:ring-cyan-500/50',
          'focus:border-cyan-500/50',
          '[&[aria-invalid=true]]:border-red-500/50',
        ],
        bro: [
          'focus:ring-orange-500/50',
          'focus:border-orange-500/50',
          '[&[aria-invalid=true]]:border-red-500/50',
        ],
        lilSis: [
          'focus:ring-purple-500/50',
          'focus:border-purple-500/50',
          '[&[aria-invalid=true]]:border-red-500/50',
        ],
        cbo: [
          'focus:ring-green-500/50',
          'focus:border-green-500/50',
          '[&[aria-invalid=true]]:border-red-500/50',
        ],
      },
      variant: {
        default: '',
        filled: 'bg-white/10 border-transparent focus:bg-white/15',
        ghost: 'bg-transparent border-transparent focus:bg-white/5 focus:border-white/20',
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
      variant: 'default',
    },
  }
);

const iconWrapperVariants = cva(
  [
    'absolute top-1/2 -translate-y-1/2',
    'flex items-center justify-center',
    'text-gray-400',
    'pointer-events-none',
  ],
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
      size: {
        sm: 'w-8 h-8', // 32px
        md: 'w-10 h-10', // 40px
        lg: 'w-12 h-12', // 48px
        xl: 'w-14 h-14', // 56px
      },
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      helperClassName,
      errorClassName,
      size = 'md',
      agent = 'bigSis',
      variant = 'default',
      label,
      helper,
      error,
      leftIcon,
      rightIcon,
      onClear,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const hasError = !!error;
    const hasClearButton = onClear && props.value && !disabled && !rightIcon;

    // Calculate padding based on icons
    const paddingClasses = cn({
      'pl-10': leftIcon && size === 'md',
      'pl-12': leftIcon && size === 'lg',
      'pr-10': (rightIcon || hasClearButton || isPassword) && size === 'md',
      'pr-12': (rightIcon || hasClearButton || isPassword) && size === 'lg',
    });

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-gray-300',
              labelClassName
            )}
            htmlFor={props.id}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                iconWrapperVariants({ position: 'left', size })
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${props.id}-error`
                : helper
                ? `${props.id}-helper`
                : undefined
            }
            className={cn(
              inputVariants({ size, agent, variant }),
              paddingClasses,
              className
            )}
            {...props}
          />

          {/* Right side controls */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
            {hasClearButton && (
              <button
                type="button"
                onClick={onClear}
                className={cn(
                  'mr-1 p-2',
                  'text-gray-400 hover:text-gray-300',
                  'transition-colors duration-[140ms]',
                  'focus:outline-none focus:ring-2 focus:ring-white/20',
                  'rounded'
                )}
                aria-label="Clear input"
              >
                <svg
                  className="w-4 h-4"
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

            {isPassword && !rightIcon && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  'mr-3 p-2',
                  'text-gray-400 hover:text-gray-300',
                  'transition-colors duration-[140ms]',
                  'focus:outline-none focus:ring-2 focus:ring-white/20',
                  'rounded'
                )}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            )}

            {rightIcon && (
              <div
                className={cn(
                  iconWrapperVariants({ position: 'right', size })
                )}
              >
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {(helper || error) && (
          <p
            id={hasError ? `${props.id}-error` : `${props.id}-helper`}
            className={cn(
              'text-sm',
              hasError
                ? cn('text-red-500', errorClassName)
                : cn('text-gray-500', helperClassName)
            )}
            role={hasError ? 'alert' : undefined}
          >
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';