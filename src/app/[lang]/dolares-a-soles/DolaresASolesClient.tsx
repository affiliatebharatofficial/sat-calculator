'use client';

import React, { useState } from 'react';
import { SunatRateData } from '@/lib/sunat-exchange-rate';

interface Props {
  initialRate: SunatRateData;
}

export default function DolaresASolesClient({ initialRate }: Props) {
  const [direction, setDirection] = useState<'usd_to_pen' | 'pen_to_usd'>('usd_to_pen');
  const [monto, setMonto] = useState<string>('100');
  const [mode, setMode] = useState<'sunat_venta' | 'sunat_compra' | 'custom'>('sunat_venta');
  const [customRate, setCustomRate] = useState<string>('3.750');

  const sunatRateValue = mode === 'sunat_compra' ? initialRate.compra : initialRate.venta;
  const activeRate = mode === 'custom' ? (parseFloat(customRate) || 3.75) : (sunatRateValue || 3.75);
  const numericMonto = parseFloat(monto) || 0;

  const isUsdToPen = direction === 'usd_to_pen';
  const result = isUsdToPen
    ? numericMonto * activeRate
    : activeRate > 0
    ? numericMonto / activeRate
    : 0;

  const handleSwap = () => {
    setDirection((prev) => (prev === 'usd_to_pen' ? 'pen_to_usd' : 'usd_to_pen'));
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">💱</span>
          <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
            Convertidor Bidireccional {isUsdToPen ? 'Dólares a Soles (USD → PEN)' : 'Soles a Dólares (PEN → USD)'}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition font-bold text-xs"
          title="Invertir dirección de conversión"
        >
          <span>Cambiar a {isUsdToPen ? 'PEN → USD' : 'USD → PEN'}</span>
          <span className="text-sm">⇄</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto a Convertir ({isUsdToPen ? 'Dólares USD' : 'Soles PEN'})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                {isUsdToPen ? '$' : 'S/'}
              </span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="100"
                min="0"
                step="any"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Tipo de Cambio Utilizado
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('sunat_venta')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'sunat_venta'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>SUNAT Venta</div>
                <div className="text-[10px] font-normal">S/ {initialRate.venta.toFixed(3)}</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('sunat_compra')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'sunat_compra'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>SUNAT Compra</div>
                <div className="text-[10px] font-normal">S/ {initialRate.compra.toFixed(3)}</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('custom')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'custom'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>Personalizado</div>
                <div className="text-[10px] font-normal">Mi Banco / Casa</div>
              </button>
            </div>
          </div>

          {mode === 'custom' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
              <label className="block text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                Ingresa tu Tasa de Cambio (Soles por Dólar):
              </label>
              <input
                type="number"
                step="0.001"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Ej: 3.765"
                className="w-full px-4 py-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
              />
            </div>
          )}

          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Fecha SUNAT: <strong>{initialRate.fecha || 'Hoy'}</strong></span>
            <span className="mx-2">•</span>
            <span>Tasa efectiva: <strong>S/ {activeRate.toFixed(4)}</strong></span>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Resultado de Conversión
            </span>

            <div className="text-4xl sm:text-5xl font-black text-emerald-400">
              {isUsdToPen ? `S/ ${result.toFixed(2)} PEN` : `$ ${result.toFixed(2)} USD`}
            </div>

            <p className="text-xs text-slate-300">
              {isUsdToPen
                ? `$${numericMonto.toFixed(2)} USD convertidos a soles a tasa S/ ${activeRate.toFixed(4)}`
                : `S/ ${numericMonto.toFixed(2)} PEN convertidos a dólares a tasa S/ ${activeRate.toFixed(4)}`}
            </p>

            <div className="pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
              {isUsdToPen
                ? `Fórmula: $${numericMonto.toFixed(2)} × ${activeRate.toFixed(4)} = S/ ${result.toFixed(2)}`
                : `Fórmula: S/ ${numericMonto.toFixed(2)} ÷ ${activeRate.toFixed(4)} = $${result.toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
