/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onReserveClick: () => void;
}

export default function Header({ onReserveClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('journey');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link detector
      const sections = ['hero', 'philosophy', 'menu', 'behind', 'reservations', 'gallery'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THE JOURNEY', id: 'philosophy' },
    { name: 'MENU', id: 'menu' },
    { name: 'RESERVATIONS', id: 'reservations' },
    { name: 'EXPERIENCE', id: 'behind' },
    { name: 'GALLERY', id: 'gallery' },
  ];

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#0B0A09]/95 backdrop-blur-md border-b border-bronze-900/40 py-4 shadow-xl'
            : 'bg-gradient-to-b from-[#0B0A09]/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            data-sound="nav"
            href="#hero"
            className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-[#F7F1EA] hover:text-gold-200 transition-colors uppercase"
            style={{ fontVariantLigatures: 'no-common-ligatures' }}
          >
            ÉLAN
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                data-sound="nav"
                href={`#${link.id}`}
                className={`font-sans text-xs tracking-[0.2em] transition-all duration-300 relative py-1 ${
                  activeSection === link.id
                    ? 'text-gold-300'
                    : 'text-bronze-200 hover:text-[#F7F1EA]'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Reserve CTA */}
          <div className="hidden lg:block">
            <button
              data-sound="open"
              id="header-reserve-btn"
              onClick={onReserveClick}
              className="group relative border border-bronze-400/50 hover:border-gold-300 text-bronze-50 px-6 py-2.5 text-xs tracking-[0.18em] transition-all duration-500 bg-transparent hover:bg-gold-500/10 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1">
                RESERVE A TABLE
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburguer Trigger */}
          <button
            data-sound="toggle"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-bronze-100 hover:text-gold-300 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0B0A09]/98 z-40 lg:hidden flex flex-col justify-between pt-28 pb-12 px-8"
          >
            <div className="flex flex-col space-y-8 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  data-sound="nav"
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="font-serif text-3xl tracking-[0.15em] text-bronze-50 hover:text-gold-300 transition-all text-center py-2"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <button
                data-sound="open"
                id="mobile-drawer-reserve-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full max-w-xs border border-gold-300 text-gold-200 py-4.5 text-center text-sm font-sans tracking-[0.2em] bg-transparent hover:bg-gold-300 hover:text-black transition-all duration-500 cursor-pointer"
              >
                RESERVE A TABLE
              </button>

              <div className="text-center font-sans text-xs tracking-widest text-bronze-400">
                123 Atelier Lane, Paris, France
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
