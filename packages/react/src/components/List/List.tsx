import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// List Context
interface ListContextValue {
  variant?: 'default' | 'bordered' | 'divided' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  hoverable?: boolean;
  selectable?: boolean;
}

const ListContext = createContext<ListContextValue>({});

const useListContext = () => useContext(ListContext);

// List Container
const listVariants = cva(
  [
    'w-full',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-white/20 rounded-lg',
        divided: 'divide-y divide-white/10',
        striped: '[&>*:nth-child(odd)]:bg-white/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  size?: 'sm' | 'md' | 'lg';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  hoverable?: boolean;
  selectable?: boolean;
  ordered?: boolean;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      agent = 'bigSis',
      hoverable = false,
      selectable = false,
      ordered = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = ordered ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={{ variant: variant || undefined, size: size || undefined, agent, hoverable, selectable }}>
        <Component
          ref={ref as any}
          className={cn(listVariants({ variant }), className)}
          {...props}
        >
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);

List.displayName = 'List';

// List Item
const listItemVariants = cva(
  [
    'relative',
    'transition-all duration-[280ms] ease-in-out',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
      hoverable: {
        true: 'hover:bg-white/5 cursor-pointer',
        false: '',
      },
      selectable: {
        true: 'cursor-pointer',
        false: '',
      },
      selected: {
        true: '',
        false: '',
      },
      agent: {
        bigSis: 'data-[selected=true]:bg-cyan-500/10 data-[selected=true]:border-l-4 data-[selected=true]:border-cyan-500',
        bro: 'data-[selected=true]:bg-orange-500/10 data-[selected=true]:border-l-4 data-[selected=true]:border-orange-500',
        lilSis: 'data-[selected=true]:bg-purple-500/10 data-[selected=true]:border-l-4 data-[selected=true]:border-purple-500',
        cbo: 'data-[selected=true]:bg-green-500/10 data-[selected=true]:border-l-4 data-[selected=true]:border-green-500',
      },
    },
  }
);

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      icon,
      title,
      description,
      actions,
      selected = false,
      onSelect,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const { size, agent, hoverable, selectable, variant } = useListContext();

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(e);
      if (selectable && onSelect) {
        onSelect();
      }
    };

    return (
      <li
        ref={ref}
        data-selected={selected}
        className={cn(
          listItemVariants({
            size,
            hoverable,
            selectable,
            selected,
            agent,
          }),
          variant === 'bordered' && 'first:rounded-t-lg last:rounded-b-lg',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className={cn(
              'flex-shrink-0',
              size === 'sm' && 'mt-0.5',
              size === 'md' && 'mt-1',
              size === 'lg' && 'mt-1.5'
            )}>
              {icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {title && (
              <div className="font-medium text-gray-100">
                {title}
              </div>
            )}
            {description && (
              <div className={cn(
                'text-gray-400',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base'
              )}>
                {description}
              </div>
            )}
            {children}
          </div>
          
          {actions && (
            <div className="flex-shrink-0 ml-4">
              {actions}
            </div>
          )}
        </div>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

// List Group
export interface ListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export const ListGroup: React.FC<ListGroupProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  const { size } = useListContext();

  return (
    <div className={cn('', className)} {...props}>
      <div className={cn(
        'font-semibold text-gray-400 uppercase tracking-wider',
        size === 'sm' && 'text-xs px-3 py-1',
        size === 'md' && 'text-xs px-4 py-2',
        size === 'lg' && 'text-sm px-5 py-2'
      )}>
        {title}
      </div>
      {children}
    </div>
  );
};

ListGroup.displayName = 'ListGroup';

// Virtual List Component (for performance with large lists)
export interface VirtualListProps extends Omit<ListProps, 'children'> {
  items: any[];
  itemHeight: number;
  overscan?: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export const VirtualList = forwardRef<HTMLDivElement, VirtualListProps>(
  (
    {
      items,
      itemHeight,
      overscan = 3,
      renderItem,
      className,
      ...listProps
    },
    ref
  ) => {
    const [scrollTop, setScrollTop] = React.useState(0);
    const [containerHeight, setContainerHeight] = React.useState(0);
    const scrollElementRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => scrollElementRef.current!);

    React.useEffect(() => {
      const scrollElement = scrollElementRef.current;
      if (!scrollElement) return;

      const handleScroll = () => {
        setScrollTop(scrollElement.scrollTop);
      };

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });

      scrollElement.addEventListener('scroll', handleScroll);
      resizeObserver.observe(scrollElement);

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }, []);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            top: i * itemHeight,
            left: 0,
            right: 0,
            height: itemHeight,
          }}
        >
          {renderItem(items[i], i)}
        </div>
      );
    }

    return (
      <div
        ref={scrollElementRef}
        className={cn('relative overflow-auto', className)}
        style={{ height: '100%' }}
      >
        <List {...listProps} style={{ height: items.length * itemHeight }}>
          {visibleItems}
        </List>
      </div>
    );
  }
);

VirtualList.displayName = 'VirtualList';