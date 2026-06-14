# Technical Skills & Architecture Directives

## Core Stack
* **Framework:** Next.js (App Router, static exports optimized for Cloudflare Pages)
* **Styling:** Tailwind CSS (configured for Light/Dark mode)
* **State Management:** React Hooks (`useState`, `useMemo` for calculators)
* **Icons:** Lucide React or Heroicons
* **Language:** TypeScript (Strict mode)

## Mock Data Architecture (Pre-Supabase)
To ensure the transition to a Supabase Headless CMS is frictionless, structure the local data store as follows:
* `src/data/siteContent.json`: Contains hero text, about us, services, and global announcement banners.
* `src/data/rateCards.json`: An array of objects defining weight tiers and corresponding JMD costs.
* `src/data/conciergeFees.json`: Config for the 5% cash / 10% debit purchasing assistance logic.

## Key Feature Implementations
1. **Dynamic Rate Calculator:**
   - Input: Weight in lbs.
   - Logic: Search the `rateCards.json` array to find the matching tier and return the JMD value.
   - UI: Instant calculation as the user types, with clear error states for out-of-bounds weights.

2. **Concierge Shopping Calculator:**
   - Input: Item cost in USD.
   - Logic: Calculate the base JMD cost (using a mock exchange rate), then calculate the 5% and 10% fee variants.

3. **Color Palette Extraction:**
   - The UI must utilize the primary colors extracted from the legacy site (shipjetcourier.com). Set these up in `tailwind.config.ts` as `primary` and `secondary` to maintain brand continuity during the demo.

4. **Outbound Portal Linking:**
   - The "Dashboard" and "Login" buttons should be visually prominent but act as external links (target="_blank") simulating the handoff to the existing warehouse WMS.
