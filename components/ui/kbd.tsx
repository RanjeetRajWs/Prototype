import * as React from 'react';
import { cn } from '@/lib/utils';

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded',
        'bg-bg border border-border text-[10px] font-mono font-semibold text-ink-2',
        'shadow-[inset_0_-1px_0_var(--border)]',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
