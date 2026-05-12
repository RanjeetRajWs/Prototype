'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/marketing/navbar';
import { fireConfetti } from '@/lib/confetti';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Download, 
  Share2, 
  ArrowRight,
  Printer
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CheckoutSuccess() {
  useEffect(() => {
    // Tiny delay so the success card has time to settle in before the burst.
    const t = setTimeout(() => fireConfetti({ count: 220, duration: 2400 }), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-24 h-24 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-display font-bold mb-4 tracking-tight"
          >
            Your adventure is confirmed!
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-ink-2 text-lg mb-12"
          >
            We've sent your voucher and meeting instructions to <strong>john@example.com</strong>.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-surface rounded-3xl border border-border shadow-lg overflow-hidden text-left mb-12"
          >
            <div className="p-8 bg-brand text-white flex items-center justify-between">
              <div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Booking Reference</div>
                <div className="text-xl font-mono font-bold tracking-wider">TES-2025-04F7K2</div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20">
                <Printer className="w-5 h-5" />
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-ink-3 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Date & Time
                  </div>
                  <div className="font-bold">Oct 12, 2025 · 10:00 AM</div>
                </div>
                <div>
                  <div className="text-ink-3 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Meeting Point
                  </div>
                  <div className="font-bold">Old Town Square, Prague</div>
                  <div className="text-xs text-ink-2">Jan Hus Memorial</div>
                </div>
              </div>

              <div className="p-6 bg-bg rounded-2xl border border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent font-bold">
                    MN
                  </div>
                  <div>
                    <div className="text-xs text-ink-3 font-bold uppercase tracking-widest">Your Guide</div>
                    <div className="font-bold text-ink">Maria Novakova</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-accent font-bold">Message Guide</Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 h-14 rounded-2xl bg-brand hover:bg-brand/90 text-white font-bold gap-2 shadow-lg">
                  <Download className="w-5 h-5" />
                  Download Voucher
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold gap-2">
                  <Share2 className="w-5 h-5" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link href="/tours">
              <Button variant="ghost" className="font-bold text-ink-2 hover:text-ink">
                Browse more tours
              </Button>
            </Link>
            <Link href="/app">
              <Button className="font-bold bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-12">
                Manage your trips
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
