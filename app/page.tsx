'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/navbar';
import { Button } from '@/components/ui/button';
import { tours } from '@/lib/mock-data/tours';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, CheckCircle2, Users, Globe } from 'lucide-react';
import { cityHero } from '@/lib/scene-image';

export default function Home() {
  const featuredTours = tours.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-prague.png"
              alt="Prague Old Town"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              Discover Prague through <br /> the eyes of locals
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join 30,000+ travelers who booked authentic tours, activities, and experiences with our trusted network of guides across Europe.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/tours">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg font-semibold rounded-full">
                  Browse Tours
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 h-14 text-lg font-semibold rounded-full">
                How it works
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-surface border-y border-border py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Travelers served', value: '30,000+' },
                { label: 'Average rating', value: '4.9/5' },
                { label: 'Cities across Europe', value: '12' },
                { label: 'Local guides', value: '250+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-display font-bold text-ink mb-1">{stat.value}</div>
                  <div className="text-sm text-ink-2 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tours */}
        <section className="py-24 bg-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Unforgettable Experiences</h2>
                <p className="text-ink-2 text-lg">Hand-picked tours led by expert local guides.</p>
              </div>
              <Link href="/tours" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                View all tours <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTours.map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
                  <div className="bg-surface rounded-2xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={tour.images[0]} 
                        alt={tour.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {tour.city}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-warning mb-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-ink">{tour.rating}</span>
                        <span className="text-sm text-ink-3">({tour.reviewCount})</span>
                      </div>
                      <h3 className="font-display font-bold text-lg mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                        {tour.name}
                      </h3>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-1.5 text-ink-2 text-sm">
                          <Clock className="w-4 h-4" />
                          {tour.duration}
                        </div>
                        <div className="text-ink font-bold">
                          <span className="text-xs text-ink-2 font-medium">From</span> €{tour.basePrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">Authentic Travel, Simplified</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Choose your tour',
                  desc: 'Browse hundreds of unique experiences across Europe and pick what fits your style.',
                  icon: MapPin,
                  color: 'bg-accent-soft text-accent'
                },
                {
                  title: 'Pay securely',
                  desc: 'Check out in seconds using Stripe, SumUp, or PayPal. Instant confirmation to your inbox.',
                  icon: CheckCircle2,
                  color: 'bg-green-100 text-green-600'
                },
                {
                  title: 'Meet your guide',
                  desc: 'Follow the live GPS in our app to find your guide easily at the designated meeting point.',
                  icon: Users,
                  color: 'bg-blue-100 text-blue-600'
                },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-ink-2 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-20" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready for your next adventure?</h2>
              <p className="text-white/70 text-lg max-w-xl">Book your local experience today and see Europe from a different perspective.</p>
            </div>
            <Link href="/tours">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-10 h-16 text-xl font-bold rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                Explore All Tours
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-surface pt-20 pb-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">
                  T
                </div>
                <span className="font-display font-bold text-xl tracking-tight">TravelEcosystem</span>
              </Link>
              <p className="text-ink-2 max-w-xs mb-8">
                Empowering local guides and travel agencies across Europe with the best-in-class booking technology.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center hover:bg-accent-soft hover:text-accent transition-colors cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center hover:bg-accent-soft hover:text-accent transition-colors cursor-pointer">
                  <span className="font-bold">tw</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center hover:bg-accent-soft hover:text-accent transition-colors cursor-pointer">
                  <span className="font-bold">ig</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Tours</h4>
              <ul className="space-y-4 text-sm text-ink-2">
                <li><Link href="/tours/prague" className="hover:text-accent">Prague</Link></li>
                <li><Link href="/tours/budapest" className="hover:text-accent">Budapest</Link></li>
                <li><Link href="/tours/vienna" className="hover:text-accent">Vienna</Link></li>
                <li><Link href="/tours/krakow" className="hover:text-accent">Krakow</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-ink-2">
                <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-accent">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-ink-2">
                <li><Link href="/help" className="hover:text-accent">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-ink-3">© 2025 TravelEcosystem SaaS. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-ink-2 flex items-center gap-2 cursor-pointer hover:text-ink">
                <Globe className="w-4 h-4" />
                English (US)
              </span>
              <span className="text-sm text-ink-2 cursor-pointer hover:text-ink">EUR (€)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
