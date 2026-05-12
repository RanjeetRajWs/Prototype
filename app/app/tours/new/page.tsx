'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  MapPin, 
  Clock, 
  Calendar, 
  Info,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { sceneImage } from '@/lib/scene-image';

const wizardPhotos = [
  sceneImage('old-town-astronomical-clock', 'Old Town Square', 'Prague · Walking'),
  sceneImage('vltava-river-cruise', 'Vltava River', 'Prague · Boat'),
  sceneImage('charles-bridge-by-night', 'Charles Bridge', 'Prague · Night'),
];

const steps = [
  { id: 1, title: 'Basics', desc: 'Tour name and type' },
  { id: 2, title: 'Pricing', desc: 'Base price and tiers' },
  { id: 3, title: 'Schedule', desc: 'Availability and slots' },
  { id: 4, title: 'Media', desc: 'Photos and location' },
];

export default function CreateTourWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success('Tour created successfully!');
        router.push('/app/tours');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Create New Tour</h1>
          <p className="text-ink-2">Complete the steps below to publish your tour.</p>
        </div>
        <Button variant="ghost" onClick={() => router.back()} className="text-ink-3 font-bold uppercase tracking-widest text-xs">
          Cancel & Exit
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle flex items-center justify-between sticky top-24 z-10">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                currentStep === step.id ? 'bg-brand text-white ring-4 ring-brand/10' : 
                currentStep > step.id ? 'bg-success text-white' : 'bg-bg text-ink-3 border border-border'
              }`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="hidden md:block">
                <div className={`text-[10px] font-bold uppercase tracking-widest ${
                  currentStep === step.id ? 'text-brand' : 'text-ink-3'
                }`}>{step.title}</div>
                <div className="text-xs font-medium text-ink-2 whitespace-nowrap">{step.desc}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-border mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Content */}
      <Card className="border-border shadow-subtle overflow-hidden">
        <CardContent className="p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Tour Name</label>
                      <Input placeholder="e.g. Hidden Gems of Old Town" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Tour Type</label>
                      <select className="w-full h-12 px-4 bg-bg border border-border rounded-xl text-sm font-medium focus:ring-2 ring-accent/20 outline-none transition-all appearance-none">
                        <option>Walking Tour</option>
                        <option>Food & Tasting</option>
                        <option>Day Trip</option>
                        <option>Bike Tour</option>
                        <option>Boat Cruise</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                      className="w-full h-40 p-4 bg-bg border border-border rounded-xl text-sm font-medium focus:ring-2 ring-accent/20 outline-none transition-all resize-none"
                      placeholder="Tell travelers what makes this experience special..."
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Language</label>
                      <Input placeholder="English" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Duration</label>
                      <Input placeholder="3 hours" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Capacity</label>
                      <Input type="number" placeholder="20" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Min Pax</label>
                      <Input type="number" placeholder="1" className="h-11 rounded-xl" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-accent-soft/30 rounded-2xl border border-accent/10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <Info className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-accent/80 font-medium">
                      Pricing is set per person in EUR. You can also define group rates or children discounts.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Base Price (Adult)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-ink-3">€</span>
                          <Input type="number" defaultValue="25" className="h-12 pl-10 rounded-xl text-lg font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Child Price (Under 12)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-ink-3">€</span>
                          <Input type="number" defaultValue="15" className="h-12 pl-10 rounded-xl text-lg font-bold" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-ink mb-4">Volume Discounts</h4>
                      {[
                        { label: '3-5 travelers', discount: '5%' },
                        { label: '6-10 travelers', discount: '10%' },
                        { label: '10+ travelers', discount: '15%' },
                      ].map((tier, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg">
                          <span className="text-sm font-bold text-ink-2">{tier.label}</span>
                          <span className="text-sm font-bold text-success">-{tier.discount}</span>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="text-accent font-bold text-xs uppercase tracking-widest">+ Add Tier</Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Operational Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <button key={day} className="w-14 h-14 rounded-xl border-2 border-border flex items-center justify-center font-bold text-sm hover:border-accent hover:bg-accent-soft transition-all">
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Time Slots</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['10:00', '14:30', '18:00'].map(time => (
                        <div key={time} className="p-4 bg-bg border border-border rounded-xl flex items-center justify-between">
                          <span className="font-bold">{time}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-danger">×</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="h-full border-dashed rounded-xl font-bold text-ink-3 hover:text-accent hover:border-accent">
                        + Add Time
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Photos</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="aspect-square bg-bg border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-ink-3 hover:border-accent hover:text-accent cursor-pointer transition-all">
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-bold uppercase">Upload</span>
                      </div>
                      {wizardPhotos.map((src, i) => (
                        <div key={i} className="aspect-square bg-bg border border-border rounded-2xl relative group overflow-hidden">
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="text-white"><ImageIcon className="w-5 h-5" /></Button>
                          </div>
                          <img src={src} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest ml-1">Meeting Point</label>
                    <div className="relative h-48 bg-bg border border-border rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-ink-3" />
                      <span className="text-xs font-bold text-ink-3 ml-2 uppercase">Map Selection Placeholder</span>
                    </div>
                    <Input placeholder="Old Town Square 1, Prague" className="h-12 rounded-xl" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <div className="px-10 py-8 bg-bg border-t border-border flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="font-bold text-ink-2 h-12 px-6 rounded-xl gap-2 disabled:opacity-0 transition-all"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={loading}
            className="bg-brand hover:bg-brand-soft text-white font-bold h-12 px-10 rounded-xl gap-2 shadow-lg"
          >
            {loading ? 'Publishing...' : currentStep === 4 ? 'Publish Tour' : 'Next Step'}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
