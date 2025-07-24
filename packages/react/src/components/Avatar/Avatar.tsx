import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'font-semibold text-white',
    'bg-gradient-to-br',
    'overflow-hidden',
    'select-none',
    'transition-all duration-[280ms] ease-in-out',
  ],
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs', // 24px
        sm: 'w-8 h-8 text-sm', // 32px
        md: 'w-10 h-10 text-base', // 40px
        lg: 'w-12 h-12 text-lg', // 48px
        xl: 'w-14 h-14 text-xl', // 56px
        '2xl': 'w-16 h-16 text-2xl', // 64px
        '3xl': 'w-20 h-20 text-3xl', // 80px
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
      agent: {
        bigSis: 'from-cyan-600 to-cyan-400',
        bro: 'from-orange-600 to-orange-400',
        lilSis: 'from-purple-600 to-purple-400',
        cbo: 'from-green-600 to-green-400',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      agent: 'bigSis',
    },
  }
);

const statusVariants = cva(
  [
    'absolute bottom-0 right-0',
    'block rounded-full',
    'ring-2 ring-black',
    'transition-all duration-[280ms]',
  ],
  {
    variants: {
      size: {
        xs: 'w-1.5 h-1.5 ring-1',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-3.5 h-3.5',
        '2xl': 'w-4 h-4',
        '3xl': 'w-5 h-5',
      },
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
      },
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  badge?: React.ReactNode;
  loading?: 'eager' | 'lazy';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      shape = 'circle',
      agent = 'bigSis',
      src,
      alt,
      fallback,
      status,
      badge,
      loading = 'lazy',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Generate initials from fallback
    const initials = fallback
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

    const showImage = src && !imageError;
    const showFallback = !showImage || !imageLoaded;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, agent }), className)}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || fallback}
            loading={loading}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              !imageLoaded && 'invisible'
            )}
          />
        )}
        
        {showFallback && (
          <span
            className={cn(
              'flex items-center justify-center w-full h-full',
              showImage && !imageLoaded && 'absolute inset-0'
            )}
            aria-hidden={showImage ? true : undefined}
          >
            {initials}
          </span>
        )}

        {status && (
          <span
            className={statusVariants({ size, status })}
            aria-label={`Status: ${status}`}
          />
        )}

        {badge && (
          <div
            className={cn(
              'absolute -top-1 -right-1',
              'flex items-center justify-center',
              'min-w-[1.25rem] h-5',
              'bg-red-500 text-white',
              'text-xs font-bold',
              'rounded-full px-1',
              'ring-2 ring-black'
            )}
          >
            {badge}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
  spacing?: 'tight' | 'normal' | 'loose';
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, size = 'md', spacing = 'normal', className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    const spacingClasses = {
      tight: '-space-x-3',
      normal: '-space-x-2',
      loose: '-space-x-1',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', spacingClasses[spacing], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="relative hover:z-10 transition-all duration-[140ms]"
            style={{ zIndex: visibleChildren.length - index }}
          >
            {React.isValidElement(child) &&
              React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
              })}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size, shape: 'circle' }),
              'bg-gray-700 hover:bg-gray-600',
              'hover:z-10 transition-all duration-[140ms]'
            )}
            style={{ zIndex: 0 }}
          >
            <span className="text-gray-300">+{remainingCount}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';