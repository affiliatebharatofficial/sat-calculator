import React from 'react';
import Link from 'next/link';
import { OfficialSource } from '@/types/methodology';
import { getSourcesForCalculator } from '@/data/officialSources';

interface OfficialSourcesSectionProps {
  calculatorSlug: string;
  categorySlug?: string;
  lang?: 'es' | 'en';
}

export default function OfficialSourcesSection({
  calculatorSlug,
  categorySlug,
  lang = 'es',
}: OfficialSourcesSectionProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';
  const sources = getSourcesForCalculator(calculatorSlug, categorySlug);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <section
      id="fuentes-oficiales"
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-900/60 mb-2">
            🏛️ {isEn ? 'Statutory Anchors & Legal Sources' : 'Fundamento Normativo y Fuentes Oficiales'}
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isEn ? 'Official Regulatory Framework' : 'Fuentes Oficiales y Sustento Jurídico'}
          </h3>
        </div>
        <Link
          href={`${langPrefix}/fuentes`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>{isEn ? 'View all sources directory' : 'Ver directorio completo de fuentes'}</span>
          <span>➔</span>
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {isEn
          ? 'The computational logic, tax tables, and boundary conditions of this calculator are strictly modeled on the following government gazettes, statutes, and regulatory circulars:'
          : 'La lógica de cálculo, tarifas impositivas y reglas de tope de esta herramienta se modelan estrictamente con base en las siguientes leyes federales, resoluciones y publicaciones oficiales:'}
      </p>

      <div className="grid grid-cols-1 gap-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {source.institution}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {isEn ? 'Last verified: ' : 'Última verificación: '} {source.lastVerified}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {source.documentTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                <strong className="text-slate-800 dark:text-slate-200">{isEn ? 'Topic: ' : 'Materia: '}</strong>
                {source.topic}
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 leading-relaxed">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">
                {isEn ? 'Rule / Parameter Supported:' : 'Parámetro o regla que respalda:'}
              </strong>
              {source.supportedRule}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {source.effectiveDate || source.publicationDate}
              </span>
              <a
                href={source.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>{isEn ? 'Consult Official Document' : 'Consultar Documento Oficial'}</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
