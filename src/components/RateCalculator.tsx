'use client';

import { useState, useMemo, useRef } from 'react';
import { Package, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import rateCards from '@/data/rateCards.json';

interface RateCard {
  weight: number;
  rateJmd: number;
}

const MAX_WEIGHT = rateCards[rateCards.length - 1].weight;

function getRate(weight: number): RateCard | null {
  const exact = rateCards.find((r) => r.weight === Math.ceil(weight));
  return exact ?? null;
}

export default function RateCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showTable, setShowTable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const result = useMemo<RateCard | null>(() => {
    if (!weight) { setError(''); return null; }
    const num = parseFloat(weight);
    if (isNaN(num) || num <= 0) { setError('Please enter a valid weight greater than 0.'); return null; }
    if (num > MAX_WEIGHT) { setError(`Maximum weight is ${MAX_WEIGHT} lbs. Contact us for bulk freight options.`); return null; }
    setError('');
    return getRate(num);
  }, [weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  // Group rate cards for display — show 20 at a time around current result
  const displayRows = useMemo(() => {
    if (!showTable) return rateCards.slice(0, 20);
    return rateCards;
  }, [showTable]);

  return (
    <section
      id="rate-calculator"
      className="w-full py-20 md:py-28 bg-[#f5f5ff] dark:bg-[#0f0d3a]"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="section-label">
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            Instant Pricing
          </span>
          <h2 className="section-title">Shipping Rate Calculator</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            Type your package weight in lbs — we&#39;ll instantly look up the exact JMD rate for air shipments. For sea freight cargo rates, please{' '}
            <a href="#contact" className="font-semibold underline text-primary-600 hover:text-accent-500 transition-colors">
              contact us
            </a>.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="card mb-6">
          <label htmlFor="weight-input" className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Package Weight (lbs)
            </span>
            <div className="relative">
              <Package
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 dark:text-primary-500 pointer-events-none"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                id="weight-input"
                type="number"
                inputMode="decimal"
                placeholder={`Enter weight (1 – ${MAX_WEIGHT} lbs)`}
                value={weight}
                onChange={handleChange}
                className="input-field pl-12 text-lg"
                step="1"
                min="1"
                max={MAX_WEIGHT}
                aria-describedby="weight-hint"
              />
            </div>
            <p id="weight-hint" className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Rates are calculated per whole pound. Maximum: {MAX_WEIGHT} lbs.
            </p>
          </label>

          {/* Error state */}
          {error && (
            <div
              role="alert"
              className="mt-5 result-panel bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Result state */}
          {result && !error && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 result-panel bg-primary-50 dark:bg-primary-950/50 border-primary-300 dark:border-primary-700/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent-500 dark:text-accent-400" aria-hidden="true" />
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                  Rate found for {weight} lb{parseFloat(weight) !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-500 dark:text-primary-400 mb-1">Weight</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{result.weight} lbs</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-primary-500 dark:text-primary-400 mb-1">Shipping Cost</p>
                  <p className="text-4xl font-extrabold text-primary-600 dark:text-primary-300">
                    J${result.rateJmd.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-primary-200 dark:border-primary-800/40 text-center">
                <p className="text-xs text-primary-650 dark:text-primary-400">
                  Rate shown is for <strong>air shipment</strong> only. For sea freight cargo rates, please{' '}
                  <a href="#contact" className="font-bold underline hover:text-accent-500 transition-colors">
                    get in touch with our team
                  </a>.
                </p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!weight && !error && (
            <div className="mt-5 p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Start typing your package weight to see an instant rate.
              </p>
            </div>
          )}
        </div>

        {/* ── Rate Table ── */}
        <div className="card">
          <button
            onClick={() => setShowTable(!showTable)}
            className="w-full flex items-center justify-between text-left"
            aria-expanded={showTable}
            aria-controls="rate-table"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Full Rate Table
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                ({rateCards.length} weight tiers)
              </span>
            </h3>
            <span className="flex items-center gap-1 text-xs text-primary-500 dark:text-primary-400 font-medium">
              {showTable ? 'Collapse' : 'Expand'}
              {showTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          <div
            id="rate-table"
            className={`overflow-hidden transition-all duration-300 ${showTable ? 'max-h-[600px] overflow-y-auto mt-4' : 'max-h-[240px] mt-4'}`}
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#f5f5ff] dark:bg-[#0f0d3a]">
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Weight (lbs)
                  </th>
                  <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Rate (JMD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayRows.map((card) => {
                  const isActive = result?.weight === card.weight;
                  return (
                    <tr
                      key={card.weight}
                      className={`border-b border-slate-100 dark:border-white/5 transition-colors ${
                        isActive
                          ? 'bg-primary-500 dark:bg-primary-600'
                          : 'hover:bg-primary-50/60 dark:hover:bg-white/5'
                      }`}
                    >
                      <td className={`py-2.5 px-3 font-medium ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {card.weight} lb{card.weight !== 1 ? 's' : ''}
                      </td>
                      <td className={`py-2.5 px-3 text-right font-semibold ${isActive ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>
                        J${card.rateJmd.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!showTable && (
              <div className="h-12 bg-gradient-to-t from-white dark:from-[#141236] to-transparent pointer-events-none -mt-12 relative z-10" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
