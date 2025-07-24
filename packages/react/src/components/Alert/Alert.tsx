import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertVariants = cva(
  [
    'relative w-full rounded-lg p-4',
    'border',
    'transition-all duration-[280ms] ease-in-out',
  ],
  {
    variants: {
      variant: {
        info: [
          'bg-cyan-500/10 border-cyan-500/30',
          'text-cyan-100',
          '[&>svg]:text-cyan-500',
        ],
        success: [
          'bg-green-500/10 border-green-500/30',
          'text-green-100',
          '[&>svg]:text-green-500',
        ],
        warning: [
          'bg-yellow-500/10 border-yellow-500/30',
          'text-yellow-100',
          '[&>svg]:text-yellow-500',
        ],
        error: [
          'bg-red-500/10 border-red-500/30',
          'text-red-100',
          '[&>svg]:text-red-500',
        ],
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  }
);

const iconVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
    },
  }
);

const AlertIcons = {
  info: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      size = 'md',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const DefaultIcon = AlertIcons[variant || 'info'];
    const showIcon = icon !== null && (icon || DefaultIcon);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex">
          {showIcon && (
            <div className={cn(iconVariants({ size }), 'mr-3')}>
              {icon || <DefaultIcon className="w-full h-full" />}
            </div>
          )}
          
          <div className="flex-1">
            {title && (
              <h5 className={cn(
                'font-semibold',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                description && 'mb-1'
              )}>
                {title}
              </h5>
            )}
            
            {description && (
              <div className={cn(
                'opacity-90',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base'
              )}>
                {description}
              </div>
            )}
            
            {children}
            
            {action && (
              <div className="mt-3">
                {action}
              </div>
            )}
          </div>
          
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={cn(
                'ml-3 -mr-1 -mt-1 p-1',
                'text-current opacity-60 hover:opacity-100',
                'transition-opacity duration-[140ms]',
                'focus:outline-none focus:ring-2 focus:ring-white/20',
                'rounded'
              )}
              aria-label="Dismiss alert"
            >
              <svg
                className={cn(iconVariants({ size }))}
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
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Alert Dialog Component
export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: AlertProps['variant'];
  action?: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  variant = 'info',
  action,
  cancelLabel = 'Cancel',
  confirmLabel = 'Continue',
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-[280ms]"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-in fade-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-[280ms]">
        <Alert
          variant={variant}
          title={title}
          description={description}
          className="shadow-2xl"
        >
          {action && (
            <div className="mt-4 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-[140ms]"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm?.();
                  onOpenChange(false);
                }}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-[140ms]',
                  variant === 'error' && 'bg-red-500 hover:bg-red-400 text-white',
                  variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-400 text-black',
                  variant === 'success' && 'bg-green-500 hover:bg-green-400 text-white',
                  variant === 'info' && 'bg-cyan-500 hover:bg-cyan-400 text-white'
                )}
              >
                {confirmLabel}
              </button>
            </div>
          )}
        </Alert>
      </div>
    </>
  );
};