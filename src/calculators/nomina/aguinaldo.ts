import { CalculatorConfig } from '../../types/calculator';

// Monthly ISR Brackets for incremental ISR calculation
const MONTHLY_ISR_BRACKETS = [
  { limitInferior: 0.01, cuotaFija: 0.00, tasa: 1.92 },
  { limitInferior: 746.05, cuotaFija: 14.32, tasa: 6.40 },
  { limitInferior: 6332.06, cuotaFija: 371.83, tasa: 10.88 },
  { limitInferior: 11128.02, cuotaFija: 893.55, tasa: 16.00 },
  { limitInferior: 12935.83, cuotaFija: 1182.81, tasa: 17.92 },
  { limitInferior: 15487.72, cuotaFija: 1640.18, tasa: 21.36 },
  { limitInferior: 31236.50, cuotaFija: 5004.12, tasa: 23.52 },
  { limitInferior: 49235.83, cuotaFija: 9236.89, tasa: 30.00 },
  { limitInferior: 93993.91, cuotaFija: 22664.36, tasa: 32.00 },
  { limitInferior: 125325.21, cuotaFija: 32690.40, tasa: 34.00 },
  { limitInferior: 375975.62, cuotaFija: 117911.48, tasa: 35.00 }
];

const UMA_2024 = 108.57;

function calculateISR(baseAmount: number): number {
  if (baseAmount <= 0) return 0;
  let bracket = MONTHLY_ISR_BRACKETS[0];
  for (let i = 0; i < MONTHLY_ISR_BRACKETS.length; i++) {
    if (baseAmount >= MONTHLY_ISR_BRACKETS[i].limitInferior) {
      bracket = MONTHLY_ISR_BRACKETS[i];
    } else {
      break;
    }
  }
  const excedente = baseAmount - bracket.limitInferior;
  return bracket.cuotaFija + (excedente * (bracket.tasa / 100));
}

export const aguinaldoCalculator: CalculatorConfig = {
  id: 'calculo-aguinaldo',
  title: 'Calculadora de Aguinaldo',
  shortDescription: 'Calcula el monto de tu aguinaldo de fin de año o tu parte proporcional por días trabajados, incluyendo la exención de ISR.',
  category: 'Nómina y LFT',
  categorySlug: 'nomina',
  slug: 'calculadora-aguinaldo',
  seo: {
    metaTitle: 'Calculadora de Aguinaldo 2026 - Parte Proporcional e ISR',
    metaDescription: 'Calcula tu aguinaldo proporcional en México. Ingresa tus días trabajados, sueldo mensual y conoce el total bruto, exención de ISR del SAT y neto libre.',
    keywords: ['calculadora aguinaldo', 'aguinaldo proporcional', 'calcular aguinaldo mexico', 'aguinaldo exento isr', 'sat aguinaldo'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_mensual',
      label: 'Sueldo Mensual Bruto ($)',
      type: 'number',
      defaultValue: 15000,
      placeholder: 'Ingresa tu salario mensual bruto',
      suffix: 'MXN'
    },
    {
      id: 'dias_aguinaldo',
      label: 'Días de Aguinaldo al año (Ley exige mínimo 15)',
      type: 'number',
      defaultValue: 15,
      placeholder: 'Ej: 15 días'
    },
    {
      id: 'dias_trabajados',
      label: 'Días trabajados en el año actual (Año completo = 365)',
      type: 'number',
      defaultValue: 365,
      placeholder: 'Ej: 365 días'
    }
  ],
  calculate: (inputs) => {
    const sueldoMensual = parseFloat(inputs.sueldo_mensual) || 0;
    const diasAguinaldo = parseFloat(inputs.dias_aguinaldo) || 15;
    const diasTrabajados = Math.min(365, parseFloat(inputs.dias_trabajados) || 0);

    const sueldoDiario = sueldoMensual / 30;

    // Proportional calculation
    const aguinaldoBrutoAnual = sueldoDiario * diasAguinaldo;
    const aguinaldoBruto = (aguinaldoBrutoAnual / 365) * diasTrabajados;

    // ISR Exemption limit: 30 UMA
    const exentoLimite = 30 * UMA_2024;
    const montoExento = Math.min(aguinaldoBruto, exentoLimite);
    const montoGravado = Math.max(0, aguinaldoBruto - montoExento);

    // Incremental ISR Calculation
    const isrSinAguinaldo = calculateISR(sueldoMensual);
    const isrConAguinaldo = calculateISR(sueldoMensual + montoGravado);
    const isrAguinaldo = Math.max(0, isConAguinaldoResult() ? isrConAguinaldo - isrSinAguinaldo : 0);

    function isConAguinaldoResult() {
      return isrConAguinaldo > isrSinAguinaldo;
    }

    const aguinaldoNeto = aguinaldoBruto - isrAguinaldo;

    const steps = [
      {
        description: `Se calcula el Salario Diario dividiendo el sueldo mensual bruto entre 30.`,
        mathFormula: `Salario\\ Diario = \\frac{$${sueldoMensual.toFixed(2)}}{30} = $${sueldoDiario.toFixed(2)}`
      },
      {
        description: `Se calcula el Aguinaldo Anual correspondiente (por 365 días) multiplicando el salario diario por los días de aguinaldo.`,
        mathFormula: `Aguinaldo\\ Anual = $${sueldoDiario.toFixed(2)} \\times ${diasAguinaldo} = $${aguinaldoBrutoAnual.toFixed(2)}`
      },
      {
        description: `Se calcula la parte proporcional del aguinaldo según los días trabajados en el año actual (${diasTrabajados} días).`,
        mathFormula: `Aguinaldo\\ Proporcional = \\frac{$${aguinaldoBrutoAnual.toFixed(2)}}{365} \\times ${diasTrabajados} = $${aguinaldoBruto.toFixed(2)}`
      },
      {
        description: `Por ley, el aguinaldo está exento de impuestos hasta por el valor de 30 UMAS ($${exentoLimite.toFixed(2)}).`,
        mathFormula: `Monto\\ Exento = M\\acute{\\imath}n(Aguinaldo,\\ $${exentoLimite.toFixed(2)}) = $${montoExento.toFixed(2)}`
      },
      {
        description: `El excedente exento es gravable y se le aplica la tarifa correspondiente de ISR.`,
        mathFormula: `Monto\\ Gravable = Aguinaldo\\ Proporcional - Monto\\ Exento = $${aguinaldoBruto.toFixed(2)} - $${montoExento.toFixed(2)} = $${montoGravado.toFixed(2)}`
      },
      {
        description: `Se calcula la retención de ISR estimada mediante el método incremental (diferencia de ISR de sueldo mensual con y sin aguinaldo gravado).`,
        mathFormula: `ISR\\ Retenido = ISR\\ Incremental = $${isrAguinaldo.toFixed(2)}`
      },
      {
        description: `Se resta el ISR del Aguinaldo Proporcional para obtener el Aguinaldo Neto a recibir.`,
        mathFormula: `Aguinaldo\\ Neto = Aguinaldo\\ Proporcional - ISR = $${aguinaldoBruto.toFixed(2)} - $${isrAguinaldo.toFixed(2)} = $${aguinaldoNeto.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Salario Diario', value: sueldoDiario, formatted: `$${sueldoDiario.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Aguinaldo Bruto Proporcional', value: aguinaldoBruto, formatted: `$${aguinaldoBruto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Exento de ISR (30 UMAS)', value: montoExento, formatted: `$${montoExento.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Gravado (Sujeto a ISR)', value: montoGravado, formatted: `$${montoGravado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención de ISR Estimada', value: isrAguinaldo, formatted: `$${isrAguinaldo.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Aguinaldo Neto a Recibir (Libre)', value: aguinaldoNeto, formatted: `$${aguinaldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión el aguinaldo anual bruto y neto para trabajadores en México, aplicando el mínimo legal de 15 días (o prestaciones superiores), ajustando proporcionalmente por días trabajados en el año y aplicando la exención legal de 30 UMAs para el cálculo del ISR retenido.',
    whoShouldUse: [
      'Trabajadores en nómina que desean conocer el monto neto exacto de aguinaldo que deben recibir antes del 20 de diciembre',
      'Empleados con menos de un año de antigüedad que necesitan calcular su parte proporcional',
      'Encargados de Nómina y Recursos Humanos que proyectan el pago anual de gratificaciones',
      'Trabajadores que concluyen una relación laboral y auditan el aguinaldo dentro de su finiquito'
    ],
    howItWorks: 'Divide el sueldo mensual bruto entre 30 para obtener el salario diario, multiplica por los días contractuales de aguinaldo (mínimo 15) y prorratea entre 365 días por los días efectivamente laborados. Aplica la exención fiscal de 30 UMAs (Art. 93 Fracc. XIV LISR) y calcula la retención de ISR sobre el excedente mediante el método incremental reglamentario.',
    explanation: 'El aguinaldo es una gratificación laboral obligatoria en México consagrada en el Artículo 87 de la Ley Federal del Trabajo. Todo trabajador subordinado tiene derecho a recibir por lo menos 15 días de salario antes del 20 de diciembre. Quienes no hayan cumplido el año completo de servicios tienen derecho a que se les pague la parte proporcional exacta al tiempo efectivamente laborado. Fiscalmente, la Ley del ISR otorga un beneficio de exención hasta por el equivalente a 30 Unidades de Medida y Actualización (UMA).',
    formula: '1. Salario Diario = Sueldo Mensual Bruto / 30\n2. Aguinaldo Bruto Anual = Salario Diario * Días de Aguinaldo (Mínimo 15)\n3. Aguinaldo Proporcional = ( Aguinaldo Bruto Anual / 365 ) * Días Trabajados en el Año\n4. Límite Exento de ISR = 30 * Valor Diario de la UMA Vigente\n5. Monto Gravado = Max(0, Aguinaldo Proporcional - Límite Exento)\n6. ISR Retenido = ISR(Sueldo Mensual + Monto Gravado) - ISR(Sueldo Mensual)\n7. Aguinaldo Neto Libre = Aguinaldo Proporcional - ISR Retenido',
    example: 'Sueldo mensual: $18,000.00 MXN | Días de aguinaldo: 15 días | Días laborados: 365 días (año completo)\n• Salario Diario: $18,000.00 ÷ 30 = $600.00 MXN\n• Aguinaldo Bruto: $600.00 × 15 = $9,000.00 MXN\n• Exención fiscal (30 UMAs 2024/2026 approx $108.57/día): 30 × $108.57 = $3,257.10 MXN\n• Monto Gravable: $9,000.00 - $3,257.10 = $5,742.90 MXN\n• ISR Retenido estimado sobre el gravable: $980.50 MXN\n• Aguinaldo Neto en Cuenta Bancaria: $9,000.00 - $980.50 = $8,019.50 MXN',
    legislation: 'Ley Federal del Trabajo (LFT), Artículo 87 (Obligación de pago y plazo máximo al 20 de diciembre); y Ley del Impuesto sobre la Renta (LISR), Artículo 93, Fracción XIV (Monto exento de 30 UMAs); e Instituto Nacional de Estadística y Geografía (INEGI, determinación del valor oficial de la UMA).',
    tips: [
      'La fecha límite legal inamovible para que el patrón pague el aguinaldo es el 19 de diciembre a las 23:59 hrs (debe quedar pagado "antes del 20 de diciembre").',
      'Si tienes incapacidades por maternidad pre y post natal, o por riesgo de trabajo calificado por el IMSS, esos periodos se computan legalmente como días laborados para el aguinaldo.',
      'El aguinaldo no se puede pagar en especie (mercancía, vales de despensa, fichas o regalos); por mandato constitucional debe liquidarse en moneda de curso legal.'
    ],
    assumptions: [
      'El cálculo toma como base un salario fijo mensual. Para salarios variables (comisiones), la LFT estipula promediar los ingresos de los últimos 30 días efectivamente trabajados.',
      'Se toma como base el año calendario civil de 365 días (o 366 si es bisiesto).',
      'No se consideran deducciones por créditos personales ni descuentos que no estén autorizados por la LFT.'
    ],
    limitations: [
      'No aplica para profesionistas o contratistas que prestan servicios bajo el régimen de honorarios puros o contratos civiles/mercantiles sin relación de subordinación laboral.',
      'No contempla convenios de retiro voluntario donde las partes pacten un aguinaldo superior al previsto en el contrato individual o colectivo.',
      'No sustituye el recibo de nómina formal (CFDI) timbrado por el patrón.'
    ],
    faqs: [
      {
        question: '¿Cuándo es la fecha límite para recibir el aguinaldo?',
        answer: 'De acuerdo con el Artículo 87 de la Ley Federal del Trabajo (LFT), los patrones tienen la obligación legal de entregar el aguinaldo a los trabajadores antes del 20 de diciembre de cada año. Si el 20 de diciembre no lo has recibido, puedes acudir a la PROFEDET para recibir asesoría y conciliación gratuita.'
      },
      {
        question: '¿Cuánto tiempo tengo para reclamar mi aguinaldo si no me lo pagaron?',
        answer: 'Conforme al Artículo 516 de la LFT, el trabajador cuenta con un plazo de un año natural, contado a partir del 21 de diciembre, para presentar su reclamación formal ante las autoridades laborales competentes.'
      },
      {
        question: '¿Si renuncié o me despidieron antes de diciembre, tengo derecho a aguinaldo?',
        answer: 'Sí, absolutamente. Tienes derecho a recibir la parte proporcional correspondiente a los meses y días que laboraste durante el año natural en curso, la cual debe estar desglosada y liquidada dentro de tu finiquito o liquidación.'
      },
      {
        question: '¿El patrón me puede descontar faltas o permisos de mi aguinaldo?',
        answer: 'Las faltas injustificadas y permisos sin goce de sueldo no se computan como días laborados, por lo que pueden restar días al factor proporcional. Sin embargo, las incapacidades por maternidad y los periodos de riesgo de trabajo se consideran días trabajados por ley y no pueden descontarse.'
      }
    ],
    sources: [
      {
        name: 'PROFEDET — Procuraduría Federal de la Defensa del Trabajo',
        url: 'https://www.gob.mx/profedet',
        description: 'Guía oficial de derechos y preguntas frecuentes sobre el pago de aguinaldo.'
      },
      {
        name: 'Cámara de Diputados — Ley Federal del Trabajo Art. 87',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto legal de la LFT sobre prestaciones y gratificaciones anuales de los trabajadores.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-salario-neto-bruto',
      'nomina/calculadora-finiquito-liquidacion',
      'nomina/calculadora-vacaciones-prima'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta interactiva de carácter informativo y didáctico. Los montos finales y retenciones exactas deben validarse en el comprobante fiscal digital por internet (CFDI) emitido por tu empresa empleadora.'
  }
};
