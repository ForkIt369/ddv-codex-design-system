import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Popover Hook
interface PopoverState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<any>;
  contentRef: React.RefObject<any>;
  placement: PopoverPlacement;
}

export const usePopover = (defaultOpen = false): PopoverState => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [placement] = useState<PopoverPlacement>('bottom');

  return {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    placement,
  };
};

// Placement types
export type PopoverPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end';

// Popover Container
export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  offset?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  offset = 8,
  closeOnClickOutside = true,
  closeOnEscape = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  }, [onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnClickOutside, closeOnEscape, setOpen]);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    child => React.isValidElement(child) && child.type === PopoverTrigger
  );
  const content = childrenArray.find(
    child => React.isValidElement(child) && child.type === PopoverContent
  );

  return (
    <>
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          ref: triggerRef,
          onClick: () => setOpen(!isOpen),
          'aria-expanded': isOpen,
          'aria-haspopup': true,
        })}
      
      {React.isValidElement(content) &&
        React.cloneElement(content as React.ReactElement<any>, {
          ref: contentRef,
          isOpen,
          triggerRef,
          placement,
          offset,
        })}
    </>
  );
};

// Popover Trigger
export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, { ref, ...props });
    }

    return (
      <button ref={ref as any} type="button" {...props}>
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

// Popover Content
const popoverContentVariants = cva(
  [
    'absolute z-50',
    'min-w-[200px]',
    'p-4',
    'bg-black/90',
    'backdrop-blur-md',
    'border border-white/20',
    'rounded-xl',
    'shadow-xl',
    'animate-in fade-in-0 zoom-in-95',
  ],
  {
    variants: {
      placement: {
        'top': 'bottom-full mb-2',
        'top-start': 'bottom-full mb-2 right-0',
        'top-end': 'bottom-full mb-2 left-0',
        'bottom': 'top-full mt-2',
        'bottom-start': 'top-full mt-2 left-0',
        'bottom-end': 'top-full mt-2 right-0',
        'left': 'right-full mr-2',
        'left-start': 'right-full mr-2 top-0',
        'left-end': 'right-full mr-2 bottom-0',
        'right': 'left-full ml-2',
        'right-start': 'left-full ml-2 top-0',
        'right-end': 'left-full ml-2 bottom-0',
      },
    },
  }
);

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverContentVariants> {
  isOpen?: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
  offset?: number;
  arrow?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      isOpen = false,
      triggerRef,
      placement = 'bottom',
      offset = 8,
      arrow = true,
      agent = 'bigSis',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const agentColors = {
      bigSis: 'after:border-b-cyan-500/20',
      bro: 'after:border-b-orange-500/20',
      lilSis: 'after:border-b-purple-500/20',
      cbo: 'after:border-b-green-500/20',
    };

    useEffect(() => {
      if (!isOpen || !triggerRef?.current) return;

      const updatePosition = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const newPosition = { top: 0, left: 0 };

        // Calculate position based on placement
        switch (placement) {
          case 'top':
            newPosition.top = rect.top - offset;
            newPosition.left = rect.left + rect.width / 2;
            break;
          case 'top-start':
            newPosition.top = rect.top - offset;
            newPosition.left = rect.left;
            break;
          case 'top-end':
            newPosition.top = rect.top - offset;
            newPosition.left = rect.right;
            break;
          case 'bottom':
            newPosition.top = rect.bottom + offset;
            newPosition.left = rect.left + rect.width / 2;
            break;
          case 'bottom-start':
            newPosition.top = rect.bottom + offset;
            newPosition.left = rect.left;
            break;
          case 'bottom-end':
            newPosition.top = rect.bottom + offset;
            newPosition.left = rect.right;
            break;
          case 'left':
            newPosition.top = rect.top + rect.height / 2;
            newPosition.left = rect.left - offset;
            break;
          case 'left-start':
            newPosition.top = rect.top;
            newPosition.left = rect.left - offset;
            break;
          case 'left-end':
            newPosition.top = rect.bottom;
            newPosition.left = rect.left - offset;
            break;
          case 'right':
            newPosition.top = rect.top + rect.height / 2;
            newPosition.left = rect.right + offset;
            break;
          case 'right-start':
            newPosition.top = rect.top;
            newPosition.left = rect.right + offset;
            break;
          case 'right-end':
            newPosition.top = rect.bottom;
            newPosition.left = rect.right + offset;
            break;
        }

        setPosition(newPosition);
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen, triggerRef, placement, offset]);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          popoverContentVariants({ placement }),
          arrow && [
            'after:content-[""]',
            'after:absolute',
            'after:w-0 after:h-0',
            'after:border-8 after:border-transparent',
            placement && placement.startsWith('top') && 'after:top-full after:border-t-black/90',
            placement && placement.startsWith('bottom') && 'after:bottom-full after:border-b-black/90',
            placement && placement.startsWith('left') && 'after:left-full after:border-l-black/90',
            placement && placement.startsWith('right') && 'after:right-full after:border-r-black/90',
            agentColors[agent],
          ],
          className
        )}
        style={{
          ...style,
          position: 'fixed',
          top: position.top,
          left: position.left,
          transform: placement && placement.includes('start') 
            ? 'translateY(-50%)' 
            : placement && placement.includes('end')
            ? 'translate(-100%, -50%)'
            : 'translate(-50%, -50%)',
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

// Combobox Component
const comboboxVariants = cva(
  [
    'relative',
    'w-full',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select option',
      emptyMessage = 'No options found',
      searchPlaceholder = 'Search...',
      size = 'md',
      agent = 'bigSis',
      className,
      ...props
    }
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const agentColors = {
      bigSis: 'focus:border-cyan-500 focus:ring-cyan-500/50',
      bro: 'focus:border-orange-500 focus:ring-orange-500/50',
      lilSis: 'focus:border-purple-500 focus:ring-purple-500/50',
      cbo: 'focus:border-green-500 focus:ring-green-500/50',
    };

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );

    const groupedOptions = filteredOptions.reduce((acc, option) => {
      const group = option.group || 'default';
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, ComboboxOption[]>);

    const selectedOption = options.find(opt => opt.value === value);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
            onValueChange?.(filteredOptions[highlightedIndex].value);
            setIsOpen(false);
            setSearch('');
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearch('');
          break;
      }
    };

    const handleSelect = (option: ComboboxOption) => {
      if (!option.disabled) {
        onValueChange?.(option.value);
        setIsOpen(false);
        setSearch('');
      }
    };

    useEffect(() => {
      if (isOpen && listRef.current) {
        const highlighted = listRef.current.children[highlightedIndex] as HTMLElement;
        if (highlighted) {
          highlighted.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, isOpen]);

    return (
      <div className={cn(comboboxVariants({ size }), className)}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? search : selectedOption?.label || ''}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'w-full',
              'px-3 py-2 pr-10',
              'bg-white/5',
              'border border-white/20',
              'rounded-lg',
              'placeholder:text-gray-500',
              'transition-all duration-[280ms]',
              'focus:outline-none focus:ring-2',
              agentColors[agent],
              size === 'sm' && 'text-sm px-2.5 py-1.5',
              size === 'lg' && 'text-lg px-4 py-3'
            )}
            {...props}
          />
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          >
            <svg
              className={cn(
                'w-4 h-4 transition-transform duration-[280ms]',
                isOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            <div className="p-4 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl shadow-xl max-h-[300px] overflow-auto">
              {filteredOptions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  {emptyMessage}
                </p>
              ) : (
                <ul ref={listRef} className="space-y-1">
                  {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                    <React.Fragment key={group}>
                      {group !== 'default' && (
                        <li className="text-xs text-gray-500 font-medium px-2 py-1 mt-2 first:mt-0">
                          {group}
                        </li>
                      )}
                      {groupOptions.map((option) => {
                        const globalIndex = filteredOptions.indexOf(option);
                        return (
                          <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={cn(
                              'px-3 py-2 rounded-lg cursor-pointer transition-all duration-[280ms]',
                              'hover:bg-white/10',
                              option.disabled && 'opacity-50 cursor-not-allowed',
                              globalIndex === highlightedIndex && 'bg-white/10',
                              option.value === value && 'font-medium'
                            )}
                          >
                            {option.label}
                          </li>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';