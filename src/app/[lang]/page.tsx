'use client';

import React, { useState, use, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { calculators } from '../../calculators';
import dynamic from 'next/dynamic';
const AIAssistant = dynamic(() => import('../../components/AI/AIAssistant'), {
  ssr: false,
});
import esDict from '../../dictionaries/es.json';
import enDict from '../../dictionaries/en.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const dict = lang === 'en' ? enDict : esDict;
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

  const localizedCalculators = useMemo(() => {
    return calculators.map((calc) => {
      if (isEn && calc.translations?.en) {
        const trans = calc.translations.en;
        return {
          ...calc,
          title: trans.title || calc.title,
          shortDescription: trans.shortDescription || calc.shortDescription,
          category: trans.category || calc.category,
        };
      }
      return calc;
    });
  }, [isEn]);

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return localizedCalculators.filter(
      (calc) =>
        calc.title.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.category.toLowerCase().includes(q) ||
        calc.slug.toLowerCase().includes(q)
    );
  }, [localizedCalculators, searchQuery]);

  // Curated High-Traffic Mexico Core Calculators
  const mexicoTopCalculators = useMemo(() => [
    {
      title: isEn ? 'Personal Income Tax (ISR)' : 'Calculadora de ISR Personas Físicas',
      desc: isEn ? 'Progressive Art. 96 & 152 LISR tables for salaried and business income.' : 'Calcula el impuesto a retener según las tarifas del Art. 96 y 152 de la LISR.',
      badge: isEn ? 'Income Tax • Art. 96 LISR' : 'Tarifas Art. 96 y 152 LISR',
      href: `${langPrefix}/calculadoras/sat/calculadora-isr`,
      icon: '🏛️',
    },
    {
      title: isEn ? 'Net vs. Gross Salary Calculator' : 'Calculadora de Salario Neto vs. Bruto',
      desc: isEn ? 'Accurate itemization of employee IMSS quota and ISR tax withholdings.' : 'Desglose exacto de retención de ISR y cuota obrera del IMSS sobre tu sueldo.',
      badge: isEn ? 'Payroll • IMSS & ISR' : 'Nómina • Retenciones IMSS e ISR',
      href: `${langPrefix}/calculadoras/nomina/calculadora-salario-neto`,
      icon: '💵',
    },
    {
      title: isEn ? 'VAT Calculator (IVA 16% & 8%)' : 'Calculadora de IVA (16% y 8%)',
      desc: isEn ? 'Add or break down standard 16% VAT or 8% Northern Border zone tax.' : 'Agrega o desglosa el 16% de IVA general o la tasa fronteriza del 8% para CFDI 4.0.',
      badge: isEn ? 'VAT • Ley del IVA' : 'General 16% y Fronterizo 8%',
      href: `${langPrefix}/calculadoras/sat/calculadora-iva`,
      icon: '🧾',
    },
    {
      title: isEn ? 'RESICO Calculator (Individuals)' : 'Calculadora RESICO Personas Físicas',
      desc: isEn ? 'Reduced progressive rates from 1% to 2.5% on cash-basis gross revenue.' : 'Aplica las tasas preferenciales del 1% al 2.5% para el Régimen Simplificado.',
      badge: isEn ? 'Simplified Regime (1% - 2.5%)' : 'Tasas reducidas del 1% al 2.5%',
      href: `${langPrefix}/calculadoras/sat/calculadora-resico-pf`,
      icon: '🌱',
    },
    {
      title: isEn ? 'Year-End Bonus (Aguinaldo)' : 'Calculadora de Aguinaldo',
      desc: isEn ? 'Statutory 15 days of salary with the 30-UMA tax-exempt allowance.' : 'Cálculo de 15 días de salario con parte exenta de 30 UMAs conforme al Art. 87 LFT.',
      badge: isEn ? 'Art. 87 LFT • 30 UMA Exempt' : 'Art. 87 LFT • 30 UMAs Exentas',
      href: `${langPrefix}/calculadoras/nomina/calculadora-aguinaldo`,
      icon: '🎁',
    },
    {
      title: isEn ? 'Severance & Settlement (Finiquito)' : 'Calculadora de Finiquito y Liquidación',
      desc: isEn ? 'Constitutional 90 days, 20 days per year, and seniority premium under LFT.' : 'Simula indemnización constitucional, 20 días por año y prima de antigüedad.',
      badge: isEn ? 'Labor Law • Art. 48 & 50 LFT' : 'Art. 47, 48 y 50 LFT',
      href: `${langPrefix}/calculadoras/nomina/calculadora-finiquito`,
      icon: '⚖️',
    },
    {
      title: isEn ? 'IMSS Quoted Weeks & Pension' : 'Semanas Cotizadas IMSS y Pensión',
      desc: isEn ? 'Estimate qualifying weeks and retirement pension under Ley 73 and Ley 97.' : 'Estima tus semanas acumuladas en el IMSS y proyecta tu pensión Ley 73 o Ley 97.',
      badge: isEn ? 'Social Security • Ley 73 / 97' : 'Seguridad Social • Ley 73 / 97',
      href: `${langPrefix}/semanas-cotizadas-imss`,
      icon: '📋',
    },
    {
      title: isEn ? 'CETES Directo Investment Yield' : 'Calculadora de CETES Directo',
      desc: isEn ? 'Gross and net returns across 28, 91, 182, and 364 days with provisional tax.' : 'Proyecta tus rendimientos brutos y netos a 28, 91, 182 y 364 días con retención ISR.',
      badge: isEn ? 'Treasury Bills • Fixed Income' : 'Renta Fija Gubernamental',
      href: `${langPrefix}/calculadoras/inversiones/calculadora-cetes-directo`,
      icon: '📈',
    },
  ], [isEn, langPrefix]);

  // Segregated Peru Tools Suite
  const peruTools = useMemo(() => [
    {
      title: isEn ? 'Peru IGV Calculator (18%)' : 'Calculadora de IGV Perú (18%)',
      desc: isEn ? 'Break down or add 18% (16% IGV + 2% IPM) for SUNAT electronic receipts.' : 'Agrega o desglosa el 18% del Impuesto General a las Ventas para comprobantes SUNAT.',
      badge: 'D.S. N° 055-99-EF • 18%',
      href: `${langPrefix}/calculadora-igv-peru`,
      icon: '🇵🇪',
    },
    {
      title: isEn ? 'Official SUNAT Exchange Rate' : 'Tipo de Cambio SUNAT',
      desc: isEn ? 'Official daily USD/PEN rate published by SUNAT/SBS for accounting and taxes.' : 'Cotización tributaria oficial de compra y venta aplicable a facturación y PDT.',
      badge: isEn ? 'Official SBS/SUNAT Rate' : 'Cotización Oficial SBS / SUNAT',
      href: `${langPrefix}/tipo-de-cambio-sunat`,
      icon: '💱',
    },
    {
      title: isEn ? 'Peru CTS Calculator' : 'Calculadora de CTS Perú',
      desc: isEn ? 'Statutory severance reserve deposit for May and November periods.' : 'Compensación por Tiempo de Servicios con la sexta parte de la gratificación computable.',
      badge: 'D.S. N° 001-97-TR',
      href: `${langPrefix}/calculadora-cts-peru`,
      icon: '🏦',
    },
    {
      title: isEn ? 'Peru Gratification Calculator' : 'Calculadora de Gratificación',
      desc: isEn ? 'July & December bonuses plus 9% EsSalud or 6.75% EPS extraordinary bonus.' : 'Fiestas Patrias y Navidad con Bonificación Extraordinaria de EsSalud (9%) o EPS.',
      badge: 'Ley N° 27735 & Ley N° 30334',
      href: `${langPrefix}/calculadora-gratificacion-peru`,
      icon: '🎁',
    },
    {
      title: isEn ? '5th Category Income Tax' : 'Renta de 5ta Categoría 2026',
      desc: isEn ? 'Progressive brackets (8% to 30%) with automatic 7 UIT deduction (S/ 5,350).' : 'Retención de planilla dependiente con deducción de 7 UIT (UIT 2026: S/ 5,350).',
      badge: 'D.S. N° 179-2004-EF • 7 UIT',
      href: `${langPrefix}/calculadora-quinta-categoria-peru`,
      icon: '📑',
    },
    {
      title: isEn ? 'SUNAT RUC Number Validator' : 'Validador de RUC SUNAT',
      desc: isEn ? '11-digit Modulo 11 check digit verification and link to official SUNAT lookup.' : 'Comprueba la sintaxis de 11 dígitos y el dígito verificador Módulo 11.',
      badge: isEn ? 'Modulo 11 Algorithm' : 'Algoritmo Módulo 11 SUNAT',
      href: `${langPrefix}/consulta-ruc-sunat`,
      icon: '🔍',
    },
  ], [isEn, langPrefix]);

  const categories = useMemo(() => [
    { name: isEn ? 'Federal Taxes (SAT)' : 'Impuestos Federales (SAT)', slug: 'sat', icon: '🏛️', desc: isEn ? 'ISR, VAT, RESICO and withholding taxes' : 'ISR, IVA, RESICO y retenciones fiscales' },
    { name: isEn ? 'Payroll & Labor (LFT)' : 'Nómina y Prestaciones (LFT)', slug: 'nomina', icon: '💼', desc: isEn ? 'Net salary, bonuses, severance, and vacation' : 'Salario neto, aguinaldo, finiquito y vacaciones' },
    { name: isEn ? 'Social Security (IMSS)' : 'Seguridad Social (IMSS)', slug: 'nomina', icon: '📋', desc: isEn ? 'Quoted weeks and pension estimation' : 'Semanas cotizadas y pensión Ley 73 / 97' },
    { name: isEn ? 'Investments & Treasury' : 'Inversiones y CETES', slug: 'inversiones', icon: '📈', desc: isEn ? 'Fixed income yields and government debt' : 'Rendimientos de CETES y renta fija' },
    { name: isEn ? 'Mortgages & Real Estate' : 'Hipotecas y Créditos', slug: 'hipotecas', icon: '🏠', desc: isEn ? 'Amortization schedules and home loans' : 'Simulación de amortización y crédito hipotecario' },
    { name: isEn ? 'Personal Finance' : 'Finanzas Personales', slug: 'finanzas-personales', icon: '🪙', desc: isEn ? 'Compound interest and retirement savings' : 'Interés compuesto, regla 50/30/20 y ahorro' },
    { name: isEn ? 'Exchange Rates & Currencies' : 'Divisas y Conversiones', slug: 'conversiones', icon: '💱', desc: isEn ? 'Official FIX and interbank currencies' : 'Tipo de cambio FIX DOF y conversión de monedas' },
    { name: isEn ? 'Peru Suite (SUNAT)' : 'Herramientas Perú (SUNAT)', slug: 'peru', icon: '🇵🇪', desc: isEn ? 'IGV 18%, CTS, Gratifications, and SUNAT rates' : 'IGV 18%, CTS, gratificaciones y divisas en soles' },
  ], [isEn]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <Header lang={lang} />

      {/* Hero Section: Clear Identity & Country Audience */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900 text-white py-16 sm:py-24 border-b border-blue-900/40">
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/15 uppercase tracking-wider mb-5">
            <span>🇲🇽</span>
            <span>{isEn ? 'Tax & Labor Platform • Mexico 2026' : 'Cálculo Fiscal y Laboral • Normativa México 2026'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {isEn ? 'Mexican Tax & Labor Calculators' : 'Calculadoras Fiscales y Laborales de México'}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-blue-100/90 max-w-3xl mx-auto font-medium leading-relaxed">
            {isEn
              ? 'Free, reliable computational tools for salaried workers, independent professionals (honorarios), RESICO taxpayers, HR, and small businesses in Mexico. Accurately simulate income tax withholdings, IMSS social security quotas, VAT breakdowns, and statutory severance under current legislation.'
              : 'Herramientas de cálculo gratuitas y transparentes para trabajadores asalariados, profesionistas independientes (honorarios), contribuyentes del RESICO, contadores y microempresas en México. Simula retenciones de ISR, cuotas IMSS, desgloses de IVA y liquidaciones conforme al marco legal vigente.'}
          </p>

          {/* Instant Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative rounded-2xl shadow-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? 'Search by name or keyword (e.g., ISR, Net Salary, IVA, Finiquito, CTS Peru)...' : 'Buscar por nombre o concepto (ej: ISR, Salario Neto, IVA, Finiquito, CTS Perú)...'}
                className="w-full pl-6 pr-12 py-3.5 sm:py-4 rounded-2xl border-0 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base shadow-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </div>
            </div>

            {/* Quick Access Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <span className="text-blue-200/80 mr-1">{isEn ? 'Frequent Tools:' : 'Accesos Directos:'}</span>
              <Link href={`${langPrefix}/calculadoras/nomina/calculadora-salario-neto`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
                Salario Neto
              </Link>
              <Link href={`${langPrefix}/calculadoras/sat/calculadora-isr`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
                Calculadora ISR
              </Link>
              <Link href={`${langPrefix}/calculadoras/sat/calculadora-iva`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
                IVA 16% / 8%
              </Link>
              <Link href={`${langPrefix}/calculadoras/sat/calculadora-resico-pf`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
                RESICO 2026
              </Link>
              <Link href={`${langPrefix}/calculadoras/nomina/calculadora-aguinaldo`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
                Aguinaldo LFT
              </Link>
              <Link href={`${langPrefix}/semanas-cotizadas-imss`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/15">
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
        </div>
      </section>

      {/* Main Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* 1. Real-Time Search Results (Only shown when user types) */}
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
                {isEn ? 'No calculators match your query. Try searching for "ISR", "IVA", "Aguinaldo", or "CTS".' : 'No se encontraron calculadoras que coincidan con tu término de búsqueda. Prueba con palabras como "ISR", "IVA", "Aguinaldo" o "CTS".'}
              </div>
            )}
          </section>
        )}

        {/* 2. User Dashboard: Favorites & Recent Calculations */}
        {searchQuery.trim().length === 0 && (favoriteIds.length > 0 || recentCalculations.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteIds.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  <span>{isEn ? 'Your Favorite Calculators' : 'Tus Calculadoras Favoritas'}</span>
                </h3>
                <div className="space-y-2">
                  {localizedCalculators
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
                            {new Date(entry.timestamp).toLocaleDateString(isEn ? 'en-US' : 'es-MX')} • {entry.results?.[entry.results.length - 1]?.formatted || ''}
                          </div>
                        </div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                          {isEn ? 'Reopen ➔' : 'Abrir ➔'}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 3. Value Proposition: Why This Platform Exists & What Makes Tools Useful */}
        {searchQuery.trim().length === 0 && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {isEn ? 'Transparent Financial Logic' : 'Lógica Fiscal y Laboral Transparente'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                {isEn ? 'Why We Built Calculadora SAT and What Makes It Useful' : '¿Por Qué Existe Esta Plataforma y Qué Hace Útiles a Nuestras Herramientas?'}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed">
                {isEn
                  ? 'Mexican tax codes (such as progressive ISR brackets under Article 96 of the LISR) and mandatory labor benefits (such as Vacaciones Dignas, aguinaldo, and severance formulas under the LFT) are mathematically intricate. Deciphering these rules directly from statutory gazettes is tedious and error-prone. Our platform translates statutory laws into open, client-side algorithms that anyone can audit and simulate in seconds.'
                  : 'El marco tributario y laboral mexicano —como las tablas progresivas de ISR del Artículo 96 de la LISR, las cuotas tripartitas del IMSS o la reforma de Vacaciones Dignas en la LFT— contiene fórmulas aritméticas complejas. Interpretar estas reglas a partir de los textos legales crudos suele ser confuso. Esta plataforma traduce los decretos oficiales en algoritmos abiertos, rápidos y comprensibles para que trabajadores, profesionistas y empresas verifiquen sus finanzas sin depender de conjeturas.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="text-2xl">🔒</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isEn ? 'Total Device Privacy' : 'Privacidad Total en Tu Dispositivo'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isEn ? 'Calculations execute locally in your browser. Your salary and financial data never leave your device.' : 'Los cálculos se ejecutan en tu navegador. Tus ingresos o cifras financieras jamás se transmiten ni guardan en servidores externos.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="text-2xl">📐</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isEn ? 'Step-by-Step Breakdown' : 'Fórmulas y Pasos Transparentes'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isEn ? 'No black-box guesses. We display lower limit, marginal excess, tax bracket, and fixed quota line-by-line.' : 'Sin cálculos opacos. Te mostramos el límite inferior, excedente imponible, cuota fija y tasa marginal paso a paso.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="text-2xl">⚖️</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isEn ? 'Statutory Legal Citations' : 'Fundamento Normativo Real'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isEn ? 'Every simulator explicitly cites applicable articles from the LISR, LFT, LSS, and official government gazettes.' : 'Cada calculadora cita puntualmente los artículos aplicables de la LISR, LFT, Ley del IMSS y Resoluciones Misceláneas.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="text-2xl">💡</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isEn ? 'Realistic Worked Examples' : 'Ejemplos con Números Reales'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isEn ? 'Tools include realistic numerical cases and official 2026 UMA/minimum wage benchmarks to compare results.' : 'Incluimos casos numéricos resueltos con valores oficiales de UMA y salarios mínimos para contrastar tus recibos.'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Curated Popular Calculators for Mexico (8 Essential Tools) */}
        {searchQuery.trim().length === 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {isEn ? 'Core Mexican Tools' : 'Herramientas Fundamentales de México'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                  {isEn ? 'Most Utilized Tax & Payroll Calculators' : 'Calculadoras Más Utilizadas en México'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {isEn ? 'Direct access to the 8 primary simulators for tax planning, payroll verification, and labor calculations.' : 'Acceso directo a los 8 simuladores de mayor demanda para nómina, declaraciones fiscales y prestaciones de ley.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mexicoTopCalculators.map((calc, idx) => (
                <Link
                  key={idx}
                  href={calc.href}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{calc.icon}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
                        {calc.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition">
                      {calc.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {calc.desc}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 flex items-center gap-1">
                    {isEn ? 'Open calculator ➔' : 'Abrir simulador ➔'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. Clearly Separated Peru Suite (Herramientas para Perú - SUNAT) */}
        {searchQuery.trim().length === 0 && (
          <section
            id="herramientas-peru"
            className="scroll-mt-20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-lg space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                  <span>🇵🇪</span>
                  <span>{isEn ? 'Segregated Module • Peru Jurisdiction' : 'Módulo Independiente • Marco Legal Perú'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isEn ? 'Peru Tax, Labor & Currency Suite (SUNAT)' : 'Herramientas Tributarias y Laborales de Perú (SUNAT)'}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  {isEn
                    ? 'Dedicated calculators adhering strictly to Peruvian statutory decrees (D.S. N° 055-99-EF for 18% IGV, D.S. N° 001-97-TR for CTS, Ley N° 27735 for Gratifications, and SUNAT 5th Category withholding tables).'
                    : 'Simuladores adaptados con rigor a la normativa peruana (D.S. N° 055-99-EF para IGV 18%, D.S. N° 001-97-TR para CTS, Ley N° 27735 para Gratificaciones y tramos oficiales de Renta de 5ta Categoría de la SUNAT).'}
                </p>
              </div>
              <Link
                href={`${langPrefix}/calculadoras/peru`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shrink-0 whitespace-nowrap shadow-md text-center"
              >
                {isEn ? 'View Full Peru Section ➔' : 'Ver Categoría Perú Completa ➔'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {peruTools.map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.href}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-950 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{tool.icon}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 mt-4 flex items-center gap-1">
                    {isEn ? 'Calculate ➔' : 'Calcular ➔'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. Browse by Category */}
        {searchQuery.trim().length === 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {isEn ? 'Directory Navigation' : 'Exploración Estructurada'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                {isEn ? 'Browse by Subject Area' : 'Explorar por Área Temática'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {isEn ? 'Select a domain to inspect all specialized calculation models.' : 'Selecciona una categoría para acceder a las herramientas correspondientes.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`${langPrefix}/calculadoras/${cat.slug}`}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-3xl mb-2 block">{cat.icon}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {cat.desc}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-3 flex items-center gap-1">
                    {isEn ? 'Browse tools ➔' : 'Ver herramientas ➔'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 7. Methodology & Formula Maintenance Transparency */}
        {searchQuery.trim().length === 0 && (
          <section className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {isEn ? 'How Rates & Legal Formulas Are Maintained' : 'Metodología de Mantenimiento y Actualización de Parámetros'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEn ? 'Continuous statutory synchronization against official publications' : 'Monitoreo normativo continuo contra publicaciones oficiales'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                ✓ {isEn ? 'Last Technical Audit: February 2026' : 'Última auditoría técnica: Febrero 2026'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
                <strong className="text-slate-900 dark:text-white block mb-1">1. Diario Oficial de la Federación (DOF):</strong>
                {isEn
                  ? 'We track federal tax decrees, the annual Resolución Miscelánea Fiscal (RMF), and official Annex 8 tables for progressive ISR brackets.'
                  : 'Monitoreamos las publicaciones de la RMF y el CFF para sincronizar las tarifas progresivas del ISR (Art. 96 y 152 LISR).'}
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
                <strong className="text-slate-900 dark:text-white block mb-1">2. INEGI, CONASAMI e IMSS:</strong>
                {isEn
                  ? 'UMA indexes are refreshed each January (effective Feb 1), minimum wages are audited per zone (General/ZLFN), and social security contribution limits (25 UMAs) are kept compliant.'
                  : 'El valor de la UMA se actualiza cada enero con vigor en febrero, los salarios mínimos conforme a la CONASAMI y topes de cotización IMSS a 25 UMAs.'}
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
                <strong className="text-slate-900 dark:text-white block mb-1">3. El Peruano y SUNAT:</strong>
                {isEn
                  ? 'Annual UIT decree revisions and SBS currency closing rates are systematically programmed into our Peruvian calculators.'
                  : 'Incorporamos el valor de la UIT decretado por el MEF y las disposiciones tributarias de la SUNAT para 5ta categoría y comprobantes electrónicos.'}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p>
                {isEn
                  ? 'Notice an outdated figure or parameter? Email our developers directly at '
                  : '¿Detectas un parámetro por ajustar o cambio legal reciente? Escríbenos a '}
                <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  hello@calculadorasat.org
                </a>
              </p>
              <Link href={`${langPrefix}/about`} className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0">
                {isEn ? 'Read full methodology ➔' : 'Leer metodología completa ➔'}
              </Link>
            </div>
          </section>
        )}

        {/* 8. Educational Guides & Trust Notice */}
        {searchQuery.trim().length === 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Educational Resources */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {isEn ? 'Knowledge Base' : 'Guías y Recursos Educativos'}
                </span>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1 mb-4">
                  {isEn ? 'In-Depth Guides & Practical Tools' : 'Guías Prácticas y Documentación Fiscal'}
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`${langPrefix}/blog/deducciones-personales-sat-2026-guia-y-limites`}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition flex items-start gap-3 group"
                  >
                    <span className="text-xl">📘</span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                        {isEn ? 'Personal Tax Deductions Guide 2026 (Article 151 LISR)' : 'Guía de Deducciones Personales SAT 2026 (Art. 151 LISR)'}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isEn ? 'Limits, caps (5 UMAs vs 15%), and tuition deduction charts.' : 'Topes anuales (5 UMAs vs 15%), colegiaturas y gastos médicos deducibles.'}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`${langPrefix}/calendario-fiscal`}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition flex items-start gap-3 group"
                  >
                    <span className="text-xl">📅</span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                        {isEn ? 'Official Fiscal Calendar 2026' : 'Calendario Fiscal 2026 (SAT y Declaraciones)'}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isEn ? 'Deadlines for monthly provisional returns and annual tax filings.' : 'Fechas límite para pagos provisionales del día 17 y declaración anual.'}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`${langPrefix}/formatos`}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition flex items-start gap-3 group"
                  >
                    <span className="text-xl">📑</span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                        {isEn ? 'Downloadable HR & Payroll Templates' : 'Formatos de Recursos Humanos y Nómina'}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isEn ? 'Standard settlement receipts, vacation requests, and salary receipts.' : 'Plantillas de finiquito, solicitud de vacaciones y recibos de pago.'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Non-Affiliation & Legal Notice Box */}
            <div className="md:col-span-5 bg-amber-50/80 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm mb-2">
                  <span>⚖️</span>
                  <span>{isEn ? 'Informational & Non-Affiliation Notice' : 'Deslinde de Responsabilidad y No Afiliación'}</span>
                </div>
                <div className="text-xs text-amber-950/80 dark:text-amber-200/80 leading-relaxed space-y-2">
                  {isEn ? (
                    <>
                      <p>
                        Calculadora SAT is an independent financial education portal. It is <strong>NOT affiliated with, authorized, or endorsed by</strong> the Servicio de Administración Tributaria (SAT) of Mexico, IMSS, nor SUNAT of Peru.
                      </p>
                      <p>
                        All results provided by our tools are mathematical simulations for planning and educational estimation. They do not constitute formal tax, legal, or accounting advice. Always consult a certified public accountant or licensed labor lawyer before submitting returns or executing payments.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Calculadora SAT es un portal tecnológico de divulgación e información financiera independiente. <strong>NO tiene afiliación, patrocinio ni respaldo oficial</strong> del Servicio de Administración Tributaria (SAT) de México, del IMSS ni de la SUNAT de Perú.
                      </p>
                      <p>
                        Los resultados generados son simulaciones numéricas con fines de orientación y planeación. No sustituyen la asesoría profesional de un contador público certificado o abogado laboralista.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200/80 dark:border-amber-900/50 flex items-center justify-between text-xs">
                <Link href={`${langPrefix}/disclaimer`} className="text-amber-900 dark:text-amber-300 font-bold underline hover:opacity-80">
                  {isEn ? 'Read full disclaimer ➔' : 'Ver aviso legal completo ➔'}
                </Link>
                <Link href={`${langPrefix}/about`} className="text-amber-900 dark:text-amber-300 font-bold underline hover:opacity-80">
                  {isEn ? 'About us ➔' : 'Acerca de nosotros ➔'}
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* AI Assistant Callout */}
        <section className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 bg-white/15 text-violet-200 rounded-full text-xs font-semibold uppercase tracking-wider">
              {dict.ai_callout.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {dict.ai_callout.title}
            </h3>
            <p className="text-violet-100/90 text-xs sm:text-sm max-w-xl">
              {dict.ai_callout.desc}
            </p>
          </div>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-ai-assistant'));
              }
            }}
            className="px-6 py-3 bg-white text-indigo-700 hover:bg-slate-100 transition rounded-xl font-bold text-sm shadow-md whitespace-nowrap shrink-0"
          >
            {dict.ai_callout.button}
          </button>
        </section>

      </main>

      <Footer lang={lang} />
      <AIAssistant />
    </div>
  );
}
