'use client';

import { useState, useRef } from 'react';
import { 
  UserPlus, 
  Hash, 
  ShoppingCart, 
  LayoutDashboard, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import siteContent from '@/data/siteContent.json';

const IconMap = {
  UserPlus: UserPlus,
  Hash: Hash,
  ShoppingCart: ShoppingCart,
  LayoutDashboard: LayoutDashboard
};

export default function HowWeWork() {
  const { howWeWork } = siteContent;
  const { layoutStyle } = useLayout();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log('Video play failed:', err));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isModern = layoutStyle === 'modern';

  if (isModern) {
    return (
      <section id="how-we-work" className="w-full py-20 bg-white text-slate-800 border-b border-slate-200/50 relative overflow-hidden">
        {/* Background soft gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/4 -right-48 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
            style={{ background: 'rgba(91, 84, 245, 0.15)' }}
          />
          <div
            className="absolute bottom-1/4 -left-48 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
            style={{ background: 'rgba(26, 181, 103, 0.12)' }}
          />
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary-50 text-primary-700">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              {howWeWork.title}
            </h2>
            <p className="text-slate-500 text-sm">
              {howWeWork.subtitle}
            </p>
          </div>

          {/* Process steps grid with numerals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {howWeWork.steps.map((step, idx) => {
              const IconComponent = IconMap[step.icon as keyof typeof IconMap] || UserPlus;
              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:border-primary-200 hover:bg-slate-50/90 transition-all duration-300 group text-left overflow-hidden"
                >
                  {/* Huge background number */}
                  <div className="absolute -top-2 -right-2 text-7xl font-black text-slate-100/70 select-none pointer-events-none group-hover:text-primary-100/60 transition-colors duration-300">
                    0{step.step}
                  </div>

                  {/* Icon container */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white"
                    style={{
                      background: idx % 2 === 0
                        ? 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)'
                        : 'linear-gradient(135deg, var(--color-accent-400) 0%, var(--color-accent-600) 100%)',
                      boxShadow: idx % 2 === 0
                        ? '0 4px 12px rgba(91, 84, 245, 0.15)'
                        : '0 4px 12px rgba(26, 181, 103, 0.15)'
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Video Guide Card */}
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-slate-50 border border-slate-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column Content */}
              <div className="p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center text-left">
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  {howWeWork.videoGuide.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  {howWeWork.videoGuide.description}
                </p>
                
                <div>
                  <button
                    onClick={togglePlay}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/10 transition-all duration-205 cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause Guide
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" /> Play Video
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column Player */}
              <div className="lg:col-span-7 relative bg-slate-950 aspect-video group">
                <video
                  ref={videoRef}
                  src={howWeWork.videoGuide.url}
                  poster={howWeWork.videoGuide.poster}
                  onClick={togglePlay}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent-500 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform duration-205">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    onClick={togglePlay} 
                    className="text-white hover:text-accent-400 p-1 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleMute} 
                      className="text-white hover:text-accent-400 p-1 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={handleFullscreen} 
                      className="text-white hover:text-accent-400 p-1 transition-colors"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section id="how-we-work" className="w-full py-20 md:py-28 bg-white dark:bg-[#08071f] relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 -right-48 w-[450px] h-[450px] rounded-full blur-3xl opacity-50 dark:opacity-30"
          style={{ background: 'rgba(91, 84, 245, 0.15)' }}
        />
        <div
          className="absolute bottom-1/4 -left-48 w-[450px] h-[450px] rounded-full blur-3xl opacity-40 dark:opacity-20"
          style={{ background: 'rgba(26, 181, 103, 0.12)' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="section-label">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {howWeWork.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {howWeWork.subtitle}
          </p>
        </div>

        {/* ── Steps Timeline Graphic ── */}
        <div className="relative mb-24 lg:mb-32">
          {/* Connecting Line (Desktop) */}
          <div 
            className="hidden lg:block absolute top-12 left-12 right-12 h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--sjc-border) 0%, rgba(26,181,103,0.2) 100%)' }}
          />

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {howWeWork.steps.map((step, idx) => {
              const IconComponent = IconMap[step.icon as keyof typeof IconMap] || UserPlus;
              
              return (
                <div 
                  key={step.step}
                  className="relative flex flex-row items-start text-left p-0 bg-transparent dark:bg-transparent border-0 dark:border-0 backdrop-blur-none hover:scale-100 transition-all duration-300
                             lg:flex-col lg:items-center lg:text-center lg:p-6 lg:rounded-2xl lg:bg-[#f8fafc]/50 lg:dark:bg-[#110f38]/40 lg:border lg:border-slate-100 lg:dark:border-primary-950/20 lg:backdrop-blur-sm lg:hover:scale-[1.02] gap-5 lg:gap-0"
                >
                  {/* Step Badge */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                    0{step.step}
                  </div>

                  {/* Icon Circle */}
                  <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shrink-0 mb-0 lg:mb-6 relative group z-10"
                    style={{
                      background: idx % 2 === 0 
                        ? 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)' 
                        : 'linear-gradient(135deg, var(--color-accent-400) 0%, var(--color-accent-600) 100%)',
                      boxShadow: idx % 2 === 0 
                        ? '0 8px 20px rgba(91, 84, 245, 0.25)' 
                        : '0 8px 20px rgba(26, 181, 103, 0.25)'
                    }}
                  >
                    <IconComponent className="w-7 h-7 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>

                  {/* Step Title & Desc Container */}
                  <div className="flex-1 relative p-5 md:p-6 rounded-2xl bg-[#f8fafc]/50 dark:bg-[#110f38]/40 border border-slate-100 dark:border-primary-950/20 backdrop-blur-sm 
                                  lg:p-0 lg:bg-transparent lg:dark:bg-transparent lg:border-0 lg:backdrop-blur-none lg:static">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Vertical Connecting Line segment (Mobile/Tablet between elements) */}
                  {idx < howWeWork.steps.length - 1 && (
                    <div 
                      className="block lg:hidden absolute left-8 top-8 w-0.5 -z-10"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, var(--sjc-border) 0%, rgba(26,181,103,0.2) 100%)',
                        height: 'calc(100% + 2rem)' // Height of card + gap-8 (32px / 2rem)
                      }}
                    />
                  )}

                  {/* Horizontal Arrow Indicator (Desktop) */}
                  {idx < howWeWork.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[44px] -right-4 translate-x-1/2 z-20 text-accent-500 dark:text-accent-400">
                      <ArrowRight className="w-5 h-5 bg-white dark:bg-[#08071f] rounded-full p-0.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Interactive Video Guide Block ── */}
        <div className="card max-w-4xl mx-auto overflow-hidden p-0 border border-slate-100 dark:border-primary-950/30 bg-slate-50/50 dark:bg-[#110f38]/30 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left/Top Content Column */}
            <div className="p-8 lg:p-12 lg:col-span-5 flex flex-col justify-center text-left">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                {howWeWork.videoGuide.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {howWeWork.videoGuide.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="btn-primary text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Guide
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Play Video
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right/Bottom Video Player Column */}
            <div className="lg:col-span-7 relative bg-slate-900 aspect-video group">
              <video
                ref={videoRef}
                src={howWeWork.videoGuide.url}
                poster={howWeWork.videoGuide.poster}
                onClick={togglePlay}
                loop
                playsInline
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Dark Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/30"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center text-white shadow-glow-accent scale-95 hover:scale-105 transition-transform duration-205">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Video custom mini control bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={togglePlay} 
                  className="text-white hover:text-accent-400 p-1 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={toggleMute} 
                    className="text-white hover:text-accent-400 p-1 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={handleFullscreen} 
                    className="text-white hover:text-accent-400 p-1 transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
