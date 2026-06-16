'use client';

import { useState } from 'react';
import { Apple, Mail, CheckCircle2, Star } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import siteContent from '@/data/siteContent.json';

export default function MobileAppSection() {
  const { mobileApp } = siteContent;
  const { layoutStyle } = useLayout();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  const isModern = layoutStyle === 'modern';

  // Render nothing if section is not active in config
  if (!mobileApp || !mobileApp.active) return null;

  return (
    <section 
      id="mobile-app" 
      className={`w-full py-20 md:py-28 relative overflow-hidden border-b transition-colors duration-300 ${
        isModern 
          ? 'bg-slate-50 text-slate-800 border-slate-200/50' 
          : 'bg-[#0f0d3a] dark:bg-[#08071f] text-white border-primary-950/20'
      }`}
    >
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 dark:opacity-20 transition-colors duration-300 ${
            isModern ? 'bg-primary-200' : 'bg-primary-900/50'
          }`}
        />
        <div
          className={`absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 dark:opacity-10 transition-colors duration-300 ${
            isModern ? 'bg-accent-200' : 'bg-accent-900/40'
          }`}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center lg:pr-8 xl:pr-12">
            
            {/* Tag / Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                isModern 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'bg-primary-950/60 text-accent-400 border border-primary-800/30'
              }`}>
                Mobile Experience
              </span>
              {mobileApp.comingSoon && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white animate-pulse-soft">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Section Titles */}
            <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${
              isModern ? 'text-slate-900' : 'text-white'
            }`}>
              {mobileApp.title}
            </h2>
            <p className={`text-base md:text-lg mb-6 leading-relaxed ${
              isModern ? 'text-slate-655' : 'text-slate-300'
            }`}>
              {mobileApp.subtitle}
            </p>

            {/* Feature Description */}
            <p className={`text-sm mb-8 leading-relaxed ${
              isModern ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {mobileApp.description}
            </p>

            {/* Bullet List of Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {mobileApp.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`mt-0.5 rounded-full p-0.5 ${
                    isModern ? 'bg-primary-50 text-primary-600' : 'bg-primary-950 text-accent-400'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-medium leading-normal ${
                    isModern ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* App Store & Play Store Action block */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Apple App Store */}
                {mobileApp.comingSoon ? (
                  <div 
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border select-none opacity-50 ${
                      isModern 
                        ? 'bg-slate-200/50 border-slate-300 text-slate-500' 
                        : 'bg-[#110f38]/60 border-primary-950/40 text-slate-500'
                    }`}
                  >
                    <Apple className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold tracking-wider leading-none">Soon on the</div>
                      <div className="text-xs font-extrabold leading-none mt-0.5">App Store</div>
                    </div>
                  </div>
                ) : (
                  <a 
                    href={mobileApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border transition-all duration-200 hover:scale-[1.03] shadow-md ${
                      isModern 
                        ? 'bg-slate-900 border-slate-800 text-white hover:bg-black shadow-slate-900/10' 
                        : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-100 shadow-black/20'
                    }`}
                  >
                    <Apple className="w-6 h-6 fill-current" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold tracking-wider leading-none">Download on the</div>
                      <div className="text-xs font-extrabold leading-none mt-0.5">App Store</div>
                    </div>
                  </a>
                )}

                {/* Google Play Store */}
                {mobileApp.comingSoon ? (
                  <div 
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border select-none opacity-50 ${
                      isModern 
                        ? 'bg-slate-200/50 border-slate-300 text-slate-500' 
                        : 'bg-[#110f38]/60 border-primary-950/40 text-slate-500'
                    }`}
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.15L17.87,12.97L16.55,12L17.87,11.33M3,3.41L18.78,11.23L16.55,12L3,3.41M3,20.59L16.55,12L18.78,12.77L3,20.59Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold tracking-wider leading-none">Soon on</div>
                      <div className="text-xs font-extrabold leading-none mt-0.5">Google Play</div>
                    </div>
                  </div>
                ) : (
                  <a 
                    href={mobileApp.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border transition-all duration-200 hover:scale-[1.03] shadow-md ${
                      isModern 
                        ? 'bg-slate-900 border-slate-800 text-white hover:bg-black shadow-slate-900/10' 
                        : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-100 shadow-black/20'
                    }`}
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.15L17.87,12.97L16.55,12L17.87,11.33M3,3.41L18.78,11.23L16.55,12L3,3.41M3,20.59L16.55,12L18.78,12.77L3,20.59Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold tracking-wider leading-none">Get it on</div>
                      <div className="text-xs font-extrabold leading-none mt-0.5">Google Play</div>
                    </div>
                  </a>
                )}
              </div>

              {/* Coming Soon Form */}
              {mobileApp.comingSoon && (
                <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isModern 
                    ? 'bg-white border-slate-200 shadow-sm' 
                    : 'bg-[#110f38]/40 border-primary-950/30 backdrop-blur-md shadow-lg'
                }`}>
                  {submitted ? (
                    <div className="flex items-center gap-3 text-accent-500 dark:text-accent-400 py-1.5">
                      <Star className="w-5 h-5 fill-current animate-pulse-soft" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">You are on the list!</h4>
                        <p className={`text-[11px] mt-0.5 ${
                          isModern ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          We'll notify you as soon as the iOS and Android apps go live.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                      <label htmlFor="app-email" className={`text-xs font-semibold ${
                        isModern ? 'text-slate-650' : 'text-slate-300'
                      }`}>
                        Get notified when the app launches:
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                            isModern ? 'text-slate-400' : 'text-slate-500'
                          }`} />
                          <input 
                            id="app-email"
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all duration-200 ${
                              isModern 
                                ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary-500 focus:bg-white' 
                                : 'bg-[#0b0a2c] border-primary-950/40 text-white focus:border-accent-500 focus:bg-[#0b0a2c]'
                            }`}
                          />
                        </div>
                        <button 
                          type="submit"
                          className="btn-primary text-xs font-semibold py-2.5 px-4 rounded-xl cursor-pointer"
                        >
                          Notify Me
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: 3D Phones Mockup Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 pb-12 lg:py-0">
            {/* Center glowing backing ring */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-2xl opacity-40 -z-10 ${
              isModern ? 'bg-primary-100' : 'bg-accent-500/20'
            }`} />

            <div className="flex items-center justify-center gap-0 sm:gap-2 relative select-none">
              
              {/* Screen 1 (Left Phone) */}
              <div 
                className="relative aspect-[9/19.5] w-[115px] sm:w-[150px] lg:w-[135px] xl:w-[185px] rounded-[1.5rem] sm:rounded-[1.8rem] xl:rounded-[2.2rem] border-[4px] sm:border-[5px] xl:border-[7px] border-slate-950 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:z-30 -rotate-[8deg] -translate-x-4 sm:-translate-x-8 lg:-translate-x-6 xl:-translate-x-10 translate-y-4 sm:translate-y-8 lg:translate-y-6 xl:translate-y-10 z-10"
              >
                {/* Notch */}
                <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 xl:w-20 h-2 sm:h-3 xl:h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-4 sm:w-6 xl:w-8 h-0.5 xl:h-1 bg-slate-800 rounded-full" />
                </div>
                {/* Screenshot */}
                <img 
                  src={mobileApp.images[0]} 
                  alt="AuraShip Mobile App Dashboard Screen" 
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Screen 2 (Middle Raised Phone) */}
              <div 
                className="relative aspect-[9/19.5] w-[130px] sm:w-[170px] lg:w-[155px] xl:w-[210px] rounded-[1.7rem] sm:rounded-[2rem] xl:rounded-[2.4rem] border-[5px] sm:border-[6px] xl:border-[8px] border-slate-950 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 hover:scale-[1.07] hover:z-30 -translate-y-2 sm:-translate-y-6 lg:-translate-y-4 xl:-translate-y-8 z-20"
              >
                {/* Notch */}
                <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-14 sm:w-20 xl:w-24 h-2.5 sm:h-3.5 xl:h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-5 sm:w-8 xl:w-10 h-0.5 xl:h-1 bg-slate-800 rounded-full" />
                </div>
                {/* Screenshot */}
                <img 
                  src={mobileApp.images[1]} 
                  alt="AuraShip Mobile App Booking Screen" 
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Screen 3 (Right Phone) */}
              <div 
                className="relative aspect-[9/19.5] w-[115px] sm:w-[150px] lg:w-[135px] xl:w-[185px] rounded-[1.5rem] sm:rounded-[1.8rem] xl:rounded-[2.2rem] border-[4px] sm:border-[5px] xl:border-[7px] border-slate-950 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:z-30 rotate-[8deg] translate-x-4 sm:translate-x-8 lg:translate-x-6 xl:translate-x-10 translate-y-4 sm:translate-y-8 lg:translate-y-6 xl:translate-y-10 z-10"
              >
                {/* Notch */}
                <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 xl:w-20 h-2 sm:h-3 xl:h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-4 sm:w-6 xl:w-8 h-0.5 xl:h-1 bg-slate-800 rounded-full" />
                </div>
                {/* Screenshot */}
                <img 
                  src={mobileApp.images[2]} 
                  alt="AuraShip Mobile App Tracking Screen" 
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
