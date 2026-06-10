/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, ArrowUpRight, CheckCircle2, Loader2, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { ReservationData } from '../types';

export default function Reservations() {
  const [formData, setFormData] = useState<ReservationData>({
    date: 'Jun 15, 2026',
    time: '7:30 PM',
    guests: '2 Guests'
  });

  const [activeDrop, setActiveDrop] = useState<'none' | 'date' | 'time' | 'guests'>('none');
  const [isSearching, setIsSearching] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; table: string } | null>(null);

  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setActiveDrop('none');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const timeSlots = ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const guestCounts = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '8 Guests', 'Private Lounge (9+)'];

  // A simple representation of next fortnight's dates to choose
  const mockDates = [
    { label: 'Today, Jun 9', value: 'Jun 09, 2026' },
    { label: 'Wed, Jun 10', value: 'Jun 10, 2026' },
    { label: 'Thu, Jun 11', value: 'Jun 11, 2026' },
    { label: 'Fri, Jun 12', value: 'Jun 12, 2026' },
    { label: 'Sat, Jun 13', value: 'Jun 13, 2026' },
    { label: 'Sun, Jun 14', value: 'Jun 14, 2026' },
    { label: 'Mon, Jun 15', value: 'Jun 15, 2026', recommended: true },
    { label: 'Tue, Jun 16', value: 'Jun 16, 2026' },
    { label: 'Wed, Jun 17', value: 'Jun 17, 2026' },
    { label: 'Thu, Jun 18', value: 'Jun 18, 2026' },
  ];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate luxury API matching
    setTimeout(() => {
      setIsSearching(false);
      const randomId = 'ELAN-' + Math.floor(1000 + Math.random() * 9000);
      const tables = ['Window Hearth Table 14', 'The Velvet Alcove 03', 'Rooftop Skylight Terrace 22', 'The Brass Counter Seat 05'];
      const assignedTable = tables[Math.floor(Math.random() * tables.length)];
      setConfirmedBooking({
        id: randomId,
        table: assignedTable
      });
    }, 2800);
  };

  return (
    <section
      id="reservations"
      className="relative py-24 md:py-32 bg-[#0B0A09] overflow-hidden"
    >
      {/* Background radial soft light flares */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-gold-700/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-bronze-800/10 blur-[100px] pointer-events-none" />
      </div>

      <div data-section-content className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial Headers */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs tracking-[0.3em] text-gold-300 uppercase">
              RESERVATIONS
            </span>
            <div className="h-[1px] w-12 bg-gold-400/50" />
          </div>

          <h2
            id="reservations-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.12em] leading-tight text-[#F7F1EA]"
          >
            JOIN US FOR <br />
            AN UNFORGETTABLE <br />
            EVENING
          </h2>

          <div className="h-[1px] w-20 bg-bronze-800" />
          
          <div className="space-y-4 text-bronze-200/80 font-serif text-sm leading-relaxed max-w-sm">
            <p>
              Due to our intimate scale and micro-season sourcing, seating is highly limited. Reservations open 30 days in advance.
            </p>
            <p>
              We maintain a smart elegant dress code. Outerwear and sports apparel are politely restricted.
            </p>
          </div>
        </div>

        {/* Right Side: Visual Inputs Component Widget */}
        <div className="lg:col-span-7" ref={dropRef}>
          <div data-depth-card className="bg-[#0D0B0A] border border-bronze-900/60 p-6 md:p-10 shadow-2xl relative">
            
            {/* Frame accent corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-400" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold-400" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold-400" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold-400" />

            {/* Simulated Live Loading Search State */}
            {isSearching ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-6 text-center select-none min-h-[310px]">
                <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
                <div className="space-y-2">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-gold-300 block uppercase animate-pulse">Checking Table Configurations</span>
                  <p className="font-serif italic text-sm text-bronze-200">
                    Sourcing seating map for {formData.date} at {formData.time}...
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                
                {/* 3 Columns Flex Grid of selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  
                  {/* DATE Field Selector */}
                  <div className="relative space-y-2">
                    <label className="font-sans text-[10px] tracking-[0.25em] text-[#F7F1EA]/50 block uppercase">
                      DATE
                    </label>
                    <button
                      data-sound="toggle"
                      id="date-picker-trigger"
                      type="button"
                      onClick={() => setActiveDrop(activeDrop === 'date' ? 'none' : 'date')}
                      className="w-full flex items-center justify-between border-b border-bronze-800/80 pb-3 text-sm font-sans tracking-wide text-bronze-50 hover:text-gold-200 hover:border-gold-400/50 transition-all text-left bg-transparent cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold-400/80" />
                        {formData.date}
                      </span>
                      <span className="text-[10px] text-bronze-500">▼</span>
                    </button>

                    {/* Expandable Date Drop list */}
                    <AnimatePresence>
                      {activeDrop === 'date' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 mt-2 z-30 max-h-56 overflow-y-auto bg-[#0E0D0C] border border-bronze-800 p-2 shadow-2xl space-y-1"
                        >
                          {mockDates.map((d) => (
                            <button
                              key={d.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, date: d.value });
                                setActiveDrop('none');
                              }}
                              className="w-full flex justify-between items-center px-3 py-2 text-xs font-sans tracking-wider hover:bg-gold-500/10 hover:text-gold-200 text-left text-bronze-100 transition-colors cursor-pointer"
                            >
                              <span>{d.label}</span>
                              {d.recommended && (
                                <span className="text-[7.5px] border border-gold-500/30 text-gold-300 px-1 py-0.5 uppercase">RECOMMENDED</span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* TIME Field Selector */}
                  <div className="relative space-y-2">
                    <label className="font-sans text-[10px] tracking-[0.25em] text-[#F7F1EA]/50 block uppercase">
                      TIME
                    </label>
                    <button
                      data-sound="toggle"
                      id="time-picker-trigger"
                      type="button"
                      onClick={() => setActiveDrop(activeDrop === 'time' ? 'none' : 'time')}
                      className="w-full flex items-center justify-between border-b border-bronze-800/80 pb-3 text-sm font-sans tracking-wide text-bronze-50 hover:text-gold-200 hover:border-gold-400/50 transition-all text-left bg-transparent cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold-400/80" />
                        {formData.time}
                      </span>
                      <span className="text-[10px] text-bronze-500">▼</span>
                    </button>

                    {/* Expandable Time List */}
                    <AnimatePresence>
                      {activeDrop === 'time' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 mt-2 z-30 max-h-56 overflow-y-auto bg-[#0E0D0C] border border-bronze-800 p-2 shadow-2xl grid grid-cols-2 gap-1"
                        >
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, time: slot });
                                setActiveDrop('none');
                              }}
                              className="px-3 py-2 text-xs font-sans tracking-wider hover:bg-gold-500/10 hover:text-gold-200 text-center text-bronze-100 transition-colors cursor-pointer"
                            >
                              {slot}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* GUESTS Field Selector */}
                  <div className="relative space-y-2">
                    <label className="font-sans text-[10px] tracking-[0.25em] text-[#F7F1EA]/50 block uppercase">
                      GUESTS
                    </label>
                    <button
                      data-sound="toggle"
                      id="guests-picker-trigger"
                      type="button"
                      onClick={() => setActiveDrop(activeDrop === 'guests' ? 'none' : 'guests')}
                      className="w-full flex items-center justify-between border-b border-bronze-800/80 pb-3 text-sm font-sans tracking-wide text-bronze-50 hover:text-gold-200 hover:border-gold-400/50 transition-all text-left bg-transparent cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold-400/80" />
                        {formData.guests}
                      </span>
                      <span className="text-[10px] text-bronze-500">▼</span>
                    </button>

                    {/* Expandable Guest Sizes */}
                    <AnimatePresence>
                      {activeDrop === 'guests' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 mt-2 z-30 max-h-56 overflow-y-auto bg-[#0E0D0C] border border-bronze-800 p-2 shadow-2xl space-y-1"
                        >
                          {guestCounts.map((count) => (
                            <button
                              key={count}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, guests: count });
                                setActiveDrop('none');
                              }}
                              className="w-full px-3 py-2 text-xs font-sans tracking-wider hover:bg-gold-500/10 hover:text-gold-200 text-left text-bronze-100 transition-colors cursor-pointer"
                            >
                              {count}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Reservation Action CTA button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                  <div className="text-[10px] font-sans tracking-[0.15em] text-bronze-400 text-left flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-400/60 shrink-0" />
                    <span>Seating layout secured via SSL 256-Bit</span>
                  </div>

                  <motion.button
                    layoutId="find-table-panel"
                    data-sound="confirm"
                    id="find-table-btn"
                    type="submit"
                    className="w-full md:w-auto bg-gold-400 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] text-[#0B0A09] text-xs font-sans font-semibold tracking-[0.25em] px-10 py-4.5 transition-all duration-300 shadow-xl cursor-pointer uppercase flex items-center justify-center gap-2"
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    FIND A TABLE
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </motion.button>
                </div>

              </form>
            )}

            {/* Footer contact disclaimer */}
            <div className="mt-8 pt-6 border-t border-bronze-900/30 text-center text-[10px] font-sans tracking-wider text-bronze-400">
              For special requests or private events, please{' '}
              <a href="#footer" className="text-gold-300 hover:text-[#F7F1EA] hover:underline transition-all">
                contact us
              </a>
              .
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Receipt Success Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <motion.div
            id="reservation-receipt-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-[#070605]/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0" onClick={() => setConfirmedBooking(null)} />
            <motion.div
              layoutId="find-table-panel"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0D0B0A] border-2 border-gold-400 max-w-md w-full relative overflow-hidden shadow-2xl p-6 md:p-8 text-center z-10"
            >
              {/* Gold light burst */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10 select-none">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-300 flex items-center justify-center text-gold-300 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl tracking-widest text-[#F7F1EA]">TABLE SECURED</h3>
                  <p className="font-sans text-[10px] tracking-[0.3em] text-gold-300 uppercase">
                    Your Gastronomic Passport
                  </p>
                </div>

                {/* Coupon Inner design */}
                <div className="border border-dashed border-bronze-800 p-4 bg-black/60 rounded-sm text-center font-sans space-y-4 relative">
                  
                  {/* Left notch */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#0D0B0A] border-r border-bronze-800 rounded-full" />
                  {/* Right notch */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#0D0B0A] border-l border-bronze-800 rounded-full" />

                  <div className="grid grid-cols-2 gap-4 text-left border-b border-bronze-900/40 pb-4">
                    <div>
                      <span className="text-[8px] text-bronze-500 block uppercase tracking-widest font-semibold">LOCALE</span>
                      <span className="text-xs text-bronze-100 uppercase tracking-wider font-medium">ÉLAN Paris</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-bronze-500 block uppercase tracking-widest font-semibold">PASSCODE</span>
                      <span className="text-xs text-gold-300 font-mono font-medium">{confirmedBooking.id}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-bronze-500 block uppercase tracking-widest font-semibold">DATE & CHRONO</span>
                      <span className="text-xs text-bronze-100 tracking-wider font-medium">{formData.date} at {formData.time}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-bronze-500 block uppercase tracking-widest font-semibold">PARTY SIZE</span>
                      <span className="text-xs text-bronze-100 tracking-wider font-medium">{formData.guests}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[10px]">
                    <span className="text-bronze-400 block uppercase tracking-wider font-medium">ASSIGNED ALCOVE</span>
                    <span className="text-gold-200 uppercase tracking-widest font-serif font-semibold text-xs mt-1 block">
                      {confirmedBooking.table}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-center gap-2 text-[10px] text-bronze-300/80 font-sans tracking-wide">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>A text confirmation copy is on its way.</span>
                  </div>

                  <button
                    data-sound="close"
                    onClick={() => setConfirmedBooking(null)}
                    className="w-full border border-bronze-800 hover:border-gold-300 text-bronze-50 py-3.5 text-xs tracking-widest font-sans bg-transparent hover:bg-gold-500/5 transition-all duration-500 cursor-pointer uppercase"
                  >
                    PRESERVE & EXIT
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
