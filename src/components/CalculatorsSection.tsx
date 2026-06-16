'use client';

import { useState, useMemo, useRef } from 'react';
import { 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  ShoppingBag, 
  DollarSign, 
  TrendingDown 
} from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import rateCards from '@/data/rateCards.json';
import conciergeFees from '@/data/conciergeFees.json';

interface RateCard {
  weight: number;
  rateJmd: number;
}

interface Calculations {
  baseJmd: number;
  cashFee: number;
  cashTotal: number;
  debitFee: number;
  debitTotal: number;
  savings: number;
}

const MAX_WEIGHT = rateCards[rateCards.length - 1].weight;

function getRate(weight: number): RateCard | null {
  const exact = rateCards.find((r) => r.weight === Math.ceil(weight));
  return exact ?? null;
}

export default function CalculatorsSection() {
  const { layoutStyle } = useLayout();
  const isModern = layoutStyle === 'modern';

  // ── Rate Calculator States & Logic ──
  const [weight, setWeight] = useState<string>('');
  const [rateError, setRateError] = useState<string>('');
  const [showTable, setShowTable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rateResult = useMemo<RateCard | null>(() => {
    if (!weight) { setRateError(''); return null; }
    const num = parseFloat(weight);
    if (isNaN(num) || num <= 0) { setRateError('Please enter a valid weight greater than 0.'); return null; }
    if (num > MAX_WEIGHT) { setRateError(`Maximum weight is ${MAX_WEIGHT} lbs. Contact us for bulk freight options.`); return null; }
    setRateError('');
    return getRate(num);
  }, [weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const displayRows = useMemo(() => {
    if (!showTable) return rateCards.slice(0, 10);
    return rateCards;
  }, [showTable]);

  // ── Concierge Calculator States & Logic ──
  const [itemCostUsd, setItemCostUsd] = useState<string>('');
  const [conciergeError, setConciergeError] = useState<string>('');

  const conciergeCalculations = useMemo<Calculations | null>(() => {
    if (!itemCostUsd) { setConciergeError(''); return null; }
    const cost = parseFloat(itemCostUsd);
    if (isNaN(cost) || cost <= 0) {
      setConciergeError('Please enter a valid amount greater than $0.00 USD.');
      return null;
    }
    setConciergeError('');
    const baseJmd = cost * conciergeFees.exchangeRate;
    const cashFee = baseJmd * (conciergeFees.fees.cash.percentage / 100);
    const debitFee = baseJmd * (conciergeFees.fees.debit.percentage / 100);
    return {
      baseJmd,
      cashFee,
      cashTotal: baseJmd + cashFee,
      debitFee,
      debitTotal: baseJmd + debitFee,
      savings: debitFee - cashFee,
    };
  }, [itemCostUsd]);

  const fmt = (n: number) => `J$${n.toLocaleString('en-JM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <section
      id="calculators"
      className={`w-full py-20 md:py-28 transition-colors duration-300 border-b ${
        isModern 
          ? 'bg-slate-50 text-slate-800 border-slate-200/50' 
          : 'bg-[#0f0d3a] dark:bg-[#08071f] text-white border-primary-950/20'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            isModern ? 'bg-primary-50 text-primary-700' : 'bg-primary-950/60 text-accent-400 border border-primary-800/30'
          }`}>
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            Pricing & Tools
          </span>
          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 ${
            isModern ? 'text-slate-900' : 'text-white'
          }`}>
            Calculators & Shopping Tools
          </h2>
          <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${
            isModern ? 'text-slate-605' : 'text-slate-300'
          }`}>
            Instantly estimate your air shipping rates or calculate fees for shopping assistance. Contact us directly for bulk sea freight rates.
          </p>
        </div>

        {/* ── Side by Side Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* ── COLUMN 1: Shipping Rate Calculator ── */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`rounded-xl p-2.5 ${
                isModern ? 'bg-primary-50 text-primary-700' : 'bg-primary-950 text-accent-400'
              }`}>
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold leading-none ${isModern ? 'text-slate-900' : 'text-white'}`}>
                  Shipping Rate Calculator
                </h3>
                <p className={`text-xs mt-1 ${isModern ? 'text-slate-500' : 'text-slate-400'}`}>
                  Calculate air shipment costs based on package weight.
                </p>
              </div>
            </div>

            {/* Input Card */}
            <div className={isModern ? 'bg-white border border-slate-200/80 p-6 rounded-2xl shadow-md mb-6' : 'card mb-6'}>
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
              {rateError && (
                <div
                  role="alert"
                  className={`mt-5 result-panel border-red-200 flex items-start gap-3 ${
                    isModern ? 'bg-red-50 border' : 'bg-red-50 dark:bg-red-950/40 dark:border-red-800/60'
                  }`}
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-red-700">{rateError}</p>
                </div>
              )}

              {/* Result state */}
              {rateResult && !rateError && (
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
                      <p className="text-xl font-bold text-slate-800">{rateResult.weight} lbs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-primary-550 mb-1">Shipping Cost</p>
                      <p className="text-4xl font-extrabold text-primary-600">
                        J${rateResult.rateJmd.toLocaleString()}
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
              {!weight && !rateError && (
                <div className={`mt-5 p-5 rounded-xl border text-center ${
                  isModern ? 'bg-slate-50 border-slate-200/85' : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}>
                  <p className="text-sm text-slate-400">
                    Start typing your package weight to see an instant rate.
                  </p>
                </div>
              )}
            </div>

            {/* Rate Table */}
            <div className={isModern ? 'bg-white border border-slate-200/80 p-6 rounded-2xl shadow-md text-left' : 'card'}>
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
                aria-expanded={showTable}
                aria-controls="rate-table"
              >
                <h3 className={`text-base font-semibold ${isModern ? 'text-slate-900' : 'text-slate-900 dark:text-white'}`}>
                  Full Rate Table
                  <span className={`ml-2 text-xs font-normal ${isModern ? 'text-slate-405' : 'text-slate-400 dark:text-slate-500'}`}>
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
                className={`overflow-hidden transition-all duration-300 ${showTable ? 'max-h-[500px] overflow-y-auto mt-4' : 'max-h-[200px] mt-4'}`}
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
                      const isActive = rateResult?.weight === card.weight;
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
                          <td className={`py-2 px-3 font-medium ${isActive ? 'text-white' : 'text-slate-755'}`}>
                            {card.weight} lb{card.weight !== 1 ? 's' : ''}
                          </td>
                          <td className={`py-2 px-3 text-right font-semibold ${isActive ? 'text-white' : 'text-primary-600'}`}>
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

          {/* ── COLUMN 2: Concierge Shopping Assistance ── */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`rounded-xl p-2.5 ${
                isModern ? 'bg-primary-50 text-primary-700' : 'bg-primary-950 text-accent-400'
              }`}>
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold leading-none ${isModern ? 'text-slate-900' : 'text-white'}`}>
                  {conciergeFees.text.title}
                </h3>
                <p className={`text-xs mt-1 ${isModern ? 'text-slate-500' : 'text-slate-400'}`}>
                  Estimate fees for using our credit card to shop online.
                </p>
              </div>
            </div>

            {/* Detailed Service Explanation Card */}
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm text-left leading-relaxed mb-6 shadow-sm ${
              isModern 
                ? 'bg-primary-50/25 border-primary-100/70 text-slate-700' 
                : 'bg-primary-950/20 border-primary-900/20 text-slate-350 backdrop-blur-sm'
            }`}>
              <p>
                {conciergeFees.text.description}
              </p>
            </div>

            {/* Input Card */}
            <div className={isModern ? 'bg-white border border-slate-200/80 p-6 rounded-2xl shadow-md mb-6' : 'card mb-6'}>
              <label htmlFor="item-cost-input" className="block">
                <span className={`block text-sm font-semibold mb-2 ${isModern ? 'text-slate-700' : 'text-slate-700 dark:text-slate-200'}`}>
                  Item Cost (USD)
                </span>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-450 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="item-cost-input"
                    type="number"
                    inputMode="decimal"
                    placeholder="Enter item price in USD (e.g. 49.99)"
                    value={itemCostUsd}
                    onChange={(e) => setItemCostUsd(e.target.value)}
                    className={`input-field pl-12 text-lg ${
                      isModern 
                        ? 'bg-slate-50/50 border-slate-200 text-slate-950 placeholder-slate-400 focus:border-primary-500 focus:bg-white' 
                        : ''
                    }`}
                    step="0.01"
                    min="0"
                  />
                </div>
                <p className={`text-xs mt-2 ${isModern ? 'text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  Exchange rate: 1 USD = J${conciergeFees.exchangeRate.toFixed(2)}
                </p>
              </label>

              {/* Error */}
              {conciergeError && (
                <div role="alert" className={`mt-5 result-panel border-red-200 flex items-start gap-3 ${
                  isModern ? 'bg-red-50 border' : 'bg-red-50 dark:bg-red-950/40 dark:border-red-800/60'
                }`}>
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-red-700">{conciergeError}</p>
                </div>
              )}

              {/* Empty state */}
              {!itemCostUsd && !conciergeError && (
                <div className={`mt-5 p-5 rounded-xl border text-center ${
                  isModern ? 'bg-slate-50 border-slate-200/85' : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}>
                  <p className="text-sm text-slate-400">
                    Enter an item cost to see your cash and debit payment totals.
                  </p>
                </div>
              )}

              {/* Results */}
              {conciergeCalculations && !conciergeError && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-5 space-y-3 animate-fade-in text-left"
                >
                  {/* Base cost row */}
                  <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                    isModern ? 'bg-slate-50 border-slate-100' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'
                  }`}>
                    <span className="text-sm text-slate-550">Base cost (USD → JMD):</span>
                    <span className="text-sm font-semibold text-slate-800">{fmt(conciergeCalculations.baseJmd)}</span>
                  </div>

                  {/* Side-by-side payment options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Cash option */}
                    <div className={`result-panel border ${
                      isModern 
                        ? 'bg-primary-50/50 border-primary-200' 
                        : 'bg-primary-50 dark:bg-primary-950/50 border-primary-200 dark:border-primary-700/60'
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl" aria-hidden="true">{conciergeFees.fees.cash.emoji}</span>
                        <div>
                          <p className="text-sm font-bold text-primary-900">{conciergeFees.fees.cash.label}</p>
                          <p className="text-xs text-primary-650">{conciergeFees.fees.cash.description}</p>
                        </div>
                      </div>
                      <div className="border-t border-primary-200 pt-3 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-primary-700">Fee ({conciergeFees.fees.cash.percentage}%):</span>
                          <span className="text-primary-800 font-medium">{fmt(conciergeCalculations.cashFee)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-primary-900">Total:</span>
                          <span className="text-xl font-extrabold text-primary-600">{fmt(conciergeCalculations.cashTotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Debit option */}
                    <div className={`result-panel border ${
                      isModern 
                        ? 'bg-slate-50 border-slate-200' 
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl" aria-hidden="true">{conciergeFees.fees.debit.emoji}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{conciergeFees.fees.debit.label}</p>
                          <p className="text-xs text-slate-500">{conciergeFees.fees.debit.description}</p>
                        </div>
                      </div>
                      <div className={`border-t pt-3 space-y-1.5 ${isModern ? 'border-slate-200' : 'border-slate-200 dark:border-white/10'}`}>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600">Fee ({conciergeFees.fees.debit.percentage}%):</span>
                          <span className="text-slate-700 font-medium">{fmt(conciergeCalculations.debitFee)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-slate-900">Total:</span>
                          <span className="text-xl font-extrabold text-slate-750">{fmt(conciergeCalculations.debitTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings callout */}
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                    isModern ? 'bg-accent-50 border-accent-100' : 'bg-accent-50 dark:bg-accent-950/30 border border-accent-200 dark:border-accent-800/50'
                  }`}>
                    <TrendingDown className="w-5 h-5 text-accent-600 flex-shrink-0" aria-hidden="true" />
                    <p className="text-xs sm:text-sm text-accent-805">
                      <span className="font-bold">Save {fmt(conciergeCalculations.savings)}</span> by paying cash instead of using your debit card!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
