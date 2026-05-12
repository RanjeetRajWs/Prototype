'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/marketing/navbar';
import { tours } from '@/lib/mock-data/tours';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users as UsersIcon, 
  Filter, 
  ChevronDown, 
  Star, 
  Clock, 
  Languages 
} from 'lucide-react';
import Link from 'next/link';

export default function TourCatalog() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = tours.filter(tour => {
    const matchesCity = selectedCity === 'All' || tour.city === selectedCity;
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tour.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 tracking-tight">Explore Europe</h1>
            <p className="text-ink-2 text-lg">Discover the best tours and activities in {selectedCity === 'All' ? 'Central Europe' : selectedCity}.</p>
          </div>

          {/* Filter Bar */}
          <div className="sticky top-24 z-20 mb-12">
            <div className="bg-surface p-4 rounded-2xl shadow-subtle border border-border flex flex-col lg:flex-row items-center gap-4">
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-3" />
                <Input 
                  placeholder="Search tours, cities..." 
                  className="pl-12 h-12 bg-bg border-transparent focus:border-border rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="h-8 w-px bg-border hidden lg:block" />

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 h-12 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold whitespace-nowrap">
                    <MapPin className="w-4 h-4 text-accent" />
                    {selectedCity}
                    <ChevronDown className="w-4 h-4 text-ink-3" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                    {['All', 'Prague', 'Budapest', 'Vienna', 'Krakow'].map((city) => (
                      <button 
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-bg first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 h-12 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-accent" />
                  Select Date
                </button>

                <button className="flex items-center gap-2 px-4 h-12 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold whitespace-nowrap">
                  <UsersIcon className="w-4 h-4 text-accent" />
                  2 Travelers
                </button>

                <button className="flex items-center gap-2 px-4 h-12 bg-ink text-white rounded-xl text-sm font-bold ml-auto lg:ml-0">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Quick Pills */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
              {['All experiences', 'Walking Tours', 'Food & Drink', 'Day Trips', 'Boat Tours', 'Nightlife', 'History'].map((tag) => (
                <button key={tag} className="px-4 py-1.5 bg-surface border border-border rounded-full text-xs font-bold whitespace-nowrap hover:bg-accent-soft hover:text-accent hover:border-accent/20 transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTours.map((tour) => (
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
                    <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-warning mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-ink">{tour.rating}</span>
                      <span className="text-sm text-ink-3">({tour.reviewCount})</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors h-14">
                      {tour.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-1.5 text-ink-2 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-ink-2 text-xs font-medium">
                        <Languages className="w-3.5 h-3.5 text-accent" />
                        {tour.language.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-ink font-bold text-xl">
                        <span className="text-xs text-ink-2 font-medium block leading-none mb-1">From</span> €{tour.basePrice}
                      </div>
                      <Button variant="ghost" size="sm" className="text-accent font-bold group-hover:bg-accent-soft">
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-bg rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                <Search className="w-10 h-10 text-ink-3" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">No tours found</h2>
              <p className="text-ink-2">Try adjusting your filters or search query.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSelectedCity('All'); setSearchQuery(''); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
