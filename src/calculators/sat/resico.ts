import { CalculatorConfig } from '../../types/calculator';

// Monthly RESICO brackets for Personas Físicas
const RESICO_MONTHLY_BRACKETS = [
  { limit: 25000, tasa: 1.00 },
  { limit: 50000, tasa: 1.10 },
  { limit: 83333.33, tasa: 1.50 },
  { limit: 208333.33, tasa: 2.00 },
  { limit: 291666.67, tasa: 2.50 }
];

export const resicoCalculator: CalculatorConfig = {
  id: 'calculo-resico-pf',
  title: 'Calculadora de RESICO Persona Física',
  shortDescription: 'Calcula el ISR simplificado para personas físicas bajo el Régimen Simplificado de Confianza (RESICO).',
  category: 'RESICO',
  categorySlug: 'resico',
  slug: 'calculadora-resico-pf',
  seo: {
    metaTitle: 'Calculadora RESICO 2026 - Personas Físicas México',
    metaDescription: 'Calcula el ISR a pagar en RESICO para Personas Físicas. Ingresa tus ingresos mensuales y calcula las tasas del 1% al 2.5% y retenciones del 1.25%.',
    keywords: ['calculadora resico', 'resico personas fisicas', 'isr resico sat', 'retencion resico 1.25', 'impuestos resico'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ingresos',
      label: 'Ingresos Brutos Mensuales ($)',
      type: 'number',
      defaultValue: 30000,
      placeholder: 'Ingresa tus ingresos totales facturados en el mes',
      suffix: 'MXN'
    },
    {
      id: 'factura_persona_moral',
      label: '¿Facturas a Personas Morales (Empresas)?',
      type: 'boolean',
      defaultValue: false
    },
    {
      id: 'ingresos_persona_moral',
      label: 'Monto facturado a Personas Morales ($)',
      type: 'number',
      defaultValue: 10000,
      placeholder: 'Monto facturado a empresas sujeto a retención',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const ingresos = parseFloat(inputs.ingresos) || 0;
    const facturaPM = inputs.factura_persona_moral === true;
    const ingresosPM = facturaPM ? Math.min(ingresos, parseFloat(inputs.ingresos_persona_moral) || 0) : 0;

    // Find the RESICO rate based on monthly income
    let tasa = 2.50;
    for (let i = 0; i < RESICO_MONTHLY_BRACKETS.length; i++) {
      if (ingresos <= RESICO_MONTHLY_BRACKETS[i].limit) {
        tasa = RESICO_MONTHLY_BRACKETS[i].tasa;
        break;
      }
    }

    // Calculate gross ISR
    const isrBruto = ingresos * (tasa / 100);

    // Calculate PM retention (1.25% of ingresosPM)
    const retencion = ingresosPM * 0.0125;

    // Calculate net ISR to pay
    const isrNetoAPagar = Math.max(0, isrBruto - retencion);

    const steps = [
      {
        description: `Se determina la tasa de ISR aplicable en RESICO según la tabla mensual oficial basada en los ingresos brutos ($${ingresos.toLocaleString('es-MX', { minimumFractionDigits: 2 })}). La tasa correspondiente es del ${tasa.toFixed(2)}%.`,
        mathFormula: `Tasa\\ Aplicable = ${tasa.toFixed(2)}\\%`
      },
      {
        description: `Se calcula el ISR Bruto multiplicando los ingresos totales por la tasa asignada.`,
        mathFormula: `ISR\\ Bruto = Ingresos \\times Tasa = $${ingresos.toFixed(2)} \\times ${(tasa / 100).toFixed(4)} = $${isrBruto.toFixed(2)}`
      }
    ];

    if (facturaPM && ingresosPM > 0) {
      steps.push({
        description: `Dado que facturas a Personas Morales, estas retienen por ley el 1.25% de los ingresos facturados a ellas ($${ingresosPM.toFixed(2)}).`,
        mathFormula: `Retenci\\acute{o}n = Monto\\ PM \\times 1.25\\% = $${ingresosPM.toFixed(2)} \\times 0.0125 = $${retencion.toFixed(2)}`
      });
      steps.push({
        description: `Se resta el impuesto retenido por las empresas del ISR Bruto para obtener el ISR Neto a pagar en la declaración mensual.`,
        mathFormula: `ISR\\ Neto = ISR\\ Bruto - Retenci\\acute{o}n = $${isrBruto.toFixed(2)} - $${retencion.toFixed(2)} = $${isrNetoAPagar.toFixed(2)}`
      });
    }

    return {
      results: [
        { label: 'Tasa Aplicada', value: tasa, formatted: `${tasa.toFixed(2)} %` },
        { label: 'ISR Bruto Determinado', value: isrBruto, formatted: `$${isrBruto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención de Personas Morales (1.25%)', value: retencion, formatted: `$${retencion.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'ISR Neto a Pagar Mensual', value: isrNetoAPagar, formatted: `$${isrNetoAPagar.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula el pago mensual del Régimen Simplificado de Confianza (RESICO) para personas físicas en México, determinando la tasa reducida aplicable (1.00% al 2.50%) según el nivel de ingresos brutos efectivamente cobrados y descontando la retención del 1.25% que aplican las personas morales.',
    whoShouldUse: [
      'Personas físicas en RESICO que realizan actividades empresariales, industriales o comerciales',
      'Profesionistas y freelancers inscritos en RESICO (honorarios)',
      'Arrendadores de bienes inmuebles habitacionales o comerciales bajo RESICO',
      'Emprendedores que evalúan si sus ingresos proyectados (hasta $3.5M anuales) califican para este régimen'
    ],
    howItWorks: 'El contribuyente ingresa el monto total de ingresos cobrados en el mes (sin IVA) y especifica cuánto de ese total fue facturado a Personas Morales. El simulador identifica el escalón tarifario del Artículo 113-E (1.00%, 1.10%, 1.50%, 2.00% o 2.50%), calcula el ISR causado y descuenta la retención del 1.25% para obtener el pago neto.',
    explanation: 'El Régimen Simplificado de Confianza (RESICO) para Personas Físicas fue introducido en la reforma fiscal mexicana de 2022 con el objetivo de fomentar la formalidad mediante tasas impositivas extraordinariamente bajas (entre el 1.0% y el 2.5%). Su característica definitoria es que el ISR se calcula directamente sobre los ingresos brutos cobrados, sin deducción de gastos para efectos de ISR, simplificando radicalmente la contabilidad.',
    formula: '1. Tasa RESICO según Ingreso Mensual (Art. 113-E LISR):\n   • Hasta $25,000.00: 1.00%\n   • Hasta $50,000.00: 1.10%\n   • Hasta $83,333.33: 1.50%\n   • Hasta $208,333.33: 2.00%\n   • Hasta $291,666.67 (o $3.5M anuales): 2.50%\n2. ISR Bruto Causado = Ingresos Mensuales Cobrados * Tasa RESICO\n3. Retención Persona Moral = Ingresos Facturados a PM * 1.25%\n4. ISR Neto a Enterar al SAT = Max(0, ISR Bruto - Retención PM)',
    example: 'Ingresos mensuales cobrados: $40,000.00 MXN\n• Monto facturado a una empresa (Persona Moral): $20,000.00 MXN\n• Monto facturado a particulares (Personas Físicas): $20,000.00 MXN\n\nCálculo:\n1. Escalón aplicable ($25,000.01 a $50,000.00): Tasa = 1.10%\n2. ISR Bruto Causado: $40,000.00 × 1.10% = $440.00 MXN\n3. Retención del 1.25% efectuada por la Persona Moral: $20,000.00 × 1.25% = $250.00 MXN\n4. ISR Neto a pagar al SAT en la declaración mensual: $440.00 - $250.00 = $190.00 MXN',
    legislation: 'Ley del Impuesto sobre la Renta (LISR), Título IV, Capítulo II, Sección IV (Del Régimen Simplificado de Confianza para Personas Físicas), Artículos 113-E (Tasas y Requisitos), 113-F (Obligaciones), 113-G y 113-J (Retención del 1.25% por Personas Morales).',
    tips: [
      'Cumple puntualmente con la presentación de declaraciones provisionales mensuales a más tardar el día 17 del mes siguiente.',
      'Mantén siempre activo el Buzón Tributario del SAT con medios de contacto actualizados y tu e.firma vigente para evitar ser reclasificado al Régimen General.',
      'Aunque en RESICO no deduces gastos para ISR, ¡sigue pidiendo facturas de tus gastos indispensables! Las necesitarás para acreditar el IVA y pagar menos IVA al SAT.'
    ],
    assumptions: [
      'Se asume que el contribuyente no excede el límite máximo de ingresos de $3,500,000.00 MXN al año.',
      'Se asume que los ingresos provienen exclusivamente de actividades compatibles con RESICO (actividad empresarial, profesional, arrendamiento, o complementados con salarios e intereses).',
      'No aplica para socios, accionistas ni partes relacionadas de personas morales.'
    ],
    limitations: [
      'No calcula el IVA trasladado ni el IVA acreditable mensual, el cual se declara por cuerda separada al 16% o 8%.',
      'No es aplicable si el contribuyente percibe ingresos por asimilados a salarios de partes relacionadas o plataformas tecnológicas con esquema de retención definitiva.',
      'No contempla penalizaciones ni recargos por declaraciones presentadas fuera de plazo.'
    ],
    faqs: [
      {
        question: '¿Puedo deducir gastos personales o de negocio para bajar el ISR en RESICO?',
        answer: 'No. En RESICO el cálculo de ISR se realiza sobre los ingresos brutos cobrados sin restar ningún gasto o deducción. A cambio, la tasa máxima que pagarás es de solo 2.50% (en comparación con hasta el 35% del Régimen General).'
      },
      {
        question: '¿Qué sucede si mis ingresos superan los 3.5 millones de pesos en el año?',
        answer: 'Si en algún momento del ejercicio fiscal tus ingresos acumulados rebasan los $3,500,000 MXN, la ley establece que debes salir de RESICO a partir del mes siguiente y tributar en el Régimen General de Actividad Empresarial o Arrendamiento, debiendo presentar declaraciones complementarias si la autoridad lo determina.'
      },
      {
        question: '¿Quiénes NO pueden tributar en RESICO según la ley?',
        answer: 'No pueden tributar en RESICO: socios o accionistas de personas morales (salvo excepciones como cooperativas o asociaciones civiles no lucrativas), residentes en el extranjero con establecimiento en México, quienes tengan ingresos sujetos a regímenes fiscales preferentes o quienes perciban honorarios a consejeros.'
      },
      {
        question: '¿Cómo funciona la retención del 1.25% que me hace una Persona Moral?',
        answer: 'Conforme al Artículo 113-J de la LISR, cuando una persona física en RESICO emite una factura a una persona moral, esta última está obligada por ley a retener el 1.25% del subtotal antes de IVA. Esa retención te genera un comprobante de retención y la descuentas directamente de tu pago mensual al SAT.'
      }
    ],
    sources: [
      {
        name: 'SAT — Minisitio Oficial de RESICO',
        url: 'https://www.sat.gob.mx',
        description: 'Guías normativas, requisitos de permanencia y simuladores del Régimen Simplificado de Confianza.'
      },
      {
        name: 'Cámara de Diputados — LISR Sección IV Art. 113-E',
        url: 'https://www.diputados.gob.mx',
        description: 'Marco legislativo del Régimen Simplificado de Confianza para personas físicas.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta de simulación contable con fines educativos y de planeación financiera. No sustituye la declaración mensual oficial en el Servicio de Administración Tributaria.'
  }
};
