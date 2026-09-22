'use client';

import React, { useState } from 'react';

export interface ReportErrorFormProps {
  initialPageOrCalculator?: string;
  lang?: 'es' | 'en';
  onSuccess?: () => void;
  isCompact?: boolean;
}

export default function ReportErrorForm({
  initialPageOrCalculator = '',
  lang = 'es',
  onSuccess,
  isCompact = false,
}: ReportErrorFormProps) {
  const isEn = lang === 'en';

  const [pageOrCalculator, setPageOrCalculator] = useState(
    initialPageOrCalculator || (typeof window !== 'undefined' ? window.location.pathname : '')
  );
  const [problem, setProblem] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [actualResult, setActualResult] = useState('');
  const [supportingSource, setSupportingSource] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [email, setEmail] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const problemOptions = isEn
    ? [
        { value: '', label: '-- Select problem type --' },
        { value: 'calculation_error', label: 'Calculation discrepancy / Formula bug' },
        { value: 'outdated_rate', label: 'Outdated tax bracket, rate, or UMA benchmark' },
        { value: 'legal_citation', label: 'Incorrect legal statute or DOF citation' },
        { value: 'rounding_issue', label: 'Rounding or fractional cent error' },
        { value: 'other', label: 'Other technical observation' },
      ]
    : [
        { value: '', label: '-- Selecciona el tipo de problema --' },
        { value: 'calculation_error', label: 'Discrepancia en cálculo / Error en fórmula' },
        { value: 'outdated_rate', label: 'Tarifa, UMA o tasa desactualizada' },
        { value: 'legal_citation', label: 'Cita legal o fundamento del DOF erróneo' },
        { value: 'rounding_issue', label: 'Falla en redondeo o centavos fraccionarios' },
        { value: 'other', label: 'Otra observación técnica' },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageOrCalculator,
          problem,
          expectedResult,
          actualResult,
          supportingSource,
          userMessage,
          email: email.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el reporte. Por favor intenta por correo.');
      }

      setSubmitted(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch {
      setErrorMessage(
        isEn
          ? 'Unable to submit automatically. You can send your report directly via email using the button below.'
          : 'No se pudo enviar automáticamente. Puedes enviarnos tu reporte directamente por correo con el botón inferior.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoBody = encodeURIComponent(
    `Reporte Técnico - Calculadora SAT\n` +
      `----------------------------------------\n` +
      `Herramienta / Página: ${pageOrCalculator}\n` +
      `Problema Detectado: ${problem}\n` +
      `Resultado Esperado: ${expectedResult}\n` +
      `Resultado Obtenido: ${actualResult}\n` +
      `Fuente de Respaldo / Ley: ${supportingSource}\n` +
      `Detalle / Mensaje:\n${userMessage}\n` +
      (email ? `Correo de contacto: ${email}\n` : '')
  );

  const mailtoUrl = `mailto:hello@calculadorasat.org?subject=${encodeURIComponent(
    `Reporte de Error: ${pageOrCalculator}`
  )}&body=${mailtoBody}`;

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 space-y-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl">
        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {isEn ? 'Observation Successfully Received' : 'Observación Recibida Exitosamente'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 max-w-md mx-auto leading-relaxed">
          {isEn
            ? 'Thank you for contributing to mathematical precision. Our technical lead (Firoz Khan / FkDigitalMedia) investigates all statutory reports against official gazettes within 48 business hours.'
            : 'Gracias por colaborar con la precisión matemática. Nuestro responsable técnico (Firoz Khan / FkDigitalMedia) analiza todos los reportes normativos contra gacetas oficiales en un plazo máximo de 48 horas hábiles.'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {isEn
            ? 'Verified corrections are deployed directly and recorded in our changelog at /actualizaciones.'
            : 'Las correcciones verificadas se publican en el repositorio y se registran en /actualizaciones.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs">
          {errorMessage}
        </div>
      )}

      {/* 1. Page / Calculator */}
      <div>
        <label
          htmlFor="pageOrCalculator"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          {isEn ? '1. Page or Calculator *' : '1. Página o Calculadora *'}
        </label>
        <input
          id="pageOrCalculator"
          type="text"
          required
          value={pageOrCalculator}
          onChange={(e) => setPageOrCalculator(e.target.value)}
          placeholder={isEn ? 'e.g. Net Salary Calculator or URL' : 'Ej: Calculadora de Salario Neto o URL'}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 2. Problem Type */}
      <div>
        <label
          htmlFor="problem"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          {isEn ? '2. Nature of the Problem *' : '2. Tipo de Problema *'}
        </label>
        <select
          id="problem"
          required
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {problemOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 3 & 4. Expected vs Actual Result (Side by side on desktop) */}
      <div className={`grid grid-cols-1 ${isCompact ? '' : 'sm:grid-cols-2'} gap-3`}>
        <div>
          <label
            htmlFor="actualResult"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
          >
            {isEn ? '3. Actual Result (What you got)' : '3. Resultado Obtenido en la Página'}
          </label>
          <input
            id="actualResult"
            type="text"
            value={actualResult}
            onChange={(e) => setActualResult(e.target.value)}
            placeholder={isEn ? 'e.g. Calculated $1,250.00 MXN' : 'Ej: Arrojó $1,250.00 MXN'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="expectedResult"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
          >
            {isEn ? '4. Expected Result (Correct value)' : '4. Resultado Esperado Correcto'}
          </label>
          <input
            id="expectedResult"
            type="text"
            value={expectedResult}
            onChange={(e) => setExpectedResult(e.target.value)}
            placeholder={isEn ? 'e.g. Should be $1,400.00 MXN' : 'Ej: Debería ser $1,400.00 MXN'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 5. Supporting Source */}
      <div>
        <label
          htmlFor="supportingSource"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          {isEn ? '5. Supporting Legal/Official Source' : '5. Fuente Oficial de Respaldo / Fundamento'}
        </label>
        <input
          id="supportingSource"
          type="text"
          value={supportingSource}
          onChange={(e) => setSupportingSource(e.target.value)}
          placeholder={isEn ? 'e.g. LISR Art. 96, DOF 27/12/2025, or official URL' : 'Ej: Art. 87 LFT, DOF de fecha 27/12/2025 o enlace oficial'}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 6. User Message / Details */}
      <div>
        <label
          htmlFor="userMessage"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          {isEn ? '6. Detailed Observation / Explanation *' : '6. Explicación Detallada de la Observación *'}
        </label>
        <textarea
          id="userMessage"
          required
          rows={isCompact ? 3 : 4}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={
            isEn
              ? 'Please provide the specific inputs tested and any details to help reproduce the issue...'
              : 'Detalla los valores que ingresaste y cualquier observación que ayude a reproducir la discrepancia...'
          }
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Optional Contact Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1"
        >
          {isEn
            ? 'Contact Email (Optional - only if you wish to receive update confirmation)'
            : 'Correo de Contacto (Opcional - solo si deseas recibir confirmación de la corrección)'}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isEn ? 'your-email@example.com (optional)' : 'tu-correo@ejemplo.com (opcional)'}
          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          🔒 {isEn
            ? 'Privacy Guarantee: No unnecessary personal data is harvested. Data is strictly used for statutory error resolution.'
            : 'Garantía de Privacidad: No recopilamos datos personales innecesarios. Tu información solo se utiliza para evaluar técnicamente el reporte.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
        >
          {submitting
            ? (isEn ? 'Submitting Report...' : 'Enviando Reporte...')
            : (isEn ? 'Submit Error Report 🚀' : 'Enviar Reporte Técnico 🚀')}
        </button>

        <a
          href={mailtoUrl}
          className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs text-center transition flex items-center justify-center gap-1.5"
        >
          <span>✉️</span>
          <span>{isEn ? 'Send via Email App' : 'Enviar por Correo'}</span>
        </a>
      </div>
    </form>
  );
}
