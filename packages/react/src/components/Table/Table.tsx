import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Table Context
interface TableContextValue {
  variant?: 'default' | 'bordered' | 'striped' | 'hover';
  size?: 'sm' | 'md' | 'lg';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  stickyHeader?: boolean;
}

const TableContext = createContext<TableContextValue>({});

const useTableContext = () => useContext(TableContext);

// Table Container
const tableVariants = cva(
  [
    'w-full',
    'text-left',
    'border-collapse',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-white/20 rounded-lg overflow-hidden',
        striped: '',
        hover: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  size?: 'sm' | 'md' | 'lg';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  stickyHeader?: boolean;
  containerClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      containerClassName,
      variant = 'default',
      size = 'md',
      agent = 'bigSis',
      stickyHeader = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TableContext.Provider value={{ variant: variant || undefined, size: size || undefined, agent, stickyHeader }}>
        <div className={cn(
          'relative overflow-auto',
          variant === 'bordered' && 'rounded-lg border border-white/20',
          containerClassName
        )}>
          <table
            ref={ref}
            className={cn(tableVariants({ variant }), className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

// Table Header
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { stickyHeader } = useTableContext();

    return (
      <thead
        ref={ref}
        className={cn(
          'border-b border-white/20',
          stickyHeader && 'sticky top-0 z-10 bg-black/95 backdrop-blur-sm',
          className
        )}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

// Table Body
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTableContext();

    return (
      <tbody
        ref={ref}
        className={cn(
          variant === 'striped' && '[&>tr:nth-child(odd)]:bg-white/5',
          className
        )}
        {...props}
      />
    );
  }
);

TableBody.displayName = 'TableBody';

// Table Row
const tableRowVariants = cva(
  [
    'transition-colors duration-[280ms]',
  ],
  {
    variants: {
      variant: {
        default: 'border-b border-white/10',
        bordered: 'border-b border-white/10',
        striped: 'border-b border-white/10',
        hover: 'border-b border-white/10 hover:bg-white/5',
      },
    },
  }
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, ...props }, ref) => {
    const { variant, agent } = useTableContext();

    return (
      <tr
        ref={ref}
        data-selected={selected}
        className={cn(
          tableRowVariants({ variant }),
          selected && [
            'bg-opacity-10',
            agent === 'bigSis' && 'bg-cyan-500/10',
            agent === 'bro' && 'bg-orange-500/10',
            agent === 'lilSis' && 'bg-purple-500/10',
            agent === 'cbo' && 'bg-green-500/10',
          ],
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

// Table Head Cell
const tableHeadVariants = cva(
  [
    'font-semibold',
    'text-gray-400',
    'uppercase',
    'tracking-wider',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-xs',
        lg: 'px-6 py-4 text-sm',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableHeadVariants> {
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | false;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      align = 'left',
      sortable = false,
      sorted = false,
      onSort,
      children,
      ...props
    },
    ref
  ) => {
    const { size } = useTableContext();

    return (
      <th
        ref={ref}
        className={cn(
          tableHeadVariants({ size, align: align as 'left' | 'center' | 'right' }),
          sortable && 'cursor-pointer select-none hover:text-gray-200',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center gap-1">
          {children}
          {sortable && (
            <svg
              className={cn(
                'w-3 h-3 transition-all duration-[140ms]',
                sorted === 'desc' && 'rotate-180',
                !sorted && 'opacity-0 group-hover:opacity-50'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

// Table Cell
const tableCellVariants = cva(
  [
    'text-gray-300',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableCellVariants> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const { size } = useTableContext();

    return (
      <td
        ref={ref}
        className={cn(tableCellVariants({ size, align: align as 'left' | 'center' | 'right' }), className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';

// Table Footer
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn('border-t border-white/20 bg-white/5', className)}
        {...props}
      />
    );
  }
);

TableFooter.displayName = 'TableFooter';

// Table Caption
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  position?: 'top' | 'bottom';
}

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, position = 'bottom', ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn(
          'text-sm text-gray-500 py-3',
          position === 'top' ? 'caption-top' : 'caption-bottom',
          className
        )}
        {...props}
      />
    );
  }
);

TableCaption.displayName = 'TableCaption';