import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { calculators, getCalculatorBySlug, getCalculatorsByCategory } from '../../../../../calculators';
import { CalculatorConfig } from '../../../../../types/calculator';
import CalculatorEngine from '../../../../../components/CalculatorEngine';
import CalculatorEducationalContent from '../../../../../components/CalculatorEducationalContent';
import RichSnippets from '../../../../../components/SEO/RichSnippets';
import dynamic from 'next/dynamic';
const AIAssistant = dynamic(() => import('../../../../../components/AI/AIAssistant'));
import LanguageSelector from '../../../../../components/LanguageSelector';
import ThemeToggle from '../../../../../components/ThemeToggle';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    lang: string;
    category: string;
    slug: string;
  }>;
}

function getLocalizedConfig(config: any, lang: string) {
  if (lang === 'es' || !config.translations || !config.translations[lang]) {
    return config;
  }
  const trans = config.translations[lang];
  return {
    ...config,
    title: trans.title || config.title,
    shortDescription: trans.shortDescription || config.shortDescription,
    category: trans.category || config.category,
    seo: {
      ...config.seo,
      ...(trans.seo || {})
    },
    content: trans.content ? { ...config.content, ...trans.content } : config.content,
  };
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const baseCalculator = getCalculatorBySlug(resolvedParams.slug);

  if (!baseCalculator) {
    return {
      title: lang === 'en' ? 'Calculator Not Found' : 'Calculadora no encontrada',
      description: lang === 'en' ? 'The requested calculator does not exist.' : 'La calculadora solicitada no existe o ha sido movida.',
    };
  }

  // If accessed with wrong category or alias slug, permanently redirect to canonical URL
  if ((baseCalculator.categorySlug && resolvedParams.category !== baseCalculator.categorySlug) || resolvedParams.slug !== baseCalculator.slug) {
    const langPrefix = lang === 'en' ? '/en' : '';
    permanentRedirect(`${langPrefix}/calculadoras/${baseCalculator.categorySlug}/${baseCalculator.slug}`);
  }

  const calculator = getLocalizedConfig(baseCalculator, lang);
  const canonicalCategory = baseCalculator.categorySlug || resolvedParams.category;
  const seoAlternates = getSeoAlternates(`calculadoras/${canonicalCategory}/${resolvedParams.slug}`, lang);

  return {
    title: calculator.seo.metaTitle,
    description: calculator.seo.metaDescription,
    keywords: calculator.seo.keywords.join(', '),
    alternates: seoAlternates,
    openGraph: {
      title: calculator.seo.metaTitle,
      description: calculator.seo.metaDescription,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      type: 'website',
    },
  };
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function CalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const baseCalculator = getCalculatorBySlug(resolvedParams.slug);

  if (!baseCalculator) {
    notFound();
  }

  // Canonical Category & Slug Enforcement (301 Permanent Redirect)
  // If the category in the URL does not match the calculator's true canonical category,
  // or if accessed via an alias slug, permanently redirect to eliminate duplicate URLs
  if ((baseCalculator.categorySlug && resolvedParams.category !== baseCalculator.categorySlug) || resolvedParams.slug !== baseCalculator.slug) {
    const langPrefix = lang === 'en' ? '/en' : '';
    permanentRedirect(`${langPrefix}/calculadoras/${baseCalculator.categorySlug}/${baseCalculator.slug}`);
  }

  const calculator = getLocalizedConfig(baseCalculator, lang);
  const canonicalCategory = baseCalculator.categorySlug || resolvedParams.category;
  const currentUrl = `https://www.calculadorasat.org/${lang === 'en' ? 'en/' : ''}calculadoras/${canonicalCategory}/${resolvedParams.slug}`;

  let relatedCalculators: CalculatorConfig[] = [];
  if (calculator.content?.relatedCalculators && calculator.content.relatedCalculators.length > 0) {
    relatedCalculators = calculator.content.relatedCalculators
      .map((slugOrPath: string) => {
        const slug = slugOrPath.includes('/') ? slugOrPath.split('/')[1] : slugOrPath;
        return calculators.find((c) => c.slug === slug || c.id === slug);
      })
      .filter((c: any): c is CalculatorConfig => Boolean(c))
      .map((c: CalculatorConfig) => getLocalizedConfig(c, lang));
  }

  if (relatedCalculators.length === 0) {
    relatedCalculators = getCalculatorsByCategory(calculator.categorySlug || resolvedParams.category)
      .filter((c) => c.slug !== resolvedParams.slug)
      .slice(0, 3)
      .map((c) => getLocalizedConfig(c, lang));
  }

  if (relatedCalculators.length === 0) {
    relatedCalculators = calculators
      .filter((c) => c.slug !== resolvedParams.slug)
      .slice(0, 3)
      .map((c) => getLocalizedConfig(c, lang));
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-grow">
        {/* Dynamic SEO JSON-LD Schemas */}
        <RichSnippets config={calculator} url={currentUrl} />

        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">
            {lang === 'en' ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={lang === 'en' ? `/en/calculadoras/${resolvedParams.category}` : `/calculadoras/${resolvedParams.category}`} className="hover:text-blue-600 transition-colors capitalize">
            {calculator.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {calculator.title}
          </span>
        </nav>

        {/* Main Engine Component */}
        <CalculatorEngine slug={resolvedParams.slug} lang={lang} />

        {/* Server-Rendered Educational Content, Methodology, FAQs & Related Tools */}
        <CalculatorEducationalContent
          config={calculator}
          lang={lang}
          relatedCalculators={relatedCalculators}
        />

        {/* Contextual AI Assistant Drawer */}
        <AIAssistant activeCalculatorContext={calculator.title} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
