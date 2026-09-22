import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoAlternates } from '@/lib/seo';
import { CALCULATOR_UPDATES } from '@/data/calculatorUpdates';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const seoAlternates = getSeoAlternates('actualizaciones', lang);

  const title = isEn
    ? 'Calculator Update History & Audit Trail | Calculadora SAT'
    : 'Historial de Actualizaciones y Auditoría de Parámetros | Calculadora SAT';

  const description = isEn
    ? 'Verified audit log of parameter updates, annual tax bracket reviews, inflation adjustments, and statutory amendments across CalculadoraSAT.org.'
    : 'Registro de auditoría y bitácora de cambios: calibración de tarifas de ISR 2026, actualización de la UMA del INEGI, salarios mínimos y reformas de la LFT.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: isEn ? 'en_US' : 'es_MX',
      type: 'article',
    },
  };
}

export default async function ActualizacionesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: `https://www.calculadorasat.org${langPrefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Updates' : 'Actualizaciones', item: 'https://www.calculadorasat.org/actualizaciones' },
    ],
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header lang={lang} />

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 uppercase tracking-widest mb-4 border border-indigo-400/30">
            🔄 {isEn ? 'Audit Trail & Transparency' : 'Control de Versiones y Auditoría'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            {isEn ? 'Calculator Update History' : 'Historial de Actualizaciones de Parámetros'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {isEn
              ? 'A verifiable record of when our calculators were last audited, which parameters were adjusted, and the statutory citations that justified each change.'
              : 'Un registro público y verificable de la fecha de auditoría de cada calculadora, los parámetros calibrados y las resoluciones del DOF que respaldaron el cambio.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-12 flex-grow w-full space-y-8">
        {/* Navigation tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEn ? 'Related documentation: ' : 'Documentación relacionada: '}
            </span>
            <Link
              href={`${langPrefix}/metodologia`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              {isEn ? 'Methodology ➔' : 'Metodología de Cálculo ➔'}
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href={`${langPrefix}/fuentes`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              {isEn ? 'Official Sources Directory ➔' : 'Directorio de Fuentes Oficiales ➔'}
            </Link>
          </div>
          <span className="text-slate-500 font-medium">
            {isEn ? `${CALCULATOR_UPDATES.length} Verified Audit Records` : `${CALCULATOR_UPDATES.length} Registros de Auditoría`}
          </span>
        </div>

        {/* Updates Timeline List */}
        <div className="space-y-6">
          {CALCULATOR_UPDATES.map((upd) => (
            <article
              key={upd.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {upd.categorySlug}
                    </span>
                    <Link
                      href={`${langPrefix}/calculadoras/${upd.categorySlug}/${upd.calculatorSlug}`}
                      className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      {isEn ? 'Open Calculator ➔' : 'Abrir Calculadora ➔'}
                    </Link>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {upd.calculatorTitle}
                  </h2>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 sm:text-right shrink-0">
                  <div>
                    <strong>{isEn ? 'Last reviewed: ' : 'Auditoría integral: '}</strong>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{upd.lastReviewed}</span>
                  </div>
                  <div>
                    <strong>{isEn ? 'Parameter update: ' : 'Actualización de tasas: '}</strong>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{upd.lastParameterUpdate}</span>
                  </div>
                </div>
              </div>

              {/* What changed & Reason cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {isEn ? 'What Changed:' : 'Modificaciones realizadas:'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {upd.whatChanged}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 space-y-1.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {isEn ? 'Regulatory Reason:' : 'Motivo y fundamento regulatorio:'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {upd.reasonForUpdate}
                  </p>
                </div>
              </div>

              {/* Source attribution and external links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">
                    {isEn ? 'Official Statutory Publication: ' : 'Publicación Oficial Emisora: '}
                  </strong>
                  <span>{upd.officialSource}</span>
                </div>

                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>{isEn ? 'Verify in Official Portal' : 'Verificar en Portal Oficial'}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
