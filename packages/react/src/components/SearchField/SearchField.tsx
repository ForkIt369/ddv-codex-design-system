import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// SearchField Component
const searchFieldVariants = cva(
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
      variant: {
        default: '',
        minimal: '',
        rounded: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof searchFieldVariants> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  loading?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  icon?: React.ReactNode;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      size = 'md',
      variant = 'default',
      onSearch,
      onClear,
      showClearButton = true,
      loading = false,
      agent = 'bigSis',
      icon,
      className,
      value,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const controlledValue = value ?? internalValue;

    const agentColors = {
      bigSis: 'focus:border-cyan-500 focus:ring-cyan-500/50',
      bro: 'focus:border-orange-500 focus:ring-orange-500/50',
      lilSis: 'focus:border-purple-500 focus:ring-purple-500/50',
      cbo: 'focus:border-green-500 focus:ring-green-500/50',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && controlledValue) {
        onSearch?.(controlledValue as string);
      }
      onKeyDown?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      if (value !== undefined) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }
      onClear?.();
    };

    const sizeClasses = {
      sm: 'pl-8 pr-8 py-1.5 text-sm',
      md: 'pl-10 pr-10 py-2',
      lg: 'pl-12 pr-12 py-3 text-lg',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPositions = {
      sm: 'left-2',
      md: 'left-3',
      lg: 'left-4',
    };

    const variantClasses = {
      default: 'rounded-lg',
      minimal: 'rounded-none border-0 border-b bg-transparent focus:bg-white/5',
      rounded: 'rounded-full',
    };

    return (
      <div className={cn(searchFieldVariants({ size, variant }), className)}>
        {/* Search Icon */}
        <div className={cn(
          'absolute top-1/2 -translate-y-1/2 pointer-events-none',
          iconPositions[size || 'md']
        )}>
          {icon || (
            <svg
              className={cn(iconSizes[size || 'md'], 'text-gray-400')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="search"
          value={controlledValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full',
            sizeClasses[size || 'md'],
            'bg-white/5',
            'border border-white/20',
            'placeholder:text-gray-500',
            'transition-all duration-[280ms]',
            'focus:outline-none focus:ring-2',
            agent && agentColors[agent],
            variantClasses[variant || 'default'],
            showClearButton && controlledValue && 'pr-16'
          )}
          {...props}
        />

        {/* Clear Button / Loading */}
        {(showClearButton && controlledValue) || loading ? (
          <div className={cn(
            'absolute top-1/2 -translate-y-1/2 right-2',
            'flex items-center gap-1'
          )}>
            {loading && (
              <div className={cn(
                'animate-spin rounded-full border-2 border-current border-r-transparent',
                iconSizes[size || 'md']
              )} />
            )}
            
            {showClearButton && controlledValue && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded hover:bg-white/10 transition-all duration-[280ms]"
              >
                <svg
                  className={cn(iconSizes[size || 'md'])}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';

// Command Palette Component
export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  keywords?: string[];
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  recentLabel?: string;
  showRecent?: boolean;
  maxRecent?: number;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open = false,
  onOpenChange,
  items,
  placeholder = 'Search commands...',
  emptyMessage = 'No results found',
  showRecent = true,
  maxRecent = 5,
  agent = 'bigSis',
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const agentColors = {
    bigSis: 'ring-2 ring-cyan-500/50',
    bro: 'ring-2 ring-orange-500/50',
    lilSis: 'ring-2 ring-purple-500/50',
    cbo: 'ring-2 ring-green-500/50',
  };

  const filteredItems = search
    ? items.filter(item => {
        const searchLower = search.toLowerCase();
        return (
          item.label.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      })
    : showRecent
    ? items.filter(item => recentItems.includes(item.id))
    : items;

  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || 'default';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        const selectedItem = filteredItems[selectedIndex];
        if (selectedItem && !selectedItem.disabled) {
          handleSelect(selectedItem);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onOpenChange?.(false);
        break;
    }
  };

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    
    // Add to recent items
    setRecentItems(prev => {
      const newRecent = [item.id, ...prev.filter(id => id !== item.id)];
      return newRecent.slice(0, maxRecent);
    });
    
    item.onSelect?.();
    onOpenChange?.(false);
  };

  useEffect(() => {
    if (open && listRef.current) {
      const selectedElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        onClick={() => onOpenChange?.(false)}
      />
      
      {/* Command Palette */}
      <div className="fixed inset-x-0 top-[20%] z-50 mx-auto max-w-2xl px-4">
        <div className={cn(
          'bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden',
          'animate-in fade-in-0 zoom-in-95',
          agentColors[agent]
        )}>
          {/* Search Input */}
          <div className="p-4 border-b border-white/10">
            <SearchField
              ref={inputRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              agent={agent}
              variant="minimal"
              showClearButton={false}
              className="border-0"
            />
          </div>

          {/* Results */}
          <div
            ref={listRef}
            className="max-h-[400px] overflow-auto p-2"
          >
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {emptyMessage}
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  {category !== 'default' && (
                    <div className="px-3 py-2 text-xs text-gray-500 font-medium">
                      {category}
                    </div>
                  )}
                  {categoryItems.map((item) => {
                    const globalIndex = filteredItems.indexOf(item);
                    return (
                      <div
                        key={item.id}
                        data-index={globalIndex}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-[280ms]',
                          'hover:bg-white/10',
                          globalIndex === selectedIndex && 'bg-white/10',
                          item.disabled && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {item.icon && (
                          <div className="flex-shrink-0 text-gray-400">
                            {item.icon}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.label}</p>
                          {item.description && (
                            <p className="text-sm text-gray-500 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-gray-500 bg-white/5 rounded">
                          ⏎
                        </kbd>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Command Menu (simpler version)
const commandMenuVariants = cva(
  [
    'w-full max-w-sm',
    'bg-black/90',
    'backdrop-blur-md',
    'border border-white/20',
    'rounded-xl',
    'shadow-xl',
    'overflow-hidden',
  ],
  {
    variants: {
      agent: {
        bigSis: 'ring-2 ring-cyan-500/50',
        bro: 'ring-2 ring-orange-500/50',
        lilSis: 'ring-2 ring-purple-500/50',
        cbo: 'ring-2 ring-green-500/50',
      },
    },
    defaultVariants: {
      agent: 'bigSis',
    },
  }
);

export interface CommandMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandMenuVariants> {
  searchPlaceholder?: string;
}

export const CommandMenu = forwardRef<HTMLDivElement, CommandMenuProps>(
  (
    {
      searchPlaceholder = 'Search...',
      agent = 'bigSis',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = useState('');

    return (
      <div
        ref={ref}
        className={cn(commandMenuVariants({ agent }), className)}
        {...props}
      >
        <div className="p-3 border-b border-white/10">
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            agent={agent || undefined}
            variant="minimal"
            size="sm"
            showClearButton={false}
            className="border-0"
          />
        </div>
        
        <div className="max-h-[300px] overflow-auto p-2">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === CommandMenuItem) {
              const label = child.props.children?.toString() || '';
              if (search && !label.toLowerCase().includes(search.toLowerCase())) {
                return null;
              }
              return child;
            }
            return child;
          })}
        </div>
      </div>
    );
  }
);

CommandMenu.displayName = 'CommandMenu';

// Command Menu Item
export interface CommandMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
}

export const CommandMenuItem = forwardRef<HTMLDivElement, CommandMenuItemProps>(
  (
    {
      icon,
      shortcut,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-[280ms]',
          'hover:bg-white/10',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex-shrink-0 text-gray-400">
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          {children}
        </div>
        
        {shortcut && (
          <kbd className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

CommandMenuItem.displayName = 'CommandMenuItem';