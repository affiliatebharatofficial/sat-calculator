import React from 'react';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import Footer from '@/components/Footer';
import ThemeToggle from '../../../components/ThemeToggle';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans">
        <header className="border-b border-slate-200 dark:border-slate-850 py-6 bg-white dark:bg-slate-900 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/en" className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
              Calculadora<span className="text-blue-600 dark:text-blue-400">SAT</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/en" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">
                ← Back to Home
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👥</span>
              <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
                About Us
              </h1>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-355">
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Calculadora SAT is an independent financial calculation platform with a primary focus on Mexico's tax, labor, and payroll systems (SAT, LISR, LIVA, LFT, and IMSS).
              </p>

              <p>
                In a region where tax and payroll regulations evolve constantly, our platform provides free educational tools that allow freelancers, small businesses, accountants, and employees to simulate their ISR, IMSS withholdings, VAT breakdowns, and severance pay without needing to decipher complex legal treatises.
              </p>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why Mexico and Peru?</h2>
              <p>
                Mexico represents our core specialization and original purpose. However, with the rise of remote work and cross-border commerce across Latin America, many professionals and businesses operate between Mexico and Peru.
              </p>
              <p>
                To serve these users without compromising accuracy, we created a dedicated <strong className="text-slate-800 dark:text-slate-100">Peru Tools</strong> module. This section provides tailored calculators for Peruvian labor mandates (CTS, Gratificaciones, Renta de 5ta Categoría) and tax references (SUNAT, IGV 18%, USD/PEN exchange rates). Both jurisdictions are kept strictly separated to ensure country-specific compliance and clarity.
              </p>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Independent Portal & Disclaimer</h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <p className="font-semibold mb-1">⚠️ Important Legal Notice:</p>
                <p>
                  Calculadora SAT is an independent educational portal. It is <strong>NOT affiliated with, authorized, endorsed, or sponsored by</strong> the Servicio de Administración Tributaria (SAT) of Mexico, nor the Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) of Peru, nor any other government institution. All calculations are mathematical simulations for informational and planning purposes only and do not constitute formal tax or legal advice.
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

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Team</h2>
              <p>
                We are a multidisciplinary team composed of accounting advisors, software developers, and regional tax researchers. We combine technical expertise with a deep understanding of Mexican and Latin American fiscal frameworks to build practical, educational solutions.
              </p>
            </div>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans">
      <header className="border-b border-slate-200 dark:border-slate-850 py-6 bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
            Calculadora<span className="text-blue-600 dark:text-blue-400">SAT</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">
              ← Volver al Inicio
            </Link>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👥</span>
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Acerca de Nosotros
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
              Calculadora SAT es una plataforma independiente de cálculo financiero y tributario cuyo eje principal es la normativa fiscal, laboral y de nómina en México (SAT, LISR, LIVA, LFT e IMSS).
            </p>

            <p>
              En un entorno donde las regulaciones tributarias y laborales cambian con frecuencia, proporcionamos herramientas gratuitas y didácticas que permiten a trabajadores independientes, pymes, contadores y empleados simular sus retenciones de ISR, cuotas IMSS, desgloses de IVA y liquidaciones laborales de forma clara y accesible.
            </p>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">¿Por qué herramientas de México y Perú?</h2>
            <p>
              México constituye el núcleo fundamental y el motivo de ser de esta plataforma. No obstante, con la expansión del trabajo remoto, la contratación regional y el comercio digital entre países hispanohablantes, un número significativo de usuarios opera entre México y Perú.
            </p>
            <p>
              Para dar respuesta a estas necesidades sin mezclar ni distorsionar las normas de cada país, creamos una sección independiente dedicada a las <strong className="text-slate-800 dark:text-slate-100">Herramientas de Perú</strong>. En ella se agrupan calculadoras específicas de la legislación laboral peruana (CTS, Gratificaciones de ley, Renta de 5ta Categoría) y tributaria (SUNAT, IGV 18%, tipo de cambio Soles/Dólares). Ambos ecosistemas permanecen separados para garantizar total claridad normativa.
            </p>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portal Independiente y Deslinde de Responsabilidad</h2>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200">
              <p className="font-semibold mb-1">⚠️ Aviso Legal Relevante:</p>
              <p>
                Calculadora SAT es un sitio web de divulgación e información tecnológica independiente. <strong>NO está afiliado, patrocinado, avalado ni vinculado formalmente</strong> con el Servicio de Administración Tributaria (SAT) de México, ni con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú, ni con ninguna entidad pública. Todas las herramientas son simuladores matemáticos orientativos y no sustituyen la asesoría profesional de un contador público titulado o un abogado laboralista.
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

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nuestro Equipo</h2>
            <p>
              Somos un equipo multidisciplinario compuesto por asesores contables, desarrolladores de software y especialistas en tributación regional. Combinamos experiencia técnica con un conocimiento riguroso de la legislación para diseñar soluciones didácticas útiles para el día a día.
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
