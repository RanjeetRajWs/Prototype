'use client';

import React, { useState } from 'react';
import { agencies } from '@/lib/mock-data/agencies';
import { tours } from '@/lib/mock-data/tours';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Info,
  ChevronRight,
  Search,
  Star
} from 'lucide-react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription 
} from '@/components/ui/drawer';
import { toast } from 'sonner';

export default function NetworkPage() {
  const [selectedAgency, setSelectedAgency] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addedTours, setAddedTours] = useState<string[]>([]);

  const handleAddTour = (tourId: string) => {
    if (addedTours.includes(tourId)) {
      setAddedTours(addedTours.filter(id => id !== tourId));
      toast.info('Tour removed from your offering');
    } else {
      setAddedTours([...addedTours, tourId]);
      toast.success('Tour added to your offering', {
        description: 'You will earn commission on every booking of this tour.'
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Cross-sell Network</h1>
          <p className="text-ink-2">Sell tours from partner agencies and earn commission automatically.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencies.map((agency) => (
          <Card 
            key={agency.id} 
            className="border-border shadow-subtle hover:shadow-md transition-all cursor-pointer group"
            onClick={() => {
              setSelectedAgency(agency);
              setIsDrawerOpen(true);
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={agency.logoUrl} className="w-12 h-12 rounded-xl object-cover border border-border" alt="" />
                <div>
                  <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{agency.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-ink-3 font-bold uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-accent" />
                    {agency.city}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-2 font-medium">Tours available</span>
                  <span className="font-bold text-ink">{agency.toursAvailable}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-2 font-medium">Your commission</span>
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success font-bold">{agency.commissionOffered}%</span>
                </div>
              </div>

              <Button variant="outline" className="w-full font-bold border-border group-hover:bg-accent-soft group-hover:border-accent/20 group-hover:text-accent transition-all">
                Browse Catalog
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partner Detail Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-4xl mx-auto border-border h-[80vh]">
          {selectedAgency && (
            <div className="flex flex-col h-full overflow-hidden">
              <DrawerHeader className="p-8 border-b border-border shrink-0">
                <div className="flex items-center gap-6">
                  <img src={selectedAgency.logoUrl} className="w-16 h-16 rounded-2xl object-cover border border-border" alt="" />
                  <div className="flex-1">
                    <DrawerTitle className="text-3xl font-display font-bold tracking-tight mb-2">
                      {selectedAgency.name}
                    </DrawerTitle>
                    <DrawerDescription className="text-sm font-medium text-ink-2 flex items-center gap-4">
                      <span className="flex items-center gap-1.5 uppercase tracking-widest font-bold">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {selectedAgency.city}, {selectedAgency.country}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span className="text-success font-bold">{selectedAgency.commissionOffered}% Commission on all bookings</span>
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-8 bg-bg">
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">Available Tours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tours.filter(t => t.city === selectedAgency.city).map(tour => (
                      <div key={tour.id} className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex gap-4 hover:shadow-md transition-shadow group">
                        <img src={tour.images[0]} className="w-24 h-24 rounded-xl object-cover shrink-0" alt="" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm mb-1 line-clamp-1">{tour.name}</h5>
                          <div className="flex items-center gap-3 text-[10px] text-ink-3 font-bold uppercase tracking-widest mb-3">
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-current" /> {tour.rating}</span>
                            <span>€{tour.basePrice}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant={addedTours.includes(tour.id) ? "outline" : "default"}
                            onClick={(e) => { e.stopPropagation(); handleAddTour(tour.id); }}
                            className={`w-full h-8 text-[10px] font-bold uppercase tracking-widest rounded-lg ${
                              addedTours.includes(tour.id) 
                                ? 'bg-success/5 border-success/20 text-success hover:bg-success/10' 
                                : 'bg-brand text-white hover:bg-brand-soft'
                            }`}
                          >
                            {addedTours.includes(tour.id) ? (
                              <><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Added</>
                            ) : (
                              <><Plus className="w-3.5 h-3.5 mr-1" /> Add to my tours</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-surface rounded-2xl border border-border">
                  <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-3">About this agency</h4>
                  <p className="text-sm text-ink-2 leading-relaxed italic">
                    "{selectedAgency.description}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
