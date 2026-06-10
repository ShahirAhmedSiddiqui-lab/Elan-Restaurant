/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Gift, Globe, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    restaurant: [
      { name: 'The Journey', href: '#philosophy' },
      { name: 'Menu', href: '#menu' },
      { name: 'Private Dining', href: '#reservations' },
      { name: 'Gift Cards', href: '#reservations' }
    ],
    info: [
      { name: 'Reservations', href: '#reservations' },
      { name: 'Dress Code', href: '#reservations' },
      { name: 'Location', href: '#gallery' },
      { name: 'Careers', href: '#philosophy' }
    ],
    connect: [
      { name: 'Instagram', href: '#' },
      { name: 'Facebook', href: '#' },
      { name: 'Newsletter', href: '#' },
      { name: 'Contact', href: '#' }
    ]
  };

  return (
    <footer
      id="footer"
      className="bg-[#070605] text-[#F7F1EA]/80 pt-20 pb-8 border-t border-bronze-900/30 font-sans select-none relative"
    >
      <div data-section-content className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
        
        {/* Brand Information */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <h2 className="font-serif text-3xl tracking-[0.25em] text-[#F7F1EA] uppercase">
            ÉLAN
          </h2>
          
          <p className="font-serif italic text-sm text-[#F7F1EA]/60 leading-relaxed max-w-sm">
            A modern fine dining experience rooted in emotion, craftsmanship, and timeless hospitality.
          </p>

          <div className="flex space-x-3 text-gold-400">
            {/* Soft decorative elements */}
            <Globe className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
            <Gift className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
            <Shield className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        </div>

        {/* RESTAURANT COLUMN */}
        <div className="lg:col-span-2 text-left space-y-6">
          <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#F7F1EA]/40 uppercase font-semibold">
            RESTAURANT
          </h3>
          <ul className="space-y-3">
            {footerLinks.restaurant.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-serif text-sm text-bronze-100 hover:text-gold-300 transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* INFORMATION COLUMN */}
        <div className="lg:col-span-2 text-left space-y-6">
          <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#F7F1EA]/40 uppercase font-semibold">
            INFORMATION
          </h3>
          <ul className="space-y-3">
            {footerLinks.info.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-serif text-sm text-bronze-100 hover:text-gold-300 transition-all duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONNECT COLUMN */}
        <div className="lg:col-span-2 text-left space-y-6">
          <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#F7F1EA]/40 uppercase font-semibold">
            CONNECT
          </h3>
          <ul className="space-y-3">
            {footerLinks.connect.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-serif text-sm text-bronze-100 hover:text-gold-300 transition-all duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPASS MEDALLION BLOCK */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center lg:justify-start text-center lg:text-right space-y-6">
          
          {/* Stunning star compass logo medallion SVG */}
          <div className="text-gold-400 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              {/* Outer double circle */}
              <circle cx="50" cy="50" r="45" strokeOpacity="0.4" />
              <circle cx="50" cy="50" r="40" strokeOpacity="0.2" strokeDasharray="4 4" />
              
              {/* Cross lines */}
              <line x1="50" y1="5" x2="50" y2="95" strokeOpacity="0.3" />
              <line x1="5" y1="50" x2="95" y2="50" strokeOpacity="0.3" />

              {/* Diagonal lines */}
              <line x1="18" y1="18" x2="82" y2="82" strokeOpacity="0.15" />
              <line x1="18" y1="82" x2="82" y2="18" strokeOpacity="0.15" />

              {/* Beautiful central diamond star compass */}
              <path d="M 50 15 Q 50 50 15 50 Q 50 50 50 85 Q 50 50 85 50 Q 50 50 50 15 Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M 50 30 Q 50 50 30 50 Q 50 50 50 70 Q 50 50 70 50 Q 50 50 50 30 Z" fill="currentColor" fillOpacity="0.2" />
              
              <circle cx="50" cy="50" r="3" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-2 font-serif text-xs text-[#F7F1EA]/60 tracking-wider">
            <p>123 Atelier Lane</p>
            <p>Paris, France 75001</p>
            <p className="text-gold-300 font-mono">+33 1 42 34 56 78</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar Segment */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-bronze-900/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-[#F7F1EA]/30 uppercase font-sans">
        
        <div className="flex items-center gap-1.5">
          <span>© ÉLAN RESTAURANT 2025 • ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-gold-300 transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-gold-300 transition-colors">TERMS & CONDITIONS</a>
        </div>

      </div>
    </footer>
  );
}
