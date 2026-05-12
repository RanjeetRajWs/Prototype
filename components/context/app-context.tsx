'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tenants, Tenant } from '@/lib/mock-data/tenants';

export type Role = 'Admin' | 'Manager' | 'Guide' | 'Promoter' | 'Partner' | 'Traveler';

interface AppContextType {
  currentTenant: Tenant;
  setCurrentTenant: (tenant: Tenant) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  shortcutsOpen: boolean;
  setShortcutsOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_TENANT = 'tes.tenant';
const STORAGE_ROLE = 'tes.role';

function hexToRgb(hex: string) {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function applyBrand(color: string) {
  const root = document.documentElement;
  root.style.setProperty('--brand', color);
  root.style.setProperty('--brand-rgb', hexToRgb(color));
  // Derive a softer hover variant by mixing 10% white.
  root.style.setProperty('--brand-soft', color);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenantState] = useState<Tenant>(tenants[0]);
  const [currentRole, setCurrentRoleState] = useState<Role>('Admin');
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Restore from localStorage on mount.
  useEffect(() => {
    try {
      const tId = localStorage.getItem(STORAGE_TENANT);
      const role = localStorage.getItem(STORAGE_ROLE) as Role | null;
      if (tId) {
        const t = tenants.find(t => t.id === tId);
        if (t) setCurrentTenantState(t);
      }
      if (role) setCurrentRoleState(role);
    } catch {}
  }, []);

  // Sync brand color to :root whenever tenant changes.
  useEffect(() => {
    applyBrand(currentTenant.brandColor);
  }, [currentTenant]);

  const setCurrentTenant = useCallback((t: Tenant) => {
    setCurrentTenantState(t);
    try { localStorage.setItem(STORAGE_TENANT, t.id); } catch {}
  }, []);

  const setCurrentRole = useCallback((r: Role) => {
    setCurrentRoleState(r);
    try { localStorage.setItem(STORAGE_ROLE, r); } catch {}
  }, []);

  // Global keyboard shortcuts.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }
      if (!inEditable && e.key === '?') {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setShortcutsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentTenant,
        setCurrentTenant,
        currentRole,
        setCurrentRole,
        commandOpen,
        setCommandOpen,
        shortcutsOpen,
        setShortcutsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
