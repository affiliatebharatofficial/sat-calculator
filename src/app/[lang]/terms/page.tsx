import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function TermsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
        <Header lang={lang} />

        <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-4xl">📄</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Terms and Conditions of Use
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Last updated: February 2026 • Governs all tools, content, and services at calculadorasat.org
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <p>
                Welcome to <strong>Calculadora SAT</strong> (available at <code>calculadorasat.org</code>). These Terms and Conditions constitute a legally binding agreement between you (the "User") and <strong>FkDigitalMedia</strong>, directed by <strong>Firoz Khan</strong>, governing your access to and use of this website, interactive simulation engines, educational articles, and associated digital resources.
              </p>

              <p>
                By browsing, accessing, or utilizing any calculator or informational guide on this site, you explicitly acknowledge and agree to comply with and be bound by these Terms and Conditions in full. If you disagree with any portion of these terms, you must immediately discontinue your use of the website.
              </p>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* 1. Terms of Use */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  1. Terms of Use for Interactive Calculators
                </h2>
                <p>
                  Calculadora SAT grants you a limited, revocable, non-exclusive, non-transferable, and royalty-free license to access and interact with our web calculators (including Mexican SAT tax models, LFT payroll simulations, and Peruvian SUNAT modules) strictly for personal, academic, or internal business planning purposes.
                </p>
                <p>
                  Calculations are executed on the client-side within your browser using published statutory formulas (e.g., Article 96 and 152 of the Mexican Income Tax Law, Article 87 of the Federal Labor Law, and official SUNAT resolutions). While we strive for absolute algorithmic precision, all outputs must be evaluated as informational estimations rather than binding determinations.
                </p>
              </section>

              {/* 2. Intellectual Property */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  2. Intellectual Property and Proprietary Rights
                </h2>
                <p>
                  All proprietary algorithms, frontend code implementations, UI design components, editorial analyses, educational articles, infographics, and branding materials featured on <code>calculadorasat.org</code> are the exclusive intellectual property of <strong>FkDigitalMedia</strong> and its authors, protected under national and international copyright, trademark, and intellectual property conventions.
                </p>
                <p>
                  Statutory texts, government tax brackets, and official decree excerpts (e.g., DOF, CFF, LISR, LFT, SUNAT regulations) belong to the public legal domain of their respective jurisdictions. However, their systematic compilation, educational formatting, interactive software logic, and editorial explanations remain protected under copyright law. Unauthorized copying, mirroring, or framing of entire site sections without written permission is strictly prohibited.
                </p>
              </section>

              {/* 3. Limitation of Liability */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  3. Limitation of Liability & No Professional Advice Warranty
                </h2>
                <div className="p-4 bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2">
                  <p>
                    ⚠️ <strong>IMPORTANT LEGAL DISCLAIMER:</strong> All tools and informational materials provided on Calculadora SAT are delivered on an "AS IS" and "AS AVAILABLE" basis for educational and didactic reference only. <strong>Nothing on this site constitutes certified tax advice, legal representation, labor counsel, or certified public accounting services.</strong>
                  </p>
                  <p>
                    Tax liability determinations depend on multifaceted individual circumstances, personal deductions, fiscal residency rules, and timely official filings. Users must consult a licensed Mexican Contador Público (CPA) or Mexican labor attorney, or equivalent Peruvian specialist, before filing declarations, executing severance payments, or undertaking financial commitments.
                  </p>
                </div>
                <p>
                  To the maximum extent permitted by applicable law, neither <strong>FkDigitalMedia</strong>, <strong>Firoz Khan</strong>, nor any contributor shall be liable for any direct, indirect, incidental, consequential, special, or punitive damages, including financial surcharges, tax penalties, audit adjustments, lost profits, or labor dispute outcomes resulting from your reliance on site simulations. For complete details, consult our <Link href="/en/disclaimer" className="underline font-bold text-blue-600 dark:text-blue-400">Legal Disclaimer</Link>.
                </p>
              </section>

              {/* 4. Acceptable Use Policy */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  4. Acceptable Use Policy & Anti-Scraping Restrictions
                </h2>
                <p>
                  You agree to use Calculadora SAT solely for lawful purposes. You explicitly agree NOT to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
                  <li>Deploy automated scripts, bots, spiders, crawlers, or high-volume scrapers that degrade server availability, bypass caching, or extract proprietary software logic for commercial resale.</li>
                  <li>Circumvent, disable, or tamper with security features, CORS headers, rate limiters, or programmatic controls.</li>
                  <li>Frame, embed, or republish our calculators inside third-party commercial applications without attribution and prior written consent.</li>
                  <li>Introduce malicious code, trojans, denial-of-service vectors, or automated form submission storms.</li>
                </ul>
              </section>

              {/* 5. Non-Affiliation */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  5. Non-Affiliation with Government Authorities
                </h2>
                <p>
                  Calculadora SAT is an independent educational portal. It has <strong>no organizational affiliation, sponsorship, official endorsement, or partnership</strong> with the Servicio de Administración Tributaria (SAT), the Instituto Mexicano del Seguro Social (IMSS), the Secretaría del Trabajo y Previsión Social (STPS), the Diario Oficial de la Federación (DOF), the Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT), or any other government institution in Mexico, Peru, or elsewhere.
                </p>
              </section>

              {/* 6. Modifications to Terms */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  6. Modifications to the Service and Terms
                </h2>
                <p>
                  We reserve the right to modify, revise, or update these Terms and Conditions at any time to reflect legislative tax updates (such as annual UMA and minimum wage adjustments), technical improvements, or changes in regulatory policy. Revised terms take effect immediately upon publication on this page with an updated revision date. Your continued use of the platform after updates constitutes binding acceptance of the revised terms.
                </p>
              </section>

              {/* 7. Governing Law and Legal Contact */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  7. Governing Law, Dispute Resolution & Legal Contact
                </h2>
                <p>
                  These Terms and Conditions shall be construed and governed in accordance with general civil and commercial electronic commerce principles. Any dispute arising out of or related to these terms shall be subject to amicable settlement in good faith prior to initiating formal judicial proceedings.
                </p>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Official Legal and Editorial Inquiries:</p>
                  <p>Initiative: <strong>FkDigitalMedia</strong></p>
                  <p>Responsible Director: <strong>Firoz Khan</strong> (<a href="https://www.linkedin.com/in/firoz-khan-1153358a/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">LinkedIn Profile</a>)</p>
                  <p>Direct Legal Email: <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-bold underline">hello@calculadorasat.org</a></p>
                </div>
              </section>
            </div>
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

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="text-4xl">📄</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Términos y Condiciones de Uso
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Última actualización: Febrero de 2026 • Rige todas las herramientas y contenidos de calculadorasat.org
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            <p>
              Bienvenido a <strong>Calculadora SAT</strong> (disponible en <code>calculadorasat.org</code>). Estos Términos y Condiciones constituyen un acuerdo vinculante entre el usuario y la iniciativa digital <strong>FkDigitalMedia</strong>, dirigida por <strong>Firoz Khan</strong>, regulando el acceso, navegación y uso de las herramientas de cálculo interactivo, artículos de divulgación y recursos digitales disponibles en esta plataforma.
            </p>

            <p>
              Al acceder, consultar o utilizar cualquiera de nuestros simuladores de impuestos, nómina o divisas, aceptas de manera plena y sin reservas estos Términos y Condiciones. Si no estás de acuerdo con alguna de las disposiciones aquí establecidas, debes abstenerte de utilizar el sitio web.
            </p>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* 1. Términos de uso */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                1. Términos de Uso de las Calculadoras y Simuladores
              </h2>
              <p>
                Calculadora SAT otorga una licencia limitada, no exclusiva, revocable e intransferible para utilizar las herramientas de cálculo con fines estrictamente informativos, pedagógicos, de planeación fiscal personal o análisis preliminar de nómina.
              </p>
              <p>
                Las herramientas ejecutan algoritmos matemáticos basados en disposiciones oficiales vigentes (tales como las tarifas del Artículo 96 y 152 de la Ley del ISR, Artículo 87 de la Ley Federal del Trabajo, tablas del IMSS y resoluciones de la SUNAT en Perú). No obstante, los resultados generados constituyen estimaciones de referencia y no sustituyen comprobantes fiscales digitales (CFDI) ni determinaciones oficiales emitidas por las autoridades competentes.
              </p>
            </section>

            {/* 2. Propiedad Intelectual */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                2. Propiedad Intelectual del Contenido Original
              </h2>
              <p>
                El diseño visual, arquitectura de software, código de las calculadoras interactivas, guías editoriales, artículos explicativos, logotipos y compilaciones técnicas alojadas en <code>calculadorasat.org</code> son propiedad intelectual exclusiva de <strong>FkDigitalMedia</strong> y están protegidos por las leyes de derechos de autor y propiedad intelectual aplicables.
              </p>
              <p>
                Las leyes federales, decretos, tablas tributarias y regulaciones oficiales del Estado mexicano (DOF, SAT, IMSS) y de la República del Perú (SUNAT, MEF) son del dominio público normativo. Sin embargo, su estructura algorítmica, presentación gráfica y notas didácticas están protegidas, prohibiéndose la reproducción no autorizada, clonación masiva o redistribución comercial sin consentimiento previo por escrito.
              </p>
            </section>

            {/* 3. Limitación de Responsabilidad */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                3. Limitación de Responsabilidad (Fines Informativos y Didácticos)
              </h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2">
                <p>
                  ⚠️ <strong>AVISO LEGAL FUNDAMENTAL:</strong> Las calculadoras, comparadores y artículos de este portal son de naturaleza exclusivamente didáctica e informativa. <strong>No constituyen bajo ninguna circunstancia asesoría contable, fiscal, legal, laboral ni financiera vinculante.</strong>
                </p>
                <p>
                  La situación fiscal o laboral de cada contribuyente o trabajador presenta variables particulares (deducciones personales, régimen societario, antecedentes contractuales) que requieren el criterio colegiado de un Contador Público Certificado o un Abogado Laboralista con cédula profesional antes de presentar declaraciones anuales, emitir finiquitos o formalizar acuerdos de pago.
                </p>
              </div>
              <p>
                En ningún caso <strong>FkDigitalMedia</strong>, <strong>Firoz Khan</strong>, ni sus colaboradores serán legalmente responsables por pérdidas financieras, recargos, multas, diferencias de liquidación o resoluciones desfavorables derivadas de la interpretación o uso de los datos arrojados por nuestras calculadoras. Para mayor detalle, consulta nuestro <Link href="/disclaimer" className="underline font-bold text-blue-600 dark:text-blue-400">Aviso Legal y Deslinde de Responsabilidad</Link>.
              </p>
            </section>

            {/* 4. Uso Aceptable y Prohibición de Scraping */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                4. Uso Aceptable y Prohibición de Extracción Abusiva (Scraping)
              </h2>
              <p>
                El usuario se compromete a hacer un uso lícito y ético de la plataforma. Queda expresamente prohibido:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
                <li>Utilizar robots, spiders, scrapers o mecanismos automatizados de extracción que saturen la infraestructura, alteren el rendimiento de los servidores o recopilen masivamente contenidos para su reventa o réplica no autorizada.</li>
                <li>Intentar vulnerar los mecanismos de seguridad, cabeceras técnicas, tokens de sesión o controles de acceso del sitio web.</li>
                <li>Incrustar o enlazar herramientas del sitio en marcos (iframes o webviews) de terceros sin acreditación clara y consentimiento previo por escrito.</li>
                <li>Utilizar el portal para transmitir software malicioso, virus o cualquier vector que afecte a otros usuarios o a los sistemas del servidor.</li>
              </ul>
            </section>

            {/* 5. Declaración de No Afiliación */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                5. Declaración de Independencia y No Afiliación Oficial
              </h2>
              <p>
                Calculadora SAT es una plataforma tecnológica e informativa independiente. <strong>NO está vinculada, patrocinada, administrada ni avalada oficialmente</strong> por el Servicio de Administración Tributaria (SAT), el Instituto Mexicano del Seguro Social (IMSS), la Secretaría del Trabajo y Previsión Social (STPS), el Gobierno de México, ni por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de la República del Perú.
              </p>
            </section>

            {/* 6. Modificaciones a los Términos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                6. Modificaciones a los Términos y a la Plataforma
              </h2>
              <p>
                Nos reservamos el derecho de modificar, actualizar o sustituir estos Términos y Condiciones en cualquier momento con el fin de reflejar reformas legales (tales como la publicación de nuevas tarifas de ISR, valores de la UMA o salarios mínimos de la CONASAMI) o mejoras de seguridad. Las modificaciones entrarán en vigor a partir de su publicación en esta página. El uso continuado del sitio tras la publicación de cambios constituye la aceptación plena de los términos actualizados.
              </p>
            </section>

            {/* 7. Jurisdicción y Contacto Legal */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                7. Jurisdicción Aplicable y Contacto Legal
              </h2>
              <p>
                Para la interpretación y cumplimiento de estos Términos y Condiciones, las partes acuerdan privilegiar la resolución pacífica y de buena fe ante cualquier inquietud o controversia. En caso de requerir aclaraciones legales formales, el usuario puede ponerse en contacto directo con los responsables del proyecto:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Atención Legal y Dirección del Sitio:</p>
                <p>Iniciativa Digital: <strong>FkDigitalMedia</strong></p>
                <p>Responsable: <strong>Firoz Khan</strong> (<a href="https://www.linkedin.com/in/firoz-khan-1153358a/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Perfil de LinkedIn</a>)</p>
                <p>Correo Electrónico Oficial: <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-bold underline">hello@calculadorasat.org</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
