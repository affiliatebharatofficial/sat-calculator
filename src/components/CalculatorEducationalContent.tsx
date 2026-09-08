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

  const lastUpdatedText =
    content.lastUpdated ||
    (isEn ? 'Fiscal Year 2026 — Verified & Active' : 'Ejercicio Fiscal 2026 — Vigente y Verificado');

  return (
    <article className="mt-12 space-y-12 text-slate-800 dark:text-slate-200">
      {/* 1. Main Guide & Educational Section */}
      <section
        id="guia-explicacion"
        className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Header Metadata Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <i className="bi bi-book-half"></i>
            {isEn ? 'Authoritative Guide & Methodology' : 'Guía Educativa y Metodología Oficial'}
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full">
            <i className="bi bi-calendar-check text-emerald-500"></i>
            <span>{lastUpdatedText}</span>
          </div>
        </div>

        {/* 1. What This Calculator Does */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {isEn ? `What does the ${config.title} do?` : `¿Qué hace la ${config.title}?`}
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {renderMarkdownLinks(content.whatItDoes || content.explanation)}
          </p>
        </div>

        {/* 2. Who Should Use It */}
        {content.whoShouldUse && content.whoShouldUse.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3 flex items-center">
              <i className="bi bi-people-fill text-blue-600 mr-2"></i>
              {isEn ? 'Who should use this calculator?' : '¿A quién va dirigida esta herramienta?'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {content.whoShouldUse.map((target, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>{renderMarkdownLinks(target)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. How the Calculation Works */}
        {content.howItWorks && (
          <div>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mb-3 flex items-center">
              <i className="bi bi-gear-wide-connected text-indigo-500 mr-2"></i>
              {isEn ? 'How the calculation works' : 'Cómo funciona el cálculo paso a paso'}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {renderMarkdownLinks(content.howItWorks)}
            </p>
          </div>
        )}

        {/* 4 & 6. Formula and Realistic Worked Example Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.formula && (
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3 flex items-center">
                  <i className="bi bi-file-code-fill text-indigo-500 mr-2"></i>
                  {isEn ? 'Formula & Calculation Methodology' : 'Fórmula y Metodología de Cálculo'}
                </h3>
                <pre className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {content.formula}
                </pre>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
                {isEn
                  ? 'Mathematical methodology applied according to statutory tax tables and arithmetic logic.'
                  : 'Metodología aritmética aplicada de acuerdo a las disposiciones y tarifas vigentes.'}
              </p>
            </div>
          )}

          {content.example && (
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3 flex items-center">
                  <i className="bi bi-lightbulb-fill text-yellow-500 mr-2"></i>
                  {isEn ? 'Realistic Worked Example' : 'Ejemplo Práctico con Números Reales'}
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {renderMarkdownLinks(content.example)}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
                {isEn
                  ? 'Step-by-step numerical breakdown illustrating the exact calculation flow.'
                  : 'Desglose numérico ilustrativo que refleja el flujo exacto de la operación.'}
              </p>
            </div>
          )}
        </div>

        {/* 7. Result Interpretation & Best Practices */}
        {content.tips && content.tips.length > 0 && (
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center">
              <i className="bi bi-bookmark-check-fill text-emerald-600 mr-2"></i>
              {isEn ? 'How to Understand the Result & Best Practices' : 'Cómo Interpretar el Resultado y Buenas Prácticas'}
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

        {/* 8. Assumptions & 9. Limitations Grid */}
        {(content.assumptions?.length || content.limitations?.length || content.errors?.length) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 8. Assumptions */}
            {content.assumptions && content.assumptions.length > 0 && (
              <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-950 dark:text-blue-200 mb-3 flex items-center">
                  <i className="bi bi-check-circle-fill text-blue-600 mr-2"></i>
                  {isEn ? 'Underlying Assumptions' : 'Supuestos del Cálculo'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                  {content.assumptions.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <span>{renderMarkdownLinks(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 9. Limitations & Common Pitfalls */}
            {((content.limitations && content.limitations.length > 0) ||
              (content.errors && content.errors.length > 0)) && (
              <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center">
                  <i className="bi bi-exclamation-octagon-fill text-amber-600 mr-2"></i>
                  {isEn ? 'Limitations & Pitfalls to Avoid' : 'Limitaciones y Errores Frecuentes a Evitar'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                  {(content.limitations || content.errors || []).map((error, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-600 dark:text-amber-400 mr-2 font-bold">•</span>
                      <span>{renderMarkdownLinks(error)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 5. Legal & Regulatory Basis */}
        {content.legislation && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2 flex items-center">
              <i className="bi bi-briefcase-fill text-blue-500 mr-2"></i>
              {isEn ? 'Applicable Legal & Regulatory Basis' : 'Fundamento Legal y Normativa Aplicable'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm italic leading-relaxed">
              {renderMarkdownLinks(content.legislation)}
            </p>
          </div>
        )}
      </section>

      {/* 10. Frequently Asked Questions Section (3-6 FAQs) */}
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
                ? 'Clear, legally grounded answers to practical inquiries and procedures.'
                : 'Respuestas directas con sustento técnico y legal a las dudas operativas más comunes.'}
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

      {/* 12. Data & Source References */}
      {content.sources && content.sources.length > 0 && (
        <section
          id="fuentes-oficiales"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
        >
          <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <i className="bi bi-link-45deg text-blue-600 text-lg"></i>
            {isEn ? 'Official Sources & Data References' : 'Fuentes Oficiales y Referencias Normativas'}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
            {content.sources.map((src, idx) => (
              <li
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <div className="font-bold text-slate-900 dark:text-white mb-1">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{src.name}</span>
                      <i className="bi bi-box-arrow-up-right text-[10px]"></i>
                    </a>
                  ) : (
                    src.name
                  )}
                </div>
                {src.description && <p className="leading-normal">{src.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 11. Related Tools Section */}
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
                ? `Explore other financial simulators complementary to the ${config.category} domain.`
                : `Explora otros simuladores y herramientas complementarias al área de ${config.category}.`}
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

      {/* 14. Official Informational Disclaimer */}
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
              {content.disclaimer
                ? renderMarkdownLinks(content.disclaimer)
                : isEn
                ? 'This calculator is a simulation tool designed for informative and educational purposes under current statutory provisions. It does not constitute formal accounting, legal, or fiscal advice. For official tax returns or binding procedures, consult an authorized public accountant or refer to the official regulations.'
                : 'Esta calculadora es una herramienta de simulación informativa y didáctica basada en la legislación y disposiciones vigentes. Los resultados no constituyen asesoría contable, fiscal o legal vinculante. Para declaraciones formales o gestiones oficiales, consulta a un profesional contable calificado o acude a los canales oficiales.'}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
