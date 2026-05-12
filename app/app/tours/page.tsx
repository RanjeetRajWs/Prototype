'use client';

import React from 'react';
import { tours } from '@/lib/mock-data/tours';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MoreHorizontal, 
  Plus, 
  MapPin, 
  Star, 
  Users, 
  Clock, 
  BarChart3,
  Edit2,
  Copy,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function ToursManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Tours</h1>
          <p className="text-ink-2">Manage your catalog of tours and activities.</p>
        </div>
        <Link href="/app/tours/new">
          <Button className="bg-brand hover:bg-brand-soft text-white font-bold shadow-lg h-11 px-6 rounded-xl">
            <Plus className="w-5 h-5 mr-2" /> New Tour
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 border-b border-border pb-1">
        {['All Tours', 'Active', 'Drafts', 'Archived'].map((tab, i) => (
          <button 
            key={tab}
            className={`px-4 py-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
              i === 0 ? 'border-accent text-ink' : 'border-transparent text-ink-3 hover:text-ink-2'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <Card key={tour.id} className="border-border shadow-subtle overflow-hidden group hover:shadow-md transition-all">
            <div className="relative aspect-video overflow-hidden">
              <Link href={`/app/tours/${tour.id}`} className="absolute inset-0 z-10" aria-label={`Open ${tour.name}`} />
              <img
                src={tour.images[0]}
                alt={tour.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 z-20">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                  tour.status === 'Active' ? 'bg-success text-white' : 'bg-warning text-white'
                }`}>
                  {tour.status}
                </div>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 size-8 rounded-lg flex items-center justify-center transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl">
                    <DropdownMenuItem className="font-bold text-xs uppercase tracking-widest gap-2 py-3">
                      <Edit2 className="w-4 h-4" /> Edit Tour
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-bold text-xs uppercase tracking-widest gap-2 py-3">
                      <Copy className="w-4 h-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-bold text-xs uppercase tracking-widest gap-2 py-3">
                      {tour.status === 'Active' ? (
                        <>
                          <PauseCircle className="w-4 h-4 text-warning" /> Pause Sales
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 text-success" /> Activate
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-ink-3 text-[10px] font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-3 h-3 text-accent" />
                {tour.city}
              </div>
              <h3 className="text-lg font-display font-bold text-ink mb-6 h-12 line-clamp-2 leading-snug">
                {tour.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-bg rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">Bookings</div>
                  <div className="text-lg font-display font-bold text-ink">{tour.bookingsThisMonth}</div>
                </div>
                <div className="p-3 bg-bg rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">Revenue</div>
                  <div className="text-lg font-display font-bold text-ink">€{tour.revenueThisMonth}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-ink-2">
                    <Star className="w-3.5 h-3.5 text-warning fill-current" />
                    {tour.rating}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-ink-2">
                    <Clock className="w-3.5 h-3.5" />
                    {tour.duration}
                  </div>
                </div>
                <Link href={`/app/tours/${tour.id}`}>
                  <Button variant="ghost" size="sm" className="font-bold text-xs uppercase tracking-widest text-accent hover:bg-accent-soft">
                    Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
