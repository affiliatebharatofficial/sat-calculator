import { CalculatorConfig } from '../../types/calculator';

export const ivaCalculator: CalculatorConfig = {
  id: 'calculo-iva',
  title: 'Calculadora de IVA México',
  shortDescription: 'Calcula el IVA (16% u 8%) para agregar o desglosar de un monto total.',
  category: 'Impuestos Federales',
  categorySlug: 'sat',
  slug: 'calculadora-iva',
  seo: {
    metaTitle: '🧮 Calculadora de IVA SAT 2026 — Desglosar e Incluir 16% y 8% Gratis',
    metaDescription: 'Calcula el IVA 16% u 8% en México al instante. Herramienta gratuita para desglosar el IVA de un monto total o agregar el 16% de IVA a una factura SAT.',
    keywords: ['calculadora iva', 'calcular iva mexico', 'desglosar iva sat', 'iva 16 por ciento', 'iva fronterizo 8 por ciento'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto ($)',
      type: 'number',
      defaultValue: 1000,
      placeholder: 'Ingresa la cantidad en pesos',
      suffix: 'MXN'
    },
    {
      id: 'tipo_accion',
      label: '¿Qué deseas hacer?',
      type: 'select',
      defaultValue: 'agregar',
      options: [
        { label: 'Agregar IVA (Calcular sobre subtotal)', value: 'agregar' },
        { label: 'Desglosar IVA (Extraer de un total con IVA incluido)', value: 'desglosar' }
      ]
    },
    {
      id: 'tasa',
      label: 'Tasa de IVA',
      type: 'select',
      defaultValue: 16,
      options: [
        { label: 'General (16%)', value: 16 },
        { label: 'Fronteriza (8%)', value: 8 },
        { label: 'Tasa Cero (0%)', value: 0 }
      ]
    }
  ],
  calculate: (inputs, lang) => {
    const monto = parseFloat(inputs.monto) || 0;
    const tipoAccion = inputs.tipo_accion;
    const tasa = parseFloat(inputs.tasa) / 100;
    const isEn = lang === 'en';

    let subtotal = 0;
    let iva = 0;
    let total = 0;
    const steps = [];

    if (tipoAccion === 'agregar') {
      subtotal = monto;
      iva = subtotal * tasa;
      total = subtotal + iva;

      steps.push({
        description: isEn
          ? `The entered amount is taken as the base Subtotal.`
          : `Se toma el monto ingresado como el Subtotal base.`,
        mathFormula: `Subtotal = $${subtotal.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `IVA is calculated by multiplying the Subtotal by the tax rate (${(tasa * 100).toFixed(0)}%).`
          : `Se calcula el IVA multiplicando el Subtotal por la tasa de IVA (${(tasa * 100).toFixed(0)}%).`,
        mathFormula: `IVA = $${subtotal.toFixed(2)} \\times ${tasa.toFixed(2)} = $${iva.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `Subtotal and IVA are added to obtain the grand Total.`
          : `Se suma el Subtotal y el IVA para obtener el Total general.`,
        mathFormula: `Total = Subtotal + IVA = $${subtotal.toFixed(2)} + $${iva.toFixed(2)} = $${total.toFixed(2)}`
      });
    } else {
      total = monto;
      subtotal = total / (1 + tasa);
      iva = total - subtotal;

      steps.push({
        description: isEn
          ? `The entered amount is taken as the grand Total (IVA included).`
          : `Se toma el monto ingresado como el Total general (IVA incluido).`,
        mathFormula: `Total = $${total.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `Subtotal is extracted by dividing the Total by 1 plus the VAT rate (1 + ${tasa.toFixed(2)}).`
          : `Se extrae el Subtotal dividiendo el Total entre 1 más la tasa de IVA (1 + ${tasa.toFixed(2)}).`,
        mathFormula: `Subtotal = \\frac{Total}{1 + Tasa} = \\frac{$${total.toFixed(2)}}{${(1 + tasa).toFixed(2)}} = $${subtotal.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `IVA is calculated by subtracting the Subtotal from the Total.`
          : `Se calcula el IVA restando el Subtotal del Total.`,
        mathFormula: `IVA = Total - Subtotal = $${total.toFixed(2)} - $${subtotal.toFixed(2)} = $${iva.toFixed(2)}`
      });
    }

    return {
      results: [
        { label: isEn ? 'Base Subtotal' : 'Subtotal Base', value: subtotal, formatted: `$${subtotal.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Calculated IVA' : 'IVA Calculado', value: iva, formatted: `$${iva.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Net Total' : 'Total Neto', value: total, formatted: `$${total.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula al instante el Impuesto al Valor Agregado (IVA) en México bajo dos modalidades operativas: agregar el impuesto sobre una base subtotal, o desglosarlo a partir de un precio final que ya lo incluye. Admite la tasa general del 16%, el estímulo fronterizo del 8% y la tasa del 0%.',
    whoShouldUse: [
      'Contribuyentes que emiten o reciben facturas electrónicas (CFDI 4.0)',
      'Profesionistas independientes y freelancers que presupuestan sus honorarios netos',
      'Comerciantes y negocios que fijan precios de venta al público en general',
      'Consumidores que desean verificar el monto exacto de impuesto pagado en sus compras'
    ],
    howItWorks: 'El usuario selecciona si desea "Agregar IVA" o "Desglosar IVA", define el monto y elige la tasa aplicable (16%, 8% o 0%). El algoritmo aplica la operación aritmética inversa en caso de desglose o directa en caso de adición, generando el desglose formal de Subtotal, IVA y Total Neto.',
    explanation: 'El Impuesto al Valor Agregado (IVA) es un impuesto indirecto sobre el consumo en México que grava la entrega de bienes, prestación de servicios independientes, otorgamiento del uso o goce temporal de bienes y la importación de bienes o servicios. La tasa general es del 16%, con una tasa reducida del 8% para municipios autorizados de la Zona Libre de la Frontera Norte y Sur, y tasa del 0% para productos de la canasta básica, medicinas de patente y exportaciones.',
    formula: '1. Para Agregar IVA:\nIVA = Subtotal * Tasa\nTotal Neto = Subtotal + IVA = Subtotal * (1 + Tasa)\n\n2. Para Desglosar IVA:\nSubtotal = Total / (1 + Tasa)\nIVA = Total - Subtotal = Total * [ Tasa / (1 + Tasa) ]',
    example: 'Caso A (Agregar IVA 16%):\n• Subtotal acordado: $5,000.00 MXN\n• IVA (16%): $5,000.00 × 0.16 = $800.00 MXN\n• Total a cobrar en factura: $5,800.00 MXN\n\nCaso B (Desglosar IVA 16% de precio de venta al público):\n• Precio cobrado al cliente: $1,160.00 MXN\n• Subtotal base: $1,160.00 ÷ 1.16 = $1,000.00 MXN\n• IVA retenido/trasladado: $1,160.00 - $1,000.00 = $160.00 MXN',
    legislation: 'Ley del Impuesto al Valor Agregado (LIVA), Artículos 1 (Tasa General 16%), 1-A (Retenciones), 2-A (Tasa 0%), y Decretos de Estímulos Fiscales de la Región Fronteriza Norte y Sur publicados en el Diario Oficial de la Federación.',
    tips: [
      'Al emitir un CFDI 4.0, verifica que los importes cuadren con el redondeo a 2 decimales exigido por el Anexo 20 del SAT.',
      'Si eres persona física del régimen de Actividad Empresarial o Servicios Profesionales y facturas a una Persona Moral, recuerda que te retendrán 2/3 partes del IVA (10.6667%) además del 10% de ISR.',
      'El IVA trasladado (cobrado) no es un ingreso propio; se debe enterar al SAT en la declaración mensual restando el IVA acreditable (pagado en compras estrictamente indispensables).'
    ],
    assumptions: [
      'Se asume que la operación está gravada a la tasa seleccionada y no se encuentra exenta de IVA conforme al Artículo 9 o 15 de la LIVA.',
      'El cálculo considera importes en moneda nacional (MXN) con redondeo estándar a centavos.',
      'No se aplican retenciones adicionales entre personas físicas y morales a menos que se calcule de forma separada.'
    ],
    limitations: [
      'No contempla cálculos combinados de IEPS (Impuesto Especial sobre Producción y Servicios) simultáneos.',
      'No determina la proporción de acreditamiento en caso de contribuyentes con actividades mixtas (gravadas y exentas).',
      'No valida requisitos de deducibilidad formal de los comprobantes fiscales ante el SAT.'
    ],
    faqs: [
      {
        question: '¿Por qué no se debe multiplicar el total por 0.16 para extraer el IVA?',
        answer: 'Porque el total ya representa el 116% del precio base (100% subtotal + 16% IVA). Si multiplicas $1,160 por 0.16 obtendrás $185.60, lo cual es incorrecto. La operación matemáticamente correcta es dividir entre 1.16, arrojando el subtotal real de $1,000.00 y un IVA de $160.00.'
      },
      {
        question: '¿Quiénes pueden expedir facturas con la tasa del 8% de IVA?',
        answer: 'Únicamente las personas físicas y morales registradas en el Padrón de Beneficiarios del Estímulo de la Región Fronteriza Norte o Sur, que cuenten con domicilio fiscal y realicen la entrega material de los bienes o prestación de servicios dentro de los municipios autorizados.'
      },
      {
        question: '¿Cuál es la diferencia entre una actividad con tasa 0% y una exenta de IVA?',
        answer: 'En la tasa 0% (como medicinas y alimentos no preparados), la operación sí está gravada por la ley a tasa cero, lo que permite al contribuyente solicitar la devolución del IVA pagado en sus insumos (saldo a favor). En las actividades exentas (como venta de casa habitación o servicios médicos), no se cobra IVA pero tampoco se puede recuperar el IVA pagado.'
      },
      {
        question: '¿Qué es el IVA acreditable y cómo se calcula el pago mensual al SAT?',
        answer: 'El IVA por pagar resulta de restar el IVA acreditable (el que pagaste a proveedores en compras deducibles) al IVA trasladado (el que cobraste a tus clientes). Si el IVA trasladado es mayor, pagas la diferencia; si el acreditable es mayor, obtienes saldo a favor.'
      }
    ],
    sources: [
      {
        name: 'Servicio de Administración Tributaria (SAT) — Ley del IVA',
        url: 'https://www.sat.gob.mx',
        description: 'Texto oficial vigente de la Ley del Impuesto al Valor Agregado y resoluciones misceláneas.'
      },
      {
        name: 'Diario Oficial de la Federación (DOF) — Decretos Fronterizos',
        url: 'https://www.dof.gob.mx',
        description: 'Decretos por los que se otorgan estímulos fiscales en la región fronteriza norte y sur.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta interactiva de simulación aritmética y didáctica. Los cálculos no sustituyen la asesoría contable ni eximen de las validaciones de los sistemas de facturación autorizados por el SAT.'
  },
  translations: {
    en: {
      title: 'IVA (VAT) Calculator Mexico',
      shortDescription: 'Add or extract the Value Added Tax (IVA) at the general 16%, 8% border, or 0% rate.',
      category: 'SAT Taxes',
      inputs: [
        {
          id: 'monto',
          label: 'Amount ($)',
          placeholder: 'Enter amount in pesos'
        },
        {
          id: 'tipo_accion',
          label: 'What do you want to do?',
          options: [
            { label: 'Add IVA (Calculate on top of subtotal)', value: 'agregar' },
            { label: 'Extract IVA (Separate from a total with IVA included)', value: 'desglosar' }
          ]
        },
        {
          id: 'tasa',
          label: 'IVA (VAT) Rate',
          options: [
            { label: 'General (16%)', value: 16 },
            { label: 'Border (8%)', value: 8 },
            { label: 'Zero Rate (0%)', value: 0 }
          ]
        }
      ],
      content: {
        whatItDoes: 'Instantly calculates the Value Added Tax (IVA) in Mexico under two operating modes: adding tax onto a net subtotal, or extracting tax from a gross price that already includes it, supporting the 16% general rate, 8% border incentive, and 0% rate.',
        whoShouldUse: [
          'Businesses and individuals issuing or receiving Mexican electronic invoices (CFDI 4.0)',
          'Independent contractors and freelancers pricing services for Mexican clients',
          'Retailers setting consumer-facing prices with inclusive VAT',
          'Consumers verifying the exact tax breakdown on Mexican purchases'
        ],
        howItWorks: 'Select whether to add or extract VAT, input the monetary amount, and select the tax rate. The engine applies exact inverse or direct arithmetic logic to output the subtotal, VAT, and grand total.',
        explanation: 'The Value Added Tax (IVA) is an indirect consumption tax in Mexico applied to the transfer of goods, independent service provision, leasing of goods, and imports. The general statutory rate is 16%, with an 8% reduced rate in authorized Northern and Southern border zones, and a 0% rate for staple foodstuffs and patent medicines.',
        formula: 'To Add IVA:\nTotal = Subtotal * (1 + Rate)\n\nTo Extract IVA:\nSubtotal = Total / (1 + Rate)\nIVA = Total - Subtotal',
        example: 'Adding 16% VAT to $1,000 MXN:\n• Base Subtotal: $1,000.00 MXN\n• VAT (16%): $160.00 MXN\n• Invoiced Total: $1,160.00 MXN\n\nExtracting 16% VAT from $1,160 MXN:\n• Subtotal: $1,160 ÷ 1.16 = $1,000.00 MXN\n• Extracted VAT: $160.00 MXN',
        legislation: 'Value Added Tax Law (LIVA), Articles 1 (16% General Rate), 1-A (Withholdings), 2-A (0% Rate), and Northern/Southern Border Tax Incentive Decrees.',
        tips: [
          'Ensure monetary amounts align with the standard 2-decimal rounding requirement of SAT CFDI 4.0 technical specifications.',
          'Remember that freelance individuals billing Mexican corporations are subject to 2/3 VAT withholding (10.6667%) and 10% ISR withholding.',
          'Collected VAT must be credited against input VAT paid on strictly necessary business expenses when filing monthly returns.'
        ],
        assumptions: [
          'Assumes the transaction is subject to the chosen rate and not legally exempt under Articles 9 or 15 of the LIVA.',
          'Calculations are rounded to standard cents in Mexican Pesos (MXN).'
        ],
        limitations: [
          'Does not compute simultaneous excise duties (IEPS).',
          'Does not calculate mixed-activity crediting ratios.'
        ],
        faqs: [
          {
            question: 'Why can’t I just multiply the total by 0.16 to extract VAT?',
            answer: 'Because the total represents 116% of the base cost. Multiplying $1,160 by 0.16 produces $185.60 (incorrect). The arithmetically correct formula divides the total by 1.16 to obtain the $1,000.00 subtotal.'
          },
          {
            question: 'Who qualifies for the 8% border VAT rate?',
            answer: 'Only taxpayers officially registered in the SAT Border Incentive Registry operating within authorized border municipalities with physical delivery of goods or services in those zones.'
          }
        ],
        sources: [
          {
            name: 'Mexican Tax Administration Service (SAT)',
            url: 'https://www.sat.gob.mx',
            description: 'Official portal for federal tax laws, rulings, and withholding guides.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational simulation tool. It does not replace official tax filings or certified PAC invoicing software.'
      }
    }
  }
};
