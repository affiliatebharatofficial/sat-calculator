import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultaRucClient from './ConsultaRucClient';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('consulta-ruc-sunat', lang);

  return {
    title: 'Validador de RUC SUNAT: Verificar Estructura y Dígito de Control',
    description: 'Comprueba el algoritmo Módulo 11 y formato de 11 dígitos de un RUC en Perú. Conoce qué valida esta herramienta y accede al portal oficial de SUNAT.',
    keywords: [
      'validador ruc sunat',
      'verificar ruc sunat',
      'digito verificador ruc peru',
      'algoritmo modulo 11 ruc',
      'estructura ruc peru',
      'consulta ruc sunat',
      'ruc peru'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Validador de RUC SUNAT: Verificar Estructura y Dígito de Control',
      description: 'Comprueba el algoritmo Módulo 11 y formato de 11 dígitos de un RUC en Perú. Conoce qué valida esta herramienta y accede al portal oficial de SUNAT.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function ConsultaRucPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = 'https://www.calculadorasat.org/consulta-ruc-sunat';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Validador de RUC SUNAT (Estructura y Dígito Verificador)',
    description: 'Validador técnico del formato de 11 dígitos y dígito de control Módulo 11 de RUC en Perú con guía de consulta oficial en SUNAT.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Esta herramienta consulta en tiempo real la base de datos de la SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Esta herramienta realiza una comprobación matemática local del formato de 11 dígitos y del dígito verificador (Módulo 11). No tiene conexión directa con los servidores de la SUNAT ni puede certificar si el contribuyente está activo o habido.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Dónde puedo consultar la Razón Social y el estado Activo/Habido de un RUC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para obtener la información tributaria oficial (Razón Social, domicilio fiscal, estado ACTIVO/BAJA y condición HABIDO/NO HABIDO), debes ingresar directamente al portal oficial e-Consulta RUC de la SUNAT (e-consultaruc.sunat.gob.pe).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué significan los prefijos 10, 15, 17 y 20 en un RUC peruano?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El prefijo 10 corresponde a Personas Naturales con DNI (los 8 dígitos centrales corresponden a su DNI). Los prefijos 15 y 17 corresponden a Personas Naturales con Carné de Extranjería o Pasaporte. El prefijo 20 identifica a Personas Jurídicas (empresas, sociedades SAC, SRL, EIRL, etc.).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se calcula el dígito verificador de un RUC en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La SUNAT emplea el algoritmo Módulo 11 con los factores de ponderación [5, 4, 3, 2, 7, 6, 5, 4, 3, 2] aplicados a los 10 primeros dígitos. La suma ponderada se divide entre 11 y el residuo determina el 11.° dígito de control.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Por qué un RUC con estructura matemáticamente válida puede ser rechazado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un número de 11 dígitos puede cumplir perfectamente la fórmula matemática del Módulo 11, pero no haber sido emitido jamás por la SUNAT, o encontrarse en condición de No Habido o Baja Definitiva en el padrón tributario.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Herramientas Perú', item: 'https://www.calculadorasat.org/calculadoras/peru' },
      { '@type': 'ListItem', position: 3, name: 'Validador de RUC SUNAT', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/calculadoras/peru" className="hover:text-blue-600 transition-colors">Herramientas Perú</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Validador de RUC SUNAT</span>
        </nav>

        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 mb-4 border border-amber-200 dark:border-amber-800">
            🇵🇪 Validador de Estructura y Dígito de Control Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Validador de RUC SUNAT
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Comprueba de forma instantánea si un número de 11 dígitos cumple con el algoritmo oficial Módulo 11 de la SUNAT y conoce cómo consultar el padrón tributario oficial.
          </p>
        </div>

        {/* Official SUNAT Portal Notice Callout */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <span>🏛️</span>
              <span>¿Necesitas Razón Social, Domicilio Fiscal o Estado Activo / Habido?</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
              Esta herramienta es un validador matemático local. Para consultar los datos públicos vigentes de un contribuyente en tiempo real, utiliza el servicio oficial de la SUNAT.
            </p>
          </div>
          <a
            href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
          >
            <span>Ir a e-Consulta SUNAT</span>
            <span>↗</span>
          </a>
        </div>

        {/* Interactive RUC Structure Validator Client */}
        <ConsultaRucClient />

        {/* Scope Clarification: What it DOES vs what it DOES NOT DO */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-2">
              ¿Qué hace y qué NO hace esta herramienta?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Para evitar cualquier confusión sobre el alcance técnico del validador, aquí te detallamos exactamente sus capacidades:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What it DOES */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-extrabold text-base">
                <span className="text-xl">✅</span>
                <h3>Lo que SÍ hace este validador</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Validación de formato:</strong> Comprueba que la cadena ingresada contenga exactamente 11 dígitos numéricos sin letras ni símbolos extraños.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Algoritmo Módulo 11:</strong> Aplica los factores de ponderación oficiales de SUNAT <code className="text-[11px] bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded">[5, 4, 3, 2, 7, 6, 5, 4, 3, 2]</code> para verificar el dígito de control.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Identificación de categoría:</strong> Clasifica el tipo de contribuyente según el prefijo (10 = Persona Natural con DNI, 15/17 = Extranjero, 20 = Persona Jurídica / Empresa).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Privacidad total:</strong> Se procesa 100% de forma local en tu navegador sin registrar ni transmitir tus consultas a ningún servidor externo.</span>
                </li>
              </ul>
            </div>

            {/* What it DOES NOT DO */}
            <div className="p-6 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-extrabold text-base">
                <span className="text-xl">❌</span>
                <h3>Lo que NO hace este validador</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Sin conexión a bases de datos:</strong> <strong>NO</strong> consulta ni accede a los registros internos o padrón en vivo de la SUNAT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Sin datos personales:</strong> <strong>NO</strong> muestra Razón Social, nombre comercial, dirección fiscal ni representantes legales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Sin estado de vigencia:</strong> <strong>NO</strong> verifica si el contribuyente está ACTIVO, EN BAJA, SUSPENDIDO o CLAUSURADO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Sin condición de domicilio:</strong> <strong>NO</strong> determina si el RUC figura como HABIDO, NO HABIDO o NO HALLADO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><strong>Sin validez legal:</strong> <strong>NO</strong> emite certificados oficiales, fichas RUC ni comprobantes de registro tributario.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide for Official SUNAT Query */}
        <section className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-2">
              Cómo Consultar un RUC en el Padrón Oficial de la SUNAT
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Si vas a emitir una factura, contratar un servicio o registrar un proveedor en Perú, sigue estos pasos para consultar la información oficial completa y gratuita en el sistema de la SUNAT:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl block">1️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Accede al portal e-Consulta RUC</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ingresa al servicio web oficial de la SUNAT (<code className="text-[11px] bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">e-consultaruc.sunat.gob.pe</code>). El servicio es 100% público, gratuito y no requiere Clave SOL.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl block">2️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Selecciona tu Criterio de Búsqueda</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Puedes buscar por <strong>Número de RUC</strong> (11 dígitos), por <strong>Tipo de Documento</strong> (DNI o Carné de Extranjería), o por <strong>Nombre / Razón Social</strong> si desconoces el número.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl block">3️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Verifica Estado y Condición</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Revisa los dos campos tributarios críticos: <strong>Estado del Contribuyente</strong> (debe ser <span className="text-emerald-600 font-bold">ACTIVO</span>) y <strong>Condición del Domicilio</strong> (debe figurar como <span className="text-emerald-600 font-bold">HABIDO</span>).
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Accede al portal oficial de SUNAT para realizar tu consulta con validez jurídica:
            </div>
            <a
              href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <span>Abrir Portal Oficial e-Consulta RUC SUNAT</span>
              <span>↗</span>
            </a>
          </div>
        </section>

        {/* Algorithm Explanation: Modulo 11 */}
        <section className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            ¿Cómo Funciona el Algoritmo Módulo 11 de la SUNAT?
          </h2>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              El Registro Único de Contribuyentes (RUC) en el Perú está compuesto por <strong>11 dígitos</strong>. Los primeros 10 dígitos identifican al contribuyente y el 11.° dígito es el <strong>dígito verificador</strong> calculado mediante el algoritmo de control <strong>Módulo 11</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Factores de Ponderación Oficiales:</div>
              <div>Pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]</div>
              <div>Suma = (d₁ × 5) + (d₂ × 4) + (d₃ × 3) + (d₄ × 2) + (d₅ × 7) + (d₆ × 6) + (d₇ × 5) + (d₈ × 4) + (d₉ × 3) + (d₁₀ × 2)</div>
              <div>Residuo = Suma % 11</div>
              <div>Dígito Verificador = 11 - Residuo (Regla: si es 10 ⇒ 0; si es 11 ⇒ 1)</div>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-base pt-2">
              Ejemplo Práctico con RUC 20100047218 (Persona Jurídica):
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white">
                    <th className="p-2 border border-slate-200 dark:border-slate-800">Posición</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">1°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">2°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">3°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">4°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">5°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">6°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">7°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">8°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">9°</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">10°</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-bold border border-slate-200 dark:border-slate-800">Dígito</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">2</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">1</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">4</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">7</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">2</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">1</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-200 dark:border-slate-800">Ponderador</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">5</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">4</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">3</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">2</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">7</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">6</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">5</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">4</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">3</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">2</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-950 font-semibold">
                    <td className="p-2 border border-slate-200 dark:border-slate-800">Producto</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">10</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">3</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">0</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">20</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">28</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">6</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-center">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs">
              Suma total = 10 + 0 + 3 + 0 + 0 + 0 + 20 + 28 + 6 + 2 = <strong>69</strong>.<br />
              División entre 11: 69 ÷ 11 = 6 (con residuo <strong>3</strong>).<br />
              Dígito Verificador = 11 - 3 = <strong>8</strong>. Coincide exactamente con el último dígito del RUC.
            </p>
          </div>
        </section>

        {/* Tax Risks: Why Habido and Activo are essential */}
        <section className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Riesgos Tributarios: ¿Por qué es vital verificar el estado Habido y Activo?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            De acuerdo con la <strong>Ley del Impuesto General a las Ventas (IGV)</strong> y la <strong>Ley del Impuesto a la Renta</strong> en Perú, contar con un RUC sintácticamente correcto no basta para sustentar compras y operaciones comerciales válidas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-1.5">
              <div className="font-bold text-amber-950 dark:text-amber-200">⚠️ Pérdida del Crédito Fiscal del IGV (18%)</div>
              <p className="text-amber-900 dark:text-amber-300 text-xs">
                Las facturas emitidas por contribuyentes que al momento de la emisión figuren en condición de <strong>No Habido</strong> o <strong>Baja de Oficio</strong> no otorgan derecho al crédito fiscal del IGV.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
              <div className="font-bold text-rose-950 dark:text-rose-200">🚫 Desconocimiento de Gastos Deducibles de Renta</div>
              <p className="text-rose-900 dark:text-rose-300 text-xs">
                La SUNAT repara y desconoce la deducción tributaria de los costos o gastos sustentados con comprobantes de proveedores que no regularicen su condición de No Habidos, generando multas e intereses.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Preguntas Frecuentes sobre el RUC en Perú
          </h2>
          <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            <div className="pt-3 first:pt-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                ¿Esta herramienta consulta en vivo el padrón de contribuyentes de SUNAT?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                No. Esta herramienta realiza una validación matemática local del formato y del dígito de control (Módulo 11). No se conecta a los servidores de SUNAT ni certifica si el RUC está activo, de baja o habido.
              </p>
            </div>

            <div className="pt-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                ¿Dónde puedo consultar la razón social y el estado Activo/Habido de un RUC?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Para obtener la información oficial completa (Razón Social, domicilio fiscal, estado ACTIVO/BAJA y condición HABIDO/NO HABIDO), debes utilizar la plataforma oficial gratuita e-Consulta RUC de la SUNAT (<a href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">e-consultaruc.sunat.gob.pe</a>).
              </p>
            </div>

            <div className="pt-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                ¿Qué significan los prefijos 10, 15, 17 y 20 en un RUC peruano?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                El prefijo 10 corresponde a Personas Naturales con DNI (los 8 dígitos centrales corresponden a su DNI). Los prefijos 15 y 17 corresponden a Personas Naturales con Carné de Extranjería o Pasaporte. El prefijo 20 identifica a Personas Jurídicas (empresas, sociedades SAC, SRL, EIRL, etc.).
              </p>
            </div>

            <div className="pt-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                ¿Por qué un RUC con estructura válida puede ser rechazado por SUNAT?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Un número de RUC puede tener un dígito verificador matemáticamente correcto pero no haber sido emitido nunca por la SUNAT, o encontrarse en condición de NO HABIDO, BAJA DEFINITIVA o SUSPENSIÓN TEMPORAL.
              </p>
            </div>
          </div>
        </section>

        {/* Independent Disclaimer */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <div className="font-bold text-slate-700 dark:text-slate-300">
            Aviso de Independencia y Descargo de Responsabilidad:
          </div>
          <p className="leading-relaxed">
            Este sitio web es una herramienta informativa y técnica desarrollada de manera independiente. No está respaldada, asociada, patrocinada, autorizada ni de ninguna forma oficialmente conectada con la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT), el Ministerio de Economía y Finanzas (MEF) ni ninguna entidad pública del Gobierno de la República del Perú. Para consultas vinculantes, obtención de constancias de inscripción o trámites tributarios, recurre siempre al portal institucional formal en <a href="https://www.sunat.gob.pe" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">sunat.gob.pe</a>.
          </p>
        </div>

        {/* Related Peruvian Tools Cluster */}
        <section className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🇵🇪 Herramientas Financieras y Tributarias de Perú
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/calculadora-igv-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🧾</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Calculadora IGV Perú (18%)</div>
                <div className="text-xs text-slate-500 font-normal">Cálculo de base imponible e IGV</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
              </div>
            </Link>
            <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Valores UIT y tasas oficiales</div>
              </div>
            </Link>
            <Link href="/calculadora-cts-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Calculadora CTS Perú</div>
                <div className="text-xs text-slate-500 font-normal">Depósitos de mayo y noviembre</div>
              </div>
            </Link>
            <Link href="/calculadora-gratificacion-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Calculadora Gratificación</div>
                <div className="text-xs text-slate-500 font-normal">Fiestas Patrias y Navidad</div>
              </div>
            </Link>
            <Link href="/dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles (USD ↔ PEN)</div>
                <div className="text-xs text-slate-500 font-normal">Convertidor bidireccional</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}

