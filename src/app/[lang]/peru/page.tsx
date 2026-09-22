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
  const seoAlternates = getSeoAlternates('peru', lang);

  const title = isEn
    ? 'Peru Tax & Labor Portal 2026: SUNAT, IGV, CTS & 5ta Categoría | Calculadora SAT'
    : '🇵🇪 Calculadoras Tributarias y Laborales de Perú 2026 — SUNAT, IGV, CTS y Renta 5ta';
  const description = isEn
    ? 'Dedicated portal for Peru: simulate 18% IGV, CTS deposits, July/Dec Gratifications with 9% EsSalud, 5th Category income tax with 7 UIT deduction, and official SUNAT daily exchange rates.'
    : 'Portal oficial de simuladores tributarios y laborales para Perú: cálculo de IGV (18%), CTS semestral, Gratificaciones de ley, Renta de 5ta Categoría (deducción 7 UIT) y Tipo de Cambio SUNAT.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT — Portal Perú',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function PeruPortalPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  const peruKeyIndicators = [
    {
      label: isEn ? 'Official UIT 2026' : 'Unidad Impositiva Tributaria (UIT 2026)',
      value: 'S/ 5,350.00',
      badge: 'D.S. MEF',
      desc: isEn ? 'Statutory benchmark for tax brackets, fines, and exemptions.' : 'Valor de referencia oficial para topes tributarios, multas y deducciones.',
    },
    {
      label: isEn ? 'General IGV Rate' : 'Tasa General del IGV (16% + 2% IPM)',
      value: '18.00%',
      badge: 'D.S. N° 055-99-EF',
      desc: isEn ? 'Standard value-added tax applied to domestic goods and services.' : 'Impuesto General a las Ventas aplicable en todo el territorio peruano.',
    },
    {
      label: isEn ? '5th Category Basic Deduction' : 'Deducción Base de Renta 5ta (7 UIT)',
      value: 'S/ 37,450.00',
      badge: 'D.S. N° 179-2004-EF',
      desc: isEn ? 'Automatic tax-free allowance for dependent payroll employees.' : 'Monto anual 100% libre de impuesto para trabajadores en planilla.',
    },
    {
      label: isEn ? 'Extraordinary Bonus (EsSalud)' : 'Bonificación Extraordinaria Gratificación',
      value: '9.00% (o 6.75% EPS)',
      badge: 'Ley N° 30334',
      desc: isEn ? 'Mandatory employer bonus added on July & December gratifications.' : 'Aporte de seguridad social transferido directamente al trabajador.',
    },
  ];

  const peruCalculatorsList = [
    {
      title: isEn ? 'Peru IGV Calculator (18%)' : 'Calculadora de IGV Perú (18%)',
      desc: isEn
        ? 'Calculate, add, or back out 18% IGV (16% IGV + 2% Municipal Promotion Tax) for SUNAT invoicing.'
        : 'Agrega o desglosa el 18% del Impuesto General a las Ventas dividiendo entre 1.18 para emitir comprobantes de pago.',
      badge: 'D.S. N° 055-99-EF • 18%',
      href: '/calculadoras/peru/calculadora-igv-peru',
      icon: '🇵🇪',
    },
    {
      title: isEn ? 'Official SUNAT Exchange Rate' : 'Tipo de Cambio SUNAT Oficial',
      desc: isEn
        ? 'Daily USD/PEN buying and selling tax rates published by SUNAT and SBS for accounting and tax returns.'
        : 'Consulta y convierte con el tipo de cambio oficial de compra y venta fijado por la SBS y SUNAT para efectos tributarios.',
      badge: 'Oficial SBS / SUNAT',
      href: '/calculadoras/peru/tipo-de-cambio-sunat',
      icon: '💱',
    },
    {
      title: isEn ? 'Peru CTS Calculator (Severance Reserve)' : 'Calculadora de CTS (Compensación por Tiempo de Servicios)',
      desc: isEn
        ? 'Simulate statutory May and November bank deposits including 1/6th of computable gratification.'
        : 'Determina el depósito semestral en cuenta bancaria intangible incluyendo un sexto de la gratificación conforme a la ley.',
      badge: 'D.S. N° 001-97-TR',
      href: '/calculadoras/peru/calculadora-cts-peru',
      icon: '🏦',
    },
    {
      title: isEn ? 'Peru Gratification Calculator (July & December)' : 'Calculadora de Gratificación (Fiestas Patrias y Navidad)',
      desc: isEn
        ? 'Calculate complete semester salary plus 9% EsSalud or 6.75% EPS extraordinary legal bonus.'
        : 'Calcula tu pago semestral íntegro más la bonificación extraordinaria inafecta de descuentos de AFP u ONP.',
      badge: 'Ley N° 27735 & Ley N° 30334',
      href: '/calculadoras/peru/calculadora-gratificacion-peru',
      icon: '🎁',
    },
    {
      title: isEn ? '5th Category Income Tax (Dependent Payroll)' : 'Calculadora de Renta de 5ta Categoría 2026',
      desc: isEn
        ? 'Progressive brackets from 8% to 30% with the automatic 7 UIT statutory exemption (S/ 37,450).'
        : 'Simula la retención mensual en planilla aplicando la deducción legal de 7 UIT y las escalas progresivas acumuladas.',
      badge: 'Art. 34 y 53 Ley del Impuesto a la Renta',
      href: '/calculadoras/peru/calculadora-quinta-categoria-peru',
      icon: '📑',
    },
    {
      title: isEn ? 'RUC Validator Peru (Modulo 11)' : 'Validador de RUC SUNAT (Algoritmo Módulo 11)',
      desc: isEn
        ? 'Verify the structural syntax and mathematical checksum digit of 11-digit Peruvian taxpayer numbers.'
        : 'Verifica la validez matemática y dígito de control de cualquier RUC de 11 dígitos para personas naturales y jurídicas.',
      badge: 'Algoritmo Oficial Módulo 11',
      href: '/calculadoras/peru/consulta-ruc-sunat',
      icon: '🔍',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-red-700 via-red-800 to-slate-950 text-white py-14 sm:py-20 border-b border-red-900/40">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-red-100 border border-white/20 uppercase tracking-wider mb-5">
            <span>🇵🇪</span>
            <span>{isEn ? 'Dedicated Regional Portal: Peru' : 'Portal Regional Especializado: Perú'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {isEn ? 'Peruvian Tax & Labor Simulator Suite' : 'Herramientas Tributarias y Laborales de Perú'}
          </h1>

          <p className="mt-4 text-red-100/90 max-w-3xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Free computational models calibrated to Peruvian legislation: SUNAT tax brackets, SBS official exchange rates, and Ministry of Labor (MTPE) benefits including CTS, statutory gratifications, and payroll withholdings.'
              : 'Simuladores y calculadoras calibradas con las disposiciones de SUNAT, SBS y el Ministerio de Trabajo (MTPE). Realiza cálculos de IGV, CTS, gratificaciones de Fiestas Patrias y Navidad, y retenciones de quinta categoría con total privacidad.'}
          </p>

          {/* Sub-Hub Quick Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-6 border-t border-white/15 text-xs font-bold">
            <Link
              href="/peru/calculadoras"
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition flex items-center gap-1.5 backdrop-blur-xs"
            >
              <span>🧮</span>
              <span>{isEn ? 'Peru Calculators Directory' : 'Directorio de Calculadoras'}</span>
            </Link>
            <Link
              href="/peru/guias"
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition flex items-center gap-1.5 backdrop-blur-xs"
            >
              <span>📚</span>
              <span>{isEn ? 'Peru Legal Guides' : 'Guías Normativas'}</span>
            </Link>
            <Link
              href="/peru/blog"
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition flex items-center gap-1.5 backdrop-blur-xs"
            >
              <span>✍️</span>
              <span>{isEn ? 'Peru Articles & News' : 'Artículos y Novedades'}</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-black/25 hover:bg-black/40 text-red-200 transition flex items-center gap-1.5 ml-auto"
            >
              <span>🇲🇽</span>
              <span>{isEn ? 'Back to Mexico (Primary)' : 'Ir al Portal México (Principal)'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-14">
        {/* Navigation Breadcrumb */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {isEn ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Peru Portal' : 'Portal Perú'}
          </span>
        </nav>

        {/* 1. Official Indicators Panel */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              {isEn ? 'Official Regulatory Benchmarks' : 'Parámetros Oficiales Vigentes 2026'}
            </span>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              {isEn ? 'Current Statutory Values for Peru' : 'Valores y Tasas de Referencia en Perú'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isEn
                ? 'Primary parameters published in El Peruano gazette utilized by our calculation engines.'
                : 'Cifras publicadas en el Diario Oficial El Peruano utilizadas en todos los algoritmos de cálculo de nuestra plataforma.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {peruKeyIndicators.map((ind, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 space-y-2"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-red-600 dark:text-red-400">
                  <span>{ind.badge}</span>
                </div>
                <div className="text-2xl font-black text-slate-950 dark:text-white">{ind.value}</div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ind.label}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Full Suite of Peru Calculators */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                {isEn ? 'Interactive Simulators' : 'Herramientas Interactivas'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                {isEn ? 'Calculators for SUNAT & Labor Compliance' : 'Simuladores Tributarios y Laborales de Perú'}
              </h2>
            </div>
            <Link
              href="/peru/calculadoras"
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              {isEn ? 'View all calculators directory ➔' : 'Ver directorio completo ➔'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {peruCalculatorsList.map((calc, idx) => (
              <Link
                key={idx}
                href={calc.href}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{calc.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40">
                      {calc.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-950 dark:text-white group-hover:text-red-600 transition">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs font-bold text-red-600 dark:text-red-400">
                  <span>{isEn ? 'Calculate Now' : 'Calcular Ahora'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Peru Statutory Guides Preview */}
        <section className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                {isEn ? 'Statutory Explanations' : 'Fundamento Legal y Documentación'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {isEn ? 'Guides on Peruvian Tax & Labor Rules' : 'Guías Explicativas sobre Leyes en Perú'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isEn
                  ? 'Step-by-step breakdown of how deductions and benefits operate under Peruvian law.'
                  : 'Desglose detallado de fórmulas, plazos de pago de CTS y cómo aplicar la deducción de 7 UIT.'}
              </p>
            </div>
            <Link
              href="/peru/guias"
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition shrink-0"
            >
              {isEn ? 'View all Peru guides ➔' : 'Ver todas las guías de Perú ➔'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 space-y-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                {isEn ? 'CTS Semiannual Calculation' : 'Cálculo Semestral de la CTS'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn
                  ? 'How 1/6th of gratification is added to computable remuneration and deposited before May 15 and Nov 15.'
                  : 'Aprende cómo se suma el sexto de gratificación y la fórmula de días laborados entre 360.'}
              </p>
              <Link href="/calculadoras/peru/calculadora-cts-peru" className="text-xs font-bold text-red-600 hover:underline block pt-2">
                {isEn ? 'Use CTS tool ➔' : 'Usar calculadora CTS ➔'}
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 space-y-2">
              <span className="text-xl">🎁</span>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                {isEn ? 'July & December Gratifications' : 'Gratificaciones con Bono EsSalud'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn
                  ? 'Why legal gratifications are completely tax-exempt from AFP/ONP and include the 9% EsSalud bonus.'
                  : 'Entiende por qué las gratificaciones legales no sufren descuentos previsionales y pagan 9% adicional.'}
              </p>
              <Link href="/calculadoras/peru/calculadora-gratificacion-peru" className="text-xs font-bold text-red-600 hover:underline block pt-2">
                {isEn ? 'Use Gratification tool ➔' : 'Usar calculadora de gratificación ➔'}
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 space-y-2">
              <span className="text-xl">📑</span>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                {isEn ? '7 UIT Deduction for 5th Category' : 'Deducción de 7 UIT en Renta 5ta'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn
                  ? 'Annual projection of 14 salaries, deduction of S/ 37,450, and 12-month payroll factorization.'
                  : 'Cómo los empleadores proyectan tus 14 sueldos anuales y factorizan las retenciones cada mes.'}
              </p>
              <Link href="/calculadoras/peru/calculadora-quinta-categoria-peru" className="text-xs font-bold text-red-600 hover:underline block pt-2">
                {isEn ? 'Use 5th Category tool ➔' : 'Usar calculadora de renta 5ta ➔'}
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Disclaimers & Official Regulatory Notice */}
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            {isEn ? 'Official Regulatory Disclaimer (Peru)' : 'Aviso Legal y de Independencia (Perú)'}
          </h4>
          <p className="leading-relaxed">
            {isEn
              ? 'CalculadoraSAT.org is an independent educational platform and is not affiliated with, sponsored by, or an official entity of SUNAT (Superintendencia Nacional de Aduanas y de Administración Tributaria), SBS (Superintendencia de Banca, Seguros y AFP), or the Peruvian Ministry of Labor (MTPE). All simulations are for informative guidance only.'
              : 'CalculadoraSAT.org es una plataforma de software y educación financiera independiente. No es un portal gubernamental ni guarda relación oficial con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT), la Superintendencia de Banca, Seguros y AFP (SBS), ni el Ministerio de Trabajo y Promoción del Empleo (MTPE) del Perú. Para declaraciones juradas oficiales, utilice los sistemas de SUNAT Operaciones en Línea (SOL).'}
          </p>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
