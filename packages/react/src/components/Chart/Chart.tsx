import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Chart Container
const chartVariants = cva(
  [
    'relative',
    'w-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/5 border border-white/20 rounded-lg p-4',
        minimal: '',
        card: 'bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6',
      },
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[21/9]',
        auto: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      aspectRatio: 'video',
    },
  }
);

export interface ChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartVariants> {
  title?: string;
  description?: string;
  loading?: boolean;
  error?: string;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const Chart = forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      className,
      variant = 'default',
      aspectRatio = 'video',
      title,
      description,
      loading = false,
      error,
      agent = 'bigSis',
      children,
      ...props
    },
    ref
  ) => {
    const agentColors = {
      bigSis: 'text-cyan-400',
      bro: 'text-orange-400',
      lilSis: 'text-purple-400',
      cbo: 'text-green-400',
    };

    return (
      <div
        ref={ref}
        className={cn(chartVariants({ variant, aspectRatio }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className={cn('text-lg font-semibold', agentColors[agent])}>
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        )}

        <div className="relative w-full h-full min-h-[200px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
              <div className={cn('animate-spin h-8 w-8 border-2 border-current border-r-transparent rounded-full', agentColors[agent])} />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-red-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && children}
        </div>
      </div>
    );
  }
);

Chart.displayName = 'Chart';

// Simple Bar Chart Component
export interface BarChartProps extends Omit<ChartProps, 'children'> {
  data: Array<{ label: string; value: number }>;
  height?: number;
  showValues?: boolean;
  animate?: boolean;
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      height = 300,
      showValues = true,
      animate = true,
      agent = 'bigSis',
      ...chartProps
    },
    ref
  ) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const agentColors = {
      bigSis: 'bg-cyan-500',
      bro: 'bg-orange-500',
      lilSis: 'bg-purple-500',
      cbo: 'bg-green-500',
    };

    return (
      <Chart ref={ref} agent={agent} {...chartProps}>
        <div className="flex items-end justify-between gap-2" style={{ height }}>
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end"
              >
                {showValues && (
                  <span className="text-xs text-gray-400 mb-2">
                    {item.value}
                  </span>
                )}
                <div
                  className={cn(
                    'w-full rounded-t-lg transition-all duration-[560ms] ease-out',
                    agentColors[agent],
                    animate && 'animate-in slide-in-from-bottom'
                  )}
                  style={{
                    height: `${percentage}%`,
                    animationDelay: animate ? `${index * 70}ms` : undefined,
                  }}
                />
                <span className="text-xs text-gray-500 mt-2 text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </Chart>
    );
  }
);

BarChart.displayName = 'BarChart';

// Simple Line Chart Component
export interface LineChartProps extends Omit<ChartProps, 'children'> {
  data: Array<{ x: number; y: number }>;
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  animate?: boolean;
}

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      height = 300,
      showGrid = true,
      showDots = true,
      animate = true,
      agent = 'bigSis',
      ...chartProps
    },
    ref
  ) => {
    const padding = 20;
    const chartWidth = 500; // Default width, would be dynamic in real implementation
    const chartHeight = height - padding * 2;

    const minX = Math.min(...data.map(d => d.x));
    const maxX = Math.max(...data.map(d => d.x));
    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));

    const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * chartWidth;
    const scaleY = (y: number) => chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;

    const pathData = data
      .map((point, index) => {
        const x = scaleX(point.x);
        const y = scaleY(point.y);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const agentColors = {
      bigSis: '#00D4FF',
      bro: '#FF9500',
      lilSis: '#D946EF',
      cbo: '#30D158',
    };

    return (
      <Chart ref={ref} agent={agent} {...chartProps}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="w-full"
        >
          {showGrid && (
            <g className="opacity-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * (chartHeight / 4)}
                  x2={chartWidth}
                  y2={i * (chartHeight / 4)}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * (chartWidth / 4)}
                  y1={0}
                  x2={i * (chartWidth / 4)}
                  y2={chartHeight}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </g>
          )}

          <path
            d={pathData}
            fill="none"
            stroke={agentColors[agent]}
            strokeWidth="2"
            className={cn(
              animate && 'animate-in',
              'stroke-dasharray-[1000] stroke-dashoffset-[1000]',
              'animate-draw-line'
            )}
          />

          {showDots && data.map((point, index) => (
            <circle
              key={index}
              cx={scaleX(point.x)}
              cy={scaleY(point.y)}
              r="4"
              fill={agentColors[agent]}
              className={cn(
                animate && 'animate-in fade-in-0 zoom-in-0',
                'origin-center'
              )}
              style={{
                animationDelay: animate ? `${560 + index * 70}ms` : undefined,
              }}
            />
          ))}
        </svg>
      </Chart>
    );
  }
);

LineChart.displayName = 'LineChart';

// Donut Chart Component
export interface DonutChartProps extends Omit<ChartProps, 'children'> {
  data: Array<{ label: string; value: number; color?: string }>;
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  animate?: boolean;
}

export const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      size = 200,
      thickness = 40,
      showLegend = true,
      animate = true,
      agent = 'bigSis',
      ...chartProps
    },
    ref
  ) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = size / 2;
    const innerRadius = radius - thickness;

    const agentPalette = {
      bigSis: ['#00D4FF', '#00A3CC', '#007299', '#004166'],
      bro: ['#FF9500', '#CC7700', '#995A00', '#663C00'],
      lilSis: ['#D946EF', '#AC38BF', '#7F2A8F', '#531C5F'],
      cbo: ['#30D158', '#26A746', '#1C7D34', '#125322'],
    };

    let cumulativePercentage = 0;

    return (
      <Chart ref={ref} agent={agent} aspectRatio="square" {...chartProps}>
        <div className="flex items-center justify-center gap-8">
          <svg width={size} height={size} className="transform -rotate-90">
            {data.map((segment, index) => {
              const percentage = (segment.value / total) * 100;
              const startAngle = (cumulativePercentage * 360) / 100;
              const endAngle = ((cumulativePercentage + percentage) * 360) / 100;
              cumulativePercentage += percentage;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;

              const x1 = radius + radius * Math.cos(startAngleRad);
              const y1 = radius + radius * Math.sin(startAngleRad);
              const x2 = radius + radius * Math.cos(endAngleRad);
              const y2 = radius + radius * Math.sin(endAngleRad);

              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

              const pathData = [
                `M ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `L ${radius + innerRadius * Math.cos(endAngleRad)} ${radius + innerRadius * Math.sin(endAngleRad)}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${radius + innerRadius * Math.cos(startAngleRad)} ${radius + innerRadius * Math.sin(startAngleRad)}`,
                'Z',
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={segment.color || agentPalette[agent][index % agentPalette[agent].length]}
                  className={cn(
                    animate && 'animate-in scale-in-0',
                    'origin-center transition-all duration-[560ms] ease-out',
                    'hover:opacity-80'
                  )}
                  style={{
                    animationDelay: animate ? `${index * 140}ms` : undefined,
                  }}
                />
              );
            })}
          </svg>

          {showLegend && (
            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.color || agentPalette[agent][index % agentPalette[agent].length],
                    }}
                  />
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium text-gray-300 ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Chart>
    );
  }
);

DonutChart.displayName = 'DonutChart';

// Sparkline Component (mini chart)
export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  width?: number;
  height?: number;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  showArea?: boolean;
}

export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(
  (
    {
      data,
      width = 120,
      height = 40,
      agent = 'bigSis',
      showArea = false,
      className,
      ...props
    },
    ref
  ) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const agentColors = {
      bigSis: '#00D4FF',
      bro: '#FF9500',
      lilSis: '#D946EF',
      cbo: '#30D158',
    };

    return (
      <div ref={ref} className={cn('inline-block', className)} {...props}>
        <svg width={width} height={height}>
          {showArea && (
            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill={agentColors[agent]}
              fillOpacity="0.1"
            />
          )}
          <polyline
            points={points}
            fill="none"
            stroke={agentColors[agent]}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }
);

Sparkline.displayName = 'Sparkline';