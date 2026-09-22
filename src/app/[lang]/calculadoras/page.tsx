import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators } from '@/calculators';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const seoAlternates = getSeoAlternates('calculadoras', lang);

  const title = isEn
    ? 'All Financial, Tax & Labor Calculators 2026 | Calculadora SAT'
    : 'Directorio de Calculadoras Fiscales y Laborales 2026 | Calculadora SAT';
  const description = isEn
    ? 'Comprehensive directory of simulators for Mexico: SAT (ISR, VAT, RESICO), LFT & IMSS payroll, personal finance, plus dedicated tools for Peru (SUNAT).'
    : 'Directorio completo de simuladores oficiales para México: impuestos SAT (ISR, IVA, RESICO), nómina LFT e IMSS, finanzas personales, y sección dedicada para Perú.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      type: 'website',
    },
  };
}

export default async function CalculadorasIndexPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  // Mexican primary categories
  const categoriesMexico = [
    {
      id: 'sat',
      name: isEn ? 'Federal Taxes (SAT Mexico)' : 'Impuestos Federales (SAT)',
      desc: isEn ? 'Simulate income tax (ISR), value-added tax (VAT / IVA 16% & 8%), and official UMA conversions.' : 'Cálculo del ISR para personas físicas y morales, IVA general y fronterizo, conversor de UMA y recargos fiscales.',
      icon: '🏛️',
      slug: 'sat',
    },
    {
      id: 'nomina',
      name: isEn ? 'Payroll & Labor Law (LFT / IMSS)' : 'Nómina y Prestaciones de Ley (LFT / IMSS)',
      desc: isEn ? 'Calculate net salary, IMSS worker quotas, severance (finiquito/liquidación), vacations, and year-end bonuses.' : 'Simula salario neto vs bruto, aguinaldo, vacaciones dignas, finiquito, liquidación de 3 meses y cuotas IMSS.',
      icon: '💼',
      slug: 'nomina',
    },
    {
      id: 'resico',
      name: isEn ? 'Simplified Trust Regime (RESICO)' : 'Régimen Simplificado de Confianza (RESICO)',
      desc: isEn ? 'Preferential progressive brackets from 1% to 2.5% and comparison against standard business activity regime.' : 'Simuladores con tasas reducidas del 1% al 2.5% y comparador directo contra el régimen general de personas físicas.',
      icon: '🌱',
      slug: 'resico',
    },
    {
      id: 'finanzas-personales',
      name: isEn ? 'Personal Finance & Investments' : 'Finanzas Personales, Créditos e Inversiones',
      desc: isEn ? 'CETES Directo yields, mortgage amortization, compound interest growth, and 50/30/20 budgeting.' : 'Rendimientos de CETES a plazo fijo, crédito hipotecario, interés compuesto, afore y regla 50/30/20.',
      icon: '🪙',
      slug: 'finanzas-personales',
    },
    {
      id: 'negocios',
      name: isEn ? 'Business & Cost Accounting' : 'Costos, Negocios y Contabilidad',
      desc: isEn ? 'Break-even point analysis and straight-line tax depreciation for tangible business assets.' : 'Punto de equilibrio para fijación de precios y deducción de inversiones en activos fijos.',
      icon: '🏢',
      slug: 'negocios',
    },
  ];

  // Map active calculators into groups
  const mexicoCalculators = calculators.filter((c) => c.categorySlug !== 'peru');
  const peruCalculators = calculators.filter((c) => c.categorySlug === 'peru');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/15 uppercase tracking-wider mb-4">
            <span>🇲🇽</span>
            <span>{isEn ? 'Primary Portal: Mexico' : 'Portal Principal: México'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Calculator Directory' : 'Directorio de Calculadoras'}
          </h1>
          <p className="mt-3 text-blue-100/90 max-w-2xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Browse our complete catalog of computational tools for tax compliance, statutory labor benefits, and financial projections in Mexico, plus our dedicated regional portal for Peru.'
              : 'Explora nuestro catálogo integral de herramientas para el cálculo de impuestos, nómina, prestaciones conforme a la LFT y planeación financiera en México, con un módulo dedicado para Perú.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-14">
        {/* Navigation Breadcrumb */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href={langPrefix || '/'} className="hover:text-blue-600 transition-colors">
            {isEn ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Calculators' : 'Calculadoras'}
          </span>
        </nav>

        {/* Section 1: Mexico Core Categories */}
        <div className="space-y-10">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              🇲🇽 {isEn ? 'Primary Market' : 'Mercado Principal'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              {isEn ? 'Mexican Tax & Labor Suites' : 'Herramientas de México (SAT, LFT e IMSS)'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {isEn
                ? 'Select a category to view specialized calculators with official 2026 legal references and parameters.'
                : 'Selecciona una categoría para explorar los simuladores ajustados a las disposiciones fiscales y laborales vigentes en México.'}
            </p>
          </div>

          {categoriesMexico.map((cat) => {
            const catCalcs = mexicoCalculators.filter((c) => c.categorySlug === cat.slug);
            return (
              <section key={cat.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cat.desc}</p>
                    </div>
                  </div>
                  <Link
                    href={`${langPrefix}/calculadoras/${cat.slug}`}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    {isEn ? 'View category hub ➔' : 'Ver centro de categoría ➔'}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catCalcs.map((calc) => {
                    const trans = isEn ? calc.translations?.en : null;
                    return (
                      <Link
                        key={calc.id}
                        href={`${langPrefix}/calculadoras/${calc.categorySlug}/${calc.slug}`}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition flex flex-col justify-between group"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {calc.category}
                          </span>
                          <h4 className="text-base font-bold mt-1 text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {trans?.title || calc.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                            {trans?.shortDescription || calc.shortDescription}
                          </p>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-4 flex items-center justify-between">
                          <span>{isEn ? 'Calculate' : 'Calcular'}</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Section 2: Dedicated Peru Suite */}
        <section className="bg-gradient-to-r from-red-600/5 via-slate-100 to-red-600/5 dark:from-red-950/20 dark:via-slate-900 dark:to-red-950/20 p-6 sm:p-8 rounded-3xl border border-red-200/80 dark:border-red-900/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-4xl">🇵🇪</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  {isEn ? 'Secondary Market Portal • Peru' : 'Módulo Regional • Perú'}
                </span>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {isEn ? 'Official Peru Calculators (SUNAT & Labor)' : 'Calculadoras de Perú (SUNAT y Régimen Laboral)'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  {isEn
                    ? 'Dedicated calculators compliant with Peruvian statutes: IGV 18%, CTS, Gratifications (July/Dec), 5th Category Income Tax, and official SUNAT daily exchange rates.'
                    : 'Herramientas conformes con la legislación tributaria y laboral peruana: IGV 18%, Compensación por Tiempo de Servicios (CTS), Gratificaciones legales y Renta de 5ta Categoría.'}
                </p>
              </div>
            </div>
            <Link
              href="/peru"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition whitespace-nowrap self-start sm:self-auto"
            >
              {isEn ? 'Enter Peru Portal ➔' : 'Ir al Portal Perú ➔'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {peruCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculadoras/peru/${calc.slug}`}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 hover:border-red-400 dark:hover:border-red-600 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    SUNAT / Perú
                  </span>
                  <h4 className="text-base font-bold mt-1 text-slate-950 dark:text-white group-hover:text-red-600 transition">
                    {calc.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {calc.shortDescription}
                  </p>
                </div>
                <span className="text-red-600 dark:text-red-400 text-xs font-bold mt-4 flex items-center justify-between">
                  <span>{isEn ? 'Open Tool' : 'Abrir Herramienta'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
