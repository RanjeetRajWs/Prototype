'use client';

import React, { useState } from 'react';
import { bookings } from '@/lib/mock-data/bookings';
import { tours } from '@/lib/mock-data/tours';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Calendar, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  Download,
  Mail,
  User as UserIcon,
  Phone,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import { format } from 'date-fns';

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-success/10 text-success';
      case 'Pending': return 'bg-warning/10 text-warning';
      case 'Cancelled': return 'bg-danger/10 text-danger';
      case 'Completed': return 'bg-bg text-ink-3';
      default: return 'bg-bg text-ink-2';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Pending': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'Cancelled': return <XCircle className="w-3.5 h-3.5" />;
      case 'Completed': return <Clock className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Bookings</h1>
          <p className="text-ink-2">Manage all your reservations across all channels.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button className="bg-brand hover:bg-brand-soft text-white font-bold shadow-lg">
            + New Booking
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface p-4 rounded-2xl border border-border shadow-subtle flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
          <Input 
            placeholder="Search by name, email, or booking ID..." 
            className="pl-10 h-11 bg-bg border-transparent focus:border-border rounded-xl"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 h-11 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold">
            <Calendar className="w-4 h-4 text-accent" />
            Date Range
            <ChevronDown className="w-4 h-4 text-ink-3" />
          </button>
          <button className="flex items-center gap-2 px-4 h-11 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold">
            Status
            <ChevronDown className="w-4 h-4 text-ink-3" />
          </button>
          <button className="flex items-center gap-2 px-4 h-11 bg-bg rounded-xl border border-transparent hover:border-border transition-colors text-sm font-semibold">
            Channel
            <ChevronDown className="w-4 h-4 text-ink-3" />
          </button>
          <Button variant="ghost" className="h-11 px-4 text-ink-2 font-bold hover:bg-bg rounded-xl">
            <Filter className="w-4 h-4 mr-2" /> More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-subtle overflow-hidden">
        <Table>
          <TableHeader className="bg-bg">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Booking ID</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Tour</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Traveler</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4 text-center">Pax</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Channel</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Status</TableHead>
              <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? bookings.map((booking) => {
              const tour = tours.find(t => t.id === booking.tourId);
              return (
                <TableRow 
                  key={booking.id} 
                  className="hover:bg-bg/50 cursor-pointer transition-colors border-border group"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsDrawerOpen(true);
                  }}
                >
                  <TableCell className="font-mono text-xs font-bold text-ink-2 py-4">
                    {booking.id}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-bold text-sm truncate max-w-[200px]">{tour?.name}</div>
                    <div className="text-xs text-ink-3 font-medium uppercase tracking-wider">
                      {format(booking.date, 'dd MMM')} · {booking.time}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-sm">
                    {booking.travelerName}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg font-bold text-xs text-ink-2">
                      {booking.pax}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        booking.source === 'Civitatis' ? 'bg-orange-500' :
                        booking.source === 'GetYourGuide' ? 'bg-blue-500' :
                        'bg-brand'
                      }`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-2">{booking.source}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-bold text-ink">
                    €{booking.amount}
                  </TableCell>
                  <TableCell className="py-4">
                    <Button variant="ghost" size="icon" className="text-ink-3 group-hover:text-ink opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }) : (
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center text-ink-3">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold">No bookings found</div>
                    <p className="text-xs text-ink-2">Try adjusting your filters or search query.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-border bg-bg/50 flex items-center justify-between">
          <span className="text-xs font-bold text-ink-3 uppercase tracking-widest">Showing 5 of 64 bookings</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="h-8 text-[10px] font-bold uppercase tracking-widest border-border">Prev</Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest border-border">Next</Button>
          </div>
        </div>
      </div>

      {/* Booking Detail Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-2xl mx-auto border-border">
          {selectedBooking && (
            <div className="p-8">
              <DrawerHeader className="px-0 pt-0 mb-8 border-b border-border pb-6 flex flex-row items-center justify-between">
                <div>
                  <DrawerTitle className="text-2xl font-display font-bold tracking-tight mb-2">
                    Booking {selectedBooking.id}
                  </DrawerTitle>
                  <DrawerDescription className="text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(selectedBooking.status)}`}>
                      {getStatusIcon(selectedBooking.status)}
                      {selectedBooking.status}
                    </span>
                    <span className="text-ink-3">Created on Oct 09, 2025</span>
                  </DrawerDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-bold border-border">
                    <Mail className="w-4 h-4 mr-2" /> Resend Voucher
                  </Button>
                  <Button variant="outline" size="sm" className="font-bold border-border text-danger hover:bg-danger/10 hover:text-danger hover:border-danger/20">
                    Cancel Booking
                  </Button>
                </div>
              </DrawerHeader>

              <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">Tour & Schedule</h4>
                    <div className="bg-bg p-4 rounded-2xl border border-border">
                      <div className="font-bold text-ink mb-1">{tours.find(t => t.id === selectedBooking.tourId)?.name}</div>
                      <div className="flex items-center gap-2 text-sm text-ink-2">
                        <Calendar className="w-4 h-4" />
                        {format(selectedBooking.date, 'EEEE, dd MMMM yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-ink-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {selectedBooking.time}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">Traveler Info</h4>
                    <div className="space-y-4 px-2">
                      <div className="flex items-center gap-3">
                        <UserIcon className="w-4 h-4 text-ink-3" />
                        <span className="text-sm font-bold text-ink">{selectedBooking.travelerName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-ink-3" />
                        <span className="text-sm font-medium text-ink-2">{selectedBooking.travelerEmail}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-ink-3" />
                        <span className="text-sm font-medium text-ink-2">+420 777 123 456</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">Payment Summary</h4>
                    <div className="bg-bg p-6 rounded-2xl border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-ink-2">Amount Paid</span>
                        <span className="text-xl font-display font-bold">€{selectedBooking.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-ink-3 uppercase tracking-widest font-bold">Method</span>
                        <div className="flex items-center gap-2 font-bold text-ink">
                          <CreditCard className="w-3 h-3" />
                          MasterCard ···· 4421
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">Notes</h4>
                    <p className="text-sm text-ink-2 italic p-4 bg-accent-soft/30 border border-accent/10 rounded-2xl">
                      "{selectedBooking.notes || 'No special notes for this reservation.'}"
                    </p>
                  </div>
                </div>
              </div>

              <DrawerFooter className="px-0 pt-6 border-t border-border flex flex-row gap-4">
                <Button className="flex-1 bg-brand text-white font-bold h-12 rounded-xl">Check-in Traveler</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1 font-bold h-12 rounded-xl">Close Panel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
