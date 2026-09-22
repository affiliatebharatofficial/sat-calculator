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
  const seoAlternates = getSeoAlternates('peru/guias', lang);

  const title = isEn
    ? 'Peru Tax & Labor Statutory Guides 2026: IGV, CTS & SUNAT | Calculadora SAT'
    : 'Guías Tributarias y Laborales de Perú 2026 — SUNAT, CTS, IGV y Renta 5ta';
  const description = isEn
    ? 'Practical legal guides for Peru: how to calculate 18% IGV, semiannual CTS formulas under D.S. 001-97-TR, July/Dec gratifications with 9% EsSalud, and 5th Category progressive tax.'
    : 'Guías normativas y prácticas para Perú: cálculo del 18% de IGV, fórmula semestral de CTS conforme al D.S. 001-97-TR, gratificaciones legales de julio/diciembre y renta de 5ta categoría.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT — Guías Perú',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function PeruGuiasPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';

  const peruGuides = [
    {
      title: isEn
        ? 'How to Calculate and Break Down 18% IGV in Peru'
        : 'Cómo calcular y desglosar el 18% del IGV en Perú: Fórmulas para comprobantes SUNAT',
      badge: 'D.S. N° 055-99-EF • TUO Ley del IGV',
      summary: isEn
        ? 'Learn how the 18% rate is formed (16% IGV + 2% IPM), how to extract the net base by dividing by 1.18, and how tax credit applies to purchases.'
        : 'Conoce cómo se compone la tasa del 18% (16% de IGV más 2% de Impuesto de Promoción Municipal), la fórmula matemática para desglosar la base imponible dividiendo entre 1.18 y las reglas para ejercer el crédito fiscal.',
      calcLink: '/calculadoras/peru/calculadora-igv-peru',
      calcText: 'Calculadora de IGV',
      points: [
        'Fórmula para agregar IGV: Subtotal × 1.18',
        'Fórmula para desglosar IGV: Total ÷ 1.18',
        'Requisitos de bancarización para compras superiores a S/ 2,000 o US$ 500',
      ],
    },
    {
      title: isEn
        ? 'CTS (Compensación por Tiempo de Servicios): Deadlines, Computable Pay & Formulas'
        : 'Guía de CTS en Perú: Plazos de depósito, remuneración computable y fórmula semestral',
      badge: 'D.S. N° 001-97-TR • Ley de CTS',
      summary: isEn
        ? 'Understand which employees qualify for CTS, the mandatory deposit deadlines (May 15 and November 15), and how 1/6th of gratification is factored in.'
        : 'Explica los requisitos para acceder a la CTS en el régimen laboral de la actividad privada (D.L. 728), las fechas límite de depósito en mayo y noviembre, la integración de la sexta parte de la gratificación y el cálculo proporcional en días trabajados.',
      calcLink: '/calculadoras/peru/calculadora-cts-peru',
      calcText: 'Calculadora de CTS',
      points: [
        'Remuneración computable: Sueldo básico + Asignación familiar + 1/6 de gratificación',
        'Fórmula semestral completa: Remuneración computable ÷ 2',
        'Fórmula por meses y días: (Remuneración ÷ 12 × meses) + (Remuneración ÷ 360 × días)',
      ],
    },
    {
      title: isEn
        ? 'July & December Legal Gratifications: EsSalud 9% Bonus and Exemption Rules'
        : 'Gratificaciones Legales de Fiestas Patrias y Navidad: Bonificación extraordinaria de EsSalud',
      badge: 'Ley N° 27735 & Ley N° 30334',
      summary: isEn
        ? 'Why legal gratifications in Peru are not subject to pension withholdings (AFP/ONP) and include a 9% extraordinary bonus.'
        : 'Aprende los derechos económicos de los trabajadores del sector privado en julio y diciembre. Por mandato de la Ley 30334, las gratificaciones no sufren aportaciones previsionales a AFP ni ONP, y el aporte patronal del 9% a EsSalud (o 6.75% a EPS) se abona directamente al empleado.',
      calcLink: '/calculadoras/peru/calculadora-gratificacion-peru',
      calcText: 'Calculadora de Gratificación',
      points: [
        'Pago íntegro por semestre completo de trabajo (enero-junio para julio, julio-diciembre para diciembre)',
        'Bonificación extraordinaria del 9% (EsSalud) o 6.75% (Entidad Prestadora de Salud - EPS)',
        'Inafectación total de descuentos de pensión (AFP u ONP)',
      ],
    },
    {
      title: isEn
        ? '5th Category Income Tax: 7 UIT Deduction & Monthly Factorization'
        : 'Renta de Quinta Categoría 2026: Deducción legal de 7 UIT y procedimiento de retención mensual',
      badge: 'D.S. N° 179-2004-EF • TUO Ley del Impuesto a la Renta',
      summary: isEn
        ? 'How Peruvian employers project 14 annual salaries, deduct 7 statutory UITs (S/ 37,450 for 2026), and apply progressive tax brackets.'
        : 'Detalle del procedimiento legal que siguen los empleadores para proyectar los 12 sueldos ordinarios más las 2 gratificaciones anuales, aplicar la deducción inafecta de 7 UIT (S/ 37,450 en 2026) y retener progresivamente de acuerdo con los factores mensuales de enero a diciembre.',
      calcLink: '/calculadoras/peru/calculadora-quinta-categoria-peru',
      calcText: 'Calculadora Renta 5ta',
      points: [
        'Deducción fija automática: 7 UIT anuales (S/ 37,450)',
        'Escalas de impuesto: 8%, 14%, 17%, 20% y 30% según el tramo de UIT excedente',
        'Factorización mensual obligatoria: retención prorrateada en 12, 8, 4 u 1 periodo',
      ],
    },
    {
      title: isEn
        ? 'SUNAT RUC Modulo 11 Algorithm: Mathematical Syntax and Validation'
        : 'Validación de RUC SUNAT: Estructura de 11 dígitos y verificación con Módulo 11',
      badge: 'Normatividad SUNAT • Módulo 11',
      summary: isEn
        ? 'How SUNAT verifies the authenticity of Peruvian tax ID numbers (RUC 10, 20, 15, 17) using weighted factors.'
        : 'Explicación del algoritmo de control utilizado por el Registro Único de Contribuyentes en el Perú. Los dos primeros dígitos identifican el tipo de persona (10 para personas naturales, 20 para personas jurídicas) y el último dígito se calcula mediante pesos ponderados [5, 4, 3, 2, 7, 6, 5, 4, 3, 2].',
      calcLink: '/calculadoras/peru/consulta-ruc-sunat',
      calcText: 'Validador de RUC',
      points: [
        'Prefijo 10: Persona natural con negocio o con DNI',
        'Prefijo 20: Personas jurídicas (S.A.C., S.R.L., E.I.R.L.)',
        'Factor ponderado oficial: Módulo 11 con residuo',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-red-700 via-red-800 to-slate-950 text-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-red-100 border border-white/20 uppercase tracking-wider mb-4">
            <span>📚</span>
            <span>{isEn ? 'Peru Legal Guides' : 'Centro Normativo de Perú'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Peruvian Tax & Labor Guides' : 'Guías Tributarias y Laborales de Perú'}
          </h1>
          <p className="mt-3 text-red-100/90 max-w-3xl font-medium text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Exhaustive explanations of statutory formulas, deadlines, and legal basis published in El Peruano, governing SUNAT tax compliance and MTPE labor benefits.'
              : 'Manuales y explicaciones técnicas de las leyes laborales y tributarias del Perú. Conoce al detalle cómo se calculan tus derechos y obligaciones conforme al marco oficial de SUNAT y MTPE.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow space-y-10">
        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <Link href="/peru" className="hover:text-red-600 transition-colors">
            {isEn ? 'Peru Portal' : 'Portal Perú'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {isEn ? 'Legal Guides' : 'Guías Normativas'}
          </span>
        </nav>

        {/* Guides List */}
        <div className="space-y-6">
          {peruGuides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 hover:border-red-400/80 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40 w-fit">
                  {guide.badge}
                </span>
                <Link
                  href={guide.calcLink}
                  className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  <span>🧮 {guide.calcText}</span>
                  <span>➔</span>
                </Link>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {guide.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {guide.summary}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-850">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {isEn ? 'Key Statutory Takeaways' : 'Puntos Clave de la Normativa'}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {guide.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold shrink-0">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
