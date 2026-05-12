'use client';

import React from 'react';
import { useAppContext } from '@/components/context/app-context';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  MapPin
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const chartData = [
  { name: '01 Oct', bookings: 12, revenue: 840 },
  { name: '02 Oct', bookings: 15, revenue: 1050 },
  { name: '03 Oct', bookings: 10, revenue: 700 },
  { name: '04 Oct', bookings: 18, revenue: 1260 },
  { name: '05 Oct', bookings: 22, revenue: 1540 },
  { name: '06 Oct', bookings: 14, revenue: 980 },
  { name: '07 Oct', bookings: 25, revenue: 1750 },
];

const activityFeed = [
  { id: 1, type: 'booking', source: 'Civitatis', tour: 'Old Town Walking Tour', pax: 2, time: '10 min ago' },
  { id: 2, type: 'confirmation', user: 'Petr Novak', action: 'confirmed reservation', time: '1 hour ago' },
  { id: 3, type: 'completion', tour: 'Prague Castle', pax: 4, time: '2 hours ago' },
  { id: 4, type: 'checkin', user: 'Maria Lopez', count: 4, time: '3 hours ago' },
];

export default function Dashboard() {
  const { currentTenant, currentRole } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Welcome back, Petr</h1>
          <p className="text-ink-2">Here's what's happening with {currentTenant.name} today.</p>
        </div>
        
        {/* Role-specific CTA */}
        {(currentRole === 'Guide' || currentRole === 'Traveler') && (
          <Button 
            onClick={() => window.location.href = currentRole === 'Guide' ? '/app/guide' : '/app/traveler'}
            className="bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg animate-pulse hover:animate-none"
          >
            Switch to {currentRole} Mobile View
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Today's Bookings", value: "12", change: "+3", trend: "up", icon: Calendar },
          { title: "Today's Revenue", value: "€840", change: "+€120", trend: "up", icon: TrendingUp },
          { title: "Tours Running Now", value: "3", change: "Same", trend: "neutral", icon: MapPin },
          { title: "Pending Check-ins", value: "7", change: "-2", trend: "down", icon: CheckCircle2 },
        ].map((kpi, i) => (
          <Card key={i} className="border-border shadow-subtle hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-ink-2">
                  <kpi.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  kpi.trend === 'up' ? 'bg-success/10 text-success' : 
                  kpi.trend === 'down' ? 'bg-danger/10 text-danger' : 
                  'bg-bg text-ink-2'
                }`}>
                  {kpi.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {kpi.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-ink-2 uppercase tracking-wider">{kpi.title}</p>
                <p className="text-3xl font-display font-bold text-ink">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6 px-8">
            <CardTitle className="text-lg font-display font-bold">Revenue & Bookings Trend</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="bg-bg text-ink-2 font-bold text-xs uppercase tracking-wider">7 Days</Button>
              <Button variant="ghost" size="sm" className="text-ink-3 font-bold text-xs uppercase tracking-wider">30 Days</Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--ink-2)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--ink-2)', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-subtle)' 
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--accent)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--accent)', strokeWidth: 2, stroke: 'var(--surface)' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="var(--brand)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--brand)', strokeWidth: 2, stroke: 'var(--surface)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border shadow-subtle">
          <CardHeader className="border-b border-border pb-6 px-8 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-display font-bold">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-accent font-bold">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-bg transition-colors flex gap-4">
                  <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                    activity.type === 'booking' ? 'bg-accent-soft text-accent' :
                    activity.type === 'confirmation' ? 'bg-green-100 text-green-600' :
                    activity.type === 'completion' ? 'bg-blue-100 text-blue-600' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    {activity.type === 'booking' && <ArrowUpRight className="w-5 h-5" />}
                    {activity.type === 'confirmation' && <CheckCircle2 className="w-5 h-5" />}
                    {activity.type === 'completion' && <Calendar className="w-5 h-5" />}
                    {activity.type === 'checkin' && <Users className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink leading-tight mb-1">
                      {activity.type === 'booking' && (
                        <>New booking via <span className="font-bold">{activity.source}</span> · {activity.tour} · {activity.pax} pax</>
                      )}
                      {activity.type === 'confirmation' && (
                        <><span className="font-bold">{activity.user}</span> confirmed reservation</>
                      )}
                      {activity.type === 'completion' && (
                        <>Tour completed: <span className="font-bold">{activity.tour}</span> ({activity.pax} pax)</>
                      )}
                      {activity.type === 'checkin' && (
                        <><span className="font-bold">{activity.user}</span> checked in {activity.count} travelers</>
                      )}
                    </p>
                    <span className="text-xs text-ink-3 font-medium uppercase tracking-wider">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Bookings Calendar Mockup */}
      <Card className="border-border shadow-subtle overflow-hidden">
        <CardHeader className="border-b border-border py-6 px-8 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display font-bold">Today's Schedule</CardTitle>
          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span>Public</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand" />
              <span>Private</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 border-b border-border bg-bg">
              <div className="p-4 border-r border-border text-xs font-bold text-ink-3 uppercase tracking-widest">Time</div>
              {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => (
                <div key={t} className="p-4 border-r border-border text-center text-xs font-bold text-ink-3 uppercase tracking-widest">{t}</div>
              ))}
            </div>
            <div className="grid grid-cols-8 divide-x divide-border">
              <div className="p-4 font-bold text-sm bg-surface">Guide 1</div>
              <div className="p-2 relative bg-surface">
                <div className="absolute inset-y-2 inset-x-2 bg-accent rounded-lg p-2 text-[10px] text-white font-bold leading-tight overflow-hidden shadow-sm">
                  Old Town Walking<br />(12 pax)
                </div>
              </div>
              <div className="bg-bg/20" />
              <div className="p-2 relative bg-surface">
                <div className="absolute inset-y-2 inset-x-2 bg-brand rounded-lg p-2 text-[10px] text-white font-bold leading-tight overflow-hidden shadow-sm">
                  Private Castle<br />(4 pax)
                </div>
              </div>
              <div className="bg-bg/20" />
              <div className="p-2 relative bg-surface">
                <div className="absolute inset-y-2 inset-x-2 bg-accent rounded-lg p-2 text-[10px] text-white font-bold leading-tight overflow-hidden shadow-sm">
                  Beer Tour<br />(8 pax)
                </div>
              </div>
              <div className="bg-bg/20" />
              <div className="bg-bg/20" />
            </div>
            <div className="grid grid-cols-8 divide-x divide-border">
              <div className="p-4 font-bold text-sm bg-surface">Guide 2</div>
              <div className="bg-bg/20" />
              <div className="p-2 relative bg-surface">
                <div className="absolute inset-y-2 inset-x-2 bg-accent rounded-lg p-2 text-[10px] text-white font-bold leading-tight overflow-hidden shadow-sm">
                  Prague Castle<br />(15 pax)
                </div>
              </div>
              <div className="bg-bg/20" />
              <div className="bg-bg/20" />
              <div className="p-2 relative bg-surface">
                <div className="absolute inset-y-2 inset-x-2 bg-accent rounded-lg p-2 text-[10px] text-white font-bold leading-tight overflow-hidden shadow-sm">
                  Ghost Tour<br />(10 pax)
                </div>
              </div>
              <div className="bg-bg/20" />
              <div className="bg-bg/20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
