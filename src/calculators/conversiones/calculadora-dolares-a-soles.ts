import { CalculatorConfig } from '../../types/calculator';

export const calculadoraDolaresASolesCalculator: CalculatorConfig = {
  id: 'calculo-dolares-a-soles',
  title: 'Dólares a Soles y Soles a Dólares',
  shortDescription: 'Convierte montos bidireccionalmente entre dólares (USD) y soles peruanos (PEN) con cotización SUNAT o personalizada.',
  category: 'Herramientas Perú',
  categorySlug: 'peru',
  slug: 'dolares-a-soles',
  seo: {
    metaTitle: 'Dólares a Soles y Soles a Dólares: Convertidor USD ↔ PEN',
    metaDescription: 'Convierte dólares a soles y soles a dólares con nuestro conversor bidireccional instantáneo con tasas de la SUNAT.',
    keywords: [
      'dólares a soles',
      'soles a dólares',
      'convertir dólares a soles',
      'convertir soles a dólares',
      'calculadora dólares a soles',
      'USD a PEN',
      'PEN a USD'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'direccion',
      label: 'Dirección de Conversión',
      type: 'select',
      defaultValue: 'usd_to_pen',
      options: [
        { label: 'Dólares a Soles (USD → PEN)', value: 'usd_to_pen' },
        { label: 'Soles a Dólares (PEN → USD)', value: 'pen_to_usd' }
      ]
    },
    {
      id: 'monto',
      label: 'Monto a Convertir',
      type: 'number',
      defaultValue: 100,
      placeholder: 'Ingresa la cantidad'
    },
    {
      id: 'modo_tasa',
      label: 'Modalidad de Tasa de Cambio',
      type: 'select',
      defaultValue: 'sunat_venta',
      options: [
        { label: 'Tipo de Cambio SUNAT (Venta)', value: 'sunat_venta' },
        { label: 'Tipo de Cambio SUNAT (Compra)', value: 'sunat_compra' },
        { label: 'Tipo de Cambio Personalizado', value: 'personalizado' }
      ]
    },
    {
      id: 'tasa_custom',
      label: 'Tasa Personalizada (S/ por USD)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: 'Ej: 3.75'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const direccion = inputs.direccion || 'usd_to_pen';
    const isUsdToPen = direccion === 'usd_to_pen';
    const modoTasa = inputs.modo_tasa || 'sunat_venta';
    const tasaCustom = parseFloat(inputs.tasa_custom) || 3.75;

    const tasaUtilizada = tasaCustom;
    const resultado = isUsdToPen ? (monto * tasaUtilizada) : (tasaUtilizada > 0 ? monto / tasaUtilizada : 0);

    const modoLabel = modoTasa === 'sunat_venta'
      ? 'SUNAT Venta'
      : modoTasa === 'sunat_compra'
      ? 'SUNAT Compra'
      : 'Personalizado';

    return {
      results: [
        {
          label: isUsdToPen ? 'Monto Ingresado (USD)' : 'Monto Ingresado (PEN)',
          value: monto,
          formatted: isUsdToPen ? `US$ ${monto.toFixed(2)} USD` : `S/ ${monto.toFixed(2)} PEN`
        },
        {
          label: `Tasa de Cambio Aplicada (${modoLabel})`,
          value: tasaUtilizada,
          formatted: `S/ ${tasaUtilizada.toFixed(3)} PEN`
        },
        {
          label: isUsdToPen ? 'Resultado en Soles Peruanos (PEN)' : 'Resultado en Dólares Estadounidenses (USD)',
          value: resultado,
          formatted: isUsdToPen ? `S/ ${resultado.toFixed(2)} PEN` : `US$ ${resultado.toFixed(2)} USD`,
          isMain: true
        }
      ],
      steps: [
        {
          description: isUsdToPen
            ? `Conversión de USD a PEN multiplicando el monto en dólares por la tasa de cambio.`
            : `Conversión de PEN a USD dividiendo el monto en soles entre la tasa de cambio.`,
          mathFormula: isUsdToPen
            ? `PEN = USD \\times Tasa = $${monto.toFixed(2)} \\times ${tasaUtilizada.toFixed(3)} = S/ ${resultado.toFixed(2)}`
            : `USD = \\frac{PEN}{Tasa} = \\frac{S/ ${monto.toFixed(2)}}{${tasaUtilizada.toFixed(3)}} = $${resultado.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'Esta calculadora permite convertir rápidamente dólares estadounidenses (USD) a soles peruanos (PEN). Puedes elegir entre usar la cotización oficial de la SUNAT o ingresar tu propio tipo de cambio personalizado de tu entidad bancaria o casa de cambio.',
    formula: 'Fórmula de Conversión USD a PEN:\nSoles (PEN) = Dólares (USD) × Tipo de Cambio (S/ por USD)',
    example: 'Para convertir $500 USD a soles con un tipo de cambio de S/ 3.75 por dólar:\nS/ PEN = 500 × 3.75 = S/ 1,875.00 soles.',
    legislation: 'Normas de conversión bancaria y tributaria de la República del Perú.',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre el tipo de cambio SUNAT y el personalizado?',
        answer: 'El tipo de cambio SUNAT es la cotización oficial para la declaración de impuestos y comprobantes contables. El personalizado es la tasa comercial que te ofrece tu banco o casa de cambio.'
      },
      {
        question: '¿Cuántos soles son 100 dólares?',
        answer: 'Depende de la tasa del día. Si la cotización se ubica en S/ 3.75, 100 dólares equivalen a 375 soles peruanos.'
      },
      {
        question: '¿Cuándo conviene usar la tasa de compra y cuándo la de venta?',
        answer: 'Si estás vendiendo dólares para recibir soles (ingresos), aplica la tasa de compra. Si estás comprando dólares usando soles (gastos), aplica la tasa de venta.'
      }
    ],
    tips: [
      'Compara siempre el tipo de cambio interbancario comercial con la tasa de la SUNAT antes de realizar operaciones de cambio de divisas de alto volumen.',
      'Si emites facturas electrónicas en dólares en Perú, debes usar obligatoriamente el tipo de cambio SUNAT oficial de la fecha de emisión.'
    ],
    errors: [
      'Confundir el multiplicador al convertir dólares a soles (multiplicar en lugar de dividir).'
    ]
  }
};
