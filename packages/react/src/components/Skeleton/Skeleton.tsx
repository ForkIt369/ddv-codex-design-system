import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Skeleton Variants
const skeletonVariants = cva(
  [
    'animate-pulse',
    'bg-gradient-to-r',
    'from-white/5 via-white/10 to-white/5',
    'bg-[length:200%_100%]',
    'animate-shimmer',
  ],
  {
    variants: {
      variant: {
        default: '',
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
      },
      agent: {
        bigSis: 'from-cyan-500/5 via-cyan-500/10 to-cyan-500/5',
        bro: 'from-orange-500/5 via-orange-500/10 to-orange-500/5',
        lilSis: 'from-purple-500/5 via-purple-500/10 to-purple-500/5',
        cbo: 'from-green-500/5 via-green-500/10 to-green-500/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  count?: number;
  visible?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'default',
      agent,
      width,
      height,
      count = 1,
      visible = true,
      style,
      children,
      ...props
    },
    ref
  ) => {
    if (!visible && children) {
      return <>{children}</>;
    }

    const skeletonStyle = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...style,
    };

    if (count > 1) {
      return (
        <>
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              ref={index === 0 ? ref : undefined}
              className={cn(skeletonVariants({ variant, agent }), className)}
              style={skeletonStyle}
              {...props}
            />
          ))}
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, agent }), className)}
        style={skeletonStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Skeleton Text
export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  lines?: number;
  lineHeight?: string | number;
  spacing?: string | number;
  lastLineWidth?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      lineHeight = 20,
      spacing = 8,
      lastLineWidth = '60%',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height={lineHeight}
            width={index === lines - 1 ? lastLineWidth : '100%'}
            style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
            {...props}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

// Skeleton Avatar
export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'variant'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const sizeMap = {
      xs: 24,  // 24px
      sm: 32,  // 32px
      md: 40,  // 40px
      lg: 48,  // 48px
      xl: 56,  // 56px
      '2xl': 64,  // 64px
      '3xl': 80,  // 80px
    };

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Skeleton Button
export interface SkeletonButtonProps extends Omit<SkeletonProps, 'variant'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const sizeMap = {
      sm: { width: 80, height: 32 },
      md: { width: 100, height: 40 },
      lg: { width: 120, height: 48 },
      xl: { width: 140, height: 56 },
    };

    return (
      <Skeleton
        ref={ref}
        variant="rectangular"
        width={sizeMap[size].width}
        height={sizeMap[size].height}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonButton.displayName = 'SkeletonButton';

// Skeleton Card
export interface SkeletonCardProps extends Omit<SkeletonProps, 'variant'> {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
}

export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      showImage = true,
      showTitle = true,
      showDescription = true,
      showActions = false,
      className,
      agent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 border border-white/20 rounded-lg space-y-4',
          className
        )}
        {...props}
      >
        {showImage && (
          <Skeleton
            variant="rectangular"
            height={200}
            width="100%"
            agent={agent}
          />
        )}
        
        {showTitle && (
          <Skeleton
            variant="text"
            height={24}
            width="70%"
            agent={agent}
          />
        )}
        
        {showDescription && (
          <SkeletonText
            lines={3}
            lineHeight={16}
            spacing={4}
            agent={agent}
          />
        )}
        
        {showActions && (
          <div className="flex gap-2 pt-2">
            <SkeletonButton size="sm" agent={agent} />
            <SkeletonButton size="sm" agent={agent} />
          </div>
        )}
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

// Skeleton Table
export interface SkeletonTableProps extends Omit<SkeletonProps, 'variant'> {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export const SkeletonTable = forwardRef<HTMLDivElement, SkeletonTableProps>(
  (
    {
      rows = 5,
      columns = 4,
      showHeader = true,
      className,
      agent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {showHeader && (
          <div className="flex gap-4 p-4 border-b border-white/10">
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                height={16}
                width={`${100 / columns}%`}
                agent={agent}
              />
            ))}
          </div>
        )}
        
        <div className="divide-y divide-white/10">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 p-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  variant="text"
                  height={20}
                  width={`${100 / columns}%`}
                  agent={agent}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SkeletonTable.displayName = 'SkeletonTable';