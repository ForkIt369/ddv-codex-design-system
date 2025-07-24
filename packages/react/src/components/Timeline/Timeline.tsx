import React, { forwardRef, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Timeline Context
interface TimelineContextValue {
  orientation?: 'vertical' | 'horizontal';
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'minimal' | 'detailed';
  showConnectors?: boolean;
}

const TimelineContext = createContext<TimelineContextValue>({});

const useTimelineContext = () => useContext(TimelineContext);

// Timeline Container
const timelineVariants = cva(
  [
    'relative',
  ],
  {
    variants: {
      orientation: {
        vertical: 'space-y-8',
        horizontal: 'flex space-x-8 overflow-x-auto pb-4',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'minimal' | 'detailed';
  showConnectors?: boolean;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      orientation = 'vertical',
      agent = 'bigSis',
      variant = 'default',
      showConnectors = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TimelineContext.Provider value={{ orientation: orientation || undefined, agent, variant, showConnectors }}>
        <div
          ref={ref}
          className={cn(timelineVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);

Timeline.displayName = 'Timeline';

// Timeline Item
const timelineItemVariants = cva(
  [
    'relative',
    'group',
  ],
  {
    variants: {
      orientation: {
        vertical: 'flex gap-4',
        horizontal: 'flex flex-col items-center min-w-[200px]',
      },
    },
  }
);

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dotSize?: 'sm' | 'md' | 'lg';
  active?: boolean;
  status?: 'completed' | 'active' | 'upcoming';
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      date,
      title,
      description,
      icon,
      dotSize = 'md',
      active = false,
      status,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { orientation, agent, variant, showConnectors } = useTimelineContext();

    const agentColors = {
      bigSis: 'bg-cyan-500 border-cyan-500',
      bro: 'bg-orange-500 border-orange-500',
      lilSis: 'bg-purple-500 border-purple-500',
      cbo: 'bg-green-500 border-green-500',
    };

    const dotSizes = {
      sm: 'w-2 h-2',
      md: 'w-4 h-4',
      lg: 'w-6 h-6',
    };

    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    const getStatusStyles = () => {
      if (status === 'completed') return agentColors[agent!];
      if (status === 'active') return `bg-transparent border-2 ${agentColors[agent!].split(' ')[1]}`;
      if (status === 'upcoming') return 'bg-white/20 border-white/20';
      if (active) return agentColors[agent!];
      return 'bg-white/40 border-white/40';
    };

    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ orientation }), className)}
        {...props}
      >
        {/* Connector Line */}
        {showConnectors && (
          <div
            className={cn(
              'absolute',
              orientation === 'vertical' ? [
                'left-2 md:left-5',
                'top-8',
                'w-0.5',
                'h-full',
                '-z-10',
              ] : [
                'top-5',
                'left-8',
                'h-0.5',
                'w-full',
                '-z-10',
              ],
              status === 'completed' || active ? agentColors[agent!].split(' ')[0] : 'bg-white/20'
            )}
          />
        )}

        {/* Timeline Dot/Icon */}
        <div className={cn(
          'relative flex-shrink-0',
          orientation === 'horizontal' && 'mb-4'
        )}>
          {icon ? (
            <div className={cn(
              'flex items-center justify-center',
              'rounded-full',
              'border-2',
              'transition-all duration-[280ms]',
              iconSizes[dotSize],
              getStatusStyles(),
              'group-hover:scale-110'
            )}>
              {icon}
            </div>
          ) : (
            <div className={cn(
              'rounded-full',
              'transition-all duration-[280ms]',
              dotSizes[dotSize],
              getStatusStyles(),
              'group-hover:scale-125'
            )} />
          )}
        </div>

        {/* Content */}
        <div className={cn(
          'flex-1',
          orientation === 'horizontal' && 'text-center'
        )}>
          {variant === 'minimal' ? (
            <>
              {title && (
                <h4 className="font-medium">{title}</h4>
              )}
              {date && (
                <p className="text-sm text-gray-500">{date}</p>
              )}
            </>
          ) : variant === 'detailed' ? (
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 transition-all duration-[280ms] hover:bg-white/10">
              {date && (
                <p className="text-xs text-gray-500 mb-1">{date}</p>
              )}
              {title && (
                <h4 className="font-semibold mb-2">{title}</h4>
              )}
              {description && (
                <p className="text-sm text-gray-400 mb-3">{description}</p>
              )}
              {children}
            </div>
          ) : (
            <>
              {date && (
                <p className="text-sm text-gray-500 mb-1">{date}</p>
              )}
              {title && (
                <h4 className="font-medium mb-1">{title}</h4>
              )}
              {description && (
                <p className="text-sm text-gray-400">{description}</p>
              )}
              {children}
            </>
          )}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';

// Timeline Branch (for parallel events)
export interface TimelineBranchProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const TimelineBranch = forwardRef<HTMLDivElement, TimelineBranchProps>(
  ({ title, className, children, ...props }, ref) => {
    const { agent } = useTimelineContext();

    const agentColors = {
      bigSis: 'border-l-cyan-500',
      bro: 'border-l-orange-500',
      lilSis: 'border-l-purple-500',
      cbo: 'border-l-green-500',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'ml-8 pl-8 border-l-2',
          agentColors[agent!],
          className
        )}
        {...props}
      >
        {title && (
          <h3 className="font-semibold mb-4 -ml-8">
            <span className="bg-black px-2">{title}</span>
          </h3>
        )}
        <div className="space-y-8">
          {children}
        </div>
      </div>
    );
  }
);

TimelineBranch.displayName = 'TimelineBranch';

// Activity Timeline (social media style)
const activityTimelineVariants = cva(
  [
    'relative',
    'space-y-4',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: 'space-y-2',
        card: 'space-y-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ActivityTimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityTimelineVariants> {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const ActivityTimeline = forwardRef<HTMLDivElement, ActivityTimelineProps>(
  ({ variant = 'default', agent = 'bigSis', className, children, ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ agent, variant: variant as any }}>
        <div
          ref={ref}
          className={cn(activityTimelineVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);

ActivityTimeline.displayName = 'ActivityTimeline';

// Activity Item
export interface ActivityItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  avatar?: React.ReactNode;
  author?: string;
  action?: string;
  timestamp?: string;
  content?: React.ReactNode;
  reactions?: Array<{ emoji: string; count: number }>;
}

export const ActivityItem = forwardRef<HTMLDivElement, ActivityItemProps>(
  (
    {
      avatar,
      author,
      action,
      timestamp,
      content,
      reactions,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { agent, variant } = useTimelineContext();

    const agentColors = {
      bigSis: 'text-cyan-400',
      bro: 'text-orange-400',
      lilSis: 'text-purple-400',
      cbo: 'text-green-400',
    };

    if (variant === 'detailed') {
      return (
        <div
          ref={ref}
          className={cn(
            'p-4',
            'bg-white/5',
            'border border-white/20',
            'rounded-lg',
            'transition-all duration-[280ms]',
            'hover:bg-white/10',
            className
          )}
          {...props}
        >
          <div className="flex gap-3">
            {avatar && (
              <div className="flex-shrink-0">
                {avatar}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                {author && (
                  <span className={cn('font-medium', agentColors[agent!])}>
                    {author}
                  </span>
                )}
                {action && (
                  <span className="text-sm text-gray-400">{action}</span>
                )}
                {timestamp && (
                  <span className="text-xs text-gray-500 ml-auto">{timestamp}</span>
                )}
              </div>
              
              {content && (
                <div className="text-sm text-gray-300">
                  {content}
                </div>
              )}
              
              {children}
              
              {reactions && reactions.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-xs hover:bg-white/10 transition-all duration-[280ms]"
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default/Compact variant
    return (
      <div
        ref={ref}
        className={cn('flex gap-3', className)}
        {...props}
      >
        {avatar && (
          <div className="flex-shrink-0">
            {avatar}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            {author && (
              <span className={cn('font-medium', agentColors[agent!])}>
                {author}
              </span>
            )}
            {action && (
              <span className="text-gray-400 ml-1">{action}</span>
            )}
            {timestamp && (
              <span className="text-gray-500 text-xs ml-2">{timestamp}</span>
            )}
          </p>
          
          {(content || children) && (
            <div className="mt-1 text-sm text-gray-300">
              {content}
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ActivityItem.displayName = 'ActivityItem';