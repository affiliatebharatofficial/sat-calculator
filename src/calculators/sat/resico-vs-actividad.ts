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
  }
};
