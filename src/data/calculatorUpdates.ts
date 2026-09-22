import { CalculatorUpdateRecord } from '@/types/methodology';

export const CALCULATOR_UPDATES: CalculatorUpdateRecord[] = [
  {
    id: "upd-uma-2026",
    calculatorSlug: "calculadora-conversor-uma",
    calculatorTitle: "Calculadora y Conversor de UMA",
    categorySlug: "sat",
    lastReviewed: "10 de febrero de 2026",
    lastParameterUpdate: "1 de febrero de 2026",
    whatChanged: "Incorporación oficial del valor diario de la UMA de $117.29 MXN, mensual de $3,565.61 MXN y anual de $42,794.64 MXN.",
    reasonForUpdate: "Publicación obligatoria anual efectuada por el INEGI en el Diario Oficial de la Federación.",
    officialSource: "Comunicado de Prensa Oficial del INEGI y publicación en el DOF del 9 de enero.",
    officialUrl: "https://www.inegi.org.mx/temas/uma/"
  },
  {
    id: "upd-isr-pf-2026",
    calculatorSlug: "calculadora-isr-pf",
    calculatorTitle: "Calculadora de ISR para Personas Físicas",
    categorySlug: "sat",
    lastReviewed: "15 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Actualización de las 11 escalas de la tarifa progresiva mensual de ISR (límite inferior, cuota fija y porcentaje sobre el excedente).",
    reasonForUpdate: "Ajuste inflacionario estipulado en el Artículo 152 de la Ley del Impuesto Sobre la Renta (LISR) al superar la inflación acumulada el 10%.",
    officialSource: "Anexo 8 de la Resolución Miscelánea Fiscal (RMF) publicada en el DOF.",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf"
  },
  {
    id: "upd-resico-pf-2026",
    calculatorSlug: "calculadora-resico-pf",
    calculatorTitle: "Calculadora RESICO para Personas Físicas",
    categorySlug: "sat",
    lastReviewed: "12 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Auditoría de las tasas marginales fijas del 1.00% al 2.50% y retención del 1.25% de personas morales sobre ingresos efectivamente cobrados.",
    reasonForUpdate: "Confirmación de las disposiciones del Artículo 113-E y 113-J de la LISR vigentes para el ejercicio 2026.",
    officialSource: "Capítulo II.E de la Ley del Impuesto Sobre la Renta y portal oficial SAT.",
    officialUrl: "https://www.sat.gob.mx/regimen-simplificado-de-confianza"
  },
  {
    id: "upd-salario-neto-2026",
    calculatorSlug: "calculadora-salario-neto-bruto",
    calculatorTitle: "Calculadora de Salario Neto y Salario Bruto",
    categorySlug: "nomina",
    lastReviewed: "18 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Sincronización simultánea de las tablas de retención mensual de ISR 2026 y cuotas obreras de seguridad social del IMSS.",
    reasonForUpdate: "Entrada en vigor del nuevo ejercicio fiscal y ajuste al salario mínimo general fijado por CONASAMI.",
    officialSource: "Resolución de Salarios Mínimos CONASAMI (DOF) y Ley del Seguro Social.",
    officialUrl: "https://www.gob.mx/conasami"
  },
  {
    id: "upd-finiquito-2026",
    calculatorSlug: "calculadora-finiquito-liquidacion",
    calculatorTitle: "Calculadora de Finiquito y Liquidación por Despido",
    categorySlug: "nomina",
    lastReviewed: "20 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Actualización del tope legal del doble del salario mínimo para la prima de antigüedad (Art. 162 LFT) y calibración de días devengados.",
    reasonForUpdate: "Incremento al Salario Mínimo General aprobado por CONASAMI para el ejercicio 2026.",
    officialSource: "Artículos 48, 50, 87 y 162 de la Ley Federal del Trabajo.",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf"
  },
  {
    id: "upd-vacaciones-2026",
    calculatorSlug: "calculadora-vacaciones-prima",
    calculatorTitle: "Calculadora de Vacaciones y Prima Vacacional",
    categorySlug: "nomina",
    lastReviewed: "14 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Aplicación estricta de la escala de descanso de 'Vacaciones Dignas' (12 a 20 días continuos en los primeros 5 años) y tope exento de 15 UMAs 2026 ($1,759.35 MXN).",
    reasonForUpdate: "Reforma a los artículos 76 y 78 de la LFT y actualización de la UMA anual del INEGI.",
    officialSource: "Decreto DOF 27/12/2022 y Artículo 93 Frac. XIV de la LISR.",
    officialUrl: "https://www.dof.gob.mx/nota_detalle.php?codigo=5675822&fecha=27/12/2022"
  },
  {
    id: "upd-aguinaldo-2026",
    calculatorSlug: "calculadora-aguinaldo",
    calculatorTitle: "Calculadora de Aguinaldo de Ley",
    categorySlug: "nomina",
    lastReviewed: "15 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Cálculo de exención fiscal de hasta 30 valores diarios de la UMA 2026 ($3,518.70 MXN) conforme al Art. 93 fracción XIV de la LISR.",
    reasonForUpdate: "Entrada en vigor del valor diario de la UMA publicado por el INEGI.",
    officialSource: "Artículo 87 LFT y Artículo 93 fracción XIV LISR.",
    officialUrl: "https://www.inegi.org.mx/temas/uma/"
  },
  {
    id: "upd-depreciacion-2026",
    calculatorSlug: "calculadora-depreciacion-activos",
    calculatorTitle: "Calculadora de Depreciación de Activos Fijos",
    categorySlug: "negocios",
    lastReviewed: "25 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Integración de las tablas de tasas máximas de deducción anual de inversiones autorizadas por los Artículos 34 y 35 de la LISR.",
    reasonForUpdate: "Alineación fiscal de deducciones en el régimen de actividades empresariales y personas morales.",
    officialSource: "Artículos 31 al 38 de la Ley del Impuesto Sobre la Renta (LISR).",
    officialUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf"
  },
  {
    id: "upd-tarjeta-credito-2026",
    calculatorSlug: "calculadora-pago-tarjeta-credito",
    calculatorTitle: "Calculadora de Pago Mínimo en Tarjeta de Crédito",
    categorySlug: "finanzas-personales",
    lastReviewed: "28 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Estandarización de la regla dual obligatoria de Banxico: mayor entre 1.5% del saldo insoluto + intereses/IVA o 1.25% de la línea de crédito.",
    reasonForUpdate: "Supervisión regulatoria de disposiciones aplicables a instituciones de crédito de la República Mexicana.",
    officialSource: "Circular 34/2010 del Banco de México.",
    officialUrl: "https://www.banxico.org.mx/marco-normativo/"
  },
  {
    id: "upd-comisiones-usd-2026",
    calculatorSlug: "calculadora-comisiones-tarjeta-dolares",
    calculatorTitle: "Calculadora de Comisiones de Tarjeta en Dólares",
    categorySlug: "finanzas-personales",
    lastReviewed: "30 de enero de 2026",
    lastParameterUpdate: "1 de enero de 2026",
    whatChanged: "Cálculo analítico del sobreprecio o spread sobre el tipo de cambio FIX de Banxico y advertencias sobre conversión dinámica de divisas (DCC).",
    reasonForUpdate: "Protección al usuario de servicios financieros internacionales y recomendaciones de Condusef.",
    officialSource: "Banco de México (Banxico) y Condusef.",
    officialUrl: "https://www.banxico.org.mx/tipcamb/"
  }
];

export function getUpdatesForCalculator(calculatorSlug: string): CalculatorUpdateRecord[] {
  return CALCULATOR_UPDATES.filter(u => u.calculatorSlug === calculatorSlug);
}
