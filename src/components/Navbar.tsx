'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import siteContent from '@/data/siteContent.json';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { layoutStyle } = useLayout();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-we-work' },
    { label: 'Rates', href: '#rate-calculator' },
    { label: 'Concierge', href: '#concierge-calculator' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const isModern = layoutStyle === 'modern';

  return (
    <nav
      className={`z-50 transition-all duration-300 ${
        isModern
          ? 'fixed top-4 left-1/2 -translate-x-1/2 max-w-5xl w-[calc(100%-2rem)] bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-md py-1.5 px-6'
          : `sticky top-0 left-0 right-0 ${
              scrolled
                ? 'bg-[#1e1a6e]/95 backdrop-blur-md shadow-lg shadow-primary-950/30'
                : 'bg-transparent'
            }`
      }`}
    >
      <div className="container mx-auto max-w-6xl px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center h-9 group">
            <img 
              src="/aurashiplogo.svg" 
              alt="AuraShip Logo" 
              className={`h-full w-auto object-contain transition-transform group-hover:scale-[1.02] duration-200 ${
                isModern ? 'filter brightness-90 contrast-125' : ''
              }`} 
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150 ${
                  isModern 
                    ? 'text-slate-600 hover:text-primary-700 hover:bg-slate-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteContent.hero.loginUrl}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isModern
                  ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-sm shadow-primary-700/20 hover:-translate-y-0.5'
                  : 'bg-accent-500 text-white hover:bg-accent-400 hover:-translate-y-0.5 shadow-glow-accent'
              }`}
            >
              Dashboard <Plane className="w-4 h-4 rotate-45" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-lg transition-all duration-150 ${
                isModern
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className={`flex flex-col gap-1 pt-2 border-t ${isModern ? 'border-slate-100' : 'border-white/10'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium py-3 px-3 rounded-lg transition-all duration-150 ${
                    isModern
                      ? 'text-slate-600 hover:text-primary-700 hover:bg-slate-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteContent.hero.loginUrl}
                className={`mt-2 justify-center flex items-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  isModern
                    ? 'bg-primary-700 hover:bg-primary-800 text-white text-center'
                    : 'btn-primary'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard <Plane className="w-4 h-4 rotate-45" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

