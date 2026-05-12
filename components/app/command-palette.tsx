'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppContext } from '@/components/context/app-context';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  CalendarDays,
  Map,
  Users,
  Wallet,
  Cable,
  Globe,
  MessageSquare,
  BarChart3,
  Settings as SettingsIcon,
  Building2,
  UserCog,
} from 'lucide-react';
import { tenants } from '@/lib/mock-data/tenants';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

type Cmd =
  | { kind: 'nav'; label: string; href: string; icon: React.ComponentType<{ className?: string }>; group: string }
  | { kind: 'tenant'; tenantId: string; label: string; group: string }
  | { kind: 'role'; role: 'Admin' | 'Manager' | 'Guide' | 'Promoter' | 'Partner' | 'Traveler'; label: string; group: string };

const NAV: Cmd[] = [
  { kind: 'nav', label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard, group: 'Navigation' },
  { kind: 'nav', label: 'Bookings', href: '/app/bookings', icon: CalendarDays, group: 'Navigation' },
  { kind: 'nav', label: 'Tours', href: '/app/tours', icon: Map, group: 'Navigation' },
  { kind: 'nav', label: 'Team', href: '/app/team', icon: Users, group: 'Navigation' },
  { kind: 'nav', label: 'Finance', href: '/app/finance', icon: Wallet, group: 'Navigation' },
  { kind: 'nav', label: 'OTA Channels', href: '/app/channels', icon: Cable, group: 'Navigation' },
  { kind: 'nav', label: 'Partner Network', href: '/app/network', icon: Globe, group: 'Navigation' },
  { kind: 'nav', label: 'WhatsApp Builder', href: '/app/whatsapp', icon: MessageSquare, group: 'Navigation' },
  { kind: 'nav', label: 'Reports', href: '/app/reports', icon: BarChart3, group: 'Navigation' },
  { kind: 'nav', label: 'Settings', href: '/app/settings', icon: SettingsIcon, group: 'Navigation' },
];

const ROLE_TARGETS: Record<string, string> = {
  Admin: '/app/dashboard',
  Manager: '/app/manager',
  Guide: '/app/guide',
  Promoter: '/app/promoter',
  Partner: '/app/network',
  Traveler: '/app/traveler',
};

export function CommandPalette() {
  const { commandOpen, setCommandOpen, setCurrentTenant, setCurrentRole } = useAppContext();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!commandOpen) {
      setQuery('');
      setActive(0);
    }
  }, [commandOpen]);

  const commands: Cmd[] = useMemo(() => {
    return [
      ...NAV,
      ...tenants.map<Cmd>((t) => ({
        kind: 'tenant',
        tenantId: t.id,
        label: `Switch tenant: ${t.name}`,
        group: 'Tenants',
      })),
      ...(['Admin', 'Manager', 'Guide', 'Promoter', 'Partner', 'Traveler'] as const).map<Cmd>((r) => ({
        kind: 'role',
        role: r,
        label: `View as ${r}`,
        group: 'Roles',
      })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, commands]);

  const runCommand = (c: Cmd) => {
    setCommandOpen(false);
    if (c.kind === 'nav') {
      router.push(c.href);
    } else if (c.kind === 'tenant') {
      const t = tenants.find((x) => x.id === c.tenantId);
      if (t) setCurrentTenant(t);
    } else if (c.kind === 'role') {
      setCurrentRole(c.role);
      router.push(ROLE_TARGETS[c.role]);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) runCommand(cmd);
    }
  };

  // Group commands by their group label, preserving order.
  const groups: { name: string; items: Cmd[] }[] = [];
  for (const c of filtered) {
    let g = groups.find((x) => x.name === c.group);
    if (!g) {
      g = { name: c.group, items: [] };
      groups.push(g);
    }
    g.items.push(c);
  }

  // Compute global index used for highlight
  let runningIndex = -1;

  return (
    <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
      <DialogContent
        className="!max-w-xl !p-0 !gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
          <Search className="w-4 h-4 text-ink-3" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKey}
            placeholder="Jump to anywhere — search bookings, tours, settings…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-3"
          />
          <Kbd>esc</Kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-1">
          {groups.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-ink-3">
              No matches. Try “bookings”, “Budapest”, or “Guide”.
            </div>
          )}
          {groups.map((g) => (
            <div key={g.name} className="py-1">
              <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                {g.name}
              </div>
              {g.items.map((c) => {
                runningIndex += 1;
                const isActive = runningIndex === active;
                const Icon =
                  c.kind === 'nav'
                    ? c.icon
                    : c.kind === 'tenant'
                      ? Building2
                      : UserCog;
                return (
                  <button
                    key={c.kind + ':' + c.label}
                    type="button"
                    onMouseEnter={() => setActive(runningIndex)}
                    onClick={() => runCommand(c)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-left',
                      isActive ? 'bg-bg text-ink' : 'text-ink-2 hover:bg-bg',
                    )}
                  >
                    <Icon className="w-4 h-4 text-ink-3" />
                    <span className="flex-1">{c.label}</span>
                    {isActive && <Kbd>↵</Kbd>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-border bg-bg/60 px-4 h-9 text-[10px] font-medium text-ink-3">
          <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> select</span>
          <span className="flex items-center gap-1.5"><Kbd>?</Kbd> all shortcuts</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
