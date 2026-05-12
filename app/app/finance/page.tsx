'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar,
  ChevronDown,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const data = [
  { name: 'Direct', value: 32 },
  { name: 'Civitatis', value: 28 },
  { name: 'GetYourGuide', value: 18 },
  { name: 'Web', value: 14 },
  { name: 'Other', value: 8 },
];

const COLORS = ['#0F172A', '#E07B39', '#16A34A', '#1E3A8A', '#94A3B8'];

const commissions = [
  { guide: 'Maria Lopez', tours: 42, pax: 156, earned: 1240, status: 'Paid' },
  { guide: 'Marco Ricci', tours: 28, pax: 89, earned: 840, status: 'Pending' },
  { guide: 'Sofia Garcia', tours: 15, pax: 45, earned: 420, status: 'Pending' },
  { guide: 'Petr Novak', tours: 12, pax: 32, earned: 310, status: 'Paid' },
];

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Finance</h1>
          <p className="text-ink-2">Track revenue, expenses, and guide commissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border shadow-sm h-11">
            <Calendar className="w-4 h-4 mr-2" /> This Month <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="font-bold border-border shadow-sm h-11">
            <Download className="w-4 h-4 mr-2" /> Financial Report
          </Button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Income", value: "€18,420", change: "+12%", trend: "up", color: "text-ink" },
          { title: "Total Expenses", value: "€4,160", change: "+5%", trend: "down", color: "text-danger" },
          { title: "Guide Commissions", value: "€5,840", change: "+8%", trend: "up", color: "text-ink" },
          { title: "Net Margin", value: "€8,420", change: "+15%", trend: "up", color: "text-success" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border shadow-subtle">
            <CardContent className="p-6">
              <div className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-2">{kpi.title}</div>
              <div className={`text-3xl font-display font-bold mb-4 ${kpi.color}`}>{kpi.value}</div>
              <div className={`flex items-center gap-1 text-xs font-bold ${
                kpi.trend === 'up' ? 'text-success' : 'text-danger'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change} <span className="text-ink-3 font-medium ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Income Breakdown */}
        <Card className="lg:col-span-1 border-border shadow-subtle">
          <CardHeader className="border-b border-border pb-6 px-8">
            <CardTitle className="text-lg font-display font-bold">Income by Channel</CardTitle>
          </CardHeader>
          <CardContent className="p-8 h-[350px] flex flex-col items-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-subtle)' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {data.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs font-bold text-ink-2">{entry.name}</span>
                  <span className="text-xs text-ink-3 font-medium ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission Table */}
        <Card className="lg:col-span-2 border-border shadow-subtle overflow-hidden">
          <CardHeader className="border-b border-border pb-6 px-8 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-display font-bold">Guide Commissions</CardTitle>
            <Button variant="ghost" size="sm" className="text-accent font-bold">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-bg">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Guide</TableHead>
                  <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4 text-center">Tours</TableHead>
                  <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4 text-center">Pax</TableHead>
                  <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Earned</TableHead>
                  <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((c) => (
                  <TableRow key={c.guide} className="border-border hover:bg-bg/50 transition-colors group">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center text-white text-[10px] font-bold">
                          {c.guide.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-sm">{c.guide}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center font-medium text-ink-2">{c.tours}</TableCell>
                    <TableCell className="py-4 text-center font-medium text-ink-2">{c.pax}</TableCell>
                    <TableCell className="py-4 font-bold text-ink">€{c.earned}</TableCell>
                    <TableCell className="py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        c.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {c.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button variant="ghost" size="sm" className="text-ink-3 group-hover:text-ink font-bold text-[10px] uppercase tracking-widest">
                        Pay Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card className="border-border shadow-subtle overflow-hidden">
        <CardHeader className="border-b border-border py-6 px-8">
          <CardTitle className="text-lg font-display font-bold">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-bg">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4 px-8">Date</TableHead>
                <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Category</TableHead>
                <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Description</TableHead>
                <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Amount</TableHead>
                <TableHead className="font-bold text-ink text-[10px] uppercase tracking-wider py-4">Paid By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: '12 Oct 2025', category: 'Marketing', desc: 'Google Ads - Prague Search', amount: 1200, by: 'Petr Novak' },
                { date: '11 Oct 2025', category: 'Operations', desc: 'New guide umbrellas (20 units)', amount: 450, by: 'Anna Svobodova' },
                { date: '10 Oct 2025', category: 'Transport', desc: 'Bus rental for Karlstejn trip', amount: 850, by: 'Petr Novak' },
                { date: '08 Oct 2025', category: 'Software', desc: 'TravelEcosystem Subscription', amount: 199, by: 'Petr Novak' },
              ].map((exp, i) => (
                <TableRow key={i} className="border-border hover:bg-bg/50 transition-colors">
                  <TableCell className="py-4 px-8 text-sm text-ink-2 font-medium">{exp.date}</TableCell>
                  <TableCell className="py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-bg border border-border text-[10px] font-bold text-ink-2 uppercase tracking-widest">
                      {exp.category}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-semibold">{exp.desc}</TableCell>
                  <TableCell className="py-4 font-bold text-danger">€{exp.amount}</TableCell>
                  <TableCell className="py-4 text-sm text-ink-2 font-medium">{exp.by}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
