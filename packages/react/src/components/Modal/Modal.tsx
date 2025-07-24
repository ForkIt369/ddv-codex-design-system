import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';

const overlayVariants = cva(
  [
    'fixed inset-0 z-50',
    'bg-black/80 backdrop-blur-sm',
    'animate-in fade-in',
    'duration-[280ms]',
  ]
);

const modalVariants = cva(
  [
    'fixed left-1/2 top-1/2',
    '-translate-x-1/2 -translate-y-1/2',
    'z-50',
    'w-full',
    'bg-gray-900/95 backdrop-blur-xl',
    'border border-white/20',
    'rounded-xl',
    'shadow-2xl shadow-black/50',
    'animate-in fade-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]',
    'duration-[280ms]',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm', // 384px
        md: 'max-w-md', // 448px
        lg: 'max-w-lg', // 512px
        xl: 'max-w-xl', // 576px
        '2xl': 'max-w-2xl', // 672px
        '3xl': 'max-w-3xl', // 768px
        '4xl': 'max-w-4xl', // 896px
        full: 'max-w-[calc(100vw-2rem)] mx-4', // Full width with margin
      },
      agent: {
        bigSis: 'border-cyan-500/30',
        bro: 'border-orange-500/30',
        lilSis: 'border-purple-500/30',
        cbo: 'border-green-500/30',
      },
    },
    defaultVariants: {
      size: 'lg',
      agent: 'bigSis',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  footer,
  size = 'lg',
  agent = 'bigSis',
  className,
  overlayClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element in modal
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          firstElement?.focus();
        }
      }, 100);
    } else {
      // Return focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(overlayVariants(), overlayClassName)}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        className={cn(modalVariants({ size, agent }), className)}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-white/10">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className={cn(
                    'text-xl font-semibold text-white',
                    titleClassName
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className={cn(
                    'mt-1 text-sm text-gray-400',
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'ml-4 p-2',
                  'text-gray-400 hover:text-gray-300',
                  'transition-colors duration-[140ms]',
                  'rounded-lg',
                  'hover:bg-white/10',
                  'focus:outline-none focus:ring-2 focus:ring-white/20'
                )}
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
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
        )}

        {/* Content */}
        <div
          className={cn(
            'p-6',
            'max-h-[calc(100vh-16rem)]',
            'overflow-y-auto',
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'p-6 pt-4',
              'border-t border-white/10',
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

// Compound components for common modal patterns
export const ModalActions: React.FC<{
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}> = ({ children, className, align = 'right' }) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

// Pre-built confirmation modal
export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'footer'> {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  variant = 'danger',
  loading = false,
  agent = 'bigSis',
  ...props
}) => {
  const variantStyles = {
    danger: {
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      buttonVariant: 'primary' as const,
      buttonAgent: 'bigSis' as const,
    },
    warning: {
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonVariant: 'primary' as const,
      buttonAgent: 'bro' as const,
    },
    info: {
      icon: (
        <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonVariant: 'primary' as const,
      buttonAgent: 'bigSis' as const,
    },
  };

  const styles = variantStyles[variant];

  return (
    <Modal
      {...props}
      agent={agent}
      onClose={onClose}
      footer={
        <ModalActions>
          <Button
            variant="ghost"
            agent={agent || undefined}
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={styles.buttonVariant}
            agent={variant === 'danger' ? 'bigSis' : styles.buttonAgent}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmLabel}
          </Button>
        </ModalActions>
      }
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="flex-1">
          <p className="text-white">{message}</p>
        </div>
      </div>
    </Modal>
  );
};