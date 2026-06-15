'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutStyle = 'corporate' | 'modern';

interface LayoutContextType {
  layoutStyle: LayoutStyle;
  setLayoutStyle: (style: LayoutStyle) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('corporate');

  useEffect(() => {
    const saved = localStorage.getItem('auraship-layout-style') as LayoutStyle;
    if (saved === 'corporate' || saved === 'modern') {
      setLayoutStyle(saved);
    }
  }, []);

  const changeStyle = (style: LayoutStyle) => {
    setLayoutStyle(style);
    localStorage.setItem('auraship-layout-style', style);
  };

  return (
    <LayoutContext.Provider value={{ layoutStyle, setLayoutStyle: changeStyle }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
