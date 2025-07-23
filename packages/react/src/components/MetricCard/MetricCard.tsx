import React, { forwardRef } from 'react';
import { Card, CardContent } from '../Card/Card';
import { Tooltip, TooltipContent } from '../Tooltip/Tooltip';
import { cn } from '../../utils/cn';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  variant?: 'default' | 'compact' | 'detailed';
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
  className?: string;
  onClick?: () => void;
  tooltip?: {
    title?: string;
    description?: string;
  };
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({
    title,
    value,
    change,
    changeLabel,
    subtitle,
    icon,
    agent = 'bigSis',
    variant = 'default',
    trend,
    sparklineData,
    className,
    onClick,
    tooltip,
  }, ref) => {
    // Determine trend from change if not explicitly set
    const actualTrend = trend || (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined);

    // Format change percentage
    const formatChange = (val: number) => {
      const formatted = Math.abs(val).toFixed(1);
      return val > 0 ? `+${formatted}%` : `${formatted}%`;
    };

    // Agent-specific gradient colors for sparklines
    const sparklineGradients = {
      bigSis: 'from-cyan-500/20 to-cyan-500',
      bro: 'from-orange-500/20 to-orange-500',
      lilSis: 'from-purple-500/20 to-purple-500',
      cbo: 'from-green-500/20 to-green-500',
    };

    const renderSparkline = () => {
      if (!sparklineData || sparklineData.length < 2) return null;

      const max = Math.max(...sparklineData);
      const min = Math.min(...sparklineData);
      const range = max - min;
      const height = 32; // 4 * 8px
      const width = 80; // 10 * 8px

      // Create path data
      const pathData = sparklineData
        .map((val, i) => {
          const x = (i / (sparklineData.length - 1)) * width;
          const y = height - ((val - min) / range) * height;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');

      return (
        <svg
          width={width}
          height={height}
          className="ml-auto opacity-80"
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <linearGradient id={`gradient-${agent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={cn('stop-color-current text-transparent', sparklineGradients[agent])} />
              <stop offset="100%" className={cn('stop-color-current', sparklineGradients[agent])} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            fill="none"
            stroke={`url(#gradient-${agent})`}
            strokeWidth="2"
            className={cn(sparklineGradients[agent], 'text-current')}
          />
          <path
            d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
            fill={`url(#gradient-${agent})`}
            opacity="0.1"
          />
        </svg>
      );
    };

    const content = (
      <Card
        ref={ref}
        agent={agent}
        variant={onClick ? 'interactive' : 'default'}
        padding={variant === 'compact' ? 'sm' : 'md'}
        className={cn(
          'min-w-[240px]',
          variant === 'detailed' && 'min-w-[320px]',
          className
        )}
        onClick={onClick}
      >
        <CardContent className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              {icon && (
                <div className={cn(
                  'w-8 h-8', // 32px (8px × 4)
                  'rounded-lg',
                  'flex items-center justify-center',
                  'bg-white/5',
                  {
                    'text-cyan-500': agent === 'bigSis',
                    'text-orange-500': agent === 'bro',
                    'text-purple-500': agent === 'lilSis',
                    'text-green-500': agent === 'cbo',
                  }
                )}>
                  {icon}
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            </div>
            {actualTrend && change !== undefined && (
              <TrendIndicator trend={actualTrend} value={change} />
            )}
          </div>

          {/* Value */}
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex-1">
              <div className={cn(
                'font-semibold',
                variant === 'compact' ? 'text-2xl' : 'text-3xl',
                'text-white',
                'tabular-nums', // Monospace numbers for consistency
              )}>
                {value}
              </div>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            
            {variant === 'detailed' && sparklineData && (
              <div className="flex-shrink-0">
                {renderSparkline()}
              </div>
            )}
          </div>

          {/* Change label */}
          {changeLabel && variant !== 'compact' && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500">{changeLabel}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );

    if (tooltip) {
      return (
        <Tooltip
          content={<TooltipContent {...tooltip} />}
          agent={agent}
          placement="top"
        >
          {content}
        </Tooltip>
      );
    }

    return content;
  }
);

MetricCard.displayName = 'MetricCard';

// Trend indicator component
const TrendIndicator: React.FC<{ trend: 'up' | 'down' | 'neutral'; value: number }> = ({ trend, value }) => {
  const colors = {
    up: 'text-green-500 bg-green-500/10',
    down: 'text-red-500 bg-red-500/10',
    neutral: 'text-gray-500 bg-gray-500/10',
  };

  const icons = {
    up: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    ),
    neutral: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
  };

  return (
    <div className={cn(
      'flex items-center gap-1',
      'px-2 py-1',
      'rounded-md',
      'text-xs font-medium',
      colors[trend]
    )}>
      {icons[trend]}
      <span>{Math.abs(value).toFixed(1)}%</span>
    </div>
  );
};

// Example icon components for common metrics
export const MetricIcons = {
  Revenue: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Performance: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Transactions: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
};