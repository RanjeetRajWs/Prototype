'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Filter,
  Star,
  TrendingUp,
  Users,
  Trophy,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { users } from '@/lib/mock-data/users';
import { commissions } from '@/lib/mock-data/commissions';

const guides = users.filter((u) => u.role === 'Guide' && u.status === 'Active');

const trend = [
  { week: 'W1', tours: 38, satisfaction: 4.7 },
  { week: 'W2', tours: 44, satisfaction: 4.7 },
  { week: 'W3', tours: 51, satisfaction: 4.8 },
  { week: 'W4', tours: 49, satisfaction: 4.8 },
  { week: 'W5', tours: 57, satisfaction: 4.9 },
  { week: 'W6', tours: 62, satisfaction: 4.9 },
];

const leaderboard = guides
  .map((g) => {
    const c = commissions.find((x) => x.guideId === g.id);
    return {
      ...g,
      paxServed: c?.paxServed ?? Math.round(g.toursLed * 0.6),
      monthlyCommission: c?.commissionEarned ?? Math.round(g.toursLed * 18),
      onTimePct: Math.min(99, 86 + (g.toursLed % 12)),
      repeatPct: Math.min(48, 12 + (g.toursLed % 28)),
    };
  })
  .sort((a, b) => b.rating - a.rating || b.toursLed - a.toursLed);

const top3 = leaderboard.slice(0, 3);

export default function GuidesPerformanceReport() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/app/reports"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-3 hover:text-ink w-fit"
        >
          <ArrowLeft className="w-3 h-3" /> Reports
        </Link>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Guides Performance</h1>
            <p className="text-ink-2">
              Last 6 weeks · {guides.length} active guides · Updated 1 hour ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-bold border-border shadow-sm">
              <Filter className="w-4 h-4 mr-2" /> May 2026
            </Button>
            <Button className="bg-brand text-white font-bold shadow-sm">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tours led', value: leaderboard.reduce((a, g) => a + g.toursLed, 0).toLocaleString(), sub: '+12% vs prior 6w', icon: Users, color: 'bg-blue-100 text-blue-600' },
          { label: 'Average rating', value: (leaderboard.reduce((a, g) => a + g.rating, 0) / leaderboard.length).toFixed(2), sub: 'across 1,841 reviews', icon: Star, color: 'bg-amber-100 text-amber-600' },
          { label: 'Pax served', value: leaderboard.reduce((a, g) => a + g.paxServed, 0).toLocaleString(), sub: '+8% MoM', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
          { label: 'On-time rate', value: '96%', sub: '+1.2pp vs target', icon: Award, color: 'bg-rose-100 text-rose-600' },
        ].map((k) => (
          <Card key={k.label} className="border-border shadow-subtle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center`}>
                  <k.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold tracking-tight">{k.value}</div>
              <div className="text-xs font-bold text-ink-3 uppercase tracking-widest mt-1">{k.label}</div>
              <div className="text-xs text-success font-semibold mt-2">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend chart */}
        <Card className="lg:col-span-2 border-border shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg">Tours led & satisfaction</h3>
                <p className="text-xs text-ink-3 font-bold uppercase tracking-widest">Last 6 weeks</p>
              </div>
              <span className="px-2 py-1 rounded-md bg-accent-soft text-accent text-[10px] font-bold uppercase tracking-widest">
                Aggregated team
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ left: -10 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} stroke="var(--border)" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} stroke="var(--border)" />
                  <YAxis yAxisId="right" orientation="right" domain={[4, 5]} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line yAxisId="left" type="monotone" dataKey="tours" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} name="Tours led" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} name="Avg rating" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top performers */}
        <Card className="border-border shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg">Top performers</h3>
                <p className="text-xs text-ink-3 font-bold uppercase tracking-widest">By rating</p>
              </div>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <ol className="space-y-4">
              {top3.map((g, i) => (
                <li key={g.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-border">
                    <img src={g.avatar} alt={g.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{g.name}</div>
                    <div className="text-xs text-ink-2">{g.toursLed} tours · {g.paxServed} pax</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold">{g.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3 mt-0.5">
                      #{i + 1}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Full table */}
      <Card className="border-border shadow-subtle overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold">All guides · {leaderboard.length}</h3>
          <span className="text-xs text-ink-3 font-bold uppercase tracking-widest">May 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-ink-3 bg-bg/60">
                <th className="px-6 py-3">Guide</th>
                <th className="px-6 py-3">Languages</th>
                <th className="px-6 py-3 text-right">Tours led</th>
                <th className="px-6 py-3 text-right">Pax served</th>
                <th className="px-6 py-3 text-right">Rating</th>
                <th className="px-6 py-3 text-right">On-time</th>
                <th className="px-6 py-3 text-right">Repeat %</th>
                <th className="px-6 py-3 text-right">Commission</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((g) => (
                <tr key={g.id} className="border-t border-border hover:bg-bg/40 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                        <img src={g.avatar} alt={g.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold">{g.name}</div>
                        <div className="text-xs text-ink-3">{g.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-ink-2">
                    {g.languages.map((l) => l.toUpperCase()).join(' · ')}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold">{g.toursLed}</td>
                  <td className="px-6 py-3 text-right">{g.paxServed}</td>
                  <td className="px-6 py-3 text-right">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-semibold">{g.rating.toFixed(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">{g.onTimePct}%</td>
                  <td className="px-6 py-3 text-right">{g.repeatPct}%</td>
                  <td className="px-6 py-3 text-right font-semibold">€{g.monthlyCommission.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
