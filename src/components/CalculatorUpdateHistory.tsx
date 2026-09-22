import React from 'react';
import Link from 'next/link';
import { CalculatorUpdateRecord } from '@/types/methodology';
import { getUpdatesForCalculator } from '@/data/calculatorUpdates';

interface CalculatorUpdateHistoryProps {
  calculatorSlug: string;
  lang?: 'es' | 'en';
}

export default function CalculatorUpdateHistory({
  calculatorSlug,
  lang = 'es',
}: CalculatorUpdateHistoryProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';
  const updates = getUpdatesForCalculator(calculatorSlug);

  if (!updates || updates.length === 0) {
    return null;
  }

  return (
    <section
      id="historial-cambios"
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-900/60 mb-2">
            🔄 {isEn ? 'Audit Trail & Change History' : 'Control de Versiones y Auditoría'}
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isEn ? 'Calculator Review & Parameter Updates' : 'Historial de Actualizaciones de Parámetros'}
          </h3>
        </div>
        <Link
          href={`${langPrefix}/actualizaciones`}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>{isEn ? 'View all site updates' : 'Ver registro global de cambios'}</span>
          <span>➔</span>
        </Link>
      </div>

      <div className="space-y-4">
        {updates.map((upd) => (
          <div
            key={upd.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  {upd.calculatorTitle}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                <span>
                  <strong>{isEn ? 'Reviewed: ' : 'Auditoría: '}</strong>
                  {upd.lastReviewed}
                </span>
                <span>•</span>
                <span>
                  <strong>{isEn ? 'Parameter Refresh: ' : 'Parámetros: '}</strong>
                  {upd.lastParameterUpdate}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'What Changed:' : 'Modificaciones realizadas:'}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {upd.whatChanged}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'Reason for Update:' : 'Motivo regulatorio:'}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {upd.reasonForUpdate}
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">{isEn ? 'Source: ' : 'Fuente emisora: '}</strong>
                {upd.officialSource}
              </span>
              {upd.officialUrl && (
                <a
                  href={upd.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEn ? 'Official publication' : 'Publicación oficial'}</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
