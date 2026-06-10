/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { scrollToSectionId } from '../utils/smoothScroll';

export default function ScrollNavigation() {
  const sections = ['hero', 'philosophy', 'menu', 'behind', 'reservations', 'gallery', 'footer'];
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show navigation after a slight delay
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActiveSection(sections.length - 1);
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => scrollToSectionId(id);

  const getSectionTooltip = (index: number) => {
    switch (index) {
      case 0: return 'The Welcome';
      case 1: return 'Artistry & Soul';
      case 2: return 'Tasting Symphony';
      case 3: return 'Behind the Craft';
      case 4: return 'Table Booking';
      case 5: return 'Ambience Gallery';
      case 6: return 'Contact & Location';
      default: return '';
    }
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-6 select-none"
    >
      <span className="font-mono text-xs tracking-widest text-gold-300">01</span>
      
      <div className="relative flex flex-col items-center py-2">
        {/* Background thin vertical connector lines */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-bronze-800/40" />
        
        {/* Fill active vertical gold progress bar */}
        <div 
          className="absolute top-0 w-[1.5px] bg-gold-400 transition-all duration-500 ease-out" 
          style={{ 
            height: `${progress * 100}%`,
            minHeight: '4px'
          }}
        />

        <div className="flex flex-col space-y-4 relative z-10 py-4">
          {sections.map((secId, index) => {
            const isActive = index === activeSection;
            return (
              <button
                key={secId}
                data-sound="nav"
                onClick={() => scrollToSection(secId)}
                className="group relative flex items-center justify-center w-5 h-5 cursor-pointer focus:outline-none"
                aria-label={`Scroll to ${getSectionTooltip(index)}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-1.5 h-1.5 bg-gold-300 outline outline-offset-4 outline-[1px] outline-gold-400 scale-110'
                      : 'w-1 h-1 bg-[#4A3F35] hover:bg-gold-500'
                  }`}
                />
                
                {/* Tooltip on Hover showing steps */}
                <span className="absolute right-8 text-[10px] font-sans tracking-[0.18em] uppercase text-bronze-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#0B0A09]/95 px-3 py-1.5 border border-bronze-800/60 shadow-xl pointer-events-none rounded-sm transition-all duration-300">
                  {getSectionTooltip(index)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <span className="font-mono text-xs tracking-widest text-[#F7F1EA]/50">07</span>
    </motion.div>
  );
}
