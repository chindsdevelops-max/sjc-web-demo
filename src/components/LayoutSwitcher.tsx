'use client';

import { useLayout } from '@/context/LayoutContext';
import { Layers, Check } from 'lucide-react';
import { useState } from 'react';

export default function LayoutSwitcher() {
  const { layoutStyle, setLayoutStyle } = useLayout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 bg-[#0f0d3a]/95 backdrop-blur-md border border-[#3b34cc]/30 p-4 rounded-2xl shadow-xl w-64 text-white animate-fade-in-up">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5 border-b border-white/10 pb-2">
            <Layers className="w-3.5 h-3.5 text-accent-400" /> Choose Website Style
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setLayoutStyle('corporate')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                layoutStyle === 'corporate'
                  ? 'bg-primary-600 text-white shadow-glow-blue border border-primary-500/50'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              <span>Style A: Corporate Indigo</span>
              {layoutStyle === 'corporate' && <Check className="w-4 h-4 text-accent-400" />}
            </button>
            <button
              onClick={() => setLayoutStyle('modern')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                layoutStyle === 'modern'
                  ? 'bg-accent-500 text-white shadow-glow-green border border-accent-400/50'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              <span>Style B: Modern Brand Slate</span>
              {layoutStyle === 'modern' && <Check className="w-4 h-4 text-accent-400" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center leading-relaxed">
            Toggle to preview different layouts. Both styles respect AuraShip's corporate color scheme.
          </p>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#1e1a6e] border border-[#5b54f5]/30 hover:bg-[#3b34cc] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 relative group"
        aria-label="Toggle Layout Selector"
      >
        <Layers className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90 text-accent-400' : ''}`} />
        <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow border border-slate-700/50">
          Switch Layout Style
        </span>
      </button>
    </div>
  );
}
