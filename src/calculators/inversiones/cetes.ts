import { CalculatorConfig } from '../../types/calculator';

export const cetesCalculator: CalculatorConfig = {
  id: 'calculo-cetes',
  title: 'Calculadora de Rendimiento en CETES',
  shortDescription: 'Calcula las ganancias estimadas de invertir en Certificados de la Tesorería de la Federación (CETES) con tasas reales del Banco de México.',
  category: 'Inversiones',
  categorySlug: 'inversiones',
  slug: 'calculadora-cetes-directo',
  seo: {
    metaTitle: 'Calculadora de CETES Directo 2026 - Rendimiento Neto e ISR',
    metaDescription: 'Simula tu inversión en CETES a plazos de 28, 91, 182 y 364 días. Calcula tus intereses brutos, la retención fiscal de ISR y el capital neto final.',
    keywords: ['calculadora cetes', 'cetes directo mexico', 'rendimiento cetes 28 dias', 'retencion isr inversiones', 'banco de mexico cetes'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_invertir',
      label: 'Monto a Invertir ($)',
      type: 'number',
      defaultValue: 10000,
      placeholder: 'Ej: $10,000 pesos',
      suffix: 'MXN'
    },
    {
      id: 'plazo_dias',
      label: 'Plazo de la Inversión (Días)',
      type: 'select',
      defaultValue: 28,
      options: [
        { label: '28 días', value: 28 },
        { label: '91 días', value: 91 },
        { label: '182 días', value: 182 },
        { label: '364 días', value: 364 }
      ]
    },
    {
      id: 'tasa_anual',
      label: 'Tasa de Interés Anual (%)',
      type: 'number',
      defaultValue: 11.00,
      placeholder: 'Ej: 11.00 %'
    },
    {
      id: 'tasa_isr_anual',
      label: 'Tasa de Retención de ISR Anual (%)',
      type: 'number',
      defaultValue: 0.50,
      placeholder: 'Tasa de retención de la Ley de Ingresos'
    }
  ],
  calculate: (inputs) => {
    const principal = parseFloat(inputs.monto_invertir) || 0;
    const plazo = parseInt(inputs.plazo_dias) || 28;
    const tasaAnual = parseFloat(inputs.tasa_anual) || 0;
    const tasaIsr = parseFloat(inputs.tasa_isr_anual) || 0.50;

    // Financial standard in Mexican money market uses 360 days base for CETES
    const rendimientoBruto = principal * (tasaAnual / 100) * (plazo / 360);

    // Capital gains withholding tax (ISR) is calculated on principal base
    const retencionIsr = principal * (tasaIsr / 100) * (plazo / 360);

    const rendimientoNeto = rendimientoBruto - retencionIsr;
    const montoFinal = principal + rendimientoNeto;

    const steps = [
      {
        description: `Se calcula el rendimiento bruto multiplicando el capital invertido por la tasa anual prorrateada por el plazo de inversión (base de 360 días del mercado financiero).`,
        mathFormula: `Rendimiento\\ Bruto = Capital \\times \\left( \\frac{Tasa\\ Anual}{100} \\right) \\times \\left( \\frac{Plazo}{360} \\right) = $${principal.toFixed(2)} \\times ${(tasaAnual / 100).toFixed(4)} \\times \\left( \\frac{${plazo}}{360} \\right) = $${rendimientoBruto.toFixed(2)}`
      },
      {
        description: `Se calcula la retención provisional de ISR sobre el capital invertido aplicando la tasa oficial de la Ley de Ingresos de la Federación prorrateada por el plazo.`,
        mathFormula: `Retenci\\acute{o}n\\ ISR = Capital \\times \\left( \\frac{Tasa\\ ISR}{100} \\right) \\times \\left( \\frac{Plazo}{360} \\right) = $${principal.toFixed(2)} \\times ${(tasaIsr / 100).toFixed(4)} \\times \\left( \\frac{${plazo}}{360} \\right) = $${retencionIsr.toFixed(2)}`
      },
      {
        description: `Se restan las retenciones de ISR del rendimiento bruto para obtener la ganancia neta.`,
        mathFormula: `Rendimiento\\ Neto = Rendimiento\\ Bruto - Retenci\\acute{o}n = $${rendimientoBruto.toFixed(2)} - $${retencionIsr.toFixed(2)} = $${rendimientoNeto.toFixed(2)}`
      },
      {
        description: `Se suma el capital inicial más el rendimiento neto para obtener el saldo disponible al vencimiento.`,
        mathFormula: `Monto\\ Final = Capital + Rendimiento\\ Neto = $${principal.toFixed(2)} + $${rendimientoNeto.toFixed(2)} = $${montoFinal.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Capital Inicial Invertido', value: principal, formatted: `$${principal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Intereses Brutos Generados', value: rendimientoBruto, formatted: `$${rendimientoBruto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención Provisional de ISR (SAT)', value: retencionIsr, formatted: `$${retencionIsr.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Interés Neto Ganado (Libre)', value: rendimientoNeto, formatted: `$${rendimientoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Capital Total al Vencimiento', value: montoFinal, formatted: `$${montoFinal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Simula con precisión bancaria y fiscal el rendimiento bruto, la retención provisional del Impuesto sobre la Renta (ISR sobre capital según la Ley de Ingresos de la Federación) y el saldo neto disponible al vencimiento al invertir en Certificados de la Tesorería de la Federación (CETES) a plazos de 28, 91, 182 y 364 días.',
    whoShouldUse: [
      'Inversionistas particulares y personas físicas que buscan proteger su patrimonio contra la inflación con el menor riesgo crediticio del mercado financiero mexicano',
      'Ahorradores que evalúan fondos de emergencia con liquidez a corto plazo o reinversión periódica',
      'Contribuyentes asalariados, profesionistas y personas con actividad empresarial que proyectan el impacto de las retenciones de ISR en sus ingresos por intereses',
      'Estudiantes y profesionales de finanzas que requieren calcular la matemática financiera de pagarés gubernamentales emitidos a tasa de descuento'
    ],
    howItWorks: 'Aplica la fórmula financiera estándar de los mercados de deuda soberana en México: prorratea la tasa nominal anual por el plazo exacto de inversión tomando como base un año comercial de 360 días. Calcula el rendimiento bruto generado por el capital, computa la retención obligatoria de ISR sobre el capital invertido estipulada en el Artículo 21 de la Ley de Ingresos de la Federación, y deduce este impuesto para entregar el rendimiento neto final y el capital total acumulado al vencimiento.',
    explanation: 'Los CETES (Certificados de la Tesorería de la Federación) son pagarés gubernamentales emitidos por la Secretaría de Hacienda y Crédito Público (SHCP) y colocados semanalmente por el Banco de México (Banxico). Se adquieren por debajo de su valor nominal de $10 pesos (a tasa de descuento) y al cumplirse el plazo pactado (28, 91, 182 o 364 días), el gobierno liquida los $10 pesos íntegros por título. Dado que cuentan con el respaldo directo de la recaudación tributaria federal, se consideran la inversión de menor riesgo crediticio en moneda nacional (tasa libre de riesgo en México).',
    formula: '1. Rendimiento Bruto = Capital * ( Tasa Anual Nominal / 100 ) * ( Plazo en Días / 360 )\n2. Retención Fiscal de ISR = Capital * ( Tasa ISR LIF / 100 ) * ( Plazo en Días / 360 )\n3. Rendimiento Neto Libre = Rendimiento Bruto - Retención Fiscal de ISR\n4. Capital Total al Vencimiento = Capital + Rendimiento Neto Libre\n5. Tasa Neta Efectiva Anualizada = ( Rendimiento Neto / Capital ) * ( 360 / Plazo en Días ) * 100',
    example: 'Para una inversión de $10,000.00 MXN a un plazo de 28 días con tasa anual del 11.00% y retención de ISR del 0.50% anual:\n• Factor de plazo (base 360 días): 28 / 360 = 0.077778\n• Rendimiento Bruto: $10,000.00 * 0.1100 * 0.077778 = $85.56 MXN\n• Retención Provisional de ISR SAT: $10,000.00 * 0.0050 * 0.077778 = $3.89 MXN\n• Rendimiento Neto Libre: $85.56 - $3.89 = $81.67 MXN\n• Capital Total Depositado al Vencimiento: $10,081.67 MXN',
    legislation: 'Ley del Mercado de Valores; Ley de Ingresos de la Federación (LIF vigente, Artículo que fija la tasa de retención anual aplicable a los intereses que pagan los intermediarios financieros); Ley del Impuesto sobre la Renta (LISR), Artículos 54 y 135 (obligaciones de retención a instituciones financieras y acumulación de intereses reales en declaración anual); y Circulares de Operaciones de Mercado Abierto del Banco de México.',
    tips: [
      'Si mantienes una estrategia de largo plazo, activa la opción de "Reinversión Automática" en Cetesdirecto para aprovechar el interés compuesto (los intereses ganados compran nuevos títulos en cada ciclo).',
      'La retención de ISR en CETES es un pago provisional a cuenta: en tu Declaración Anual del SAT, el impuesto definitivo se cobra únicamente sobre la ganancia real (tasa de interés menos la tasa de inflación oficial del año determinada por el INEGI).',
      'Revisa los resultados de las subastas primarias que Banxico publica cada martes después de las 18:00 hrs para conocer las tasas actualizadas que regirán a partir del jueves siguiente.',
      'Si requieres disponibilidad inmediata de lunes a viernes en horario bancario, evalúa mantener tus recursos en Bonddia (fondo diario de Cetesdirecto) en lugar de amarrar plazos fijos de 91 o 364 días.'
    ],
    assumptions: [
      'El cálculo utiliza la convención bancaria y bursátil mexicana de año comercial de 360 días (meses normalizados de 30 días).',
      'Se asume que los títulos son conservados por el inversionista hasta el vencimiento natural del plazo pactado.',
      'La tasa de rendimiento anual se mantiene constante durante el periodo simulado.',
      'No se aplican costos de corretaje o custodia, correspondiente a operaciones directas en Cetesdirecto.'
    ],
    limitations: [
      'No modela la venta anticipada de títulos en el mercado secundario, donde el precio de liquidación puede sufrir minusvalías o plusvalías según la fluctuación de las tasas de mercado.',
      'No calcula el impacto final de la inflación anualizada (interés real) ni el ajuste definitivo de la declaración anual ante el SAT.',
      'No incluye inversiones complementarias como UDIBONOS (indexados a la inflación en UDIS) ni Bonos de Desarrollo de tasa fija.'
    ],
    faqs: [
      {
        question: '¿Qué es Cetesdirecto y cobra alguna comisión por operar?',
        answer: 'Cetesdirecto es una plataforma pública gratuita creada por la Secretaría de Hacienda y Crédito Público (SHCP) y operada por Nacional Financiera (Nafin). Permite a cualquier persona física mexicana comprar valores gubernamentales directamente de las subastas de Banxico sin intermediarios bancarios, casas de bolsa ni cobro de comisiones por apertura, manejo de cuenta o custodia.'
      },
      {
        question: '¿Por qué la retención de ISR se calcula sobre el capital y no sobre la ganancia?',
        answer: 'La Ley de Ingresos de la Federación (LIF) y la Ley del ISR establecen que las instituciones financieras deben aplicar una tasa de retención provisional directa sobre el saldo promedio diario de capital invertido, independientemente del interés bruto generado. En la declaración anual, el SAT ajusta esta retención contra el interés real efectivamente obtenido.'
      },
      {
        question: '¿Cómo se declaran las ganancias de CETES en la Declaración Anual?',
        answer: 'En el mes de abril de cada año, Cetesdirecto emite una constancia fiscal de retenciones. En el aplicativo del SAT, tus intereses nominales y retenciones ya aparecen precargados. El sistema calcula el interés real restando la inflación anual: si la tasa de Cetes superó a la inflación, pagarás ISR por el excedente; si la inflación fue mayor, se genera una pérdida fiscal por intereses que puedes deducir.'
      },
      {
        question: '¿Cuál es el monto mínimo y máximo para invertir en CETES?',
        answer: 'El monto mínimo de inversión es de tan solo $100 pesos mexicanos. En su modalidad inicial simplificada (con firma electrónica básica por internet), la cuenta tiene un límite de depósito mensual aproximado de 3,000 UDIs (alrededor de $24,000 a $25,000 pesos al mes). Si autenticas tu cuenta con tu e.firma (firma electrónica avanzada del SAT), el límite de depósito se incrementa hasta $10 millones de pesos.'
      },
      {
        question: '¿Puedo retirar mi dinero antes de que venza el plazo de los CETES?',
        answer: 'Sí. Cetesdirecto permite la venta anticipada de tus títulos en días hábiles bancarios a través del mercado secundario. Sin embargo, al vender antes del vencimiento el precio del CETE se calcula al valor de mercado de ese día específico, lo que podría generar una ligera variación respecto al rendimiento originalmente estimado.'
      }
    ],
    relatedCalculators: [
      'sat/calculadora-isr-pf',
      'creditos/calculadora-credito-hipotecario',
      'nomina/calculadora-salario-neto-bruto'
    ],
    sources: [
      {
        name: 'Cetesdirecto — Nacional Financiera (Nafin) / SHCP',
        url: 'https://www.cetesdirecto.com',
        description: 'Plataforma oficial del Gobierno de México para la adquisición directa de deuda gubernamental sin intermediarios.'
      },
      {
        name: 'Banco de México (Banxico) — Sistema de Información Económica',
        url: 'https://www.banxico.org.mx',
        description: 'Estadísticas oficiales, subastas primarias semanales y calendario de colocación de valores gubernamentales.'
      },
      {
        name: 'Secretaría de Hacienda y Crédito Público — Ley de Ingresos de la Federación',
        url: 'https://www.finanzaspublicas.hacienda.gob.mx',
        description: 'Disposiciones oficiales sobre la tasa anual de retención de ISR aplicable al sistema financiero nacional.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta de simulación financiera y didáctica. Los rendimientos reales dependen de las tasas de asignación resultantes de las subastas semanales del Banco de México y de las disposiciones vigentes en la Ley de Ingresos de la Federación. No constituye asesoría financiera ni oferta pública de valores.'
  }
};
