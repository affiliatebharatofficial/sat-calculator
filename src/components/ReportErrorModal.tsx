'use client';

import React, { useState } from 'react';
import ReportErrorForm from './ReportErrorForm';

export interface ReportErrorModalProps {
  pageOrCalculator: string;
  lang?: 'es' | 'en';
  triggerText?: string;
  triggerClassName?: string;
}

export default function ReportErrorModal({
  pageOrCalculator,
  lang = 'es',
  triggerText,
  triggerClassName,
}: ReportErrorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEn = lang === 'en';

  const defaultTriggerText = triggerText || (isEn ? 'Report a Calculation Error' : 'Reportar un Error o Discrepancia');
  const defaultTriggerClass =
    triggerClassName ||
    'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={defaultTriggerClass}
        aria-haspopup="dialog"
      >
        <span>⚠️</span>
        <span>{defaultTriggerText}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-sm transition"
              aria-label={isEn ? 'Close modal' : 'Cerrar ventana'}
            >
              ✕
            </button>

            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                <span>🛡️</span>
                <span>{isEn ? 'Quality Assurance Protocol' : 'Protocolo de Calidad Técnica'}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {isEn ? 'Report an Error or Observation' : 'Reportar una Discrepancia Numérica o Legal'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isEn
                  ? 'Help us keep our calculation engines aligned with official publications of the Mexican DOF and LISR/LFT.'
                  : 'Ayúdanos a mantener nuestros algoritmos estrictamente alineados con las publicaciones del DOF y la legislación fiscal vigente.'}
              </p>
            </div>

            <ReportErrorForm
              initialPageOrCalculator={pageOrCalculator}
              lang={lang}
              isCompact={true}
              onSuccess={() => {
                setTimeout(() => setIsOpen(false), 2500);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
