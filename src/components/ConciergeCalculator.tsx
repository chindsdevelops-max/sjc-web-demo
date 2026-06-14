'use client';

import { useState, useMemo } from 'react';
import { ShoppingBag, AlertCircle, DollarSign, TrendingDown } from 'lucide-react';
import conciergeFees from '@/data/conciergeFees.json';

interface Calculations {
  baseJmd: number;
  cashFee: number;
  cashTotal: number;
  debitFee: number;
  debitTotal: number;
  savings: number;
}

export default function ConciergeCalculator() {
  const [itemCostUsd, setItemCostUsd] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculations = useMemo<Calculations | null>(() => {
    if (!itemCostUsd) { setError(''); return null; }
    const cost = parseFloat(itemCostUsd);
    if (isNaN(cost) || cost <= 0) {
      setError('Please enter a valid amount greater than $0.00 USD.');
      return null;
    }
    setError('');
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
      id="concierge-calculator"
      className="w-full py-20 md:py-28 bg-white dark:bg-[#08071f]"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="section-label">
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            Concierge Service
          </span>
          <h2 className="section-title">Shopping Calculator</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            We shop for you in the US. Enter the item&apos;s USD price to see your total cost in JMD, including our concierge assistance fee.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="card mb-6">
          <label htmlFor="item-cost-input" className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Item Cost (USD)
            </span>
            <div className="relative">
              <DollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 dark:text-primary-500 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="item-cost-input"
                type="number"
                inputMode="decimal"
                placeholder="Enter item price in USD (e.g. 49.99)"
                value={itemCostUsd}
                onChange={(e) => setItemCostUsd(e.target.value)}
                className="input-field pl-12 text-lg"
                step="0.01"
                min="0"
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Exchange rate: 1 USD = J${conciergeFees.exchangeRate.toFixed(2)}{' '}
              <span className="text-primary-400 dark:text-primary-500">({conciergeFees.exchangeRateNote})</span>
            </p>
          </label>

          {/* Error */}
          {error && (
            <div role="alert" className="mt-5 result-panel bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!itemCostUsd && !error && (
            <div className="mt-5 p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Enter an item cost to see your cash and debit payment totals.
              </p>
            </div>
          )}

          {/* Results */}
          {calculations && !error && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 space-y-3 animate-fade-in"
            >
              {/* Base cost row */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="text-sm text-slate-500 dark:text-slate-400">Base cost (USD → JMD):</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white">{fmt(calculations.baseJmd)}</span>
              </div>

              {/* Side-by-side payment options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash option */}
                <div className="result-panel bg-primary-50 dark:bg-primary-950/50 border-primary-200 dark:border-primary-700/60">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{conciergeFees.fees.cash.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-primary-900 dark:text-primary-100">{conciergeFees.fees.cash.label}</p>
                      <p className="text-xs text-primary-600 dark:text-primary-400">{conciergeFees.fees.cash.description}</p>
                    </div>
                  </div>
                  <div className="border-t border-primary-200 dark:border-primary-700/50 pt-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-primary-700 dark:text-primary-300">Fee ({conciergeFees.fees.cash.percentage}%):</span>
                      <span className="text-primary-800 dark:text-primary-200 font-medium">{fmt(calculations.cashFee)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-primary-900 dark:text-primary-100">Total:</span>
                      <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-300">{fmt(calculations.cashTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Debit option */}
                <div className="result-panel bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{conciergeFees.fees.debit.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{conciergeFees.fees.debit.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{conciergeFees.fees.debit.description}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/10 pt-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-400">Fee ({conciergeFees.fees.debit.percentage}%):</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{fmt(calculations.debitFee)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Total:</span>
                      <span className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">{fmt(calculations.debitTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings callout */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-50 dark:bg-accent-950/30 border border-accent-200 dark:border-accent-800/50">
                <TrendingDown className="w-5 h-5 text-accent-600 dark:text-accent-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-accent-800 dark:text-accent-300">
                  <span className="font-bold">Save {fmt(calculations.savings)}</span> by paying cash instead of using your debit card!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Fee Reference Card ── */}
        <div className="card">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
            Fee Structure Reference
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(conciergeFees.fees).map((fee) => (
              <div key={fee.label} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-2xl block mb-2" aria-hidden="true">{fee.emoji}</span>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">{fee.label}</p>
                <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-300">{fee.percentage}%</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">assistance fee</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
