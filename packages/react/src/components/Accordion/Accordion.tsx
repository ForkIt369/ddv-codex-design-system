import React, { createContext, useContext, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Accordion Context
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'bordered' | 'separated';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
};

// Accordion Container
const accordionVariants = cva(
  [],
  {
    variants: {
      variant: {
        default: 'divide-y divide-white/10',
        bordered: 'border border-white/20 rounded-lg divide-y divide-white/10',
        separated: 'space-y-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AccordionProps extends VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  agent = 'bigSis',
  variant = 'default',
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const isControlled = value !== undefined;
  const openItems = isControlled
    ? Array.isArray(value)
      ? value
      : [value]
    : internalValue;

  const toggleItem = (itemValue: string) => {
    let newValue: string[];

    if (type === 'single') {
      newValue = openItems.includes(itemValue) ? [] : [itemValue];
    } else {
      newValue = openItems.includes(itemValue)
        ? openItems.filter(item => item !== itemValue)
        : [...openItems, itemValue];
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(type === 'single' ? newValue[0] || '' : newValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, type, agent, variant: variant || undefined }}
    >
      <div className={cn(accordionVariants({ variant }), className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion Item
const accordionItemVariants = cva(
  [],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'first:rounded-t-lg last:rounded-b-lg',
        separated: 'bg-white/5 border border-white/20 rounded-lg',
      },
    },
  }
);

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className,
}) => {
  const { variant } = useAccordionContext();

  return (
    <div
      className={cn(accordionItemVariants({ variant }), className)}
      data-state={useAccordionContext().openItems.includes(value) ? 'open' : 'closed'}
    >
      {children}
    </div>
  );
};

// Accordion Trigger
const accordionTriggerVariants = cva(
  [
    'flex w-full items-center justify-between',
    'py-4 px-5',
    'text-left font-medium',
    'transition-all duration-[280ms] ease-in-out',
    'hover:bg-white/5',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
    'cursor-pointer',
  ],
  {
    variants: {
      agent: {
        bigSis: 'focus:ring-cyan-500/50',
        bro: 'focus:ring-orange-500/50',
        lilSis: 'focus:ring-purple-500/50',
        cbo: 'focus:ring-green-500/50',
      },
    },
  }
);

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  value,
  className,
  ...props
}) => {
  const { openItems, toggleItem, agent } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(accordionTriggerVariants({ agent }), className)}
      onClick={() => toggleItem(value)}
      {...props}
    >
      {children}
      <svg
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-[280ms]',
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
    </button>
  );
};

// Accordion Content
const accordionContentVariants = cva(
  [
    'overflow-hidden',
    'transition-all duration-[280ms] ease-in-out',
    'data-[state=closed]:animate-accordion-up',
    'data-[state=open]:animate-accordion-down',
  ]
);

export interface AccordionContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  value,
  className,
}) => {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(accordionContentVariants(), className)}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <div className="px-5 pb-4">{children}</div>
    </div>
  );
};