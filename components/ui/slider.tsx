'use client';

import * as React from 'react';
import { Slider as Base } from '@base-ui/react/slider';
import { cn } from '@/lib/utils';

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (v: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({
  value,
  defaultValue = [0, 100],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  return (
    <Base.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v as number[])}
      min={min}
      max={max}
      step={step}
      className={cn('relative w-full select-none touch-none flex items-center', className)}
    >
      <Base.Control className="relative w-full h-5 flex items-center">
        <Base.Track className="relative w-full h-1.5 rounded-full bg-bg border border-border">
          <Base.Indicator className="absolute h-full rounded-full bg-accent" />
        </Base.Track>
        <Base.Thumb className="absolute -translate-x-1/2 w-5 h-5 rounded-full bg-surface border-2 border-accent shadow-md transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-[var(--ring)] outline-none" />
        <Base.Thumb className="absolute -translate-x-1/2 w-5 h-5 rounded-full bg-surface border-2 border-accent shadow-md transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-[var(--ring)] outline-none" />
      </Base.Control>
    </Base.Root>
  );
}
