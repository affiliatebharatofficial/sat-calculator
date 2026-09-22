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
  const seoAlternates = getSeoAlternates('peru/calculadoras', lang);

  const title = isEn
    ? 'Peru Calculators Directory 2026: IGV, CTS, Gratificación & SUNAT'
    : 'Directorio de Calculadoras de Perú 2026 | SUNAT, IGV, CTS y Gratificaciones';
  const description = isEn
    ? 'Full list of computational simulators for Peru: calculate 18% IGV, semiannual CTS, July & December gratifications, 5th category tax, and official SUNAT daily exchange rates.'
    : 'Catálogo de calculadoras para Perú: calcula el 18% de IGV, CTS de mayo y noviembre, gratificaciones de Fiestas Patrias y Navidad, retenciones de 5ta categoría y cotización SUNAT.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT — Perú',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function PeruCalculadorasPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  const peruCalcs = calculators.filter((c) => c.categorySlug === 'peru');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-red-700 via-red-800 to-slate-950 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-red-100 border border-white/20 uppercase tracking-wider mb-4">
            <span>🇵🇪</span>
            <span>{isEn ? 'Peru Module' : 'Módulo Especializado Perú'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Peru Calculators Directory' : 'Directorio de Calculadoras de Perú'}
          </h1>
          <p className="mt-3 text-red-100/90 max-w-2xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Access all dedicated simulators for Peruvian taxation (SUNAT) and statutory labor benefits (MTPE).'
              : 'Accede a todos los simuladores diseñados bajo el marco tributario de SUNAT y la legislación laboral del Perú.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-8">
        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href="/peru" className="hover:text-red-600 transition-colors">
            {isEn ? 'Peru Portal' : 'Portal Perú'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Calculators' : 'Calculadoras'}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peruCalcs.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculadoras/peru/${calc.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-red-500 dark:hover:border-red-500 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  SUNAT / MTPE Perú
                </span>
                <h3 className="text-lg font-bold mt-1 text-slate-950 dark:text-white group-hover:text-red-600 transition">
                  {calc.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                  {calc.shortDescription}
                </p>
              </div>
              <span className="text-red-600 dark:text-red-400 text-xs font-bold mt-5 flex items-center justify-between">
                <span>{isEn ? 'Open Calculator' : 'Abrir Calculadora'}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Return to Mexico Notice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="text-2xl">🇲🇽</span>
            <span>
              {isEn
                ? 'Looking for Mexican tax or payroll calculators (SAT, ISR, IMSS)?'
                : '¿Buscas calculadoras tributarias o de nómina para México (SAT, ISR, IMSS)?'}
            </span>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition shrink-0"
          >
            {isEn ? 'Go to Mexico Portal ➔' : 'Ir al Portal México ➔'}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
