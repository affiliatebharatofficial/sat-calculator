import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  const title = isEn ? 'Privacy and Data Protection Policy' : 'Política de Privacidad y Protección de Datos';
  const description = isEn
    ? 'Comprehensive Privacy Policy of CalculadoraSAT. Learn about data minimization, local browser calculations, cookies, GDPR compliance, and Mexican ARCO rights.'
    : 'Política de Privacidad y Protección de Datos de Calculadora SAT. Conoce el tratamiento de datos, minimización, procesamiento local en navegador, cookies, GDPR y derechos ARCO.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? 'https://www.calculadorasat.org/en/privacy' : 'https://www.calculadorasat.org/privacy',
      languages: {
        es: 'https://www.calculadorasat.org/privacy',
        en: 'https://www.calculadorasat.org/en/privacy',
        'x-default': 'https://www.calculadorasat.org/privacy',
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? 'https://www.calculadorasat.org/en/privacy' : 'https://www.calculadorasat.org/privacy',
      siteName: 'CalculadoraSAT',
      images: [
        {
          url: 'https://www.calculadorasat.org/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isEn ? 'en_US' : 'es_MX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.calculadorasat.org/og-image.png'],
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
        <Header lang={lang} />

        <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-4xl">🛡️</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Privacy and Data Protection Policy
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Last updated: September 20, 2026 • Applies to all tools, simulations, and services at calculadorasat.org
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <p>
                At <strong>Calculadora SAT</strong> (&ldquo;Calculadora SAT&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Site&rdquo;), we respect the privacy of our visitors and users. This Privacy Policy explains what information we may collect, how we use it, with whom we may share it, how long we retain it, and the legal rights that may apply to you under relevant regulations.
              </p>
              <p>
                This Policy applies to the website: <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline font-semibold">https://www.calculadorasat.org/</a>
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200 rounded-2xl text-xs sm:text-sm leading-relaxed">
                ℹ️ <strong>Independent Platform Statement:</strong> Calculadora SAT is an independent platform offering tax, labor, and financial calculation tools for educational, informational, and simulation purposes. We are not a government entity and have no official affiliation, sponsorship, or endorsement with SAT Mexico, IMSS, SUNAT (Peru), or any other tax or labor authority.
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">1. Data Controller</h2>
                <p>The data controller responsible for personal data processed through the Site is:</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl text-xs space-y-1">
                  <p><strong>Controller:</strong> Calculadora SAT / FkDigitalMedia</p>
                  <p><strong>Website:</strong> <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline">https://www.calculadorasat.org/</a></p>
                  <p><strong>General Privacy Email:</strong> <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">hello@calculadorasat.org</a></p>
                </div>
                <p>For inquiries regarding privacy, data protection, user rights, or personal data handling, you may write to us at <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-semibold">hello@calculadorasat.org</a>.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">2. Information We Collect</h2>
                <p>We apply the principle of <strong>data minimization</strong> and aim to collect only the information necessary to operate, protect, and improve the Site.</p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">2.1 Data Entered in Calculators</h3>
                <p>Calculators may request inputs such as salaries, income, deductions, monetary amounts, days worked, dates, and related simulation parameters. <strong>Calculations are processed locally in your browser</strong> whenever designed for client-side execution. Input values are not stored in external databases simply by utilizing our calculators. Users should avoid entering unnecessary sensitive personal data such as RFC/CURP, bank accounts, or passwords.</p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">2.2 Technical Information</h3>
                <p>Standard technical information sent by your browser may be processed by hosting and analytics services: anonymized IP address, approximate geographical location, browser type/version, operating system, pages visited, referral URL, and timestamps.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">3. Information Submitted via Forms or Contact</h2>
                <p>If you reach out via email or contact forms, we may collect your name, email address, and message contents strictly to answer your query, provide technical support, investigate issues, and maintain communication records.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">4. Cookies and Tracking Technologies</h2>
                <p>We use cookies, local storage, and similar technologies to maintain site operation, remember preferences, measure performance, and prevent abuse. Prior consent is requested for non-essential cookies where legally required.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">5. Google Analytics and Measurement Tools</h2>
                <p>We use analytics tools such as Google Analytics to understand aggregate traffic patterns and improve content and performance. Analytics cookies are enabled in accordance with user consent preferences.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">6. Artificial Intelligence Assistant</h2>
                <p>When using AI-driven features, questions and prompts are processed by our technology provider to generate answers, ensure security, and prevent abuse. Please avoid submitting passwords or sensitive financial data.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">7. Purposes of Processing</h2>
                <p>We process personal data for necessary operational purposes (site provision, inquiry replies, security, fraud prevention), analytics and improvement (measuring features, evaluating performance), and requested communications.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">8. Legal Bases (GDPR)</h2>
                <p>Under the GDPR, we rely on Consent, Performance of a Requested Service, Legal Compliance, and Legitimate Interests (site security, technical analysis, and abuse prevention).</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">9. Categories of Recipients and Third Parties</h2>
                <p>We share data only with necessary service providers: cloud hosting, CDN, analytics, email, security, and AI infrastructure. <strong>We do not sell personal data to third parties.</strong></p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">10. International Data Transfers</h2>
                <p>International data transfers are conducted under recognized legal safeguards, such as European Commission adequacy decisions, Standard Contractual Clauses (SCCs), and appropriate technical measures.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">11. Data Retention</h2>
                <p>Data is retained only as long as necessary for the purpose collected: contact records for support follow-up, technical logs for a limited diagnostic window, and zero server retention for client-side calculator inputs.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">12. User Rights Under GDPR</h2>
                <p>Where GDPR applies, users have rights of Access, Rectification, Erasure, Restriction of Processing, Objection, Data Portability, and Consent Withdrawal by contacting <a href="mailto:hello@calculadorasat.org" className="underline font-bold text-blue-600 dark:text-blue-400">hello@calculadorasat.org</a>.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">13. Right to Lodge a Complaint</h2>
                <p>If you believe data processing infringes applicable laws, you may contact us first or file a complaint with your local data protection supervisory authority.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">14. Privacy Rights in Mexico (ARCO Rights)</h2>
                <p>Under Mexican data protection legislation (LFPDPPP), users may exercise their rights of Access, Rectification, Cancellation, and Opposition (ARCO) by emailing <a href="mailto:hello@calculadorasat.org" className="underline font-bold text-blue-600 dark:text-blue-400">hello@calculadorasat.org</a>.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">15. Information from Other Sources & Profiling</h2>
                <p>We do not collect external data to build personal profiles. Calculators are mathematical simulation tools that do not make automated legal or financial determinations.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">16. Security & Minors</h2>
                <p>We implement technical and organizational safeguards against unauthorized access. The site is not intended to collect personal data from minors.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">17. Third-Party Links & Policy Updates</h2>
                <p>External websites linked from our pages have their own policies. We may update this policy periodically to reflect legal and technical changes.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">18. Contact Information</h2>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-1">
                  <p><strong>Initiative:</strong> Calculadora SAT / FkDigitalMedia</p>
                  <p><strong>Official Email:</strong> <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">hello@calculadorasat.org</a></p>
                  <p><strong>Website:</strong> <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline">https://www.calculadorasat.org/</a></p>
                </div>
              </section>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 rounded-2xl text-xs leading-relaxed space-y-2">
                <p className="font-bold">⚠️ Important Notice Regarding Calculations:</p>
                <p>Calculadora SAT provides estimations for educational, informational, and planning purposes. Results do not constitute certified tax, legal, or accounting advice. Users must verify all figures with a qualified professional before making tax filings or financial decisions.</p>
              </div>

              <p className="text-xs text-slate-400 text-center pt-4">
                © 2026 Calculadora SAT. All rights reserved.
              </p>
            </div>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    );
  }

  // Spanish Version (Full Official Legal Text)
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="text-4xl">🛡️</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Política de Privacidad y Protección de Datos
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Última actualización: 20 de septiembre de 2026 • Rige todas las herramientas y servicios de calculadorasat.org
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            <p>
              En <strong>Calculadora SAT</strong> (&ldquo;Calculadora SAT&rdquo;, &ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo; o &ldquo;el Sitio&rdquo;) respetamos la privacidad de nuestros visitantes y usuarios. Esta Política de Privacidad explica qué información podemos recopilar, para qué la utilizamos, con quién podemos compartirla, cuánto tiempo podemos conservarla y cuáles son los derechos que pueden corresponderle en virtud de la normativa aplicable.
            </p>

            <p>
              Esta Política se aplica al sitio web:{' '}
              <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                https://www.calculadorasat.org/
              </a>
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200 rounded-2xl text-xs sm:text-sm leading-relaxed">
              ℹ️ <strong>Plataforma Independiente:</strong> Calculadora SAT es una plataforma independiente de herramientas de cálculo fiscal, laboral y financiero con fines informativos, educativos y de simulación. No somos una entidad gubernamental y no estamos afiliados, patrocinados ni respaldados oficialmente por el SAT de México, IMSS, SUNAT u otra autoridad tributaria.
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* 1. Responsable del tratamiento de datos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                1. Responsable del tratamiento de datos
              </h2>
              <p>
                El responsable del tratamiento de los datos personales recopilados a través del Sitio es:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl text-xs space-y-1">
                <p><strong>Responsable / Controlador:</strong> Calculadora SAT / FkDigitalMedia</p>
                <p><strong>Dirección web:</strong> <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline">https://www.calculadorasat.org/</a></p>
                <p><strong>Correo general de privacidad:</strong> <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">hello@calculadorasat.org</a></p>
              </div>
              <p>
                Para cuestiones relacionadas específicamente con privacidad, protección de datos, solicitudes de derechos o tratamiento de información personal, puede escribirnos a:{' '}
                <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  hello@calculadorasat.org
                </a>
              </p>
              <p className="text-xs text-slate-500">
                Cuando resulte legalmente obligatorio designar un Delegado de Protección de Datos (DPO) para una actividad concreta, los datos de contacto correspondientes se publicarán en esta Política o se facilitarán al interesado.
              </p>
            </section>

            {/* 2. Qué información recopilamos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                2. Qué información recopilamos
              </h2>
              <p>
                Aplicamos un principio de <strong>minimización de datos</strong> y procuramos recopilar únicamente la información necesaria para operar, proteger y mejorar el Sitio.
              </p>
              <p>
                Dependiendo de cómo utilice nuestros servicios, podemos tratar las siguientes categorías de información:
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">
                2.1 Datos introducidos en las calculadoras
              </h3>
              <p>Las calculadoras pueden solicitar información como:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>salario;</li>
                <li>ingresos;</li>
                <li>deducciones;</li>
                <li>importes monetarios;</li>
                <li>días trabajados;</li>
                <li>fechas;</li>
                <li>información relacionada con prestaciones;</li>
                <li>variables utilizadas para simulaciones fiscales;</li>
                <li>otros parámetros necesarios para realizar un cálculo.</li>
              </ul>
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-300 rounded-xl text-xs space-y-1.5">
                <p>
                  ✅ <strong>Procesamiento local en tu navegador:</strong> Los cálculos realizados directamente en el navegador se procesan localmente cuando la funcionalidad técnica correspondiente está diseñada para ello.
                </p>
                <p>
                  Los valores introducidos en dichas calculadoras <strong>no se almacenan deliberadamente en una base de datos externa</strong> simplemente por utilizar la calculadora.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Los usuarios deben evitar introducir información personal innecesaria, nombres completos, números de identificación fiscal, números de cuenta bancaria, tarjetas de crédito, contraseñas u otra información confidencial cuando dicha información no sea necesaria para la función utilizada.
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">
                2.2 Información técnica
              </h3>
              <p>
                Cuando visita nuestro Sitio, determinados sistemas técnicos, servidores, proveedores de alojamiento o herramientas analíticas pueden procesar información técnica, que puede incluir:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>dirección IP;</li>
                <li>información aproximada de ubicación derivada de la IP;</li>
                <li>tipo y versión del navegador;</li>
                <li>sistema operativo;</li>
                <li>tipo de dispositivo;</li>
                <li>idioma y configuración regional;</li>
                <li>páginas visitadas;</li>
                <li>URL de referencia;</li>
                <li>fecha y hora de acceso;</li>
                <li>duración aproximada de la visita;</li>
                <li>eventos de navegación;</li>
                <li>información técnica necesaria para seguridad, funcionamiento y prevención de abuso.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Cuando sea técnicamente posible y apropiado, utilizaremos mecanismos de anonimización, truncamiento o agregación para reducir la identificación directa.
              </p>
            </section>

            {/* 3. Información enviada mediante formularios o contacto */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                3. Información enviada mediante formularios o contacto
              </h2>
              <p>
                Si usted decide ponerse en contacto con nosotros por correo electrónico o mediante un formulario disponible en el Sitio, podemos recopilar:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>nombre;</li>
                <li>dirección de correo electrónico;</li>
                <li>contenido del mensaje;</li>
                <li>archivos o información que usted decida adjuntar;</li>
                <li>información necesaria para responder o gestionar su solicitud.</li>
              </ul>
              <p>Utilizamos esta información principalmente para:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>responder a su solicitud;</li>
                <li>proporcionar soporte;</li>
                <li>investigar problemas técnicos;</li>
                <li>gestionar solicitudes relacionadas con privacidad;</li>
                <li>detectar y prevenir abuso;</li>
                <li>mantener registros necesarios de nuestras comunicaciones.</li>
              </ul>
              <p className="text-xs text-slate-500">
                No solicitamos información personal sensible cuando no sea necesaria.
              </p>
            </section>

            {/* 4. Cookies y tecnologías similares */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                4. Cookies y tecnologías similares
              </h2>
              <p>
                Calculadora SAT puede utilizar cookies, almacenamiento local, píxeles u otras tecnologías similares.
              </p>
              <p>Estas tecnologías pueden utilizarse para:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>mantener el funcionamiento del Sitio;</li>
                <li>recordar determinadas preferencias;</li>
                <li>analizar el tráfico;</li>
                <li>medir el rendimiento;</li>
                <li>detectar errores;</li>
                <li>mejorar la experiencia del usuario;</li>
                <li>proteger el Sitio contra abuso;</li>
                <li>proporcionar funcionalidades de terceros cuando estas sean utilizadas.</li>
              </ul>
              <p>
                Algunas cookies pueden ser propias y otras pueden pertenecer a proveedores externos.
              </p>
              <p>
                Cuando la legislación aplicable requiera consentimiento previo para determinadas cookies no esenciales, solicitaremos dicho consentimiento mediante un mecanismo de gestión de cookies.
              </p>
              <p>
                El usuario puede retirar o modificar su consentimiento cuando el mecanismo de gestión de cookies disponible lo permita. También puede configurar su navegador para bloquear o eliminar cookies. Sin embargo, algunas funciones del Sitio podrían no funcionar correctamente.
              </p>
            </section>

            {/* 5. Google Analytics y servicios de análisis */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                5. Google Analytics y servicios de análisis
              </h2>
              <p>
                Podemos utilizar servicios de análisis, como Google Analytics, para comprender cómo los visitantes utilizan el Sitio. Estos servicios pueden recopilar información técnica y de interacción, dependiendo de la configuración implementada.
              </p>
              <p>La información analítica puede utilizarse para:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>comprender el tráfico;</li>
                <li>medir páginas y funcionalidades utilizadas;</li>
                <li>detectar problemas;</li>
                <li>mejorar el rendimiento;</li>
                <li>analizar tendencias agregadas;</li>
                <li>mejorar el contenido y la experiencia del usuario.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Cuando el uso de cookies analíticas requiera consentimiento conforme a la legislación aplicable, estas tecnologías se activarán únicamente de acuerdo con las preferencias seleccionadas por el usuario.
              </p>
            </section>

            {/* 6. Asistente de Inteligencia Artificial */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                6. Asistente de Inteligencia Artificial
              </h2>
              <p>
                Calculadora SAT puede ofrecer funcionalidades basadas en Inteligencia Artificial, como un asistente para responder preguntas fiscales, laborales o financieras.
              </p>
              <p>Cuando el usuario utilice una función de IA:</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>la información introducida puede ser procesada por el proveedor tecnológico necesario para proporcionar dicha funcionalidad;</li>
                <li>el contenido puede incluir la pregunta o información proporcionada voluntariamente por el usuario;</li>
                <li>no debe introducir información personal innecesaria, credenciales, números de tarjetas, contraseñas o información altamente confidencial;</li>
                <li>el tratamiento se limitará a lo necesario para proporcionar la funcionalidad, seguridad, prevención de abuso y mantenimiento del servicio.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Cuando corresponda, identificaremos al proveedor tecnológico utilizado para dicha funcionalidad y aplicaremos las garantías contractuales y de protección de datos que sean necesarias.
              </p>
            </section>

            {/* 7. Finalidades del tratamiento */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                7. Finalidades del tratamiento
              </h2>
              <p>Podemos tratar información personal para las siguientes finalidades:</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Finalidades necesarias</h4>
                  <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                    <li>proporcionar y mantener el Sitio;</li>
                    <li>ejecutar funcionalidades solicitadas por el usuario;</li>
                    <li>responder consultas;</li>
                    <li>proporcionar soporte;</li>
                    <li>mantener la seguridad;</li>
                    <li>prevenir fraude, abuso y actividades maliciosas;</li>
                    <li>detectar errores;</li>
                    <li>mantener registros técnicos;</li>
                    <li>cumplir obligaciones legales;</li>
                    <li>responder a solicitudes de autoridades competentes cuando exista una obligación legal válida.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Finalidades analíticas y de mejora</h4>
                  <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                    <li>medir el uso del Sitio;</li>
                    <li>analizar estadísticas agregadas;</li>
                    <li>mejorar nuestras calculadoras;</li>
                    <li>mejorar la navegación;</li>
                    <li>evaluar el rendimiento;</li>
                    <li>desarrollar nuevas funcionalidades.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Comunicaciones</h4>
                  <p className="text-xs sm:text-sm">
                    Si el usuario se suscribe voluntariamente a una comunicación, boletín o servicio similar, podremos utilizar sus datos para enviar las comunicaciones solicitadas. El usuario podrá cancelar dichas comunicaciones cuando corresponda.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Base jurídica del tratamiento — GDPR */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                8. Base jurídica del tratamiento — GDPR
              </h2>
              <p>
                Cuando el Reglamento General de Protección de Datos (GDPR) sea aplicable, podremos basarnos, dependiendo de la actividad concreta, en las siguientes bases jurídicas:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Consentimiento:</strong> Cuando la legislación requiera consentimiento, solicitaremos dicho consentimiento antes del tratamiento correspondiente (por ejemplo, para determinadas cookies no esenciales o tecnologías de seguimiento).</li>
                <li><strong>Ejecución de un servicio solicitado:</strong> Cuando el tratamiento sea necesario para proporcionar una funcionalidad solicitada por el usuario.</li>
                <li><strong>Obligación legal:</strong> Cuando el tratamiento sea necesario para cumplir una obligación legal aplicable.</li>
                <li><strong>Interés legítimo:</strong> Cuando tengamos un interés legítimo (como seguridad del Sitio, prevención de fraude, protección de sistemas, análisis técnico o mejora de servicios), siempre que dicho interés no prevalezca sobre los derechos y libertades del usuario.</li>
              </ul>
            </section>

            {/* 9. Categorías de destinatarios y terceros */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                9. Categorías de destinatarios y terceros
              </h2>
              <p>
                Podemos compartir o permitir el acceso a determinada información con proveedores que nos ayudan a operar el Sitio. Dependiendo de las funcionalidades activas, estos pueden incluir categorías como:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>proveedores de alojamiento;</li>
                <li>proveedores de infraestructura cloud;</li>
                <li>proveedores de analítica;</li>
                <li>proveedores de correo electrónico;</li>
                <li>proveedores de seguridad;</li>
                <li>proveedores de CDN;</li>
                <li>proveedores de servicios de Inteligencia Artificial;</li>
                <li>proveedores de herramientas de consentimiento de cookies;</li>
                <li>proveedores técnicos necesarios para operar determinadas funcionalidades.</li>
              </ul>
              <p className="text-xs sm:text-sm">
                Estos proveedores únicamente deberán recibir la información necesaria para prestar sus respectivos servicios cuando actúen como encargados o proveedores de servicios. <strong>No vendemos deliberadamente información personal de nuestros usuarios a terceros.</strong>
              </p>
            </section>

            {/* 10. Transferencias internacionales de datos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                10. Transferencias internacionales de datos
              </h2>
              <p>
                Algunos proveedores tecnológicos utilizados por el Sitio pueden procesar información en países distintos del país donde se encuentra el usuario. Cuando el GDPR u otra normativa aplicable regule una transferencia internacional de datos personales, procuraremos utilizar un mecanismo legalmente reconocido, que puede incluir:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>una decisión de adecuación de la Comisión Europea;</li>
                <li>Cláusulas Contractuales Tipo (SCC);</li>
                <li>medidas contractuales, técnicas y organizativas adicionales cuando sean necesarias;</li>
                <li>otros mecanismos reconocidos por la legislación aplicable.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Las transferencias se limitarán a lo necesario para prestar el servicio correspondiente.
              </p>
            </section>

            {/* 11. Conservación de los datos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                11. Conservación de los datos
              </h2>
              <p>
                Conservamos los datos personales únicamente durante el tiempo necesario para cumplir las finalidades para las que fueron recopilados, cumplir obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.
              </p>
              <p>Como principio general:</p>
              <ul className="list-disc list-inside pl-2 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Datos de contacto:</strong> Los datos enviados mediante consultas podrán conservarse durante el tiempo razonablemente necesario para responder a la solicitud y mantener un historial de soporte, y posteriormente podrán eliminarse o anonimizarse cuando ya no exista una necesidad legítima o legal para conservarlos.</li>
                <li><strong>Datos técnicos y registros:</strong> Los registros técnicos pueden conservarse durante un período limitado y razonable para seguridad, diagnóstico, prevención de abuso, mantenimiento y cumplimiento de obligaciones legales.</li>
                <li><strong>Datos de consentimiento:</strong> Los registros relacionados con consentimientos y preferencias pueden conservarse durante el período necesario para demostrar y administrar dicho consentimiento.</li>
                <li><strong>Datos introducidos en calculadoras:</strong> Cuando una calculadora funcione mediante procesamiento local en el navegador, los valores introducidos no se conservan en nuestros servidores simplemente por realizar el cálculo.</li>
              </ul>
            </section>

            {/* 12. Derechos de los usuarios bajo el GDPR */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                12. Derechos de los usuarios bajo el GDPR
              </h2>
              <p>Cuando el GDPR sea aplicable, el usuario puede tener los siguientes derechos:</p>
              <ul className="list-disc list-inside pl-2 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Derecho de acceso:</strong> Solicitar información sobre si tratamos sus datos personales y obtener una copia de dichos datos cuando corresponda.</li>
                <li><strong>Derecho de rectificación:</strong> Solicitar la corrección de información personal incorrecta o incompleta.</li>
                <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de sus datos personales cuando se cumplan los requisitos legales.</li>
                <li><strong>Derecho a la limitación:</strong> Solicitar que restrinjamos temporalmente el tratamiento de sus datos en determinadas circunstancias.</li>
                <li><strong>Derecho de oposición:</strong> Oponerse a determinados tratamientos cuando exista una base jurídica que permita ejercer este derecho.</li>
                <li><strong>Derecho a retirar el consentimiento:</strong> Cuando el tratamiento se base en consentimiento, puede retirarlo en cualquier momento. La retirada del consentimiento no afectará a la legalidad del tratamiento realizado antes de dicha retirada.</li>
                <li><strong>Derecho a la portabilidad:</strong> Cuando sea aplicable, solicitar determinados datos personales en un formato estructurado, de uso común y lectura mecánica, o solicitar su transmisión a otro responsable.</li>
              </ul>
            </section>

            {/* 13. Derecho a presentar una reclamación */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                13. Derecho a presentar una reclamación
              </h2>
              <p>
                Si considera que el tratamiento de sus datos personales infringe la legislación aplicable, puede ponerse primero en contacto con nosotros:{' '}
                <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  hello@calculadorasat.org
                </a>
              </p>
              <p>
                Cuando el GDPR sea aplicable, también puede presentar una reclamación ante la autoridad de protección de datos competente de su lugar de residencia habitual, lugar de trabajo o lugar donde considere que ocurrió la presunta infracción. Para usuarios en la Unión Europea, puede consultar la autoridad nacional de protección de datos correspondiente.
              </p>
            </section>

            {/* 14. Derechos de privacidad aplicables en México */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                14. Derechos de privacidad aplicables en México
              </h2>
              <p>
                Cuando resulte aplicable la legislación mexicana de protección de datos personales, los usuarios podrán ejercer los derechos correspondientes, incluidos los derechos de:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li><strong>Acceso:</strong> conocer qué datos personales tenemos de usted y para qué los utilizamos;</li>
                <li><strong>Rectificación:</strong> solicitar la corrección de su información si está desactualizada, inexacta o incompleta;</li>
                <li><strong>Cancelación:</strong> pedir que se elimine de nuestros registros o bases de datos cuando considere que no está siendo utilizada adecuadamente;</li>
                <li><strong>Oposición:</strong> oponerse al uso de sus datos personales para fines específicos;</li>
              </ul>
              <p>
                conforme a la normativa mexicana aplicable (Derechos ARCO). Las solicitudes pueden enviarse a:{' '}
                <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  hello@calculadorasat.org
                </a>
              </p>
              <p className="text-xs text-slate-500">
                La solicitud deberá proporcionar información suficiente para verificar la identidad del solicitante y localizar los datos correspondientes.
              </p>
            </section>

            {/* 15. Información obtenida de otras fuentes */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                15. Información obtenida de otras fuentes
              </h2>
              <p>
                En general, Calculadora SAT obtiene los datos personales directamente del usuario cuando este:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>utiliza una funcionalidad que requiere información;</li>
                <li>se pone en contacto con nosotros;</li>
                <li>acepta determinadas tecnologías de seguimiento;</li>
                <li>se registra voluntariamente para un servicio.</li>
              </ul>
              <p>
                También podemos recibir información técnica automáticamente desde el navegador, dispositivo, servidor o herramientas de seguridad/analítica utilizadas para operar el Sitio.
              </p>
              <p className="text-xs text-slate-500">
                No pretendemos recopilar datos personales de fuentes externas para crear perfiles individuales de los usuarios sin una finalidad legítima y una base jurídica aplicable.
              </p>
            </section>

            {/* 16. Toma de decisiones automatizadas y elaboración de perfiles */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                16. Toma de decisiones automatizadas y elaboración de perfiles
              </h2>
              <p>
                Calculadora SAT proporciona herramientas matemáticas y funcionalidades automatizadas destinadas principalmente a realizar cálculos, simulaciones y proporcionar información.
              </p>
              <p>
                El uso de una calculadora no significa que Calculadora SAT esté tomando una decisión legal o financiera vinculante sobre el usuario.
              </p>
              <p>
                Cuando una funcionalidad de Inteligencia Artificial genere una respuesta, dicha respuesta es generada automáticamente y puede contener errores. No utilizamos deliberadamente los resultados de nuestras calculadoras para tomar decisiones automatizadas con efectos jurídicos o efectos igualmente significativos sobre los usuarios.
              </p>
              <p className="text-xs text-slate-500">
                Si en el futuro implementamos una actividad que implique una decisión automatizada con efectos jurídicos o similares, actualizaremos esta Política y proporcionaremos la información requerida por la legislación aplicable, incluyendo información sobre la lógica utilizada y los derechos correspondientes cuando proceda.
              </p>
            </section>

            {/* 17. Seguridad */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                17. Seguridad
              </h2>
              <p>
                Aplicamos medidas técnicas y organizativas razonables destinadas a proteger la información frente a:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>acceso no autorizado;</li>
                <li>pérdida;</li>
                <li>destrucción;</li>
                <li>modificación;</li>
                <li>divulgación indebida;</li>
                <li>uso fraudulento.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Sin embargo, ningún sistema conectado a Internet puede garantizar una seguridad absoluta. Los usuarios también deben tomar medidas razonables para proteger sus propios dispositivos y evitar introducir información confidencial innecesaria.
              </p>
            </section>

            {/* 18. Menores de edad */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                18. Menores de edad
              </h2>
              <p>
                El Sitio no está diseñado específicamente para recopilar deliberadamente información personal de menores. Si consideramos que hemos recopilado accidentalmente información personal de un menor sin una base jurídica adecuada, tomaremos medidas razonables para eliminarla cuando corresponda.
              </p>
            </section>

            {/* 19. Enlaces a sitios web de terceros */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                19. Enlaces a sitios web de terceros
              </h2>
              <p>
                El Sitio puede contener enlaces a páginas web, servicios o recursos de terceros. Estos sitios tienen sus propias políticas de privacidad y condiciones. Calculadora SAT no controla las prácticas de privacidad de sitios externos y recomienda revisar sus respectivas políticas antes de proporcionar información personal.
              </p>
            </section>

            {/* 20. Cambios en esta Política */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                20. Cambios en esta Política
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad cuando sea necesario debido a:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-xs sm:text-sm">
                <li>cambios legales;</li>
                <li>cambios regulatorios;</li>
                <li>nuevas funcionalidades;</li>
                <li>cambios en nuestros proveedores;</li>
                <li>cambios en nuestras prácticas de tratamiento;</li>
                <li>mejoras de seguridad.</li>
              </ul>
              <p>
                Cuando realicemos cambios relevantes, actualizaremos la fecha de &ldquo;Última actualización&rdquo; y, cuando la legislación lo requiera, proporcionaremos un aviso adicional.
              </p>
            </section>

            {/* 21. Contacto */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                21. Contacto
              </h2>
              <p>
                Para preguntas, solicitudes de privacidad, ejercicio de derechos o reclamaciones relacionadas con el tratamiento de datos personales:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl text-xs space-y-1">
                <p><strong>Entidad:</strong> Calculadora SAT / FkDigitalMedia</p>
                <p><strong>Correo electrónico:</strong> <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 underline font-bold">hello@calculadorasat.org</a></p>
                <p><strong>Sitio web:</strong> <a href="https://www.calculadorasat.org/" className="text-blue-600 dark:text-blue-400 underline">https://www.calculadorasat.org/</a></p>
              </div>
              <p className="text-xs text-slate-500">
                Al utilizar nuestro Sitio, usted reconoce que ha tenido la oportunidad de consultar esta Política de Privacidad.
              </p>
            </section>

            {/* Aviso importante sobre los cálculos */}
            <div className="p-5 bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 mt-8">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                ⚠️ Aviso importante sobre los cálculos
              </h3>
              <p>
                Calculadora SAT es una plataforma independiente de información y simulación.
              </p>
              <p>
                Las calculadoras proporcionan estimaciones con fines educativos, informativos y de planificación. Los resultados no constituyen asesoría fiscal, financiera, contable o legal.
              </p>
              <p>
                Los usuarios deben verificar los resultados con un profesional cualificado antes de presentar declaraciones, realizar pagos fiscales, tomar decisiones laborales o adoptar decisiones financieras importantes.
              </p>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/90">
                Calculadora SAT no está afiliada, patrocinada ni respaldada oficialmente por el Servicio de Administración Tributaria (SAT) de México, el Instituto Mexicano del Seguro Social (IMSS), la SUNAT de Perú ni ninguna otra autoridad gubernamental.
              </p>
            </div>

            <p className="text-xs text-slate-400 text-center pt-4">
              © 2026 Calculadora SAT. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
