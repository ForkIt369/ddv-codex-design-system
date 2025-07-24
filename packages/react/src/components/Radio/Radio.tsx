import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Radio Group Context
interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

const useRadioGroupContext = () => useContext(RadioGroupContext);

// Radio Group Component
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      disabled = false,
      agent = 'bigSis',
      size = 'md',
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const isControlled = value !== undefined;
    const actualValue = isControlled ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: name || `radio-${Math.random().toString(36).substr(2, 9)}`,
          value: actualValue,
          onChange: handleChange,
          disabled,
          agent,
          size,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-disabled={disabled}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// Radio Button Variants
const radioVariants = cva(
  [
    'relative flex items-center justify-center',
    'border-2 border-white/30',
    'rounded-full',
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
          'data-[state=checked]:border-cyan-500',
        ],
        bro: [
          'focus-visible:ring-orange-500/50',
          'data-[state=checked]:border-orange-500',
        ],
        lilSis: [
          'focus-visible:ring-purple-500/50',
          'data-[state=checked]:border-purple-500',
        ],
        cbo: [
          'focus-visible:ring-green-500/50',
          'data-[state=checked]:border-green-500',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
    },
  }
);

const radioDotVariants = cva(
  [
    'rounded-full',
    'bg-current',
    'transform scale-0',
    'transition-transform duration-[140ms] ease-in-out',
    'data-[state=checked]:scale-100',
  ],
  {
    variants: {
      size: {
        sm: 'w-1.5 h-1.5', // 6px
        md: 'w-2 h-2', // 8px
        lg: 'w-2.5 h-2.5', // 10px
        xl: 'w-3 h-3', // 12px
      },
      agent: {
        bigSis: 'text-cyan-500',
        bro: 'text-orange-500',
        lilSis: 'text-purple-500',
        cbo: 'text-green-500',
      },
    },
  }
);

// Radio Component
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  value: string;
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      value,
      label,
      description,
      disabled,
      id,
      size: propSize,
      agent: propAgent,
      ...props
    },
    ref
  ) => {
    const context = useRadioGroupContext();
    const isGrouped = Object.keys(context).length > 0;

    const size = propSize || context.size || 'md';
    const agent = propAgent || context.agent || 'bigSis';
    const isDisabled = disabled || context.disabled;
    const isChecked = isGrouped ? context.value === value : props.checked;
    const inputId = id || `radio-${value}-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isGrouped && context.onChange) {
        context.onChange(value);
      }
      props.onChange?.(e);
    };

    return (
      <div className={cn('inline-flex items-start gap-3', className)}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={context.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            className="sr-only peer"
            aria-label={label || `Radio option ${value}`}
            aria-describedby={description ? `${inputId}-description` : undefined}
            {...props}
          />
          <label
            htmlFor={inputId}
            data-state={isChecked ? 'checked' : 'unchecked'}
            className={cn(
              radioVariants({ size, agent }),
              isDisabled && 'opacity-50 cursor-not-allowed',
              'peer-focus:outline-none'
            )}
          >
            <span
              data-state={isChecked ? 'checked' : 'unchecked'}
              className={radioDotVariants({ size, agent })}
            />
          </label>
        </div>

        {(label || description) && (
          <label
            htmlFor={inputId}
            className={cn(
              'cursor-pointer select-none',
              isDisabled && 'opacity-50 cursor-not-allowed'
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

Radio.displayName = 'Radio';