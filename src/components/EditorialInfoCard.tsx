'use client';

import React from 'react';
import Link from 'next/link';
import ReportErrorModal from './ReportErrorModal';

export interface EditorialInfoCardProps {
  author?: string;
  authorRole?: string;
  editorialResponsibility?: string;
  publishedDate?: string;
  lastReviewedDate?: string;
  lastUpdatedDate?: string;
  legalBasis?: string;
  pageTitle: string;
  lang?: 'es' | 'en';
}

export default function EditorialInfoCard({
  author = 'Firoz Khan (FkDigitalMedia)',
  authorRole,
  editorialResponsibility = 'FkDigitalMedia — Revisión técnica, fórmulas y verificación con leyes oficiales (LISR / LFT / DOF)',
  publishedDate,
  lastReviewedDate = '2026-09-20',
  lastUpdatedDate = '2026-09-20',
  legalBasis,
  pageTitle,
  lang = 'es',
}: EditorialInfoCardProps) {
  const isEn = lang === 'en';

  const defaultRole = authorRole || (isEn ? 'Creator & Technical Architect' : 'Creador y Responsable Técnico');
  const defaultEditorial = isEn
    ? 'FkDigitalMedia — Technical formula review and statutory Mexican tax/labor law verification'
    : editorialResponsibility;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(isEn ? 'en-US' : 'es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="my-8 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm text-xs sm:text-sm">
      {/* Header Attribution Line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            FK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {author}
              </span>
              <a
                href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#0A66C2] hover:underline"
                title="LinkedIn Profile"
              >
                LinkedIn ↗
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {defaultRole} • <span className="font-semibold text-slate-700 dark:text-slate-300">FkDigitalMedia</span>
            </p>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
          <span>✓</span>
          <span>{isEn ? 'Statutory Review 2026' : 'Revisión Normativa 2026'}</span>
        </div>
      </div>

      {/* Structured Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 py-4 text-xs border-b border-slate-200 dark:border-slate-800">
        {publishedDate && (
          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block text-[10px] mb-0.5">
              {isEn ? 'Published Date' : 'Fecha de Publicación'}
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {formatDate(publishedDate)}
            </span>
          </div>
        )}

        {lastReviewedDate && (
          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block text-[10px] mb-0.5">
              {isEn ? 'Last Reviewed' : 'Última Revisión Técnica'}
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {formatDate(lastReviewedDate)}
            </span>
          </div>
        )}

        {lastUpdatedDate && (
          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block text-[10px] mb-0.5">
              {isEn ? 'Last Updated' : 'Última Actualización'}
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {formatDate(lastUpdatedDate)}
            </span>
          </div>
        )}

        <div className="sm:col-span-2 md:col-span-3">
          <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block text-[10px] mb-0.5">
            {isEn ? 'Editorial Responsibility & Verification' : 'Responsabilidad Editorial y Verificación'}
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            {defaultEditorial}
          </span>
        </div>

        {legalBasis && (
          <div className="sm:col-span-2 md:col-span-3">
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block text-[10px] mb-0.5">
              {isEn ? 'Legal & Statutory Basis' : 'Fundamento Legal Primario'}
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {legalBasis}
            </span>
          </div>
        )}
      </div>

      {/* Footer Actions: Methodology & Report Error */}
      <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
          <Link
            href={isEn ? '/en/metodologia' : '/metodologia'}
            className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold underline underline-offset-2"
          >
            🔬 {isEn ? 'Read our development methodology' : 'Conoce nuestra metodología'}
          </Link>
          <span>•</span>
          <Link
            href={isEn ? '/en/fuentes' : '/fuentes'}
            className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold underline underline-offset-2"
          >
            🏛️ {isEn ? 'Official sources' : 'Fuentes oficiales'}
          </Link>
        </div>

        {/* Modal Trigger */}
        <ReportErrorModal
          pageOrCalculator={pageTitle}
          lang={lang}
          triggerText={isEn ? 'Report an error in this content' : 'Reportar una discrepancia en este artículo'}
          triggerClassName="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/70 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-xl transition"
        />
      </div>
    </section>
  );
}
