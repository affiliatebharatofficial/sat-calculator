import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
  const seoAlternates = getSeoAlternates('peru/blog', lang);

  const title = isEn
    ? 'Peru Tax & Labor Updates Blog 2026: SUNAT & SBS Insights | Calculadora SAT'
    : 'Blog de Actualizaciones Fiscales y Laborales de Perú 2026 | Calculadora SAT';
  const description = isEn
    ? 'Educational articles and updates on Peruvian tax codes, SUNAT electronic billing, UIT adjustments, and labor regulations under MTPE.'
    : 'Artículos de análisis y novedades sobre el régimen tributario de SUNAT, comprobantes de pago electrónicos, variaciones de la UIT y disposiciones del MTPE en Perú.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT — Blog Perú',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function PeruBlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  const peruArticles = [
    {
      title: isEn
        ? 'Official UIT 2026 Set at S/ 5,350: Direct Impact on Payroll Deductions and Fines'
        : 'Aprobación de la UIT 2026 en S/ 5,350: Impacto directo en la deducción de Renta de 5ta y multas SUNAT',
      date: '2026-08-15',
      category: 'Tributario SUNAT',
      badge: 'Normativa 2026',
      summary: isEn
        ? 'The Ministry of Economy and Finance (MEF) set the new Tax Unit (UIT) at S/ 5,350, lifting the tax-exempt 7 UIT threshold for salaried employees to S/ 37,450 annually.'
        : 'El Ministerio de Economía y Finanzas oficializó el nuevo valor de la Unidad Impositiva Tributaria para el ejercicio 2026. Conoce cómo este incremento eleva el piso inafecto de 7 UIT a S/ 37,450 y reduce la retención mensual de impuesto a la renta para los trabajadores en planilla.',
      readTime: '4 min',
      link: '/calculadoras/peru/calculadora-quinta-categoria-peru',
      actionText: 'Simular Renta 5ta',
    },
    {
      title: isEn
        ? 'May and November CTS Deadlines: How Companies Must Comply Under D.S. 001-97-TR'
        : 'Cronograma y Depósito de la CTS: Guía de cumplimiento para empleadores y trabajadores',
      date: '2026-05-02',
      category: 'Laboral MTPE',
      badge: 'Beneficio Laboral',
      summary: isEn
        ? 'Review the statutory deposit schedule before May 15 and November 15, interest penalties for late deposit, and employee withdrawal availability rules.'
        : 'Todo lo que debes conocer sobre la obligación de depositar la Compensación por Tiempo de Servicios en las entidades financieras autorizadas por la SBS dentro de los primeros 15 días de mayo y noviembre, cálculo de intereses moratorios e intangibilidad de fondos.',
      readTime: '5 min',
      link: '/calculadoras/peru/calculadora-cts-peru',
      actionText: 'Simular CTS',
    },
    {
      title: isEn
        ? 'SBS Exchange Rate vs. Parallel Market: Which Rate Must Be Used for SUNAT Accounting?'
        : 'Tipo de Cambio SBS vs. Mercado Paralelo: ¿Cuál cotización es legalmente válida ante SUNAT?',
      date: '2026-04-10',
      category: 'Cambiario y Divisas',
      badge: 'Contabilidad Fiscal',
      summary: isEn
        ? 'Why SUNAT requires using the official SBS buying/selling exchange rate of the date of issuance for electronic invoices and monthly tax returns.'
        : 'Explicación del principio tributario que rige las operaciones en moneda extranjera en el Perú. Para efectos de facturación electrónica y liquidación mensual de impuestos, debe aplicarse estrictamente la cotización de cierre del día anterior publicada por la SBS.',
      readTime: '3 min',
      link: '/calculadoras/peru/tipo-de-cambio-sunat',
      actionText: 'Consultar Tipo de Cambio',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-red-700 via-red-800 to-slate-950 text-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-red-100 border border-white/20 uppercase tracking-wider mb-4">
            <span>✍️</span>
            <span>{isEn ? 'Peru News & Editorial' : 'Actualizaciones Tributarias de Perú'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Peru Tax & Labor Editorial' : 'Blog y Novedades Normativas de Perú'}
          </h1>
          <p className="mt-3 text-red-100/90 max-w-3xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Analysis, official circulars, and practical guidance regarding SUNAT decrees, SBS currency regulations, and MTPE labor provisions.'
              : 'Análisis detallado de resoluciones de superintendencia de SUNAT, decretos supremos del MEF y pronunciamientos del Ministerio de Trabajo en el Perú.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-10">
        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href="/peru" className="hover:text-red-600 transition-colors">
            {isEn ? 'Peru Portal' : 'Portal Perú'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Blog' : 'Blog'}
          </span>
        </nav>

        {/* Articles List */}
        <div className="space-y-6">
          {peruArticles.map((art, idx) => (
            <article
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3 hover:border-red-400/80 transition"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40">
                  {art.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 dark:text-slate-400">{art.date}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 dark:text-slate-400">{art.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {art.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {art.summary}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {isEn ? 'Calculadora SAT Peru Editorial' : 'Equipo Editorial de Calculadora SAT Perú'}
                </span>
                <Link
                  href={art.link}
                  className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-100 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>🧮</span>
                  <span>{art.actionText}</span>
                  <span>➔</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
