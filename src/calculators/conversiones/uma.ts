import { CalculatorConfig } from '../../types/calculator';

const UMA_HISTORIC_RATES: Record<number, { diario: number, mensual: number, anual: number }> = {
  2026: { diario: 117.29, mensual: 3565.61, anual: 42794.64 },
  2025: { diario: 113.14, mensual: 3439.46, anual: 41273.52 },
  2024: { diario: 108.57, mensual: 3300.53, anual: 39606.36 },
  2023: { diario: 103.74, mensual: 3153.70, anual: 37844.40 },
  2022: { diario: 96.22, mensual: 2925.09, anual: 35101.08 }
};

export const umaCalculator: CalculatorConfig = {
  id: 'calculo-uma',
  title: 'Conversor de UMA a Pesos',
  shortDescription: 'Convierte unidades de UMA (Unidad de Medida y Actualización) a pesos mexicanos para el cálculo de deducciones personales, multas y topes del SAT.',
  category: 'Impuestos SAT',
  categorySlug: 'sat',
  slug: 'calculadora-conversor-uma',
  seo: {
    metaTitle: 'Calculadora de UMA a Pesos 2026 - Conversor Histórico Oficial INEGI',
    metaDescription: 'Convierte UMA (Unidad de Medida y Actualización) a pesos mexicanos 2026. Valores oficiales del INEGI: diario ($117.29), mensual ($3,565.61) y anual ($42,794.64).',
    keywords: ['conversor uma a pesos', 'valor de la uma 2026', 'equivalencia uma sat', 'unidad de medida y actualizacion', 'tope 5 umas deducciones', 'calculo uma pesos inegi'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'unidades_uma',
      label: 'Cantidad de UMA a convertir',
      type: 'number',
      defaultValue: 10,
      placeholder: 'Ej: 10 UMAS'
    },
    {
      id: 'ano_uma',
      label: 'Año fiscal',
      type: 'select',
      defaultValue: 2026,
      options: [
        { label: '2026 (Vigente)', value: 2026 },
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 },
        { label: '2023', value: 2023 },
        { label: '2022', value: 2022 }
      ]
    },
    {
      id: 'frecuencia_uma',
      label: 'Tipo de Valor UMA',
      type: 'select',
      defaultValue: 'diario',
      options: [
        { label: 'Diario', value: 'diario' },
        { label: 'Mensual', value: 'mensual' },
        { label: 'Anual', value: 'anual' }
      ]
    }
  ],
  calculate: (inputs) => {
    const unidades = parseFloat(inputs.unidades_uma) || 0;
    const ano = parseInt(inputs.ano_uma) || 2026;
    const frecuencia = inputs.frecuencia_uma;

    const rates = UMA_HISTORIC_RATES[ano] || UMA_HISTORIC_RATES[2026];
    const rateValue = rates[frecuencia as 'diario' | 'mensual' | 'anual'] || rates.diario;

    const pesosEquivalentes = unidades * rateValue;

    const steps = [
      {
        description: `Se identifica el valor oficial de la UMA para el ejercicio fiscal ${ano} publicado por el INEGI bajo el esquema "${frecuencia}": $${rateValue.toFixed(2)} MXN.`,
      },
      {
        description: `Se multiplican las ${unidades} unidades de UMA por la tasa oficial en pesos para obtener la equivalencia exacta.`,
        mathFormula: `Pesos\\ Equivalentes = UMAS \\times Valor\\ UMA = ${unidades} \\times $${rateValue.toFixed(2)} = $${pesosEquivalentes.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Valor de 1 UMA Oficial', value: rateValue, formatted: `$${rateValue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'UMA Diario del año', value: rates.diario, formatted: `$${rates.diario.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` },
        { label: 'UMA Mensual del año', value: rates.mensual, formatted: `$${rates.mensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` },
        { label: 'UMA Anual del año', value: rates.anual, formatted: `$${rates.anual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` },
        { label: 'Pesos Mexicanos Equivalentes', value: pesosEquivalentes, formatted: `$${pesosEquivalentes.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Esta calculadora convierte cualquier cantidad de unidades UMA (Unidad de Medida y Actualización) a pesos mexicanos corrientes (MXN) para los valores oficiales vigentes fijados por el INEGI. Permite calcular con certeza el costo de multas de tránsito, sanciones fiscales, cuotas obrero-patronales del IMSS y el tope máximo de deducciones personales del Artículo 151 de la Ley del ISR.',
    whoShouldUse: [
      'Contribuyentes personas físicas calculando el tope de 5 UMAs anuales para sus deducciones personales en la declaración anual del SAT.',
      'Contadores y departamentos de nómina determinando los topes exentos de aguinaldo (30 UMAs), prima vacacional (15 UMAs) y PTU (15 UMAs).',
      'Abogados y ciudadanos verificando el importe exacto en pesos de multas administrativas, infracciones de tránsito o sanciones del Código Fiscal.',
      'Trabajadores con créditos hipotecarios del Infonavit reestructurados en Unidades Mixtas o referenciados a la UMA.'
    ],
    explanation: 'La UMA fue creada mediante reforma constitucional publicada en el Diario Oficial de la Federación el 27 de enero de 2016 con un propósito fundamental: desindexar el salario mínimo. Antes de 2016, todas las leyes mexicanas expresaban multas y derechos en "Veces Salario Mínimo" (VSM). Cuando el salario mínimo subía para beneficiar a la clase trabajadora, automáticamente se disparaba el costo de las multas y la deuda de los créditos de vivienda, generando inflación artificial.\n\nAl crearse la UMA, el salario mínimo pudo incrementarse de forma independiente, mientras que la UMA se ajusta anualmente con base estricta en el Índice Nacional de Precios al Consumidor (inflación anual del año anterior). El INEGI publica los nuevos valores en enero de cada año y entran en vigor el 1 de febrero.',
    formula: 'Pesos\\ Equivalentes = Unidades\\ UMA \\times Valor\\ Unitario\\ (Diario,\\ Mensual\\ o\\ Anual)\n\nEquivalencias Oficiales UMA 2026:\n- UMA Diario: $117.29 MXN\n- UMA Mensual (Diario x 30.4): $3,565.61 MXN\n- UMA Anual (Mensual x 12): $42,794.64 MXN\n- Tope General 5 UMAs Anuales (LISR Art. 151): $213,973.20 MXN',
    example: 'Caso 1: Tope de Deducciones Personales SAT en Declaración Anual.\nEl Artículo 151 de la Ley del ISR establece que el monto total de deducciones personales generales no puede exceder el menor entre el 15% de tus ingresos o 5 UMAs anuales.\n- Cálculo del tope en 2026: 5 x $42,794.64 = $213,973.20 MXN.\nSi ganas $2,000,000 MXN anuales, tu 15% sería $300,000 MXN, pero el límite aplicable real se topa en $213,973.20 MXN.\n\nCaso 2: Exención de Aguinaldo en Nómina (Art. 93 LISR).\nEl aguinaldo está exento de pagar ISR hasta por el equivalente a 30 días de UMA diaria.\n- Cálculo de exención: 30 x $117.29 = $3,518.70 MXN libres de impuestos.',
    legislation: 'Artículo 26, Apartado B, párrafo sexto de la Constitución Política de los Estados Unidos Mexicanos; Ley para Determinar el Valor de la Unidad de Medida y Actualización; Artículo 93 y 151 de la Ley del Impuesto Sobre la Renta (LISR).',
    faqs: [
      {
        question: '¿Por qué el valor de la UMA entra en vigor el 1 de febrero y no el 1 de enero?',
        answer: 'Porque el INEGI requiere el dato de inflación acumulada de todo el año natural anterior (cerrado al 31 de diciembre). Con esa cifra, el INEGI calcula la variación anual y publica el nuevo valor de la UMA durante la primera quincena de enero en el DOF, otorgando un periodo de transición para que los sistemas informáticos y autoridades lo apliquen a partir del 1 de febrero.'
      },
      {
        question: '¿Cuál es la diferencia entre el Salario Mínimo y la UMA?',
        answer: 'El Salario Mínimo es la retribución económica mínima legal que debe recibir un trabajador por su jornada laboral para satisfacer sus necesidades básicas (fijado por la CONASAMI). La UMA es una unidad de cuenta o referencia económica puramente matemática (fijada por el INEGI) que se usa para medir topes, multas y obligaciones sin afectar el poder adquisitivo del salario.'
      },
      {
        question: '¿Las pensiones del IMSS se calculan en UMA o en salario mínimo?',
        answer: 'La Suprema Corte de Justicia de la Nación (SCJN) determinó mediante jurisprudencia que el tope máximo de las pensiones del IMSS (como el límite de 25 salarios de la Ley del Seguro Social de 1973) debe tasarse en Unidades de Medida y Actualización (UMA), no en salarios mínimos generales.'
      },
      {
        question: '¿Cómo afecta la UMA a mi crédito Infonavit?',
        answer: 'Los créditos originados antes de 2016 que estaban denominados en Veces Salario Mínimo (VSM) ahora se actualizan conforme al incremento que resulte menor entre el porcentaje de aumento de la UMA y el salario mínimo. Además, el Infonavit cuenta con el programa de Responsabilidad Compartida para convertir dichos créditos a pesos fijos.'
      }
    ],
    tips: [
      'Al presentar tu declaración anual de impuestos, verifica si el ejercicio fiscal que estás declarando corresponde al año calendario anterior (donde aplica el valor de la UMA de ese ejercicio previo).',
      'Si recibes bonos, finiquitos o liquidaciones, recuerda que los conceptos exentos de ISR (prima de antigüedad hasta 90 UMAs, aguinaldo 30 UMAs) se cuantifican con la UMA diaria vigente en la fecha del pago.'
    ],
    errors: [
      'Utilizar el valor del Salario Mínimo General ($248.93+ MXN) para calcular el tope de deducciones personales. El SAT rechaza automáticamente deducciones que tomen el salario mínimo en lugar de la UMA.',
      'Calcular multas multiplicando el valor mensual entre días sueltos en lugar de usar la tarifa de UMA diaria publicada.'
    ],
    sources: [
      {
        name: 'INEGI — Unidad de Medida y Actualización (UMA)',
        url: 'https://www.inegi.org.mx/temas/uma/',
        description: 'Publicación oficial histórica y vigente de los valores diario, mensual y anual de la UMA.'
      },
      {
        name: 'Diario Oficial de la Federación (DOF)',
        url: 'https://www.dof.gob.mx',
        description: 'Decretos presidenciales y resoluciones de actualización de indicadores económicos en México.'
      }
    ],
    relatedCalculators: [
      'sat/calculadora-isr-pf',
      'sat/calculadora-iva',
      'nomina/calculadora-salario-neto-bruto'
    ]
  }
};
