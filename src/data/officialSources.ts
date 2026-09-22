import { OfficialSource } from '@/types/methodology';

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: "lisr-art-96-152",
    institution: "Cámara de Diputados del H. Congreso de la Unión",
    documentTitle: "Ley del Impuesto Sobre la Renta (LISR) - Artículos 96 y 152",
    topic: "Tarifas de retención de ISR mensual y cálculo anual para personas físicas",
    publicationDate: "Última reforma publicada en DOF 12/11/2021",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf",
    supportedRule: "Tablas progresivas de límite inferior, cuota fija y porcentaje sobre el excedente del límite inferior para ISR mensual y anual.",
    lastVerified: "Enero 2026",
    categorySlugs: ["sat", "nomina"],
    calculatorSlugs: ["calculadora-isr-pf", "calculadora-salario-neto-bruto", "calculadora-aguinaldo", "calculadora-finiquito-liquidacion"]
  },
  {
    id: "lisr-resico-113-e",
    institution: "Cámara de Diputados / SAT",
    documentTitle: "Ley del Impuesto Sobre la Renta (LISR) - Artículos 113-E al 113-J",
    topic: "Régimen Simplificado de Confianza (RESICO) para personas físicas y morales",
    publicationDate: "Decreto DOF 12/11/2021",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.sat.gob.mx/regimen-simplificado-de-confianza",
    supportedRule: "Tasas marginales fijas del 1.00% al 2.50% sobre ingresos cobrados brutos hasta 3.5 millones de pesos y retención patronal del 1.25% por personas morales.",
    lastVerified: "Enero 2026",
    categorySlugs: ["sat", "resico"],
    calculatorSlugs: ["calculadora-resico-pf", "comparador-resico-actividad-empresarial"]
  },
  {
    id: "lft-finiquito-liquidacion",
    institution: "Cámara de Diputados / Secretaría del Trabajo y Previsión Social",
    documentTitle: "Ley Federal del Trabajo (LFT) - Artículos 48, 50, 76, 80, 87 y 162",
    topic: "Prestaciones laborales devengadas, indemnización constitucional y prima de antigüedad",
    publicationDate: "Texto vigente con reformas de Vacaciones Dignas DOF 27/12/2022",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    supportedRule: "Cálculo de 3 meses de salario integrado + 20 días por año para despido injustificado, mínimo 15 días de aguinaldo, 25% de prima vacacional y 12 días por año de prima de antigüedad (topada al doble del SMG).",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-finiquito-liquidacion", "calculadora-aguinaldo", "calculadora-vacaciones-prima"]
  },
  {
    id: "lft-vacaciones-dignas",
    institution: "Diario Oficial de la Federación (DOF)",
    documentTitle: "Decreto por el que se reforman los artículos 76 y 78 de la Ley Federal del Trabajo",
    topic: "Tabla progresiva de vacaciones pagadas a partir del primer año de servicio",
    publicationDate: "27 de diciembre de 2022",
    effectiveDate: "Vigente a partir del 1 de enero de 2023 en adelante",
    officialUrl: "https://www.dof.gob.mx/nota_detalle.php?codigo=5675822&fecha=27/12/2022",
    supportedRule: "Escala obligatoria de descanso continuo: mínimo 12 días laborables al primer año, aumentando 2 días por año subsecuente hasta llegar a 20 días en el quinto año.",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-vacaciones-prima", "calculadora-finiquito-liquidacion"]
  },
  {
    id: "inegi-uma",
    institution: "Instituto Nacional de Estadística y Geografía (INEGI)",
    documentTitle: "Valores Oficiales de la Unidad de Medida y Actualización (UMA)",
    topic: "Valor diario, mensual y anual de la UMA conforme a la variación del INPC",
    publicationDate: "Publicación anual oficial cada enero en el DOF",
    effectiveDate: "Valores oficiales para 2025 ($113.14 diario) y 2026 ($117.29 diario)",
    officialUrl: "https://www.inegi.org.mx/temas/uma/",
    supportedRule: "Desindexación del salario mínimo para topes de exención fiscal (aguinaldo exento hasta 30 UMA, prima vacacional hasta 15 UMA, deducciones personales hasta 5 UMA anuales).",
    lastVerified: "Febrero 2026",
    categorySlugs: ["sat", "nomina"],
    calculatorSlugs: ["calculadora-conversor-uma", "calculadora-isr-pf", "calculadora-finiquito-liquidacion", "calculadora-aguinaldo", "calculadora-vacaciones-prima"]
  },
  {
    id: "conasami-salarios-minimos",
    institution: "Comisión Nacional de los Salarios Mínimos (CONASAMI) / DOF",
    documentTitle: "Resolución del Consejo de Representantes de la CONASAMI sobre Salarios Mínimos",
    topic: "Salarios mínimos generales vigentes en el país y en la Zona Libre de la Frontera Norte (ZLFN)",
    publicationDate: "Publicado en el Diario Oficial de la Federación",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.gob.mx/conasami",
    supportedRule: "Tope del doble del salario mínimo general diario para el cálculo de la prima de antigüedad del Artículo 162 de la LFT y piso salarial general.",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-finiquito-liquidacion", "calculadora-salario-neto-bruto"]
  },
  {
    id: "liva-art-1",
    institution: "Cámara de Diputados del H. Congreso de la Unión",
    documentTitle: "Ley del Impuesto al Valor Agregado (LIVA) - Artículos 1, 1-A y 2-A",
    topic: "Tasa general de IVA, tasa fronteriza y actos gravados al 0%",
    publicationDate: "Última reforma publicada en DOF 12/11/2021",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LIVA.pdf",
    supportedRule: "Tasa general del 16% en territorio nacional, acreditamiento de IVA trasladado con CFDI desglosado y fórmulas de desglose directo o adición de impuesto.",
    lastVerified: "Enero 2026",
    categorySlugs: ["sat"],
    calculatorSlugs: ["calculadora-iva"]
  },
  {
    id: "lisr-depreciacion-34-35",
    institution: "Cámara de Diputados del H. Congreso de la Unión",
    documentTitle: "Ley del Impuesto Sobre la Renta (LISR) - Artículos 31 al 38 (Sección II de las Inversiones)",
    topic: "Deducción de inversiones en activos fijos por el método de línea recta",
    publicationDate: "Texto legal vigente",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf",
    supportedRule: "Porcentajes máximos autorizados de depreciación anual: equipo de cómputo (30%), vehículos (25%), mobiliario y equipo de oficina (10%) y construcciones (5%).",
    lastVerified: "Enero 2026",
    categorySlugs: ["negocios"],
    calculatorSlugs: ["calculadora-depreciacion-activos"]
  },
  {
    id: "banxico-circular-34-2010",
    institution: "Banco de México (Banxico)",
    documentTitle: "Circular 34/2010 - Disposiciones relativas a las operaciones de las Instituciones de Crédito",
    topic: "Fórmula regulatoria de amortización mínima obligatoria en tarjetas de crédito",
    publicationDate: "Publicada en el Diario Oficial de la Federación",
    effectiveDate: "Vigente en todo el sistema bancario mexicano",
    officialUrl: "https://www.banxico.org.mx/marco-normativo/",
    supportedRule: "Cálculo del pago mínimo obligatorio como el mayor entre: el 1.5% del saldo insoluto de la línea más intereses e IVA, o el 1.25% del límite de la línea de crédito.",
    lastVerified: "Enero 2026",
    categorySlugs: ["finanzas-personales"],
    calculatorSlugs: ["calculadora-pago-tarjeta-credito"]
  },
  {
    id: "banxico-fix-tipo-cambio",
    institution: "Banco de México (Banxico)",
    documentTitle: "Tipo de Cambio de Referencia FIX y Tipos para Solventar Obligaciones",
    topic: "Determinación oficial del tipo de cambio del peso respecto al dólar estadounidense",
    publicationDate: "Actualización diaria en días bancarios hábiles",
    effectiveDate: "Monitoreo diario oficial",
    officialUrl: "https://www.banxico.org.mx/tipcamb/",
    supportedRule: "Tipo de cambio interbancario de equilibrio utilizado como base comparativa para medir márgenes de comisiones y cobros por transacciones internacionales.",
    lastVerified: "Marzo 2026",
    categorySlugs: ["finanzas-personales"],
    calculatorSlugs: ["tipo-de-cambio", "calculadora-comisiones-tarjeta-dolares"]
  },
  {
    id: "imss-ley-seguro-social",
    institution: "Instituto Mexicano del Seguro Social (IMSS) / Cámara de Diputados",
    documentTitle: "Ley del Seguro Social (LSS) - Régimen de 1973 y Régimen de 1997",
    topic: "Semanas cotizadas para pensión por cesantía en edad avanzada y vejez",
    publicationDate: "Leyes vigentes y decretos de reforma a la LSS de 2020",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/",
    supportedRule: "Requisito de 500 semanas cotizadas para Ley 1973 y escala progresiva de semanas cotizadas para Ley 1997 (850 semanas mínimas en 2026 hacia las 1,000 semanas en 2031).",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-semanas-cotizadas-imss", "calculadora-afore"]
  },
  {
    id: "profedet-asesoria",
    institution: "Procuraduría Federal de la Defensa del Trabajo (PROFEDET)",
    documentTitle: "Guía de Asesoría Integral y Conciliación Laboral Gratuita",
    topic: "Defensa jurídica pública de trabajadores ante despidos y pago de prestaciones",
    publicationDate: "Actualización institucional permanente",
    effectiveDate: "Servicio público activo",
    officialUrl: "https://www.gob.mx/profedet",
    supportedRule: "Plazos de prescripción de la LFT: 2 meses para demandar despido injustificado (Art. 518) y 1 año para exigir pago de salarios y finiquito (Art. 516).",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-finiquito-liquidacion"]
  },
  {
    id: "sunat-normas-tributarias",
    institution: "Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT - Perú)",
    documentTitle: "Texto Único Ordenado de la Ley del Impuesto a la Renta - D.S. N° 179-2004-EF",
    topic: "Renta de Quinta Categoría (trabajadores en planilla), IGV y RUC en Perú",
    publicationDate: "Texto normativo consolidado de la República del Perú",
    effectiveDate: "Vigente para el Ejercicio Gravable 2026 en Perú",
    officialUrl: "https://orientacion.sunat.gob.pe/impuesto-a-la-renta-de-quinta-categoria",
    supportedRule: "Deducción fija de 7 UITs para personas naturales domiciliadas que perciben rentas de trabajo y escalas progresivas acumulativas del 8% al 30%.",
    lastVerified: "Enero 2026",
    categorySlugs: ["peru"],
    calculatorSlugs: ["calculadora-quinta-categoria-peru", "calculadora-igv-peru", "consulta-ruc-sunat", "tipo-de-cambio-sunat"]
  },
  {
    id: "liva-general",
    institution: "Cámara de Diputados / SAT",
    documentTitle: "Ley del Impuesto al Valor Agregado (LIVA) - Artículos 1, 1-A, 2-A, 4 y 5",
    topic: "Tasa general del 16%, tasa 0%, actos exentos y acreditamiento del IVA",
    publicationDate: "Última reforma publicada en DOF",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LIVA.pdf",
    supportedRule: "Mecánica del traslado del 16% de IVA sobre valor de actos o actividades, desglose en CFDI, fórmula de acreditamiento mensual y retenciones de 2/3 partes a personas físicas.",
    lastVerified: "Enero 2026",
    categorySlugs: ["sat"],
    calculatorSlugs: ["calculadora-iva", "calculadora-conversor-impuestos"]
  },
  {
    id: "lss-cuotas-obreras",
    institution: "Instituto Mexicano del Seguro Social (IMSS)",
    documentTitle: "Ley del Seguro Social (LSS) - Artículos 27, 28, 106, 147 y 168",
    topic: "Bases de cotización, cuotas obrero-patronales y financiamiento de los seguros de salud y retiro",
    publicationDate: "Última reforma publicada en el DOF",
    effectiveDate: "Vigente en el Ejercicio Fiscal 2026",
    officialUrl: "https://www.imss.gob.mx/patrones/cuotas",
    supportedRule: "Integración del Salario Base de Cotización (SBC), aportaciones obreras por ramos (enfermedad, maternidad, invalidez, vida, cesantía y vejez) y topes de 25 UMAs.",
    lastVerified: "Enero 2026",
    categorySlugs: ["nomina"],
    calculatorSlugs: ["calculadora-salario-neto-bruto", "calculadora-semanas-cotizadas-imss", "calculadora-afore"]
  }
];

export function getSourcesForCalculator(calculatorSlug: string, categorySlug?: string): OfficialSource[] {
  return OFFICIAL_SOURCES.filter(source => {
    if (source.calculatorSlugs && source.calculatorSlugs.includes(calculatorSlug)) {
      return true;
    }
    if (categorySlug && source.categorySlugs.includes(categorySlug)) {
      return true;
    }
    return false;
  });
}
