import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DolarHoyClient from './DolarHoyClient';
import { getMarketExchangeRate } from '@/lib/exchange-rates/market-rate';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('dolar-hoy', lang);

  return {
    title: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
    description: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
    keywords: [
      'dolar hoy',
      'dólar hoy',
      'precio del dólar hoy',
      'precio del dolar',
      'precio del dólar',
      'precio dolar',
      'tipo de cambio hoy',
      'cuanto esta el dolar',
      'dólar hoy perú',
      'cotización del dólar'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
      description: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function DolarHoyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = 'https://www.calculadorasat.org/dolar-hoy';

  // Server-side fetch live rates
  const marketRate = await getMarketExchangeRate();
  const sunatRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Dólar Hoy en Perú - Cotización y Convertidor USD/PEN',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Consulta el dólar hoy en Perú. Cotización de compra y venta en el mercado e información del tipo de cambio SUNAT oficial.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'PEN',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Dónde consultar el precio del dólar hoy en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes consultar el precio del dólar hoy actualizado en tiempo real en nuestra calculadora y monitor oficial.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuál es la diferencia entre el tipo de cambio SUNAT y el del mercado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio del mercado se actualiza en tiempo real según la oferta y demanda bancaria. El tipo de cambio SUNAT es fijado diariamente por la entidad tributaria para fines de facturación y liquidación de impuestos.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo convertir dólares a soles hoy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multiplica la cantidad de dólares (USD) por la tasa de cambio de venta o compra según corresponda tu transacción.'
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
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy en Perú', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Dólar Hoy en Perú</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            🇵🇪 Perú • Cotización en Tiempo Real
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Dólar Hoy en Perú
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Precio del dólar de compra y venta en el mercado peruano, cotización SUNAT oficial y convertidor instantáneo USD / PEN.
          </p>
        </div>

        {/* Main Interactive Client Component (Live Market Rate + Separate SUNAT Card + Converter) */}
        <DolarHoyClient marketRate={marketRate} sunatRate={sunatRate} />

        {/* Transparencia Cambiaria: 4-part mandatory disclosures */}
        <section className="mt-8 bg-blue-50/70 dark:bg-slate-900/80 border border-blue-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-blue-950 dark:text-blue-200 font-bold text-base">
            <span>ℹ️</span>
            <h2>Transparencia del Tipo de Cambio en Tiempo Real</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">1. Fuente de Datos:</strong>
              Cotizaciones de mercado cambiario interbancario provistas en tiempo real e información oficial de la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) y SBS.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">2. Frecuencia de Actualización:</strong>
              Monitoreo continuo durante las horas de negociación del mercado interbancario de Lima (lunes a viernes de 9:00 a.m. a 1:30 p.m. PET). La tasa SUNAT se actualiza una vez al día hábil.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">3. Limitaciones:</strong>
              La cotización presentada es de carácter informativo e ilustrativo del mercado interbancario mayorista. Las plataformas de cambio privadas o entidades financieras fijan libremente sus propias tasas operativas.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">4. Tasa Referencial vs. Bancos y Casas de Cambio:</strong>
              Existe un diferencial (*spread*) entre el precio de compra y venta. Los bancos comerciales (BCP, BBVA, Interbank) manejan márgenes más amplios (aprox. 1% a 2.5%), mientras que las casas de cambio físicas (mercado paralelo u Ocoña) y fintechs ofrecen spreads más reducidos.
            </div>
          </div>
        </section>

        {/* Informational SEO Content Section (500+ Words) */}
        <article className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Dólar Hoy en Perú: Cotización en Tiempo Real y Análisis del Mercado
            </h2>
            <p>
              El valor del <strong>dólar hoy en el Perú</strong> es una de las variables económicas más consultadas por personas naturales, inversionistas, importadores y emprendedores. Saber cuánto vale el dólar en tiempo real te permite tomar decisiones financieras acertadas al comprar divisas, pagar tarjetas de crédito o realizar inversiones internacionales.
            </p>
            <p>
              En nuestro portal cuentas con información actualizada continuamente del <strong>Mercado Interbancario</strong> y la cotización oficial de la <strong>SUNAT</strong>, permitiéndote comparar ambas referencias de forma transparente sin sesgos ni tarifas ocultas.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Mercado Interbancario vs. Tipo de Cambio SUNAT
            </h2>
            <p>
              Al consultar la cotización del dólar en el Perú es crucial identificar la diferencia entre los dos entornos cambiarios principales:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>📈</span> Cotización del Mercado Interbancario
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Es la tasa real a la que operan los bancos comerciales (BCP, BBVA, Interbank, Scotiabank) y las plataformas de cambio digitales. Fluctúa segundo a segundo en horario bancario de 9:00 a.m. a 1:30 p.m.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🏛️</span> Tipo de Cambio SUNAT Oficial
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Publicado diariamente por la SUNAT en las primeras horas de la mañana. Sirve como referencia estandarizada y obligatoria para la contabilidad, emisión de facturas electrónicas y declaración tributaria. Consulta los datos históricos en <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Factores que Determinan el Precio del Dólar Hoy en el Perú
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Política Monetaria del BCRP:</strong> El Banco Central de Reserva del Perú realiza operaciones de compraventa de dólares spot y subastas de Swaps Cambiarios para moderar volatilidades abruptas.
              </li>
              <li>
                <strong>Mercado Global y Reserva Federal:</strong> Expectativas sobre las tasas de interés de la Fed influyen directamente en la fortaleza global del dólar (Índice DXY).
              </li>
              <li>
                <strong>Exportaciones Mineras (Cobre y Oro):</strong> Mayores precios del cobre inyectan divisas a la economía peruana, apreciando el Sol.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el Dólar Hoy
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo convertir de Dólares a Soles o viceversa?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Usa nuestro conversor bidireccional <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles y Soles a Dólares</Link> para obtener la cifra exacta en tiempo real con opción a tasa SUNAT o personalizada.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿A qué hora abre y cierra el mercado cambiario en Perú?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El mercado interbancario opera de lunes a viernes entre las 9:00 a.m. y la 1:30 p.m. Fuera de ese horario, las tasas suelen congelarse o ampliar su margen de ganancia en ventanillas bancarias.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras de Divisas en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles (USD ↔ PEN)</div>
                  <div className="text-xs text-slate-500 font-normal">Conversor bidireccional instantáneo</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Tasa tributaria y contable oficial</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                  <div className="text-xs text-slate-500 font-normal">Conversión legal de deudas en dólares</div>
                </div>
              </Link>

              <Link href="/calculadora-comisiones-tarjeta-dolares" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Comisiones Tarjeta en Dólares</div>
                  <div className="text-xs text-slate-500 font-normal">Calcula recargos forex bancarios</div>
                </div>
              </Link>

              <Link href="/calculadoras/peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Herramientas Perú</div>
                  <div className="text-xs text-slate-500 font-normal">CTS, Gratificación, IGV y Renta 5ta</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇲🇽</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio México (SAT/DOF)</div>
                  <div className="text-xs text-slate-500 font-normal">Dólar a pesos mexicanos Banxico FIX</div>
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
