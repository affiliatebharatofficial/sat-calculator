import { CalculatorConfig } from '../../types/calculator';

// Monthly ISR Brackets
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

// Official 2026 UMA daily value ($113.14 MXN)
const UMA_2026 = 113.14;

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

function getVacationDays(years: number): number {
  if (years <= 1) return 12;
  if (years === 2) return 14;
  if (years === 3) return 16;
  if (years === 4) return 18;
  if (years === 5) return 20;
  if (years <= 10) return 22;
  if (years <= 15) return 24;
  if (years <= 20) return 26;
  if (years <= 25) return 28;
  return 30;
}

export const vacationsCalculator: CalculatorConfig = {
  id: 'calculo-vacaciones',
  title: 'Calculadora de Vacaciones y Prima Vacacional',
  shortDescription: 'Calcula tus días de vacaciones de ley, el pago correspondiente y tu prima vacacional neta después de impuestos.',
  category: 'Nómina y LFT',
  categorySlug: 'nomina',
  slug: 'calculadora-vacaciones-prima',
  seo: {
    metaTitle: 'Calculadora de Vacaciones Dignas y Prima Vacacional 2026',
    metaDescription: 'Calcula tus días de vacaciones según la ley de Vacaciones Dignas en México, el sueldo por los días disfrutados, y tu prima vacacional exenta de ISR.',
    keywords: ['calculadora vacaciones', 'prima vacacional', 'vacaciones dignas mexico', 'dias de vacaciones lft', 'prima vacacional exenta'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_mensual',
      label: 'Sueldo Mensual Bruto ($)',
      type: 'number',
      defaultValue: 16000,
      placeholder: 'Ingresa tu salario mensual bruto',
      suffix: 'MXN'
    },
    {
      id: 'antiguedad',
      label: 'Años de servicio (Antigüedad)',
      type: 'number',
      defaultValue: 1,
      placeholder: 'Ej: 1 año'
    },
    {
      id: 'tasa_prima',
      label: 'Porcentaje de Prima Vacacional (%)',
      type: 'number',
      defaultValue: 25,
      placeholder: 'Mínimo de ley es 25%'
    },
    {
      id: 'dias_tomar',
      label: 'Días de vacaciones a tomar (0 para tomar el año completo de ley)',
      type: 'number',
      defaultValue: 0,
      placeholder: 'Ej: 6 días'
    }
  ],
  calculate: (inputs) => {
    const sueldoMensual = parseFloat(inputs.sueldo_mensual) || 0;
    const years = Math.max(1, parseFloat(inputs.antiguedad) || 1);
    const tasaPrima = parseFloat(inputs.tasa_prima) || 25;
    let diasTomar = parseFloat(inputs.dias_tomar) || 0;

    const diasLeyTotal = getVacationDays(years);
    if (diasTomar <= 0 || diasTomar > diasLeyTotal) {
      diasTomar = diasLeyTotal;
    }

    const sueldoDiario = sueldoMensual / 30;
    const pagoVacaciones = sueldoDiario * diasTomar;
    const primaBruta = pagoVacaciones * (tasaPrima / 100);

    // Exemption limit: 15 UMA (2026 = $113.14 * 15 = $1,697.10 MXN)
    const exentoLimite = 15 * UMA_2026;
    const montoExento = Math.min(primaBruta, exentoLimite);
    const montoGravado = Math.max(0, primaBruta - montoExento);

    // Incremental ISR calculation
    const isrSinPrima = calculateISR(sueldoMensual);
    const isrConPrima = calculateISR(sueldoMensual + montoGravado);
    const isrPrima = Math.max(0, isrConPrima - isrSinPrima);

    const primaNeta = primaBruta - isrPrima;

    const steps = [
      {
        description: `De acuerdo a la Ley de Vacaciones Dignas (Art. 76 LFT), para un empleado con ${years} año(s) de antigüedad corresponden ${diasLeyTotal} días de descanso pagados al año. En esta simulación se toman ${diasTomar} días.`,
        mathFormula: `D\\acute{\\imath}as = ${diasTomar}`
      },
      {
        description: `Se calcula el Salario Diario dividiendo el sueldo mensual bruto entre 30 días base.`,
        mathFormula: `Salario\\ Diario = \\frac{$${sueldoMensual.toFixed(2)}}{30} = $${sueldoDiario.toFixed(2)}`
      },
      {
        description: `Se calcula el pago de sueldo correspondiente a los días de descanso disfrutados.`,
        mathFormula: `Pago\\ Vacaciones = Salario\\ Diario \\times D\\acute{\\imath}as = $${sueldoDiario.toFixed(2)} \\times ${diasTomar} = $${pagoVacaciones.toFixed(2)}`
      },
      {
        description: `Se calcula la Prima Vacacional Bruta aplicando el porcentaje estipulado (${tasaPrima}%, mínimo de ley es 25%).`,
        mathFormula: `Prima\\ Bruta = Pago\\ Vacaciones \\times Tasa = $${pagoVacaciones.toFixed(2)} \\times ${(tasaPrima / 100).toFixed(2)} = $${primaBruta.toFixed(2)}`
      },
      {
        description: `La Prima Vacacional cuenta con una exención de ISR hasta por 15 UMAs (15 × $${UMA_2026.toFixed(2)} = $${exentoLimite.toFixed(2)} MXN en 2026).`,
        mathFormula: `Monto\\ Exento = M\\acute{\\imath}n(Prima,\\ $${exentoLimite.toFixed(2)}) = $${montoExento.toFixed(2)}`
      },
      {
        description: `Se calcula la retención de ISR estimada mediante el procedimiento incremental sobre el excedente gravado ($${montoGravado.toFixed(2)}).`,
        mathFormula: `ISR\\ Retenido = $${isrPrima.toFixed(2)}`
      },
      {
        description: `Se resta el ISR determinado de la Prima Bruta para obtener la Prima Vacacional Neta libre a depositar.`,
        mathFormula: `Prima\\ Neta = Prima\\ Bruta - ISR = $${primaBruta.toFixed(2)} - $${isrPrima.toFixed(2)} = $${primaNeta.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Días de Vacaciones por Ley', value: diasLeyTotal, formatted: `${diasLeyTotal} días` },
        { label: 'Días Calculados en este Período', value: diasTomar, formatted: `${diasTomar} días` },
        { label: 'Pago de Sueldo de Vacaciones', value: pagoVacaciones, formatted: `$${pagoVacaciones.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Prima Vacacional Bruta', value: primaBruta, formatted: `$${primaBruta.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Exento de ISR (15 UMAs 2026)', value: montoExento, formatted: `$${montoExento.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención de ISR sobre Prima', value: isrPrima, formatted: `$${isrPrima.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Prima Vacacional Neta a Recibir (Libre)', value: primaNeta, formatted: `$${primaNeta.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión los días de vacaciones por ley bajo el decreto de Vacaciones Dignas en México, el salario ordinario correspondiente a los días disfrutados, la prima vacacional bruta (mínimo legal del 25%) y la prima neta libre de impuestos tras aplicar la exención fiscal de 15 UMAs para ISR conforme al Artículo 93 Fracc. XIV de la LISR.',
    whoShouldUse: [
      'Trabajadores formales en nómina que van a tomar sus vacaciones y desean saber cuánto recibirán de prima vacacional neta',
      'Departamentos de Recursos Humanos y nóminas que calculan dispersiones de prima vacacional periódicas o en aniversarios',
      'Empleados que auditan el pago proporcional de vacaciones y prima vacacional dentro de su finiquito o liquidación',
      'Trabajadores que desean verificar la tabla oficial de días de descanso que les corresponde según sus años de antigüedad acumulada'
    ],
    howItWorks: 'Obtiene el salario diario dividiendo el sueldo mensual bruto entre 30 días. Determina los días de descanso anuales según la tabla reformada de Vacaciones Dignas (LFT Art. 76). Multiplica el salario diario por los días tomados para calcular el sueldo de vacaciones y aplica el porcentaje contractual de prima (mínimo 25%). Aplica la exención fiscal de 15 UMAs ($1,697.10 MXN en 2026) y calcula la retención de ISR sobre el remanente gravado con el método incremental del Art. 96 de la LISR.',
    explanation: 'La prima vacacional es una prestación laboral obligatoria consagrada en el Artículo 80 de la Ley Federal del Trabajo. Su finalidad es otorgar un ingreso extraordinario en dinero para que el trabajador disfrute plenamente de su descanso anual. Tras la entrada en vigor de la reforma de "Vacaciones Dignas", el piso mínimo legal de descanso aumentó a 12 días laborables a partir del primer año de servicios, incrementando dos días por cada año subsecuente hasta llegar a 20 días en el quinto año. La prima vacacional legal no puede ser inferior al 25% sobre los salarios devengados durante el periodo de vacaciones. Fiscalmente, goza de una exención de hasta 15 Unidades de Medida y Actualización (UMA).',
    formula: '1. Salario Diario = Sueldo Mensual Bruto / 30\n2. Días de Vacaciones = Conforme a tabla LFT Art. 76 (1 año = 12 días, 2 años = 14 días...)\n3. Pago de Vacaciones = Salario Diario * Días de Vacaciones a Tomar\n4. Prima Vacacional Bruta = Pago de Vacaciones * ( Porcentaje Prima / 100 )\n5. Límite Exento de ISR = 15 * Valor Diario de la UMA Vigente ($113.14 MXN en 2026 = $1,697.10 MXN)\n6. Monto Gravado = Max(0, Prima Vacacional Bruta - Límite Exento)\n7. ISR Retenido = ISR(Sueldo Mensual + Monto Gravado) - ISR(Sueldo Mensual)\n8. Prima Vacacional Neta = Prima Vacacional Bruta - ISR Retenido',
    example: 'Trabajador con sueldo bruto mensual de $16,000.00 MXN, 1 año de antigüedad y 25% de prima legal:\n• Salario Diario: $16,000.00 ÷ 30 = $533.33 MXN\n• Días de vacaciones por ley (1 año): 12 días laborables\n• Sueldo de vacaciones: $533.33 × 12 = $6,400.00 MXN\n• Prima Vacacional Bruta (25%): $6,400.00 × 0.25 = $1,600.00 MXN\n• Exención fiscal (15 UMAs 2026 = 15 × $113.14): $1,697.10 MXN\n• Monto Gravable: $0.00 MXN (la prima de $1,600.00 es menor que el tope exento de $1,697.10)\n• ISR a retener: $0.00 MXN\n• Prima Vacacional Neta Libre a depositar: $1,600.00 MXN',
    legislation: 'Ley Federal del Trabajo (LFT), Artículos 76 (Derecho al periodo anual de vacaciones pagadas, reforma Vacaciones Dignas), 78 (Disfrute continuo de al menos 12 días), 79 (Prohibición de compensación en dinero) y 80 (Prima vacacional no menor al 25%); Ley del Impuesto sobre la Renta (LISR), Artículo 93, Fracción XIV (Exención de 15 UMAs); e INEGI (Valor oficial de la UMA).',
    tips: [
      'Con la reforma de Vacaciones Dignas, los 12 días del primer año deben disfrutarse en forma continua, salvo que el trabajador y el patrón pacten voluntariamente distribuirlos en fracciones.',
      'Las vacaciones deben concederse dentro de los 6 meses siguientes al cumplimiento del año de servicios; el derecho a reclamarlas prescribe a los 18 meses (6 meses de gracia + 1 año legal del Art. 516 LFT).',
      'Si tu contrato individual o colectivo contempla una prima superior a la legal (ej. 30%, 50% o 100%), ingresa ese porcentaje en el calculador para obtener la proyección exacta de retención.',
      'La prima vacacional nunca puede pagarse en especie, vales ni mercancía; es un pago obligatorio en efectivo.'
    ],
    assumptions: [
      'El salario mensual ingresado es un sueldo ordinario fijo sin comisiones variables.',
      'Se aplica el valor de la UMA oficial para 2026 ($113.14 MXN diarios) para determinar el tope exento de 15 UMAs ($1,697.10 MXN).',
      'La retención de ISR se calcula mediante el procedimiento incremental sobre la tarifa mensual del Artículo 96 de la LISR.'
    ],
    limitations: [
      'No calcula compensaciones extraordinarias por contratos colectivos con primas por encima del tope contractual fijado por empresas privadas.',
      'No aplica a prestadores de servicios por honorarios independientes ni a contratos civiles o mercantiles sin subordinación laboral.',
      'Las vacaciones acumuladas no pueden sustituirse por remuneración económica mientras el vínculo de trabajo subsista (Art. 79 LFT); solo se compensan en dinero si la relación laboral se extingue.'
    ],
    faqs: [
      {
        question: '¿Cuántos días de vacaciones me tocan por año según la ley de Vacaciones Dignas?',
        answer: 'Desde la reforma en vigor: Año 1: 12 días; Año 2: 14 días; Año 3: 16 días; Año 4: 18 días; Año 5: 20 días. A partir del sexto año, aumenta 2 días por cada bloque de 5 años trabajados (de 6 a 10 años corresponden 22 días; de 11 a 15 años corresponden 24 días; etc.).'
      },
      {
        question: '¿Cuándo deben pagarme la prima vacacional?',
        answer: 'Por regla general y mandato del Artículo 81 de la LFT, la prima vacacional debe liquidarse en la fecha en que el trabajador inicia el disfrute de sus días de vacaciones. No obstante, por usos y costumbres muchas empresas la abonan automáticamente al cumplir el aniversario laboral.'
      },
      {
        question: '¿La prima vacacional paga impuestos (ISR)?',
        answer: 'Sí, pero solo por el monto que exceda las 15 Unidades de Medida y Actualización (UMA). Para el ejercicio 2026, los primeros $1,697.10 MXN están 100% exentos de ISR. Si tu prima es de $2,500.00 MXN, solo pagarás ISR sobre el excedente de $802.90 MXN.'
      },
      {
        question: '¿Si no tomo mis vacaciones en el año, el patrón me las puede pagar con dinero?',
        answer: 'No. El Artículo 79 de la Ley Federal del Trabajo prohíbe tajantemente compensar las vacaciones con una remuneración económica mientras la relación laboral se mantenga vigente. Las vacaciones deben disfrutarse en días de descanso efectivos. La única excepción ocurre al terminar el contrato de trabajo (renuncia o despido), en cuyo caso se pagan los días no gozados y la prima proporcional dentro del finiquito.'
      }
    ],
    sources: [
      {
        name: 'PROFEDET — Procuraduría Federal de la Defensa del Trabajo',
        url: 'https://www.gob.mx/profedet',
        description: 'Guía oficial de derechos sobre vacaciones dignas y prima vacacional en México.'
      },
      {
        name: 'Cámara de Diputados — Ley Federal del Trabajo Arts. 76-81',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto legal reformado sobre vacaciones dignas y cálculo de prima vacacional.'
      },
      {
        name: 'INEGI — Valor Oficial de la UMA',
        url: 'https://www.inegi.org.mx',
        description: 'Indicadores oficiales para el cálculo de topes y exenciones tributarias de la Ley del ISR.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-salario-neto-bruto',
      'nomina/calculadora-aguinaldo',
      'nomina/calculadora-finiquito-liquidacion'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador interactivo de carácter didáctico e informativo. Los importes netos exactos y retenciones fiscales pueden variar según deducciones patronales específicas en tu comprobante de nómina (CFDI).'
  },
  translations: {
    en: {
      title: 'Vacation Days and Vacation Bonus Calculator',
      shortDescription: 'Calculate your statutory vacation days under Mexico\'s Vacaciones Dignas law, vacation pay, and net vacation bonus with ISR exemption.',
      category: 'Payroll & Labor',
      seo: {
        metaTitle: 'Mexico Vacation Days & Bonus Calculator 2026 - LFT',
        metaDescription: 'Calculate your statutory vacation days in Mexico (Vacaciones Dignas), vacation salary, and net vacation bonus after SAT ISR exemption (15 UMAs).',
        keywords: ['mexico vacation bonus calculator', 'prima vacacional', 'vacaciones dignas mexico', 'mexico labor law vacation', 'mexico vacation pay']
      },
      content: {
        whatItDoes: 'Accurately calculates statutory vacation days under Mexico\'s Vacaciones Dignas decree, ordinary vacation pay for days taken, gross vacation bonus (minimum 25%), and net bonus after applying the 15 UMA income tax exemption under Article 93 of Mexico\'s Income Tax Law.',
        whoShouldUse: [
          'Formal payroll employees in Mexico taking vacation and needing to estimate their net vacation bonus payout',
          'Human Resources and payroll teams determining vacation accruals and disbursements',
          'Workers verifying vacation and bonus amounts in severance or resignation settlement receipts (finiquito)',
          'Employees reviewing their statutory entitlement based on continuous years of service'
        ],
        howItWorks: 'Divides gross monthly salary by 30 days to compute daily salary. Applies the reformed Vacaciones Dignas table (LFT Art. 76) to determine entitlement. Multiplies daily wage by days taken and applies the bonus percentage (minimum 25%). Applies the 15 UMA tax exemption ($1,697.10 MXN in 2026) and calculates incremental ISR withholding on the remaining taxable balance.',
        explanation: 'The vacation bonus (prima vacacional) is a mandatory employee entitlement under Article 80 of Mexico\'s Federal Labor Law (LFT). It provides additional cash to ensure workers can enjoy their annual rest. Under the "Vacaciones Dignas" reform, first-year vacation leave starts at 12 working days, increasing by 2 days each subsequent year up to 20 days in year five. The statutory bonus cannot be less than 25% of wages earned during the vacation period, with up to 15 UMAs exempt from income tax (ISR).',
        formula: '1. Daily Salary = Gross Monthly Salary / 30\n2. Statutory Days = Per LFT Art. 76 (Year 1 = 12 days, Year 2 = 14 days, etc.)\n3. Vacation Pay = Daily Salary * Vacation Days Taken\n4. Gross Bonus = Vacation Pay * ( Bonus Rate / 100 )\n5. ISR Exemption Limit = 15 * Official Daily UMA ($113.14 MXN in 2026 = $1,697.10 MXN)\n6. Taxable Amount = Max(0, Gross Bonus - Exemption Limit)\n7. ISR Withholding = Incremental tax on taxable bonus under LISR Art. 96\n8. Net Vacation Bonus = Gross Bonus - ISR Withholding',
        example: 'Employee with $16,000.00 MXN gross monthly salary, 1 year of service, and 25% statutory bonus:\n• Daily Salary: $16,000.00 ÷ 30 = $533.33 MXN\n• Statutory vacation days (Year 1): 12 working days\n• Vacation pay: $533.33 × 12 = $6,400.00 MXN\n• Gross Vacation Bonus (25%): $6,400.00 × 0.25 = $1,600.00 MXN\n• Tax Exemption (15 UMAs 2026 = 15 × $113.14): $1,697.10 MXN\n• Taxable Amount: $0.00 MXN (gross bonus of $1,600.00 is below the $1,697.10 cap)\n• ISR Withholding: $0.00 MXN\n• Net Vacation Bonus Received: $1,600.00 MXN',
        legislation: 'Mexican Federal Labor Law (LFT), Articles 76 (Vacaciones Dignas entitlement), 78 (Continuous 12-day rest period), 79 (Prohibition of cash payout in lieu of time off) and 80 (25% minimum bonus); and Mexican Income Tax Law (LISR), Article 93, Fraction XIV (15 UMA exemption).',
        tips: [
          'Under the Vacaciones Dignas decree, the initial 12 days must be taken continuously unless mutually agreed otherwise in writing.',
          'Vacations must be granted within 6 months following each work anniversary; the legal claim expires 18 months from that anniversary (LFT Art. 516).',
          'If your employment contract specifies a higher bonus rate (e.g. 30%, 50%, or 100%), enter that custom percentage for an accurate simulation.',
          'Vacation bonuses must be disbursed in legal currency, never in gift vouchers or merchandise.'
        ],
        assumptions: [
          'Calculations assume a standard fixed monthly salary without variable sales commissions.',
          'Applies the official 2026 UMA value ($113.14 MXN daily) for the 15 UMA statutory exemption ($1,697.10 MXN).',
          'ISR tax withholding follows the incremental procedure per Article 96 of Mexico\'s Income Tax Law.'
        ],
        limitations: [
          'Does not account for non-standard collective bargaining stipulations exceeding standard statutory frameworks.',
          'Does not apply to independent contractors or professional fee arrangements without an employment relationship.',
          'Active workers cannot sell unused vacation days for cash; unused days may only be liquidated upon termination (resignation or dismissal).'
        ],
        faqs: [
          {
            question: 'How many vacation days do employees receive under Mexico\'s Vacaciones Dignas law?',
            answer: 'Under the reformed law: Year 1: 12 days; Year 2: 14 days; Year 3: 16 days; Year 4: 18 days; Year 5: 20 days. Starting in year 6, 2 additional days are granted for each 5-year block of service (years 6–10: 22 days; years 11–15: 24 days; etc.).'
          },
          {
            question: 'When should the vacation bonus be paid?',
            answer: 'Per Article 81 of the LFT, the vacation bonus must be paid when the worker begins their annual leave. Many employers also disburse it automatically on the employee\'s work anniversary date.'
          },
          {
            question: 'Is the Mexican vacation bonus subject to income tax (ISR)?',
            answer: 'Yes, but only on amounts exceeding 15 UMAs. In 2026, the first $1,697.10 MXN is 100% exempt from ISR. Tax is withheld only on the amount exceeding this cap.'
          },
          {
            question: 'Can an employer pay cash instead of granting actual vacation days?',
            answer: 'No. Article 79 of the LFT strictly forbids compensating vacation leave with cash while the employment contract remains active. The only exception is upon employment termination, where accrued untaken days and proportional bonus are paid as part of the settlement.'
          }
        ],
        sources: [
          {
            name: 'PROFEDET — Federal Labor Defense Agency (Mexico)',
            url: 'https://www.gob.mx/profedet',
            description: 'Official worker rights portal explaining vacation leave and bonus calculation.'
          },
          {
            name: 'Chamber of Deputies — Federal Labor Law Arts. 76-81',
            url: 'https://www.diputados.gob.mx',
            description: 'Statutory legal text governing annual vacation entitlement and bonus percentages.'
          },
          {
            name: 'INEGI — Official UMA Value',
            url: 'https://www.inegi.org.mx',
            description: 'Official economic index for statutory tax exemption thresholds in Mexico.'
          }
        ],
        relatedCalculators: [
          'nomina/calculadora-salario-neto-bruto',
          'nomina/calculadora-aguinaldo',
          'nomina/calculadora-finiquito-liquidacion'
        ],
        lastUpdated: 'Updated for fiscal year 2026',
        disclaimer: 'This calculator is an interactive educational simulation tool. Final net pay and statutory withholdings must be confirmed on official payroll receipts (CFDI) issued by the employer.'
      }
    }
  }
};
