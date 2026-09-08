import { CalculatorConfig } from '../../types/calculator';

export const isrPmCalculator: CalculatorConfig = {
  id: 'calculo-isr-pm',
  title: 'Calculadora de ISR Persona Moral',
  shortDescription: 'Calcula los pagos provisionales mensuales de ISR para personas morales bajo el régimen general usando el coeficiente de utilidad.',
  category: 'Impuestos Federales',
  categorySlug: 'sat',
  slug: 'calculadora-isr-pm',
  seo: {
    metaTitle: 'Calculadora de ISR Personas Morales 2026 - Pagos Provisionales',
    metaDescription: 'Determina los pagos provisionales mensuales del SAT para Personas Morales en el Régimen General. Usa el coeficiente de utilidad y aplica el 30% de ISR.',
    keywords: ['calculadora isr persona moral', 'pagos provisionales sat', 'coeficiente de utilidad', 'isr empresas mexico', 'regimen general personas morales'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ingresos_periodo',
      label: 'Ingresos Nominales del Periodo Acumulados ($)',
      type: 'number',
      defaultValue: 250000,
      placeholder: 'Ingresa los ingresos del mes o acumulados en el año',
      suffix: 'MXN'
    },
    {
      id: 'coeficiente',
      label: 'Coeficiente de Utilidad (del ejercicio anterior)',
      type: 'number',
      defaultValue: 0.1524,
      placeholder: 'Ej: 0.1524'
    },
    {
      id: 'pagos_previos',
      label: 'Pagos Provisionales Realizados Anteriormente ($)',
      type: 'number',
      defaultValue: 15000,
      placeholder: 'Pagos acumulados ya enterados al SAT',
      suffix: 'MXN'
    },
    {
      id: 'retenciones_banco',
      label: 'Retenciones de ISR por Instituciones Bancarias ($)',
      type: 'number',
      defaultValue: 500,
      placeholder: 'Ej: retención sobre intereses',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const ingresos = parseFloat(inputs.ingresos_periodo) || 0;
    const coeficiente = parseFloat(inputs.coeficiente) || 0;
    const pagosPrevios = parseFloat(inputs.pagos_previos) || 0;
    const retenciones = parseFloat(inputs.retenciones_banco) || 0;

    // 1. Calculate Estimated Profit (Utilidad Fiscal Estimada)
    const utilidadEstimada = ingresos * coeficiente;

    // 2. Apply flat corporate rate (30% in Mexico)
    const rate = 0.30;
    const isrCausado = utilidadEstimada * rate;

    // 3. Deduct previous payments and withholdings
    const isrNeto = Math.max(0, isrCausado - pagosPrevios - retenciones);

    const steps = [
      {
        description: `Se calcula la Utilidad Fiscal Estimada del periodo multiplicando los Ingresos Nominales Acumulados por el Coeficiente de Utilidad aprobado.`,
        mathFormula: `Utilidad\\ Estimada = Ingresos \\times Coeficiente = $${ingresos.toFixed(2)} \\times ${coeficiente.toFixed(4)} = $${utilidadEstimada.toFixed(2)}`
      },
      {
        description: `Se aplica la tasa impositiva fija del 30% establecida en el Artículo 9 de la LISR para Personas Morales sobre la Utilidad Estimada.`,
        mathFormula: `ISR\\ Causado = Utilidad\\ Estimada \\times 30\\% = $${utilidadEstimada.toFixed(2)} \\times 0.30 = $${isrCausado.toFixed(2)}`
      },
      {
        description: `Se restan los pagos provisionales de ISR acreditados con anterioridad ($${pagosPrevios.toFixed(2)}) y las retenciones bancarias ($${retenciones.toFixed(2)}).`,
        mathFormula: `ISR\\ Neto = ISR\\ Causado - Pagos\\ Previos - Retenciones = $${isrCausado.toFixed(2)} - $${pagosPrevios.toFixed(2)} - $${retenciones.toFixed(2)} = $${isrNeto.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Utilidad Fiscal Estimada del Periodo', value: utilidadEstimada, formatted: `$${utilidadEstimada.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Tasa Corporativa LISR', value: 30, formatted: '30.00 %' },
        { label: 'ISR Causado Acumulado', value: isrCausado, formatted: `$${isrCausado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Pagos Provisionales Previos Acreditables', value: pagosPrevios, formatted: `$${pagosPrevios.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retenciones Bancarias Acreditables', value: retenciones, formatted: `$${retenciones.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'ISR Neto Provisional a Pagar', value: isrNeto, formatted: `$${isrNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión técnica los pagos provisionales mensuales a cuenta del Impuesto sobre la Renta (ISR) para Personas Morales que tributan en el Régimen General de Ley en México (Título II LISR), aplicando el Coeficiente de Utilidad oficial, la tasa corporativa fija del 30% y el acreditamiento de pagos provisionales anteriores y retenciones bancarias.',
    whoShouldUse: [
      'Directores financieros, contralores y contadores generales de Personas Morales del Régimen General en México',
      'Empresas y sociedades mercantiles (SA de CV, S de RL de CV, SAS) que determinan sus pagos a cuenta del ISR mensual',
      'Fiscalistas y auditores que proyectan el flujo de caja tributario corporativo para el ejercicio fiscal 2026',
      'Socios y administradores de empresas que desean verificar el impacto del Coeficiente de Utilidad en la liquidez mensual'
    ],
    howItWorks: 'Parte de los ingresos nominales acumulados desde el primer día del ejercicio fiscal hasta el último día del mes al que corresponde el pago. Multiplica dichos ingresos por el Coeficiente de Utilidad determinado en la última declaración anual para calcular la utilidad fiscal estimada. A esta base le aplica la tasa corporativa fija del 30% (Art. 9 LISR), determinando el impuesto causado acumulado, al cual le resta los pagos provisionales enterados en los meses previos del mismo ejercicio y las retenciones bancarias de ISR acumuladas.',
    explanation: 'A diferencia de las personas físicas o de las empresas en RESICO que tributan sobre flujo de efectivo, las Personas Morales en el Régimen General de la Ley del ISR en México no pagan sus anticipos provisionales sobre la utilidad real de cada mes. La ley presume un margen de rentabilidad constante a lo largo del año basado en el Coeficiente de Utilidad del ejercicio anterior (calculado dividiendo la utilidad fiscal entre los ingresos nominales del año precedente). Esto significa que las compras, sueldos y gastos corrientes no se restan mes a mes para calcular el pago provisional de ISR; las deducciones autorizadas se integran y aplican formalmente al momento de presentar la Declaración Anual en marzo del año siguiente.',
    formula: '1. Utilidad Fiscal Estimada = Ingresos Nominales Acumulados * Coeficiente de Utilidad\n2. ISR Causado Acumulado = Utilidad Fiscal Estimada * 30% (Tasa Art. 9 LISR)\n3. ISR Provisional a Enterar = Max(0, ISR Causado Acumulado - Pagos Provisionales Previos del Ejercicio - Retenciones Bancarias Acumuladas)',
    example: 'Sociedad Mercantil con ingresos nominales acumulados al mes de junio de $1,800,000.00 MXN, con un Coeficiente de Utilidad de 0.1850 derivado de su ejercicio 2025. Ha realizado pagos provisionales previos de enero a mayo por $82,000.00 MXN y retenciones bancarias de ISR por $1,200.00 MXN:\n• Utilidad Fiscal Estimada Acumulada: $1,800,000.00 × 0.1850 = $333,000.00 MXN\n• ISR Causado Acumulado (30%): $333,000.00 × 0.30 = $99,900.00 MXN\n• Pagos Provisionales Previos Acreditables: $82,000.00 MXN\n• Retenciones Bancarias Acreditables: $1,200.00 MXN\n• Total Créditos Fiscales: $82,000.00 + $1,200.00 = $83,200.00 MXN\n• ISR Neto a Pagar en la Declaración Mensual de Junio: $99,900.00 - $83,200.00 = $16,700.00 MXN',
    howToInterpret: 'El desglose de resultados indica tres variables esenciales para la tesorería corporativa:\n1. Utilidad Fiscal Estimada: Es la ganancia presuntiva del periodo que la autoridad asume que generaste, sin considerar tus gastos o compras del mes.\n2. Tasa Corporativa Plana (30%): Aplica de manera uniforme a toda Persona Moral del Título II en México.\n3. Saldo Neto a Enterar: Es el monto líquido a transferir mediante la línea de captura del portal del SAT antes del día 17 del mes posterior (o días adicionales según el sexto dígito del RFC conforme al Decreto que compila beneficios fiscales).',
    legislation: 'Ley del Impuesto sobre la Renta (LISR): Título II, Artículo 9 (Tasa corporativa del 30%) y Artículo 14 (Mecánica y cálculo de pagos provisionales mensuales de Personas Morales); y Código Fiscal de la Federación (CFF), Artículo 20 (Plazos de causación y pago).',
    tips: [
      'El Coeficiente de Utilidad se actualiza a partir del pago provisional de marzo (que se presenta en abril), momento en el cual entra en vigor el coeficiente recién determinado en la Declaración Anual del ejercicio anterior.',
      'Si tu empresa estima que el coeficiente generará pagos provisionales excesivos en comparación con la utilidad real del ejercicio, puedes solicitar autorización al SAT para disminuir los pagos provisionales a partir del segundo semestre (julio en adelante), de acuerdo con el Artículo 14 de la LISR.',
      'No confundas los ingresos nominales con los ingresos totales contables: no se acumula el ajuste anual por inflación acumulable en los pagos provisionales mensuales (este se determina únicamente en la declaración anual).'
    ],
    assumptions: [
      'Aplica a Personas Morales residentes en México que tributan bajo el Título II (Régimen General de Ley).',
      'Los ingresos capturados son acumulados desde enero hasta el mes de cálculo.',
      'El Coeficiente de Utilidad proviene de la última declaración anual o del ejercicio más reciente con utilidad dentro de los últimos 5 años.'
    ],
    limitations: [
      'No aplica para personas morales en RESICO (que tributan sobre flujo de efectivo y deducen compras/gastos mensuales).',
      'No aplica para personas morales con fines no lucrativos (Título III LISR).',
      'No deduce pérdidas fiscales de ejercicios anteriores pendientes de amortizar a menos que se apliquen en el renglón correspondiente del formato oficial del SAT.'
    ],
    faqs: [
      {
        question: '¿Qué es el Coeficiente de Utilidad y cómo se obtiene?',
        answer: 'Es un factor numérico decimal que representa el porcentaje de margen de utilidad neta fiscal obtenido por la empresa en el ejercicio inmediato anterior. Se calcula dividiendo la Utilidad Fiscal entre los Ingresos Nominales reportados en la Declaración Anual.'
      },
      {
        question: '¿Qué sucede si la empresa tuvo pérdidas el año anterior y no tiene coeficiente?',
        answer: 'Conforme al Artículo 14 de la LISR, se deberá aplicar el coeficiente de utilidad del ejercicio más reciente dentro de los últimos cinco años en que se haya obtenido utilidad fiscal. Si no existe utilidad en ninguno de esos 5 años, el coeficiente es cero y no se causa pago provisional de ISR.'
      },
      {
        question: '¿Las empresas en Régimen General pueden deducir gastos mes a mes en sus provisionales?',
        answer: 'No. En el Régimen General de Personas Morales, las deducciones autorizadas (compras, nómina, gastos operativos) se deducen únicamente en la Declaración Anual. Los pagos mensuales son anticipos calculados con base en el coeficiente presuntivo de utilidad.'
      }
    ],
    sources: [
      {
        name: 'Servicio de Administración Tributaria (SAT) — Pagos Provisionales Personas Morales',
        url: 'https://www.sat.gob.mx',
        description: 'Servicio oficial del SAT para la presentación y pago de declaraciones provisionales de ISR corporativo.'
      },
      {
        name: 'Cámara de Diputados — Ley del Impuesto sobre la Renta (LISR)',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto legal vigente de los Artículos 9 y 14 de la LISR aplicables a Personas Morales.'
      }
    ],
    relatedCalculators: [
      'sat/calculadora-iva',
      'sat/calculadora-isr-pf',
      'sat/calculadora-resico-pf'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador matemático basado en el Artículo 14 de la LISR. La determinación definitiva de pagos provisionales de Personas Morales debe formalizarse mediante el servicio de declaraciones y pagos del portal del SAT.'
  },
  translations: {
    en: {
      title: 'Corporate Income Tax Calculator Mexico (ISR Persona Moral)',
      shortDescription: 'Calculate monthly estimated corporate income tax (ISR) provisional payments under Mexico\'s General Corporate Regime using the Profit Coefficient.',
      category: 'Federal Taxes (SAT)',
      inputs: [
        {
          id: 'ingresos_periodo',
          label: 'Cumulative Nominal Revenue for Period ($)',
          placeholder: 'Cumulative gross revenue from Jan 1st'
        },
        {
          id: 'coeficiente',
          label: 'Profit Coefficient (from previous tax return)',
          placeholder: 'e.g. 0.1524'
        },
        {
          id: 'pagos_previos',
          label: 'Cumulative Previous Provisional Payments ($)',
          placeholder: 'Prior months payments already credited'
        },
        {
          id: 'retenciones_banco',
          label: 'Cumulative Bank Tax Withholdings ($)',
          placeholder: 'Withholdings on interest'
        }
      ],
      content: {
        whatItDoes: 'Calculates monthly estimated provisional income tax (ISR) payments for corporations in Mexico under the General Corporate Tax Regime (Title II LISR), applying the statutory Profit Coefficient, the 30% flat corporate tax rate, and crediting prior payments and bank withholdings.',
        whoShouldUse: [
          'Chief financial officers (CFOs), controllers, and chief accountants of Mexican corporations',
          'Corporate entities (S.A. de C.V., S. de R.L. de C.V., S.A.S.) computing monthly advance tax obligations',
          'Corporate tax advisors and auditors projecting cash flow requirements for the 2026 fiscal year',
          'Company executives reviewing the operational impact of the Profit Coefficient on working capital'
        ],
        howItWorks: 'Takes cumulative nominal revenue from the first day of the fiscal year through the end of the tax month. Multiplies this cumulative revenue by the Profit Coefficient from the previous annual tax return to establish estimated taxable income. Applies the flat 30% corporate rate (LISR Art. 9) to determine cumulative gross ISR, and subtracts previous provisional payments and cumulative bank interest withholdings.',
        explanation: 'Unlike individuals or companies in the RESICO framework who file on a cash-flow basis, Mexican corporations under Title II of the Income Tax Law do not make provisional advance tax payments based on monthly net profit. The law assumes a steady profitability margin across the tax year via the Profit Coefficient (calculated by dividing fiscal profit by nominal revenue from the preceding year). Operating expenses, payroll, and cost of goods sold are not subtracted month-by-month; allowable deductions are reconciled formally in the Annual Tax Return filed in March.',
        formula: '1. Estimated Fiscal Profit = Cumulative Nominal Revenue * Profit Coefficient\n2. Cumulative Gross ISR = Estimated Fiscal Profit * 30% (Corporate Rate Art. 9 LISR)\n3. Net Provisional ISR Payable = Max(0, Cumulative Gross ISR - Prior Provisional Payments - Cumulative Bank Withholdings)',
        example: 'Corporation with $1,800,000.00 MXN cumulative revenue through June, and a Profit Coefficient of 0.1850 derived from 2025. Has paid $82,000.00 MXN in prior provisional payments and suffered $1,200.00 MXN in bank interest withholdings:\n• Estimated Cumulative Profit: $1,800,000.00 × 0.1850 = $333,000.00 MXN\n• Gross Cumulative ISR (30%): $333,000.00 × 0.30 = $99,900.00 MXN\n• Allowable Prior Provisional Credits: $82,000.00 MXN\n• Allowable Bank Withholding Credits: $1,200.00 MXN\n• Total Tax Credits: $82,000.00 + $1,200.00 = $83,200.00 MXN\n• Net ISR Payable on June Tax Return: $99,900.00 - $83,200.00 = $16,700.00 MXN',
        howToInterpret: 'The outputs provide three key corporate metrics:\n1. Estimated Fiscal Profit: The statutory presumed profit generated year-to-date, independent of current-month expenses.\n2. Flat Corporate Rate (30%): The uniform tax rate applicable to all Title II corporations in Mexico.\n3. Net Balance Payable: The actual cash amount to be transferred using the SAT banking capture line before the 17th of the following month.',
        legislation: 'Mexican Income Tax Law (LISR), Title II, Article 9 (30% corporate rate) and Article 14 (Monthly corporate provisional payment procedure); and Federal Tax Code (CFF), Article 20.',
        tips: [
          'The Profit Coefficient is updated starting with the March provisional return (filed in April), when the new coefficient calculated on the annual tax return takes legal effect.',
          'If a corporation projects that its coefficient will result in excessive payments compared to actual annual profitability, it may request SAT authorization to reduce provisional payments starting in the second semester (July onwards) per Article 14 LISR.',
          'Do not include inflationary adjustments in monthly nominal revenue, as they are computed solely on the annual return.'
        ],
        assumptions: [
          'Applies to corporate tax entities resident in Mexico under Title II (General Corporate Regime).',
          'Revenue entries are cumulative from January 1st through the selected month.',
          'The Profit Coefficient originates from the most recent tax return with fiscal profit within the last 5 years.'
        ],
        limitations: [
          'Does not apply to corporations in RESICO (which pay tax on cash flow and deduct expenses monthly).',
          'Does not apply to non-profit corporate entities (Title III LISR).',
          'Does not automatically amortize prior-year tax loss carryforwards unless entered into the official SAT tax portal form.'
        ],
        faqs: [
          {
            question: 'What is the Profit Coefficient and how is it calculated?',
            answer: 'It is a decimal factor representing the net fiscal profit margin earned by the company in the preceding tax year. It is determined by dividing Taxable Fiscal Profit by Nominal Revenue on the annual return.'
          },
          {
            question: 'What happens if the corporation had tax losses in the preceding year?',
            answer: 'Under Article 14 of the LISR, the company must use the profit coefficient from the most recent year within the last five years in which it recorded fiscal profit. If no profit was recorded in any of those 5 years, the coefficient is zero and no provisional ISR is payable.'
          }
        ],
        sources: [
          {
            name: 'SAT — Mexican Tax Administration Service',
            url: 'https://www.sat.gob.mx',
            description: 'Official corporate tax filing and payment portal.'
          },
          {
            name: 'Mexican House of Representatives — Income Tax Law',
            url: 'https://www.diputados.gob.mx',
            description: 'Statutory text of Articles 9 and 14 of the LISR.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational simulation based on Article 14 LISR. Official corporate tax filings must be finalized via the SAT electronic filing portal.'
      }
    }
  }
};
