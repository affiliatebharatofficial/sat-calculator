import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendarioFiscalClient from '@/components/CalendarioFiscalClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  const title = isEn
    ? 'SAT Tax Calendar 2026: Critical Deadlines & Tax Returns'
    : 'Calendario Fiscal SAT 2026: Vencimientos, Pagos Provisionales y Declaraciones';
  const description = isEn
    ? 'Check the 2026 Mexican tax calendar with official deadlines for provisional ISR and VAT payments, DIOT, annual returns for individuals and corporations, and PTU.'
    : 'Consulta el calendario fiscal 2026 en México con fechas límite de pagos provisionales de ISR, IVA, DIOT, declaración anual de personas físicas y morales, y PTU.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn
        ? 'https://www.calculadorasat.org/en/calendario-fiscal'
        : 'https://www.calculadorasat.org/calendario-fiscal',
      languages: {
        es: 'https://www.calculadorasat.org/calendario-fiscal',
        en: 'https://www.calculadorasat.org/en/calendario-fiscal',
        'x-default': 'https://www.calculadorasat.org/calendario-fiscal',
      },
    },
    openGraph: {
      title,
      description,
      url: isEn
        ? 'https://www.calculadorasat.org/en/calendario-fiscal'
        : 'https://www.calculadorasat.org/calendario-fiscal',
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

export default async function CalendarioFiscal({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <CalendarioFiscalClient lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
