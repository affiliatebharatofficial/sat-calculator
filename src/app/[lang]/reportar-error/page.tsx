import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportErrorForm from '@/components/ReportErrorForm';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('reportar-error', lang);

  return {
    title:
      lang === 'en'
        ? 'Report a Calculation Error | Calculadora SAT Quality Assurance'
        : 'Reportar un Error o Discrepancia | Control de Calidad Calculadora SAT',
    description:
      lang === 'en'
        ? 'Submit a technical or statutory calculation error report to our engineering team. We investigate all observations against official Mexican DOF and LISR publications within 48 business hours.'
        : 'Envía un reporte de error técnico o normativo a nuestro equipo de ingeniería. Analizamos todas las observaciones contra publicaciones oficiales del DOF y LISR en un máximo de 48 horas hábiles.',
    alternates: seoAlternates,
  };
}

export default async function ReportarErrorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-3xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🛡️</span>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {isEn ? 'Quality Assurance Protocol' : 'Protocolo de Calidad y Transparencia'}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {isEn ? 'Report a Calculation Error or Observation' : 'Reportar un Error o Discrepancia Numérica'}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
            {isEn
              ? 'Calculadora SAT operates under an uncompromising commitment to mathematical accuracy and statutory fidelity. If you detect an algorithmic rounding bug, an outdated tax bracket, or an inaccurate legal reference, please submit your observation below. All technical inquiries are personally audited against official government gazettes (DOF, SAT, LFT, IMSS) by our lead developer and technical reviewer within 48 business hours.'
              : 'Calculadora SAT opera bajo un compromiso riguroso de precisión matemática y fidelidad normativa. Si detectas un error de redondeo algorítmico, una tarifa desactualizada o una referencia legal imprecisa, te invitamos a reportarlo a través de este formulario. Nuestro responsable técnico (Firoz Khan / FkDigitalMedia) audita cada caso contra gacetas oficiales (DOF, SAT, LFT, IMSS) en un plazo máximo de 48 horas hábiles.'}
          </p>

          {/* Guidelines Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 mb-8 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <span>📋</span>
              <span>{isEn ? 'How to submit an effective report:' : 'Recomendaciones para un reporte efectivo:'}</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-350">
              <li>
                {isEn
                  ? 'Indicate the exact input numbers tested in the calculator.'
                  : 'Indica los valores exactos que ingresaste en los campos de la calculadora.'}
              </li>
              <li>
                {isEn
                  ? 'Quote the specific legal statute (e.g. Article 96 LISR, Article 87 LFT) or DOF decree date.'
                  : 'Cita el artículo de ley específico (ej: Art. 96 LISR, Art. 87 LFT) o la fecha del decreto en el DOF.'}
              </li>
              <li>
                {isEn
                  ? 'No personal financial data or RFC passwords should ever be shared.'
                  : 'Nunca compartas contraseñas del SAT, e.firma ni datos bancarios privados.'}
              </li>
            </ul>
          </div>

          {/* 6-Field Form */}
          <ReportErrorForm lang={lang} />

          {/* Editorial & Changelog Footer */}
          <div className="mt-10 pt-6 border-t border-slate-150 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">FkDigitalMedia</span> • {isEn ? 'Reviewer: ' : 'Responsable: '}
              <a
                href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Firoz Khan (LinkedIn)
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href={isEn ? '/en/metodologia' : '/metodologia'} className="hover:text-blue-600 font-semibold">
                🔬 {isEn ? 'Methodology' : 'Metodología'}
              </Link>
              <Link href={isEn ? '/en/actualizaciones' : '/actualizaciones'} className="hover:text-blue-600 font-semibold">
                🔄 {isEn ? 'Changelog' : 'Historial de Auditoría'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
