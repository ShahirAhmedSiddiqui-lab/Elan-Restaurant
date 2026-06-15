import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TastingJourney from './components/TastingJourney';
import BehindCraft from './components/BehindCraft';
import Reservations from './components/Reservations';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ScrollNavigation from './components/ScrollNavigation';
import { useScrollEffects } from './hooks/useScrollEffects';
import { useSoundEffects } from './hooks/useSoundEffects';
import { scrollToSectionId } from './utils/smoothScroll';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);
  useScrollEffects(!loading);
  useSoundEffects();

  useEffect(() => {
    const steps = ['ARTISTRY', 'INTUITION', 'SOUL', 'ELAN'];
    const timers: NodeJS.Timeout[] = [];

    steps.forEach((_, idx) => {
      const t = setTimeout(() => {
        setLoadStep(idx);
        if (idx === steps.length - 1) {
          setTimeout(() => setLoading(false), 1400);
        }
      }, idx * 1050);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const scrollToReservations = () => {
    scrollToSectionId('reservations');
  };

  const currentSteps = ['ARTISTRY', 'INTUITION', 'SOUL', 'ELAN'];

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070605] text-[#F7F1EA] select-none"
        >
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent transform -translate-y-12" />

          <div className="relative overflow-hidden h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={loadStep}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`font-serif text-2xl md:text-3.5xl tracking-[0.35em] text-center uppercase ${
                  loadStep === 3 ? 'text-gold-200' : 'text-bronze-100/80'
                }`}
              >
                {currentSteps[loadStep]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-bronze-900/35 overflow-hidden">
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#0B0A09] min-h-screen text-[#F7F1EA]"
        >
          <div className="site-depth-haze" aria-hidden="true" />
          <div id="section-transition-veil" aria-hidden="true" />

          <Header onReserveClick={scrollToReservations} />
          <ScrollNavigation />

          <main className="site-main">
            <Hero onReserveClick={scrollToReservations} />
            <Philosophy />
            <TastingJourney />
            <BehindCraft />
            <Reservations />
            <Gallery />
          </main>

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
