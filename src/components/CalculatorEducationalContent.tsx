import React from 'react';
import Link from 'next/link';
import { CalculatorConfig } from '@/types/calculator';

interface CalculatorEducationalContentProps {
  config: CalculatorConfig;
  lang: 'es' | 'en';
  relatedCalculators?: CalculatorConfig[];
}

function renderMarkdownLinks(text?: string) {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, label, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const isExternal = url.startsWith('http');
    parts.push(
      <Link
        key={matchIndex}
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
      >
        {label}
      </Link>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function CalculatorEducationalContent({
  config,
  lang,
  relatedCalculators = [],
}: CalculatorEducationalContentProps) {
  const isEn = lang === 'en';
  const { content } = config;

  if (!content) return null;

  return (
    <article className="mt-12 space-y-12 text-slate-800 dark:text-slate-200">
      {/* 1. Guide & Explanation Section */}
      <section
        id="guia-explicacion"
        className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-3 border border-blue-200 dark:border-blue-800">
            <i className="bi bi-book-half"></i>
            {isEn ? 'Educational Guide & Methodology' : 'Guía Educativa y Metodología'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {isEn ? `How does the ${config.title} work?` : `¿Cómo funciona la ${config.title}?`}
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {renderMarkdownLinks(content.explanation)}
          </p>
        </div>

        {/* Formula & Practical Example Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.formula && (
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3 flex items-center">
                  <i className="bi bi-file-code-fill text-indigo-500 mr-2"></i>
                  {isEn ? 'Calculation Formula & Logic' : 'Fórmula y Lógica de Cálculo'}
                </h3>
                <pre className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {content.formula}
                </pre>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
                {isEn
                  ? 'Mathematical methodology applied according to active tax schedules.'
                  : 'Metodología matemática aplicada según tablas y regulaciones vigentes.'}
              </p>
            </div>
          )}

          {content.example && (
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3 flex items-center">
                  <i className="bi bi-lightbulb-fill text-yellow-500 mr-2"></i>
                  {isEn ? 'Step-by-Step Practical Example' : 'Ejemplo Práctico Paso a Paso'}
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {renderMarkdownLinks(content.example)}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
                {isEn
                  ? 'Real-world simulation scenario to illustrate accurate output calculation.'
                  : 'Escenario simulado del mundo real para ilustrar el cálculo paso a paso.'}
              </p>
            </div>
          )}
        </div>

        {/* Tips / Result Interpretation */}
        {content.tips && content.tips.length > 0 && (
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center">
              <i className="bi bi-bookmark-check-fill text-emerald-600 mr-2"></i>
              {isEn ? 'Result Interpretation & Best Practices' : 'Interpretación de Resultados y Buenas Prácticas'}
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
              {content.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2 font-bold">•</span>
                  <span>{renderMarkdownLinks(tip)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Limitations & Common Pitfalls */}
        {content.errors && content.errors.length > 0 && (
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center">
              <i className="bi bi-exclamation-octagon-fill text-amber-600 mr-2"></i>
              {isEn ? 'Limitations & Common Pitfalls to Avoid' : 'Limitaciones y Errores Comunes a Evitar'}
            </h3>
            <ul className="space-y-2.5 text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
              {content.errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 dark:text-amber-400 mr-2 font-bold">•</span>
                  <span>{renderMarkdownLinks(error)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Legal Basis & Source */}
        {content.legislation && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2 flex items-center">
              <i className="bi bi-briefcase-fill text-blue-500 mr-2"></i>
              {isEn ? 'Legal Basis & Regulatory Framework' : 'Fundamento Legal y Marco Normativo'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm italic leading-relaxed">
              {renderMarkdownLinks(content.legislation)}
            </p>
          </div>
        )}
      </section>

      {/* 2. Frequently Asked Questions Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section
          id="preguntas-frecuentes"
          className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 mb-3 border border-indigo-200 dark:border-indigo-800">
              <i className="bi bi-question-circle-fill"></i>
              {isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              {isEn
                ? `Frequently Asked Questions about ${config.title}`
                : `Preguntas Frecuentes sobre ${config.title}`}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              {isEn
                ? 'Answers to common tax, financial, and procedural inquiries.'
                : 'Respuestas directas a las dudas fiscales, laborales y contables más comunes.'}
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <details
                key={index}
                open={index === 0}
                className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 p-5 transition-colors open:bg-white dark:open:bg-slate-900"
              >
                <summary className="cursor-pointer font-bold text-slate-900 dark:text-white text-base flex justify-between items-center select-none list-none">
                  <span className="flex items-start gap-2.5 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base">
                      Q{index + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <i className="bi bi-chevron-down text-slate-400 group-open:rotate-180 transition-transform duration-200 text-sm"></i>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed pl-6 whitespace-pre-line">
                  {renderMarkdownLinks(faq.answer)}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 3. Related Tools Section */}
      {relatedCalculators.length > 0 && (
        <section
          id="herramientas-relacionadas"
          className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
              <span>🌐</span>
              {isEn ? 'Related Calculators & Tools' : 'Calculadoras y Herramientas Relacionadas'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {isEn
                ? `Explore other calculators in the ${config.category} category.`
                : `Explora otras herramientas complementarias en la categoría ${config.category}.`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {relatedCalculators.map((related) => (
              <Link
                key={related.id}
                href={
                  isEn
                    ? `/en/calculadoras/${related.categorySlug}/${related.slug}`
                    : `/calculadoras/${related.categorySlug}/${related.slug}`
                }
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition bg-slate-50 dark:bg-slate-950 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {related.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1 group-hover:text-blue-600 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {related.shortDescription}
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 flex items-center gap-1">
                  {isEn ? 'Use calculator ➔' : 'Usar calculadora ➔'}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. Official Informational Disclaimer */}
      <section
        id="aviso-legal"
        className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        <div className="flex items-start gap-3">
          <i className="bi bi-shield-check text-base text-slate-400 mt-0.5"></i>
          <div>
            <strong className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
              {isEn ? 'Legal & Informational Disclaimer' : 'Aviso Legal e Informativo'}
            </strong>
            <p>
              {isEn
                ? 'This calculator is a simulation tool designed for informative and educational purposes under current statutory provisions. It does not constitute formal accounting, legal, or fiscal advice. For official tax returns or binding procedures, consult an authorized public accountant or refer to the official regulations.'
                : 'Esta calculadora es una herramienta de simulación informativa y didáctica basada en la legislación y disposiciones vigentes. Los resultados no constituyen asesoría contable, fiscal o legal vinculante. Para declaraciones formales o gestiones oficiales, consulta a un profesional contable calificado o acude a los canales oficiales.'}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
