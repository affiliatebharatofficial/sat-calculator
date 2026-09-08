import { CalculatorConfig } from '../../types/calculator';

// Monthly ISR Brackets for 2024/2026 in Mexico
const MONTHLY_BRACKETS = [
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

export const isrPfCalculator: CalculatorConfig = {
  id: 'calculo-isr-pf',
  title: 'Calculadora de ISR Personas Físicas',
  shortDescription: 'Calcula el Impuesto sobre la Renta (ISR) para personas físicas bajo el régimen de actividad profesional, empresarial o arrendamiento.',
  category: 'Impuestos Federales',
  categorySlug: 'sat',
  slug: 'calculadora-isr-pf',
  seo: {
    metaTitle: '🧮 Calculadora de ISR 2026 — Personas Físicas SAT México',
    metaDescription: 'Calcula tu ISR a pagar al SAT de forma mensual o anual gratis. Basado en las tablas de retención de la Ley del Impuesto sobre la Renta 2026.',
    keywords: ['calculadora isr', 'calcular isr personas fisicas', 'isr sat 2026', 'tablas isr mensual', 'isr sobre honorarios'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ingresos',
      label: 'Ingresos Acumulables ($)',
      type: 'number',
      defaultValue: 25000,
      placeholder: 'Ingresa tus ingresos brutos del período',
      suffix: 'MXN'
    },
    {
      id: 'deducciones',
      label: 'Deducciones Autorizadas ($)',
      type: 'number',
      defaultValue: 5000,
      placeholder: 'Ingresa tus gastos deducibles del período',
      suffix: 'MXN'
    },
    {
      id: 'periodo',
      label: 'Período del cálculo',
      type: 'select',
      defaultValue: 'mensual',
      options: [
        { label: 'Mensual', value: 'mensual' },
        { label: 'Anual', value: 'anual' }
      ]
    }
  ],
  calculate: (inputs) => {
    const ingresos = parseFloat(inputs.ingresos) || 0;
    const deducciones = parseFloat(inputs.deducciones) || 0;
    const periodo = inputs.periodo;

    // Base Gravable = Ingresos - Deducciones
    const baseGravable = Math.max(0, ingresos - deducciones);

    // Get correct brackets based on period
    const brackets = periodo === 'anual'
      ? MONTHLY_BRACKETS.map(b => ({
          limitInferior: b.limitInferior * 12,
          cuotaFija: b.cuotaFija * 12,
          tasa: b.tasa
        }))
      : MONTHLY_BRACKETS;

    // Find the correct bracket
    let bracket = brackets[0];
    for (let i = 0; i < brackets.length; i++) {
      if (baseGravable >= brackets[i].limitInferior) {
        bracket = brackets[i];
      } else {
        break;
      }
    }

    const excedente = baseGravable - bracket.limitInferior;
    const impuestoMarginal = excedente * (bracket.tasa / 100);
    const isrRetenido = bracket.cuotaFija + impuestoMarginal;
    const ingresoNeto = ingresos - deducciones - isrRetenido;

    const steps = [
      {
        description: `Se calcula la Base Gravable restando las Deducciones Autorizadas de los Ingresos Acumulables.`,
        mathFormula: `Base\\ Gravable = Ingresos - Deducciones = $${ingresos.toFixed(2)} - $${deducciones.toFixed(2)} = $${baseGravable.toFixed(2)}`
      },
      {
        description: `Se identifica el rango de la tabla de ISR que corresponde a la Base Gravable ($${baseGravable.toFixed(2)}). El límite inferior del rango es $${bracket.limitInferior.toFixed(2)}. Se resta este límite de la base para obtener el Excedente.`,
        mathFormula: `Excedente = Base\\ Gravable - L\\acute{\\imath}mite\\ Inferior = $${baseGravable.toFixed(2)} - $${bracket.limitInferior.toFixed(2)} = $${excedente.toFixed(2)}`
      },
      {
        description: `Se aplica la tasa correspondiente al excedente (${bracket.tasa.toFixed(2)}%) para calcular el Impuesto Marginal.`,
        mathFormula: `Impuesto\\ Marginal = Excedente \\times Tasa = $${excedente.toFixed(2)} \\times ${(bracket.tasa / 100).toFixed(4)} = $${impuestoMarginal.toFixed(2)}`
      },
      {
        description: `Se suma la Cuota Fija del rango ($${bracket.cuotaFija.toFixed(2)}) al Impuesto Marginal para obtener el ISR Causado total.`,
        mathFormula: `ISR\\ Causado = Cuota\\ Fija + Impuesto\\ Marginal = $${bracket.cuotaFija.toFixed(2)} + $${impuestoMarginal.toFixed(2)} = $${isrRetenido.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Base Gravable', value: baseGravable, formatted: `$${baseGravable.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Límite Inferior Aplicado', value: bracket.limitInferior, formatted: `$${bracket.limitInferior.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Excedente sobre Límite', value: excedente, formatted: `$${excedente.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Impuesto Marginal', value: impuestoMarginal, formatted: `$${impuestoMarginal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Cuota Fija de la Tabla', value: bracket.cuotaFija, formatted: `$${bracket.cuotaFija.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'ISR Causado (A Pagar)', value: isrRetenido, formatted: `$${isrRetenido.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true },
        { label: 'Ingreso Neto Estimado', value: ingresoNeto, formatted: `$${ingresoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión el pago provisional mensual del Impuesto sobre la Renta (ISR) para Personas Físicas en México (Régimen de Actividades Empresariales y Servicios Profesionales / Honorarios), aplicando las tablas progresivas oficiales y desglosando base gravable, límite inferior, excedente, cuota fija e impuesto marginal.',
    whoShouldUse: [
      'Personas físicas con Actividad Empresarial (comercio, talleres, manufactura, plataformas)',
      'Profesionistas independientes que cobran por honorarios (médicos, abogados, desarrolladores, arquitectos)',
      'Contadores y auxiliares que validan pagos provisionales mensuales ante el SAT',
      'Contribuyentes que analizan su carga impositiva efectiva frente al régimen RESICO'
    ],
    howItWorks: 'A los ingresos cobrados del mes se les restan las deducciones autorizadas pagadas para obtener la Base Gravable. Dicha base se ubica en el renglón correspondiente de la tarifa oficial de 11 escalones del SAT. Se resta el Límite Inferior para hallar el Excedente, se multiplica por la Tasa Marginal del rango y se suma la Cuota Fija.',
    explanation: 'El Impuesto sobre la Renta (ISR) es el impuesto directo fundamental que grava la utilidad o ganancia neta generada por personas físicas en México. A diferencia de otros gravámenes proporcionales, el ISR para personas físicas opera mediante un esquema progresivo estructurado en 11 tramos tarifarios, con tasas marginales que van desde el 1.92% hasta el 35.00%. A mayor utilidad neta, mayor es la tasa aplicable sobre el excedente del límite inferior.',
    formula: '1. Base Gravable = Ingresos Acumulables Cobrados - Deducciones Autorizadas Pagadas\n2. Excedente = Base Gravable - Límite Inferior del Rango\n3. Impuesto Marginal = Excedente * (Tasa Marginal / 100)\n4. ISR Causado = Cuota Fija del Rango + Impuesto Marginal\n5. Ingreso Neto Estimado = Base Gravable - ISR Causado',
    example: 'Ingresos del mes: $35,000.00 MXN | Gastos deducibles: $10,000.00 MXN\n• Base Gravable: $35,000.00 - $10,000.00 = $25,000.00 MXN\n• Rango aplicable (Anexo 8 RMF):\n  - Límite Inferior: $15,487.72 MXN\n  - Cuota Fija: $1,640.18 MXN\n  - Tasa sobre excedente: 21.36%\n• Cálculo del Excedente: $25,000.00 - $15,487.72 = $9,512.28 MXN\n• Impuesto Marginal: $9,512.28 × 21.36% = $2,031.82 MXN\n• ISR Causado a Pagar: $1,640.18 + $2,031.82 = $3,672.00 MXN (Tasa efectiva sobre utilidad: 14.69%)\n• Utilidad Neta Disponible: $25,000.00 - $3,672.00 = $21,328.00 MXN',
    legislation: 'Ley del Impuesto sobre la Renta (LISR), Título IV (De las Personas Físicas), Capítulo II (De los Ingresos por Actividades Empresariales y Profesionales), Artículos 96, 100, 106, 109; y Anexo 8 de la Resolución Miscelánea Fiscal (RMF) vigente publicada por el SAT en el DOF.',
    tips: [
      'Solicita siempre CFDI con forma de pago bancarizada (tarjeta, transferencia, cheque) para cualquier gasto superior a $2,000 MXN para que sea deducible conforme al Art. 147 de la LISR (o desde $1 en gasolina).',
      'Si emites recibos de honorarios a personas morales, recuerda registrar la retención del 10% de ISR en el comprobante fiscal, la cual se acredita contra el pago provisional mensual.',
      'Lleva un control estricto de los ingresos cobrados efectivamente (flujo de efectivo), ya que en personas físicas el impuesto se causa al momento de percibir el dinero.'
    ],
    assumptions: [
      'Aplica la tarifa mensual provisional de personas físicas con actividades empresariales y profesionales.',
      'Se asume que los ingresos y gastos corresponden a flujo de efectivo efectivamente cobrado y pagado en el periodo.',
      'No incluye retenciones previas de personas morales a menos que el usuario las descuente del impuesto final.'
    ],
    limitations: [
      'No calcula la acumulación progresiva bimestral o trimestral para contribuyentes con pagos provisionales acumulativos anuales.',
      'No contempla estímulos sectoriales específicos (ej. sector primario AGAPES o transportistas).',
      'No calcula las deducciones personales anuales (médicos, colegiaturas, gastos funerarios), las cuales aplican exclusivamente en la Declaración Anual de abril.'
    ],
    faqs: [
      {
        question: '¿Qué diferencia hay entre el ISR provisional mensual y la Declaración Anual?',
        answer: 'Los pagos provisionales mensuales son anticipos a cuenta del impuesto del año. En abril del año siguiente, se presenta la Declaración Anual donde se suman todos los ingresos de enero a diciembre, se aplican las deducciones personales y se restan todos los pagos provisionales realizados. Si pagaste de más, obtienes saldo a favor para devolución.'
      },
      {
        question: '¿Qué gastos son considerados deducciones autorizadas para personas físicas?',
        answer: 'Son aquellos gastos estrictamente indispensables para la actividad económica: renta del local u oficina, papelería, luz, internet, nóminas de trabajadores, cuotas patronales IMSS, honorarios contables y compra de mercancías. Deben contar con CFDI y estar pagados por medios electrónicos si exceden $2,000 MXN.'
      },
      {
        question: '¿Por qué la tasa efectiva de ISR suele ser mucho menor que la tasa marginal?',
        answer: 'Porque el ISR mexicano es escalonado. Si tu tasa marginal es del 21.36%, ese porcentaje solo se aplica al dinero que rebasa el límite inferior de tu escalón ($15,487.72 en el ejemplo), no a la totalidad de tu ingreso. Por ello, la tasa real pagada sobre la ganancia suele ser considerablemente inferior.'
      },
      {
        question: '¿Puedo deducir gastos médicos o colegiaturas en mi pago provisional mensual?',
        answer: 'No. Esos conceptos son "deducciones personales" y por mandato del Artículo 151 de la LISR únicamente pueden restarse en la Declaración Anual de personas físicas en el mes de abril, no en las declaraciones mensuales.'
      }
    ],
    sources: [
      {
        name: 'SAT — Tablas y Tarifas de ISR Vigentes',
        url: 'https://www.sat.gob.mx',
        description: 'Resolución Miscelánea Fiscal y Anexo 8 con las tarifas oficiales de pagos provisionales.'
      },
      {
        name: 'Cámara de Diputados — Ley del Impuesto sobre la Renta',
        url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf',
        description: 'Texto legal íntegro de la LISR que norma el Título IV para personas físicas.'
      }
    ],
    relatedCalculators: [
      'sat/calculadora-iva',
      'nomina/calculadora-salario-neto-bruto',
      'sat/calculadora-resico-pf'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador matemático basado en las tarifas provisionales de la Resolución Miscelánea Fiscal. No constituye una determinación fiscal oficial ni sustituye la declaración mensual en el portal del SAT.'
  },
  translations: {
    en: {
      title: 'Personal Income Tax (ISR) Calculator Mexico',
      shortDescription: 'Calculate monthly or annual Mexican personal income tax (ISR) under business activities, professional services (honorarios), or leasing regimes.',
      category: 'SAT Federal Taxes',
      inputs: [
        {
          id: 'ingresos',
          label: 'Cumulative Gross Income ($)',
          placeholder: 'Enter gross income for the period'
        },
        {
          id: 'deducciones',
          label: 'Authorized Deductions ($)',
          placeholder: 'Enter business expenses for the period'
        },
        {
          id: 'periodo',
          label: 'Calculation Period',
          options: [
            { label: 'Monthly', value: 'mensual' },
            { label: 'Annual', value: 'anual' }
          ]
        }
      ],
      content: {
        whatItDoes: 'Accurately calculates the Mexican personal income tax (ISR) provisional payments for independent professionals (honorarios) and business individuals, applying official progressive 11-tier tax tables under Article 96 & 152 of the LISR.',
        whoShouldUse: [
          'Freelancers and independent contractors billing clients through CFDI invoices',
          'Individuals with business activities (commerce, workshops, services, digital platforms)',
          'Accountants and bookkeepers validating monthly provisional tax filings before SAT submission',
          'Taxpayers analyzing effective tax burden vs. the simplified regime (RESICO)'
        ],
        howItWorks: 'Authorized business expenses are subtracted from collected gross income to compute the Taxable Base. This base is matched against the 11-bracket official statutory tax table. The Lower Limit is subtracted to compute the Excess, multiplied by the Marginal Rate, and added to the Fixed Quota.',
        explanation: 'Personal Income Tax (ISR) is the direct progressive tax on net profits in Mexico. Unlike flat taxes, Mexican personal income tax employs an 11-bracket progressive rate ranging from 1.92% up to 35.00%. The higher the net taxable income, the higher the marginal percentage applied to the excess over the lower threshold.',
        formula: '1. Taxable Base = Gross Income - Authorized Deductions\n2. Excess = Taxable Base - Lower Limit\n3. Marginal Tax = Excess * (Marginal Rate / 100)\n4. Total ISR Due = Fixed Quota + Marginal Tax\n5. Estimated Net Income = Taxable Base - Total ISR Due',
        example: 'Gross Monthly Income: $35,000.00 MXN | Business Deductions: $10,000.00 MXN\n• Taxable Base: $35,000.00 - $10,000.00 = $25,000.00 MXN\n• Bracket: Lower Limit $15,487.72 | Fixed Quota $1,640.18 | Marginal Rate 21.36%\n• Excess: $25,000.00 - $15,487.72 = $9,512.28 MXN\n• Marginal Tax: $9,512.28 * 21.36% = $2,031.82 MXN\n• Total ISR Due: $1,640.18 + $2,031.82 = $3,672.00 MXN (Effective rate: 14.69%)\n• Net Profit: $25,000.00 - $3,672.00 = $21,328.00 MXN',
        legislation: 'Mexican Income Tax Law (LISR), Title IV (Individuals), Articles 96, 100, 106, 109, and Annex 8 of the current Miscellaneous Tax Resolution (RMF).',
        tips: [
          'Always pay deductible business expenses over $2,000 MXN using electronic means (wire, credit/debit card, cheque) to preserve tax deductibility under Art. 147 LISR.',
          'Remember that corporations billing you for professional services must withhold 10% ISR at source, which you credit against your monthly payment.'
        ],
        assumptions: [
          'Applies official provisional monthly rates for individuals with professional or business activities.',
          'Assumes income and expenses are on a cash-flow basis (effectively collected and paid).'
        ],
        limitations: [
          'Does not calculate annual personal deductions (medical, tuition), which apply exclusively in the annual April tax return.',
          'Does not compute sector-specific agricultural or transport tax credits.'
        ],
        faqs: [
          {
            question: 'Why is the effective tax rate lower than the marginal bracket rate?',
            answer: 'Because the Mexican ISR is graduated. A 21.36% marginal rate applies solely to the income dollars exceeding the bracket threshold ($15,487.72), not your entire income. Lower segments are taxed at lower rates starting at 1.92%.'
          },
          {
            question: 'Can I deduct medical expenses in monthly provisional payments?',
            answer: 'No. Under Article 151 LISR, personal deductions (doctor visits, hospital bills, tuition) can only be deducted on the Annual Tax Return filed in April.'
          }
        ],
        sources: [
          {
            name: 'SAT — Mexican Tax Administration Service',
            url: 'https://www.sat.gob.mx',
            description: 'Official federal tax portal containing current progressive rate schedules and tax rulings.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is a mathematical simulation tool based on official SAT tax brackets. It does not replace official tax declarations submitted on the SAT portal.'
      }
    }
  }
};
