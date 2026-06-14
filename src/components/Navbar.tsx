'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1e1a6e]/95 backdrop-blur-md shadow-lg shadow-primary-950/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center h-10 group">
            <img src="/aurashiplogo.svg" alt="AuraShip Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-[1.02] duration-200" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteContent.hero.loginUrl}
              className="px-5 py-2 rounded-xl bg-accent-500 text-white text-sm font-semibold
                         hover:bg-accent-400 hover:-translate-y-0.5 shadow-glow-accent
                         transition-all duration-200 flex items-center gap-2"
            >
              Dashboard <Plane className="w-4 h-4 rotate-45" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link py-3"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteContent.hero.loginUrl}
                className="mt-2 btn-primary justify-center flex items-center gap-2"
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
