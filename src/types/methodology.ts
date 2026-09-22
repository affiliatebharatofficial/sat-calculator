export interface OfficialSource {
  id: string;
  institution: string; // e.g., "SAT", "DOF", "Cámara de Diputados", "INEGI", "IMSS", "CONASAMI", "Banco de México", "SUNAT"
  documentTitle: string; // e.g., "Ley del Impuesto Sobre la Renta (LISR)", "Ley Federal del Trabajo (LFT)"
  topic: string; // e.g., "Tarifas de retención de ISR mensual para Personas Físicas"
  publicationDate?: string; // e.g., "12 de noviembre de 2021"
  effectiveDate?: string; // e.g., "Vigente para el Ejercicio Fiscal 2026"
  officialUrl: string; // Genuine official government URL (.gob.mx or .gob.pe)
  supportedRule: string; // Explanation of what parameter or formula logic it anchors
  lastVerified: string; // e.g., "Enero 2026"
  categorySlugs: string[]; // e.g., ["sat", "nomina", "resico", "finanzas-personales", "negocios", "peru"]
  calculatorSlugs?: string[]; // Specific calculator slugs, e.g., ["calculadora-isr-pf", "calculadora-resico-pf"]
}

export interface CalculatorUpdateRecord {
  id: string;
  calculatorSlug: string;
  calculatorTitle: string;
  categorySlug: string;
  lastReviewed: string; // e.g., "15 de enero de 2026"
  lastParameterUpdate: string; // e.g., "1 de enero de 2026"
  whatChanged: string; // e.g., "Ajuste inflacionario a las tablas progresivas de ISR para personas físicas"
  reasonForUpdate: string; // e.g., "Cumplimiento del Artículo 152 de la LISR tras acumular más del 10% de inflación"
  officialSource: string; // e.g., "Anexo 8 de la Resolución Miscelánea Fiscal (RMF) DOF"
  officialUrl?: string;
}
