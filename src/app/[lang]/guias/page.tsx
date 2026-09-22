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
  const seoAlternates = getSeoAlternates('guias', lang);

  const title = isEn
    ? 'Tax & Labor Knowledge Center: Practical Guides | Calculadora SAT'
    : 'Centro de Guías Fiscales y Laborales México 2026 | Calculadora SAT';
  const description = isEn
    ? 'Step-by-step practical guides on Mexican income tax (ISR), VAT formulas, RESICO regime comparisons, employee severance, and personal deductions under current statutory rules.'
    : 'Guías prácticas y fundamentadas paso a paso sobre cálculo de ISR, fórmulas de IVA (agregar o quitar), régimen RESICO, finiquito y liquidación LFT y deducciones personales SAT.';

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

export default async function GuiasIndexPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const guideClusters = [
    {
      clusterName: isEn ? 'Income Tax (ISR) Mastery' : 'Impuesto Sobre la Renta (ISR)',
      icon: '🏛️',
      desc: isEn
        ? 'Understand progressive marginal rates, Article 96 tables, provisional payments vs. annual returns.'
        : 'Aprende cómo funciona la tarifa progresiva del Artículo 96 de la LISR, la diferencia entre tasa marginal y efectiva, y cómo calcular tu retención salarial.',
      guides: [
        {
          title: isEn
            ? 'How to Calculate ISR in Mexico: Step-by-Step with Progressive Tables'
            : 'Cómo calcular el ISR en México (2026): Guía paso a paso con tarifas y ejemplos prácticos',
          excerpt: isEn
            ? 'Step-by-step tutorial on calculating Art. 96 income tax with lower limits, fixed quotas, and marginal surplus percentages.'
            : 'Aprende a aplicar la fórmula oficial del SAT con límite inferior, cuota fija y excedente marginal con dos casos numéricos resueltos.',
          href: `${langPrefix}/blog/como-calcular-el-isr-mexico-guia-paso-a-paso`,
          badge: 'Art. 96 LISR • Tarifas Oficiales',
          calcLink: `${langPrefix}/calculadoras/sat/calculadora-isr-pf`,
          calcName: 'Calculadora de ISR',
        },
      ],
    },
    {
      clusterName: isEn ? 'Value-Added Tax (VAT / IVA)' : 'Impuesto al Valor Agregado (IVA)',
      icon: '🧾',
      desc: isEn
        ? 'Mathematical formulas to add or remove standard 16% or border 8% VAT without errors.'
        : 'Fórmulas matemáticas para desglosar o agregar el 16% general y 8% fronterizo, cómo funciona el acreditamiento y el error de multiplicar por 0.16.',
      guides: [
        {
          title: isEn
            ? 'How to Calculate and Remove VAT in Mexico: Formulas for 16% and 8%'
            : 'Cómo calcular y desglosar el IVA en México: Fórmulas para agregar y quitar el 16%',
          excerpt: isEn
            ? 'Complete mathematical formulas to back out VAT from a gross price and how to claim input VAT against SAT obligations.'
            : 'Fórmula directa para desglosar el subtotal dividiendo entre 1.16, acreditamiento mensual de compras y demostración del error matemático.',
          href: `${langPrefix}/blog/como-calcular-quitar-iva-mexico-formulas`,
          badge: 'Ley del IVA • Tasa 16% y 8%',
          calcLink: `${langPrefix}/calculadoras/sat/calculadora-iva`,
          calcName: 'Calculadora de IVA',
        },
      ],
    },
    {
      clusterName: isEn ? 'Simplified Trust Regime (RESICO)' : 'Régimen Simplificado (RESICO)',
      icon: '🌱',
      desc: isEn
        ? 'Preferential flat tax rates (1% to 2.5%), break-even margins, and corporate shareholder disqualifications.'
        : 'Comparativa de tasas efectivas, impacto de gastos deducibles, punto de equilibrio y restricciones para socios o accionistas.',
      guides: [
        {
          title: isEn
            ? 'RESICO vs. General Tax Regime in Mexico: 2026 Comparison'
            : 'RESICO vs Actividad Empresarial: ¿Cuál te conviene más en 2026?',
          excerpt: isEn
            ? 'Compare effective tax liabilities, break-even profit margins, and corporate shareholder restrictions.'
            : 'Analiza si te conviene pagar del 1% al 2.5% sobre ingresos brutos o tributar sobre utilidad neta deduciendo gastos.',
          href: `${langPrefix}/blog/resico-vs-actividad-empresarial-cual-conviene-2026`,
          badge: 'Art. 113-E LISR • 1% - 2.5%',
          calcLink: `${langPrefix}/calculadoras/resico/comparador-resico-actividad-empresarial`,
          calcName: 'Comparador RESICO',
        },
      ],
    },
    {
      clusterName: isEn ? 'Labor Rights & Severance (LFT)' : 'Derechos Laborales y Finiquito (LFT)',
      icon: '⚖️',
      desc: isEn
        ? 'Statutory rights under dismissal or resignation, mandatory LFT deadlines, and free legal aid.'
        : 'Diferencia jurídica entre finiquito y liquidación, plazos de prescripción de 2 meses y 1 año, y trámite ante PROFEDET.',
      guides: [
        {
          title: isEn
            ? 'Severance Pay and Finiquito Under Mexican Labor Law (LFT)'
            : 'Qué hacer si no te pagan el finiquito de ley en México: Guía paso a paso',
          excerpt: isEn
            ? 'Understand the difference between accrued rights and constitutional severance, plus step-by-step actions if your employer refuses to pay.'
            : 'Conoce los plazos legales para recibir tu pago, qué conceptos te tocan y cómo solicitar la audiencia de conciliación prejudicial.',
          href: `${langPrefix}/blog/que-hacer-si-no-te-pagan-finiquito-de-ley-mexico`,
          badge: 'Art. 48 & 50 LFT • PROFEDET',
          calcLink: `${langPrefix}/calculadoras/nomina/calculadora-finiquito-liquidacion`,
          calcName: 'Calculadora de Finiquito',
        },
      ],
    },
    {
      clusterName: isEn ? 'Annual Deductions & Refunds' : 'Deducciones Personales y Saldo a Favor',
      icon: '📋',
      desc: isEn
        ? 'Statutory spending categories accepted by SAT in annual returns, 5-UMA caps, and payment methods.'
        : 'Gastos de salud, educación privada, hipoteca y retiro deducibles en abril, límite del 15% o 5 UMAs y claves de CFDI.',
      guides: [
        {
          title: isEn
            ? 'Personal Tax Deductions in Mexico (SAT 2026): Annual Limits & UMA Caps'
            : 'Deducciones Personales SAT 2026: Guía Completa, Límites en UMA y Requisitos',
          excerpt: isEn
            ? 'Learn which expenses qualify under Article 151 of the LISR, UMA caps, private school tuition ceilings, and how to obtain your annual refund.'
            : 'Conoce los gastos que autoriza el Artículo 151 de la LISR, topes en pesos, reglas de pago con tarjeta y cómo solicitar la devolución de saldo a favor.',
          href: `${langPrefix}/blog/deducciones-personales-sat-2026-guia-y-limites`,
          badge: 'Art. 151 LISR • 5 UMA / 15%',
          calcLink: `${langPrefix}/calculadoras/sat/calculadora-conversor-uma`,
          calcName: 'Calculadora de UMA',
        },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-800 via-indigo-900 to-slate-950 text-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/15 uppercase tracking-wider mb-4">
            <span>📚</span>
            <span>{isEn ? 'Knowledge Center • Tax & Labor Law' : 'Centro de Asesoría • Marco Legal Mexicano'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Tax & Labor Practical Guides' : 'Guías Fiscales y Laborales'}
          </h1>
          <p className="mt-3 text-blue-100/90 max-w-3xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Comprehensive educational resources with real mathematical examples, statutory legal references (LISR, LFT, LIVA), and actionable procedures for workers, independent contractors, and SMEs in Mexico.'
              : 'Manuales y artículos educativos desarrollados con rigor técnico, fórmulas matemáticas transparentes y citas expresas a la Ley del ISR, Ley del IVA y Ley Federal del Trabajo en México.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-12">
        {/* Navigation Breadcrumb */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href={langPrefix || '/'} className="hover:text-blue-600 transition-colors">
            {isEn ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Guides' : 'Guías'}
          </span>
        </nav>

        {/* Knowledge Clusters Grid */}
        <div className="space-y-10">
          {guideClusters.map((cluster, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cluster.icon}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                      {cluster.clusterName}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {cluster.desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {cluster.guides.map((guide, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-blue-500/80 transition"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                          {guide.badge}
                        </span>
                      </div>
                      <Link href={guide.href}>
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {guide.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {guide.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                      <Link
                        href={guide.calcLink}
                        className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900 transition flex items-center gap-1"
                      >
                        <span>🧮</span>
                        <span>{guide.calcName}</span>
                      </Link>
                      <Link
                        href={guide.href}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      >
                        <span>{isEn ? 'Read Guide' : 'Leer Guía'}</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology and Sources Trust Banner */}
        <section className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-slate-100 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              {isEn ? 'Rigorous Editorial & Verification Methodology' : 'Metodología Editorial y Verificación de Leyes'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {isEn
                ? 'All guides are cross-checked directly against statutory gazettes (DOF), federal court precedents, and official tax resolutions.'
                : 'Todas nuestras guías se validan directamente contra decretos del Diario Oficial de la Federación (DOF), circulares del SAT y jurisprudencia laboral.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`${langPrefix}/metodologia`}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition"
            >
              {isEn ? 'Methodology' : 'Metodología'}
            </Link>
            <Link
              href={`${langPrefix}/fuentes`}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
            >
              {isEn ? 'Official Sources' : 'Fuentes Oficiales'}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
