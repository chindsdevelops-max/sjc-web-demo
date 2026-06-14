'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Package } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const navLinks = [
    { label: 'How It Works', href: '#how-we-work' },
    { label: 'Rates', href: '#rate-calculator' },
    { label: 'Concierge', href: '#concierge-calculator' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1e1a6e]/95 dark:bg-[#08071f]/95 backdrop-blur-md shadow-lg shadow-primary-950/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center shadow-glow-accent group-hover:scale-110 transition-transform duration-200">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Ship<span className="text-accent-400">Jet</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Theme + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href={siteContent.hero.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-accent-500 text-white text-sm font-semibold
                         hover:bg-accent-400 hover:-translate-y-0.5 shadow-glow-accent
                         transition-all duration-200"
            >
              {siteContent.hero.ctaSecondary} ↗
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
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
                href={siteContent.hero.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {siteContent.hero.ctaSecondary} ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
