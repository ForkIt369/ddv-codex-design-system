import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Divider Variants
const dividerVariants = cva(
  [
    'border-0',
    'bg-white/20',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'w-px h-full',
      },
      variant: {
        solid: '',
        dashed: 'bg-none border-dashed border-white/20',
        dotted: 'bg-none border-dotted border-white/20',
        gradient: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      spacing: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    compoundVariants: [
      // Horizontal sizing
      {
        orientation: 'horizontal',
        variant: 'solid',
        size: 'sm',
        className: 'h-px',
      },
      {
        orientation: 'horizontal',
        variant: 'solid',
        size: 'md',
        className: 'h-[2px]',
      },
      {
        orientation: 'horizontal',
        variant: 'solid',
        size: 'lg',
        className: 'h-1',
      },
      // Vertical sizing
      {
        orientation: 'vertical',
        variant: 'solid',
        size: 'sm',
        className: 'w-px',
      },
      {
        orientation: 'vertical',
        variant: 'solid',
        size: 'md',
        className: 'w-[2px]',
      },
      {
        orientation: 'vertical',
        variant: 'solid',
        size: 'lg',
        className: 'w-1',
      },
      // Dashed/Dotted horizontal
      {
        orientation: 'horizontal',
        variant: ['dashed', 'dotted'],
        className: 'border-t',
      },
      // Dashed/Dotted vertical
      {
        orientation: 'vertical',
        variant: ['dashed', 'dotted'],
        className: 'border-l',
      },
      // Spacing horizontal
      {
        orientation: 'horizontal',
        spacing: 'xs',
        className: 'my-1',
      },
      {
        orientation: 'horizontal',
        spacing: 'sm',
        className: 'my-2',
      },
      {
        orientation: 'horizontal',
        spacing: 'md',
        className: 'my-3',
      },
      {
        orientation: 'horizontal',
        spacing: 'lg',
        className: 'my-4',
      },
      {
        orientation: 'horizontal',
        spacing: 'xl',
        className: 'my-6',
      },
      // Spacing vertical
      {
        orientation: 'vertical',
        spacing: 'xs',
        className: 'mx-1',
      },
      {
        orientation: 'vertical',
        spacing: 'sm',
        className: 'mx-2',
      },
      {
        orientation: 'vertical',
        spacing: 'md',
        className: 'mx-3',
      },
      {
        orientation: 'vertical',
        spacing: 'lg',
        className: 'mx-4',
      },
      {
        orientation: 'vertical',
        spacing: 'xl',
        className: 'mx-6',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'solid',
      size: 'sm',
      spacing: 'md',
    },
  }
);

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  children?: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'solid',
      size = 'sm',
      spacing = 'md',
      children,
      textAlign = 'center',
      agent,
      ...props
    },
    ref
  ) => {
    // Simple divider without text
    if (!children) {
      return (
        <hr
          ref={ref}
          role="separator"
          aria-orientation={orientation || undefined}
          className={cn(
            dividerVariants({ orientation, variant, size, spacing }),
            agent && variant === 'gradient' && [
              agent === 'bigSis' && 'via-cyan-500/20',
              agent === 'bro' && 'via-orange-500/20',
              agent === 'lilSis' && 'via-purple-500/20',
              agent === 'cbo' && 'via-green-500/20',
            ],
            className
          )}
          {...props}
        />
      );
    }

    // Divider with text (only for horizontal orientation)
    if (orientation === 'horizontal') {
      return (
        <div
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            'relative flex items-center',
            spacing === 'xs' && 'my-1',
            spacing === 'sm' && 'my-2',
            spacing === 'md' && 'my-3',
            spacing === 'lg' && 'my-4',
            spacing === 'xl' && 'my-6',
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'flex-1',
              textAlign === 'center' && 'flex-1',
              textAlign === 'right' && 'flex-1'
            )}
          >
            <hr
              ref={textAlign === 'left' ? ref : undefined}
              className={cn(
                dividerVariants({ orientation, variant, size }),
                agent && variant === 'gradient' && [
                  'bg-gradient-to-r from-transparent',
                  agent === 'bigSis' && 'to-cyan-500/20',
                  agent === 'bro' && 'to-orange-500/20',
                  agent === 'lilSis' && 'to-purple-500/20',
                  agent === 'cbo' && 'to-green-500/20',
                ]
              )}
            />
          </div>
          
          <div className="px-3 text-sm text-gray-400">{children}</div>
          
          <div
            className={cn(
              'flex-1',
              textAlign === 'center' && 'flex-1',
              textAlign === 'left' && 'flex-1'
            )}
          >
            <hr
              ref={textAlign === 'right' ? ref : undefined}
              className={cn(
                dividerVariants({ orientation, variant, size }),
                agent && variant === 'gradient' && [
                  'bg-gradient-to-r',
                  agent === 'bigSis' && 'from-cyan-500/20 to-transparent',
                  agent === 'bro' && 'from-orange-500/20 to-transparent',
                  agent === 'lilSis' && 'from-purple-500/20 to-transparent',
                  agent === 'cbo' && 'from-green-500/20 to-transparent',
                ]
              )}
            />
          </div>
        </div>
      );
    }

    // Vertical divider doesn't support text
    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation || undefined}
        className={cn(
          dividerVariants({ orientation, variant, size, spacing }),
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

// Section Divider (with enhanced styling)
export interface SectionDividerProps extends DividerProps {
  icon?: React.ReactNode;
  decorative?: boolean;
}

export const SectionDivider = forwardRef<HTMLHRElement, SectionDividerProps>(
  (
    {
      icon,
      decorative = false,
      children,
      className,
      agent = 'bigSis',
      ...props
    },
    ref
  ) => {
    if (decorative || icon || children) {
      const agentColors = {
        bigSis: 'text-cyan-500',
        bro: 'text-orange-500',
        lilSis: 'text-purple-500',
        cbo: 'text-green-500',
      };

      return (
        <div
          ref={ref as any}
          role="separator"
          className={cn('relative py-8', className)}
          {...props}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center gap-3 bg-black px-4">
              {decorative && !icon && !children && (
                <div className="flex items-center gap-1">
                  <div className={cn('w-2 h-2 rounded-full', agentColors[agent])} />
                  <div className={cn('w-3 h-3 rounded-full', agentColors[agent])} />
                  <div className={cn('w-2 h-2 rounded-full', agentColors[agent])} />
                </div>
              )}
              {icon && <span className={agentColors[agent]}>{icon}</span>}
              {children && (
                <span className="text-sm font-medium text-gray-400">
                  {children}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return <Divider ref={ref} className={className} {...props} />;
  }
);

SectionDivider.displayName = 'SectionDivider';