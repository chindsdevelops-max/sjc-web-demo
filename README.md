# AuraShip — Next.js Logistics SPA

A high-performance, mobile-first Single Page Application for modern logistics operations. Built for the **Tuesday morning demo** for ShipJet Courier, modernizing their legacy static website into a blazing-fast, theme-aware Next.js SPA.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Development
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📋 Architecture Overview

### Tech Stack
- **Framework**: Next.js 14+ (App Router + Turbopack)
- **Styling**: Tailwind CSS v4 with light/dark mode support
- **Icons**: Lucide React
- **Language**: TypeScript (strict mode)
- **Data**: Decoupled JSON (mock Headless CMS)
- **Hosting Target**: Cloudflare Pages (static export)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata & theme setup
│   ├── page.tsx             # Main page orchestrating all components
│   └── globals.css          # Global styles, Tailwind imports, custom utilities
├── components/
│   ├── HeroSection.tsx      # Hero banner with announcement & CTAs
│   ├── RateCalculator.tsx   # Instant weight-to-JMD shipping calculator
│   ├── ConciergeCalculator.tsx # Shopping assistance fee calculator
│   ├── AboutSection.tsx     # About section with brand stats
│   └── Footer.tsx           # Footer with navigation links
└── data/
    ├── siteContent.json     # Hero copy, about, announcement text
    ├── rateCards.json       # Weight tiers with JMD pricing
    └── conciergeFees.json   # Exchange rate & fee structure (5% / 10%)
```

---

## 🎨 Theming & Design

### Light/Dark Mode
- **Automatic**: Respects system `prefers-color-scheme`
- **CSS Variables**: Root colors defined in `globals.css`
- **Tailwind**: Use `dark:` classes for dark-mode specific styles
- **Colors**:
  - Primary: Deep blue (#0284c7 → #075985)
  - Secondary: Red (#dc2626 → #b91c1c)
  - Neutral: Slate family for text & backgrounds

### Mobile-First Responsive
All components use `sm:`, `md:`, `lg:` breakpoints for seamless mobile, tablet, and desktop experiences.

---

## 📊 Core Components

### 1. Hero Section (`HeroSection.tsx`)
- Announcement banner (orange alert bar)
- Dynamic hero copy from `siteContent.json`
- Two CTA buttons:
  - **Calculate Shipping** → Smooth scroll to Rate Calculator
  - **Dashboard** → External link (target="_blank") to WMS

### 2. Rate Calculator (`RateCalculator.tsx`)
**Features:**
- Real-time weight input (lbs)
- Instant tier matching from `rateCards.json`
- Clear error states (out-of-range, invalid input)
- Full rate table reference
- Result highlighting with JMD cost

**Data Logic:**
```json
// Example from rateCards.json
{ "minWeight": 3, "maxWeight": 5, "rateJmd": 2100 }
```

### 3. Concierge Calculator (`ConciergeCalculator.tsx`)
**Features:**
- USD cost input
- Base JMD conversion using exchange rate
- Two payment scenarios:
  - **Cash**: 5% assistance fee
  - **Debit Card**: 10% assistance fee
- Savings highlight (cash vs. debit)

**Data Logic:**
```json
// From conciergeFees.json
{
  "exchangeRate": 155.50,
  "fees": {
    "cash": { "percentage": 5 },
    "debit": { "percentage": 10 }
  }
}
```

### 4. About Section (`AboutSection.tsx`)
- Brand narrative
- Feature highlights (bullet list)
- Stats grid (shipments, support, delivery rate, customers)

### 5. Footer (`Footer.tsx`)
- Brand info
- Quick navigation links
- Legal links
- Copyright & tech stack attribution

---

## 📝 Data Files

### `siteContent.json`
```json
{
  "hero": {
    "title": "Ship Smart, Ship Fast",
    "subtitle": "...",
    "ctaPrimary": "Calculate Shipping",
    "ctaSecondary": "Dashboard"
  },
  "announcement": {
    "active": true,
    "text": "Holiday Alert: Cutoff for Friday flights is Thursday at 2:00 PM",
    "type": "info"
  },
  "aboutUs": {
    "title": "About AuraShip",
    "description": "...",
    "features": [...]
  }
}
```

### `rateCards.json`
Array of weight tiers:
```json
[
  { "id": 1, "minWeight": 1, "maxWeight": 1, "rateJmd": 650 },
  { "id": 2, "minWeight": 2, "maxWeight": 2, "rateJmd": 1350 },
  { "id": 3, "minWeight": 3, "maxWeight": 5, "rateJmd": 2100 }
]
```

### `conciergeFees.json`
```json
{
  "exchangeRate": 155.50,
  "fees": {
    "cash": { "percentage": 5, "description": "5% fee for cash purchases" },
    "debit": { "percentage": 10, "description": "10% fee for debit card purchases" }
  }
}
```

---

## 🔒 Security & Best Practices

### ✅ What We Do
- ✓ Decoupled data (no hardcoding)
- ✓ Strict TypeScript (type safety)
- ✓ No client-side secrets or API keys
- ✓ OWASP-compliant input validation
- ✓ Semantic HTML for accessibility

### ❌ What We DON'T Do
- ✗ **Calendar UI elements** (strict prohibition per brand guidelines)
- ✗ Hardcoded rates or fees
- ✗ Client-side authentication logic
- ✗ Unvalidated user input

---

## 🚀 Deployment

### For Cloudflare Pages
1. Static export is ready (Next.js 14+ static rendering)
2. Build: `npm run build`
3. Upload `out/` directory to Cloudflare Pages
4. No edge functions required for demo

---

## ✨ Key Features

- ✅ **Instant Rate Calculator**: Type weight → get JMD cost in real-time
- ✅ **Concierge Fee Breakdown**: Compare cash vs. debit card costs
- ✅ **Announcement Banner**: Holiday alerts (no calendar!) 
- ✅ **Light/Dark Mode**: System-aware theming
- ✅ **Mobile-First**: Responsive on all devices
- ✅ **Type-Safe**: Full TypeScript coverage
- ✅ **Zero External APIs**: Pure JSON-based data
- ✅ **Edge-Ready**: Static pre-rendering for Cloudflare

---

## 🛠 Development Workflow

### Component Development
1. Add data to `src/data/*.json`
2. Create component in `src/components/` with `'use client'` (if interactive)
3. Import data: `import data from '@/data/siteContent.json'`
4. Use Tailwind classes with `dark:` variants
5. Export to `src/app/page.tsx`

---

## 📞 For the Tuesday Demo

✨ **All data is in JSON files** → easy to update on the fly
⚡ **No database queries** → instant page loads
🌓 **Light/dark mode auto-detected** → no user config needed
📱 **Mobile-responsive** → demo on any device

