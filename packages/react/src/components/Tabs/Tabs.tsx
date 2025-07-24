import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Context for managing tabs state
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'pills' | 'underline' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
};

// Tabs container component
const tabsVariants = cva(
  [],
  {
    variants: {
      orientation: {
        horizontal: 'flex flex-col',
        vertical: 'flex flex-row gap-6',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface TabsProps extends VariantProps<typeof tabsVariants> {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'pills' | 'underline' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value,
  onValueChange,
  agent = 'bigSis',
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        agent,
        variant,
        size,
        orientation: orientation || undefined,
      }}
    >
      <div className={cn(tabsVariants({ orientation }), className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
const tabsListVariants = cva(
  [
    'inline-flex',
    'p-1',
    'rounded-lg',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/5 backdrop-blur-sm',
        pills: 'gap-2',
        underline: 'border-b border-white/20 rounded-none p-0',
        bordered: 'border border-white/20 bg-white/5',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col w-48', // 192px
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  }
);

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  const { variant, orientation } = useTabsContext();
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const listRef = useRef<HTMLDivElement>(null);
  const { activeTab, agent } = useTabsContext();

  // Update indicator position
  useEffect(() => {
    if (!listRef.current || variant !== 'underline') return;

    const activeElement = listRef.current.querySelector(`[data-value="${activeTab}"]`);
    if (activeElement) {
      const listRect = listRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      if (orientation === 'horizontal') {
        setIndicatorStyle({
          left: activeRect.left - listRect.left,
          width: activeRect.width,
          height: 2,
          bottom: 0,
        });
      } else {
        setIndicatorStyle({
          top: activeRect.top - listRect.top,
          height: activeRect.height,
          width: 2,
          right: 0,
        });
      }
    }
  }, [activeTab, variant, orientation]);

  const agentColors = {
    bigSis: 'bg-cyan-500',
    bro: 'bg-orange-500',
    lilSis: 'bg-purple-500',
    cbo: 'bg-green-500',
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        tabsListVariants({ variant, orientation }),
        'relative',
        className
      )}
    >
      {children}
      {variant === 'underline' && (
        <div
          className={cn(
            'absolute',
            'transition-all duration-[280ms] ease-in-out',
            agent && agentColors[agent]
          )}
          style={indicatorStyle}
        />
      )}
    </div>
  );
};

// TabsTrigger component
const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-all duration-[280ms] ease-in-out',
    'outline-none',
    'disabled:opacity-50 disabled:pointer-events-none',
    'cursor-pointer',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-md',
          'text-gray-400',
          'hover:text-gray-300',
          'data-[state=active]:bg-white/10',
          'data-[state=active]:text-white',
          'data-[state=active]:shadow-sm',
        ],
        pills: [
          'rounded-full',
          'text-gray-400',
          'hover:text-gray-300',
          'hover:bg-white/5',
          'data-[state=active]:text-white',
        ],
        underline: [
          'pb-3',
          'text-gray-400',
          'hover:text-gray-300',
          'data-[state=active]:text-white',
          'border-b-2 border-transparent',
        ],
        bordered: [
          'text-gray-400',
          'hover:text-gray-300',
          'data-[state=active]:bg-white/10',
          'data-[state=active]:text-white',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-sm', // 28px height
        md: 'px-4 py-2 text-base', // 40px height
        lg: 'px-5 py-2.5 text-base', // 44px height
      },
      agent: {
        bigSis: [
          'focus-visible:ring-2 focus-visible:ring-cyan-500/50',
          'data-[state=active]:data-[variant=pills]:bg-cyan-500/20',
          'data-[state=active]:data-[variant=pills]:text-cyan-300',
        ],
        bro: [
          'focus-visible:ring-2 focus-visible:ring-orange-500/50',
          'data-[state=active]:data-[variant=pills]:bg-orange-500/20',
          'data-[state=active]:data-[variant=pills]:text-orange-300',
        ],
        lilSis: [
          'focus-visible:ring-2 focus-visible:ring-purple-500/50',
          'data-[state=active]:data-[variant=pills]:bg-purple-500/20',
          'data-[state=active]:data-[variant=pills]:text-purple-300',
        ],
        cbo: [
          'focus-visible:ring-2 focus-visible:ring-green-500/50',
          'data-[state=active]:data-[variant=pills]:bg-green-500/20',
          'data-[state=active]:data-[variant=pills]:text-green-300',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  icon,
  className,
  disabled,
  ...props
}) => {
  const { activeTab, setActiveTab, agent, variant, size } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      data-variant={variant}
      disabled={disabled}
      className={cn(
        tabsTriggerVariants({ variant, size, agent }),
        className
      )}
      onClick={() => setActiveTab(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveTab(value);
        }
      }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// TabsContent component
const tabsContentVariants = cva(
  [
    'mt-4',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-black/95',
    'rounded-lg',
  ],
  {
    variants: {
      agent: {
        bigSis: 'focus-visible:ring-cyan-500/50',
        bro: 'focus-visible:ring-orange-500/50',
        lilSis: 'focus-visible:ring-purple-500/50',
        cbo: 'focus-visible:ring-green-500/50',
      },
      orientation: {
        horizontal: '',
        vertical: 'mt-0 flex-1',
      },
    },
  }
);

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  forceMount?: boolean;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
  forceMount = false,
}) => {
  const { activeTab, agent, orientation } = useTabsContext();
  const isActive = activeTab === value;

  if (!forceMount && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      hidden={!isActive}
      className={cn(
        tabsContentVariants({ agent, orientation }),
        'animate-in fade-in slide-in-from-bottom-2',
        'duration-[280ms]',
        className
      )}
    >
      {children}
    </div>
  );
};