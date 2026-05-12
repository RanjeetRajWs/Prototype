'use client';

import React, { useState, Suspense } from 'react';
import { Navbar } from '@/components/marketing/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Wallet, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Users as UsersIcon,
  CheckCircle2,
  Lock,
  MapPin
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { tours } from '@/lib/mock-data/tours';
import { offsetDays } from '@/lib/now';
import { format } from 'date-fns';

export default function Checkout() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get('slug');
  const paxParam = parseInt(params.get('pax') ?? '2', 10);
  const dateParam = params.get('date');
  const tour = (slug && tours.find((t) => t.slug === slug)) || tours[0];
  const pax = Number.isFinite(paxParam) && paxParam > 0 ? paxParam : 2;
  const date = dateParam ? new Date(dateParam) : offsetDays(1, 10);
  const [loading, setLoading] = useState(false);
  const total = tour.basePrice * pax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Form Left */}
            <div className="flex-1 space-y-8">
              <div>
                <h1 className="text-3xl font-display font-bold mb-4">Complete your booking</h1>
                <p className="text-ink-2">Please provide your details below to secure your spot.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Traveler Info */}
                <div className="bg-surface p-8 rounded-3xl border border-border shadow-subtle">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">1</span>
                    Traveler Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink ml-1">Full Name</label>
                      <Input placeholder="John Doe" required className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink ml-1">Email Address</label>
                      <Input type="email" placeholder="john@example.com" required className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink ml-1">Phone Number</label>
                      <Input placeholder="+420 123 456 789" required className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink ml-1">Country</label>
                      <Input placeholder="United Kingdom" required className="h-12 rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="bg-surface p-8 rounded-3xl border border-border shadow-subtle">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">2</span>
                    Enhance your experience
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Audio Guide (Multiple languages)', price: 5 },
                      { name: 'Hotel Pickup Service', price: 15 },
                      { name: 'Professional Photo Package', price: 25 },
                    ].map((addon, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-accent/50 hover:bg-bg transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-accent">
                            <CheckCircle2 className="w-4 h-4 text-accent opacity-0 group-hover:opacity-10" />
                          </div>
                          <span className="font-semibold text-ink-2 group-hover:text-ink">{addon.name}</span>
                        </div>
                        <span className="font-bold">+€{addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-surface p-8 rounded-3xl border border-border shadow-subtle">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">3</span>
                    Payment Method
                  </h3>
                  
                  <div className="flex gap-4 mb-8">
                    <button type="button" className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-brand bg-bg text-brand">
                      <CreditCard className="w-6 h-6" />
                      <span className="text-xs font-bold uppercase tracking-widest">Card</span>
                    </button>
                    <button type="button" className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-transparent bg-bg text-ink-3 hover:border-border transition-colors">
                      <Wallet className="w-6 h-6" />
                      <span className="text-xs font-bold uppercase tracking-widest">PayPal</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink ml-1">Card Number</label>
                      <div className="relative">
                        <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl pl-12" />
                        <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-ink ml-1">Expiry Date</label>
                        <Input placeholder="MM / YY" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-ink ml-1">CVC</label>
                        <div className="relative">
                          <Input placeholder="123" className="h-12 rounded-xl" />
                          <Lock className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-ink-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  disabled={loading}
                  type="submit" 
                  className="w-full h-16 rounded-2xl bg-accent hover:bg-accent/90 text-white text-xl font-bold shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
                >
                  {loading ? 'Processing...' : `Pay €${total}`}
                </Button>
              </form>
            </div>

            {/* Summary Right */}
            <div className="lg:w-[400px] shrink-0">
              <div className="sticky top-32 space-y-6">
                <div className="bg-surface rounded-3xl border border-border shadow-subtle overflow-hidden">
                  <div className="p-6 bg-bg border-b border-border">
                    <h3 className="font-display font-bold">Order Summary</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <img src={tour.images[0]} className="w-20 h-20 rounded-xl object-cover border border-border" alt="" />
                      <div>
                        <h4 className="font-bold text-sm leading-tight mb-2">{tour.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-ink-2 font-medium">
                          <MapPin className="w-3 h-3" />
                          {tour.city}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 py-6 border-y border-border">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-ink-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                        <span className="font-bold">{format(date, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-ink-2">
                          <Clock className="w-4 h-4" />
                          Time
                        </div>
                        <span className="font-bold">{format(date, 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-ink-2">
                          <UsersIcon className="w-4 h-4" />
                          Travelers
                        </div>
                        <span className="font-bold">{pax} Adults</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-2">Subtotal</span>
                        <span className="font-semibold">€{total}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-2">Booking Fees</span>
                        <span className="text-success font-semibold">FREE</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 text-xl font-display font-bold">
                        <span>Total</span>
                        <span>€{total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">100% Secure Payment</h5>
                    <p className="text-xs text-ink-2">Your data is encrypted and protected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
