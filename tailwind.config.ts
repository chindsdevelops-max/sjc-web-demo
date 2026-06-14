import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ship Jet primary: deep indigo/purple (extracted from shipjetcourier.com hero & nav)
        primary: {
          50:  '#f0efff',
          100: '#e0dfff',
          200: '#c4c2ff',
          300: '#a09bff',
          400: '#7b73fc',
          500: '#5b54f5',
          600: '#4a42e8',
          700: '#3b34cc',
          800: '#2f29a6',
          900: '#1e1a6e',
          950: '#0f0d3a',
        },
        // Ship Jet accent: green CTA (from "Register Free" button)
        accent: {
          50:  '#edfcf4',
          100: '#d3f8e3',
          200: '#aaf0cb',
          300: '#72e3aa',
          400: '#3dcf85',
          500: '#1ab567',
          600: '#0f9252',
          700: '#0e7443',
          800: '#0f5c37',
          900: '#0d4c2e',
          950: '#062b1a',
        },
        // Secondary: amber/gold for warnings and highlights
        secondary: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e1a6e 0%, #3b34cc 40%, #5b54f5 70%, #7b73fc 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0f0d3a 0%, #1e1a6e 40%, #2f29a6 70%, #3b34cc 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-banner': 'slideInBanner 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'count-up': 'countUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInBanner: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(91, 84, 245, 0.35)',
        'glow-accent': '0 0 20px rgba(26, 181, 103, 0.35)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'card-hover-dark': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
