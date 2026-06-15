'use client';

import { CheckCircle2, Plane, Ship } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import siteContent from '@/data/siteContent.json';

export default function AboutSection() {
  const { aboutUs, stats, flightSchedule } = siteContent;
  const { layoutStyle } = useLayout();
  const isModern = layoutStyle === 'modern';

  if (isModern) {
    return (
      <section id="about" className="w-full py-20 bg-slate-50 text-slate-800 border-b border-slate-200/50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary-50 text-primary-700">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              {aboutUs.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 cols: Story & Features */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                <p className="text-slate-600 leading-relaxed text-sm">
                  {aboutUs.description}
                </p>
                <ul className="space-y-3 pt-2">
                  {aboutUs.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-slate-700 text-xs font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle 3 cols: Stats in dynamic stack */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm text-center flex flex-col justify-center min-h-[90px]"
                >
                  <p className="text-2xl font-extrabold text-primary-600 mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Right 4 cols: Flights schedule & services */}
            <div className="lg:col-span-4 space-y-4">
              {/* Flight Schedule Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-md border-none text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/65">Flight Schedule</p>
                    <p className="text-base font-bold text-white">{flightSchedule.days.join(' & ')} Flights</p>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">{flightSchedule.description}</p>
                <p className="text-[10px] text-white/60 mt-2 font-medium">{flightSchedule.pickupNote}</p>
              </div>

              {/* Sea Freight Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Ship className="w-4 h-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Also Available</p>
                    <p className="text-sm font-bold text-slate-800">Sea Freight Cargo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  For large shipments and heavy cargo, we offer competitive sea freight rates. Contact us for a custom quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="w-full py-20 md:py-28 bg-[#f5f5ff] dark:bg-[#0f0d3a]">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <p className="text-3xl md:text-4xl font-extrabold text-primary-600 dark:text-primary-300 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="space-y-6 text-left">
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{aboutUs.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {aboutUs.description}
              </p>
            </div>
            <ul className="space-y-3">
              {aboutUs.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-accent-500 dark:text-accent-400 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Flight schedule & services */}
          <div className="space-y-4">
            {aboutUs.image && (
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-primary-950/20 group hover:scale-[1.01] transition-all duration-300">
                <img 
                  src={aboutUs.image} 
                  alt="Logistics Cargo" 
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">Air Cargo Logistics Support</span>
                </div>
              </div>
            )}

            {/* Flight Schedule Card */}
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950 border-none text-white text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">Flight Schedule</p>
                  <p className="text-lg font-bold text-white">{flightSchedule.days.join(' & ')} Flights</p>
                </div>
              </div>
              <p className="text-sm text-white/80">{flightSchedule.description}</p>
              <p className="text-xs text-white/60 mt-2">{flightSchedule.pickupNote}</p>
            </div>

            {/* Sea Freight Card */}
            <div className="card text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/60 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-primary-600 dark:text-primary-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Also Available</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">Sea Freight</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                For large shipments and heavy cargo, we offer competitive sea freight rates. Contact us for a custom quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
