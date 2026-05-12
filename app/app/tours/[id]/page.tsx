'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { tours } from '@/lib/mock-data/tours';
import { bookings } from '@/lib/mock-data/bookings';
import { reviews } from '@/lib/mock-data/reviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  MapPin,
  PencilLine,
  Copy,
  PauseCircle,
  PlayCircle,
  TrendingUp,
  CalendarDays,
  Languages,
  Save,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TourDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const tour = useMemo(() => tours.find((t) => t.id === params.id || t.slug === params.id), [params.id]);

  const [name, setName] = useState(tour?.name ?? '');
  const [basePrice, setBasePrice] = useState(tour?.basePrice ?? 0);
  const [description, setDescription] = useState(tour?.description ?? '');
  const [status, setStatus] = useState(tour?.status ?? 'Active');
  const [saving, setSaving] = useState(false);

  if (!tour) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-display font-bold">Tour not found</h1>
        <Link href="/app/tours">
          <Button variant="outline">Back to tours</Button>
        </Link>
      </div>
    );
  }

  const tourBookings = bookings.filter((b) => b.tourId === tour.id);
  const tourReviews = reviews.filter((r) => r.tourId === tour.id);
  const upcoming = tourBookings.filter((b) => b.date >= new Date()).slice(0, 4);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Tour updated', {
        description: 'Your changes have been saved to all connected channels.',
      });
    }, 1400);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/app/tours"
          className="size-10 rounded-xl border border-border flex items-center justify-center hover:bg-bg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-bold text-ink-3 uppercase tracking-widest mb-1">
            <MapPin className="w-3 h-3 text-accent" /> {tour.city} · {tour.type ?? 'Walking'} · {tour.duration}
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">{tour.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Copy className="w-4 h-4" /> Duplicate
          </Button>
          <Button
            onClick={() => {
              setStatus(status === 'Active' ? 'Paused' : 'Active');
              toast.success(status === 'Active' ? 'Tour paused' : 'Tour activated');
            }}
            variant="outline"
            className="rounded-xl font-bold gap-2"
          >
            {status === 'Active' ? (
              <>
                <PauseCircle className="w-4 h-4 text-warning" /> Pause Sales
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4 text-success" /> Activate
              </>
            )}
          </Button>
          <Button onClick={handleSave} className="bg-brand hover:bg-brand-soft rounded-xl font-bold gap-2">
            {saving ? (
              <>
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Status', value: status, icon: status === 'Active' ? PlayCircle : PauseCircle, tone: status === 'Active' ? 'text-success' : 'text-warning' },
          { label: 'Bookings this month', value: tour.bookingsThisMonth, icon: CalendarDays, tone: 'text-ink' },
          { label: 'Revenue this month', value: `€${tour.revenueThisMonth.toLocaleString()}`, icon: TrendingUp, tone: 'text-ink' },
          { label: 'Avg rating', value: `${tour.rating} (${tour.reviewCount})`, icon: Star, tone: 'text-warning' },
        ].map((s) => (
          <Card key={s.label} className="border-border shadow-subtle">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-bg flex items-center justify-center text-ink-2">
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">{s.label}</div>
              </div>
              <div className={`text-2xl font-display font-bold ${s.tone}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border shadow-subtle">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-bold">Tour basics</h2>
                <PencilLine className="w-4 h-4 text-ink-3" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Base price (€)</label>
                  <Input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Duration</label>
                  <Input value={tour.duration} disabled className="h-12 rounded-xl bg-bg" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Capacity</label>
                  <Input value={tour.capacity} disabled className="h-12 rounded-xl bg-bg" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed focus:outline-none focus:border-ink-3"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-subtle">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-bold">Itinerary</h2>
                <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold gap-1">
                  Add stop
                </Button>
              </div>
              <ol className="space-y-4">
                {tour.itinerary.map((stop, i) => (
                  <motion.li
                    key={stop.stop}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-full bg-accent-soft text-accent font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 pb-4 border-b border-border last:border-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-display font-semibold text-ink">{stop.stop}</div>
                        <div className="text-xs text-ink-3 font-bold uppercase tracking-widest whitespace-nowrap">
                          {stop.durationMin} min
                        </div>
                      </div>
                      <p className="text-sm text-ink-2 mt-1 leading-relaxed">{stop.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-border shadow-subtle">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-bold">Recent reviews</h2>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="w-4 h-4 text-warning fill-current" /> {tour.rating}
                  <span className="text-ink-3 font-medium ml-1">· {tour.reviewCount} reviews</span>
                </div>
              </div>
              {tourReviews.length === 0 ? (
                <p className="text-ink-2 text-sm">No reviews yet for this tour.</p>
              ) : (
                <div className="space-y-5">
                  {tourReviews.slice(0, 4).map((r) => (
                    <div key={r.id} className="pb-5 border-b border-border last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-ink">{r.reviewerName}</div>
                        <div className="text-xs text-ink-3 font-medium">{r.date} · {r.reviewerCountry}</div>
                      </div>
                      <div className="flex items-center gap-1 text-warning mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'opacity-30'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-ink-2 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border shadow-subtle overflow-hidden">
            <img src={tour.images[0]} alt={tour.name} className="aspect-video w-full object-cover" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-ink-3 uppercase tracking-widest">
                <Languages className="w-3 h-3" /> {tour.language.toUpperCase()}
                <span>·</span>
                <Clock className="w-3 h-3" /> {tour.duration}
                <span>·</span>
                <Users className="w-3 h-3" /> Up to {tour.capacity}
              </div>
              <Link href={`/tours/${tour.slug}`} className="block">
                <Button variant="outline" className="w-full rounded-xl font-bold">
                  Preview public page
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border shadow-subtle">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-ink-2 uppercase tracking-widest mb-4">Upcoming bookings</h3>
              {upcoming.length === 0 ? (
                <div className="text-sm text-ink-3">No upcoming bookings.</div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((b) => (
                    <div key={b.id} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold text-ink">{b.travelerName}</div>
                        <div className="text-xs text-ink-3">
                          {b.date.toLocaleDateString()} · {b.time} · {b.pax} pax
                        </div>
                      </div>
                      <div className="font-bold text-ink">€{b.amount}</div>
                    </div>
                  ))}
                </div>
              )}
              <Link
                href="/app/bookings"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent hover:underline"
              >
                See all bookings
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border shadow-subtle">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-ink-2 uppercase tracking-widest mb-4">Distribution</h3>
              <div className="space-y-3 text-sm">
                {['Direct site', 'Civitatis', 'GetYourGuide', 'Viator'].map((channel, i) => (
                  <div key={channel} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-success' : 'bg-ink-3'}`} />
                      <span className={i === 0 ? 'text-ink font-semibold' : 'text-ink-2'}>{channel}</span>
                    </div>
                    <span className="text-xs font-bold text-ink-3 uppercase tracking-widest">
                      {i === 0 ? 'Connected' : 'Available'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
