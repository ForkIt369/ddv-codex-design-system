import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const selectVariants = cva(
  [
    // Base styles
    'w-full',
    'bg-white/5 backdrop-blur-sm',
    'border border-white/20',
    'rounded-lg',
    'text-white',
    'transition-all duration-[280ms] ease-in-out',
    'outline-none',
    'cursor-pointer',
    // Focus styles
    'focus:border-white/40',
    'focus:bg-white/10',
    'focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:bg-white/[0.02]',
    // Flex layout
    'flex items-center justify-between',
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

const dropdownVariants = cva(
  [
    'absolute z-50',
    'w-full',
    'mt-2',
    'bg-gray-900/95 backdrop-blur-xl',
    'border border-white/20',
    'rounded-lg',
    'shadow-2xl shadow-black/50',
    'overflow-hidden',
    'animate-in fade-in slide-in-from-top-1',
    'duration-[140ms]',
  ],
  {
    variants: {
      agent: {
        bigSis: 'border-cyan-500/30',
        bro: 'border-orange-500/30',
        lilSis: 'border-purple-500/30',
        cbo: 'border-green-500/30',
      },
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  name?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      label,
      helper,
      error,
      disabled,
      searchable = false,
      multiple = false,
      className,
      containerClassName,
      labelClassName,
      helperClassName,
      errorClassName,
      dropdownClassName,
      optionClassName,
      size = 'md',
      agent = 'bigSis',
      variant = 'default',
      name,
      required,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hasError = !!error;

    // Get selected option
    const selectedOption = options.find(opt => opt.value === value);

    // Filter options based on search
    const filteredOptions = searchable
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opt.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const option = filteredOptions[highlightedIndex];
            if (!option.disabled) {
              onChange?.(option.value);
              setIsOpen(false);
              setSearchTerm('');
            }
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearchTerm('');
          break;
      }
    };

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-gray-300',
              labelClassName
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div ref={selectRef} className="relative" {...props}>
          <div
            ref={ref}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="select-dropdown"
            aria-label={label || 'Select option'}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${name}-error`
                : helper
                ? `${name}-helper`
                : undefined
            }
            tabIndex={disabled ? -1 : 0}
            className={cn(
              selectVariants({ size, agent, variant }),
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
          >
            <span className={cn(
              'flex-1 text-left truncate',
              !selectedOption && 'text-gray-500'
            )}>
              {selectedOption ? (
                <span className="flex items-center gap-2">
                  {selectedOption.icon}
                  {selectedOption.label}
                </span>
              ) : (
                placeholder
              )}
            </span>
            
            {/* Chevron icon */}
            <svg
              className={cn(
                'w-4 h-4 ml-2',
                'transition-transform duration-[140ms]',
                isOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div
              id="select-dropdown"
              role="listbox"
              className={cn(
                dropdownVariants({ agent }),
                dropdownClassName
              )}
            >
              {searchable && (
                <div className="p-2 border-b border-white/10">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className={cn(
                      'w-full px-3 py-2',
                      'bg-white/5 border border-white/20',
                      'rounded-md',
                      'text-white placeholder:text-gray-500',
                      'outline-none focus:border-white/40',
                      'text-sm'
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <div className="max-h-64 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={option.value === value}
                      aria-disabled={option.disabled}
                      className={cn(
                        'px-4 py-2',
                        'cursor-pointer',
                        'transition-colors duration-[140ms]',
                        'hover:bg-white/10',
                        option.disabled && 'opacity-50 cursor-not-allowed',
                        option.value === value && 'bg-white/15',
                        highlightedIndex === index && 'bg-white/10',
                        optionClassName
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!option.disabled) {
                          onChange?.(option.value);
                          setIsOpen(false);
                          setSearchTerm('');
                        }
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {option.value === value && (
                          <svg
                            className="w-4 h-4 text-current ml-auto flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {(helper || error) && (
          <p
            id={hasError ? `${name}-error` : `${name}-helper`}
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

Select.displayName = 'Select';