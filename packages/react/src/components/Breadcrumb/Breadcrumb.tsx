import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Breadcrumb Container
const breadcrumbVariants = cva(
  [
    'flex items-center',
    'text-sm',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      separator: {
        slash: '',
        chevron: '',
        arrow: '',
        dot: '',
      },
    },
    defaultVariants: {
      size: 'md',
      separator: 'slash',
    },
  }
);

const separatorIcons = {
  slash: (
    <span className="mx-2 text-gray-500">/</span>
  ),
  chevron: (
    <svg className="w-4 h-4 mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4 mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  dot: (
    <span className="mx-2 text-gray-500">•</span>
  ),
};

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  children: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      size = 'md',
      separator = 'slash',
      agent = 'bigSis',
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const separatorIcon = separator ? separatorIcons[separator] : separatorIcons.slash;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ size, separator }), className)}
        {...props}
      >
        <ol className="flex items-center">
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {React.cloneElement(child as React.ReactElement, {
                agent,
                isLast: index === childrenArray.length - 1,
              })}
              {index < childrenArray.length - 1 && separatorIcon}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// Breadcrumb Item
const breadcrumbItemVariants = cva(
  [
    'inline-flex items-center',
    'transition-colors duration-[280ms]',
  ],
  {
    variants: {
      agent: {
        bigSis: 'hover:text-cyan-400 focus:text-cyan-400',
        bro: 'hover:text-orange-400 focus:text-orange-400',
        lilSis: 'hover:text-purple-400 focus:text-purple-400',
        cbo: 'hover:text-green-400 focus:text-green-400',
      },
      isLast: {
        true: 'text-gray-100 font-medium pointer-events-none',
        false: 'text-gray-400',
      },
    },
  }
);

export interface BreadcrumbItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
  href?: string;
  icon?: React.ReactNode;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  isLast?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      className,
      href,
      icon,
      agent = 'bigSis',
      isLast = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {icon && (
          <span className="mr-1.5 flex-shrink-0">{icon}</span>
        )}
        {children}
      </>
    );

    return (
      <li ref={ref} className="inline-flex items-center" {...props}>
        {href && !isLast ? (
          <a
            href={href}
            onClick={onClick}
            className={cn(
              breadcrumbItemVariants({ agent, isLast }),
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
              agent === 'bigSis' && 'focus:ring-cyan-500/50',
              agent === 'bro' && 'focus:ring-orange-500/50',
              agent === 'lilSis' && 'focus:ring-purple-500/50',
              agent === 'cbo' && 'focus:ring-green-500/50',
              className
            )}
            aria-current={isLast ? 'page' : undefined}
          >
            {content}
          </a>
        ) : (
          <span
            className={cn(breadcrumbItemVariants({ agent, isLast }), className)}
            aria-current={isLast ? 'page' : undefined}
          >
            {content}
          </span>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// Breadcrumb Ellipsis (for collapsed items)
export const BreadcrumbEllipsis: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <li className="inline-flex items-center">
      <span className={cn('text-gray-500', className)}>...</span>
    </li>
  );
};

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

// Collapsible Breadcrumb
export interface CollapsibleBreadcrumbProps extends BreadcrumbProps {
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

export const CollapsibleBreadcrumb = forwardRef<HTMLElement, CollapsibleBreadcrumbProps>(
  (
    {
      maxItems = 5,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 2,
      children,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const childrenArray = React.Children.toArray(children);
    const totalItems = childrenArray.length;

    if (totalItems <= maxItems) {
      return (
        <Breadcrumb ref={ref} {...props}>
          {children}
        </Breadcrumb>
      );
    }

    const shouldCollapse = !isExpanded && totalItems > maxItems;
    const itemsToShow = shouldCollapse
      ? [
          ...childrenArray.slice(0, itemsBeforeCollapse),
          <BreadcrumbItem key="ellipsis" onClick={() => setIsExpanded(true)}>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-[140ms]"
              aria-label="Show all breadcrumb items"
            >
              ...
            </button>
          </BreadcrumbItem>,
          ...childrenArray.slice(totalItems - itemsAfterCollapse),
        ]
      : childrenArray;

    return (
      <Breadcrumb ref={ref} {...props}>
        {itemsToShow}
      </Breadcrumb>
    );
  }
);

CollapsibleBreadcrumb.displayName = 'CollapsibleBreadcrumb';