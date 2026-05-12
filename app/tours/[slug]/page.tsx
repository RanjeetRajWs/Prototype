'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/marketing/navbar';
import { tours } from '@/lib/mock-data/tours';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Clock, 
  Users as UsersIcon, 
  Languages, 
  Check, 
  MapPin, 
  ArrowLeft,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { NOW, offsetDays } from '@/lib/now';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function TourDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const tour = tours.find(t => t.slug === slug) || tours[0];

  const [pax, setPax] = useState(2);
  const [date, setDate] = useState<Date>(() => offsetDays(1, 10));
  const [dateOpen, setDateOpen] = useState(false);
  const total = tour.basePrice * pax;
  const checkoutHref = `/checkout?slug=${tour.slug}&pax=${pax}&date=${date.toISOString()}`;

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Breadcrumbs & Actions */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-ink-2 font-medium">
              <Link href="/tours" className="hover:text-ink">Tours</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-ink">{tour.city}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-ink truncate max-w-[200px]">{tour.name}</span>
            </div>
            <Link href="/tours">
              <Button variant="ghost" size="sm" className="text-ink-2 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to search
              </Button>
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <section className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] p-2">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-2xl">
            <img src={tour.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden">
            <img src={tour.images[1] || tour.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden rounded-tr-2xl">
            <img src={tour.images[2] || tour.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden">
            <img src={tour.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden rounded-br-2xl">
            <div className="absolute inset-0 bg-brand/60 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-brand/70 transition-colors z-10">
              +12 more photos
            </div>
            <img src={tour.images[1] || tour.images[0]} className="w-full h-full object-cover" alt="" />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* Content Left */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider mb-4">
                <MapPin className="w-4 h-4" />
                {tour.city}, Czech Republic
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-tight">
                {tour.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-ink-2 font-medium border-b border-border pb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning fill-current" />
                  <span className="text-ink font-bold">{tour.rating}</span>
                  <span>({tour.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" />
                  Up to {tour.capacity} people
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  English, Spanish
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-12">
              <h3 className="text-2xl font-display font-bold mb-4">Overview</h3>
              <p className="text-ink-2 text-lg leading-relaxed mb-6">
                {tour.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  'Professional local guide',
                  'Instant confirmation',
                  'Free cancellation up to 24h',
                  'Mobile voucher accepted',
                  'All entrance fees included',
                  'Private group options'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-2">
                    <Check className="w-5 h-5 text-success shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-display font-bold mb-6">Itinerary</h3>
              <div className="space-y-0">
                {tour.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-accent mt-2 ring-4 ring-accent-soft" />
                      {i < tour.itinerary.length - 1 && <div className="w-0.5 h-full bg-border my-2" />}
                    </div>
                    <div className="pb-8">
                      <h4 className="font-bold text-lg mb-1">{item.stop}</h4>
                      <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">{item.durationMin} MINS</div>
                      <p className="text-ink-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Meeting Point</h3>
              <div className="bg-bg rounded-2xl border border-border overflow-hidden">
                <div className="h-64 bg-zinc-200 flex items-center justify-center relative">
                  <MapPin className="w-10 h-10 text-accent" />
                  <span className="font-medium text-ink-2 ml-2">Interactive Map Placeholder</span>
                  <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-sm text-xs font-bold uppercase tracking-wider border border-border">
                    Old Town Square 1, Prague
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-ink-2 text-sm leading-relaxed">
                    Meet your guide in front of the Jan Hus Memorial at the Old Town Square. Look for the guide holding a <strong>Blue Umbrella</strong> with the TravelEcosystem logo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget Right */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-32">
              <div className="bg-surface rounded-3xl shadow-lg border border-border overflow-hidden p-8">
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-3xl font-display font-bold text-ink">€{tour.basePrice}</span>
                  <span className="text-ink-2 font-medium mb-1">per person</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDateOpen((v) => !v)}
                      className="w-full p-4 bg-bg border border-border rounded-2xl flex items-center justify-between hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div className="text-left">
                          <div className="text-xs text-ink-3 font-bold uppercase tracking-wider">Date</div>
                          <div className="text-sm font-bold">{format(date, 'EEE, MMM d')}</div>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-ink-3 group-hover:text-accent transition-all ${dateOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dateOpen && (
                      <div className="absolute z-20 top-full mt-2 left-0 right-0 shadow-xl">
                        <CalendarPicker
                          selected={date}
                          minDate={NOW}
                          onSelect={(d) => {
                            setDate(d);
                            setDateOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-bg border border-border rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UsersIcon className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-xs text-ink-3 font-bold uppercase tracking-wider">Travelers</div>
                        <div className="text-sm font-bold">{pax} Travelers</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setPax(Math.max(1, pax - 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-accent hover:text-accent transition-colors font-bold"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => setPax(pax + 1)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-accent hover:text-accent transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-2">
                  <span className="text-lg font-bold text-ink">Total</span>
                  <span className="text-2xl font-display font-bold text-ink">€{total}</span>
                </div>

                <Link href={checkoutHref}>
                  <Button className="w-full h-16 rounded-2xl bg-accent hover:bg-accent/90 text-white text-lg font-bold shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Book Now
                  </Button>
                </Link>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-ink-2 font-medium">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    Secure checkout via Stripe & SumUp
                  </div>
                  <div className="flex items-center gap-3 text-xs text-ink-2 font-medium">
                    <Check className="w-4 h-4 text-success" />
                    Free cancellation up to 24 hours
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-accent-soft border border-accent/10 rounded-2xl">
                <h4 className="font-bold text-accent mb-2">Traveler Favorite</h4>
                <p className="text-sm text-accent/80 font-medium">This tour is in high demand. We recommend booking at least 48 hours in advance.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
