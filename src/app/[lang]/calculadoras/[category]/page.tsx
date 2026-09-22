import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { getCalculatorsByCategory } from '../../../../calculators';
import dynamic from 'next/dynamic';
const AIAssistant = dynamic(() => import('../../../../components/AI/AIAssistant'));
import LanguageSelector from '../../../../components/LanguageSelector';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{
    lang: string;
    category: string;
  }>;
}

const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  'hipotecas': 'finanzas-personales',
  'prestamos': 'finanzas-personales',
  'interes-compuesto': 'finanzas-personales',
  'inversiones': 'finanzas-personales',
  'contabilidad': 'negocios',
  'conversiones': 'sat',
  'tipo-de-cambio': 'finanzas-personales',
};

const categoryTranslations: Record<string, Record<string, { name: string; desc: string; icon: string }>> = {
  'es': {
    'sat': {
      name: 'Impuestos Federales SAT',
      desc: 'Calcula tus obligaciones fiscales ante el SAT como el IVA (16% u 8%), ISR Personas Físicas y Morales, valores oficiales de la UMA, recargos y actualizaciones.',
      icon: '🏛️'
    },
    'resico': {
      name: 'RESICO (Régimen Simplificado)',
      desc: 'Simuladores y comparadores para el Régimen Simplificado de Confianza del SAT con tasas mínimas del 1% al 2.5% para personas físicas.',
      icon: '🌱'
    },
    'nomina': {
      name: 'Nómina y Ley Federal del Trabajo',
      desc: 'Calcula salarios netos, aguinaldo, vacaciones dignas, finiquito, liquidación de 3 meses, utilidades (PTU), cuotas obreras IMSS y horas extra conforme a la LFT.',
      icon: '💼'
    },
    'finanzas-personales': {
      name: 'Finanzas Personales, Créditos e Inversiones',
      desc: 'Herramientas de planeación patrimonial, inversiones en CETES, Afore, créditos hipotecarios, préstamos personales, interés compuesto, amortización de tarjetas y regla 50/30/20.',
      icon: '🪙'
    },
    'negocios': {
      name: 'Negocios y Contabilidad',
      desc: 'Herramientas financieras y contables para emprendedores y PyMEs: cálculo del punto de equilibrio (break-even) y depreciación fiscal de activos conforme a la Ley del ISR.',
      icon: '🏢'
    },
    'peru': {
      name: 'Herramientas Perú (SUNAT)',
      desc: 'Calculadoras laborales, tributarias y cambiarias para Perú: IGV (18%), CTS, Gratificaciones, Renta 5ta Categoría, Validador RUC y Tipo de Cambio SUNAT.',
      icon: '🇵🇪'
    }
  },
  'en': {
    'sat': {
      name: 'Federal Taxes (SAT Mexico)',
      desc: 'Calculate tax obligations with the Mexican SAT such as VAT (IVA 16% or 8%), personal and corporate income tax (ISR), official UMA values, and surcharges.',
      icon: '🏛️'
    },
    'resico': {
      name: 'RESICO (Simplified Trust Regime)',
      desc: 'Simulators and comparisons for the Simplified Trust Regime (RESICO) of the SAT with effective tax rates from 1% to 2.5%.',
      icon: '🌱'
    },
    'nomina': {
      name: 'Payroll & Federal Labor Law (LFT)',
      desc: 'Calculate net salaries, statutory Christmas bonuses (Aguinaldo), vacation pay, severance pay (Finiquito), profit sharing (PTU), and IMSS contributions.',
      icon: '💼'
    },
    'finanzas-personales': {
      name: 'Personal Finance, Credit & Investments',
      desc: 'Financial planning tools: CETES government bonds, Afore retirement projections, mortgages, personal loans, compound interest, and credit card payoff.',
      icon: '🪙'
    },
    'negocios': {
      name: 'Business & Accounting',
      desc: 'Financial and accounting tools for entrepreneurs and SMEs: break-even point analysis and straight-line tax depreciation under Mexican LISR.',
      icon: '🏢'
    },
    'peru': {
      name: 'Peru Tools (SUNAT)',
      desc: 'Labor, tax, and currency calculators for Peru: IGV (18% VAT), CTS, Gratifications, 5th Category Tax, RUC validator, and official SUNAT exchange rates.',
      icon: '🇵🇪'
    }
  }
};

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  // 301 Permanent Redirect for consolidated legacy categories
  const targetCategory = LEGACY_CATEGORY_REDIRECTS[resolvedParams.category];
  if (targetCategory) {
    const langPrefix = lang === 'en' ? '/en' : '';
    permanentRedirect(`${langPrefix}/calculadoras/${targetCategory}`);
  }

  const categoryInfo = categoryTranslations[lang]?.[resolvedParams.category] || categoryTranslations['es'][resolvedParams.category];

  if (!categoryInfo) {
    return {
      title: lang === 'en' ? 'Category Not Found' : 'Categoría no encontrada',
      description: lang === 'en' ? 'The requested category does not exist.' : 'La categoría de calculadora solicitada no existe.',
    };
  }

  const seoAlternates = getSeoAlternates(`calculadoras/${resolvedParams.category}`, lang);

  return {
    title: lang === 'en' ? `Calculators for ${categoryInfo.name} 2026 - SAT & Finance` : `Calculadoras de ${categoryInfo.name} 2026 - SAT y Finanzas`,
    description: categoryInfo.desc,
    alternates: seoAlternates,
    openGraph: {
      title: lang === 'en' ? `Calculators for ${categoryInfo.name} 2026 - SAT & Finance` : `Calculadoras de ${categoryInfo.name} 2026 - SAT y Finanzas`,
      description: categoryInfo.desc,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const categorySlug = resolvedParams.category;

  // 301 Permanent Redirect for consolidated legacy categories
  const targetCategory = LEGACY_CATEGORY_REDIRECTS[categorySlug];
  if (targetCategory) {
    const langPrefix = lang === 'en' ? '/en' : '';
    permanentRedirect(`${langPrefix}/calculadoras/${targetCategory}`);
  }
  
  const categoryInfo = categoryTranslations[lang]?.[categorySlug] || categoryTranslations['es'][categorySlug];

  if (!categoryInfo) {
    notFound();
  }

  const baseCalculators = getCalculatorsByCategory(categorySlug);
  const categoryCalculators = baseCalculators.map(calc => {
    if (lang === 'en' && calc.translations?.en) {
      const trans = calc.translations.en;
      return {
        ...calc,
        title: trans.title || calc.title,
        shortDescription: trans.shortDescription || calc.shortDescription,
        category: trans.category || calc.category
      };
    }
    return calc;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="text-5xl bg-white/10 p-5 rounded-2xl border border-white/10 shadow-inner">
            {categoryInfo.icon}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {categoryInfo.name}
            </h1>
            <p className="mt-2 text-blue-100/90 max-w-2xl font-medium text-sm sm:text-base">
              {categoryInfo.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow">
        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">
            {lang === 'en' ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{categoryInfo.name}</span>
        </nav>

        {categoryCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={`${lang === 'en' ? '/en' : ''}/calculadoras/${calc.categorySlug}/${calc.slug}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {calc.category}
                  </span>
                  <h3 className="text-lg font-bold mt-2 text-slate-950 dark:text-white">
                    {calc.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    {calc.shortDescription}
                  </p>
                </div>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold mt-6 flex items-center">
                  {lang === 'en' ? 'Go to calculate ➔' : 'Ir a calcular ➔'}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            {lang === 'en' ? 'No calculators have been published under this category yet. Check back soon for new tools.' : 'Aún no se han publicado calculadoras bajo esta categoría. Vuelve pronto para ver nuevas herramientas.'}
          </div>
        )}
      </main>

      <Footer lang={lang} />

      {/* Contextual AI Assistant */}
      <AIAssistant activeCalculatorContext={`Categoría ${categoryInfo.name}`} />
    </div>
  );
}
