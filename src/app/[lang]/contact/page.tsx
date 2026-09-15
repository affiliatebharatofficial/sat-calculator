import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  const title = isEn ? 'Contact Us & Support' : 'Contacto y Soporte Fiscal';
  const description = isEn
    ? 'Get in touch with the CalculadoraSAT team for inquiries, support, suggestions, or feedback regarding tax and payroll calculators.'
    : 'Ponte en contacto con el equipo de CalculadoraSAT para dudas, soporte o sugerencias sobre nuestras herramientas fiscales y laborales.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? 'https://www.calculadorasat.org/en/contact' : 'https://www.calculadorasat.org/contact',
      languages: {
        es: 'https://www.calculadorasat.org/contact',
        en: 'https://www.calculadorasat.org/en/contact',
        'x-default': 'https://www.calculadorasat.org/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? 'https://www.calculadorasat.org/en/contact' : 'https://www.calculadorasat.org/contact',
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  if (lang === 'en') {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
        <div>
          <Header lang={lang} />

          <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Contact Information */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
                  <span className="text-3xl">📬</span>
                  <h1 className="text-2xl font-black text-slate-950 dark:text-white mt-4">
                    Contact Us
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Have questions, suggestions, or need support with any of our calculators? We are here to help.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">✉️</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Inquiry Email</h4>
                        <a href="mailto:hello@calculadorasat.org" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                          hello@calculadorasat.org
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">⏱️</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Office Hours</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Monday to Friday from 9:00 AM to 6:00 PM (Mexico Central Time)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg">💡 Did you know?</h3>
                  <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">
                    All our tools use updated formulas according to the Official Gazette of the Federation (DOF) in Mexico. If you believe there is an error in any rate or calculation, please let us know by email.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  ✉️ Send a Message
                </h2>
                <ContactForm lang={lang} />
              </div>
            </div>
          </main>
        </div>

        <Footer lang="en" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-955 min-h-screen text-slate-800 dark:text-slate-200 font-sans flex flex-col justify-between">
      <div>
        <Header lang={lang} />

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Contact Information */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
                <span className="text-3xl">📬</span>
                <h1 className="text-2xl font-black text-slate-950 dark:text-white mt-4">
                  Contacto
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  ¿Tienes dudas, sugerencias o necesitas soporte con alguna de nuestras calculadoras? Estamos aquí para ayudarte.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">✉️</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Correo de Consultas</h4>
                      <a href="mailto:hello@calculadorasat.org" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        hello@calculadorasat.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">⏱️</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Horario de Atención</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Lunes a Viernes de 9:00 AM a 6:00 PM (Hora Centro de México)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg">💡 ¿Sabías que?</h3>
                <p className="text-xs text-blue-100/95 mt-2 leading-relaxed">
                  Todas nuestras herramientas utilizan fórmulas actualizadas de acuerdo al Diario Oficial de la Federación (DOF) de México. Si crees que hay un error en alguna tasa o cálculo, háznoslo saber por correo.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                ✉️ Enviar un Mensaje
              </h2>
              <ContactForm lang={lang} />
            </div>
          </div>
        </main>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
