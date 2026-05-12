'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  MapPin,
  Lock,
  Mail,
  User as UserIcon,
  Globe,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cityHero, monogramAvatar } from '@/lib/scene-image';

const avatarNames = ['Maria Lopez', 'Marco Ricci', 'Anna Svobodova', 'Sofia Garcia', 'Lorenzo Bianchi'];

export default function LoginPage() {
  const [role, setRole] = useState('Admin');

  return (
    <div className="min-h-screen flex">
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 bg-surface">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              T
            </div>
            <span className="font-display font-bold text-xl tracking-tight">TravelEcosystem</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">Welcome back</h1>
            <p className="text-ink-2 font-medium">Log in to manage your tours and bookings.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Email address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <Input placeholder="petr.novak@example.com" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Password</label>
                <button className="text-xs font-bold text-accent hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <Input type="password" placeholder="••••••••" className="h-14 pl-12 rounded-2xl border-border bg-bg/50" />
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4 ml-1">Select Role (Demo Only)</div>
              <div className="grid grid-cols-2 gap-3">
                {['Admin', 'Manager', 'Guide', 'Promoter'].map((r) => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`h-11 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${
                      role === r ? 'border-brand bg-brand text-white' : 'border-border text-ink-3 hover:border-ink-3'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/app/dashboard">
              <Button className="w-full h-14 rounded-2xl bg-brand hover:bg-brand-soft text-white font-bold text-lg shadow-xl shadow-brand/10 transition-all active:scale-[0.98] mt-4">
                Log in to Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-12 text-center text-sm text-ink-3 font-medium">
            Don't have an agency account? <Link href="/signup" className="text-accent font-bold hover:underline">Request a demo</Link>
          </p>
        </div>
      </div>

      {/* Right side: Visual */}
      <div className="hidden lg:flex flex-1 bg-brand relative overflow-hidden items-center justify-center p-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-prague.png"
            className="w-full h-full object-cover opacity-30"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand/80 to-accent/30" />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8 shadow-2xl shadow-accent/20"
          >
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
          <h2 className="text-5xl font-display font-bold mb-8 tracking-tight leading-tight">
            The standard for <br /> modern travel <br /> experiences.
          </h2>
          <div className="space-y-6">
            {[
              "Automated channel management",
              "Real-time guide coordination",
              "Whitelabel booking engine",
              "Cross-agency sales network"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-white/70 font-medium">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Stat Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">€142,500+</div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Revenue processed today</div>
            </div>
          </div>
          <div className="flex -space-x-3">
            {avatarNames.map((name) => (
              <div key={name} className="w-8 h-8 rounded-full border-2 border-brand overflow-hidden">
                <img src={monogramAvatar(name)} alt={name} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
