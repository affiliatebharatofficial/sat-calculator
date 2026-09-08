import { CalculatorConfig } from '../../types/calculator';

// Monthly RESICO brackets
const RESICO_MONTHLY_BRACKETS = [
  { limit: 25000, tasa: 1.00 },
  { limit: 50000, tasa: 1.10 },
  { limit: 83333.33, tasa: 1.50 },
  { limit: 208333.33, tasa: 2.00 },
  { limit: 291666.67, tasa: 2.50 }
];

// Monthly ISR Brackets for Actividad Empresarial
const ISR_MONTHLY_BRACKETS = [
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

export const resicoVsActividadCalculator: CalculatorConfig = {
  id: 'calculo-resico-vs-actividad',
  title: 'Comparador RESICO vs Actividad Empresarial',
  shortDescription: 'Compara de forma interactiva cuánto pagarías de ISR bajo RESICO contra el Régimen de Actividad Empresarial para elegir la mejor opción.',
  category: 'RESICO',
  categorySlug: 'resico',
  slug: 'comparador-resico-actividad-empresarial',
  seo: {
    metaTitle: 'Comparador RESICO vs Actividad Empresarial 2026 - México',
    metaDescription: '¿Qué régimen fiscal te conviene más? Compara el pago de ISR de RESICO (sin deducciones) contra Actividad Profesional con gastos deducibles.',
    keywords: ['comparador resico actividad empresarial', 'resico vs regimen general', 'que regimen me conviene', 'isr deducciones sat', 'fiscal mexico'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ingresos_mensuales',
      label: 'Ingresos Mensuales Brutos ($)',
      type: 'number',
      defaultValue: 35000,
      placeholder: 'Tus ingresos mensuales facturados sin IVA',
      suffix: 'MXN'
    },
    {
      id: 'gastos_deducibles',
      label: 'Gastos Mensuales Deducibles ($)',
      type: 'number',
      defaultValue: 15000,
      placeholder: 'Gastos indispensables facturados relacionados con tu actividad',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const ingresos = parseFloat(inputs.ingresos_mensuales) || 0;
    const gastos = parseFloat(inputs.gastos_deducibles) || 0;

    // 1. CALCULATE RESICO ISR
    let tasaResico = 2.50;
    for (let i = 0; i < RESICO_MONTHLY_BRACKETS.length; i++) {
      if (ingresos <= RESICO_MONTHLY_BRACKETS[i].limit) {
        tasaResico = RESICO_MONTHLY_BRACKETS[i].tasa;
        break;
      }
    }
    const isrResico = ingresos * (tasaResico / 100);
    const netoResico = ingresos - isrResico;

    // 2. CALCULATE ACTIVIDAD EMPRESARIAL ISR
    const baseGravableActividad = Math.max(0, ingresos - gastos);
    let bracket = ISR_MONTHLY_BRACKETS[0];
    for (let i = 0; i < ISR_MONTHLY_BRACKETS.length; i++) {
      if (baseGravableActividad >= ISR_MONTHLY_BRACKETS[i].limitInferior) {
        bracket = ISR_MONTHLY_BRACKETS[i];
      } else {
        break;
      }
    }
    const excedente = baseGravableActividad - bracket.limitInferior;
    const isrActividad = bracket.cuotaFija + (excedente * (bracket.tasa / 100));
    const netoActividad = ingresos - isrActividad - gastos; // Deducting actual expenses too for cash flow

    const diferenciaIsr = Math.abs(isrActividad - isrResico);
    const convieneResico = isrResico < isrActividad;

    const steps = [
      {
        description: `Bajo RESICO, el ISR se calcula multiplicando tu ingreso bruto por la tasa asignada (${tasaResico.toFixed(2)}%). No se consideran gastos deducibles.`,
        mathFormula: `ISR\\ RESICO = $${ingresos.toFixed(2)} \\times ${tasaResico.toFixed(2)}\\% = $${isrResico.toFixed(2)}`
      },
      {
        description: `Bajo Actividad Empresarial, se restan los gastos deducibles para obtener la base gravable y luego se aplica la tarifa mensual de ISR.`,
        mathFormula: `Base\\ Gravable = $${ingresos.toFixed(2)} - $${gastos.toFixed(2)} = $${baseGravableActividad.toFixed(2)}\\\\ISR\\ Actividad = $${isrActividad.toFixed(2)}`
      },
      {
        description: convieneResico
          ? `RESICO te conviene más. Pagarás $${diferenciaIsr.toLocaleString('es-MX', { minimumFractionDigits: 2 })} pesos MENOS de ISR en comparación con el régimen general.`
          : `El régimen general de Actividad Empresarial te conviene más. Debido a tu alto volumen de gastos deducibles, pagarás $${diferenciaIsr.toLocaleString('es-MX', { minimumFractionDigits: 2 })} pesos MENOS de ISR en comparación con RESICO.`
      }
    ];

    return {
      results: [
        { label: 'Tasa RESICO Aplicable', value: tasaResico, formatted: `${tasaResico.toFixed(2)} %` },
        { label: 'ISR a Pagar en RESICO', value: isrResico, formatted: `$${isrResico.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'ISR a Pagar en Actividad Empresarial', value: isrActividad, formatted: `$${isrActividad.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Diferencia en ISR (Ahorro potencial)', value: diferenciaIsr, formatted: `$${diferenciaIsr.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Régimen Recomendado (Menos Impuesto)', value: convieneResico ? 1 : 0, formatted: convieneResico ? 'RESICO ⭐' : 'Actividad Empresarial ⭐', isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Compara de forma interactiva y simultánea la carga fiscal mensual de ISR entre el Régimen Simplificado de Confianza (RESICO, tasa reducida del 1.00% al 2.50% sobre ingresos cobrados sin deducciones) y el Régimen de Actividad Empresarial y Servicios Profesionales (tarifa progresiva del Art. 96/106 LISR hasta el 35% sobre utilidad neta con deducciones autorizadas), determinando con exactitud el régimen con menor impuesto y el ahorro neto resultante.',
    whoShouldUse: [
      'Profesionistas independientes, consultores y prestadores de servicios que tramitan su alta en el RFC o evalúan migrar de régimen tributario',
      'Comerciantes, dueños de negocios y emprendedores que analizan el impacto de sus gastos deducibles en el pago mensual de impuestos',
      'Contadores públicos y asesores fiscales que realizan análisis comparativos y proyecciones de flujo para personas físicas',
      'Contribuyentes con márgenes de ganancia reducidos que dudan si RESICO resulta más costoso que deducir sus compras e inventarios en el Régimen General'
    ],
    howItWorks: 'Toma el ingreso bruto mensual cobrado. Para RESICO, ubica la tasa directa aplicable (1.00% a 2.50%) conforme a la tabla mensual del Artículo 113-E de la LISR y la aplica íntegra sobre el total facturado sin admitir deducciones de gastos. Para Actividad Empresarial, resta los gastos deducibles autorizados con factura del ingreso bruto para obtener la utilidad gravable, y a esta base le aplica la tarifa mensual del Artículo 96/106 de la LISR (límite inferior, cuota fija y porcentaje sobre excedente). Compara ambos resultados numéricos y resalta el régimen que optimiza el pago de impuestos.',
    explanation: 'El factor determinante entre tributar en RESICO o en el Régimen de Actividad Empresarial es el margen de utilidad del negocio y la proporción de gastos operativos comprobables con factura. RESICO cobra un porcentaje sumamente bajo sobre el total facturado sin permitir deducción de gastos; por ello es extraordinariamente conveniente para prestadores de servicios y actividades con bajo costo operativo donde el margen de ganancia supera el 30% o 40%. Por el contrario, Actividad Empresarial permite deducir todos los gastos e inversiones indispensables para la actividad; si un negocio maneja márgenes muy reducidos (por ejemplo, comercializadoras de mayoreo donde los gastos representan el 85% al 95% del ingreso), la base neta gravable en el régimen general se vuelve tan pequeña que el ISR resultante puede ser inferior al porcentaje plano de RESICO.',
    formula: '• RESICO:\n1. Base Gravable = Ingresos Brutos Cobrados (sin IVA)\n2. ISR RESICO = Base Gravable * Tasa RESICO Art. 113-E (1.00% a 2.50%)\n• Actividad Empresarial (Régimen General):\n1. Utilidad Fiscal Gravable = Max(0, Ingresos Brutos Cobrados - Gastos Deducibles Autorizados)\n2. Excedente del Límite Inferior = Utilidad Fiscal Gravable - Límite Inferior del Rango\n3. Impuesto Marginal = Excedente * ( Tasa Marginal / 100 )\n4. ISR Actividad Empresarial = Cuota Fija del Rango + Impuesto Marginal\n• Comparación:\nAhorro Fiscal Mensual = | ISR Actividad Empresarial - ISR RESICO |',
    example: 'Para un contribuyente con ingresos mensuales cobrados de $35,000.00 MXN y gastos deducibles autorizados de $15,000.00 MXN:\n• En RESICO: Ingreso de $35,000.00 cae en el segundo rango (hasta $50,000.00) con tasa directa del 1.10%.\n  ISR Mensual a Pagar = $35,000.00 * 1.10% = $385.00 MXN.\n• En Actividad Empresarial:\n  Utilidad neta gravable = $35,000.00 - $15,000.00 = $20,000.00 MXN.\n  Tarifa SAT mensual: Límite Inferior $15,487.72, Cuota Fija $1,640.18, Tasa 21.36%.\n  Excedente = $20,000.00 - $15,487.72 = $4,512.28 MXN.\n  Impuesto marginal = $4,512.28 * 21.36% = $963.82 MXN.\n  ISR Mensual a Pagar = $1,640.18 + $963.82 = $2,604.00 MXN.\n• Dictamen Comparativo: RESICO ofrece un ahorro mensual de $2,219.00 MXN ($26,628.00 MXN anuales) en ISR respecto al régimen general.',
    howToInterpret: 'La comparativa proporciona tres dictámenes clave para tu planeación fiscal:\n1. ISR en RESICO: Muestra el impuesto directo sobre el total de tus ingresos cobrados sin deducciones (tasa fija del 1.00% al 2.50%).\n2. ISR en Actividad Empresarial: Muestra el impuesto que pagarías tras restar tus gastos deducibles con factura, aplicando la tarifa progresiva del SAT.\n3. Diferencia y Régimen Recomendado: Identifica cuál régimen te ahorra más dinero en el mes y calcula el monto exacto de ahorro que conservas en tu bolsillo.',
    legislation: 'Ley del Impuesto sobre la Renta (LISR): Artículos 113-E al 113-J (Régimen Simplificado de Confianza para Personas Físicas) y Artículos 100 al 110 (Régimen de las Personas Físicas con Actividades Empresariales y Profesionales); y Resolución Miscelánea Fiscal (RMF vigente, Anexo 8 sobre tarifas oficiales de ISR).',
    tips: [
      'Aunque tributes en RESICO y no puedas deducir gastos para ISR, debes continuar solicitando factura electrónica (CFDI) con uso correcto de todos tus gastos y compras: son estrictamente indispensables para acreditar y restar el IVA pagado al momento de calcular tu declaración mensual de IVA.',
      'Si prestas servicios o vendes bienes a Personas Morales (empresas) bajo RESICO, la empresa debe retenerte obligatoriamente el 1.25% de ISR; esa retención se acredita directamente contra tu pago mensual.',
      'Si operas un negocio comercial con márgenes brutos inferiores al 10% (por ejemplo, compras a $90 y vendes a $100), analiza con cautela: el 1% o 2% de ISR sobre ventas brutas en RESICO puede devorar entre el 10% y el 25% de tu ganancia neta real.',
      'Los socios, accionistas o directores de personas morales tienen prohibido por ley tributar en RESICO personas físicas (conforme al Art. 113-E Fracc. I LISR), teniendo que tributar en Actividad Empresarial.'
    ],
    assumptions: [
      'Los ingresos y gastos capturados corresponden a flujos de efectivo efectivamente cobrados y pagados en el mes calendario simulado.',
      'Los gastos capturados cumplen íntegramente con los requisitos de deducibilidad del Art. 105 de la LISR (CFDI válido, medios electrónicos de pago en montos mayores a $2,000 MXN).',
      'No se consideran pérdidas fiscales de ejercicios anteriores pendientes de amortizar.',
      'Se asume que los ingresos anuales proyectados no exceden el tope legal de RESICO ($3.5 millones de pesos).'
    ],
    limitations: [
      'No evalúa causales de exclusión jurídica de RESICO (como participación accionaria en empresas o percepción de honorarios asimilados a salarios de partes relacionadas).',
      'No calcula el IVA mensual por cobrar o pagar, el cual opera de manera idéntica bajo la Ley del IVA para ambos regímenes.',
      'No incluye deducciones personales anuales (gastos médicos, colegiaturas, primas de seguros) que únicamente pueden aplicarse en la declaración anual del Régimen de Actividad Empresarial y están vetadas en RESICO.'
    ],
    faqs: [
      {
        question: '¿Qué personas físicas no pueden tributar en RESICO por ley?',
        answer: 'El Artículo 113-E de la Ley del ISR excluye expresamente a: socios o accionistas de personas morales (salvo ciertas excepciones de cooperativas agrarias y donatarias autorizadas), quienes residan en el extranjero con establecimiento permanente en México, quienes obtengan ingresos sujetos a regímenes fiscales preferentes (paraísos fiscales), quienes perciban honorarios a miembros de consejos directivos o asimilados a salarios en esquemas preponderantes, y aquellos cuyos ingresos anuales superen $3,500,000 MXN.'
      },
      {
        question: '¿Qué sucede con el IVA si elijo tributar en RESICO?',
        answer: 'El IVA no tiene ningún cambio preferencial ni tasa reducida en RESICO. La Ley del IVA continúa aplicando al 16% (o tasa 0% para productos exentos/agropecuarios). En RESICO debes seguir cobrando el IVA a tus clientes y puedes restar (acreditar) el IVA que pagaste a tus proveedores en gastos e inversiones estrictamente indispensables amparados con factura.'
      },
      {
        question: '¿Puedo aplicar deducciones personales en RESICO en mi Declaración Anual?',
        answer: 'No. El Régimen Simplificado de Confianza no permite aplicar ninguna deducción de gastos operativos ni deducciones personales (como gastos médicos, dentales, colegiaturas o aportaciones complementarias para el retiro). En contraprestación, otorga tasas impositivas extremadamente bajas que van del 1% al 2.5% anual.'
      },
      {
        question: '¿Qué sucede si mis ingresos superan los $3.5 millones de pesos en RESICO?',
        answer: 'En el momento en que tus ingresos acumulados en el ejercicio fiscal excedan los $3,500,000 pesos, el SAT te cambiará de forma automática al Régimen de Actividad Empresarial y Profesional a partir del mes siguiente, teniendo que presentar pagos provisionales con la tarifa progresiva general y perdiendo los beneficios de tasa reducida de RESICO.'
      },
      {
        question: '¿Cuándo puedo cambiarme de régimen fiscal ante el SAT?',
        answer: 'Por disposición fiscal, el cambio de régimen tributario por opción del contribuyente debe presentarse mediante un aviso de actualización de actividades económicas ante el portal del SAT a más tardar el 31 de enero de cada ejercicio fiscal, surtiendo efectos para todo el año calendario correspondiente.'
      }
    ],
    relatedCalculators: [
      'sat/calculadora-resico-pf',
      'sat/calculadora-isr-pf',
      'sat/calculadora-iva'
    ],
    sources: [
      {
        name: 'SAT — Minisitio oficial RESICO Personas Físicas',
        url: 'https://www.sat.gob.mx',
        description: 'Guía oficial, requisitos de permanencia, exclusiones legales y simuladores de declaraciones bimestrales y mensuales.'
      },
      {
        name: 'PRODECON — Guía práctica de tributación en RESICO vs Régimen General',
        url: 'https://www.gob.mx/prodecon',
        description: 'Criterios jurisdiccionales y recomendaciones de defensa del contribuyente sobre compatibilidad de regímenes.'
      },
      {
        name: 'Cámara de Diputados — Ley del Impuesto sobre la Renta',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto vigente de los Artículos 100 al 110 y 113-E al 113-J de la LISR.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Este comparador fiscal ofrece una estimación matemática y analítica de orientación didáctica. La conveniencia integral de un régimen involucra variables patrimoniales adicionales como deducciones personales anuales, pérdidas acumuladas de años previos, acreditamiento de IVA y restricciones de accionistas. Se recomienda consultar a un Contador Público colegiado antes de presentar avisos al RFC.'
  },
  translations: {
    en: {
      title: 'RESICO vs General Business Regime Comparison',
      shortDescription: 'Compare monthly income tax liabilities between RESICO (gross revenue) and the General Business Regime (net profit with deductions).',
      category: 'RESICO',
      seo: {
        metaTitle: 'RESICO vs General Regime Tax Comparison 2026 - Mexico',
        metaDescription: 'Which tax regime is better for you? Compare Mexican RESICO (no expense deductions) against the General Business Regime with authorized deductions.',
        keywords: ['resico vs general regime', 'mexico tax comparison', 'which tax regime is best mexico', 'resico expense deductions']
      },
      content: {
        whatItDoes: 'Interactively and simultaneously compares monthly income tax (ISR) liabilities between Mexico\'s Simplified Trust Regime (RESICO, reduced direct rates from 1.00% to 2.50% on collected revenue without deductions) and the General Business and Professional Activities Regime (progressive rates under Art. 96/106 LISR up to 35% on net profit after deductible expenses), identifying the optimal tax regime and monthly net savings.',
        whoShouldUse: [
          'Independent professionals, consultants, and service providers registering with the RFC or evaluating tax regime migration',
          'Merchants, business owners, and entrepreneurs evaluating the financial impact of deductible expenses on monthly taxes',
          'Certified public accountants and financial advisors conducting comparative tax planning for individual taxpayers in Mexico',
          'Taxpayers operating with slim profit margins determining whether RESICO is more costly than deducting authorized business expenses'
        ],
        howItWorks: 'Takes gross monthly collected cash revenue. For RESICO, it applies the statutory flat rate (1.00% to 2.50%) per Article 113-E without allowing expense deductions. For the General Business Regime, it subtracts authorized deductible expenses to determine net taxable profit, applying the progressive monthly tax brackets of Article 96/106. It then compares both outcomes to highlight the tax-minimizing regime.',
        howToInterpret: 'Examine the Monthly Tax Savings and the Breakeven Expense Ratio. If your actual deductible expenses represent a lower percentage than the breakeven threshold, RESICO yields substantial monthly cash savings due to reduced flat rates. If your expenses exceed this threshold (common in low-margin trading or capital-intensive operations), the General Business Regime is tax-superior because deducting those high expenses minimizes taxable net income.',
        explanation: 'The critical factor determining whether to elect RESICO or the General Business Regime is the operational profit margin and the ratio of deductible business expenses. RESICO applies an exceptionally low rate to gross invoiced revenue without deductions, making it highly advantageous for service providers and low-overhead professions where profit margins exceed 30% to 40%. Conversely, the General Regime allows deducting all indispensable business expenses and inventories; for high-volume, low-margin businesses (such as wholesalers where operating expenses represent 85% to 95% of gross revenue), the net taxable base in the General Regime becomes small enough that progressive tax can be lower than RESICO\'s flat gross tax.',
        formula: '• RESICO:\n1. Taxable Base = Gross Collected Revenue (excluding VAT)\n2. ISR RESICO = Taxable Base * RESICO Rate Art. 113-E (1.00% to 2.50%)\n• General Business Regime:\n1. Net Taxable Profit = Max(0, Gross Collected Revenue - Authorized Deductible Expenses)\n2. Excess over Lower Bracket = Net Taxable Profit - Lower Bracket Limit\n3. Marginal Tax = Excess * ( Marginal Rate / 100 )\n4. General Regime ISR = Fixed Quota + Marginal Tax\n• Comparison:\nMonthly Tax Savings = | General Regime ISR - RESICO ISR |',
        example: 'Taxpayer with $35,000.00 MXN gross monthly collected income and $15,000.00 MXN in authorized deductible expenses:\n• Under RESICO: $35,000.00 falls into the second tier (up to $50,000.00) with a direct rate of 1.10%.\n  Monthly ISR Payable = $35,000.00 * 1.10% = $385.00 MXN.\n• Under General Business Regime:\n  Net taxable profit = $35,000.00 - $15,000.00 = $20,000.00 MXN.\n  Monthly progressive bracket: Lower limit $15,487.72, Fixed quota $1,640.18, Marginal rate 21.36%.\n  Excess = $20,000.00 - $15,487.72 = $4,512.28 MXN.\n  Marginal tax = $4,512.28 * 21.36% = $963.82 MXN.\n  Monthly ISR Payable = $1,640.18 + $963.82 = $2,604.00 MXN.\n• Comparative Assessment: RESICO delivers monthly tax savings of $2,219.00 MXN ($26,628.00 MXN annually) over the General Regime.',
        legislation: 'Mexican Income Tax Law (LISR): Articles 113-E through 113-J (Simplified Trust Regime for Individuals) and Articles 100 through 110 (General Business and Professional Activities Regime); and current Tax Miscellaneous Resolution (RMF Annex 8 progressive brackets).',
        tips: [
          'Even if you elect RESICO and cannot deduct expenses for ISR, continue requesting electronic invoices (CFDI) for business expenses to credit and reduce VAT (IVA) on monthly returns.',
          'When invoicing corporate clients (Personas Morales) under RESICO, companies must withhold 1.25% ISR, which credits directly against your monthly tax liability.',
          'If your business operates on gross margins below 10%, analyze carefully: a 1% to 2% flat tax on gross receipts may consume 10% to 25% of real net profit.',
          'Shareholders, partners, or directors of corporate entities are legally excluded from RESICO (Art. 113-E LISR) and must file under the General Business Regime.'
        ],
        assumptions: [
          'Revenues and expenses represent cash flows actually collected and paid during the simulated calendar month.',
          'Deductible expenses meet statutory tax requirements under Article 105 of the LISR (valid CFDI invoices, electronic payment for transactions exceeding $2,000 MXN).',
          'Past unamortized tax losses are not factored into the simulation.',
          'Projected annual gross revenue does not exceed the statutory RESICO ceiling of $3.5 million MXN.'
        ],
        limitations: [
          'Does not examine statutory corporate exclusions (e.g. equity stakes in private companies or fees from related parties).',
          'Does not calculate Value Added Tax (VAT/IVA), which operates under the same legal rules for both regimes.',
          'Does not include annual personal deductions (medical, dental, tuition expenses), which are exclusive to the General Regime annual return and barred in RESICO.'
        ],
        faqs: [
          {
            question: 'Who is legally barred from electing RESICO in Mexico?',
            answer: 'Article 113-E of the Income Tax Law expressly excludes partners or shareholders of corporate entities (with narrow exceptions for agricultural co-ops), foreign residents with Mexican establishments, individuals subject to preferential tax regimes, and taxpayers earning over $3,500,000 MXN annually.'
          },
          {
            question: 'How does Value Added Tax (VAT/IVA) apply under RESICO?',
            answer: 'VAT rules are unchanged under RESICO. The standard 16% rate (or 0% for exempt goods) applies. You continue charging VAT to customers and can credit VAT paid on essential business expenses accompanied by valid CFDI invoices.'
          },
          {
            question: 'Can I claim personal deductions on my annual tax return in RESICO?',
            answer: 'No. RESICO does not allow annual personal deductions (such as medical expenses, health insurance premiums, or tuition). In exchange, taxpayers benefit from exceptionally low rates (1% to 2.5%).'
          },
          {
            question: 'What happens if annual gross receipts surpass 3.5 million pesos in RESICO?',
            answer: 'Once cumulative revenue exceeds $3,500,000 MXN during the fiscal year, the SAT automatically reclassifies the taxpayer into the General Business Regime starting the following month, requiring progressive tax filing.'
          },
          {
            question: 'When can I switch tax regimes with the SAT?',
            answer: 'Taxpayers may voluntarily switch regimes by submitting an economic activity update notice on the official SAT portal no later than January 31 of each tax year, effective for the full calendar year.'
          }
        ],
        relatedCalculators: [
          'sat/calculadora-resico-pf',
          'sat/calculadora-isr-pf',
          'sat/calculadora-iva'
        ],
        sources: [
          {
            name: 'SAT — Official RESICO Information Portal',
            url: 'https://www.sat.gob.mx',
            description: 'Official regulations, compliance guidelines, and simulation tools for the Simplified Trust Regime.'
          },
          {
            name: 'PRODECON — Practical Guide to RESICO vs General Regime',
            url: 'https://www.gob.mx/prodecon',
            description: 'Taxpayer defense ombudsman criteria regarding regime compatibility and strategic selection.'
          },
          {
            name: 'Chamber of Deputies — Mexican Income Tax Law',
            url: 'https://www.diputados.gob.mx',
            description: 'Statutory text of Articles 100-110 and 113-E through 113-J of the LISR.'
          }
        ],
        lastUpdated: 'Updated for fiscal year 2026',
        disclaimer: 'This tax comparison tool provides mathematical estimations for educational planning purposes. Comprehensive regime selection requires evaluating annual personal deductions, accumulated losses, and corporate shareholding status with a licensed Mexican CPA.'
      }
    }
  }
};
