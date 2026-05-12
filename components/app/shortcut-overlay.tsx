'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import { useAppContext } from '@/components/context/app-context';

const groups = [
  {
    name: 'Global',
    items: [
      { keys: ['⌘', 'K'], label: 'Open command palette' },
      { keys: ['?'], label: 'Show keyboard shortcuts' },
      { keys: ['Esc'], label: 'Close any overlay' },
    ],
  },
  {
    name: 'Navigation',
    items: [
      { keys: ['G', 'D'], label: 'Go to Dashboard' },
      { keys: ['G', 'B'], label: 'Go to Bookings' },
      { keys: ['G', 'T'], label: 'Go to Tours' },
      { keys: ['G', 'F'], label: 'Go to Finance' },
      { keys: ['G', 'C'], label: 'Go to Channels' },
      { keys: ['G', 'N'], label: 'Go to Network' },
    ],
  },
  {
    name: 'Actions',
    items: [
      { keys: ['N'], label: 'New tour (on Tours page)' },
      { keys: ['R'], label: 'Refresh active panel' },
      { keys: ['/', ''], label: 'Focus search' },
    ],
  },
];

export function ShortcutOverlay() {
  const { shortcutsOpen, setShortcutsOpen } = useAppContext();

  return (
    <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
      <DialogContent className="!max-w-lg !p-0 overflow-hidden" showCloseButton={true}>
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-lg font-display font-bold tracking-tight">Keyboard shortcuts</h2>
          <p className="text-xs text-ink-2 mt-1">Press <Kbd>?</Kbd> anywhere to reopen this panel.</p>
        </div>
        <div className="px-6 pb-6 pt-2 grid gap-6">
          {groups.map((g) => (
            <div key={g.name}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3 mb-3">
                {g.name}
              </div>
              <ul className="space-y-2.5">
                {g.items.map((s) => (
                  <li key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-ink-2">{s.label}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.filter(Boolean).map((k, i) => (
                        <Kbd key={i}>{k}</Kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
