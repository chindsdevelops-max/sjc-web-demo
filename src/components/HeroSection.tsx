'use client';

import { AlertTriangle, Plane } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

export default function HeroSection() {
  const { hero, announcement, flightSchedule } = siteContent;

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e1a6e 0%, #3b34cc 45%, #5b54f5 75%, #7b73fc 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'rgba(123, 115, 252, 0.25)', animation: 'pulseSoft 3s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(26, 181, 103, 0.10)', animation: 'pulseSoft 3s ease-in-out infinite 1s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Announcement Banner ── */}
      {announcement.active && (
        <div
          className="relative z-10 w-full py-2.5 px-4"
          style={{ background: 'rgba(217, 119, 6, 0.92)', backdropFilter: 'blur(4px)' }}
        >
          <div className="container mx-auto max-w-6xl flex items-center justify-center gap-2.5 text-center">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#1e1a6e' }} aria-hidden="true" />
            <p className="text-sm font-semibold" style={{ color: '#1e1a6e' }}>
              {announcement.text}
            </p>
          </div>
        </div>
      )}

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">

        {/* Flight schedule badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.20)',
            color: 'rgba(255,255,255,0.90)',
            animation: 'fadeInUp 0.55s ease-out 0s both',
          }}
        >
          <Plane className="w-3.5 h-3.5" style={{ color: '#3dcf85' }} aria-hidden="true" />
          {flightSchedule.days.join(' & ')} Flights — {flightSchedule.pickupNote}
        </div>

        {/* Tagline + Title */}
        <div
          className="space-y-3 mb-6"
          style={{ animation: 'fadeInUp 0.55s ease-out 0.1s both' }}
        >
          <p className="font-bold text-lg md:text-xl tracking-wide uppercase" style={{ color: '#3dcf85' }}>
            {hero.tagline}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]" style={{ color: '#ffffff' }}>
            {hero.title}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.72)', animation: 'fadeInUp 0.55s ease-out 0.2s both' }}
        >
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: 'fadeInUp 0.55s ease-out 0.3s both' }}
        >
          <button
            id="cta-calculate-shipping"
            onClick={() => {
              const el = document.getElementById('rate-calculator');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-base px-8 py-4 rounded-2xl"
          >
            {hero.ctaPrimary}
          </button>
          <a
            id="cta-dashboard"
            href={hero.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-4 rounded-2xl"
          >
            {hero.ctaSecondary} ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2" style={{ animation: 'pulseSoft 2.5s ease-in-out infinite' }}>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
