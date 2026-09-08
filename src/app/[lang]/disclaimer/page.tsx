import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('disclaimer', lang);

  return {
    title: lang === 'en'
      ? 'Legal Disclaimer & Non-Affiliation Notice | Calculadora SAT'
      : 'Aviso Legal y Deslinde de Responsabilidad | Calculadora SAT',
    description: lang === 'en'
      ? 'Official informational disclaimer, non-affiliation declaration (SAT, SUNAT, IMSS), and computational scope for Calculadora SAT.'
      : 'Aviso legal e informativo oficial, declaración de no afiliación con SAT, SUNAT e IMSS, y alcance computacional de las calculadoras.',
    alternates: seoAlternates,
  };
}

export default async function DisclaimerPage({ params }: PageProps) {
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⚖️</span>
              <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
                Legal & Informational Disclaimer
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Last reviewed and updated: February 2026
            </p>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <p className="font-bold mb-1">⚠️ Essential Notice on Tool Scope:</p>
              <p>
                Calculadora SAT is an independent financial education portal. The calculators, simulators, and informational tables published on this website are exclusively intended for estimation, planning, and educational purposes. <strong>They do NOT constitute, under any circumstance, binding tax, legal, financial, or accounting advice.</strong>
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Strict Non-Affiliation Declaration</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculadora SAT is an independent website created and maintained by software developers and computational finance researchers.
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>We are <strong>NOT affiliated with, authorized by, sponsored by, or endorsed by</strong> the Servicio de Administración Tributaria (SAT) of Mexico.</li>
                <li>We are <strong>NOT affiliated with</strong> the Instituto Mexicano del Seguro Social (IMSS) of Mexico.</li>
                <li>We are <strong>NOT affiliated with</strong> the Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) of Peru, nor the Ministerio de Trabajo y Promoción del Empleo (MTPE).</li>
                <li>We are <strong>NOT affiliated with</strong> any public institution or governmental revenue authority.</li>
              </ul>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                All official trademarks, acronyms, and organizational names (such as SAT, IMSS, SUNAT) belong strictly to their respective public holders and are referenced purely for descriptive and educational identification under fair use principles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Nature of Simulations & Estimates</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our calculators implement mathematical models derived from public legislation (such as Mexico's Ley del Impuesto sobre la Renta, Ley Federal del Trabajo, Ley del Seguro Social, and Peru's Decreto Supremo N° 179-2004-EF and Decreto Supremo N° 001-97-TR).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                However, individual taxpayer situations depend on numerous variables that automated calculators cannot fully foresee (such as non-standard contracts, collective bargaining agreements, accumulated tax losses, or special regime clauses). Users must always corroborate calculations with a licensed certified public accountant (CPA) or labor attorney before submitting returns, signing severance agreements, or executing payments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Accuracy & Maintenance Protocol</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                While we make diligent efforts to audit formulas whenever official gazettes (DOF in Mexico, El Peruano in Peru) publish regulatory amendments or annual updates (such as UMA or UIT adjustments), we cannot guarantee that the information will at all moments be error-free or up to the immediate second.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Inquiries & Corrections</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                If you identify an outdated figure, an arithmetic anomaly, or a recently modified statutory provision, please inform us directly at <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">hello@calculadorasat.org</a>.
              </p>
            </section>
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span>
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Aviso Legal y Deslinde de Responsabilidad
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Última revisión y actualización técnica: Febrero 2026
          </p>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <p className="font-bold mb-1">⚠️ Aviso Fundamental sobre el Alcance de las Herramientas:</p>
            <p>
              Calculadora SAT es un portal de divulgación tecnológica y educación financiera independiente. Las calculadoras, simuladores y tablas publicadas en este sitio web tienen una finalidad exclusivamente didáctica, estimativa y orientativa. <strong>Bajo ningún supuesto constituyen asesoría formal fiscal, contable, laboral ni legal vinculante.</strong>
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Declaración Expresa de No Afiliación</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculadora SAT es un sitio web independiente desarrollado por programadores e investigadores de cálculo computacional:
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li><strong>NO tenemos afiliación, patrocinio, vínculo ni representación oficial</strong> con el Servicio de Administración Tributaria (SAT) de México.</li>
              <li><strong>NO tenemos relación</strong> con el Instituto Mexicano del Seguro Social (IMSS) de México.</li>
              <li><strong>NO tenemos relación</strong> con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú, ni con el Ministerio de Trabajo y Promoción del Empleo (MTPE).</li>
              <li><strong>NO formamos parte de ningún organismo gubernamental</strong> ni autoridad recaudadora de ningún país.</li>
            </ul>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Las marcas, nombres institucionales y siglas públicas mencionadas en el sitio (tales como SAT, IMSS, SUNAT) pertenecen con exclusividad a sus respectivos titulares y se utilizan únicamente para describir e identificar con exactitud el marco legal correspondiente.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Naturaleza Estimativa de los Resultados</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Nuestras herramientas programan fórmulas matemáticas sustentadas en leyes oficiales públicas (como la Ley del Impuesto sobre la Renta, la Ley Federal del Trabajo y la Ley del Seguro Social en México; y el D.S. N° 179-2004-EF, D.S. N° 001-97-TR y Ley N° 27735 en Perú).
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sin embargo, cada situación tributaria o laboral particular está sujeta a condicionantes individuales (contratos colectivos, regímenes especiales, pérdidas fiscales previas, prestaciones extralegales) que un simulador genérico no puede anticipar. Recomendamos consultar a un contador público colegiado o abogado laboralista titulado antes de presentar declaraciones definitivas, firmar convenios laborales o emitir pagos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Mantenimiento y Actualizaciones</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitoreamos de forma activa el Diario Oficial de la Federación (DOF) en México y las Normas Legales de El Peruano en Perú para incorporar oportunamente las reformas publicadas y los ajustes a la UMA y la UIT. A pesar de nuestros controles de verificación, los cálculos se entregan 'tal cual' sin garantías explícitas frente a demoras en publicaciones normativas o contingencias técnicas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Canal de Dudas y Notificaciones</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Si detectas cualquier discrepancia técnica, error tipográfico o cambio de tarifa no reflejado en nuestras herramientas, puedes contactarnos en <a href="mailto:hello@calculadorasat.org" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">hello@calculadorasat.org</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
