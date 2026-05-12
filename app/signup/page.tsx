'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  Building2,
  MapPin,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cityHero } from '@/lib/scene-image';

export default function SignupPage() {
  const [city, setCity] = useState('Prague');
  const [size, setSize] = useState('1-5 guides');

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 bg-surface">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="font-display font-bold text-xl tracking-tight">TravelEcosystem</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">Request a demo</h1>
            <p className="text-ink-2 font-medium">
              Tell us about your agency. We&apos;ll provision a sandbox in under 24 hours.
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">First name</label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                  <Input placeholder="Petr" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Last name</label>
                <Input placeholder="Novak" className="h-14 px-4 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Work email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <Input placeholder="you@youragency.eu" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Agency name</label>
              <div className="relative">
                <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <Input placeholder="United World Tours" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Primary city</div>
              <div className="grid grid-cols-4 gap-2">
                {['Prague', 'Budapest', 'Vienna', 'Krakow'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`h-11 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${
                      city === c ? 'border-brand bg-brand text-white' : 'border-border text-ink-3 hover:border-ink-3'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Team size</div>
              <div className="grid grid-cols-3 gap-2">
                {['1-5 guides', '6-20 guides', '20+ guides'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 rounded-xl border-2 transition-all font-semibold text-xs ${
                      size === s ? 'border-brand bg-brand text-white' : 'border-border text-ink-3 hover:border-ink-3'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <Input type="password" placeholder="At least 12 characters" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <Link href="/app/dashboard">
              <Button className="w-full h-14 rounded-2xl bg-brand hover:bg-brand-soft text-white font-bold text-lg shadow-xl shadow-brand/10 transition-all active:scale-[0.98] mt-4">
                Create my workspace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-center text-sm text-ink-3 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-accent font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-brand relative overflow-hidden items-center justify-center p-24">
        <div className="absolute inset-0 z-0">
          <img
            src={cityHero('Budapest', 'castle')}
            className="w-full h-full object-cover opacity-20"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand/90 to-accent/20" />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8 shadow-2xl shadow-accent/20"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <h2 className="text-5xl font-display font-bold mb-8 tracking-tight leading-tight">
            Built for European <br /> tour operators <br /> who want to scale.
          </h2>
          <div className="space-y-5">
            {[
              'Free 30-day pilot — full feature access',
              'Civitatis, GetYourGuide, Viator, Klook integrations',
              'White-label booking site on your domain',
              'Cross-sell tours from agencies in other cities',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80 font-medium">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-accent" />
            <div className="text-white font-bold">Trusted across Europe</div>
          </div>
          <div className="text-white/60 text-sm leading-relaxed">
            120+ tour agencies in 12 cities use TravelEcosystem to run their operations.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
