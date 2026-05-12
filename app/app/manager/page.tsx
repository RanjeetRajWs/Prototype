'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bookings } from '@/lib/mock-data/bookings';
import { tours } from '@/lib/mock-data/tours';
import { users } from '@/lib/mock-data/users';
import {
  ListChecks,
  AlertTriangle,
  Calendar,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  PhoneCall,
  RefreshCcw,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ManagerDashboard() {
  const today = new Date();
  const todayBookings = bookings
    .filter((b) => b.date.toDateString() === today.toDateString())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const tomorrowBookings = bookings
    .filter((b) => {
      const d = new Date(today);
      d.setDate(d.getDate() + 1);
      return b.date.toDateString() === d.toDateString();
    });

  const issues = bookings.filter((b) => b.status === 'Pending').slice(0, 5);
  const guides = users.filter((u) => u.role === 'Guide' && u.status === 'Active');

  const [resolved, setResolved] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  function tourName(id: string) {
    return tours.find((t) => t.id === id)?.name ?? 'Tour';
  }

  function guideName(id: string) {
    return users.find((u) => u.id === id)?.name ?? '—';
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Operations refreshed', { description: 'Live data synced from all channels.' });
    }, 1200);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-3 uppercase tracking-widest mb-1">
            Operations · Manager view
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Today, {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</h1>
          <p className="text-ink-2 mt-1">
            {todayBookings.length} tours running · {guides.length} guides on shift · {issues.length} items need attention
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="rounded-xl font-bold gap-2">
          {refreshing ? (
            <>
              <span className="size-4 border-2 border-ink-3/30 border-t-ink rounded-full animate-spin" />
              Refreshing
            </>
          ) : (
            <>
              <RefreshCcw className="w-4 h-4" /> Refresh ops
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Today's tours", value: todayBookings.length, icon: Calendar, tone: 'bg-accent-soft text-accent' },
          { label: 'Guides on shift', value: guides.length, icon: Users, tone: 'bg-success/10 text-success' },
          { label: 'Action items', value: issues.length, icon: AlertTriangle, tone: 'bg-warning/10 text-warning' },
          { label: 'Tomorrow scheduled', value: tomorrowBookings.length, icon: ListChecks, tone: 'bg-brand/10 text-brand' },
        ].map((k) => (
          <Card key={k.label} className="border-border shadow-subtle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.tone}`}>
                  <k.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-3" />
              </div>
              <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">{k.label}</div>
              <div className="text-3xl font-display font-bold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-subtle">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold">Today&apos;s run sheet</h2>
              <span className="text-xs font-bold text-ink-3 uppercase tracking-widest">
                {todayBookings.length} tours scheduled
              </span>
            </div>
            {todayBookings.length === 0 ? (
              <div className="text-sm text-ink-3 py-12 text-center">No tours scheduled today.</div>
            ) : (
              <div className="space-y-4">
                {todayBookings.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-bg/60 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-xl font-display font-bold tabular-nums">{b.time}</div>
                      <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">CET</div>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-ink truncate">{tourName(b.tourId)}</div>
                      <div className="text-xs text-ink-2 mt-0.5 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {b.pax} pax</span>
                        <span>Guide: {guideName(b.guideId)}</span>
                        <span className="font-bold text-ink-3">{b.id}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        b.status === 'Confirmed'
                          ? 'bg-success/10 text-success'
                          : b.status === 'Pending'
                          ? 'bg-warning/10 text-warning'
                          : b.status === 'Cancelled'
                          ? 'bg-danger/10 text-danger'
                          : 'bg-bg text-ink-2'
                      }`}
                    >
                      {b.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border shadow-subtle">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold">Needs follow-up</h2>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            {issues.length === 0 ? (
              <p className="text-sm text-ink-3">Nothing to chase. Great job!</p>
            ) : (
              <ul className="space-y-3">
                {issues.map((b) => (
                  <li
                    key={b.id}
                    className={`p-4 rounded-xl border transition-all ${
                      resolved.includes(b.id) ? 'border-success/30 bg-success/5 opacity-60' : 'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate">{tourName(b.tourId)}</div>
                        <div className="text-xs text-ink-3 mt-0.5">
                          {b.travelerName} · {b.pax} pax · {b.source}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setResolved((prev) =>
                            prev.includes(b.id) ? prev.filter((x) => x !== b.id) : [...prev, b.id]
                          );
                        }}
                        className={`size-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                          resolved.includes(b.id)
                            ? 'bg-success border-success text-white'
                            : 'border-border hover:border-success'
                        }`}
                      >
                        {resolved.includes(b.id) && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm" className="text-xs rounded-lg gap-1">
                        <PhoneCall className="w-3 h-3" /> Call
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs rounded-lg">
                        Reassign
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-subtle">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold">Guides on shift</h2>
            <span className="text-xs font-bold text-ink-3 uppercase tracking-widest">
              {guides.length} active
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.slice(0, 6).map((g) => (
              <div key={g.id} className="flex items-center gap-3 p-4 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-bg shrink-0">
                  <img src={g.avatar} alt={g.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{g.name}</div>
                  <div className="text-xs text-ink-3 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> 2 tours today
                  </div>
                </div>
                <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">
                  {g.languages.join(' · ').toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
