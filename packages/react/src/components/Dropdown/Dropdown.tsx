import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Dropdown Context
interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  placement?: 'bottom' | 'top' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  setIsOpen: () => {},
});

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown');
  }
  return context;
};

// Dropdown Container
export interface DropdownProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  placement?: 'bottom' | 'top' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  agent = 'bigSis',
  placement = 'bottom',
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, agent, placement }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Trigger
export interface DropdownTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const { isOpen, setIsOpen } = useDropdownContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      'aria-expanded': isOpen,
      'aria-haspopup': 'menu',
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={className}
    >
      {children}
    </button>
  );
};

// Dropdown Menu
const dropdownMenuVariants = cva(
  [
    'absolute z-50',
    'min-w-[200px]',
    'bg-black/95 backdrop-blur-sm',
    'border border-white/20',
    'rounded-lg',
    'shadow-2xl',
    'py-1',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'duration-[280ms]',
  ],
  {
    variants: {
      placement: {
        bottom: 'top-full mt-2',
        top: 'bottom-full mb-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
        'bottom-start': 'top-full mt-2 left-0',
        'bottom-end': 'top-full mt-2 right-0',
        'top-start': 'bottom-full mb-2 left-0',
        'top-end': 'bottom-full mb-2 right-0',
      },
    },
  }
);

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
  ...props
}) => {
  const { isOpen, setIsOpen, placement } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const triggerParent = menuRef.current.parentElement;
        if (triggerParent && !triggerParent.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(dropdownMenuVariants({ placement }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Dropdown Item
const dropdownItemVariants = cva(
  [
    'relative flex items-center',
    'px-3 py-2',
    'text-sm',
    'cursor-pointer',
    'outline-none',
    'transition-colors duration-[140ms]',
    'hover:bg-white/10',
    'focus:bg-white/10',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-50',
  ],
  {
    variants: {
      agent: {
        bigSis: 'focus:text-cyan-400',
        bro: 'focus:text-orange-400',
        lilSis: 'focus:text-purple-400',
        cbo: 'focus:text-green-400',
      },
      variant: {
        default: '',
        danger: 'text-red-400 hover:bg-red-500/10 focus:bg-red-500/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  icon,
  shortcut,
  disabled = false,
  closeOnSelect = true,
  onClick,
  variant = 'default',
  ...props
}) => {
  const { setIsOpen, agent } = useDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      data-disabled={disabled}
      onClick={handleClick}
      className={cn(dropdownItemVariants({ agent, variant }), className)}
      {...props}
    >
      {icon && (
        <span className="mr-2 flex-shrink-0 w-4 h-4">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-4 text-xs text-gray-500">
          {shortcut}
        </span>
      )}
    </div>
  );
};

// Dropdown Separator
export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      role="separator"
      className={cn('h-px my-1 bg-white/10', className)}
    />
  );
};

// Dropdown Label
export interface DropdownLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownLabel: React.FC<DropdownLabelProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  );
};

// Dropdown Submenu
export interface DropdownSubmenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  placement?: 'left' | 'right';
}

export const DropdownSubmenu: React.FC<DropdownSubmenuProps> = ({
  children,
  trigger,
  placement = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-between">
        {trigger}
        <svg
          className="w-4 h-4 ml-2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={placement === 'right' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
          />
        </svg>
      </div>
      {isOpen && (
        <div
          ref={submenuRef}
          className={cn(
            'absolute z-50',
            'min-w-[200px]',
            'bg-black/95 backdrop-blur-sm',
            'border border-white/20',
            'rounded-lg',
            'shadow-2xl',
            'py-1',
            placement === 'right' ? 'left-full ml-1 top-0' : 'right-full mr-1 top-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};