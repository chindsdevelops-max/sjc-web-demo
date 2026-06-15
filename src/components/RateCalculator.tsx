'use client';

import { useState, useMemo, useRef } from 'react';
import { Package, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
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
  const { layoutStyle } = useLayout();
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

  const displayRows = useMemo(() => {
    if (!showTable) return rateCards.slice(0, 20);
    return rateCards;
  }, [showTable]);

  const isModern = layoutStyle === 'modern';

  return (
    <section
      id="rate-calculator"
      className={`w-full py-20 md:py-28 transition-colors duration-300 ${
        isModern ? 'bg-slate-50 text-slate-800 border-b border-slate-200/50' : 'bg-[#f5f5ff] dark:bg-[#0f0d3a]'
      }`}
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            isModern ? 'bg-primary-50 text-primary-700' : 'section-label'
          }`}>
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            Instant Pricing
          </span>
          <h2 className={isModern ? 'text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight' : 'section-title'}>
            Shipping Rate Calculator
          </h2>
          <p className={`max-w-lg mx-auto text-sm ${isModern ? 'text-slate-650' : 'section-subtitle'}`}>
            Type your package weight in lbs — we&#39;ll instantly look up the exact JMD rate for air shipments. For sea freight cargo rates, please{' '}
            <a href="#contact" className="font-bold underline text-primary-600 hover:text-accent-500 transition-colors">
              contact us
            </a>.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className={isModern ? 'bg-white border border-slate-200/80 p-6 rounded-2xl shadow-md mb-6 text-left' : 'card mb-6'}>
          <label htmlFor="weight-input" className="block">
            <span className={`block text-sm font-semibold mb-2 ${isModern ? 'text-slate-700' : 'text-slate-700 dark:text-slate-200'}`}>
              Package Weight (lbs)
            </span>
            <div className="relative">
              <Package
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-450 pointer-events-none"
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
                className={`input-field pl-12 text-lg ${
                  isModern 
                    ? 'bg-slate-50/50 border-slate-200 text-slate-950 placeholder-slate-400 focus:border-primary-500 focus:bg-white' 
                    : ''
                }`}
                step="1"
                min="1"
                max={MAX_WEIGHT}
                aria-describedby="weight-hint"
              />
            </div>
            <p id="weight-hint" className={`text-xs mt-2 ${isModern ? 'text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
              Rates are calculated per whole pound. Maximum: {MAX_WEIGHT} lbs.
            </p>
          </label>

          {/* Error state */}
          {error && (
            <div
              role="alert"
              className={`mt-5 result-panel border-red-200 flex items-start gap-3 ${
                isModern ? 'bg-red-50 border' : 'bg-red-50 dark:bg-red-950/40 dark:border-red-800/60'
              }`}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Result state */}
          {result && !error && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-5 result-panel border ${
                isModern 
                  ? 'bg-primary-50/50 border-primary-200' 
                  : 'bg-primary-50 dark:bg-primary-950/50 border-primary-300 dark:border-primary-700/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent-500" aria-hidden="true" />
                <span className="text-sm font-semibold text-primary-700">
                  Rate found for {weight} lb{parseFloat(weight) !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-550 mb-1">Weight</p>
                  <p className="text-xl font-bold text-slate-800">{result.weight} lbs</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-primary-550 mb-1">Shipping Cost</p>
                  <p className="text-4xl font-extrabold text-primary-600">
                    J${result.rateJmd.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-primary-200 text-center">
                <p className="text-xs text-primary-700">
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
            <div className={`mt-5 p-5 rounded-xl border text-center ${
              isModern ? 'bg-slate-50 border-slate-200/85' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'
            }`}>
              <p className="text-sm text-slate-400">
                Start typing your package weight to see an instant rate.
              </p>
            </div>
          )}
        </div>

        {/* ── Rate Table ── */}
        <div className={isModern ? 'bg-white border border-slate-200/80 p-6 rounded-2xl shadow-md text-left' : 'card'}>
          <button
            onClick={() => setShowTable(!showTable)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
            aria-expanded={showTable}
            aria-controls="rate-table"
          >
            <h3 className={`text-base font-semibold ${isModern ? 'text-slate-900' : 'text-slate-900 dark:text-white'}`}>
              Full Rate Table
              <span className={`ml-2 text-xs font-normal ${isModern ? 'text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                ({rateCards.length} weight tiers)
              </span>
            </h3>
            <span className="flex items-center gap-1 text-xs text-primary-605 font-medium">
              {showTable ? 'Collapse' : 'Expand'}
              {showTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          <div
            id="rate-table"
            className={`overflow-hidden transition-all duration-300 ${showTable ? 'max-h-[600px] overflow-y-auto mt-4' : 'max-h-[240px] mt-4'}`}
          >
            <table className="w-full text-sm">
              <thead className={`sticky top-0 z-10 ${isModern ? 'bg-white' : 'bg-[#f5f5ff] dark:bg-[#0f0d3a]'}`}>
                <tr className={`border-b ${isModern ? 'border-slate-100' : 'border-slate-200 dark:border-white/10'}`}>
                  <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Weight (lbs)
                  </th>
                  <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
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
                      className={`border-b transition-colors ${
                        isActive
                          ? 'bg-primary-600'
                          : isModern
                            ? 'border-slate-50 hover:bg-slate-50/80'
                            : 'border-slate-100 dark:border-white/5 hover:bg-primary-50/60 dark:hover:bg-white/5'
                      }`}
                    >
                      <td className={`py-2.5 px-3 font-medium ${isActive ? 'text-white' : 'text-slate-700'}`}>
                        {card.weight} lb{card.weight !== 1 ? 's' : ''}
                      </td>
                      <td className={`py-2.5 px-3 text-right font-semibold ${isActive ? 'text-white' : 'text-primary-600'}`}>
                        J${card.rateJmd.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!showTable && (
              <div className={`h-12 pointer-events-none -mt-12 relative z-10 bg-gradient-to-t ${
                isModern ? 'from-white to-transparent' : 'from-white dark:from-[#141236] to-transparent'
              }`} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
