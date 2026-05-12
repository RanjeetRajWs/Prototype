'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isBefore,
  format,
} from 'date-fns';
import { NOW } from '@/lib/now';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected?: Date;
  onSelect?: (d: Date) => void;
  minDate?: Date;
  className?: string;
}

export function Calendar({ selected, onSelect, minDate = NOW, className }: CalendarProps) {
  const [view, setView] = React.useState(() => startOfMonth(selected ?? NOW));
  const start = startOfWeek(startOfMonth(view), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(view), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div className={cn('select-none p-3 bg-surface border border-border rounded-xl', className)}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setView(addMonths(view, -1))}
          className="w-7 h-7 rounded-md hover:bg-bg flex items-center justify-center text-ink-2"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-semibold">{format(view, 'MMMM yyyy')}</div>
        <button
          type="button"
          onClick={() => setView(addMonths(view, 1))}
          className="w-7 h-7 rounded-md hover:bg-bg flex items-center justify-center text-ink-2"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((w) => (
          <div key={w} className="text-[10px] font-bold text-ink-3 text-center uppercase tracking-widest">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const inMonth = isSameMonth(d, view);
          const isSelected = selected && isSameDay(d, selected);
          const isPast = isBefore(d, minDate) && !isSameDay(d, minDate);
          const isToday = isSameDay(d, NOW);
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect?.(d)}
              className={cn(
                'h-9 rounded-md text-sm font-medium transition-colors',
                isSelected
                  ? 'bg-accent text-white'
                  : isToday
                    ? 'bg-accent-soft text-accent font-bold'
                    : inMonth
                      ? 'text-ink hover:bg-bg'
                      : 'text-ink-3 hover:bg-bg',
                isPast && 'opacity-30 cursor-not-allowed line-through',
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
