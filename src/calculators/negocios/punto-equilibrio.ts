import { CalculatorConfig } from '../../types/calculator';

export const breakEvenCalculator: CalculatorConfig = {
  id: 'calculo-punto-equilibrio',
  title: 'Calculadora de Punto de Equilibrio',
  shortDescription: 'Calcula cuántas unidades o cuánto dinero necesitas vender en tu negocio para cubrir todos tus costos fijos y variables sin pérdidas.',
  category: 'Negocios',
  categorySlug: 'negocios',
  slug: 'calculadora-punto-equilibrio',
  seo: {
    metaTitle: 'Calculadora de Punto de Equilibrio 2026 - Emprendimiento México',
    metaDescription: 'Determina las ventas mínimas necesarias para cubrir los costos de tu empresa. Calcula unidades a vender y valor monetario del break-even.',
    keywords: ['calculadora punto de equilibrio', 'costos fijos y variables', 'margen de contribucion', 'finanzas emprendimiento', 'break even negocios'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'costos_fijos',
      label: 'Costos Fijos Totales Mensuales ($)',
      type: 'number',
      defaultValue: 20000,
      placeholder: 'Ej: Renta, nóminas fijas, servicios, administración',
      suffix: 'MXN'
    },
    {
      id: 'precio_unidad',
      label: 'Precio de Venta por Unidad ($)',
      type: 'number',
      defaultValue: 150,
      placeholder: 'Precio que cobras al cliente por cada artículo o servicio',
      suffix: 'MXN'
    },
    {
      id: 'costo_variable_unidad',
      label: 'Costo Variable por Unidad ($)',
      type: 'number',
      defaultValue: 70,
      placeholder: 'Materia prima, empaque, comisión de pago por cada unidad vendida',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const fijos = parseFloat(inputs.costos_fijos) || 0;
    const precio = parseFloat(inputs.precio_unidad) || 0;
    const variable = parseFloat(inputs.costo_variable_unidad) || 0;

    const margenUnitario = precio - variable;
    const margenPorcentaje = precio > 0 ? (margenUnitario / precio) : 0;

    let unidadesEquilibrio = 0;
    let dineroEquilibrio = 0;

    if (margenUnitario > 0) {
      unidadesEquilibrio = fijos / margenUnitario;
      dineroEquilibrio = unidadesEquilibrio * precio;
    }

    const steps = [
      {
        description: `Se calcula el Margen de Contribución Unitario restando el costo variable unitario del precio de venta.`,
        mathFormula: `Margen\\ Unitario = Precio - Costo\\ Variable = $${precio.toFixed(2)} - $${variable.toFixed(2)} = $${margenUnitario.toFixed(2)}`
      },
      {
        description: `Se calcula la razón del margen de contribución (margen en porcentaje respecto al precio).`,
        mathFormula: `Raz\\acute{o}n\\ de\\ Margen = \\frac{Margen\\ Unitario}{Precio} = \\frac{$${margenUnitario.toFixed(2)}}{$${precio.toFixed(2)}} = ${(margenPorcentaje * 100).toFixed(2)}\\%`
      },
      {
        description: `Se dividen los Costos Fijos Totales entre el Margen Unitario para saber cuántas unidades físicas debes vender en el mes para quedar en ceros.`,
        mathFormula: `Unidades\\ de\\ Equilibrio = \\frac{Costos\\ Fijos}{Margen\\ Unitario} = \\frac{$${fijos.toFixed(2)}}{$${margenUnitario.toFixed(2)}} = ${unidadesEquilibrio.toFixed(1)}\\ unidades`
      },
      {
        description: `Se multiplica el número de unidades por el precio de venta para obtener el volumen de ventas monetarias requerido.`,
        mathFormula: `Ventas\\ de\\ Equilibrio = Unidades \\times Precio = ${unidadesEquilibrio.toFixed(2)} \\times $${precio.toFixed(2)} = $${dineroEquilibrio.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Margen de Contribución por Unidad', value: margenUnitario, formatted: `$${margenUnitario.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Margen de Contribución (%)', value: margenPorcentaje * 100, formatted: `${(margenPorcentaje * 100).toFixed(2)} %` },
        { label: 'Unidades Físicas a Vender en el Mes', value: unidadesEquilibrio, formatted: `${Math.ceil(unidadesEquilibrio)} unidades` },
        { label: 'Ventas Requeridas para Punto de Equilibrio', value: dineroEquilibrio, formatted: `$${dineroEquilibrio.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Esta calculadora determina el umbral operativo exacto (Punto de Equilibrio o Break-Even Point) en el que los ingresos totales de una empresa o profesionista independiente igualan con precisión la suma de sus costos fijos y variables. Identifica tanto el volumen de unidades físicas a producir y vender como el importe monetario en pesos requerido para no tener pérdidas ni ganancias en el periodo.',
    whoShouldUse: [
      'Emprendedores y fundadores de startups en México evaluando la viabilidad comercial y el margen mínimo antes de lanzar un producto.',
      'Propietarios de micro y pequeñas empresas (PyMEs) fijando metas mensuales de ventas para sus equipos comerciales.',
      'Profesionistas y consultores independientes que necesitan determinar su tarifa por hora o por proyecto para cubrir su infraestructura y gastos de oficina.',
      'Comerciantes y restaurantes que desean medir el impacto de un aumento en la renta o en los insumos sobre su volumen mínimo de operación.'
    ],
    explanation: 'El punto de equilibrio es el cimiento de la contabilidad de costos y la planeación financiera estratégica. Todo negocio incurre en dos naturalezas de gasto: los Costos Fijos (aquellos que se deben pagar forzosamente cada mes, venda o no la empresa, como la renta del local, software, sueldos fijos y servicios básicos) y los Costos Variables (aquellos que se generan directamente por cada producto elaborado o servicio entregado, como materia prima, empaque, comisiones de venta y fletes).\n\nCada venta genera un Margen de Contribución Unitario (Precio menos Costo Variable). Este margen es el remanente en efectivo que "contribuye" a ir amortizando la montaña de costos fijos mensuales. En el momento en que la suma de márgenes de contribución de todas las ventas del mes iguala los costos fijos, el negocio alcanza su punto de equilibrio.',
    formula: '1. Margen\\ de\\ Contribuci\\acute{o}n\\ Unitario\\ (MCU):\nMCU = P - CVU\n\n2. Raz\\acute{o}n\\ del\\ Margen\\ de\\ Contribuci\\acute{o}n\\ (RMC):\nRMC = \\frac{MCU}{P} = \\frac{P - CVU}{P}\n\n3. Punto\\ de\\ Equilibrio\\ en\\ Unidades\\ (PE_u):\nPE_u = \\frac{CF}{MCU} = \\frac{Costos\\ Fijos\\ Totales}{Precio\\ -\\ Costo\\ Variable\\ Unitario}\n\n4. Punto\\ de\\ Equilibrio\\ en\\ Pesos\\ (PE_\\$):\nPE_\\$ = PE_u \\times P = \\frac{CF}{RMC}',
    example: 'Caso práctico: Una cafetería de especialidad en la Ciudad de México.\n- Costos fijos mensuales: $30,000 MXN (renta de local $18,000, nómina fija de barista $9,000, luz comercial e internet $3,000).\n- Precio promedio por bebida: $75.00 MXN.\n- Costo variable unitario: $25.00 MXN (granos de café de especialidad, leche entera/vegetal, vaso biodegradable, tapa y servilleta).\n\nCálculo paso a paso:\n1. Margen de contribución unitario: $75.00 - $25.00 = $50.00 MXN por bebida vendida.\n2. Razón del margen: $50.00 / $75.00 = 66.67%.\n3. Unidades de equilibrio: $30,000 / $50.00 = 600 bebidas en el mes (promedio de 20 bebidas al día).\n4. Ventas monetarias de equilibrio: 600 x $75.00 = $45,000 MXN en facturación mensual.\n\nInterpretación: Al vender la bebida número 600 del mes, la cafetería ha pagado exactamente todos sus compromisos y saldos. A partir de la bebida 601, cada taza vendida genera $50.00 MXN de utilidad neta directa antes de impuestos.',
    legislation: 'Normas de Información Financiera (NIF) en México, en especial la NIF C-4 (Inventarios y Determinación del Costo de Ventas) y NIF A-2 (Postulados Básicos de Consistencia y Asociación de Costos y Gastos con Ingresos); Código de Comercio de México (Artículo 33, obligación de llevar contabilidad analítica que permita conocer la situación financiera real del negocio).',
    faqs: [
      {
        question: '¿Qué sucede si mi costo variable unitario es mayor que mi precio de venta?',
        answer: 'Tu negocio operará con un margen de contribución negativo. Esto significa que por cada producto vendido, en lugar de aportar para cubrir la renta o la nómina, generas una pérdida directa adicional en efectivo. Bajo este escenario es matemáticamente imposible alcanzar el punto de equilibrio; debes subir el precio de inmediato o renegociar con proveedores para reducir el costo de insumos.'
      },
      {
        question: '¿Cómo calculo el punto de equilibrio si tengo múltiples productos con diferentes precios y costos?',
        answer: 'Cuando vendes un catálogo variado de productos (por ejemplo, una tienda de ropa o una ferretería), se calcula el "Punto de Equilibrio Multiproyecto" utilizando el Margen de Contribución Ponderado. Se asigna un porcentaje de participación a cada producto en la mezcla de ventas total y se divide el costo fijo global entre dicho margen promedio ponderado.'
      },
      {
        question: '¿Alcanzar el punto de equilibrio significa que mi negocio tiene éxito?',
        answer: 'No. El punto de equilibrio representa únicamente la supervivencia: ganar $0.00 pesos netos. La meta financiera de cualquier empresa con fines de lucro debe incluir una "utilidad deseada". Para calcular las ventas necesarias con ganancia objetivo, simplemente sumas la utilidad pretendida a los costos fijos en el numerador de la fórmula: Ventas = (Costos Fijos + Utilidad Deseada) / Margen.'
      },
      {
        question: '¿Por qué la depreciación contable se considera dentro de los costos fijos?',
        answer: 'Porque el desgaste de la maquinaria, mobiliario o equipo de transporte de tu negocio ocurre con el paso del tiempo independientemente del nivel de producción. Si no incluyes la depreciación en tus costos fijos, estarás subsidiando precios con el desgaste paulatino de tus activos fijos sin generar la reserva de capital necesaria para reponerlos en el futuro.'
      }
    ],
    tips: [
      'Revisa tus costos variables al menos trimestralmente; los incrementos inflacionarios en insumos elevan silenciosamente tu punto de equilibrio sin que te des cuenta.',
      'Analiza la posibilidad de "variabilizar" costos fijos cuando estás empezando (por ejemplo, comisiones sobre ventas en lugar de sueldos fijos elevados o renta en esquemas de porcentaje) para reducir el umbral de riesgo de tu negocio.'
    ],
    errors: [
      'Confundir un gasto semivariable (como la energía eléctrica que tiene una cuota fija de contrato más consumo por kilowatt) con un costo 100% variable unitario.',
      'Fijar precios calculando un porcentaje arbitrario sobre el costo sin calcular primero el volumen de equilibrio para saber si tu mercado local realmente puede absorber esa cantidad de unidades.'
    ],
    sources: [
      {
        name: 'Secretaría de Economía de México — Guía para la Planeación Financiera de PyMEs',
        url: 'https://www.gob.mx/se',
        description: 'Metodología oficial para determinación de costos y fijación de precios en microempresas.'
      },
      {
        name: 'Instituto Mexicano de Contadores Públicos (IMCP) — Normas de Información Financiera',
        url: 'https://imcp.org.mx',
        description: 'Postulados contables de costos fijos, inventarios y márgenes de operación en México.'
      }
    ],
    relatedCalculators: [
      'negocios/calculadora-depreciacion-activos',
      'sat/calculadora-iva',
      'sat/calculadora-isr-pm'
    ]
  }
};
