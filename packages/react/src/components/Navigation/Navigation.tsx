import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Navigation Context
interface NavigationContextValue {
  orientation?: 'horizontal' | 'vertical';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextValue>({});

const useNavigationContext = () => useContext(NavigationContext);

// Navigation Container
const navigationVariants = cva(
  [
    'flex',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col',
      },
      variant: {
        default: '',
        pills: '',
        underline: 'border-b border-white/10',
        sidebar: 'w-64 h-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  activeItem?: string;
  defaultActiveItem?: string;
  onItemChange?: (id: string) => void;
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'default',
      agent = 'bigSis',
      activeItem: controlledActiveItem,
      defaultActiveItem,
      onItemChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalActiveItem, setInternalActiveItem] = React.useState(defaultActiveItem);
    const isControlled = controlledActiveItem !== undefined;
    const activeItem = isControlled ? controlledActiveItem : internalActiveItem;

    const handleItemClick = (id: string) => {
      if (!isControlled) {
        setInternalActiveItem(id);
      }
      onItemChange?.(id);
    };

    return (
      <NavigationContext.Provider
        value={{ orientation: orientation || undefined, agent, activeItem, onItemClick: handleItemClick }}
      >
        <nav
          ref={ref}
          className={cn(navigationVariants({ orientation, variant }), className)}
          {...props}
        >
          {variant === 'sidebar' ? (
            <div className="flex flex-col h-full">
              {children}
            </div>
          ) : (
            children
          )}
        </nav>
      </NavigationContext.Provider>
    );
  }
);

Navigation.displayName = 'Navigation';

// Navigation Item
const navigationItemVariants = cva(
  [
    'relative',
    'inline-flex items-center',
    'px-4 py-2',
    'text-sm font-medium',
    'transition-all duration-[280ms] ease-in-out',
    'cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-gray-400 hover:text-white',
          'hover:bg-white/5',
          'rounded-lg',
        ],
        pills: [
          'text-gray-400 hover:text-white',
          'rounded-full',
          'mx-1',
        ],
        underline: [
          'text-gray-400 hover:text-white',
          'pb-3',
          'border-b-2 border-transparent',
        ],
        sidebar: [
          'w-full',
          'text-gray-400 hover:text-white',
          'hover:bg-white/5',
          'rounded-lg',
          'mb-1',
        ],
      },
      agent: {
        bigSis: 'focus:ring-cyan-500/50',
        bro: 'focus:ring-orange-500/50',
        lilSis: 'focus:ring-purple-500/50',
        cbo: 'focus:ring-green-500/50',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Active states
      {
        variant: 'default',
        active: true,
        agent: 'bigSis',
        className: 'bg-cyan-500/10 text-cyan-400',
      },
      {
        variant: 'default',
        active: true,
        agent: 'bro',
        className: 'bg-orange-500/10 text-orange-400',
      },
      {
        variant: 'default',
        active: true,
        agent: 'lilSis',
        className: 'bg-purple-500/10 text-purple-400',
      },
      {
        variant: 'default',
        active: true,
        agent: 'cbo',
        className: 'bg-green-500/10 text-green-400',
      },
      // Pills active
      {
        variant: 'pills',
        active: true,
        agent: 'bigSis',
        className: 'bg-cyan-500 text-white',
      },
      {
        variant: 'pills',
        active: true,
        agent: 'bro',
        className: 'bg-orange-500 text-white',
      },
      {
        variant: 'pills',
        active: true,
        agent: 'lilSis',
        className: 'bg-purple-500 text-white',
      },
      {
        variant: 'pills',
        active: true,
        agent: 'cbo',
        className: 'bg-green-500 text-white',
      },
      // Underline active
      {
        variant: 'underline',
        active: true,
        agent: 'bigSis',
        className: 'text-cyan-400 border-cyan-500',
      },
      {
        variant: 'underline',
        active: true,
        agent: 'bro',
        className: 'text-orange-400 border-orange-500',
      },
      {
        variant: 'underline',
        active: true,
        agent: 'lilSis',
        className: 'text-purple-400 border-purple-500',
      },
      {
        variant: 'underline',
        active: true,
        agent: 'cbo',
        className: 'text-green-400 border-green-500',
      },
      // Sidebar active
      {
        variant: 'sidebar',
        active: true,
        agent: 'bigSis',
        className: 'bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-500',
      },
      {
        variant: 'sidebar',
        active: true,
        agent: 'bro',
        className: 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-500',
      },
      {
        variant: 'sidebar',
        active: true,
        agent: 'lilSis',
        className: 'bg-purple-500/10 text-purple-400 border-l-4 border-purple-500',
      },
      {
        variant: 'sidebar',
        active: true,
        agent: 'cbo',
        className: 'bg-green-500/10 text-green-400 border-l-4 border-green-500',
      },
    ],
  }
);

export interface NavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  id: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: 'default' | 'pills' | 'underline' | 'sidebar';
  disabled?: boolean;
  asChild?: boolean;
}

export const NavigationItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavigationItemProps
>(
  (
    {
      className,
      id,
      href,
      icon,
      badge,
      variant: propVariant,
      disabled = false,
      asChild = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const { agent, activeItem, onItemClick } = useNavigationContext();
    const isActive = activeItem === id;
    const variant = propVariant || 'default';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
        onItemClick?.(id);
      }
    };

    const content = (
      <>
        {icon && (
          <span className={cn(
            'flex-shrink-0',
            variant === 'sidebar' ? 'mr-3' : 'mr-2'
          )}>
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {badge && (
          <span className={cn(
            'flex-shrink-0',
            variant === 'sidebar' ? 'ml-auto' : 'ml-2'
          )}>
            {badge}
          </span>
        )}
      </>
    );

    const classes = cn(
      navigationItemVariants({ variant, agent, active: isActive }),
      disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        className: classes,
        onClick: handleClick,
        'aria-current': isActive ? 'page' : undefined,
        'aria-disabled': disabled,
        ...props,
      });
    }

    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {content}
      </button>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

// Navigation Section (for sidebar variant)
export interface NavigationSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  title,
  collapsible = false,
  defaultExpanded = true,
  className,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={cn('mb-4', className)} {...props}>
      {title && (
        <div
          className={cn(
            'flex items-center justify-between',
            'px-4 py-2 mb-2',
            'text-xs font-semibold text-gray-500 uppercase tracking-wider',
            collapsible && 'cursor-pointer hover:text-gray-300'
          )}
          onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
        >
          <span>{title}</span>
          {collapsible && (
            <svg
              className={cn(
                'w-4 h-4 transition-transform duration-[280ms]',
                isExpanded && 'rotate-90'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      )}
      {(!collapsible || isExpanded) && children}
    </div>
  );
};

NavigationSection.displayName = 'NavigationSection';