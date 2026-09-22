import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators } from '@/calculators';
import esDict from '@/dictionaries/es.json';
import enDict from '@/dictionaries/en.json';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeInteractive from '@/components/HomeInteractive';
import AIOpenButton from '@/components/AIOpenButton';
import AIAssistantClient from '@/components/AI/AIAssistantClient';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const seoAlternates = getSeoAlternates('', lang);

  const title = isEn
    ? 'Tax & Labor Calculators Mexico 2026 | Calculadora SAT'
    : '🧮 Calculadora SAT 2026 — IVA, ISR, RESICO y Nómina Gratis Online';
  const description = isEn
    ? 'Accurate Mexican tax and payroll calculators for 2026: calculate VAT (IVA), personal income tax (ISR), RESICO, severance, and year-end bonuses under current legislation.'
    : 'Plataforma independiente e interactiva de cálculo fiscal y de nómina en México 2026. Calcula IVA (16% u 8%), ISR Art. 96 y 152, RESICO, aguinaldo, finiquito y cuotas IMSS gratis conforme a leyes vigentes.';

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
      type: 'website',
      images: [
        {
          url: 'https://www.calculadorasat.org/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Calculadora SAT — Plataforma Fiscal y Laboral México 2026',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.calculadorasat.org/og-image.png'],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const dict = lang === 'en' ? enDict : esDict;
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const searchableCalculators = calculators.map((calc) => {
    const trans = isEn ? calc.translations?.en : null;
    return {
      id: calc.id,
      title: trans?.title || calc.title,
      shortDescription: trans?.shortDescription || calc.shortDescription,
      category: trans?.category || calc.category,
      categorySlug: calc.categorySlug,
      slug: calc.slug,
    };
  });

  // Curated High-Traffic Mexico Core Calculators
  const mexicoTopCalculators = [
    {
      title: isEn ? 'Personal Income Tax (ISR)' : 'Calculadora de ISR Personas Físicas',
      desc: isEn ? 'Progressive Art. 96 & 152 LISR tables for salaried and business income.' : 'Calcula el impuesto a retener según las tarifas del Art. 96 y 152 de la LISR.',
      badge: isEn ? 'Income Tax • Art. 96 LISR' : 'Tarifas Art. 96 y 152 LISR',
      href: `${langPrefix}/calculadoras/sat/calculadora-isr-pf`,
      icon: '🏛️',
    },
    {
      title: isEn ? 'Net vs. Gross Salary Calculator' : 'Calculadora de Salario Neto vs. Bruto',
      desc: isEn ? 'Accurate itemization of employee IMSS quota and ISR tax withholdings.' : 'Desglose exacto de retención de ISR y cuota obrera del IMSS sobre tu sueldo.',
      badge: isEn ? 'Payroll • IMSS & ISR' : 'Nómina • Retenciones IMSS e ISR',
      href: `${langPrefix}/calculadoras/nomina/calculadora-salario-neto-bruto`,
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
      href: `${langPrefix}/calculadoras/nomina/calculadora-finiquito-liquidacion`,
      icon: '⚖️',
    },
    {
      title: isEn ? 'IMSS Quoted Weeks & Pension' : 'Semanas Cotizadas IMSS y Pensión',
      desc: isEn ? 'Estimate qualifying weeks and retirement pension under Ley 73 and Ley 97.' : 'Estima tus semanas acumuladas en el IMSS y proyecta tu pensión Ley 73 o Ley 97.',
      badge: isEn ? 'Social Security • Ley 73 / 97' : 'Seguridad Social • Ley 73 / 97',
      href: `${langPrefix}/calculadoras/nomina/calculadora-semanas-cotizadas-imss`,
      icon: '📋',
    },
    {
      title: isEn ? 'CETES Directo Investment Yield' : 'Calculadora de CETES Directo',
      desc: isEn ? 'Gross and net returns across 28, 91, 182, and 364 days with provisional tax.' : 'Proyecta tus rendimientos brutos y netos a 28, 91, 182 y 364 días con retención ISR.',
      badge: isEn ? 'Treasury Bills • Fixed Income' : 'Renta Fija Gubernamental',
      href: `${langPrefix}/calculadoras/inversiones/calculadora-cetes-directo`,
      icon: '📈',
    },
  ];

  // Segregated Peru Tools Suite (Canonical /calculadoras/peru/* routes)
  const peruTools = [
    {
      title: isEn ? 'Peru IGV Calculator (18%)' : 'Calculadora de IGV Perú (18%)',
      desc: isEn ? 'Break down or add 18% (16% IGV + 2% IPM) for SUNAT electronic receipts.' : 'Agrega o desglosa el 18% del Impuesto General a las Ventas para comprobantes SUNAT.',
      badge: 'D.S. N° 055-99-EF • 18%',
      href: `/calculadoras/peru/calculadora-igv-peru`,
      icon: '🇵🇪',
    },
    {
      title: isEn ? 'Official SUNAT Exchange Rate' : 'Tipo de Cambio SUNAT',
      desc: isEn ? 'Official daily USD/PEN rate published by SUNAT/SBS for accounting and taxes.' : 'Cotización tributaria oficial de compra y venta aplicable a facturación y PDT.',
      badge: isEn ? 'Official SBS/SUNAT Rate' : 'Cotización Oficial SBS / SUNAT',
      href: `/calculadoras/peru/tipo-de-cambio-sunat`,
      icon: '💱',
    },
    {
      title: isEn ? 'Peru CTS Calculator' : 'Calculadora de CTS Perú',
      desc: isEn ? 'Statutory severance reserve deposit for May and November periods.' : 'Compensación por Tiempo de Servicios con la sexta parte de la gratificación computable.',
      badge: 'D.S. N° 001-97-TR',
      href: `/calculadoras/peru/calculadora-cts-peru`,
      icon: '🏦',
    },
    {
      title: isEn ? 'Peru Gratification Calculator' : 'Calculadora de Gratificación',
      desc: isEn ? 'July & December bonuses plus 9% EsSalud or 6.75% EPS extraordinary bonus.' : 'Fiestas Patrias y Navidad con Bonificación Extraordinaria de EsSalud (9%) o EPS.',
      badge: 'Ley N° 27735 & Ley N° 30334',
      href: `/calculadoras/peru/calculadora-gratificacion-peru`,
      icon: '🎁',
    },
    {
      title: isEn ? '5th Category Income Tax' : 'Renta de 5ta Categoría 2026',
      desc: isEn ? 'Progressive brackets (8% to 30%) with automatic 7 UIT deduction (S/ 5,350).' : 'Retención de planilla dependiente con deducción de 7 UIT (UIT 2026: S/ 5,350).',
      badge: 'D.S. N° 179-2004-EF • 7 UIT',
      href: `/calculadoras/peru/calculadora-quinta-categoria-peru`,
      icon: '📑',
    },
    {
      title: isEn ? 'RUC Validator Peru' : 'Validador de RUC',
      desc: isEn ? '11-digit Modulo 11 check digit verification and link to official SUNAT lookup.' : 'Comprueba la sintaxis de 11 dígitos y el dígito verificador Módulo 11.',
      badge: isEn ? 'Modulo 11 Algorithm' : 'Algoritmo Módulo 11 SUNAT',
      href: `/calculadoras/peru/consulta-ruc-sunat`,
      icon: '🔍',
    },
  ];

  const categories = [
    { name: isEn ? 'Federal Taxes (SAT)' : 'Impuestos Federales (SAT)', slug: 'sat', icon: '🏛️', desc: isEn ? 'ISR, VAT, RESICO and withholding taxes' : 'ISR, IVA, RESICO y retenciones fiscales' },
    { name: isEn ? 'Payroll & Labor (LFT)' : 'Nómina y Prestaciones (LFT)', slug: 'nomina', icon: '💼', desc: isEn ? 'Net salary, bonuses, severance, and vacation' : 'Salario neto, aguinaldo, finiquito y vacaciones' },
    { name: isEn ? 'Social Security (IMSS)' : 'Seguridad Social (IMSS)', slug: 'nomina', icon: '📋', desc: isEn ? 'Quoted weeks and pension estimation' : 'Semanas cotizadas y pensión Ley 73 / 97' },
    { name: isEn ? 'Investments & Treasury' : 'Inversiones y CETES', slug: 'inversiones', icon: '📈', desc: isEn ? 'Fixed income yields and government debt' : 'Rendimientos de CETES y renta fija' },
    { name: isEn ? 'Mortgages & Real Estate' : 'Hipotecas y Créditos', slug: 'hipotecas', icon: '🏠', desc: isEn ? 'Amortization schedules and home loans' : 'Simulación de amortización y crédito hipotecario' },
    { name: isEn ? 'Personal Finance' : 'Finanzas Personales', slug: 'finanzas-personales', icon: '🪙', desc: isEn ? 'Compound interest and retirement savings' : 'Interés compuesto, regla 50/30/20 y ahorro' },
    { name: isEn ? 'Exchange Rates & Currencies' : 'Divisas y Conversiones', slug: 'conversiones', icon: '💱', desc: isEn ? 'Official FIX and interbank currencies' : 'Tipo de cambio FIX DOF y conversión de monedas' },
    { name: isEn ? 'Peru Suite (SUNAT)' : 'Herramientas Perú (SUNAT)', slug: 'peru', icon: '🇵🇪', desc: isEn ? 'IGV 18%, CTS, Gratifications, and SUNAT rates' : 'IGV 18%, CTS, gratificaciones y divisas en soles' },
  ];

  // WebSite & Organization Structured Data
  const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.calculadorasat.org/#website',
        url: 'https://www.calculadorasat.org',
        name: 'Calculadora SAT',
        description: 'Plataforma oficial de calculadoras fiscales y laborales de México 2026',
        inLanguage: isEn ? 'en-US' : 'es-MX',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.calculadorasat.org/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.calculadorasat.org/#organization',
        name: 'Calculadora SAT',
        url: 'https://www.calculadorasat.org',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.calculadorasat.org/icon.png',
        },
        founder: {
          '@type': 'Person',
          name: 'Firoz Khan',
          url: 'https://www.linkedin.com/in/firoz-khan-1153358a/',
        },
        publishingPrinciples: 'https://www.calculadorasat.org/about',
      },
    ],
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />

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

          {/* Interactive Client Search & Dashboard */}
          <HomeInteractive lang={lang} allCalculators={searchableCalculators} />
        </div>
      </section>

      {/* Main Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* 1. Value Proposition: Why This Platform Exists */}
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
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850/80 space-y-2">
              <div className="text-2xl">🔒</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {isEn ? 'Total Device Privacy' : 'Privacidad Total en Tu Dispositivo'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn ? 'Calculations execute locally in your browser. Your salary and financial data never leave your device.' : 'Los cálculos se ejecutan en tu navegador. Tus ingresos o cifras financieras jamás se transmiten ni guardan en servidores externos.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850/80 space-y-2">
              <div className="text-2xl">📐</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {isEn ? 'Step-by-Step Breakdown' : 'Fórmulas y Pasos Transparentes'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn ? 'No black-box guesses. We display lower limit, marginal excess, tax bracket, and fixed quota line-by-line.' : 'Sin cálculos opacos. Te mostramos el límite inferior, excedente imponible, cuota fija y tasa marginal paso a paso.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850/80 space-y-2">
              <div className="text-2xl">⚖️</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {isEn ? 'Statutory Legal Citations' : 'Fundamento Normativo Real'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn ? 'Every simulator explicitly cites applicable articles from the LISR, LFT, LSS, and official government gazettes.' : 'Cada calculadora cita puntualmente los artículos aplicables de la LISR, LFT, Ley del IMSS y Resoluciones Misceláneas.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850/80 space-y-2">
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

        {/* 2. Curated Popular Calculators for Mexico (8 Essential Tools) */}
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
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/80 dark:hover:border-blue-400/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{calc.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                      {calc.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>{isEn ? 'Calculate Now' : 'Calcular Ahora'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Specialized Peru Section */}
        <section id="herramientas-peru" className="scroll-mt-20 space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-gradient-to-r from-red-600/10 via-slate-100 to-red-600/10 dark:from-red-950/30 dark:via-slate-900 dark:to-red-950/30 p-6 rounded-3xl border border-red-200/60 dark:border-red-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-3xl">🇵🇪</span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    {isEn ? 'International Module • Peru' : 'Módulo Internacional • Perú (SUNAT y Laboral)'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                    {isEn ? 'Specialized Calculators for Peru' : 'Herramientas Tributarias y Laborales de Perú'}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl">
                    {isEn
                      ? 'Compliant with SUNAT resolutions, Superintendencia de Banca y Seguros (SBS), and Peruvian labor legislation (CTS, Gratifications, IGV 18%, and 5th Category Income Tax).'
                      : 'Herramientas basadas en la normativa de SUNAT, SBS y legislación laboral peruana (CTS, Gratificaciones de Julio/Diciembre, IGV 18% y Renta de 5ta Categoría).'}
                  </p>
                </div>
              </div>
              <Link
                href="/peru"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition whitespace-nowrap self-start sm:self-auto"
              >
                {isEn ? 'Enter Peru Portal ➔' : 'Ir al Portal Perú ➔'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {peruTools.map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.href}
                  className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 hover:border-red-400 dark:hover:border-red-600 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition flex items-center gap-1.5">
                        <span>{tool.icon}</span>
                        <span>{tool.title}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-850/80 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-400">{tool.badge}</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">➔</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Directory by Category */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {isEn ? 'Complete Architecture' : 'Directorio de Herramientas'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              {isEn ? 'Calculators by Fiscal & Financial Category' : 'Calculadoras por Categoría Fiscal y Financiera'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`${langPrefix}/calculadoras/${cat.slug}`}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 transition group"
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {cat.desc}
                </p>
                <div className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>{isEn ? 'Explore category' : 'Explorar categoría'}</span>
                  <span>➔</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Methodology & Formula Maintenance Transparency */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">1. DOF y Marco Fiscal (México):</strong>
              {isEn
                ? 'We track federal tax decrees, the annual Resolución Miscelánea Fiscal (RMF), and official Annex 8 tables for progressive ISR brackets (LISR).'
                : 'Monitoreamos publicaciones del DOF, la RMF y el CFF para sincronizar las tarifas progresivas del ISR (Art. 96 y 152 LISR).'}
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">2. INEGI, CONASAMI e IMSS:</strong>
              {isEn
                ? 'UMA indexes are refreshed each January (effective Feb 1), minimum wages are audited per zone (General/ZLFN), and social security contribution limits (25 UMAs) are kept compliant.'
                : 'El valor de la UMA se actualiza cada enero con vigor en febrero, salarios mínimos por zona según CONASAMI y topes de cotización IMSS a 25 UMAs.'}
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">3. Módulo Especializado (Perú):</strong>
              {isEn
                ? 'Peruvian tools operate under separate statutory sources (El Peruano, MEF for UIT values, and SUNAT for 18% IGV and payroll withholdings).'
                : 'Las herramientas de Perú constituyen un módulo complementario basado en decretos del MEF (UIT anual), SBS y resoluciones de la SUNAT.'}
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850">
              <strong className="text-slate-900 dark:text-white block mb-1">4. Iniciativa y Dirección Editorial:</strong>
              {isEn
                ? 'Calculadora SAT is an independent digital initiative developed by FkDigitalMedia under the direction of Firoz Khan, focused on algorithm transparency.'
                : 'Iniciativa digital independiente desarrollada por FkDigitalMedia bajo la dirección de Firoz Khan, enfocada en transparencia algorítmica y neutralidad.'}
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

        {/* 6. Educational Guides & Trust Notice */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
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
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 hover:border-blue-500 transition flex items-start gap-3 group"
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
                  href="/calendario-fiscal"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 hover:border-blue-500 transition flex items-start gap-3 group"
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
                  href="/formatos"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 hover:border-blue-500 transition flex items-start gap-3 group"
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

        {/* 7. AI Assistant Callout */}
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
          <AIOpenButton label={dict.ai_callout.button} />
        </section>

      </main>

      <Footer lang={lang} />
      <AIAssistantClient />
    </div>
  );
}
