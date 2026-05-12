'use client';

import React from 'react';
import { Sidebar } from '@/components/app/sidebar';
import { TopBar } from '@/components/app/topbar';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/components/context/app-context';
import { CommandPalette } from '@/components/app/command-palette';
import { ShortcutOverlay } from '@/components/app/shortcut-overlay';

const GO_TO_MAP: Record<string, string> = {
  d: '/app/dashboard',
  b: '/app/bookings',
  t: '/app/tours',
  f: '/app/finance',
  c: '/app/channels',
  n: '/app/network',
  s: '/app/settings',
  r: '/app/reports',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole } = useAppContext();

  // "g d / g b" sequence shortcuts — Linear-style navigation.
  React.useEffect(() => {
    let waitingForSecond = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (inEditable) return;
      const key = e.key.toLowerCase();
      if (waitingForSecond) {
        const href = GO_TO_MAP[key];
        if (href) {
          e.preventDefault();
          router.push(href);
        }
        waitingForSecond = false;
        if (timer) clearTimeout(timer);
        return;
      }
      if (key === 'g') {
        waitingForSecond = true;
        timer = setTimeout(() => {
          waitingForSecond = false;
        }, 800);
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <CommandPalette />
        <ShortcutOverlay />
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Access Guard for Demo */}
              {(pathname.startsWith('/app/team') && !['Admin', 'Manager'].includes(currentRole)) ||
               (pathname.startsWith('/app/finance') && !['Admin', 'Manager'].includes(currentRole)) ||
               (pathname.startsWith('/app/settings') && !['Admin'].includes(currentRole)) ||
               (pathname.startsWith('/app/channels') && !['Admin'].includes(currentRole)) ||
               (pathname.startsWith('/app/whatsapp') && !['Admin', 'Manager'].includes(currentRole)) ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-danger/10 text-danger flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <h2 className="text-2xl font-display font-bold">Access Restricted</h2>
                  <p className="text-ink-2 max-w-xs">Your current role (<strong>{currentRole}</strong>) does not have permission to view this module.</p>
                  <Button variant="outline" className="rounded-xl border-border font-bold">Request Access</Button>
                </div>
              ) : (
                children
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
