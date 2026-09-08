import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DolaresASolesClient from './DolaresASolesClient';
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
  const seoAlternates = getSeoAlternates('dolares-a-soles', lang);

  return {
    title: 'Dólares a Soles y Soles a Dólares: Convertidor USD ↔ PEN',
    description: 'Convierte dólares a soles y soles a dólares con nuestro conversor bidireccional instantáneo. Elige entre tipo de cambio SUNAT oficial, mercado o tasa personalizada.',
    keywords: [
      'dólares a soles',
      'soles a dólares',
      'convertir dólares a soles',
      'convertir soles a dólares',
      'calculadora dólares a soles',
      'calculadora soles a dólares',
      'USD a PEN',
      'PEN a USD',
      'tipo de cambio dólar sol'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Dólares a Soles y Soles a Dólares: Convertidor USD ↔ PEN',
      description: 'Convierte dólares a soles y soles a dólares con nuestro conversor bidireccional instantáneo. Tipo de cambio SUNAT oficial o personalizado.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function DolaresASolesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = 'https://www.calculadorasat.org/dolares-a-soles';

  const initialRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora Dólares a Soles (USD a PEN)',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calculadora para convertir dólares estadounidenses (USD) a soles peruanos (PEN) usando el tipo de cambio SUNAT oficial o del mercado libre.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'PEN',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy', item: 'https://www.calculadorasat.org/dolar-hoy' },
      { '@type': 'ListItem', position: 3, name: 'Dólares a Soles', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/dolar-hoy" className="hover:text-blue-600 transition-colors">Dólar Hoy</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Dólares a Soles</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            💵 Conversor Bidireccional USD ↔ PEN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Dólares a Soles y Soles a Dólares
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Calculadora y conversor bidireccional instantáneo entre dólares estadounidenses y soles peruanos. Elige entre tipo de cambio SUNAT oficial o cotización personalizada de tu banco.
          </p>
        </div>

        <DolaresASolesClient initialRate={initialRate} />

        {/* Transparencia Cambiaria: 4-part mandatory disclosures */}
        <section className="mt-8 bg-blue-50/70 dark:bg-slate-900/80 border border-blue-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-blue-950 dark:text-blue-200 font-bold text-base">
            <span>ℹ️</span>
            <h2>Transparencia y Condiciones del Tipo de Cambio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">1. Fuente de Datos:</strong>
              Cotizaciones oficiales publicadas por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) y la Superintendencia de Banca, Seguros y AFP (SBS).
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">2. Frecuencia de Actualización:</strong>
              Las tasas de SUNAT se actualizan automáticamente cada día hábil bancario por la mañana. Las tasas de referencia del mercado se sincronizan periódicamente.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">3. Limitaciones del Simulador:</strong>
              Esta herramienta ofrece conversiones matemáticas de referencia. No constituye una casa de cambio ni ejecuta órdenes de compra/venta de divisas.
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-blue-100 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">4. Tasa Referencial vs. Bancos:</strong>
              Las entidades bancarias comerciales (BCP, BBVA, Interbank, Scotiabank) y casas de cambio aplican un margen de intermediación comercial (*spread*), por lo que el tipo de cambio al cambiar dinero físico o en ventanilla diferirá de la tasa interbancaria o SUNAT.
            </div>
          </div>
        </section>

        {/* Detailed 500+ Words SEO Content & Guide Section */}
        <article className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Convertir Dólares a Soles (USD a PEN) en Perú de Forma Correcta?
            </h2>
            <p>
              Cambiar <strong>dólares estadounidenses (USD) a soles peruanos (PEN)</strong> es una operación diaria para exportadores, freelancers que reciben ingresos del extranjero, familias que cobran remesas y cualquier ciudadano que desea utilizar sus ahorros en divisas para gastos locales en el Perú.
            </p>
            <p>
              Al cambiar de dólares a soles, los bancos, casas de cambio digitales y paralelas te aplicarán el <strong>Tipo de Cambio Compra</strong>. Esto significa que la entidad te "compra" tus dólares y te entrega soles peruanos al valor pactado.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Dólar de Mercado Compra vs. Tipo de Cambio SUNAT Compra
            </h2>
            <p>
              Para optimizar cada transacción cambiaria y evitar pagar impuestos indebidos, es indispensable entender qué cotización aplica según la naturaleza de tu operación:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>💵</span> Dólar Mercado Compra
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es la tasa real a la que las casas de cambio te compran tus dólares en el mercado financiero. Si buscas vender dólares para obtener soles libres en efectivo o transferencia, debes guiarte por la tasa en vivo disponible en <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🇵🇪</span> SUNAT Compra Oficial
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es el tipo de cambio fijado por la SUNAT para registrar ventas e ingresos percibidos en dólares. Para emitir comprobantes de pago (facturas o recibos por honorarios electrónica en USD), la SUNAT exige usar la tasa de compra del día de la operación en <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Fórmula de Conversión de Dólares a Soles
            </h2>
            <p>
              La fórmula matemática para determinar la cantidad de Soles que recibirás al vender Dólares es:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm text-center border border-slate-800">
              Monto en Soles (PEN) = Monto en Dólares (USD) × Tipo de Cambio Compra (PEN/USD)
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-sm space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">Ejemplo Práctico de Cálculo:</strong>
              <p>
                Si vas a cambiar <strong>$ 500 USD</strong> y el tipo de cambio compra es de <strong>3.740 PEN por USD</strong>:
              </p>
              <p className="font-mono text-xs text-blue-700 dark:text-blue-300">
                PEN = $ 500 × 3.740 = S/ 1,870.00 PEN
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recibirás exactamente S/ 1,870.00 soles en tu cuenta bancaria o en efectivo.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre la Conversión Dólares a Soles
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cuál es el mejor horario para cambiar dólares a soles en Perú?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El mejor horario comercial es de lunes a viernes entre las 9:00 a.m. y la 1:30 p.m., ya que el mercado interbancario de divisas se encuentra abierto y las entidades ofrecen sus spreads más competitivos.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Debo emitir factura electrónica en dólares usando la tasa SUNAT de Compra o Venta?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Según la normativa de la SUNAT, las operaciones de ventas o ingresos prestados en dólares deben convertirse a moneda nacional utilizando el <strong>Tipo de Cambio SUNAT de Compra</strong> del día de publicación.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué diferencia hay entre este convertidor y la cotización en bancos?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Nuestra calculadora te permite elegir instantáneamente entre la tasa media del mercado interbancario, la tasa SUNAT oficial o ingresar el tipo de cambio exacto que te ofrece tu entidad bancaria.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras y Cotizaciones en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización interbancaria en tiempo real</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización oficial contable y tributaria</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                  <div className="text-xs text-slate-500 font-normal">Pago legal de deudas y contratos</div>
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
