/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize, Compass } from 'lucide-react';
import { AMBIENCE_GALLERY } from '../data';

export default function Gallery() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const prevPhoto = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev === 0 ? AMBIENCE_GALLERY.length - 1 : prev! - 1));
    }
  };

  const nextPhoto = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev === AMBIENCE_GALLERY.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 bg-[#070605] overflow-hidden"
    >
      <div data-section-content className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-[0.3em] text-gold-300 uppercase block">
              AMBIENCE
            </span>
            <h2
              id="gallery-title"
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.12em] text-[#F7F1EA]"
            >
              AN ATMOSPHERE <br />
              TO REMEMBER
            </h2>
          </div>

          <button
            data-sound="open"
            id="explore-gallery-btn"
            onClick={() => setActivePhotoIdx(0)}
            className="group inline-flex flex-col items-start cursor-pointer focus:outline-none"
          >
            <span className="font-sans text-xs tracking-[0.25em] text-gold-200 group-hover:text-[#F7F1EA] transition-colors uppercase pb-2">
              EXPLORE GALLERY
            </span>
            <div className="h-[1px] w-24 bg-gold-400 group-hover:w-36 transition-all duration-500" />
          </button>
        </div>

        {/* 4 Image Layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMBIENCE_GALLERY.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layoutId={`gallery-card-${photo.id}`}
              data-sound="swish"
              data-depth-card
              className="group relative cursor-pointer aspect-square sm:aspect-video lg:aspect-[4/3] overflow-hidden bg-bronze-950/20 border border-bronze-900/30"
              onClick={() => setActivePhotoIdx(idx)}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image with elegant scale */}
              <motion.div
                layoutId={`gallery-image-${photo.id}`}
                data-parallax-media
                className="absolute inset-0"
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  style={{ contentVisibility: 'auto' }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 brightness-90 group-hover:brightness-100 grayscale-[20%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Gold light leak vignette layer on cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/15 to-transparent opacity-80 z-10" />
              
              {/* Card Label info overlays */}
              <div className="absolute inset-x-6 bottom-6 z-20 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 space-y-2">
                <span className="font-sans text-[9px] tracking-[0.2em] text-gold-300 block uppercase">
                  {photo.category}
                </span>
                <h3 className="font-serif text-sm tracking-wider text-[#F7F1EA] uppercase">
                  {photo.title}
                </h3>
              </div>

              {/* Simple Zoom indicator */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-[#070605]/80 backdrop-blur-sm border border-bronze-900/60 text-gold-300">
                <Maximize className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atmospheric Gallery Lightbox Overlay */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            id="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-[#070605]/90 p-4 md:p-10 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            {/* Click blank space to close */}
            <div className="absolute inset-0" onClick={() => setActivePhotoIdx(null)} />

            <button
              data-sound="close"
              id="close-lightbox"
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 z-30 p-2 rounded-full bg-[#070605]/80 text-bronze-100 hover:text-gold-300 transition-all cursor-pointer border border-bronze-800/40"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slider Controls */}
            <button
              data-sound="nav"
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-bronze-800 bg-[#070605]/80 hover:bg-gold-500 hover:text-black flex items-center justify-center text-gold-300 transition-all cursor-pointer shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              data-sound="nav"
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-bronze-800 bg-[#070605]/80 hover:bg-gold-500 hover:text-black flex items-center justify-center text-gold-300 transition-all cursor-pointer shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* High-Res Lightbox Card */}
            <motion.div
              layoutId={`gallery-card-${AMBIENCE_GALLERY[activePhotoIdx].id}`}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full bg-[#0E0D0C] border border-bronze-800 flex flex-col z-10"
            >
              <motion.div
                layoutId={`gallery-image-${AMBIENCE_GALLERY[activePhotoIdx].id}`}
                className="aspect-[16/10] sm:aspect-video overflow-hidden"
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={AMBIENCE_GALLERY[activePhotoIdx].image}
                  alt={AMBIENCE_GALLERY[activePhotoIdx].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Caption details box */}
              <div className="p-6 md:p-8 flex items-center justify-between border-t border-bronze-900/60 bg-[#0E0D0C]/90">
                <div className="space-y-1 text-left">
                  <span className="font-sans text-[10px] tracking-[0.25em] text-gold-300 uppercase">
                    {AMBIENCE_GALLERY[activePhotoIdx].category}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl tracking-widest text-[#F7F1EA] uppercase">
                    {AMBIENCE_GALLERY[activePhotoIdx].title}
                  </h3>
                </div>

                <div className="hidden sm:flex items-center gap-2 font-sans text-[10px] tracking-widest text-bronze-400">
                  <Compass className="w-4 h-4 text-gold-400" />
                  <span>SENSORY GEOMETRY • ÉLAN</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
