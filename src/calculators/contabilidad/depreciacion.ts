import { CalculatorConfig } from '../../types/calculator';

export const depreciacionCalculator: CalculatorConfig = {
  id: 'calculo-depreciacion-activos',
  title: 'Calculadora de Depreciación de Activos',
  shortDescription: 'Calcula la depreciación anual, mensual y acumulada de tus activos fijos de acuerdo con los porcentajes de la Ley del ISR del SAT.',
  category: 'Negocios',
  categorySlug: 'negocios',
  slug: 'calculadora-depreciacion-activos',
  seo: {
    metaTitle: 'Calculadora de Depreciación Fiscal de Activos SAT 2026 - Ley del ISR',
    metaDescription: 'Calcula la depreciación fiscal en línea recta de tus activos fijos conforme al Artículo 34 y 35 de la Ley del ISR. Tasas del SAT para cómputo, autos y mobiliario.',
    keywords: ['depreciacion de activos fijos', 'depreciacion fiscal sat', 'porcentajes depreciacion lisr', 'articulo 34 lisr', 'monto original de la inversion moi', 'depreciacion linea recta mexico'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'moi',
      label: 'Monto Original de la Inversión (MOI) ($)',
      type: 'number',
      defaultValue: 25000,
      placeholder: 'Costo total de adquisición del activo',
      suffix: 'MXN'
    },
    {
      id: 'tipo_activo',
      label: 'Tipo de Activo Fijo (Tasa SAT)',
      type: 'select',
      defaultValue: 'computadoras',
      options: [
        { label: 'Equipo de Cómputo (30% anual)', value: 'computadoras' },
        { label: 'Mobiliario y Equipo de Oficina (10% anual)', value: 'mobiliario' },
        { label: 'Vehículos de Transporte (25% anual)', value: 'vehiculos' },
        { label: 'Maquinaria y Equipo General (10% anual)', value: 'maquinaria' },
        { label: 'Edificios y Construcciones (5% anual)', value: 'construcciones' }
      ]
    },
    {
      id: 'meses_uso',
      label: 'Meses de uso en el año fiscal',
      type: 'number',
      defaultValue: 12,
      placeholder: 'Máximo 12 meses',
      suffix: 'meses'
    }
  ],
  calculate: (inputs) => {
    const moi = parseFloat(inputs.moi) || 0;
    const tipoActivo = inputs.tipo_activo;
    const meses = Math.min(12, Math.max(0, parseInt(inputs.meses_uso) || 0));

    // Official LISR depreciation rates
    const rates: Record<string, number> = {
      'computadoras': 0.30,
      'mobiliario': 0.10,
      'vehiculos': 0.25,
      'maquinaria': 0.10,
      'construcciones': 0.05
    };

    const rate = rates[tipoActivo] || 0.10;
    let descripcionActivo = 'Maquinaria y Equipo';

    switch (tipoActivo) {
      case 'computadoras':
        descripcionActivo = 'Equipo de Cómputo';
        break;
      case 'mobiliario':
        descripcionActivo = 'Mobiliario y Equipo de Oficina';
        break;
      case 'vehiculos':
        descripcionActivo = 'Vehículos';
        break;
      case 'maquinaria':
        descripcionActivo = 'Maquinaria y Equipo General';
        break;
      case 'construcciones':
        descripcionActivo = 'Edificios y Construcciones';
        break;
    }

    const depreciacionAnual = moi * rate;
    const depreciacionMensual = depreciacionAnual / 12;
    const depreciacionProporcional = depreciacionMensual * meses;
    const valorLibros = Math.max(0, moi - depreciacionProporcional);

    const steps = [
      {
        description: `Se identifica la tasa anual máxima autorizada por la Ley del ISR para este tipo de bien: ${(rate * 100).toFixed(0)}% anual.`,
        mathFormula: `Tasa\\ Anual = ${(rate * 100).toFixed(0)}\\%`
      },
      {
        description: `Se calcula la depreciación anual completa multiplicando el Monto Original de la Inversión (MOI) por la tasa oficial.`,
        mathFormula: `Depreciaci\\acute{o}n\\ Anual = MOI \\times Tasa = $${moi.toFixed(2)} \\times ${(rate * 100).toFixed(0)}\\% = $${depreciacionAnual.toFixed(2)}`
      },
      {
        description: `Se calcula la cuota mensual dividiendo la depreciación anual entre 12 meses.`,
        mathFormula: `Depreciaci\\acute{o}n\\ Mensual = \\frac{$${depreciacionAnual.toFixed(2)}}{12} = $${depreciacionMensual.toFixed(2)}`
      },
      {
        description: `Se determina la deducción proporcional del ejercicio multiplicando la cuota mensual por los ${meses} meses de uso reportados.`,
        mathFormula: `Depreciaci\\acute{o}n\\ Proporcional = $${depreciacionMensual.toFixed(2)} \\times ${meses} = $${depreciacionProporcional.toFixed(2)}`
      },
      {
        description: `Se obtiene el Valor en Libros residual restando la depreciación proporcional acumulada del MOI.`,
        mathFormula: `Valor\\ en\\ Libros = MOI - Depreciaci\\acute{o}n\\ Proporcional = $${moi.toFixed(2)} - $${depreciacionProporcional.toFixed(2)} = $${valorLibros.toFixed(2)}`
      }
    ];

    // Check vehicles deductible limits for warning
    if (tipoActivo === 'vehiculos' && moi > 175000) {
      steps.push({
        description: `⚠️ NOTA CONTABLE: Conforme al Artículo 36 de la Ley del ISR, la deducibilidad de inversiones en automóviles está topada a un máximo de $175,000 MXN para vehículos de combustión, o $250,000 MXN para híbridos/eléctricos. Aunque contablemente deprecias sobre el MOI total, fiscalmente la parte excedente es no deducible.`,
        mathFormula: `L\\acute{i}mite\\ Deducible\\ Veh\\acute{i}culos = $175,000.00\\ MXN`
      });
    }

    return {
      results: [
        { label: 'Depreciación Mensual', value: depreciacionMensual, formatted: `$${depreciacionMensual.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Depreciación Anual Completa', value: depreciacionAnual, formatted: `$${depreciacionAnual.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Depreciación Proporcional del Ejercicio', value: depreciacionProporcional, formatted: `$${depreciacionProporcional.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true },
        { label: 'Valor Residual en Libros (Fin de año)', value: valorLibros, formatted: `$${valorLibros.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Esta calculadora determina la deducción fiscal anual y mensual de inversiones en activos fijos (equipo de cómputo, mobiliario de oficina, maquinaria, vehículos de transporte y construcciones) utilizando el método oficial de línea recta y los porcentajes máximos autorizados por el Servicio de Administración Tributaria (SAT) en México.',
    whoShouldUse: [
      'Contadores públicos, auxiliares contables y directores de finanzas administrando el catálogo de activos fijos de personas morales o personas físicas con actividad empresarial.',
      'Emprendedores y profesionistas independientes que adquirieron computadoras, mobiliario o maquinaria y necesitan conocer cuánto deducir cada mes para disminuir su pago provisional de ISR.',
      'Dueños de negocios evaluando la compra de automóviles utilitarios sujetos a los topes fiscales del Artículo 36 de la LISR.'
    ],
    explanation: 'La depreciación fiscal en México es el mecanismo legal mediante el cual un contribuyente recupera el costo de adquisición de sus activos fijos a lo largo de su vida útil estimada. A diferencia de un gasto operativo corriente (como la compra de papelería o el pago de internet, que se deduce al 100% en el mes en que se paga), los activos fijos no se deducen en una sola exhibición porque conservan valor y prestan servicio durante varios ejercicios fiscales.\n\nEl SAT establece en la Ley del ISR el método de Línea Recta, aplicando un porcentaje fijo anual constante sobre el Monto Original de la Inversión (MOI), prorrateado por los meses completos de uso en el año calendario.',
    formula: '1. Depreciaci\\acute{o}n\\ Anual\\ Base:\nD_{anual} = MOI \\times Tasa\\ Anual\\ LISR\n\n2. Depreciaci\\acute{o}n\\ Mensual:\nD_{mensual} = \\frac{D_{anual}}{12}\n\n3. Deducci\\acute{o}n\\ Proporcional\\ del\\ Ejercicio:\nD_{ejercicio} = D_{mensual} \\times Meses\\ de\\ Uso\n\n4. Valor\\ en\\ Libros\\ Residual:\nVL = MOI - D_{ejercicio}',
    example: 'Caso práctico: Compra de equipo de cómputo.\n- Bien adquirido: Servidor y laptops para oficina.\n- Fecha de adquisición y puesta en uso: 1 de mayo (8 meses de uso en el ejercicio fiscal).\n- Monto Original de la Inversión (MOI): $60,000 MXN sin IVA.\n- Tasa LISR Art. 35: 30% anual (vida útil fiscal = 3 años y 4 meses).\n\nDesglose de cálculo:\n1. Depreciación anual total: $60,000 x 30% = $18,000 MXN al año.\n2. Depreciación mensual: $18,000 / 12 = $1,500 MXN al mes.\n3. Deducción proporcional del primer año (8 meses): $1,500 x 8 = $12,000 MXN.\n4. Valor en libros al 31 de diciembre: $60,000 - $12,000 = $48,000 MXN.\n\nEn la declaración anual del ejercicio, el contribuyente restará $12,000 MXN de sus ingresos acumulables por concepto de deducción de inversiones.',
    legislation: 'Artículos 31, 32, 33, 34, 35 y 36 de la Ley del Impuesto Sobre la Renta (LISR); Norma de Información Financiera NIF C-6 (Propiedades, Planta y Equipo); Código Fiscal de la Federación (CFF).',
    faqs: [
      {
        question: '¿Qué conceptos integran el Monto Original de la Inversión (MOI)?',
        answer: 'De conformidad con el Artículo 31 de la LISR, el MOI comprende el precio neto del bien, los impuestos pagados con motivo de su adquisición o importación (con excepción del IVA que se acredite), los gastos de flete, seguros, transportación, comisiones mercantiles, honorarios aduanales y los costos de instalación o acondicionamiento necesarios para poner el bien en condiciones de operación.'
      },
      {
        question: '¿A partir de qué fecha se debe comenzar a depreciar un activo ante el SAT?',
        answer: 'El Artículo 31 de la LISR otorga al contribuyente la opción de comenzar a deducir las inversiones a partir del ejercicio en que se inicie la utilización del bien, o bien, a partir del ejercicio inmediato siguiente. Una vez elegida la opción, no puede variarse para ese activo.'
      },
      {
        question: '¿Cuál es el tope legal de deducibilidad para automóviles en 2026?',
        answer: 'El Artículo 36, fracción II de la LISR establece que las inversiones en automóviles solo son deducibles hasta por un monto de $175,000 MXN para vehículos impulsados por motor de combustión interna. Para vehículos cuya propulsión sea a través de baterías eléctricas recargables o híbridos, el tope legal se eleva a $250,000 MXN. Si el vehículo supera dicho costo, la proporción excedente es no deducible para efectos de ISR y su IVA no es acreditable.'
      },
      {
        question: '¿Se debe actualizar la depreciación fiscal por inflación?',
        answer: 'Sí. Para la declaración anual, el Artículo 31 de la LISR permite multiplicar el monto de la depreciación proporcional por el Factor de Actualización, el cual resulta de dividir el Índice Nacional de Precios al Consumidor (INPC) del último mes de la primera mitad del ejercicio de uso entre el INPC del mes de adquisición del bien.'
      }
    ],
    tips: [
      'Conserva las pólizas de seguro, facturas de flete y gastos de importación junto con el CFDI de adquisición, ya que forman parte legítima del MOI y aumentan la base deducible de tu activo.',
      'Lleva un archivo o expediente digital de activos fijos con fotografía, número de serie y resguardo asignado a cada colaborador para respaldar la materialidad del activo ante revisiones del SAT.'
    ],
    errors: [
      'Deducir el 100% de la compra de una computadora o mobiliario en una sola exhibición como si fuera un gasto de papelería. El SAT rechaza esta práctica en auditorías electrónicas y reclasifica el gasto a activo fijo con recargos y multas.',
      'Olvidar dar de baja activos obsoletos o inservibles. Si un activo se destruye o deja de ser útil para generar ingresos, la LISR permite deducir el saldo pendiente de depreciar en el ejercicio en que ocurra la baja.'
    ],
    sources: [
      {
        name: 'SAT — Ley del Impuesto Sobre la Renta (LISR)',
        url: 'https://www.sat.gob.mx',
        description: 'Capítulo II, Sección II: De las Inversiones y Porcentajes Máximos Autorizados.'
      },
      {
        name: 'Cámara de Diputados — Legislación Federal Vigente',
        url: 'https://www.diputados.gob.mx/LeyesBiblio/',
        description: 'Texto íntegro oficial de la Ley del ISR y Código Fiscal de la Federación.'
      }
    ],
    relatedCalculators: [
      'negocios/calculadora-punto-equilibrio',
      'sat/calculadora-iva',
      'sat/calculadora-isr-pm'
    ]
  }
};
