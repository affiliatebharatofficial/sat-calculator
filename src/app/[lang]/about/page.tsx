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
    title: lang === 'en'
      ? 'About Us | Calculadora SAT & FkDigitalMedia'
      : 'Acerca de Nosotros | Calculadora SAT y FkDigitalMedia',
    description: lang === 'en'
      ? 'Learn about Calculadora SAT, an independent digital initiative operated by FkDigitalMedia and created by Firoz Khan to provide transparent financial and tax calculators in Mexico and Peru.'
      : 'Conoce Calculadora SAT, una iniciativa digital independiente operada por FkDigitalMedia y creada por Firoz Khan para ofrecer herramientas y calculadoras financieras y fiscales transparentes en México y Perú.',
    alternates: seoAlternates,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
        <Header lang={lang} />

        <main className="max-w-3xl mx-auto px-4 py-12 flex-grow">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👥</span>
              <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
                About Us
              </h1>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Calculadora SAT is an independent online calculation platform operated and maintained by <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, with a primary focus on Mexico&apos;s tax, labor, and payroll systems (SAT, LISR, LIVA, LFT, and IMSS).
              </p>

              <p>
                The purpose of this website is to provide practical online calculators and explanatory resources designed to make complex fiscal, payroll, and personal finance calculations easier to understand. In a regulatory environment where tax laws and labor provisions evolve constantly, our platform allows employees, freelancers, small businesses, and accountants to simulate tax withholdings, social security contributions, VAT breakdowns, and severance pay without needing to navigate through intricate legal texts.
              </p>

              <p>
                Each calculator is built with transparency in mind: where applicable, our tools clearly display the underlying mathematical methodology, step-by-step calculation formulas, realistic examples, citations of official legal statutes, and explicit operational limitations.
              </p>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              {/* Creator & Digital Initiative Section */}
              <section className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">👤</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    The Person and Initiative Behind Calculadora SAT
                  </h2>
                </div>

                <div className="space-y-3 text-slate-600 dark:text-slate-350">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Firoz Khan</strong> is the person responsible for the development, technical architecture, and ongoing management of Calculadora SAT.
                  </p>
                  <p>
                    Calculadora SAT is developed and maintained as part of <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, the digital initiative behind the creation, deployment, and content maintenance of this web platform.
                  </p>
                  <p>
                    We believe in open transparency and accountability for digital tools. Users and professionals interested in learning more about Firoz Khan, his background, or getting in touch can view his official professional profile on LinkedIn:
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>Connect with Firoz Khan on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </section>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why Mexico and Peru?</h2>
              <p>
                Mexico represents our core specialization and original purpose. However, with the rise of remote work, cross-border contracting, and digital trade across Latin America, many professionals and businesses operate between Mexico and Peru.
              </p>
              <p>
                To serve these users without compromising accuracy or creating normative confusion, we established a separate section of dedicated <strong className="text-slate-800 dark:text-slate-100">Peru Tools</strong>. This section provides tailored calculators for Peruvian labor mandates (CTS, Gratificaciones de Ley, Renta de 5ta Categoría) and tax references (SUNAT, IGV 18%, USD/PEN exchange rates). Both jurisdictions are kept strictly separate so users can easily identify country-specific resources without ambiguity.
              </p>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Independent Portal & Non-Affiliation Notice</h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <p className="font-semibold mb-1">⚠️ Important Legal Notice:</p>
                <p>
                  Calculadora SAT is an independent educational portal. It is <strong>NOT affiliated with, authorized, endorsed, or sponsored by</strong> the Servicio de Administración Tributaria (SAT) of Mexico, the Instituto Mexicano del Seguro Social (IMSS), the Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) of Peru, the Ministerio de Trabajo y Promoción del Empleo (MTPE), nor any other government agency or public institution. All calculations are mathematical estimates intended for simulation, planning, and informational purposes only, and do not constitute binding tax, legal, or financial advice.
                </p>
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
              <p>
                Democratize access to reliable, robust, and updated fiscal calculation tools in accordance with applicable legal frameworks (LISR, LIVA, LFT, IMSS in Mexico; SUNAT and Peruvian Labor Decrees in Peru), empowering taxpayers and employees to plan their finances and audit their payroll stubs.
              </p>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">🎯 Precision</h3>
                  <p className="text-xs text-slate-400">We mathematically audit our rates against official publications from the Mexican DOF and Peruvian SUNAT/El Peruano.</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">⚡ Speed</h3>
                  <p className="text-xs text-slate-400">We develop a fast-loading SPA architecture with instant processing directly in your browser.</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">🔒 Total Privacy</h3>
                  <p className="text-xs text-slate-400">Your financial data is processed on-device and is never stored in external databases.</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">💡 Accessibility</h3>
                  <p className="text-xs text-slate-400">We design clean UIs that break down complex arithmetic and legal deductions step-by-step.</p>
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Methodology for Rate Maintenance & Formula Updates</h2>
              <p>
                To maintain mathematical accuracy, our tools are continuously aligned with publicly published statutes and official government gazettes:
              </p>
              <div className="space-y-4 mt-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span>🇲🇽</span> Mexican Regulatory Monitoring
                  </h3>
                  <ul className="list-disc pl-5 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li><strong>Diario Oficial de la Federación (DOF):</strong> We monitor published decrees, the annual Resolución Miscelánea Fiscal (RMF), and Annex 8 tables for progressive Income Tax (ISR Art. 96 and 152).</li>
                    <li><strong>INEGI (UMA):</strong> The Unidad de Medida y Actualización (UMA) is verified every January upon release and updated effective February 1st.</li>
                    <li><strong>CONASAMI:</strong> General minimum wage and Northern Border Free Zone (ZLFN) values are audited every January.</li>
                    <li><strong>IMSS & LSS:</strong> Worker-employer contribution tiers, disability insurance brackets, and 25-UMA maximum contribution caps are audited according to the Ley del Seguro Social.</li>
                    <li><strong>LFT (Labor Law):</strong> Calculations for severance, seniority premiums, and statutory holidays adhere strictly to the Ley Federal del Trabajo.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span>🇵🇪</span> Peruvian Regulatory Monitoring
                  </h3>
                  <ul className="list-disc pl-5 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li><strong>Diario Oficial El Peruano & MEF:</strong> Annual Unidad Impositiva Tributaria (UIT) values are updated immediately upon enactment.</li>
                    <li><strong>SUNAT (Quinta Categoría & IGV):</strong> Progressive withholding brackets (8% to 30%), 7-UIT automatic deductions, and the 18% IGV rate (16% + 2% IPM) are programmed according to D.S. N° 179-2004-EF and D.S. N° 055-99-EF.</li>
                    <li><strong>MTPE (Labor Benefits):</strong> Formulas for CTS (D.S. N° 001-97-TR) and statutory bonuses/Gratificaciones (Ley N° 27735 & Ley N° 30334) reflect exact legal vesting rules.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transparency Commitment & Contact</h2>
              <p>
                Calculadora SAT operates with an explicit commitment to transparency and truthfulness. We do not claim to be a licensed public accounting firm, a law practice, or a government agency. We do not invent fictitious professional qualifications, certifications, corporate titles, or fabricated advisory committees.
              </p>
              <p>
                Our work consists of reviewing publicly enacted statutes, transforming their formulas into open computational algorithms, and offering accessible web calculators. If you discover any formula discrepancy, recent regulatory change, or have feedback, please write directly to <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">hello@calculadorasat.org</a>.
              </p>
            </div>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-3xl mx-auto px-4 py-12 flex-grow">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👥</span>
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Acerca de Nosotros
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
              Calculadora SAT es una plataforma digital independiente de cálculo financiero y tributario operada y mantenida por <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, cuyo eje principal es la normativa fiscal, laboral y de nómina en México (SAT, LISR, LIVA, LFT e IMSS).
            </p>

            <p>
              El propósito de este sitio web es ofrecer calculadoras en línea prácticas y recursos explicativos diseñados para facilitar la comprensión de cálculos fiscales, laborales y de finanzas personales que suelen ser complejos. En un entorno donde las regulaciones tributarias y las disposiciones de seguridad social cambian con frecuencia, nuestra plataforma permite a trabajadores asalariados, profesionales independientes, emprendedores y contadores simular retenciones de ISR, cuotas obrero-patronales del IMSS, desgloses de IVA y liquidaciones laborales de forma inmediata y sin necesidad de descifrar tratados legales extensos.
            </p>

            <p>
              Cada herramienta está diseñada bajo un principio de máxima transparencia metodológica: siempre que resulta aplicable, se incluye la metodología empleada, el desglose matemático paso a paso, ejemplos realistas, referencias a las fuentes legales oficiales correspondientes y las limitaciones de alcance del cálculo.
            </p>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            {/* Sección de Identidad: Responsable y Marca Digital */}
            <section className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👤</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  La Persona e Iniciativa Detrás de Calculadora SAT
                </h2>
              </div>

              <div className="space-y-3 text-slate-600 dark:text-slate-350">
                <p>
                  <strong className="text-slate-900 dark:text-white">Firoz Khan</strong> es la persona responsable del desarrollo, arquitectura técnica y gestión de Calculadora SAT.
                </p>
                <p>
                  Calculadora SAT se desarrolla y mantiene como parte de <strong className="text-slate-900 dark:text-white">FkDigitalMedia</strong>, la iniciativa digital detrás de la creación, publicación y soporte continuo de este sitio web.
                </p>
                <p>
                  Creemos firmemente en la transparencia y en ofrecer una identidad verificable para los usuarios de nuestras herramientas. Si deseas conocer más sobre la trayectoria de Firoz Khan o conectar profesionalmente con él, puedes consultar su perfil oficial en LinkedIn:
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/in/firoz-khan-1153358a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Ver perfil de Firoz Khan en LinkedIn</span>
                  </a>
                </div>
              </div>
            </section>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">¿Por qué herramientas de México y Perú?</h2>
            <p>
              México constituye el núcleo fundamental y el motivo original de ser de esta plataforma. No obstante, con la expansión del trabajo remoto, la contratación transfronteriza y el comercio digital entre países hispanohablantes, un número significativo de usuarios opera entre México y Perú.
            </p>
            <p>
              Para dar respuesta a estas necesidades sin mezclar ni distorsionar las normas de cada país, creamos una sección independiente dedicada a las <strong className="text-slate-800 dark:text-slate-100">Herramientas de Perú</strong>. En ella se agrupan calculadoras específicas de la legislación laboral peruana (CTS, Gratificaciones de ley, Renta de 5ta Categoría) y tributaria (SUNAT, IGV 18%, tipo de cambio Soles/Dólares). Ambos ecosistemas permanecen estrictamente separados para que cualquier usuario identifique con claridad los recursos aplicables a su jurisdicción.
            </p>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portal Independiente y Deslinde de Responsabilidad</h2>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200">
              <p className="font-semibold mb-1">⚠️ Aviso Legal Relevante:</p>
              <p>
                Calculadora SAT es un sitio web de divulgación tecnológica e información cuantitativa independiente. <strong>NO está afiliado, patrocinado, avalado ni vinculado formalmente</strong> con el Servicio de Administración Tributaria (SAT) de México, ni con el Instituto Mexicano del Seguro Social (IMSS), ni con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú, ni con el Ministerio de Trabajo y Promoción del Empleo (MTPE), ni con ninguna otra entidad gubernamental. Todas las herramientas son simuladores matemáticos de carácter estimativo y didáctico, por lo que no sustituyen la asesoría profesional vinculante de un contador público colegiado o un abogado especialista.
              </p>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nuestra Misión</h2>
            <p>
              Democratizar el acceso a herramientas de cálculo fiscal confiables, transparentes y actualizadas con el marco legal aplicable (LISR, LIVA, LFT e IMSS en México; normativas de SUNAT y leyes laborales en Perú), empoderando a contribuyentes y trabajadores para planificar su flujo de caja y auditar sus recibos de pago.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nuestros Valores Fundamentales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">🎯 Precisión</h3>
                <p className="text-xs text-slate-450">Auditamos nuestras fórmulas contra las publicaciones oficiales del DOF del SAT en México y El Peruano / SUNAT en Perú.</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">⚡ Velocidad</h3>
                <p className="text-xs text-slate-450">Desarrollamos una arquitectura de carga inmediata y procesamiento en el navegador.</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">🔒 Privacidad Total</h3>
                <p className="text-xs text-slate-450">Tus datos financieros se calculan en tu dispositivo y nunca se almacenan en servidores externos.</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">💡 Accesibilidad</h3>
                <p className="text-xs text-slate-450">Diseñamos una interfaz limpia que desglosa paso a paso deducciones, tasas y retenciones.</p>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Metodología de Mantenimiento y Actualización de Tablas</h2>
            <p>
              Para asegurar la exactitud de los cálculos, mantenemos un seguimiento riguroso de las publicaciones normativas emitidas por los organismos oficiales:
            </p>
            <div className="space-y-4 mt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span>🇲🇽</span> Monitoreo Normativo en México
                </h3>
                <ul className="list-disc pl-5 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Diario Oficial de la Federación (DOF):</strong> Monitoreamos decretos, reformas fiscales y los anexos de la Resolución Miscelánea Fiscal (RMF) para actualizar las tablas de retención de ISR (Art. 96 y 152 LISR).</li>
                  <li><strong>INEGI (UMA):</strong> El valor diario, mensual y anual de la Unidad de Medida y Actualización (UMA) se actualiza de inmediato tras su publicación en enero con entrada en vigor el 1 de febrero.</li>
                  <li><strong>CONASAMI:</strong> Los salarios mínimos generales y de la Zona Libre de la Frontera Norte (ZLFN) se auditan al inicio de cada año fiscal.</li>
                  <li><strong>IMSS y Ley del Seguro Social:</strong> Las cuotas de cesantía, vejez, enfermedad y maternidad, así como el tope de 25 UMAs, se mantienen al día conforme a la legislación social vigente.</li>
                  <li><strong>Ley Federal del Trabajo (LFT):</strong> Regulaciones sobre aguinaldo, prima de antigüedad, finiquitos y la reforma de Vacaciones Dignas están incorporadas estrictamente en los algoritmos.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span>🇵🇪</span> Monitoreo Normativo en Perú
                </h3>
                <ul className="list-disc pl-5 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Diario Oficial El Peruano y MEF:</strong> El valor de la Unidad Impositiva Tributaria (UIT) se actualiza anualmente tras el Decreto Supremo correspondiente.</li>
                  <li><strong>SUNAT (Renta 5ta e IGV):</strong> La escala acumulativa (8% al 30%), la deducción inafecta de 7 UIT y la tasa del 18% de IGV (16% + 2% IPM) se aplican según el D.S. N° 179-2004-EF y el D.S. N° 055-99-EF.</li>
                  <li><strong>MTPE y Legislación Laboral:</strong> Las fórmulas de CTS (D.S. N° 001-97-TR) y Gratificaciones con Bonificación Extraordinaria (Ley N° 27735 y Ley N° 30334) calculan los devengados semestrales según los criterios oficiales del Ministerio de Trabajo.</li>
                </ul>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Compromiso de Transparencia y Contacto</h2>
            <p>
              Calculadora SAT opera con un compromiso explícito de transparencia y veracidad. No pretendemos ser un despacho contable colegiado, un bufete jurídico ni un organismo gubernamental; no inventamos credenciales profesionales no verificables, grados de colegiatura inexistentes ni comités de expertos ficticios.
            </p>
            <p>
              Nuestra labor consiste en estudiar la normativa legal pública vigente, traducirla en algoritmos matemáticos abiertos y ofrecer simuladores rápidos, claros y gratuitos. Si detectas cualquier discrepancia en alguna fórmula o tabla, o deseas hacernos llegar tus sugerencias, te invitamos a escribirnos directamente a <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">hello@calculadorasat.org</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

