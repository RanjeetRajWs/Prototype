'use client';

import * as React from 'react';
import { Select as Base } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = 'Select…',
  className,
  align = 'start',
}: SelectProps) {
  return (
    <Base.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => {
        if (v !== null) onValueChange?.(v);
      }}
    >
      <Base.Trigger
        className={cn(
          'inline-flex items-center justify-between gap-2 h-10 px-3 rounded-lg',
          'bg-surface border border-border text-sm font-medium text-ink',
          'hover:bg-bg transition-colors outline-none',
          'data-[popup-open]:ring-3 data-[popup-open]:ring-[var(--ring)]',
          className,
        )}
      >
        <Base.Value placeholder={placeholder} />
        <Base.Icon>
          <ChevronDown className="w-4 h-4 text-ink-3" />
        </Base.Icon>
      </Base.Trigger>
      <Base.Portal>
        <Base.Positioner align={align} sideOffset={6} className="z-50">
          <Base.Popup className="bg-surface border border-border rounded-xl shadow-lg p-1 min-w-[var(--anchor-width)] max-h-80 overflow-auto">
            {options.map((opt) => (
              <Base.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium',
                  'cursor-pointer outline-none transition-colors',
                  'data-[highlighted]:bg-bg data-[selected]:text-ink text-ink-2',
                )}
              >
                <Base.ItemText>{opt.label}</Base.ItemText>
                <Base.ItemIndicator>
                  <Check className="w-4 h-4 text-accent" />
                </Base.ItemIndicator>
              </Base.Item>
            ))}
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}
