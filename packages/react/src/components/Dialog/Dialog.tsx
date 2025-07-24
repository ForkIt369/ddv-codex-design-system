import React, { forwardRef, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Dialog Root
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open = false, 
  onOpenChange,
  children 
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    child => React.isValidElement(child) && child.type === DialogTrigger
  );
  const content = childrenArray.find(
    child => React.isValidElement(child) && child.type === DialogContent
  );

  return (
    <>
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: () => onOpenChange?.(!open),
        })}
      
      {React.isValidElement(content) &&
        React.cloneElement(content as React.ReactElement<any>, {
          open,
          onOpenChange,
        })}
    </>
  );
};

// Dialog Trigger
export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, { ref, ...props });
    }

    return (
      <button ref={ref} type="button" {...props}>
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = 'DialogTrigger';

// Dialog Content
const dialogContentVariants = cva(
  [
    'fixed',
    'bg-black/90',
    'backdrop-blur-md',
    'border border-white/20',
    'rounded-2xl',
    'shadow-2xl',
    'w-[90vw]',
    'max-w-lg',
    'max-h-[85vh]',
    'overflow-auto',
    'p-6',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
      agent: {
        bigSis: 'ring-2 ring-cyan-500/50',
        bro: 'ring-2 ring-orange-500/50',
        lilSis: 'ring-2 ring-purple-500/50',
        cbo: 'ring-2 ring-green-500/50',
      },
    },
    defaultVariants: {
      size: 'md',
      agent: 'bigSis',
    },
  }
);

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      open = false,
      onOpenChange,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      size = 'md',
      agent = 'bigSis',
      className,
      children,
      ...props
    }
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      // Focus trap
      const focusableElements = contentRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, closeOnEscape, onOpenChange]);

    if (!open) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
          onClick={closeOnBackdropClick ? () => onOpenChange?.(false) : undefined}
        />
        
        {/* Dialog */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={contentRef}
            className={cn(
              dialogContentVariants({ size, agent }),
              'animate-in fade-in-0 zoom-in-95',
              className
            )}
            {...props}
          >
            {showCloseButton && (
              <button
                onClick={() => onOpenChange?.(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-all duration-[280ms]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {children}
          </div>
        </div>
      </>
    );
  }
);

DialogContent.displayName = 'DialogContent';

// Dialog Header
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pr-8', className)}
      {...props}
    />
  )
);

DialogHeader.displayName = 'DialogHeader';

// Dialog Title
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-xl font-semibold', className)}
      {...props}
    />
  )
);

DialogTitle.displayName = 'DialogTitle';

// Dialog Description
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-400 mt-2', className)}
      {...props}
    />
  )
);

DialogDescription.displayName = 'DialogDescription';

// Dialog Footer
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-6 flex items-center justify-end gap-3', className)}
      {...props}
    />
  )
);

DialogFooter.displayName = 'DialogFooter';

// Sheet Component (slide-out panel)
const sheetVariants = cva(
  [
    'fixed z-50',
    'bg-black/95',
    'backdrop-blur-md',
    'border-white/20',
    'shadow-2xl',
    'overflow-auto',
  ],
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b animate-in slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom',
        left: 'inset-y-0 left-0 border-r animate-in slide-in-from-left',
        right: 'inset-y-0 right-0 border-l animate-in slide-in-from-right',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      { side: 'top', size: 'sm', class: 'h-1/4' },
      { side: 'top', size: 'md', class: 'h-1/3' },
      { side: 'top', size: 'lg', class: 'h-1/2' },
      { side: 'top', size: 'xl', class: 'h-2/3' },
      { side: 'top', size: 'full', class: 'h-full' },
      { side: 'bottom', size: 'sm', class: 'h-1/4' },
      { side: 'bottom', size: 'md', class: 'h-1/3' },
      { side: 'bottom', size: 'lg', class: 'h-1/2' },
      { side: 'bottom', size: 'xl', class: 'h-2/3' },
      { side: 'bottom', size: 'full', class: 'h-full' },
      { side: 'left', size: 'sm', class: 'w-1/4' },
      { side: 'left', size: 'md', class: 'w-1/3' },
      { side: 'left', size: 'lg', class: 'w-1/2' },
      { side: 'left', size: 'xl', class: 'w-2/3' },
      { side: 'left', size: 'full', class: 'w-full' },
      { side: 'right', size: 'sm', class: 'w-1/4' },
      { side: 'right', size: 'md', class: 'w-1/3' },
      { side: 'right', size: 'lg', class: 'w-1/2' },
      { side: 'right', size: 'xl', class: 'w-2/3' },
      { side: 'right', size: 'full', class: 'w-full' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ 
  open = false, 
  onOpenChange,
  children 
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    child => React.isValidElement(child) && child.type === SheetTrigger
  );
  const content = childrenArray.find(
    child => React.isValidElement(child) && child.type === SheetContent
  );

  return (
    <>
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: () => onOpenChange?.(!open),
        })}
      
      {React.isValidElement(content) &&
        React.cloneElement(content as React.ReactElement<any>, {
          open,
          onOpenChange,
        })}
    </>
  );
};

// Sheet Trigger
export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, { ref, ...props });
    }

    return (
      <button ref={ref} type="button" {...props}>
        {children}
      </button>
    );
  }
);

SheetTrigger.displayName = 'SheetTrigger';

// Sheet Content
export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  (
    {
      open = false,
      onOpenChange,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      side = 'right',
      size = 'md',
      agent = 'bigSis',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const agentColors = {
      bigSis: 'ring-2 ring-cyan-500/50',
      bro: 'ring-2 ring-orange-500/50',
      lilSis: 'ring-2 ring-purple-500/50',
      cbo: 'ring-2 ring-green-500/50',
    };

    useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onOpenChange]);

    if (!open) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
          onClick={closeOnBackdropClick ? () => onOpenChange?.(false) : undefined}
        />
        
        {/* Sheet */}
        <div
          ref={ref}
          className={cn(
            sheetVariants({ side, size }),
            agentColors[agent],
            'p-6',
            className
          )}
          {...props}
        >
          {showCloseButton && (
            <button
              onClick={() => onOpenChange?.(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-all duration-[280ms]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {children}
        </div>
      </>
    );
  }
);

SheetContent.displayName = 'SheetContent';

// Sheet Header
export const SheetHeader = DialogHeader;
SheetHeader.displayName = 'SheetHeader';

// Sheet Title
export const SheetTitle = DialogTitle;
SheetTitle.displayName = 'SheetTitle';

// Sheet Description
export const SheetDescription = DialogDescription;
SheetDescription.displayName = 'SheetDescription';

// Sheet Footer
export const SheetFooter = DialogFooter;
SheetFooter.displayName = 'SheetFooter';