import React, { forwardRef, createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Toast Context
interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Types
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

// Toast Provider
export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  position = 'bottom-right',
  duration = 5000,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { 
      ...toast, 
      id,
      duration: toast.duration ?? duration 
    };

    setToasts(prev => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    return id;
  }, [maxToasts, duration]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
};

// Toast Container
const toastContainerVariants = cva(
  [
    'fixed',
    'z-50',
    'flex flex-col',
    'gap-2',
    'p-4',
    'pointer-events-none',
  ],
  {
    variants: {
      position: {
        'top-left': 'top-0 left-0',
        'top-center': 'top-0 left-1/2 -translate-x-1/2',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-0 right-0',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  }
);

interface ToastContainerProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'bottom-right' }) => {
  const { toasts } = useToast();
  const isTop = position.startsWith('top');

  return (
    <div className={cn(toastContainerVariants({ position }))}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          style={{
            [isTop ? 'top' : 'bottom']: `${index * 80}px`,
          }}
        />
      ))}
    </div>
  );
};

// Toast Item
const toastVariants = cva(
  [
    'relative',
    'pointer-events-auto',
    'min-w-[320px] max-w-[420px]',
    'p-4',
    'rounded-xl',
    'shadow-lg',
    'backdrop-blur-sm',
    'border',
    'animate-in slide-in-from-right-full fade-in-0',
    'transition-all duration-[280ms]',
  ],
  {
    variants: {
      variant: {
        default: 'bg-black/80 border-white/20 text-white',
        success: 'bg-green-900/80 border-green-500/30 text-green-100',
        error: 'bg-red-900/80 border-red-500/30 text-red-100',
        warning: 'bg-amber-900/80 border-amber-500/30 text-amber-100',
        info: 'bg-blue-900/80 border-blue-500/30 text-blue-100',
      },
      agent: {
        bigSis: 'bg-cyan-900/80 border-cyan-500/30 text-cyan-100',
        bro: 'bg-orange-900/80 border-orange-500/30 text-orange-100',
        lilSis: 'bg-purple-900/80 border-purple-500/30 text-purple-100',
        cbo: 'bg-green-900/80 border-green-500/30 text-green-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ToastItemProps {
  toast: Toast;
  style?: React.CSSProperties;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
        toast.onClose?.();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, removeToast]);

  const variantIcons = {
    default: null,
    success: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const handleClose = () => {
    removeToast(toast.id);
    toast.onClose?.();
  };

  return (
    <div
      className={cn(
        toastVariants({ 
          variant: toast.agent ? undefined : toast.variant,
          agent: toast.agent,
        })
      )}
      style={style}
    >
      <div className="flex gap-3">
        {toast.variant && variantIcons[toast.variant]}
        
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-semibold mb-1">{toast.title}</h4>
          )}
          {toast.description && (
            <p className="text-sm opacity-90">{toast.description}</p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="ml-4 rounded-lg p-1 hover:bg-white/10 transition-all duration-[280ms]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {toast.action && (
        <button
          onClick={toast.action.onClick}
          className="mt-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-[280ms]"
        >
          {toast.action.label}
        </button>
      )}
    </div>
  );
};

// Notification Component (standalone)
const notificationVariants = cva(
  [
    'relative',
    'w-full',
    'p-4',
    'rounded-lg',
    'border',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/5 border-white/20',
        success: 'bg-green-500/10 border-green-500/30',
        error: 'bg-red-500/10 border-red-500/30',
        warning: 'bg-amber-500/10 border-amber-500/30',
        info: 'bg-blue-500/10 border-blue-500/30',
      },
      closable: {
        true: 'pr-12',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      closable: false,
    },
  }
);

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      action,
      onClose,
      closable = !!onClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcons = {
      success: (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };

    const displayIcon = icon || (variant && variant !== 'default' ? defaultIcons[variant] : null);

    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant, closable }), className)}
        {...props}
      >
        <div className="flex gap-3">
          {displayIcon && <div className="flex-shrink-0">{displayIcon}</div>}
          
          <div className="flex-1">
            {title && (
              <h4 className="font-semibold mb-1">{title}</h4>
            )}
            {description && (
              <p className="text-sm opacity-90">{description}</p>
            )}
            {children}
            
            {action && (
              <button
                onClick={action.onClick}
                className="mt-3 text-sm font-medium underline underline-offset-2 hover:no-underline transition-all duration-[280ms]"
              >
                {action.label}
              </button>
            )}
          </div>
        </div>

        {closable && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1 hover:bg-white/10 transition-all duration-[280ms]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';

// Toast utility function
export const toast = {
  success: (message: string | Omit<Toast, 'id' | 'variant'>) => {
    const toastData = typeof message === 'string' 
      ? { title: message, variant: 'success' as const }
      : { ...message, variant: 'success' as const };
    return window.dispatchEvent(new CustomEvent('toast', { detail: toastData }));
  },
  error: (message: string | Omit<Toast, 'id' | 'variant'>) => {
    const toastData = typeof message === 'string' 
      ? { title: message, variant: 'error' as const }
      : { ...message, variant: 'error' as const };
    return window.dispatchEvent(new CustomEvent('toast', { detail: toastData }));
  },
  warning: (message: string | Omit<Toast, 'id' | 'variant'>) => {
    const toastData = typeof message === 'string' 
      ? { title: message, variant: 'warning' as const }
      : { ...message, variant: 'warning' as const };
    return window.dispatchEvent(new CustomEvent('toast', { detail: toastData }));
  },
  info: (message: string | Omit<Toast, 'id' | 'variant'>) => {
    const toastData = typeof message === 'string' 
      ? { title: message, variant: 'info' as const }
      : { ...message, variant: 'info' as const };
    return window.dispatchEvent(new CustomEvent('toast', { detail: toastData }));
  },
};