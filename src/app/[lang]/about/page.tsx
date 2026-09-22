import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('about', lang);

  return {
    title:
      lang === 'en'
        ? 'About Us & Editorial Transparency | Calculadora SAT'
        : 'Acerca de Nosotros y Transparencia Editorial | Calculadora SAT',
    description:
      lang === 'en'
        ? 'Learn who operates Calculadora SAT, our editorial responsibility, calculator development methodology, primary source verification, and error correction process.'
        : 'Conoce quién opera Calculadora SAT, nuestra responsabilidad editorial, metodología de desarrollo de herramientas, verificación de fuentes primarias y protocolo de corrección de errores.',
    alternates: seoAlternates,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  if (isEn) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
        <Header lang={lang} />

        <main className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
            {/* Header / Intro */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <span>🛡️</span>
                <span>Editorial Transparency & Operational Trust</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                About Calculadora SAT
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 mt-3 leading-relaxed">
                Truthful, transparent information regarding who operates this project, how our calculators are built and maintained, and our verified source methodology.
              </p>
            </div>

            {/* 1. About Calculadora SAT */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  About Calculadora SAT
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Calculadora SAT is an independent online computational platform dedicated to providing open, accessible, and mathematically audited financial, payroll, and tax calculators. Our primary specialization centers on Mexico&apos;s legal framework—specifically the Income Tax Law (LISR), Value Added Tax Law (LIVA), Federal Labor Law (LFT), Social Security Law (LSS), and official SAT regulations.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Our mission is to democratize access to financial clarity. We enable wage earners, independent contractors, small businesses, and human resources personnel to simulate complex withholdings, severance payouts, vacation premiums, and progressive tax rates without having to navigate dense administrative gazettes.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                To serve cross-border and remote professionals operating between Latin American economies, we also maintain a strictly partitioned module of <strong>Peru Tools</strong> covering Peruvian labor statutes (CTS, Gratificaciones, Renta de 5ta Categoría) and SUNAT reference metrics. Both jurisdictions are kept completely separate to prevent normative confusion.
              </p>
            </section>

            {/* 2. Who Operates the Project */}
            <section className="space-y-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-6">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Who Operates the Project
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                <p>
                  Calculadora SAT is operated and maintained by <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, an independent digital media and web engineering initiative.
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">Firoz Khan</strong> is the creator, technical architect, and person responsible for the development, mathematical algorithms, and ongoing maintenance of Calculadora SAT.
                </p>
                <p>
                  We operate with complete personal and corporate honesty: <strong>we do not invent fictitious advisory boards, fake accounting firms, or simulated expert committees</strong>. Technical architecture, computational formulas, and software deployment are managed directly by Firoz Khan under FkDigitalMedia.
                </p>
                <div className="pt-1">
                  <a
                    href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-xl transition shadow-sm"
                  >
                    <span>Connect with Firoz Khan on LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            </section>

            {/* 3. Editorial Responsibility */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Editorial Responsibility
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                All educational guides, statutory summaries, mathematical formulas, and numerical examples published across CalculadoraSAT.org are reviewed under the direct editorial responsibility of <strong>FkDigitalMedia</strong> and <strong>Firoz Khan</strong>.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Our editorial policy requires that every article, worked example, and limitation statement be directly supported by enacted Mexican statutes (LISR, LFT, CFF, DOF decrees) or Peruvian supreme decrees. We do not publish automated or unverified AI filler content; each piece is crafted to provide standalone, actionable value to taxpayers.
              </p>
            </section>

            {/* 4. Calculator Development Methodology */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  4
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Calculator Development Methodology
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Every calculation engine on our website undergoes a rigorous 4-stage engineering lifecycle:
              </p>
              <ol className="list-decimal pl-5 text-xs sm:text-sm space-y-2 text-slate-600 dark:text-slate-350">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Statutory Mapping:</strong> Identifying the precise governing legal articles (e.g. Art. 96 LISR progressive brackets, Art. 87 LFT mandatory aguinaldo, Art. 76 LFT Vacaciones Dignas).
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Parameter Extraction:</strong> Ingesting official economic benchmarks directly from federal authorities (INEGI for UMA, CONASAMI for minimum wage, SAT for RMF tax tables).
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Deterministic Modeling:</strong> Translating legal text into pure, transparent TypeScript functions running entirely on-device without opaque external API dependencies.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Dual Verification:</strong> Cross-checking outputs against official SAT / PROFEDET published case studies and maintaining an automated regression unit testing suite of 51 automated tests (`npm run test:unit`).
                </li>
              </ol>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
                <Link href="/en/metodologia" className="hover:underline">
                  🔬 Read our complete technical development methodology ➔
                </Link>
              </p>
            </section>

            {/* 5. Source Verification Process */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  5
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Source Verification Process
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                We operate under a strict <strong>primary-source only policy</strong>. We do not source tax brackets or labor formulas from secondary blogs, forums, or third-party aggregators.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Our algorithms are grounded exclusively in official government repositories: the Diario Oficial de la Federación (DOF), Cámara de Diputados, INEGI, CONASAMI, Banco de México, IMSS, and SUNAT/El Peruano. Each citation includes document titles, publication dates, and direct links to genuine `.gob.mx` or `.gob.pe` domains.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
                <Link href="/en/fuentes" className="hover:underline">
                  🏛️ Explore our directory of 13 verified official sources ➔
                </Link>
              </p>
            </section>

            {/* 6. Update / Review Process */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  6
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Update and Review Process
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Calculators are monitored through two distinct review mechanisms:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-350">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Scheduled Annual Audits:</strong> In December and January, we monitor CONASAMI minimum wage updates, the annual Tax Miscellaneous Resolution (RMF) Annex 8 ISR tables, and INEGI&apos;s annual UMA announcement (effective February 1st).
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Event-Driven Reviews:</strong> Triggered immediately upon the enactment of extraordinary legislative reforms (e.g. labor decree amendments or tax tariff adjustments).
                </li>
              </ul>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Every review, formula patch, or parameter update is publicly logged in our site-wide audit changelog.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
                <Link href="/en/actualizaciones" className="hover:underline">
                  🔄 View the public audit and parameter changelog ➔
                </Link>
              </p>
            </section>

            {/* 7. Error Correction Process */}
            <section className="space-y-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-6">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-black text-sm flex items-center justify-center">
                  7
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Error Correction Process
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                We maintain an open, transparent feedback mechanism for users, certified accountants, and software testers. When a numerical discrepancy or edge-case bug is reported:
              </p>
              <ol className="list-decimal pl-5 text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-350">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Report Intake:</strong> The observation is registered via our 6-field error workflow or via direct email.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Statutory Audit:</strong> We cross-reference the report against the enacted DOF publication or primary legal text.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Engineering Patch:</strong> The TypeScript engine is updated and validated against unit test suites.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Deployment:</strong> The patch is deployed within 48 business hours and recorded in the public changelog.
                </li>
              </ol>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
                <Link href="/en/reportar-error" className="hover:underline">
                  ⚠️ Access the Report an Error workflow ➔
                </Link>
              </p>
            </section>

            {/* 8. Contact Information */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  8
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Contact Information
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Users, developers, and media inquiries may contact our technical and editorial team directly:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
                <div>
                  <strong className="text-slate-900 dark:text-white">Official Inquiry Email:</strong>{' '}
                  <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    hello@calculadorasat.org
                  </a>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Attention Hours:</strong> Monday to Friday from 9:00 AM to 6:00 PM (Mexico Central Time / UTC-6)
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Contact Form:</strong>{' '}
                  <Link href="/en/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Web contact form available here
                  </Link>
                </div>
              </div>
            </section>

            {/* 9. Independence Statement */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                  9
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Independence Statement
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Calculadora SAT is an entirely independent, privately operated technological initiative. We receive zero government funding, subsidies, or political patronage. Our editorial stance is objective and guided strictly by mathematical logic and statutory fidelity. We do not favor commercial lenders, payroll software vendors, or partisan interests.
              </p>
            </section>

            {/* 10. Government Affiliation Disclaimer */}
            <section className="space-y-3 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>⚠️</span>
                <span>10. Official Government Non-Affiliation Disclaimer</span>
              </div>
              <p className="leading-relaxed">
                Calculadora SAT is an independent educational and technological portal. It is <strong>NOT affiliated with, sponsored by, endorsed by, or associated with</strong> the Servicio de Administración Tributaria (SAT) of Mexico, the Instituto Mexicano del Seguro Social (IMSS), the Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) of Peru, the Ministerio de Trabajo y Promoción del Empleo (MTPE), nor any other federal, state, or municipal government agency.
              </p>
              <p className="leading-relaxed">
                All results produced by our calculators are mathematical simulations designed for educational, informational, and budgeting purposes. They do not constitute formal, binding legal or tax advice. For formal filings, audited financial statements, or administrative appeals, consult a licensed Certified Public Accountant (CPA) or refer to the official government portals (`sat.gob.mx`, `imss.gob.mx`, `sunat.gob.pe`).
              </p>
            </section>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    );
  }

  // Spanish Version
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
          {/* Encabezado Principal */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              <span>🛡️</span>
              <span>Transparencia Editorial y Confianza Operativa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Acerca de Calculadora SAT
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 mt-3 leading-relaxed">
              Estructura transparente y verídica sobre quién opera este proyecto, cómo se diseñan nuestras herramientas y cómo validamos cada cálculo contra la legislación vigente.
            </p>
          </div>

          {/* 1. Acerca de Calculadora SAT */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                1
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Acerca de Calculadora SAT
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Calculadora SAT es una plataforma tecnológica independiente especializada en el desarrollo de herramientas de cálculo fiscal, laboral y de finanzas personales. Su enfoque primario radica en el marco normativo de México, abarcando la Ley del Impuesto sobre la Renta (LISR), la Ley del Impuesto al Valor Agregado (LIVA), la Ley Federal del Trabajo (LFT), la Ley del Seguro Social (LSS) y las resoluciones administrativas emitidas por el SAT.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Nuestra misión es democratizar la comprensión de cálculos tributarios y laborales que comúnmente resultan complejos para la ciudadanía. Permitimos a trabajadores asalariados, profesionistas por honorarios, emprendedores en RESICO y departamentos de recursos humanos simular retenciones de ISR, cuotas del IMSS, liquidaciones de finiquito y vacaciones de manera inmediata, transparente y privada.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Para atender a la creciente comunidad de profesionistas que colaboran de manera remota entre economías de habla hispana, contamos además con una sección delimitada de <strong>Herramientas de Perú</strong>, orientada a beneficios laborales peruanos (CTS, Gratificaciones de ley, Renta de 5ta Categoría) y referencias tributarias de SUNAT. Ambos módulos están estrictamente separados para evitar cualquier confusión normativa.
            </p>
          </section>

          {/* 2. Quién opera el proyecto */}
          <section className="space-y-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                2
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Quién Opera el Proyecto
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              <p>
                Calculadora SAT es operada y mantenida por <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, una iniciativa digital independiente orientada al desarrollo de software utilitario y divulgación cuantitativa.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Firoz Khan</strong> es la persona responsable del desarrollo, diseño de arquitectura técnica, programación de algoritmos y mantenimiento operativo de la plataforma.
              </p>
              <p>
                Operamos bajo un compromiso estricto de verdad y transparencia: <strong>no inventamos despachos contables fantasma, juntas directivas simuladas ni comités ficticios de expertos</strong>. La responsabilidad técnica y el mantenimiento del código son asumidos directamente por Firoz Khan en el marco de FkDigitalMedia.
              </p>
              <div className="pt-1">
                <a
                  href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-xl transition shadow-sm"
                >
                  <span>Ver perfil profesional de Firoz Khan en LinkedIn ↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* 3. Responsabilidad editorial */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                3
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Responsabilidad Editorial
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Todo el contenido explicativo, las fórmulas matemáticas, los artículos informativos y los ejemplos numéricos publicados en CalculadoraSAT.org son supervisados bajo la responsabilidad editorial directa de <strong>FkDigitalMedia</strong> y <strong>Firoz Khan</strong>.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Nuestra política editorial exige que cada cálculo y cada artículo cuente con fundamento explícito en gacetas oficiales y leyes vigentes de México (LISR, LFT, CFF, decretos del DOF) o de Perú (Decretos Supremos y SUNAT). No publicamos contenido generado masivamente sin supervisión; cada recurso didáctico busca aportar valor directo y comprensible para el contribuyente.
            </p>
          </section>

          {/* 4. Metodología de desarrollo de calculadoras */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                4
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Metodología de Desarrollo de Calculadoras
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Cada motor de cálculo incorporado en el sitio sigue un ciclo estructurado de 4 fases de ingeniería:
            </p>
            <ol className="list-decimal pl-5 text-xs sm:text-sm space-y-2 text-slate-600 dark:text-slate-350">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Identificación Normativa:</strong> Selección del articulado legal aplicable (ej: Art. 96 LISR para tarifa mensual de ISR, Art. 87 LFT para aguinaldo mínimo, Art. 76 LFT para Vacaciones Dignas).
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Extracción de Parámetros Oficiales:</strong> Recopilación directa de tablas y valores publicados por organismos de gobierno (INEGI para UMA, CONASAMI para salarios mínimos, SAT para tarifas de la RMF).
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Programación Determinista:</strong> Traducción de la redacción jurídica a funciones de TypeScript puro que corren en el dispositivo del usuario sin dependencias externas opacas.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Doble Verificación y Pruebas Unitarias:</strong> Comparación contra casos de estudio oficiales del SAT y PROFEDET, respaldada por una suite automatizada de 51 pruebas unitarias (`npm run test:unit`).
              </li>
            </ol>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
              <Link href="/metodologia" className="hover:underline">
                🔬 Consulta nuestra metodología técnica detallada ➔
              </Link>
            </p>
          </section>

          {/* 5. Proceso de verificación de fuentes */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                5
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Proceso de Verificación de Fuentes
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Mantenemos una política estricta de <strong>fuentes primarias oficiales exclusivamente</strong>. No tomamos tablas impositivas ni fórmulas salariales de blogs de terceros, foros o agregadores secundarios.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Nuestros algoritmos se fundamentan directamente en el Diario Oficial de la Federación (DOF), el repositorio de la Cámara de Diputados, el INEGI, la CONASAMI, el Banco de México, el IMSS y los portales oficiales de SUNAT y El Peruano. Cada cita incluye el título normativo, fecha de entrada en vigor y enlace verificable a dominios `.gob.mx` o `.gob.pe`.
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
              <Link href="/fuentes" className="hover:underline">
                🏛️ Conoce nuestro catálogo de 13 fuentes gubernamentales verificadas ➔
              </Link>
            </p>
          </section>

          {/* 6. Proceso de actualización y revisión */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                6
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Proceso de Actualización y Revisión
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Las calculadoras se mantienen al día mediante dos modalidades de supervisión:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-350">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Revisiones Periódicas Anuales:</strong> En los meses de diciembre y enero monitoreamos los salarios mínimos de la CONASAMI, las tablas de ISR del Anexo 8 de la RMF y la publicación oficial de la UMA por el INEGI (con vigencia a partir del 1 de febrero).
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Revisiones Extraordinarias por Reforma:</strong> Se detonan de inmediato cuando el Congreso o el Poder Ejecutivo publican reformas a la LISR, LFT o leyes de seguridad social en el DOF.
              </li>
            </ul>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Cada actualización de parámetros o corrección algorítmica queda asentada con fecha y fundamento en nuestro historial público de auditoría.
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
              <Link href="/actualizaciones" className="hover:underline">
                🔄 Ver el registro público de actualizaciones y auditorías ➔
              </Link>
            </p>
          </section>

          {/* 7. Proceso de corrección de errores */}
          <section className="space-y-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-black text-sm flex items-center justify-center">
                7
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Proceso de Corrección de Errores
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Disponemos de un canal abierto y transparente para que usuarios, contadores públicos y desarrolladores reporten cualquier inconsistencia en los cálculos:
            </p>
            <ol className="list-decimal pl-5 text-xs sm:text-sm space-y-1.5 text-slate-600 dark:text-slate-350">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Recepción del Reporte:</strong> La observación se registra mediante nuestro formulario de 6 campos o correo directo.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Auditoría Normativa:</strong> Se coteja el valor observado contra el texto del decreto oficial en el DOF.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Parche de Código:</strong> Se ajusta la función matemática en el repositorio y se ejecutan las pruebas unitarias.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Publicación y Registro:</strong> Se despliega en producción en un plazo máximo de 48 horas hábiles y se documenta en `/actualizaciones`.
              </li>
            </ol>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
              <Link href="/reportar-error" className="hover:underline">
                ⚠️ Abrir el flujo de reporte de errores ➔
              </Link>
            </p>
          </section>

          {/* 8. Información de contacto */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                8
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Información de Contacto
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Para consultas técnicas, sugerencias o contacto general, puedes comunicarte directamente con nuestro equipo:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs sm:text-sm space-y-2">
              <div>
                <strong className="text-slate-900 dark:text-white">Correo Oficial:</strong>{' '}
                <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  hello@calculadorasat.org
                </a>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Horario de Atención:</strong> Lunes a Viernes de 9:00 AM a 6:00 PM (Hora Centro de México / UTC-6)
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Formulario Web:</strong>{' '}
                <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Formulario de contacto disponible aquí
                </Link>
              </div>
            </div>
          </section>

          {/* 9. Declaración de independencia */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center">
                9
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Declaración de Independencia
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Calculadora SAT es una iniciativa digital privada, libre e independiente. No recibe subsidios públicos, patrocinios gubernamentales ni financiamiento de partidos políticos o cámaras empresariales. El desarrollo se mantiene de forma autónoma con el objetivo de ofrecer herramientas de cálculo universales, gratuitas y neutrales para todos los contribuyentes.
            </p>
          </section>

          {/* 10. Deslinde de afiliación gubernamental */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span>⚠️</span>
              <span>10. Deslinde de Afiliación Gubernamental</span>
            </div>
            <p className="leading-relaxed">
              Calculadora SAT es un sitio web de divulgación tecnológica e información cuantitativa independiente. <strong>NO está afiliado, respaldado, autorizado ni patrocinado</strong> por el Servicio de Administración Tributaria (SAT) de México, ni por el Instituto Mexicano del Seguro Social (IMSS), ni por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú, ni por el Ministerio de Trabajo y Promoción del Empleo (MTPE), ni por ninguna otra entidad u organismo del gobierno federal, estatal o municipal.
            </p>
            <p className="leading-relaxed">
              Todos los resultados obtenidos son simulaciones matemáticas con fines educativos, de planificación y orientación personal. No constituyen asesoría contable, fiscal o legal vinculante. Para trámites oficiales, declaraciones anuales vinculantes o dictámenes contables formales, acude ante un Contador Público colegiado o consulta los portales oficiales de la autoridad (`sat.gob.mx`, `imss.gob.mx`, `sunat.gob.pe`).
            </p>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
