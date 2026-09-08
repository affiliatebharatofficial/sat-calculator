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

        <main className="max-w-3xl mx-auto px-4 py-12 flex-grow">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📄</span>
              <h1 className="text-3xl font-extrabold text-slate-955 dark:text-white">
                Terms and Conditions
              </h1>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Last updated: July 03, 2026
            </p>

            <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <p>
                Welcome to <strong>Calculadora SAT</strong>. These terms and conditions describe the rules and regulations for the use of our website, located at <code>calculadorasat.org</code>.
              </p>

              <p>
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Calculadora SAT if you do not agree to all of the terms stated on this page.
              </p>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Use of Service and License</h2>
              <p>
                You are granted a limited, non-exclusive, and non-transferable license to access and use the Service for your personal or commercial tax calculation use, subject to these Terms and Conditions.
              </p>
              <p>
                You are not permitted to collect automated information from the API or the site using scrapers, spiders, or robots for resale purposes without our express commercial authorization.
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Disclaimer (Informational Purposes)</h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 rounded-xl leading-relaxed">
                ⚠️ <strong>IMPORTANT:</strong> The calculators and tools provided on this platform are solely for informational and educational simulation purposes. **They do not constitute, under any scenario, formal tax, accounting, legal, or financial advice.** We recommend verifying results with a certified public accountant before making tax payments to the SAT/SUNAT or making decisions about employee terminations. For full terms, please read our dedicated <Link href="/en/disclaimer" className="underline font-bold">Legal Disclaimer</Link>.
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Non-Affiliation and Regulatory Accuracy</h2>
              <p>
                Calculadora SAT is an independent portal and is NOT affiliated with, sponsored by, or endorsed by SAT (Mexico), IMSS (Mexico), SUNAT (Peru), or MTPE (Peru). We do our best to keep progressive ISR rates, IMSS quotas, UMA/UIT values, and labor regulations fully updated to the current statutory reforms. However, we are not responsible for possible inconsistencies resulting from late legislative gazette publications or rounding differences.
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h2>
              <p>
                In no event shall Calculadora SAT, its administrators, partners, or developers be liable for financial losses, surcharges, fines, or tax discrepancies resulting from tax audits or labor disputes after using the information on this site.
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contact</h2>
              <p>
                For any legal clarification regarding our terms, you can contact us at <strong>hello@calculadorasat.org</strong>.
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
            <span className="text-3xl">📄</span>
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Términos y Condiciones
            </h1>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Última actualización: 03 de Julio de 2026
          </p>

          <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            <p>
              Bienvenido a <strong>Calculadora SAT</strong>. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web, ubicado en <code>calculadorasat.org</code>.
            </p>

            <p>
              Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes utilizando Calculadora SAT si no estás de acuerdo con todos los términos establecidos en esta página.
            </p>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Uso del Servicio y Licencia</h2>
            <p>
              Se te otorga una licencia limitada, no exclusiva e intransferible para acceder y utilizar el Servicio para tu uso personal o comercial de cálculo fiscal, sujeto a estos Términos y Condiciones.
            </p>
            <p>
              No está permitido recopilar información automatizada de la API o del sitio mediante scrapers, spiders o robots para fines de reventa sin autorización comercial expresa de nuestra parte.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Exclusión de Responsabilidad (Fines Informativos)</h2>
            <div className="p-4 bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 rounded-xl leading-relaxed">
              ⚠️ <strong>IMPORTANTE:</strong> Las calculadoras y herramientas proporcionadas en esta plataforma son exclusivamente de carácter informativo y con fines de simulación didáctica. **No constituyen bajo ningún escenario asesoría fiscal, contable, laboral ni legal vinculante.** Le recomendamos verificar los resultados con un contador público colegiado o abogado antes de realizar pagos de declaraciones o tomar decisiones laborales. Para conocer todos los alcances, consulta nuestro <Link href="/disclaimer" className="underline font-bold">Aviso Legal y Deslinde de Responsabilidad</Link>.
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Declaración de No Afiliación y Exactitud Normativa</h2>
            <p>
              Calculadora SAT es un sitio web independiente. NO está afiliado, patrocinado, avalado ni vinculado formalmente con el Servicio de Administración Tributaria (SAT) de México, ni con el Instituto Mexicano del Seguro Social (IMSS), ni con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú, ni con el Ministerio de Trabajo y Promoción del Empleo (MTPE). Hacemos todo lo posible para mantener las tarifas progresivas del ISR, cuotas del IMSS, valores de la UMA/UIT y regulaciones laborales actualizadas a las reformas vigentes. No obstante, no nos hacemos responsables de posibles inconsistencias resultantes de actualizaciones legislativas tardías o redondeos menores.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso Calculadora SAT, sus administradores, socios o desarrolladores serán responsables por pérdidas financieras, recargos, multas o discrepancias fiscales derivadas de actos administrativos o auditorías tras utilizar la información de este sitio.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contacto</h2>
            <p>
              Para cualquier aclaración legal sobre nuestros términos, puedes contactarnos en <strong>hello@calculadorasat.org</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
