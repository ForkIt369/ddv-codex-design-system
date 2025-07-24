import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Pagination Container
const paginationVariants = cva(
  [
    'flex items-center',
    'gap-1',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'center',
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      size = 'md',
      align = 'center',
      agent = 'bigSis',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(paginationVariants({ size, align }), className)}
        {...props}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { size, agent })
            : child
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

// Pagination Item
const paginationItemVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all duration-[280ms] ease-in-out',
    'cursor-pointer',
    'select-none',
    'hover:bg-white/10',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/95',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm gap-1', // 32px height
        md: 'h-10 px-4 text-base gap-1.5', // 40px height
        lg: 'h-12 px-5 text-lg gap-2', // 48px height
      },
      variant: {
        default: 'text-gray-400 hover:text-white',
        active: '',
        disabled: 'cursor-not-allowed opacity-50',
        dots: 'cursor-default hover:bg-transparent',
      },
      agent: {
        bigSis: [
          'focus:ring-cyan-500/50',
          'data-[active=true]:bg-cyan-500',
          'data-[active=true]:text-white',
        ],
        bro: [
          'focus:ring-orange-500/50',
          'data-[active=true]:bg-orange-500',
          'data-[active=true]:text-white',
        ],
        lilSis: [
          'focus:ring-purple-500/50',
          'data-[active=true]:bg-purple-500',
          'data-[active=true]:text-white',
        ],
        cbo: [
          'focus:ring-green-500/50',
          'data-[active=true]:bg-green-500',
          'data-[active=true]:text-white',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      agent: 'bigSis',
    },
  }
);

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
  isDots?: boolean;
}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  (
    {
      className,
      size,
      agent,
      isActive = false,
      isDots = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variant = isDots ? 'dots' : isActive ? 'active' : disabled ? 'disabled' : 'default';

    return (
      <button
        ref={ref}
        type="button"
        data-active={isActive}
        disabled={disabled || isDots}
        className={cn(paginationItemVariants({ size, variant, agent }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

// Pagination Previous
export interface PaginationPreviousProps extends Omit<PaginationItemProps, 'children'> {
  children?: React.ReactNode;
}

export const PaginationPrevious = forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ children, size = 'md', ...props }, ref) => {
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

    return (
      <PaginationItem ref={ref} size={size} aria-label="Go to previous page" {...props}>
        <svg
          className={iconSize}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {children && <span>{children}</span>}
      </PaginationItem>
    );
  }
);

PaginationPrevious.displayName = 'PaginationPrevious';

// Pagination Next
export interface PaginationNextProps extends Omit<PaginationItemProps, 'children'> {
  children?: React.ReactNode;
}

export const PaginationNext = forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ children, size = 'md', ...props }, ref) => {
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

    return (
      <PaginationItem ref={ref} size={size} aria-label="Go to next page" {...props}>
        {children && <span>{children}</span>}
        <svg
          className={iconSize}
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
      </PaginationItem>
    );
  }
);

PaginationNext.displayName = 'PaginationNext';

// Pagination Ellipsis
export const PaginationEllipsis: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <PaginationItem isDots className={className}>
      <span>...</span>
    </PaginationItem>
  );
};

PaginationEllipsis.displayName = 'PaginationEllipsis';

// Pagination Info
export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  itemsPerPage?: number;
  totalItems?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  size = 'md',
  className,
  ...props
}) => {
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  if (totalItems && itemsPerPage) {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className={cn('text-gray-400', textSize, className)} {...props}>
        Showing {start} to {end} of {totalItems} results
      </div>
    );
  }

  return (
    <div className={cn('text-gray-400', textSize, className)} {...props}>
      Page {currentPage} of {totalPages}
    </div>
  );
};

PaginationInfo.displayName = 'PaginationInfo';

// Advanced Pagination Component
export interface AdvancedPaginationProps extends Omit<PaginationProps, 'children'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  prevLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
}

export const AdvancedPagination: React.FC<AdvancedPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showPrevNext = true,
  showFirstLast = false,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  ...paginationProps
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages
  );

  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      currentPage + siblingCount,
      boundaryCount + siblingCount * 2 + 2
    ),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const itemList = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ['ellipsis-start']
      : boundaryCount + 1 < siblingsStart - 1
      ? [siblingsStart - 1]
      : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ['ellipsis-end']
      : totalPages - boundaryCount > siblingsEnd + 1
      ? [siblingsEnd + 1]
      : []),
    ...endPages,
  ];

  return (
    <Pagination {...paginationProps}>
      {showFirstLast && currentPage > 1 && (
        <PaginationItem onClick={() => onPageChange(1)} aria-label="Go to first page">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </PaginationItem>
      )}
      
      {showPrevNext && (
        <PaginationPrevious
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          {prevLabel}
        </PaginationPrevious>
      )}

      {itemList.map((item, index) => {
        if (typeof item === 'string' && item.startsWith('ellipsis')) {
          return <PaginationEllipsis key={item} />;
        }

        const page = Number(item);
        return (
          <PaginationItem
            key={index}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationItem>
        );
      })}

      {showPrevNext && (
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {nextLabel}
        </PaginationNext>
      )}

      {showFirstLast && currentPage < totalPages && (
        <PaginationItem onClick={() => onPageChange(totalPages)} aria-label="Go to last page">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </PaginationItem>
      )}
    </Pagination>
  );
};