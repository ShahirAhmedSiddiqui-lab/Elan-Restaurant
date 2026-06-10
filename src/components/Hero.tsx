/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_DATA } from '../data';

interface HeroProps {
  onReserveClick: () => void;
}

export default function Hero({ onReserveClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070605]"
    >
      {/* Background Cinematic Image - Parallax & Ken Burns Effect */}
      <div data-ambient-parallax data-parallax-media className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1.06, 1.01] }}
          transition={{ duration: 15, ease: 'easeOut', repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
        >
          <img
            src={HERO_DATA.image}
            alt="Savor the Extraordinary Plated Culinary Masterpiece"
            className="w-full h-full object-cover opacity-95 brightness-[0.95]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Soft Golden & Deep Shadow Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]/80 z-10" />
        <div className="absolute inset-0 bg-radial-vignette from-transparent via-[#0B0A09]/30 to-[#0B0A09]/95 z-10" />
        {/* Animated ambient light glow */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-gold-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      </div>

      {/* Main Hero Container */}
      <div data-section-content className="relative z-20 w-full px-6 md:px-12 lg:px-14 xl:px-16 flex flex-col md:flex-row justify-between items-center gap-12 pt-16">
        
        {/* Left Typography Column */}
        <div className="w-full max-w-[1080px] flex flex-col items-start space-y-8 select-none text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-[0.14em] leading-[1.15] text-[#F7F1EA] uppercase"
            >
              SAVOR THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7F1EA] via-gold-200 to-[#F7F1EA]">
                EXTRAORDINARY
              </span>
            </h1>
          </motion.div>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="font-serif italic text-lg sm:text-xl text-bronze-200 font-light max-w-lg leading-relaxed"
          >
            {HERO_DATA.subTitle}
          </motion.p>

          {/* CTA Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          >
            <button
              data-sound="open"
              id="hero-reserve-cta"
              onClick={onReserveClick}
              className="group flex items-center justify-between gap-6 border border-gold-400/50 hover:border-gold-300 text-gold-100 text-xs tracking-[0.25em] px-8 py-4 bg-transparent hover:bg-gold-500/10 transition-all duration-500 font-sans cursor-pointer mt-4"
            >
              {HERO_DATA.ctaText}
              <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
