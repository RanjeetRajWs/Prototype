'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  Settings,
  CheckCircle2,
  ExternalLink,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export default function ChannelsPage() {
  const [syncing, setSyncing] = useState(false);
  // Use real wall-clock time so "X minutes ago" updates live without page reload.
  const [lastSync, setLastSync] = useState<Date>(() => new Date(Date.now() - 2 * 60 * 1000));
  const [, setTick] = useState(0);

  // Re-render every 20s so the relative timestamp stays fresh.
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 20_000);
    return () => clearInterval(id);
  }, []);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date());
      toast.success('Civitatis sync completed', {
        description: '12 new bookings imported and 4 updated.',
      });
    }, 1500);
  };

  const relative = formatDistanceToNow(lastSync, { addSuffix: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">OTA Channels</h1>
        <p className="text-ink-2">Connect your booking platforms. Bookings sync automatically.</p>
      </div>

      <div className="p-4 bg-accent-soft/30 border border-accent/10 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <p className="text-sm text-accent/80 font-medium">
          Your channel manager is active. <strong>42 bookings</strong> imported in the last 24 hours.
        </p>
      </div>

      {/* Featured Channel: Civitatis */}
      <Card className="border-border shadow-md overflow-hidden border-l-4 border-l-brand">
        <CardContent className="p-0">
          <div className="p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-display font-black text-2xl">
                C
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-display font-bold">Civitatis</h2>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Connected
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-ink-2 font-medium">
                  <span className="flex items-center gap-2">
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-accent' : 'text-ink-3'}`} />
                    Last sync: {relative}
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    64 bookings this month
                  </span>
                  <span className="font-bold text-ink">€5,160 revenue</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button variant="outline" className="flex-1 lg:flex-none font-bold h-11 px-6 rounded-xl border-border">
                View Bookings
              </Button>
              <Button 
                onClick={handleSync}
                disabled={syncing}
                className="flex-1 lg:flex-none bg-brand hover:bg-brand-soft text-white font-bold h-11 px-6 rounded-xl shadow-lg gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync now'}
              </Button>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-bg text-ink-3 hover:text-ink">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="px-8 py-6 bg-bg/50 border-t border-border flex flex-wrap gap-8">
            <div>
              <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">Partner ID</div>
              <div className="text-sm font-mono font-bold">UWT-PRG-8821</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">API Status</div>
              <div className="text-sm font-bold text-success">Healthy</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">Tour Mapping</div>
              <div className="text-sm font-bold">12 / 12 Mapped</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'GetYourGuide', desc: 'Market leader in Europe. Instant bookings.', color: 'bg-blue-600', connected: true },
          { name: 'Viator', desc: 'Global reach through TripAdvisor.', color: 'bg-green-600', connected: false },
          { name: 'Klook', desc: 'Best for Asian travelers visiting Europe.', color: 'bg-orange-500', connected: false },
          { name: 'TripAdvisor', desc: 'Direct listing on TripAdvisor Experiences.', color: 'bg-emerald-500', connected: false },
        ].map((channel) => (
          <Card key={channel.name} className="border-border shadow-subtle hover:shadow-md transition-all group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center text-white font-display font-black text-xl`}>
                  {channel.name.charAt(0)}
                </div>
                {channel.connected ? (
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
                    Connected
                  </span>
                ) : (
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest text-ink-3 group-hover:text-accent">
                    Connect
                  </Button>
                )}
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{channel.name}</h3>
              <p className="text-sm text-ink-2 font-medium mb-6 line-clamp-2">
                {channel.desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                {channel.connected ? (
                  <>
                    <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">Active Sync</div>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-ink-3 hover:text-ink hover:bg-bg">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-ink-3 uppercase tracking-widest group-hover:text-accent transition-colors">
                    Learn more <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed border-2 border-border shadow-none bg-transparent hover:border-accent/50 hover:bg-accent-soft/10 transition-all cursor-pointer group flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center text-ink-3 mb-4 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-ink-2 group-hover:text-ink transition-colors">Add Custom Channel</h4>
          <p className="text-xs text-ink-3 font-medium mt-1">Connect via API or iCal sync</p>
        </Card>
      </div>
    </div>
  );
}
