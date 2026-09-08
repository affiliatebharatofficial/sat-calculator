import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipoCambioMexicoClient from './TipoCambioMexicoClient';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('tipo-de-cambio', lang);

  return {
    title: 'Conversor de Divisas y Tipo de Cambio Oficial (USD, MXN, PEN)',
    description: 'Conversor universal de divisas: convierte dólares a pesos mexicanos (USD a MXN) y soles peruanos (USD a PEN) con tipos de cambio oficiales de Banxico FIX, SAT y SUNAT.',
    keywords: [
      'tipo de cambio sat',
      'conversor de divisas',
      'dolar a pesos mexicanos',
      'dolares a soles',
      'soles a dolares',
      'tipo de cambio banxico',
      'usd to mxn',
      'usd to pen',
      'tipo de cambio oficial mexico',
      'tipo de cambio sunat'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Conversor de Divisas y Tipo de Cambio Oficial (USD, MXN, PEN)',
      description: 'Conversor universal de divisas: convierte dólares a pesos mexicanos (USD a MXN) y soles peruanos (USD a PEN) con tipos de cambio oficiales de Banxico FIX, SAT y SUNAT.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_MX',
      type: 'website',
    },
  };
}

export default async function TipoCambioPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = 'https://www.calculadorasat.org/tipo-de-cambio';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de Tipo de Cambio Oficial SAT y Banxico (USD a MXN)',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula y convierte dólares estadounidenses a pesos mexicanos bajo las reglas del SAT, Banco de México (FIX) y el Código Fiscal de la Federación.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'MXN',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué tipo de cambio se utiliza para pagar impuestos ante el SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 20 del Código Fiscal de la Federación (CFF), se debe utilizar el tipo de cambio FIX determinado por el Banco de México y publicado en el Diario Oficial de la Federación (DOF) el día hábil bancario inmediato anterior al que se causen las contribuciones.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué es el tipo de cambio FIX del Banco de México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio FIX es determinado por el Banco de México los días hábiles bancarios con base en un promedio ponderado de cotizaciones del mercado interbancario de divisas al mayoreo. Se publica en el DOF al día hábil siguiente.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se facturan operaciones en dólares en el CFDI 4.0?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En el CFDI 4.0 se debe registrar el atributo Moneda="USD" y el atributo TipoCambio con el valor oficial pactado o publicado por el Banco de México conforme a la guía de llenado del SAT.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Tipo de Cambio SAT', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">
            {lang === 'en' ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Tipo de Cambio Oficial SAT</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-4 border border-emerald-200 dark:border-emerald-800">
            🇲🇽 México & 🇵🇪 Perú • Conversor de Divisas Universal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Conversor de Divisas y Tipo de Cambio Oficial
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Convierte dólares estadounidenses (USD), pesos mexicanos (MXN) y soles peruanos (PEN) con tasas de referencia oficiales de Banxico FIX, SAT y SUNAT.
          </p>
        </div>

        {/* Interactive Client Calculator */}
        <TipoCambioMexicoClient />

        {/* Transparencia Cambiaria: 4-part mandatory disclosures */}
        <section className="mt-8 bg-blue-50/70 dark:bg-slate-900/80 border border-blue-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-blue-950 dark:text-blue-200 font-bold text-base">
            <span>ℹ️</span>
            <h2>Transparencia del Tipo de Cambio Oficial en México</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">1. Fuente de Datos:</strong>
              Cotizaciones del Banco de México (Banxico) bajo el mecanismo FIX y publicaciones oficiales del Diario Oficial de la Federación (DOF).
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">2. Frecuencia y Publicación:</strong>
              Banxico determina la tasa FIX a las 12:00 horas de cada día hábil bancario. Conforme al Art. 20 del CFF, dicha cotización surte efecto fiscal el día hábil siguiente.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">3. Limitaciones:</strong>
              Esta herramienta es un simulador matemático de referencia fiscal y contable. No sustituye la consulta directa del DOF ni opera como intermediario financiero.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">4. Tasa Oficial FIX vs. Ventanilla Bancaria:</strong>
              El tipo de cambio FIX es el parámetro legal del gobierno para el pago de contribuciones y obligaciones. Las ventanillas bancarias comerciales (BBVA, Banorte, Santander, etc.) manejan cotizaciones libres con márgenes propios de compra y venta.
            </div>
          </div>
        </section>

        {/* Detailed Educational Guide */}
        <article className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Marco Legal del Tipo de Cambio para Efectos Fiscales en México
            </h2>
            <p>
              En México, el manejo de transacciones en moneda extranjera está rigurosamente reglamentado por el <strong>Código Fiscal de la Federación (CFF)</strong> y la <strong>Ley Monetaria de los Estados Unidos Mexicanos</strong>.
            </p>
            <p>
              Cuando un contribuyente (persona física o moral) recibe ingresos, realiza importaciones, deduce gastos o contrae obligaciones pactadas en moneda extranjera (como dólares estadounidenses), la contabilidad electrónica y las declaraciones de impuestos deben convertirse obligatoriamente a moneda nacional (pesos mexicanos).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Regla del Artículo 20 del Código Fiscal de la Federación (CFF)
            </h2>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm space-y-3">
              <p className="italic text-slate-600 dark:text-slate-400 font-serif">
                "Para determinar las contribuciones y sus accesorios se considerará el tipo de cambio a que se haya adquirido la moneda extranjera de que se trate y no habiendo adquisición, se estará al tipo de cambio que el Banco de México publique en el Diario Oficial de la Federación el día anterior a aquél en que se causen las contribuciones."
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                — Artículo 20, Párrafo Tercero, Código Fiscal de la Federación.
              </p>
            </div>
            <p className="text-sm">
              Esto significa que para cualquier cálculo de impuestos ante el SAT (como retenciones de ISR o acreditamiento de IVA de facturas en dólares), debes tomar la cotización publicada en el DOF del día hábil inmediato anterior.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el Tipo de Cambio en México
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué tasa de cambio debo usar en una factura electrónica (CFDI) emitida en dólares?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  En el CFDI 4.0 debes especificar el tipo de cambio oficial del día de emisión conforme al catálogo de monedas del SAT o la tasa pactada entre las partes al momento de la operación.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo afecta la fluctuación cambiaria en la declaración anual?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Las personas morales y personas físicas con actividad empresarial deben registrar la utilidad o pérdida cambiaria al cierre del ejercicio fiscal como un ingreso acumulable o deducción autorizada respectivamente.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Basis & Statutory References */}
          <section className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <span>⚖️</span> Marco Legal y Fuentes Normativas (México)
            </h3>
            <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li><strong>Código Fiscal de la Federación (CFF):</strong> Artículo 20 (Determinación y solventación de contribuciones en moneda extranjera según cotizaciones Banxico / DOF).</li>
              <li><strong>Banco de México (Banxico):</strong> Metodología de determinación del tipo de cambio FIX interbancario de 48 horas.</li>
              <li><strong>Diario Oficial de la Federación (DOF):</strong> Publicación diaria oficial del tipo de cambio para solventar obligaciones denominadas en dólares.</li>
            </ul>
          </section>

          {/* Disclaimer Box */}
          <div className="p-4 bg-amber-50 dark:bg-amber-955/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <p className="font-bold mb-1">⚠️ Aviso Legal e Informativo:</p>
            <p>
              Esta calculadora es un simulador de conversión y consulta cambiaria independiente. <strong>NO está afiliada, autorizada ni respaldada oficialmente por el SAT, el Banco de México (Banxico) ni la Secretaría de Hacienda y Crédito Público (SHCP).</strong> Los datos tienen fines orientativos para planeación financiera y facturación.
            </p>
            <p className="mt-2 text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
              Última revisión técnica de normativas y algoritmos: Febrero 2026.
            </p>
          </div>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Herramientas Fiscales y Financieras Relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/calculadoras/sat/iva" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇲🇽</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora de IVA (SAT)</div>
                  <div className="text-xs text-slate-500 font-normal">Desglose al 16% y tasa fronteriza 8%</div>
                </div>
              </Link>

              <Link href="/calculadoras/nomina/salario-neto-mexico" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Salario Neto México</div>
                  <div className="text-xs text-slate-500 font-normal">Cálculo de retenciones ISR e IMSS</div>
                </div>
              </Link>

              <Link href="/calculadoras/sat/resico" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📑</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora RESICO</div>
                  <div className="text-xs text-slate-500 font-normal">Tasas reducidas del 1% al 2.5%</div>
                </div>
              </Link>

              <Link href="/calculadoras/sat/calculadora-iva" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🧾</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora de IVA</div>
                  <div className="text-xs text-slate-500 font-normal">Desglose de IVA 16% y 8% Fronterizo</div>
                </div>
              </Link>

              <Link href="/calculadoras/peru/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización tributaria oficial de Perú</div>
                </div>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
