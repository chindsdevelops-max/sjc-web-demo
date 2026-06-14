'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact } = siteContent;

  const services = [
    { label: 'Shipping Rates', href: '#rate-calculator' },
    { label: 'Concierge Shopping', href: '#concierge-calculator' },
    { label: 'Air Freight', href: '#' },
    { label: 'Sea Freight', href: '#' },
  ];

  const company = [
    { label: 'About Us', href: '#about' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Contact', href: '#contact' },
    { label: 'Login / Register', href: siteContent.hero.loginUrl },
  ];

  return (
    <footer className="w-full bg-[#0f0d3a] dark:bg-[#080619] text-slate-300 pt-16 pb-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-center h-12 mb-2">
               <img src="/aurashiplogo.svg" alt="AuraShip Logo" className="h-full w-auto object-contain -ml-2" />
             </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Your trusted courier partner connecting Jamaica to the world. Monday & Friday flight arrivals, transparent pricing, and concierge shopping assistance.
            </p>
            {/* Contact info */}
            <div className="space-y-2">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-accent-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-accent-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {contact.email}
              </a>
              <p className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                {contact.address}
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Services</h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-accent-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
            <p>&copy; {currentYear} AuraShip Courier. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built with Next.js &amp; Tailwind CSS
              <span className="text-white/20">•</span>
              Edge-optimized for Cloudflare Pages
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
