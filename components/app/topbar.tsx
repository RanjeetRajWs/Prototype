'use client';

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/context/app-context';
import { tenants } from '@/lib/mock-data/tenants';
import { Kbd } from '@/components/ui/kbd';

const roleLanding: Record<string, string> = {
  Admin: '/app/dashboard',
  Manager: '/app/manager',
  Guide: '/app/guide',
  Promoter: '/app/promoter',
  Partner: '/app/network',
  Traveler: '/app/traveler',
};

export function TopBar() {
  const { currentTenant, setCurrentTenant, currentRole, setCurrentRole, setCommandOpen } = useAppContext();
  const router = useRouter();
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        {/* Tenant Switcher */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-bg transition-colors">
            <span className="text-sm font-semibold">{currentTenant.name}</span>
            <ChevronDown className="w-4 h-4 text-ink-3" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-56 bg-surface border border-border rounded-lg shadow-subtle opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {tenants.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => setCurrentTenant(tenant)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-bg transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
              >
                {tenant.name}
                {currentTenant.id === tenant.id && <div className="w-2 h-2 rounded-full bg-accent" />}
              </button>
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Command palette trigger */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="flex items-center gap-2 pl-3 pr-2 h-9 bg-bg hover:bg-bg/70 border border-border rounded-md text-sm text-ink-3 transition-colors w-72 text-left"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1">Search or jump to…</span>
          <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>K</Kbd>
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-3 font-medium">View as:</span>
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-accent-soft text-accent rounded-md text-xs font-bold uppercase tracking-wider">
              {currentRole}
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full right-0 mt-1 w-40 bg-surface border border-border rounded-lg shadow-subtle opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {['Admin', 'Manager', 'Guide', 'Promoter', 'Partner', 'Traveler'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentRole(role as any);
                    const target = roleLanding[role];
                    if (target) router.push(target);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-bg transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-ink-2 hover:bg-bg rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-surface" />
          </button>
          <div className="w-8 h-8 rounded-full bg-brand-soft" />
        </div>
      </div>
    </header>
  );
}
