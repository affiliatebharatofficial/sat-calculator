import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeveloperPlayground from '@/components/DeveloperPlayground';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  const title = isEn
    ? 'Developer Portal & Tax API'
    : 'Portal para Desarrolladores y API Fiscal SAT';
  const description = isEn
    ? 'Integrate Mexican tax, payroll, and VAT formulas into your ERP, CRM, or billing system with the CalculadoraSAT REST API.'
    : 'Integra fórmulas de impuestos mexicanos (ISR, IVA, IMSS, salario) en tu ERP, CRM o sistema de facturación con la API REST de CalculadoraSAT.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? 'https://www.calculadorasat.org/en/developer' : 'https://www.calculadorasat.org/developer',
      languages: {
        es: 'https://www.calculadorasat.org/developer',
        en: 'https://www.calculadorasat.org/en/developer',
        'x-default': 'https://www.calculadorasat.org/developer',
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? 'https://www.calculadorasat.org/en/developer' : 'https://www.calculadorasat.org/developer',
      siteName: 'CalculadoraSAT',
      images: [
        {
          url: 'https://www.calculadorasat.org/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isEn ? 'en_US' : 'es_MX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.calculadorasat.org/og-image.png'],
    },
  };
}

export default async function DeveloperPortal({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-100 font-sans flex flex-col justify-between">
        <Header lang={lang} />

        <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
          {/* Hero Section */}
          <section className="mb-16 text-center md:text-left">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/40 rounded-full border border-blue-900/50">
              Financial and SAT Mexico Calculations API
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mt-4 sm:text-5xl">
              Integrate our formulas into your software
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl">
              Connect your ERP, CRM, human resources, or billing software to our commercial tax calculation API. Obtain 100% updated ISR, IMSS, and VAT (IVA) withholdings according to the current legal framework.
            </p>
          </section>

          <DeveloperPlayground lang={lang} />
        </main>

        <Footer lang="en" />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        {/* Hero Section */}
        <section className="mb-16 text-center md:text-left">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-955/40 rounded-full border border-blue-900/50">
            API de Cálculos Financieros y SAT México
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-4 sm:text-5xl">
            Integra nuestras fórmulas en tu software
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl">
            Conecta tu ERP, CRM, software de recursos humanos o facturación a nuestra API comercial de cálculos fiscales. Obtén retenciones de ISR, IMSS e IVA 100% actualizadas al marco legal vigente.
          </p>
        </section>

        <DeveloperPlayground lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
