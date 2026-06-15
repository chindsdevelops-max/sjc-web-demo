'use client';

import { Plane } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import siteContent from '@/data/siteContent.json';

export default function HeroSection() {
  const { hero, flightSchedule } = siteContent;
  const { layoutStyle } = useLayout();
  const isModern = layoutStyle === 'modern';

  if (isModern) {
    return (
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center bg-white border-b border-slate-200/60 overflow-hidden pt-28 pb-16">
        {/* Modern grid background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(#1e1a6e 1px, transparent 1px), linear-gradient(90deg, #1e1a6e 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} 
        />
        {/* Soft brand glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Schedule Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold uppercase tracking-wider text-primary-800">
              <Plane className="w-3.5 h-3.5 text-accent-500" />
              {flightSchedule.days.join(' & ')} Flights — {flightSchedule.pickupNote}
            </div>

            <div className="space-y-4">
              <p className="text-accent-600 font-extrabold text-sm md:text-base tracking-widest uppercase">
                {hero.tagline}
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                Shippin' at <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Aura Speed</span>
              </h1>
            </div>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="cta-calculate-shipping"
                onClick={() => {
                  const el = document.getElementById('rate-calculator');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
              >
                {hero.ctaPrimary}
              </button>
              <a
                id="cta-dashboard"
                href={hero.dashboardUrl}
                className="px-8 py-3.5 rounded-xl font-bold border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Logistics Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xl w-full max-w-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Card top */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Control Panel</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-50 text-primary-700">AURA-74291-MIA</span>
              </div>

              {/* Transit visualization */}
              <div className="space-y-6 relative py-2">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">US</div>
                    <div className="w-0.5 h-12 border-l border-dashed border-slate-200" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Origin Hub</h4>
                    <p className="text-sm font-bold text-slate-800">Miami Warehouse Facility</p>
                    <p className="text-[10px] text-slate-400">Cargo Checked-in & Prepared</p>
                  </div>
                </div>

                {/* Animated plane path overlay */}
                <div className="absolute left-3.5 top-8 -translate-x-1/2 flex flex-col items-center gap-1">
                  <Plane className="w-4 h-4 text-primary-500 rotate-90 animate-bounce" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center font-bold text-xs text-primary-700">JM</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-500 uppercase tracking-wider">Destination Hub</h4>
                    <p className="text-sm font-bold text-slate-800">Kingston Clearance Center</p>
                    <p className="text-[10px] text-accent-600 font-semibold">Ready for Express Pickup</p>
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100 text-left">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Flight Schedule</p>
                  <p className="text-xs font-bold text-slate-800">Mon & Fri Arrivals</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Transit Time</p>
                  <p className="text-xs font-bold text-slate-800">24 - 48 Hours Max</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden -mt-16"
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


      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center">

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
            className="btn-primary text-base px-8 py-4 rounded-2xl cursor-pointer"
          >
            {hero.ctaPrimary}
          </button>
          <a
            id="cta-dashboard"
            href={hero.dashboardUrl}
            className="btn-secondary text-base px-8 py-4 rounded-2xl"
          >
            {hero.ctaSecondary}
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
