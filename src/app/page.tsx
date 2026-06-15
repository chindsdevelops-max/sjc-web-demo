'use client';

import { LayoutProvider, useLayout } from '@/context/LayoutContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowWeWork from '@/components/HowWeWork';
import RateCalculator from '@/components/RateCalculator';
import ConciergeCalculator from '@/components/ConciergeCalculator';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LayoutSwitcher from '@/components/LayoutSwitcher';
import { AlertTriangle } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

function MainLayout() {
  const { announcement } = siteContent;
  const { layoutStyle } = useLayout();

  return (
    <main className={`min-h-screen flex flex-col transition-colors duration-300 ${
      layoutStyle === 'modern' ? 'bg-slate-50 text-slate-800' : 'bg-[#0f0d3a]'
    }`}>
      {/* ── Global Top Announcement Banner ── */}
      {announcement.active && (
        <div
          className="w-full py-2.5 px-4 z-50 flex items-center justify-center gap-2.5 text-center"
          style={{ background: 'rgba(217, 119, 6, 0.95)' }}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#1e1a6e' }} aria-hidden="true" />
          <p className="text-sm font-bold" style={{ color: '#1e1a6e' }}>
            {announcement.text}
          </p>
        </div>
      )}

      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowWeWork />
      <RateCalculator />
      <ConciergeCalculator />
      <ContactSection />
      <Footer />
      <LayoutSwitcher />
    </main>
  );
}

export default function Home() {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
}

