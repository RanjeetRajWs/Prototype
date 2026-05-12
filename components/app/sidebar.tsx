'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Map,
  Users,
  Wallet,
  Cable,
  Globe,
  MessageSquare,
  BarChart3,
  Settings,
  ClipboardCheck,
  Megaphone,
  Compass,
  Smartphone,
} from 'lucide-react';
import { useAppContext } from '@/components/context/app-context';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Guide', 'Promoter', 'Partner'] },
  { name: 'Run sheet', href: '/app/manager', icon: ClipboardCheck, roles: ['Manager'] },
  { name: 'My sales', href: '/app/promoter', icon: Megaphone, roles: ['Promoter'] },
  { name: 'My tours', href: '/app/guide', icon: Compass, roles: ['Guide'] },
  { name: 'My trips', href: '/app/traveler', icon: Smartphone, roles: ['Traveler'] },
  { name: 'Bookings', href: '/app/bookings', icon: CalendarDays, roles: ['Admin', 'Manager', 'Guide'] },
  { name: 'Tours', href: '/app/tours', icon: Map, roles: ['Admin', 'Manager', 'Guide'] },
  { name: 'Team', href: '/app/team', icon: Users, roles: ['Admin', 'Manager'] },
  { name: 'Finance', href: '/app/finance', icon: Wallet, roles: ['Admin', 'Manager'] },
  { name: 'Channels', href: '/app/channels', icon: Cable, roles: ['Admin'] },
  { name: 'Network', href: '/app/network', icon: Globe, roles: ['Admin', 'Promoter', 'Partner'] },
  { name: 'WhatsApp', href: '/app/whatsapp', icon: MessageSquare, roles: ['Admin', 'Manager'] },
  { name: 'Reports', href: '/app/reports', icon: BarChart3, roles: ['Admin', 'Manager'] },
  { name: 'Settings', href: '/app/settings', icon: Settings, roles: ['Admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentTenant, currentRole } = useAppContext();

  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">
          {currentTenant.name.charAt(0)}
        </div>
        <span className="font-display font-semibold text-lg tracking-tight">
          {currentTenant.name}
        </span>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-brand text-white" 
                  : "text-ink-2 hover:bg-bg hover:text-ink"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-accent font-bold">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Petr Novak</span>
            <span className="text-xs text-ink-2 uppercase tracking-wider font-bold">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
