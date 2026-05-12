'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Eye, Wrench } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';

interface DemoStep {
  n: number;
  title: string;
  href: string;
  why: string;
}

const steps: DemoStep[] = [
  { n: 1,  title: 'Marketing homepage', href: '/', why: 'Editorial hero. Compare against the competitor opening shot.' },
  { n: 2,  title: 'Tour catalog', href: '/tours', why: 'Filters: city, date, pax, language pills, price range.' },
  { n: 3,  title: 'Tour detail — booking widget', href: '/tours/old-town-astronomical-clock', why: 'Inline calendar, deterministic NOW dates, gallery.' },
  { n: 4,  title: 'Checkout flow', href: '/checkout?slug=old-town-astronomical-clock&pax=2', why: 'Real tour name and price carry through the funnel.' },
  { n: 5,  title: 'Checkout success + confetti', href: '/checkout/success', why: 'Canvas confetti burst on entry. No dependency.' },
  { n: 6,  title: 'App dashboard', href: '/app/dashboard', why: 'KPI row, activity feed, 30-day chart.' },
  { n: 7,  title: 'Bookings table', href: '/app/bookings', why: 'Row click → side drawer with full reservation.' },
  { n: 8,  title: 'OTA channels (live sync)', href: '/app/channels', why: 'Click "Sync now" — spinner → "just now" timestamp.' },
  { n: 9,  title: 'WhatsApp builder canvas', href: '/app/whatsapp', why: 'Three connected nodes, selectable.' },
  { n: 10, title: 'Settings — branding', href: '/app/settings', why: 'Brand color picker mutates --brand on :root in real time.' },
  { n: 11, title: 'Guide mobile view', href: '/app/guide', why: 'Check-in flow, QR, earnings line.' },
  { n: 12, title: 'Traveler mobile view', href: '/app/traveler', why: 'Phone-framed booking with cross-sell card.' },
];

const interactions = [
  { label: 'Open command palette', keys: ['⌘', 'K'] },
  { label: 'Show keyboard shortcuts', keys: ['?'] },
  { label: 'Jump to dashboard', keys: ['G', 'D'] },
  { label: 'Jump to bookings', keys: ['G', 'B'] },
];

export default function DemoScript() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3">
              Hidden — not linked from the app
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tight">Live demo script</h1>
          </div>
        </div>
        <p className="text-ink-2 text-sm mb-10 max-w-prose">
          A one-screen runbook for the presenter. Each row deep-links to the moment you want to land on.
          Aim for ~25 minutes; the founder will steer.
        </p>

        <section className="surface-card p-6 mb-8">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3 mb-4 flex items-center gap-2">
            <Eye className="w-3 h-3" /> Walkthrough sequence
          </div>
          <ol className="space-y-3">
            {steps.map((s) => (
              <li key={s.n}>
                <Link
                  href={s.href}
                  className="flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-bg/50 transition-colors group"
                >
                  <span className="w-7 h-7 rounded-md bg-bg border border-border text-[11px] font-bold flex items-center justify-center text-ink-2 shrink-0">
                    {s.n.toString().padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm group-hover:text-ink">{s.title}</span>
                    <span className="block text-xs text-ink-2 mt-0.5">{s.why}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-accent transition-colors mt-2" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="surface-card p-6 mb-8">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3 mb-4 flex items-center gap-2">
            <Wrench className="w-3 h-3" /> Live interactions to demo
          </div>
          <ul className="space-y-3">
            {interactions.map((i) => (
              <li key={i.label} className="flex items-center justify-between text-sm">
                <span className="text-ink-2">{i.label}</span>
                <span className="flex items-center gap-1">
                  {i.keys.map((k) => (
                    <Kbd key={k}>{k}</Kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-ink-3 font-medium">
          Reach this page directly at <code className="bg-bg px-1.5 py-0.5 rounded text-ink-2">/demo</code>.
          It is not linked from any nav and is safe to leave shipped.
        </p>
      </div>
    </div>
  );
}
