'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tours } from '@/lib/mock-data/tours';
import {
  QrCode,
  Download,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  Star,
  Copy,
  ArrowUpRight,
  Trophy,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const earningsTrend = [
  { day: 'Mon', amount: 38 },
  { day: 'Tue', amount: 54 },
  { day: 'Wed', amount: 42 },
  { day: 'Thu', amount: 66 },
  { day: 'Fri', amount: 78 },
  { day: 'Sat', amount: 92 },
  { day: 'Sun', amount: 70 },
];

const referrals = [
  { name: 'Sophia Müller', tour: 'Old Town Walking Tour', date: 'Today', commission: 5.0, status: 'Confirmed' },
  { name: 'Marco Bianchi', tour: 'Beer & Bohemia Pub Tour', date: 'Today', commission: 9.0, status: 'Confirmed' },
  { name: 'Henri Dupont', tour: 'Prague Castle & Lesser Town', date: 'Yesterday', commission: 7.0, status: 'Confirmed' },
  { name: 'Aiko Tanaka', tour: 'Czech Food & Drink Tasting', date: '2 days ago', commission: 11.0, status: 'Paid' },
  { name: 'Carlos Rivera', tour: 'Vltava River Cruise', date: '3 days ago', commission: 3.6, status: 'Paid' },
];

export default function PromoterDashboard() {
  const featured = tours.filter((t) => t.status === 'Active').slice(0, 6);
  const [copied, setCopied] = useState<string | null>(null);

  function copyLink(slug: string) {
    const link = `https://book.unitedworld.eu/tours/${slug}?ref=SOFIA345`;
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(slug);
    toast.success('Affiliate link copied');
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-3 uppercase tracking-widest mb-1">
            Sales · Promoter view
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Hola, Sofia</h1>
          <p className="text-ink-2 mt-1">You earned €420 this month — your best run yet. Keep going!</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Share2 className="w-4 h-4" /> Share my profile
          </Button>
          <Button className="bg-accent hover:bg-accent/90 rounded-xl font-bold gap-2">
            <Download className="w-4 h-4" /> Download QR pack
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'This month', value: '€420', sub: '+€86 vs last', icon: Wallet, tone: 'bg-success/10 text-success' },
          { label: 'Referrals', value: '32', sub: '7 this week', icon: Users, tone: 'bg-accent-soft text-accent' },
          { label: 'Conversion', value: '18%', sub: '+3 pts', icon: TrendingUp, tone: 'bg-brand/10 text-brand' },
          { label: 'Promoter rank', value: '#3', sub: 'in Prague', icon: Trophy, tone: 'bg-warning/10 text-warning' },
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
              <div className="text-xs text-ink-2 mt-1">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-subtle">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-display font-bold">Earnings trend</h2>
                <p className="text-sm text-ink-2">Last 7 days commission</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold">€440</div>
                <div className="text-xs text-ink-3 font-bold uppercase tracking-widest">Week total</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsTrend}>
                  <XAxis dataKey="day" stroke="var(--ink-3)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--ink-3)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'var(--accent)' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-subtle">
          <CardContent className="p-8 text-center">
            <h3 className="font-display font-bold text-lg mb-2">Your affiliate QR</h3>
            <p className="text-sm text-ink-2 mb-6">Print, share, or display this on a stand.</p>
            <div className="w-44 h-44 bg-bg border border-border rounded-3xl mx-auto mb-5 flex items-center justify-center p-4">
              <QrCode className="w-full h-full text-brand" />
            </div>
            <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-4">
              REF · SOFIA345
            </div>
            <Button variant="outline" className="w-full font-bold border-border h-11 rounded-xl gap-2">
              <Download className="w-4 h-4" /> Download QR
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-subtle">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-bold">Tours to promote</h2>
              <p className="text-sm text-ink-2">Higher-margin tours pinned for you this week.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((tour) => (
              <div key={tour.id} className="rounded-2xl border border-border overflow-hidden bg-surface group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">
                    {tour.city} · {tour.duration}
                  </div>
                  <div className="font-display font-bold leading-snug line-clamp-2 min-h-[3rem]">{tour.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-ink-2">
                      <Star className="w-3.5 h-3.5 text-warning fill-current" /> {tour.rating}
                    </div>
                    <div className="text-sm font-bold text-success">
                      Earn €{(tour.basePrice * 0.18).toFixed(2)} / pax
                    </div>
                  </div>
                  <Button
                    onClick={() => copyLink(tour.slug)}
                    variant="outline"
                    className="w-full rounded-xl font-bold gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied === tour.slug ? 'Copied!' : 'Copy affiliate link'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-subtle">
        <CardContent className="p-8">
          <h2 className="text-lg font-display font-bold mb-6">Recent referrals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-bold text-ink-3 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Traveler</th>
                  <th className="pb-3 pr-4">Tour</th>
                  <th className="pb-3 pr-4">When</th>
                  <th className="pb-3 pr-4">Commission</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-4 pr-4 font-semibold">{r.name}</td>
                    <td className="py-4 pr-4 text-ink-2">{r.tour}</td>
                    <td className="py-4 pr-4 text-ink-2">{r.date}</td>
                    <td className="py-4 pr-4 font-bold">€{r.commission.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          r.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
