import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Calendar Component
const calendarVariants = cva(
  [
    'w-[320px]',
    'p-3',
    'bg-black/60',
    'backdrop-blur-sm',
    'border border-white/20',
    'rounded-xl',
  ],
  {
    variants: {
      agent: {
        bigSis: 'focus-within:border-cyan-500/50',
        bro: 'focus-within:border-orange-500/50',
        lilSis: 'focus-within:border-purple-500/50',
        cbo: 'focus-within:border-green-500/50',
      },
    },
    defaultVariants: {
      agent: 'bigSis',
    },
  }
);

export interface CalendarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calendarVariants> {
  value?: Date;
  onValueChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Array<{ date: Date; color?: string }>;
  showWeekNumbers?: boolean;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      onValueChange,
      minDate,
      maxDate,
      disabledDates = [],
      highlightedDates = [],
      showWeekNumbers = false,
      agent = 'bigSis',
      className,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(
      value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
    );
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

    const agentColors = {
      bigSis: 'bg-cyan-500 text-white',
      bro: 'bg-orange-500 text-white',
      lilSis: 'bg-purple-500 text-white',
      cbo: 'bg-green-500 text-white',
    };

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getWeekNumber = (date: Date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some(d => 
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    };

    const isDateHighlighted = (date: Date) => {
      return highlightedDates.find(h => 
        h.date.getDate() === date.getDate() &&
        h.date.getMonth() === date.getMonth() &&
        h.date.getFullYear() === date.getFullYear()
      );
    };

    const handleDateClick = (date: Date) => {
      if (!isDateDisabled(date)) {
        setSelectedDate(date);
        onValueChange?.(date);
      }
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
        return newMonth;
      });
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const renderDays = () => {
      const days = [];
      
      // Empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isSelected = selectedDate && 
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getFullYear() === currentMonth.getFullYear();
        const isToday = new Date().toDateString() === date.toDateString();
        const isDisabled = isDateDisabled(date);
        const highlighted = isDateHighlighted(date);

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => handleDateClick(date)}
            disabled={isDisabled}
            className={cn(
              'h-10 w-10',
              'rounded-lg',
              'flex items-center justify-center',
              'text-sm font-medium',
              'transition-all duration-[280ms]',
              'relative',
              isDisabled && 'opacity-50 cursor-not-allowed',
              !isDisabled && !isSelected && 'hover:bg-white/10',
              isSelected && agent && agentColors[agent],
              isToday && !isSelected && 'border border-current',
              highlighted && !isSelected && 'ring-2 ring-offset-2 ring-offset-black',
              highlighted && `ring-${highlighted.color || 'cyan'}-500`
            )}
          >
            {day}
          </button>
        );
      }

      return days;
    };

    return (
      <div
        ref={ref}
        className={cn(calendarVariants({ agent }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-[280ms]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-sm font-semibold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-[280ms]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Week days */}
        <div className={cn(
          'grid gap-1 mb-2',
          showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'
        )}>
          {showWeekNumbers && <div className="h-8 w-10" />}
          {weekDays.map(day => (
            <div
              key={day}
              className="h-8 w-10 flex items-center justify-center text-xs text-gray-500 font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className={cn(
          'grid gap-1',
          showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'
        )}>
          {showWeekNumbers && (
            <div className="text-xs text-gray-500 h-10 w-10 flex items-center justify-center">
              {getWeekNumber(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))}
            </div>
          )}
          {renderDays()}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

// DatePicker Component
const datePickerVariants = cva(
  [
    'relative',
    'w-full',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Select date',
      format = 'MM/DD/YYYY',
      minDate,
      maxDate,
      disabledDates,
      size = 'md',
      agent = 'bigSis',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const agentColors = {
      bigSis: 'focus:border-cyan-500 focus:ring-cyan-500/50',
      bro: 'focus:border-orange-500 focus:ring-orange-500/50',
      lilSis: 'focus:border-purple-500 focus:ring-purple-500/50',
      cbo: 'focus:border-green-500 focus:ring-green-500/50',
    };

    useEffect(() => {
      if (value) {
        const formatted = formatDate(value, format);
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    }, [value, format]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date: Date, formatStr: string) => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      return formatStr
        .replace('MM', month)
        .replace('DD', day)
        .replace('YYYY', String(year))
        .replace('YY', String(year).slice(-2));
    };

    const parseDate = (value: string, formatStr: string) => {
      const formatParts = formatStr.split(/[^MDY]+/);
      const valueParts = value.split(/\D+/);

      if (formatParts.length !== valueParts.length) return null;

      let day = 1, month = 0, year = new Date().getFullYear();

      formatParts.forEach((part, index) => {
        const val = parseInt(valueParts[index], 10);
        if (part.includes('D')) day = val;
        if (part.includes('M')) month = val - 1;
        if (part.includes('Y')) year = part.length === 4 ? val : 2000 + val;
      });

      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const parsed = parseDate(value, format);
      if (parsed) {
        onValueChange?.(parsed);
      }
    };

    const handleCalendarChange = (date: Date) => {
      onValueChange?.(date);
      setIsOpen(false);
    };

    const handleClear = () => {
      setInputValue('');
      onValueChange?.(undefined);
    };

    return (
      <div ref={containerRef} className={cn(datePickerVariants({ size }), className)}>
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn(
              'w-full',
              'px-3 py-2 pr-20',
              'bg-white/5',
              'border border-white/20',
              'rounded-lg',
              'placeholder:text-gray-500',
              'transition-all duration-[280ms]',
              'focus:outline-none focus:ring-2',
              agent && agentColors[agent],
              size === 'sm' && 'text-sm px-2.5 py-1.5',
              size === 'lg' && 'text-lg px-4 py-3'
            )}
            onClick={() => setIsOpen(true)}
            {...props}
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded hover:bg-white/10 transition-all duration-[280ms]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded hover:bg-white/10 transition-all duration-[280ms]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            <Calendar
              value={value}
              onValueChange={handleCalendarChange}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              agent={agent}
            />
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// DateRangePicker Component
export interface DateRange {
  start?: Date;
  end?: Date;
}

export interface DateRangePickerProps
  extends Omit<DatePickerProps, 'value' | 'onValueChange'> {
  value?: DateRange;
  onValueChange?: (range: DateRange) => void;
  showTwoMonths?: boolean;
}

export const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Select date range',
      format = 'MM/DD/YYYY',
      showTwoMonths = true,
      size = 'md',
      agent = 'bigSis',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tempRange, setTempRange] = useState<DateRange>({ start: value?.start, end: value?.end });
    const containerRef = useRef<HTMLDivElement>(null);

    const agentColors = {
      bigSis: 'focus:border-cyan-500 focus:ring-cyan-500/50',
      bro: 'focus:border-orange-500 focus:ring-orange-500/50',
      lilSis: 'focus:border-purple-500 focus:ring-purple-500/50',
      cbo: 'focus:border-green-500 focus:ring-green-500/50',
    };

    useEffect(() => {
      if (value?.start && value?.end) {
        const formatted = `${formatDate(value.start, format)} - ${formatDate(value.end, format)}`;
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    }, [value, format]);

    const formatDate = (date: Date, formatStr: string) => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      return formatStr
        .replace('MM', month)
        .replace('DD', day)
        .replace('YYYY', String(year))
        .replace('YY', String(year).slice(-2));
    };

    const handleDateSelect = (date: Date) => {
      if (!tempRange.start || (tempRange.start && tempRange.end)) {
        setTempRange({ start: date, end: undefined });
      } else {
        const range = date < tempRange.start 
          ? { start: date, end: tempRange.start }
          : { start: tempRange.start, end: date };
        
        setTempRange(range);
        onValueChange?.(range);
        setIsOpen(false);
      }
    };

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={inputValue}
            readOnly
            placeholder={placeholder}
            className={cn(
              'w-full',
              'px-3 py-2 pr-10',
              'bg-white/5',
              'border border-white/20',
              'rounded-lg',
              'placeholder:text-gray-500',
              'cursor-pointer',
              'transition-all duration-[280ms]',
              'focus:outline-none focus:ring-2',
              agent && agentColors[agent]
            )}
            onClick={() => setIsOpen(true)}
            {...props}
          />
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-all duration-[280ms]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className={cn(
            'absolute z-50 mt-2',
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
            showTwoMonths && 'flex gap-4'
          )}>
            <Calendar
              value={tempRange.start}
              onValueChange={handleDateSelect}
              agent={agent}
            />
            {showTwoMonths && (
              <Calendar
                value={tempRange.end}
                onValueChange={handleDateSelect}
                agent={agent}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';