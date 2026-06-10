/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Info, Wine, Flame, Eye } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

export default function TastingJourney() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const fullTastingMenu = [
    { course: "Amuse-Bouche", name: "Kohlrabi & Juniper Shell", prep: "Fermented radish, forest oil" },
    { course: "First Movement", name: "Oyster & Caviar Pearl", prep: "Royal Osetra, hand-churned sea urchon butter" },
    { course: "Second Movement", name: "Wild Forest Mushrooms", prep: "Slow braised morels, matsutake curls, oakwood smoke" },
    { course: "Oceanic", name: "Atlantic Halibut Ember", prep: "Charred leek ash, salted seaweed foam" },
    { course: "The Crescendo", name: "Heritage Duck Breast", prep: "Dry-aged 14 days, blood orange jus, wild fennel" },
    { course: "Intermezzo", name: "Pear & Chamomile Snow", prep: "Chilled infusion, crystallized honey" },
    { course: "Finale", name: "Chocolate Éclat Sphere", prep: "Araguani cacao, warm cardamom reduction, citrus sorbet" }
  ];

  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 bg-[#070605] overflow-hidden"
    >
      <div data-section-content className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-[0.3em] text-gold-300 uppercase block">
              TASTING JOURNEY
            </span>
            <h2
              id="menu-title"
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.12em] text-[#F7F1EA]"
            >
              A SEASONAL SYMPHONY
            </h2>
          </div>

          <motion.button
            layoutId="full-menu-panel"
            data-sound="open"
            id="view-full-menu-btn"
            onClick={() => setIsFullMenuOpen(true)}
            className="group inline-flex items-center gap-2 cursor-pointer focus:outline-none"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-sans text-xs tracking-[0.25em] text-gold-200 group-hover:text-[#F7F1EA] transition-colors uppercase">
              VIEW FULL MENU
            </span>
            <span className="text-gold-300 group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>

        {/* Carousel Slider Row */}
        <div className="relative group">
          
          {/* Navigation Controls: floating on hover */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button
              data-sound="nav"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-bronze-800 bg-[#0B0A09]/90 hover:bg-gold-500 hover:text-black flex items-center justify-center text-gold-300 transition-all cursor-pointer shadow-lg shadow-black/80"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button
              data-sound="nav"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-bronze-800 bg-[#0B0A09]/90 hover:bg-gold-500 hover:text-black flex items-center justify-center text-gold-300 transition-all cursor-pointer shadow-lg shadow-black/80"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            id="dishes-container"
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {MENU_ITEMS.map((dish) => (
              <div
                key={dish.id}
                className="min-w-full sm:min-w-[45%] lg:min-w-[23%] flex-shrink-0 snap-start select-none"
              >
                <motion.div
                  layoutId={`dish-card-${dish.id}`}
                  data-sound="swish"
                  data-depth-card
                  className="group/card relative bg-[#0D0B0A] border border-bronze-900/40 hover:border-gold-300/60 p-6 flex flex-col justify-between aspect-[3/4] transition-all duration-700 hover:-translate-y-2 cursor-pointer shadow-md hover:shadow-2xl hover:shadow-black"
                  onClick={() => setSelectedDish(dish)}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  
                  {/* Card Header Info */}
                  <div className="flex justify-between items-start z-10">
                    <span className="font-mono text-xs text-gold-300/70 py-1 border-b border-gold-400/20">
                      {dish.number}
                    </span>
                    <button data-sound="swish" className="opacity-0 group-hover/card:opacity-100 transition-opacity p-1 bg-black/50 rounded-full border border-bronze-800/40 text-gold-300">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Absolute BG Image with zoom */}
                  <div data-parallax-media className="absolute inset-x-4 top-16 bottom-[35%] overflow-hidden bg-bronze-950/20">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ contentVisibility: 'auto' }}
                      className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-1000 brightness-[0.8] grayscale-[15%] group-hover/card:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Info Details */}
                  <div className="pt-2 z-10 mt-auto text-center space-y-2">
                    <h3 className="font-serif text-lg tracking-[0.16em] text-[#F7F1EA] group-hover/card:text-gold-200 transition-colors uppercase">
                      {dish.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#F7F1EA]/50">
                      {dish.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Simple Slide arrows for Mobile/Tablet */}
          <div className="flex xl:hidden justify-center items-center gap-4 mt-4">
            <button
              data-sound="nav"
              onClick={() => scroll('left')}
              className="p-3 bg-bronze-900/15 border border-bronze-800/60 text-[#F7F1EA] hover:bg-gold-500/10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              data-sound="nav"
              onClick={() => scroll('right')}
              className="p-3 bg-bronze-900/15 border border-bronze-800/60 text-[#F7F1EA] hover:bg-gold-500/10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Centerpiece Small Flower Emblem Divider */}
        <div className="flex justify-center mt-12 mb-4">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-20 bg-bronze-900/50" />
            
            {/* Elegant Minimalist Japanese-style Golden Mon Emblem */}
            <div className="text-gold-400 text-lg opacity-40 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2" />
                <path d="M 12 1 C 10 6, 14 6, 12 1 M 12 23 C 10 18, 14 18, 12 23 M 1 12 C 6 10, 6 14, 1 12 M 23 12 C 18 10, 18 14, 23 12" />
                <path d="M 4 4 C 8 8, 9 7, 4 4 M 20 20 C 16 16, 15 17, 20 20 M 20 4 C 16 8, 17 9, 20 4 M 4 20 C 8 16, 7 15, 4 20" />
              </svg>
            </div>
            
            <div className="h-[1px] w-20 bg-bronze-900/50" />
          </div>
        </div>
      </div>

      {/* Interactive Modal: Dish Details */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            id="dish-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-[#070605]/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0" onClick={() => setSelectedDish(null)} />
            <motion.div
              layoutId={`dish-card-${selectedDish.id}`}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0B0A09] border border-bronze-800 max-w-2xl w-full p-8 md:p-10 relative overflow-hidden shadow-2xl z-10"
            >
              <button
                data-sound="close"
                id="close-dish-modal"
                onClick={() => setSelectedDish(null)}
                className="absolute top-6 right-6 text-bronze-300 hover:text-gold-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Product/Dish Photo close-up */}
                <div className="aspect-[4/5] bg-bronze-950/25 overflow-hidden border border-bronze-900/50">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Gastronomy Detail Specifications */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-gold-300 tracking-widest uppercase">
                        Course {selectedDish.number}
                      </span>
                      <span className="font-serif text-lg text-gold-200">
                        {selectedDish.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl tracking-widest text-[#F7F1EA] uppercase">
                      {selectedDish.name}
                    </h3>
                    <p className="font-serif italic text-xs text-gold-300/70">
                      {selectedDish.description}
                    </p>
                  </div>

                  <p className="font-serif text-sm text-[#F7F1EA]/80 leading-relaxed">
                    {selectedDish.details}
                  </p>

                  <div className="h-[1px] bg-bronze-900/60" />

                  {/* Curated Ingredients */}
                  <div className="space-y-2">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-[#F7F1EA]/40 block uppercase">
                      Selected Craft Elements
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedDish.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gold-500/5 border border-gold-400/20 text-gold-300/80 px-2.5 py-1 text-[10px] font-sans tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sommelier's pairing notes */}
                  <div className="flex items-start gap-3 bg-gold-600/5 p-3.5 border border-gold-500/10 rounded-sm">
                    <Wine className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-[10px] tracking-wider text-gold-200 block uppercase font-medium">Sommelier's Cru Selection</span>
                      <p className="text-[11px] font-serif italic text-bronze-100 mt-1 leading-relaxed">
                        {selectedDish.id === 'oyster-pearl' && 'Paired with Brut Reserve, Krug NV — cuts beautifully through the rich uni reduction.'}
                        {selectedDish.id === 'wild-forest' && 'Paired with Gevrey-Chambertin, Domaine Claude Dugat 2018 — echoes wild earth & damp oak.'}
                        {selectedDish.id === 'heritage-duck' && 'Paired with Margaux Grand Cru Classé, Château Palmer 2012 — matches duck’s rich density.'}
                        {selectedDish.id === 'chocolate-eclat' && "Paired with Maury Vintage, Mas de Mas 2019 — dynamic spiced cacao reinforcement."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Tasting Menu Slide-over Drawer */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <motion.div
            id="full-menu-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex justify-end bg-[#070605]/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            {/* Outside click area to exit */}
            <div className="absolute inset-0" onClick={() => setIsFullMenuOpen(false)} />

            <motion.div
              layoutId="full-menu-panel"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#0F0D0C] border-l border-bronze-800/60 h-full p-8 md:p-12 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between"
            >
              <div>
                <button
                  data-sound="close"
                  id="close-full-menu"
                  onClick={() => setIsFullMenuOpen(false)}
                  className="absolute top-6 right-6 text-bronze-300 hover:text-gold-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2 mb-10 pt-4">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold-300 uppercase block">
                    Gourmet Composition
                  </span>
                  <h3 className="font-serif text-3xl tracking-widest text-[#F7F1EA] uppercase">
                    CHEF'S SIGNATURE
                  </h3>
                  <div className="h-[1px] w-24 bg-gold-400/50 mt-4" />
                </div>

                {/* Symphony of Courses List */}
                <div className="space-y-8">
                  {fullTastingMenu.map((item, index) => (
                    <motion.div
                      key={item.course}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group/item flex items-start gap-4 pb-4 border-b border-bronze-900/30"
                    >
                      <span className="font-mono text-xs text-gold-400/50 pt-1 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-serif text-md tracking-wider text-bronze-50 group-hover/item:text-gold-200 transition-all uppercase">
                            {item.name}
                          </h4>
                        </div>
                        <p className="font-serif italic text-xs text-[#F7F1EA]/40">
                          {item.prep}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drawer footer details */}
              <div className="pt-8 mt-12 border-t border-bronze-900/40 space-y-4">
                <div className="flex justify-between items-center text-xs font-sans tracking-widest text-bronze-300">
                  <span>Grand Degustation</span>
                  <span className="text-gold-300 font-serif">€160</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-sans tracking-widest text-[#F7F1EA]/30">
                  <span>Wine pairing available</span>
                  <span className="text-gold-400">+ €95</span>
                </div>
                
                <p className="text-[10px] text-center italic text-[#F7F1EA]/30 pt-4 font-serif">
                  Due to seasonal sourcing, ingredients change strictly at the whim of nature.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
