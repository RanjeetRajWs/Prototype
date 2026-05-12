'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  QrCode,
  Download,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { monogramAvatar } from '@/lib/scene-image';

export default function GuideDashboard() {
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState<number[]>([]);

  const handleCheckin = (id: number) => {
    if (checkedIn.includes(id)) {
      setCheckedIn(checkedIn.filter(i => i !== id));
    } else {
      setCheckedIn([...checkedIn, id]);
      toast.success('Traveler checked in');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-soft border-2 border-surface shadow-md overflow-hidden">
            <img src={monogramAvatar('Maria Lopez')} alt="Maria Lopez" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-ink">Hi, Maria!</h1>
            <p className="text-xs text-ink-3 font-bold uppercase tracking-widest">Expert Guide</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-ink-2 bg-surface shadow-sm rounded-xl">
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border shadow-subtle bg-accent text-white">
          <CardContent className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Today's Earnings</div>
            <div className="text-2xl font-display font-bold">€124.50</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-subtle bg-surface">
          <CardContent className="p-4">
            <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-1">Rating</div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-display font-bold">4.9</span>
              <Star className="w-4 h-4 text-warning fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4 px-1">Today's Tours</h3>
        <div className="space-y-4">
          {[
            { id: 1, time: '10:00', name: 'Old Town Walking Tour', pax: 12, meeting: 'Old Town Square', status: 'In Progress' },
            { id: 2, time: '14:30', name: 'Prague Castle & Lesser Town', pax: 8, meeting: 'St. Vitus Cathedral', status: 'Upcoming' },
          ].map((tour) => (
            <Card key={tour.id} className="border-border shadow-subtle hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-bg rounded-lg text-xs font-bold text-ink">{tour.time}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    tour.status === 'In Progress' ? 'text-accent' : 'text-ink-3'
                  }`}>
                    {tour.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg mb-4">{tour.name}</h4>
                <div className="flex items-center gap-4 text-xs text-ink-2 font-medium mb-6">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {tour.pax} pax
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {tour.meeting}
                  </span>
                </div>
                <Button 
                  onClick={() => setIsCheckinOpen(true)}
                  className="w-full h-12 bg-brand text-white font-bold rounded-xl shadow-lg"
                >
                  Start Check-in
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-border shadow-subtle overflow-hidden">
        <CardContent className="p-8 text-center">
          <h3 className="font-display font-bold text-lg mb-2">My Affiliate QR</h3>
          <p className="text-sm text-ink-2 mb-6">Show this to guests to earn commission on their next booking.</p>
          <div className="w-48 h-48 bg-bg border border-border rounded-3xl mx-auto mb-6 flex items-center justify-center p-4">
            <QrCode className="w-full h-full text-brand" />
          </div>
          <Button variant="outline" className="w-full font-bold border-border h-11 rounded-xl">
            <Download className="w-4 h-4 mr-2" /> Download QR
          </Button>
        </CardContent>
      </Card>

      {/* Check-in Modal */}
      <Dialog open={isCheckinOpen} onOpenChange={setIsCheckinOpen}>
        <DialogContent className="max-w-md mx-auto border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">Traveler Check-in</DialogTitle>
            <DialogDescription className="font-medium">
              Old Town Walking Tour · 10:00 AM
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 space-y-4 max-h-[400px] overflow-y-auto px-1">
            {[
              { id: 1, name: 'John Doe', pax: 2, note: 'English Audio' },
              { id: 2, name: 'Elena Garcia', pax: 3, note: 'None' },
              { id: 3, name: 'Robert Smith', pax: 1, note: 'Birthday' },
              { id: 4, name: 'Marta Sanchez', pax: 4, note: 'None' },
              { id: 5, name: 'Marco Ricci', pax: 2, note: 'Student' },
            ].map((traveler) => (
              <div 
                key={traveler.id}
                onClick={() => handleCheckin(traveler.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  checkedIn.includes(traveler.id) 
                    ? 'border-success bg-success/5' 
                    : 'border-bg hover:border-border'
                }`}
              >
                <div>
                  <div className="font-bold text-sm mb-1">{traveler.name}</div>
                  <div className="flex items-center gap-3 text-xs text-ink-3 font-medium">
                    <span>{traveler.pax} pax</span>
                    {traveler.note !== 'None' && <span className="text-accent font-bold italic">{traveler.note}</span>}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  checkedIn.includes(traveler.id) 
                    ? 'bg-success border-success text-white' 
                    : 'border-border'
                }`}>
                  {checkedIn.includes(traveler.id) && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button 
              className="w-full h-12 bg-brand text-white font-bold rounded-xl"
              onClick={() => {
                setIsCheckinOpen(false);
                toast.success('Check-in process finished!', {
                  description: `${checkedIn.length} bookings confirmed.`
                });
              }}
            >
              Finish Check-in ({checkedIn.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
