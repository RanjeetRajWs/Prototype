'use client';

import * as React from 'react';
import { Tooltip as Base } from '@base-ui/react/tooltip';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

export function Tooltip({ content, children, side = 'top', delay = 200 }: TooltipProps) {
  return (
    <Base.Provider delay={delay}>
      <Base.Root>
        <Base.Trigger render={<span className="inline-flex" />}>{children}</Base.Trigger>
        <Base.Portal>
          <Base.Positioner side={side} sideOffset={6} className="z-50">
            <Base.Popup
              className={cn(
                'bg-ink text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-lg',
                'pointer-events-none origin-[var(--transform-origin)]',
                'transition-[transform,opacity] duration-150',
                'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
                'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
              )}
            >
              {content}
            </Base.Popup>
          </Base.Positioner>
        </Base.Portal>
      </Base.Root>
    </Base.Provider>
  );
}
