'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-display font-bold text-xl tracking-tight">TravelEcosystem</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/tours" className="text-sm font-medium text-ink-2 hover:text-ink transition-colors">Tours</Link>
          <Link href="/cities" className="text-sm font-medium text-ink-2 hover:text-ink transition-colors">Cities</Link>
          <Link href="/agencies" className="text-sm font-medium text-ink-2 hover:text-ink transition-colors">For Agencies</Link>
          <Link href="/about" className="text-sm font-medium text-ink-2 hover:text-ink transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/app">
            <Button>Launch App</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
