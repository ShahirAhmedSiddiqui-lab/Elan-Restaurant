/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, BookOpen, Quote } from 'lucide-react';
import { PHILOSOPHY_DATA } from '../data';

export default function Philosophy() {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <section
      id="philosophy"
      className="relative py-24 md:py-32 bg-[#0B0A09] overflow-hidden"
    >
      <div data-section-content className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: SVG Floral Leaf Artwork & Brand Philosophy */}
        <div className="lg:col-span-6 space-y-10 relative">
          
          {/* Decorative Floral / Branch Line Art Drawing floating in background */}
          <div className="absolute -left-12 -top-16 opacity-15 text-gold-400 select-nonepointer-events-none">
            <svg
              width="240"
              height="400"
              viewBox="0 0 200 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="transform rotate-12"
            >
              <path d="M 10 380 Q 80 200 60 10" />
              <path d="M 60 210 Q 120 180 150 160" />
              <path d="M 45 270 Q 110 250 140 240" />
              <path d="M 28 330 Q 90 310 110 300" />
              <path d="M 53 150 Q 110 120 130 90" />
              {/* Decorative Leaves */}
              <path d="M 150 160 C 130 180 110 160 150 160 Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M 140 240 C 120 260 100 240 140 240 Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M 110 300 C 90 320 80 300 110 300 Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M 130 90 C 110 110 90 90 130 90 Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M 60 10 C 45 30 35 15 60 10 Z" fill="currentColor" fillOpacity="0.2" />
            </svg>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs tracking-[0.3em] text-gold-300 uppercase">
                {PHILOSOPHY_DATA.tag}
              </span>
              <div className="h-[1px] w-12 bg-gold-400/50" />
            </div>

            <h2
              id="philosophy-title"
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.12em] leading-tight text-[#F7F1EA]"
            >
              ARTISTRY. <br />
              INTUITION. SOUL.
            </h2>
          </div>

          <div className="space-y-8 max-w-xl text-[#F7F1EA]/80 font-serif leading-loose text-base md:text-lg">
            <p className="indent-6">{PHILOSOPHY_DATA.paragraphs[0]}</p>
            <p className="text-bronze-200/90 italic font-light">
              {PHILOSOPHY_DATA.paragraphs[1]}
            </p>
          </div>

          {/* Interactive story action link */}
          <div className="pt-4">
            <motion.button
              layoutId="story-panel"
              data-sound="open"
              id="our-story-btn"
              onClick={() => setIsStoryModalOpen(true)}
              className="group inline-flex flex-col items-start cursor-pointer focus:outline-none"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-sans text-xs tracking-[0.25em] text-gold-200 group-hover:text-[#F7F1EA] transition-colors pb-2">
                {PHILOSOPHY_DATA.linkText}
              </span>
              <div className="h-[1px] w-24 bg-gold-400 group-hover:w-36 transition-all duration-500" />
            </motion.button>
          </div>
        </div>

        {/* Right Side: Image with rising smoke effect */}
        <div className="lg:col-span-6 relative">
          <div data-depth-card className="relative group overflow-hidden">
            
            {/* Elegant Outer Slate Border */}
            <div className="absolute inset-0 border border-bronze-800/40 p-4 transform translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />

            <div data-parallax-media className="relative overflow-hidden aspect-[4/3] bg-bronze-900/10">
              <img
                src={PHILOSOPHY_DATA.image}
                alt="Chef's Hands Carefully Plating Under Moody Warm Restaurant Lighting"
                className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-1000 brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Smoke overlay mask effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent pointer-events-none" />

              {/* Glowing Warm Vignette */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0A09]/20 to-[#0B0A09]/60 pointer-events-none" />

              {/* Soft overlay action button - floating */}
              <div className="absolute bottom-6 right-6">
                <div className="flex items-center gap-2 bg-[#0B0A09]/80 backdrop-blur-sm border border-bronze-800 px-4 py-2 text-[10px] font-sans tracking-widest text-gold-300">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  KITCHEN SECRETS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Interactive Modal */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <motion.div
            id="story-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-[#070605]/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0" onClick={() => setIsStoryModalOpen(false)} />
            <motion.div
              layoutId="story-panel"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0D0B0A] border border-bronze-800 max-w-2xl w-full p-8 md:p-12 relative overflow-y-auto max-h-[85vh] shadow-2xl z-10"
            >
              <button
                data-sound="close"
                id="close-story-modal"
                onClick={() => setIsStoryModalOpen(false)}
                className="absolute top-6 right-6 text-bronze-300 hover:text-gold-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <BookOpen className="w-8 h-8 text-gold-300" />
                
                <h3 className="font-serif text-3xl tracking-widest text-gold-100">THE ÉLAN CHRONICLE</h3>
                
                <div className="h-[1px] w-20 bg-gold-400/50" />

                <div className="space-y-6 text-bronze-100 font-serif leading-relaxed text-base italic">
                  <div className="flex gap-4">
                    <Quote className="w-8 h-8 text-gold-400/30 shrink-0 transform rotate-180" />
                    <p>
                      "True hospitality is not a script. It is an instinctual dance between chef and patron, matching the warmth of raw embers with the emotion of raw anticipation."
                    </p>
                  </div>
                  
                  <p className="not-italic text-sm text-bronze-200">
                    Founded in late autumn, ÉLAN arose from a simple epiphany: food is memory. Executive Chef Jean-Luc Laurent envisioned a sanctuary where guests don't just consume course after course, but experience a carefully designed musical score of sensory steps.
                  </p>

                  <p className="not-italic text-sm text-bronze-200">
                    Named after the French word for momentum, dash, and soulful vigor, we craft our daily changing compositions based entirely on the finest micro-season elements. Our suppliers are local artisan divers, forest foragers, independent farmers, and heritage breeders who understand that quality is an act of deep reverence.
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    data-sound="close"
                    onClick={() => setIsStoryModalOpen(false)}
                    className="border border-bronze-800 hover:border-gold-300 text-bronze-100 px-6 py-2.5 text-xs tracking-widest bg-transparent cursor-pointer transition-colors"
                  >
                    CONTINUE GASTRONOMY
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
