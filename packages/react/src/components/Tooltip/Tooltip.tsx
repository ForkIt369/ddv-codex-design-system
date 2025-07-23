import React, { useState, useRef, useEffect, cloneElement } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  offset?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  interactive?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  agent,
  placement = 'top',
  delay = 280, // Harmonic timing
  offset = 8, // Base unit
  className,
  contentClassName,
  arrow = true,
  interactive = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const targetRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Agent color mapping
  const agentColors = {
    bigSis: 'border-cyan-500/30 bg-cyan-950/90',
    bro: 'border-orange-500/30 bg-orange-950/90',
    lilSis: 'border-purple-500/30 bg-purple-950/90',
    cbo: 'border-green-500/30 bg-green-950/90',
  };

  const arrowColors = {
    bigSis: 'border-cyan-500/30',
    bro: 'border-orange-500/30',
    lilSis: 'border-purple-500/30',
    cbo: 'border-green-500/30',
  };

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = targetRect.top + scrollY - tooltipRect.height - offset;
        left = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + scrollY + offset;
        left = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left + scrollX - tooltipRect.width - offset;
        break;
      case 'right':
        top = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + scrollX + offset;
        break;
    }

    // Viewport boundary detection
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal bounds
    if (left < offset) {
      left = offset;
    } else if (left + tooltipRect.width > viewportWidth - offset) {
      left = viewportWidth - tooltipRect.width - offset;
    }

    // Vertical bounds
    if (top < offset) {
      top = offset;
    } else if (top + tooltipRect.height > scrollY + viewportHeight - offset) {
      top = scrollY + viewportHeight - tooltipRect.height - offset;
    }

    setPosition({ top, left });
  };

  const showTooltip = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!interactive) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isVisible]);

  // Clone child element and add event handlers
  const child = cloneElement(children, {
    ref: targetRef,
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      children.props.onBlur?.(e);
    },
  });

  return (
    <>
      {child}
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50',
            'px-3 py-2', // 12px, 8px
            'text-sm leading-relaxed',
            'text-white',
            'bg-gray-900/95 backdrop-blur-md',
            'border border-white/20',
            'rounded-lg',
            'shadow-xl shadow-black/50',
            'pointer-events-none',
            'animate-in fade-in zoom-in-95',
            'duration-[140ms]', // Half of 280ms for snappy feel
            agent && agentColors[agent],
            interactive && 'pointer-events-auto',
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onMouseEnter={() => interactive && setIsVisible(true)}
          onMouseLeave={() => interactive && setIsVisible(false)}
        >
          <div className={contentClassName}>{content}</div>
          
          {arrow && (
            <div
              className={cn(
                'absolute w-2 h-2',
                'bg-gray-900/95 backdrop-blur-md',
                'border border-white/20',
                'rotate-45',
                agent && arrowColors[agent],
                {
                  'top-full -mt-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0': placement === 'bottom',
                  'bottom-full mb-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0': placement === 'top',
                  'left-full -ml-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0': placement === 'right',
                  'right-full mr-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-t-0': placement === 'left',
                }
              )}
            />
          )}
        </div>
      )}
    </>
  );
};

// Compound component for tooltip content sections
export const TooltipContent: React.FC<{
  title?: string;
  description?: string;
  shortcut?: string;
  className?: string;
}> = ({ title, description, shortcut, className }) => {
  return (
    <div className={cn('space-y-1', className)}>
      {title && (
        <div className="font-semibold text-white">{title}</div>
      )}
      {description && (
        <div className="text-gray-400 text-xs">{description}</div>
      )}
      {shortcut && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <kbd className={cn(
            'px-2 py-1',
            'text-xs font-mono',
            'bg-gray-800 border border-gray-700',
            'rounded'
          )}>
            {shortcut}
          </kbd>
        </div>
      )}
    </div>
  );
};