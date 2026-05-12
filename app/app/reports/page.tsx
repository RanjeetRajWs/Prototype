'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  LineChart as LineChartIcon,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Report {
  slug: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  data: { v: number }[];
  ready?: boolean;
}

const reports: Report[] = [
  { slug: 'guides', title: 'Guides Performance', desc: 'Ranking, reviews, and tours led by your guide team.', icon: Users, color: 'bg-blue-100 text-blue-600',
    data: [{ v: 40 }, { v: 55 }, { v: 45 }, { v: 60 }, { v: 75 }, { v: 65 }, { v: 80 }], ready: true },
  { slug: 'promoters', title: 'Promoters Performance', desc: 'Sales tracking for your affiliate and promoter network.', icon: TrendingUp, color: 'bg-green-100 text-green-600',
    data: [{ v: 20 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 35 }, { v: 50 }, { v: 45 }] },
  { slug: 'manager-ops', title: 'Manager Operations', desc: 'Daily logistics, shift coverage, and duty logs.', icon: Clock, color: 'bg-orange-100 text-orange-600',
    data: [{ v: 80 }, { v: 75 }, { v: 85 }, { v: 70 }, { v: 90 }, { v: 85 }, { v: 95 }] },
  { slug: 'balance', title: 'Balance Sheet', desc: 'Monthly financial overview and P&L statement.', icon: BarChart3, color: 'bg-purple-100 text-purple-600',
    data: [{ v: 30 }, { v: 45 }, { v: 40 }, { v: 55 }, { v: 50 }, { v: 65 }, { v: 60 }] },
  { slug: 'reservations', title: 'Reservations Summary', desc: 'Deep dive into booking trends and channel mix.', icon: LineChartIcon, color: 'bg-emerald-100 text-emerald-600',
    data: [{ v: 50 }, { v: 40 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 55 }, { v: 80 }] },
  { slug: 'productivity', title: 'Productivity by Tour', desc: 'Profitability analysis for every tour in your catalog.', icon: MapPin, color: 'bg-rose-100 text-rose-600',
    data: [{ v: 10 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }] },
];

function ReportCard({ report }: { report: Report }) {
  return (
    <Card
      className={`border-border shadow-subtle transition-all overflow-hidden h-full ${
        report.ready ? 'hover:shadow-md cursor-pointer' : 'opacity-75'
      }`}
    >
      <CardHeader className="p-6 pb-2">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl ${report.color} flex items-center justify-center`}>
            <report.icon className="w-6 h-6" />
          </div>
          {report.ready ? (
            <ArrowRight className="w-5 h-5 text-ink-3 group-hover:text-accent transition-colors" />
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg border border-border text-[10px] font-bold uppercase tracking-widest text-ink-3">
              <Sparkles className="w-3 h-3" /> Coming soon
            </span>
          )}
        </div>
        <CardTitle
          className={`text-xl font-display font-bold mb-2 ${
            report.ready ? 'group-hover:text-accent transition-colors' : ''
          }`}
        >
          {report.title}
        </CardTitle>
        <p className="text-sm text-ink-2 font-medium leading-relaxed">{report.desc}</p>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={report.data}>
              <defs>
                <linearGradient id={`gradient-${report.slug}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={report.ready ? 0.3 : 0.12} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--accent)"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${report.slug})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[10px] font-bold text-ink-3 uppercase tracking-widest">
          <span>{report.ready ? 'Last updated: 1 hour ago' : 'Drafting'}</span>
          {report.ready && (
            <span className="text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
              Open Report <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Reports Hub</h1>
          <p className="text-ink-2">Analyze your data and optimize your operations.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-sm focus:ring-2 ring-accent/20 outline-none w-64"
            />
          </div>
          <Button variant="outline" className="font-bold border-border shadow-sm">
            <Filter className="w-4 h-4 mr-2" /> Categories
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) =>
          report.ready ? (
            <Link key={report.slug} href={`/app/reports/${report.slug}`} className="block group">
              <ReportCard report={report} />
            </Link>
          ) : (
            <div key={report.slug} className="block group">
              <ReportCard report={report} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
