'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface HomeInteractiveProps {
  lang: string;
  allCalculators: any[];
}

export default function HomeInteractive({ lang, allCalculators }: HomeInteractiveProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentCalculations, setRecentCalculations] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const favs = JSON.parse(localStorage.getItem('sat_calc_favorites') || '[]');
        setFavoriteIds(favs);
        const hist = JSON.parse(localStorage.getItem('sat_calc_history') || '[]');
        setRecentCalculations(hist.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allCalculators.filter(
      (calc) =>
        calc.title.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.category.toLowerCase().includes(q) ||
        calc.slug.toLowerCase().includes(q)
    );
  }, [allCalculators, searchQuery]);

  return (
    <>
      {/* Instant Search Bar */}
      <div className="mt-8 max-w-xl mx-auto">
        <div className="relative rounded-2xl shadow-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search by name or keyword (e.g., ISR, Net Salary, IVA, Finiquito)...'
                : 'Buscar por nombre o concepto (ej: ISR, Salario Neto, IVA, Finiquito)...'
            }
            aria-label={isEn ? 'Search calculators' : 'Buscar calculadoras'}
            className="w-full pl-6 pr-12 py-3.5 sm:py-4 rounded-2xl border-0 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg select-none">
            🔍
          </div>
        </div>

        {/* Quick Access Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
          <span className="text-blue-200/80 mr-1">{isEn ? 'Frequent Tools:' : 'Accesos Directos:'}</span>
          <Link
            href={`${langPrefix}/calculadoras/nomina/calculadora-salario-neto-bruto`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            Salario Neto
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/sat/calculadora-isr-pf`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            Calculadora ISR
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/sat/calculadora-iva`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            IVA 16% / 8%
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/sat/calculadora-resico-pf`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            RESICO 2026
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/nomina/calculadora-aguinaldo`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            Aguinaldo LFT
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/nomina/calculadora-semanas-cotizadas-imss`}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
          >
            Semanas IMSS
          </Link>
        </div>

        {/* Clear Secondary Country Callout */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-blue-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
          <span>🇵🇪</span>
          <span>
            {isEn ? 'Operating with Peru? ' : '¿Realizas operaciones con Perú? '}
            <a href="#herramientas-peru" className="underline font-bold text-white hover:text-blue-100">
              {isEn ? 'Jump to Peru Module (SUNAT & Labor)' : 'Ver Módulo Especial de Herramientas para Perú ➔'}
            </a>
          </span>
        </div>
      </div>

      {/* Real-Time Search Results (Shown only when typing) */}
      {searchQuery.trim().length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isEn ? 'Search Results' : 'Resultados de Búsqueda'} ({filteredCalculators.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {isEn ? 'Clear search' : 'Limpiar búsqueda'}
            </button>
          </div>

          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`${langPrefix}/calculadoras/${calc.categorySlug}/${calc.slug}`}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {calc.category}
                    </span>
                    <h3 className="font-bold text-base mt-1 text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                      {calc.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 line-clamp-2">
                      {calc.shortDescription}
                    </p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-4 flex items-center gap-1">
                    {isEn ? 'Open calculator ➔' : 'Abrir calculadora ➔'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-sm">
              {isEn
                ? 'No calculators match your query. Try searching for "ISR", "IVA", "Aguinaldo", or "CTS".'
                : 'No se encontraron calculadoras que coincidan con tu término de búsqueda. Prueba con palabras como "ISR", "IVA", "Aguinaldo" o "CTS".'}
            </div>
          )}
        </section>
      )}

      {/* User Dashboard: Favorites & Recent Calculations */}
      {searchQuery.trim().length === 0 && (favoriteIds.length > 0 || recentCalculations.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteIds.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>⭐</span>
                <span>{isEn ? 'Your Favorite Calculators' : 'Tus Calculadoras Favoritas'}</span>
              </h3>
              <div className="space-y-2">
                {allCalculators
                  .filter((c) => favoriteIds.includes(c.id))
                  .map((calc) => (
                    <Link
                      key={calc.id}
                      href={`${langPrefix}/calculadoras/${calc.categorySlug}/${calc.slug}`}
                      className="flex justify-between items-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 hover:bg-blue-50/50 dark:bg-slate-950 dark:hover:bg-slate-850 transition"
                    >
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {calc.title}
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                        {isEn ? 'Calculate ➔' : 'Calcular ➔'}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {recentCalculations.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>📁</span>
                <span>{isEn ? 'Recent Saved Simulations' : 'Cálculos Recientes Guardados'}</span>
              </h3>
              <div className="space-y-2">
                {recentCalculations.map((entry) => {
                  const searchP = new URLSearchParams();
                  Object.entries(entry.inputs || {}).forEach(([k, v]) => searchP.set(k, String(v)));
                  return (
                    <Link
                      key={entry.id}
                      href={`${langPrefix}/calculadoras/${entry.categorySlug}/${entry.calcSlug}?${searchP.toString()}`}
                      className="flex justify-between items-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 hover:bg-blue-50/50 dark:bg-slate-950 dark:hover:bg-slate-850 transition"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {entry.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {new Date(entry.timestamp).toLocaleDateString(isEn ? 'en-US' : 'es-MX')} •{' '}
                          {entry.results?.[entry.results.length - 1]?.formatted || ''}
                        </div>
                      </div>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                        {isEn ? 'Resume ➔' : 'Reanudar ➔'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
