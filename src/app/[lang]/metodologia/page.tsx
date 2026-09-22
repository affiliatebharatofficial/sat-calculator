import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const seoAlternates = getSeoAlternates('metodologia', lang);

  const title = isEn
    ? 'Calculation Methodology & Verification Standards | Calculadora SAT'
    : 'Metodología de Cálculo y Criterios de Verificación | Calculadora SAT';

  const description = isEn
    ? 'Discover our multi-step engineering and legal methodology: statutory identification, DOF parameter gathering, unit test validation, edge-case modeling, and error reporting.'
    : 'Conoce nuestra metodología técnico-jurídica: identificación de leyes en el DOF, captura de parámetros, validación con pruebas unitarias, tratamiento de casos límite y reporte de errores.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: isEn ? 'en_US' : 'es_MX',
      type: 'article',
    },
  };
}

export default async function MethodologyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: `https://www.calculadorasat.org${langPrefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Methodology' : 'Metodología', item: 'https://www.calculadorasat.org/metodologia' },
    ],
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header lang={lang} />

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 uppercase tracking-widest mb-4 border border-blue-400/30">
            🔬 {isEn ? 'Scientific & Legal Rigor' : 'Rigor Normativo y Matemático'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            {isEn ? 'Calculation Methodology & Verification' : 'Metodología de Modelado y Verificación Numérica'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {isEn
              ? 'A transparent breakdown of how our algorithmic calculation engines are built, validated against official Mexican statutes (LISR, LFT, DOF), and continuously monitored.'
              : 'Conoce con total transparencia cómo se diseñan, calibran y auditan nuestras calculadoras frente a las fuentes oficiales de México (LISR, LFT, DOF, Banxico e INEGI).'}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full space-y-10">
        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <span className="text-2xl block mb-2">📜</span>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
              {isEn ? '1. Primary Legal Gazettes' : '1. Fuentes Primarias'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {isEn
                ? 'Zero secondary aggregators. Formulas originate directly from official Mexican codes published in the DOF.'
                : 'Cero agregadores secundarios. Todas las fórmulas se extraen directamente de leyes publicadas en el DOF.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <span className="text-2xl block mb-2">🧪</span>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
              {isEn ? '2. Automated Unit Tests' : '2. Pruebas Automatizadas'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {isEn
                ? '50+ programmatic regression test cases run automatically before every release to protect formula integrity.'
                : 'Más de 50 casos de prueba unitaria se ejecutan automáticamente antes de cada compilación para evitar desvíos.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <span className="text-2xl block mb-2">🛡️</span>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
              {isEn ? '3. Responsible Transparency' : '3. Transparencia Responsable'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {isEn
                ? 'We explicitly clarify what our calculators do and do not simulate, avoiding misleading or exaggerated claims.'
                : 'Declaramos explícitamente el alcance y límites del simulador sin alegar infalibilidad ni sustituir la asesoría contable.'}
            </p>
          </div>
        </div>

        {/* Detailed Methodology Steps */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Step 1 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn
                  ? 'Identification of Applicable Tax and Labor Regulations'
                  : 'Identificación de la Normativa Jurídica y Laboral Aplicable'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'Before designing any calculator, our editorial and engineering team reviews the current text of the Mexican Federal Tax and Labor framework. We map each required output to its specific legal article:'
                : 'Antes de diseñar una herramienta, nuestro equipo técnico y editorial analiza el texto vigente del marco normativo federal mexicano, asignando cada variable de cálculo a su fundamento positivo:'}
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-5 font-medium">
              <li>
                <strong>LISR (Ley del Impuesto Sobre la Renta):</strong> {isEn ? 'Articles 96 (monthly withholding), 113-E/J (RESICO), 151 (personal deductions), and 152 (annual tax).' : 'Artículos 96 (retención mensual por salarios), 113-E al 113-J (RESICO), 151 (deducciones personales) y 152 (tarifa anual).'}
              </li>
              <li>
                <strong>LFT (Ley Federal del Trabajo):</strong> {isEn ? 'Articles 48 and 50 (severance indemnity), 76/78 (Vacaciones Dignas), 80 (vacation premium), 87 (aguinaldo), and 162 (seniority premium).' : 'Artículos 48 y 50 (indemnización constitucional y 20 días por año), 76 y 78 (Vacaciones Dignas), 80 (prima vacacional), 87 (aguinaldo) y 162 (prima de antigüedad).'}
              </li>
              <li>
                <strong>LIVA & CFF:</strong> {isEn ? 'Value Added Tax rules (16% standard rate, withholding mechanisms) and Federal Tax Code updates.' : 'Ley del IVA (tasa general del 16%, retenciones) y Código Fiscal de la Federación.'}
              </li>
              <li>
                <strong>Banxico & Conasami:</strong> {isEn ? 'Banxico Circular 34/2010 (credit card minimum payments) and CONASAMI minimum wage decrees.' : 'Circular 34/2010 de Banxico (fórmula dual de amortización mínima) y resoluciones de salarios mínimos de la CONASAMI.'}
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn
                  ? 'Collection of Official Economic Parameters and Tax Brackets'
                  : 'Recopilación y Captura de Parámetros Económicos Oficiales'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'Economic benchmarks are sourced exclusively from the primary issuing government institutions. We do not use third-party forecasts or unverified blog posts:'
                : 'Los valores numéricos de referencia se recopilan exclusivamente de las autoridades gubernamentales emisoras, descartando cualquier proyección no oficial:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">INEGI</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn ? 'UMA daily, monthly, and annual values (updated each January in the DOF).' : 'Valor diario, mensual y anual de la UMA (publicado cada enero en el DOF).'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">SAT / DOF</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn ? 'Annex 8 of the Miscellaneous Fiscal Resolution (RMF) containing progressive tax brackets.' : 'Anexo 8 de la Resolución Miscelánea Fiscal con las 11 escalas progresivas de ISR.'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">CONASAMI</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn ? 'General Minimum Wage and Northern Border Free Zone rates.' : 'Salario Mínimo General y Salario de la Zona Libre de la Frontera Norte.'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">Banco de México</span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn ? 'Daily FIX exchange rate for resolving foreign currency obligations.' : 'Tipo de cambio FIX oficial para solventar obligaciones en moneda extranjera.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn
                  ? 'Translation of Statutory Rules into Algorithmic Logic'
                  : 'Traducción de Normas Legales a Lógica Algorítmica'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'Legal provisions often describe piecewise mathematical functions. For example, progressive ISR tables operate through three simultaneous variables: Lower Limit (Límite Inferior), Fixed Fee (Cuota Fija), and Marginal Rate Percentage (Porcentaje sobre el Excedente):'
                : 'La redacción jurídica se descompone en funciones matemáticas deterministas. Por ejemplo, la mecánica del Artículo 96 de la LISR se estructura en tres pasos inmutables:'}
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto">
              <p className="text-emerald-400 mb-1">// Modelo determinista de retención de ISR (Art. 96 LISR)</p>
              <p>const excedente = Math.max(0, baseGravable - tramo.limiteInferior);</p>
              <p>const impuestoMarginal = excedente * (tramo.porcentaje / 100);</p>
              <p>const isrDeterminado = tramo.cuotaFija + impuestoMarginal;</p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {isEn
                ? 'Every calculation engine is implemented as a pure TypeScript function with strict typing, zero third-party telemetry, and deterministic return structures.'
                : 'Cada motor de cálculo se implementa en TypeScript puro con tipado estricto, sin librerías opacas de terceros y con estructuras de retorno reproducibles.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                4
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn
                  ? 'Dual Verification: Manual Audit and Automated Unit Tests'
                  : 'Verificación Dual: Auditoría Manual y Pruebas Unitarias de Regresión'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'To ensure calculation fidelity, every engine undergoes a two-layer validation protocol before code deployment:'
                : 'Para garantizar la fidelidad del cálculo, cada herramienta pasa por dos filtros obligatorios antes de publicarse:'}
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">A.</span>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>{isEn ? 'Manual Cross-Check Against Official Examples:' : 'Cruce Manual con Casos del SAT/DOF:'}</strong>{' '}
                  {isEn
                    ? 'Outputs are compared against worked examples issued in official SAT explanatory guides, PROFEDET settlement sheets, and certified payroll stubs.'
                    : 'Los resultados se cotejan contra los ejemplos prácticos de las guías de llenado del SAT, hojas de liquidación de PROFEDET y CFDI de nómina timbrados.'}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">B.</span>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>{isEn ? 'Automated Unit Test Suite (scripts/test-formulas.ts):' : 'Batería de Pruebas Unitarias (scripts/test-formulas.ts):'}</strong>{' '}
                  {isEn
                    ? '51 programmatic unit tests run across all edge cases (zero wages, boundary brackets, leap years, maximum severance caps, negative inputs).'
                    : '51 casos de prueba unitarios validan matemáticamente situaciones límite (salarios mínimos, cambio de tramos, años bisiestos, topes de exención y prima de antigüedad).'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                5
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn ? 'Handling of Edge Cases & Boundary Conditions' : 'Tratamiento de Casos Límite y Condiciones de Frontera'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'Our code includes defensive guardrails for atypical or non-linear scenarios:'
                : 'Nuestras funciones incorporan salvaguardas explícitas para situaciones atípicas:'}
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5 font-medium">
              <li>
                <strong>{isEn ? 'Minimum Wage Exemption Floor:' : 'Protección de Salario Mínimo:'}</strong> {isEn ? 'Workers earning the general minimum wage are legally exempt from ISR withholdings (Art. 96 LISR).' : 'Conforme al Art. 96 LISR, a los trabajadores que perciben el salario mínimo general no se les efectúa retención de ISR.'}
              </li>
              <li>
                <strong>{isEn ? 'Seniority Premium Ceiling:' : 'Tope de Prima de Antigüedad:'}</strong> {isEn ? 'Strictly capped at twice the general minimum wage per Art. 162 LFT, regardless of how high the base wage is.' : 'Se topa estrictamente a dos veces el salario mínimo general (Art. 162 LFT), sin importar que el sueldo base real sea superior.'}
              </li>
              <li>
                <strong>{isEn ? 'Exemption Caps in UMA:' : 'Topes de Exención en UMA:'}</strong> {isEn ? 'Aguinaldo (30 UMAs), vacation premium (15 UMAs), and personal deductions (lesser of 15% or 5 UMAs) are capped automatically.' : 'Se aplican los topes de 30 UMAs para aguinaldo, 15 UMAs para prima vacacional y 5 UMAs o 15% de ingresos para deducciones personales.'}
              </li>
            </ul>
          </div>

          {/* Step 6 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                6
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn ? 'Update Lifecycle and Regulatory Monitoring' : 'Ciclo de Actualización y Monitoreo Normativo'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'We operate under a calendar-triggered and event-triggered review cycle:'
                : 'Operamos bajo un esquema de revisión dual (por calendario y por evento legislativo):'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                  {isEn ? 'January / February (Annual)' : 'Enero / Febrero (Anual)'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn
                    ? 'Updating official UMA values, new minimum wages, inflation adjustments to ISR brackets, and annual RMF annexes.'
                    : 'Actualización obligatoria de valores de la UMA, nuevos salarios mínimos, ajustes de ISR y anexos de la RMF.'}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                  {isEn ? 'Extraordinary Legislative Reforms' : 'Reformas Legislativas Extraordinarias'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEn
                    ? 'Immediate codebase adjustments whenever decrees (such as Vacaciones Dignas or pension reforms) are published in the DOF.'
                    : 'Ajustes inmediatos al código cuando se publican decretos en el DOF (como Vacaciones Dignas o reformas pensionarias).'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-extrabold text-xs flex items-center justify-center">
                7
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn ? 'Scope and Limitations: What We Do NOT Cover' : 'Alcance y Limitaciones: Lo que las Calculadoras NO Cubren'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'To maintain transparency and ethical clarity, users must understand the boundaries of our calculation simulators:'
                : 'Para mantener la máxima transparencia y honestidad, es fundamental que el usuario comprenda lo que nuestros simuladores no hacen:'}
            </p>
            <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                🚫 <strong>{isEn ? 'No Binding Advice:' : 'No constituye asesoría vinculante:'}</strong> {isEn ? 'Our simulators are educational and informative instruments. They do not replace a Certified Public Accountant (CPA) or licensed labor attorney.' : 'Nuestras calculadoras son instrumentos informativos y didácticos. No sustituyen la consulta con un Contador Público Colegiado o un abogado laboralista.'}
              </p>
              <p>
                🚫 <strong>{isEn ? 'No Tax Filing or SAT Connection:' : 'No presenta declaraciones ante el SAT:'}</strong> {isEn ? 'This platform does not file returns or connect to the SAT Buzón Tributario. We never store personal tax IDs (RFC) or passwords.' : 'Esta plataforma no presenta declaraciones ni se conecta al portal del SAT. Nunca solicitamos ni almacenamos contraseñas ni e.firma.'}
              </p>
              <p>
                🚫 <strong>{isEn ? 'Atypical Collective Bargaining Contracts:' : 'Contratos Colectivos Particulares:'}</strong> {isEn ? 'Simulations reflect Mexican statutory baselines (mínimos de ley). Specific union collective agreements (CCT) with superior benefits may supersede these formulas.' : 'Los cálculos reflejan los mínimos de ley de la LFT. Prestaciones superiores estipuladas en Contratos Colectivos de Trabajo (CCT) sindicales no se consideran en el modelo general.'}
              </p>
            </div>
          </div>

          {/* Step 8 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                8
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isEn
                  ? 'Error Reporting and Technical Feedback Protocol'
                  : 'Protocolo de Notificación de Errores y Observaciones'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'We invite accounting professionals, HR directors, attorneys, and taxpayers to report any observed discrepancy, rate change, or technical anomaly. Reports are reviewed by our engineering lead within 48 business hours:'
                : 'Invitamos a contadores, directores de Recursos Humanos, abogados y contribuyentes a reportar cualquier observación, discrepancia numérica o ajuste legal. Todas las notas son revisadas en un plazo máximo de 48 horas hábiles:'}
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  {isEn ? 'Direct Editorial & Engineering Mailbox' : 'Buzón Directo de Revisión Técnica'}
                </span>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  hello@calculadorasat.org
                </span>
              </div>
              <a
                href={`mailto:hello@calculadorasat.org?subject=${encodeURIComponent(isEn ? 'Technical/Legal Observation - Methodology' : 'Observación Técnica/Legal sobre Calculadoras')}&body=${encodeURIComponent(isEn ? 'Hello Calculadora SAT team,\n\nI would like to report the following observation:\n- Calculator/URL:\n- Parameter or Law reference:\n- Suggested adjustment:\n\nThank you.' : 'Hola equipo de Calculadora SAT,\n\nQuisiera reportar la siguiente observación técnica o jurídica:\n- Herramienta / URL:\n- Parámetro o Ley de referencia:\n- Ajuste sugerido:\n\nSaludos.')}`}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition shrink-0"
              >
                <span>✉️ {isEn ? 'Send Observation' : 'Enviar Observación'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Links to Fuentes & Actualizaciones */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`${langPrefix}/fuentes`}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition group flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl block mb-2">🏛️</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {isEn ? 'Official Sources Directory' : 'Directorio de Fuentes Oficiales'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {isEn
                  ? 'Consult the complete database of statutes, DOF publications, and official government URLs supporting our calculators.'
                  : 'Consulta la base de datos completa de leyes, decretos del DOF y enlaces a portales del gobierno mexicano.'}
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 flex items-center gap-1">
              {isEn ? 'Explore sources ➔' : 'Explorar fuentes oficiales ➔'}
            </span>
          </Link>

          <Link
            href={`${langPrefix}/actualizaciones`}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition group flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl block mb-2">🔄</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                {isEn ? 'Audit Trail & Update Log' : 'Registro de Auditoría y Cambios'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {isEn
                  ? 'Track when each calculator was last reviewed, which parameters were refreshed, and the underlying regulatory reasons.'
                  : 'Revisa las fechas exactas de auditoría de cada calculadora, los parámetros actualizados y su fundamento.'}
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-4 flex items-center gap-1">
              {isEn ? 'View update log ➔' : 'Ver registro de cambios ➔'}
            </span>
          </Link>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
