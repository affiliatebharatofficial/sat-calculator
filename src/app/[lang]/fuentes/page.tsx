import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoAlternates } from '@/lib/seo';
import { OFFICIAL_SOURCES } from '@/data/officialSources';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const seoAlternates = getSeoAlternates('fuentes', lang);

  const title = isEn
    ? 'Official Sources & Legal Directory | Calculadora SAT'
    : 'Directorio de Fuentes Oficiales y Normatividad Jurídica | Calculadora SAT';

  const description = isEn
    ? 'Complete directory of primary government sources, federal statutes, DOF publications, and official benchmarks backing CalculadoraSAT.org.'
    : 'Directorio completo de fuentes primarias gubernamentales, leyes federales, publicaciones del DOF e indicadores de SAT, INEGI, Banxico y CONASAMI.';

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

export default async function FuentesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: `https://www.calculadorasat.org${langPrefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Sources' : 'Fuentes', item: 'https://www.calculadorasat.org/fuentes' },
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 uppercase tracking-widest mb-4 border border-blue-400/30">
            🏛️ {isEn ? 'Primary Statutory Records' : 'Directorio de Sustento Positivo'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            {isEn ? 'Official Regulatory Sources' : 'Fuentes Oficiales y Normatividad'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {isEn
              ? 'CalculadoraSAT.org uses exclusively verified primary government sources: the Official Gazette of the Federation (DOF), federal tax and labor statutes, and official banking and statistical publications.'
              : 'En CalculadoraSAT.org nos fundamentamos únicamente en publicaciones oficiales primarias: Diario Oficial de la Federación (DOF), leyes federales emitidas por el Congreso y resoluciones de las autoridades correspondientes.'}
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
              href={`${langPrefix}/actualizaciones`}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
            >
              {isEn ? 'Changelog & Updates ➔' : 'Registro de Actualizaciones ➔'}
            </Link>
          </div>
          <span className="text-slate-500 font-medium">
            {isEn ? `${OFFICIAL_SOURCES.length} Official Statutory Sources Documented` : `${OFFICIAL_SOURCES.length} Fuentes Oficiales Registradas`}
          </span>
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 gap-6">
          {OFFICIAL_SOURCES.map((source) => (
            <article
              key={source.id}
              id={source.id}
              className="scroll-mt-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
                    {source.institution}
                  </span>
                  <span className="text-xs text-slate-400">
                    {source.effectiveDate || source.publicationDate}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isEn ? 'Last verified: ' : 'Última verificación: '} {source.lastVerified}
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {source.documentTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  <strong className="text-slate-800 dark:text-slate-200">{isEn ? 'Topic: ' : 'Materia regulada: '}</strong>
                  {source.topic}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1 font-bold">
                  {isEn ? 'Statutory Rule or Parameter Anchored:' : 'Parámetro o regla de cálculo que sustenta:'}
                </strong>
                {source.supportedRule}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">
                    {isEn ? 'Target Hubs: ' : 'Categorías vinculadas: '}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {source.categorySlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`${langPrefix}/calculadoras/${slug}`}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                      >
                        /{slug}
                      </Link>
                    ))}
                  </div>
                </div>

                <a
                  href={source.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                >
                  <span>{isEn ? 'Access Official Government Document' : 'Consultar Documento Oficial'}</span>
                  <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
