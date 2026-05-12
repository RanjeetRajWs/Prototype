'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Map as MapIcon, 
  Navigation,
  MessageCircle,
  Bell,
  Search,
  Wallet,
  Compass,
  User as UserIcon,
  ArrowRight,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { monogramAvatar } from '@/lib/scene-image';

export default function TravelerMobileView() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-full max-w-[380px] h-[800px] bg-bg rounded-[3rem] border-[8px] border-zinc-900 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="h-10 w-full flex items-center justify-between px-8 shrink-0">
          <span className="text-xs font-bold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2 bg-black rounded-sm" />
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-2xl font-display font-bold">My Trips</h1>
            <div className="relative">
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-bg" />
            </div>
          </div>

          {/* Upcoming Booking Hero */}
          <div className="space-y-6">
            <div className="bg-brand text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-accent rounded-lg text-[10px] font-bold uppercase tracking-widest">Starts in 2h</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Reference: TES-04F7</span>
              </div>
              
              <h2 className="text-xl font-display font-bold mb-6 leading-tight">Old Town & Astronomical Clock Walking Tour</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" /> Oct 12, 10:00
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" /> Old Town Square
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-11 bg-white text-brand hover:bg-white/90 font-bold rounded-xl text-xs gap-2">
                  <Navigation className="w-4 h-4" /> Get Directions
                </Button>
                <Button size="icon" className="h-11 w-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Map Preview Mockup */}
            <div>
              <h3 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-3 px-1">Meeting Point</h3>
              <div className="relative h-40 bg-zinc-200 rounded-3xl border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapIcon className="w-8 h-8 text-ink-3" />
                  <span className="text-xs font-bold text-ink-3 ml-2 uppercase">Static Map Placeholder</span>
                </div>
                {/* Mock Guide Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg overflow-hidden bg-brand">
                    <img src={monogramAvatar('Maria Lopez')} alt="Maria Lopez" />
                  </div>
                  <div className="bg-white px-2 py-1 rounded-full shadow-md text-[10px] font-bold mt-2 whitespace-nowrap">
                    Guide Maria is here
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Example */}
            <div className="p-4 bg-accent-soft/30 border border-accent/10 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <p className="text-xs text-accent/80 font-medium leading-relaxed">
                "Hi John! I'm already at the meeting point under the Blue Umbrella. See you soon!" — <strong>Maria</strong>
              </p>
            </div>

            {/* Cross-sell Card */}
            <div className="bg-surface border border-border rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center text-ink-3">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Heading to Budapest?</h4>
                  <p className="text-[10px] text-ink-3 font-medium">See top-rated tours next door</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-ink-3 group-hover:text-accent transition-all group-hover:translate-x-1" />
            </div>

            {/* Past Bookings */}
            <div>
              <h3 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-3 px-1">Past Bookings</h3>
              <div className="space-y-4">
                {[
                  { name: 'Vltava River Cruise', date: 'Oct 09', city: 'Prague' },
                  { name: 'Jewish Quarter Walk', date: 'Oct 08', city: 'Prague' },
                ].map((trip, i) => (
                  <div key={i} className="flex items-center gap-4 opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center text-ink-3">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xs">{trip.name}</h4>
                      <p className="text-[10px] font-medium">{trip.city} · {trip.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-border flex items-center justify-around px-4">
          <div className="flex flex-col items-center gap-1 text-accent">
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-ink-3">
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Trips</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-ink-3">
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Wallet</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-ink-3">
            <UserIcon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl" />
      </div>
    </div>
  );
}
