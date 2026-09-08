'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Currency = 'USD' | 'MXN' | 'PEN';

const DEFAULT_RATES: Record<string, number> = {
  'USD_MXN': 18.50,
  'MXN_USD': 1 / 18.50,
  'USD_PEN': 3.75,
  'PEN_USD': 1 / 3.75,
  'MXN_PEN': 3.75 / 18.50, // ~0.2027
  'PEN_MXN': 18.50 / 3.75, // ~4.9333
};

const CURRENCY_INFO: Record<Currency, { name: string; symbol: string; flag: string; country: string }> = {
  USD: { name: 'Dólar Estadounidense', symbol: '$', flag: '🇺🇸', country: 'Estados Unidos' },
  MXN: { name: 'Peso Mexicano', symbol: '$ MXN', flag: '🇲🇽', country: 'México' },
  PEN: { name: 'Sol Peruano', symbol: 'S/', flag: '🇵🇪', country: 'Perú' },
};

export default function TipoCambioMexicoClient() {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('MXN');
  const [monto, setMonto] = useState<string>('100');
  const [customRate, setCustomRate] = useState<string>('18.50');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const pairKey = `${fromCurrency}_${toCurrency}`;
  const defaultRate = DEFAULT_RATES[pairKey] || 1;
  const activeRate = isCustom ? (parseFloat(customRate) || defaultRate) : defaultRate;

  const numericMonto = parseFloat(monto) || 0;
  const resultado = numericMonto * activeRate;

  const handleSwap = () => {
    const nextFrom = toCurrency;
    const nextTo = fromCurrency;
    setFromCurrency(nextFrom);
    setToCurrency(nextTo);
    setIsCustom(false);
    const newPairKey = `${nextFrom}_${nextTo}`;
    const newDefaultRate = DEFAULT_RATES[newPairKey] || 1;
    setCustomRate(newDefaultRate < 1 ? newDefaultRate.toFixed(4) : newDefaultRate.toFixed(2));
  };

  const handleFromChange = (newFrom: Currency) => {
    if (newFrom === toCurrency) {
      handleSwap();
      return;
    }
    setFromCurrency(newFrom);
    setIsCustom(false);
    const newPairKey = `${newFrom}_${toCurrency}`;
    const newDefaultRate = DEFAULT_RATES[newPairKey] || 1;
    setCustomRate(newDefaultRate < 1 ? newDefaultRate.toFixed(4) : newDefaultRate.toFixed(2));
  };

  const handleToChange = (newTo: Currency) => {
    if (newTo === fromCurrency) {
      handleSwap();
      return;
    }
    setToCurrency(newTo);
    setIsCustom(false);
    const newPairKey = `${fromCurrency}_${newTo}`;
    const newDefaultRate = DEFAULT_RATES[newPairKey] || 1;
    setCustomRate(newDefaultRate < 1 ? newDefaultRate.toFixed(4) : newDefaultRate.toFixed(2));
  };

  const setPresetOfficial = () => {
    setIsCustom(false);
    const r = DEFAULT_RATES[pairKey] || 1;
    setCustomRate(r < 1 ? r.toFixed(4) : r.toFixed(2));
  };

  const commonAmounts = [1, 5, 10, 20, 50, 100, 500, 1000];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header & Pair Quick Select */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{CURRENCY_INFO[fromCurrency].flag} ⇄ {CURRENCY_INFO[toCurrency].flag}</span>
          <div>
            <h2 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              Conversor de Divisas: {fromCurrency} a {toCurrency}
            </h2>
            <p className="text-xs text-slate-500">
              Tasas de referencia oficiales (SAT / Banxico FIX y SUNAT Perú)
            </p>
          </div>
        </div>

        {/* Quick pair buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => { setFromCurrency('USD'); setToCurrency('MXN'); setIsCustom(false); setCustomRate('18.50'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              fromCurrency === 'USD' && toCurrency === 'MXN'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            🇺🇸 USD → 🇲🇽 MXN
          </button>
          <button
            type="button"
            onClick={() => { setFromCurrency('USD'); setToCurrency('PEN'); setIsCustom(false); setCustomRate('3.75'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              fromCurrency === 'USD' && toCurrency === 'PEN'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            🇺🇸 USD → 🇵🇪 PEN
          </button>
          <button
            type="button"
            onClick={() => { setFromCurrency('MXN'); setToCurrency('PEN'); setIsCustom(false); setCustomRate((3.75/18.50).toFixed(4)); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              fromCurrency === 'MXN' && toCurrency === 'PEN'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            🇲🇽 MXN → 🇵🇪 PEN
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Currency Selectors & Swap */}
          <div className="grid grid-cols-5 gap-2 items-center">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                De (Origen)
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => handleFromChange(e.target.value as Currency)}
                className="w-full py-3 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">🇺🇸 USD — Dólar</option>
                <option value="MXN">🇲🇽 MXN — Peso</option>
                <option value="PEN">🇵🇪 PEN — Sol</option>
              </select>
            </div>

            <div className="col-span-1 flex justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition font-black text-sm shadow-sm"
                title="Invertir monedas"
              >
                ⇄
              </button>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                A (Destino)
              </label>
              <select
                value={toCurrency}
                onChange={(e) => handleToChange(e.target.value as Currency)}
                className="w-full py-3 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">🇺🇸 USD — Dólar</option>
                <option value="MXN">🇲🇽 MXN — Peso</option>
                <option value="PEN">🇵🇪 PEN — Sol</option>
              </select>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto a Convertir ({CURRENCY_INFO[fromCurrency].name})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                {CURRENCY_INFO[fromCurrency].symbol}
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

          {/* Rate Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Tipo de Cambio Aplicable (1 {fromCurrency} = ? {toCurrency})
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold mb-3">
              <button
                type="button"
                onClick={setPresetOfficial}
                className={`py-2.5 px-3 rounded-xl border text-center transition ${
                  !isCustom
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>Tasa Oficial de Referencia</div>
                <div className="text-[10px] font-normal">
                  {fromCurrency === 'USD' && toCurrency === 'MXN' ? 'Banxico FIX / DOF' : fromCurrency === 'USD' && toCurrency === 'PEN' ? 'SUNAT / SBS' : 'Tasa Calculada'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-2.5 px-3 rounded-xl border text-center transition ${
                  isCustom
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>Tasa Personalizada</div>
                <div className="text-[10px] font-normal">Bancaria / Comercial</div>
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                1 {fromCurrency} =
              </span>
              <input
                type="number"
                step="0.0001"
                value={isCustom ? customRate : activeRate < 1 ? activeRate.toFixed(4) : activeRate.toFixed(2)}
                onChange={(e) => {
                  setCustomRate(e.target.value);
                  setIsCustom(true);
                }}
                className="w-full pl-24 pr-16 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-black text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {toCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Result Column */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Total Convertido
            </span>

            <div className="text-4xl sm:text-5xl font-black text-white">
              {CURRENCY_INFO[toCurrency].symbol}{' '}
              {resultado.toLocaleString(toCurrency === 'USD' ? 'en-US' : toCurrency === 'PEN' ? 'es-PE' : 'es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <p className="text-xs text-slate-300">
              {CURRENCY_INFO[fromCurrency].symbol} {numericMonto.toFixed(2)} {fromCurrency} a una tasa de {activeRate.toFixed(4)} {toCurrency} por {fromCurrency}
            </p>

            <div className="pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
              Operación: {numericMonto.toFixed(2)} × {activeRate.toFixed(4)} = {resultado.toFixed(2)} {toCurrency}
            </div>

            {/* Peru specialized prompt if relevant */}
            {(fromCurrency === 'PEN' || toCurrency === 'PEN') && (
              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href="/calculadoras/peru/tipo-de-cambio-sunat"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold underline transition"
                >
                  🇵🇪 ¿Requieres tipo de cambio oficial SUNAT para tributos y aduanas? Ver página oficial SUNAT →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Conversion Equivalences Table */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">
          Tabla de Equivalencias Rápidas ({fromCurrency} a {toCurrency})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {commonAmounts.map((amt) => {
            const converted = amt * activeRate;
            return (
              <div
                key={amt}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center"
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {amt} {fromCurrency}
                </span>
                <span className="font-black text-slate-950 dark:text-white">
                  {converted.toFixed(2)} {toCurrency}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
