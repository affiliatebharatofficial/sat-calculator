import React from 'react';
import Link from 'next/link';
import { CalculatorConfig } from '@/types/calculator';
import OfficialSourcesSection from './OfficialSourcesSection';
import CalculatorUpdateHistory from './CalculatorUpdateHistory';
import ReportErrorModal from './ReportErrorModal';
import TopicalClusterResources from './TopicalClusterResources';

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
      {/* 6. How the Calculation Works & What It Does */}
      <section
        id="como-funciona"
        className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <i className="bi bi-gear-wide-connected"></i>
            {isEn ? 'Calculation Breakdown & Methodology' : 'Funcionamiento y Metodología de Cálculo'}
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full">
            <i className="bi bi-calendar-check text-emerald-500"></i>
            <span>{lastUpdatedText}</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {isEn ? `How the ${config.title} works` : `Cómo funciona la ${config.title} paso a paso`}
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {renderMarkdownLinks(content.howItWorks || content.whatItDoes || content.explanation)}
          </p>
        </div>

        {content.howToInterpret && (
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-5 text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
            <strong className="block mb-1 font-bold text-emerald-800 dark:text-emerald-300">
              💡 {isEn ? 'Result Interpretation:' : 'Interpretación de los Resultados:'}
            </strong>
            {renderMarkdownLinks(content.howToInterpret)}
          </div>
        )}
      </section>

      {/* 7. Formula / Methodology & 8. Worked Numerical Example */}
      <section
        id="formula-y-ejemplo"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* 7. Formula / Methodology */}
        {content.formula && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <i className="bi bi-calculator"></i>
                {isEn ? 'Step 7: Formal Model' : 'Paso 7: Modelo Formal'}
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">
                {isEn ? 'Formula & Calculation Methodology' : 'Fórmula y Metodología de Cálculo'}
              </h3>
              <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {content.formula}
              </pre>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              {isEn
                ? 'Mathematical logic implemented strictly according to current Mexican statutory tax and labor brackets.'
                : 'Metodología aritmética aplicada conforme a las tarifas, disposiciones y tablas vigentes publicadas en el DOF.'}
            </p>
          </div>
        )}

        {/* 8. Worked Numerical Example */}
        {content.example && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                <i className="bi bi-lightbulb-fill"></i>
                {isEn ? 'Step 8: Real Figures' : 'Paso 8: Cifras Reales'}
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">
                {isEn ? 'Worked Numerical Example' : 'Ejemplo Práctico con Números Reales'}
              </h3>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {renderMarkdownLinks(content.example)}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              {isEn
                ? 'Step-by-step numerical breakdown illustrating the exact calculation flow with realistic Mexican figures.'
                : 'Desglose numérico paso a paso que ilustra la operación con cifras reales en pesos mexicanos.'}
            </p>
          </div>
        )}
      </section>

      {/* 9. Who Should Use This Calculator */}
      {content.whoShouldUse && content.whoShouldUse.length > 0 && (
        <section
          id="a-quien-va-dirigido"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <i className="bi bi-people-fill"></i>
            {isEn ? 'Step 9: Intended Audience' : 'Paso 9: Destinatarios del Cálculo'}
          </div>
          <h3 className="text-xl font-black text-slate-950 dark:text-white">
            {isEn ? `Who should use the ${config.title}?` : `¿A quién va dirigida la ${config.title}?`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {content.whoShouldUse.map((target, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold text-base">✓</span>
                <span>{renderMarkdownLinks(target)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Important Assumptions & 11. Limitations */}
      {(content.assumptions?.length || content.limitations?.length || content.errors?.length) && (
        <section
          id="supuestos-y-limitaciones"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* 10. Important Assumptions */}
          {content.assumptions && content.assumptions.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <i className="bi bi-check-circle-fill"></i>
                {isEn ? 'Step 10: Assumptions' : 'Paso 10: Supuestos del Modelo'}
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                {isEn ? 'Important Assumptions' : 'Supuestos Importantes del Cálculo'}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {content.assumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{renderMarkdownLinks(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 11. Limitations & Common Pitfalls */}
          {((content.limitations && content.limitations.length > 0) ||
            (content.errors && content.errors.length > 0)) && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <i className="bi bi-exclamation-octagon-fill"></i>
                {isEn ? 'Step 11: Boundaries' : 'Paso 11: Límites y Errores'}
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                {isEn ? 'Limitations & Pitfalls to Avoid' : 'Limitaciones y Errores a Evitar'}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {(content.limitations || content.errors || []).map((error, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                    <span>{renderMarkdownLinks(error)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 12. Legal / Tax Basis */}
      {content.legislation && (
        <section
          id="fundamento-legal"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <i className="bi bi-briefcase-fill"></i>
            {isEn ? 'Step 12: Statutory Basis' : 'Paso 12: Fundamento Jurídico'}
          </div>
          <h3 className="text-xl font-black text-slate-950 dark:text-white">
            {isEn ? 'Applicable Legal & Tax Basis' : 'Fundamento Legal y Normativa Positiva'}
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {renderMarkdownLinks(content.legislation)}
          </div>
        </section>
      )}

      {/* 13. Official Sources (Reusable Component & Custom Sources) */}
      <OfficialSourcesSection
        calculatorSlug={config.slug}
        categorySlug={config.categorySlug}
        lang={lang}
      />

      {/* 14. Frequently Asked Questions */}
      {content.faqs && content.faqs.length > 0 && (
        <section
          id="preguntas-frecuentes"
          className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 mb-3 border border-indigo-200 dark:border-indigo-800">
              <i className="bi bi-question-circle-fill"></i>
              {isEn ? 'Step 14: Practical FAQs' : 'Paso 14: Preguntas Frecuentes'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              {isEn
                ? `Frequently Asked Questions about ${config.title}`
                : `Preguntas Frecuentes sobre ${config.title}`}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              {isEn
                ? 'Actionable, legally grounded answers to practical calculation inquiries.'
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

      {/* 15. Related Calculators & Blog Guides */}
      {relatedCalculators.length > 0 && (
        <section
          id="herramientas-relacionadas"
          className="scroll-mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              <i className="bi bi-grid-fill"></i>
              {isEn ? 'Step 15: Cross-Calculators' : 'Paso 15: Herramientas Complementarias'}
            </div>
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

          {/* Topical Cluster Specialized Resources & Guides */}
          <TopicalClusterResources
            currentType="calculator"
            currentSlug={config.slug}
            currentCategorySlug={config.categorySlug}
            lang={lang}
            className="mt-8"
          />
        </section>
      )}

      {/* 16. Report a Calculation Error (Dedicated Accessible Card) */}
      <section
        id="reportar-error"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <i className="bi bi-shield-check"></i>
              {isEn ? 'Step 16: Feedback & Quality Assurance' : 'Paso 16: Control de Calidad y Reporte'}
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isEn ? 'Report a Calculation Error or Observation' : 'Reportar una Observación o Discrepancia Numérica'}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <ReportErrorModal
              pageOrCalculator={config.title}
              lang={lang}
              triggerText={isEn ? 'Report an Error' : 'Reportar un Error'}
            />
            <a
              href={`mailto:hello@calculadorasat.org?subject=${encodeURIComponent(`Observación técnica sobre ${config.title}`)}&body=${encodeURIComponent(`Hola equipo de Calculadora SAT,\n\nHe detectado la siguiente observación en la herramienta "${config.title}" (URL: /calculadoras/${config.categorySlug}/${config.slug}):\n\n- Valor o parámetro observado:\n- Fundamento o ley de referencia:\n- Corrección sugerida:\n\nSaludos.`)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
            >
              <span>✉️</span>
              <span>{isEn ? 'Email Directly' : 'Por Correo'}</span>
            </a>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isEn
            ? 'We continuously audit our calculation engines against official DOF publications and statutory tax amendments. If you detect a numerical discrepancy, a recent rate change, or an edge-case bug, please submit your observation. All reports are investigated within 48 business hours.'
            : 'Auditamos permanentemente nuestros algoritmos contra publicaciones del DOF y reformas fiscales. Si detectas alguna discrepancia en el redondeo, una tarifa recién actualizada o un caso límite no contemplado, compártenos tu reporte. Nuestro equipo técnico revisa y responde en un plazo máximo de 48 horas hábiles.'}
        </p>

        {/* Technical Supervision Attribution */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">FkDigitalMedia</span> • {isEn ? 'Supervision: ' : 'Supervisión Técnica: '}
            <a
              href="https://www.linkedin.com/in/firoz-khan-1153358a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Firoz Khan (LinkedIn)
            </a>
          </div>
          <Link
            href={isEn ? '/en/metodologia' : '/metodologia'}
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            🔬 {isEn ? 'Read our validation methodology' : 'Consultar metodología de validación'} ➔
          </Link>
        </div>
      </section>

      {/* 17. Last Reviewed / Updated Information */}
      <section id="historial-revision">
        <CalculatorUpdateHistory
          calculatorSlug={config.slug}
          lang={lang}
        />
      </section>

      {/* 18. Official Informational Disclaimer */}
      <section
        id="aviso-legal"
        className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        <div className="flex items-start gap-3">
          <i className="bi bi-shield-check text-base text-slate-400 mt-0.5"></i>
          <div>
            <strong className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
              {isEn ? 'Step 18: Legal & Informational Disclaimer' : 'Paso 18: Aviso Legal e Informativo'}
            </strong>
            <p>
              {content.disclaimer
                ? renderMarkdownLinks(content.disclaimer)
                : isEn
                ? 'This calculator is a simulation tool designed for informative and educational purposes under current statutory provisions. It does not constitute formal accounting, legal, or fiscal advice. For official tax returns or binding procedures, consult an authorized public accountant or refer to the official regulations.'
                : 'Esta calculadora es una herramienta de simulación informativa y didáctica basada en la legislación y disposiciones vigentes. Los resultados no constituyen asesoría contable, fiscal o legal vinculante. Para declaraciones formales o gestiones oficiales, consulta a un profesional contable calificado o acude a los canales oficiales del SAT.'}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
