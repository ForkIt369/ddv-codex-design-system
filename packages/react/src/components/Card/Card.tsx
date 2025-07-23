import React, { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  // Base styles with mathematical harmony
  [
    'relative overflow-hidden',
    'bg-gray-900/50 backdrop-blur-md', // Glassmorphism effect
    'border border-white/10',
    'rounded-2xl', // 16px radius (8px × 2)
    'transition-all duration-[280ms] ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:border-white/20',
          'hover:bg-gray-900/60',
        ],
        elevated: [
          'shadow-xl shadow-black/20',
          'hover:shadow-2xl hover:shadow-black/30',
          'hover:translate-y-[-2px]',
        ],
        interactive: [
          'cursor-pointer',
          'hover:border-white/30',
          'hover:bg-gray-900/70',
          'active:scale-[0.99]',
        ],
        glowing: [
          'shadow-xl',
          'before:absolute before:inset-0 before:p-[1px] before:rounded-2xl',
          'before:-z-10 before:animate-pulse',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4', // 16px (8px × 2)
        md: 'p-6', // 24px (8px × 3)
        lg: 'p-8', // 32px (8px × 4)
        xl: 'p-10', // 40px (8px × 5)
      },
      agent: {
        bigSis: [
          'hover:shadow-cyan-500/20',
          'before:bg-gradient-to-br before:from-cyan-500/30 before:to-blue-600/30',
        ],
        bro: [
          'hover:shadow-orange-500/20',
          'before:bg-gradient-to-br before:from-orange-500/30 before:to-red-600/30',
        ],
        lilSis: [
          'hover:shadow-purple-500/20',
          'before:bg-gradient-to-br before:from-purple-500/30 before:to-pink-600/30',
        ],
        cbo: [
          'hover:shadow-green-500/20',
          'before:bg-gradient-to-br before:from-green-500/30 before:to-emerald-600/30',
        ],
      },
    },
    compoundVariants: [
      // Glowing variant needs agent colors
      {
        variant: 'glowing',
        agent: 'bigSis',
        className: 'shadow-cyan-500/30',
      },
      {
        variant: 'glowing',
        agent: 'bro',
        className: 'shadow-orange-500/30',
      },
      {
        variant: 'glowing',
        agent: 'lilSis',
        className: 'shadow-purple-500/30',
      },
      {
        variant: 'glowing',
        agent: 'cbo',
        className: 'shadow-green-500/30',
      },
    ],
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

// Card Header component
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5',
        'pb-6', // 24px (8px × 3)
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title component
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        'text-white',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description component
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-sm text-gray-400',
        'leading-relaxed', // Golden ratio line height
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content component
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn('text-gray-300', className)} 
      {...props} 
    />
  )
);
CardContent.displayName = 'CardContent';

// Card Footer component
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        'pt-6', // 24px (8px × 3)
        'mt-auto', // Push to bottom
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Main Card component
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  glowIntensity?: 'low' | 'medium' | 'high';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, agent, glowIntensity, style, ...props }, ref) => {
    // Apply glow intensity
    const glowStyles = glowIntensity && agent ? {
      '--glow-opacity': glowIntensity === 'low' ? '0.2' : glowIntensity === 'high' ? '0.5' : '0.35',
    } as React.CSSProperties : {};

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, agent }), className)}
        style={{ ...glowStyles, ...style }}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// Export compound components
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };