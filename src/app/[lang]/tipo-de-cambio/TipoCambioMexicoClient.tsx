'use client';

import React, { useState } from 'react';

export default function TipoCambioMexicoClient() {
  const [direction, setDirection] = useState<'usd_to_mxn' | 'mxn_to_usd'>('usd_to_mxn');
  const [monto, setMonto] = useState<string>('100');
  const [tipoCambio, setTipoCambio] = useState<string>('18.50');
  const [ratePreset, setRatePreset] = useState<'fix' | 'custom'>('fix');

  const numericMonto = parseFloat(monto) || 0;
  const numericRate = parseFloat(tipoCambio) || 18.50;

  const isUsdToMxn = direction === 'usd_to_mxn';
  const resultado = isUsdToMxn
    ? numericMonto * numericRate
    : numericRate > 0
    ? numericMonto / numericRate
    : 0;

  const handleSwap = () => {
    setDirection((prev) => (prev === 'usd_to_mxn' ? 'mxn_to_usd' : 'usd_to_mxn'));
  };

  const handlePresetSelect = (preset: 'fix' | 'custom', val?: string) => {
    setRatePreset(preset);
    if (val) setTipoCambio(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇲🇽</span>
          <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
            Convertidor {isUsdToMxn ? 'Dólares a Pesos Mexicanos (USD → MXN)' : 'Pesos Mexicanos a Dólares (MXN → USD)'}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition font-bold text-xs"
          title="Invertir dirección de conversión"
        >
          <span>Invertir a {isUsdToMxn ? 'MXN → USD' : 'USD → MXN'}</span>
          <span className="text-sm">⇄</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto a Convertir ({isUsdToMxn ? 'Dólares USD' : 'Pesos MXN'})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                {isUsdToMxn ? '$' : '$ MXN'}
              </span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="100"
                min="0"
                step="any"
                className="w-full pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Tipo de Cambio Aplicable (MXN por USD)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold mb-3">
              <button
                type="button"
                onClick={() => handlePresetSelect('fix', '18.50')}
                className={`py-3 px-3 rounded-xl border text-center transition ${
                  ratePreset === 'fix'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>Banxico FIX / DOF</div>
                <div className="text-[10px] font-normal">Tasa oficial SAT</div>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('custom')}
                className={`py-3 px-3 rounded-xl border text-center transition ${
                  ratePreset === 'custom'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>Personalizado</div>
                <div className="text-[10px] font-normal">Tasa Bancaria / Libre</div>
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                1 USD =
              </span>
              <input
                type="number"
                step="0.0001"
                value={tipoCambio}
                onChange={(e) => {
                  setTipoCambio(e.target.value);
                  setRatePreset('custom');
                }}
                placeholder="18.50"
                className="w-full pl-20 pr-16 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-black text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                MXN
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-200">Fundamento Legal SAT:</strong> Conforme al Art. 20 del CFF, para calcular contribuciones y sus accesorios causados en moneda extranjera, se considerará el tipo de cambio FIX publicado en el DOF el día hábil bancario anterior.
          </div>
        </div>

        {/* Result Box */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Total Convertido
            </span>

            <div className="text-4xl sm:text-5xl font-black text-white">
              {isUsdToMxn
                ? `$${resultado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`
                : `$${resultado.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
            </div>

            <p className="text-xs text-slate-300">
              {isUsdToMxn
                ? `$${numericMonto.toFixed(2)} USD a una tasa de $${numericRate.toFixed(4)} pesos por dólar`
                : `$${numericMonto.toFixed(2)} MXN a una tasa de $${numericRate.toFixed(4)} pesos por dólar`}
            </p>

            <div className="pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
              {isUsdToMxn
                ? `Operación: $${numericMonto.toFixed(2)} × ${numericRate.toFixed(4)} = $${resultado.toFixed(2)} MXN`
                : `Operación: $${numericMonto.toFixed(2)} ÷ ${numericRate.toFixed(4)} = $${resultado.toFixed(2)} USD`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
