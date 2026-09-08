import { CalculatorConfig } from '../../types/calculator';

export const hipotecarioCalculator: CalculatorConfig = {
  id: 'calculo-hipotecario',
  title: 'Calculadora de Crédito Hipotecario',
  shortDescription: 'Calcula tu mensualidad fija para comprar casa usando amortización francesa, desglosando capital, intereses y seguro.',
  category: 'Hipotecas',
  categorySlug: 'hipotecas',
  slug: 'calculadora-credito-hipotecario',
  seo: {
    metaTitle: 'Calculadora de Crédito Hipotecario 2026 - Amortización y Mensualidad',
    metaDescription: 'Simula tu hipoteca bancaria o Infonavit en México. Calcula el pago mensual, el enganche requerido, desglose de intereses y tabla francesa.',
    keywords: ['calculadora hipotecaria', 'credito hipotecario bancario', 'tabla amortizacion francesa', 'comprar casa mensualidad', 'enganche casa mexico'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'valor_propiedad',
      label: 'Valor de la Propiedad ($)',
      type: 'number',
      defaultValue: 1500000,
      placeholder: 'Ej: $1,500,000 pesos',
      suffix: 'MXN'
    },
    {
      id: 'enganche_porcentaje',
      label: 'Porcentaje de Enganche (%)',
      type: 'number',
      defaultValue: 20,
      placeholder: 'Mínimo suele ser 10% o 20%'
    },
    {
      id: 'plazo_anos',
      label: 'Plazo del Crédito (Años)',
      type: 'select',
      defaultValue: 20,
      options: [
        { label: '5 años', value: 5 },
        { label: '10 años', value: 10 },
        { label: '15 años', value: 15 },
        { label: '20 años', value: 20 }
      ]
    },
    {
      id: 'tasa_anual',
      label: 'Tasa de Interés Anual Fija (%)',
      type: 'number',
      defaultValue: 10.50,
      placeholder: 'Ej: 10.50 %'
    },
    {
      id: 'seguros_adicionales',
      label: 'Seguros y comisiones mensuales ($)',
      type: 'number',
      defaultValue: 750,
      placeholder: 'Seguro de vida y daños mensual promedio',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const valor = parseFloat(inputs.valor_propiedad) || 0;
    const enganchePct = parseFloat(inputs.enganche_porcentaje) || 20;
    const anos = parseInt(inputs.plazo_anos) || 20;
    const tasaAnual = parseFloat(inputs.tasa_anual) || 10.50;
    const seguros = parseFloat(inputs.seguros_adicionales) || 0;

    const montoEnganche = valor * (enganchePct / 100);
    const montoCredito = Math.max(0, valor - montoEnganche);

    const tasaMensual = tasaAnual / 12 / 100;
    const n = anos * 12;

    let mensualidadBase = 0;
    if (montoCredito > 0 && tasaMensual > 0) {
      mensualidadBase = (montoCredito * tasaMensual * Math.pow(1 + tasaMensual, n)) / (Math.pow(1 + tasaMensual, n) - 1);
    } else if (montoCredito > 0) {
      mensualidadBase = montoCredito / n;
    }

    const mensualidadTotal = mensualidadBase + seguros;
    const totalPagadoTotal = mensualidadTotal * n;
    const totalIntereses = (mensualidadBase * n) - montoCredito;

    const steps = [
      {
        description: `Se calcula el Enganche Requerido y el monto neto del Crédito a financiar restándolo del valor de la propiedad.`,
        mathFormula: `Enganche = $${valor.toFixed(2)} \\times ${enganchePct}\\% = $${montoEnganche.toFixed(2)}\\\\Cr\\acute{e}dito = $${valor.toFixed(2)} - $${montoEnganche.toFixed(2)} = $${montoCredito.toFixed(2)}`
      },
      {
        description: `Se convierte la tasa anual fija del ${tasaAnual.toFixed(2)}% a tasa mensual.`,
        mathFormula: `Tasa\\ Mensual = \\frac{${tasaAnual.toFixed(2)}\\%}{12} = ${(tasaMensual * 100).toFixed(4)}\\% = ${tasaMensual.toFixed(6)}`
      },
      {
        description: `Se aplica la fórmula de amortización francesa para calcular la Mensualidad Base Fija (Capital + Interés) sobre un plazo de ${n} mensualidades (${anos} años).`,
        mathFormula: `Mensualidad\\ Base = \\frac{Cr\\acute{e}dito \\times r \\times (1 + r)^n}{(1 + r)^n - 1} = $${mensualidadBase.toFixed(2)}`
      },
      {
        description: `Se suman los seguros mensuales y comisiones obligatorias de administración para obtener la Mensualidad Total Final.`,
        mathFormula: `Mensualidad\\ Total = Mensualidad\\ Base + Seguros = $${mensualidadBase.toFixed(2)} + $${seguros.toFixed(2)} = $${mensualidadTotal.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Monto del Enganche', value: montoEnganche, formatted: `$${montoEnganche.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Neto del Crédito', value: montoCredito, formatted: `$${montoCredito.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Mensualidad Base (Solo Hipoteca)', value: mensualidadBase, formatted: `$${mensualidadBase.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Costo de Seguros Mensuales', value: seguros, formatted: `$${seguros.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Total Intereses a Pagar en el Plazo', value: totalIntereses, formatted: `$${totalIntereses.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Total de Pagos Sumados (Suma del Plazo)', value: totalPagadoTotal, formatted: `$${totalPagadoTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Mensualidad Total Estimada', value: mensualidadTotal, formatted: `$${mensualidadTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión financiera la mensualidad fija total, el desglose de amortización de capital e intereses bajo el sistema francés, el enganche inicial requerido y el costo agregado de seguros (vida y daños) para la adquisición de vivienda en México a través de la banca comercial, Infonavit o esquemas cofinanciados.',
    whoShouldUse: [
      'Personas y familias que planean comprar casa o departamento y necesitan proyectar su mensualidad conforme a la regla bancaria de no exceder el 30% a 35% de sus ingresos netos comprobables',
      'Compradores que comparan opciones de financiamiento entre bancos comerciales, Infonavit Total y Cofinavit',
      'Asesores inmobiliarios, brokers hipotecarios y desarrolladores de vivienda que brindan estimaciones transparentes a sus clientes',
      'Acreditados actuales que evalúan la sustitución o refinanciamiento de su hipoteca para mejorar condiciones de tasa o reducir plazo'
    ],
    howItWorks: 'Resta el porcentaje de enganche aportado del valor comercial de la vivienda para determinar el saldo neto a financiar (monto de crédito). Convierte la tasa de interés anual fija a su equivalente mensual periódica y aplica la fórmula de amortización progresiva francesa sobre el número total de meses pactados (plazo en años x 12). Añade la prima mensual de seguros obligatorios de vida e inmueble para determinar la mensualidad total integrada y el total acumulado de intereses devengados.',
    explanation: 'El sistema de amortización francés es el estándar predominante en la banca comercial mexicana y en los créditos de liquidez con garantía hipotecaria a tasa fija en pesos. Su principal característica es que la mensualidad base permanece constante a lo largo de todo el contrato. Sin embargo, su composición interna cambia mes con mes: durante los primeros años, al ser elevado el saldo deudor insoluto, la mayor parte de cada pago cubre intereses devengados y solo una fracción mínima amortiza capital real. Conforme transcurren los años y el capital insoluto se reduce, el pago de intereses disminuye y la amortización de capital se acelera progresivamente hasta liquidar el adeudo.',
    formula: '1. Monto del Enganche = Valor de la Propiedad * ( Porcentaje de Enganche / 100 )\n2. Monto del Crédito Hipotecario (P) = Valor de la Propiedad - Monto del Enganche\n3. Tasa Mensual Periódica (r) = Tasa Anual Fija / 12 / 100\n4. Plazo Total en Mensualidades (n) = Plazo en Años * 12\n5. Mensualidad Base Fija (M) = [ P * r * (1 + r)^n ] / [ (1 + r)^n - 1 ]\n6. Mensualidad Total Integrada = Mensualidad Base + Primas de Seguros (Vida y Daños)\n7. Total de Intereses en el Plazo = ( Mensualidad Base * n ) - P\n8. Desembolso Total Acumulado = Mensualidad Total Integrada * n',
    example: 'Para comprar una vivienda de $1,500,000.00 MXN con un 20% de enganche ($300,000.00 MXN), solicitando un crédito hipotecario de $1,200,000.00 MXN a 20 años (240 pagos) con una tasa anual fija del 10.50% y seguros mensuales de $750.00 MXN:\n• Tasa Mensual Periódica: 10.50% / 12 = 0.875% (0.00875)\n• Mensualidad Base Fija (Capital + Interés): $11,985.34 MXN\n• Seguros Mensuales Obligatorios: $750.00 MXN\n• Mensualidad Total Integrada: $11,985.34 + $750.00 = $12,735.34 MXN\n• Total de Intereses pagados al banco en 240 meses: ($11,985.34 * 240) - $1,200,000.00 = $1,676,481.60 MXN\n• Gran Total Acumulado Pagado al término del plazo: $3,056,481.60 MXN',
    legislation: 'Circular 21/2009 y Circular 34/2010 del Banco de México (Metodología del Costo Anual Total - CAT); Ley de Transparencia y de Fomento a la Competencia en el Crédito Garantizado; Ley de Instituciones de Crédito; y Código Civil Federal (Título Décimo Quinto relativo a los contratos de hipoteca).',
    tips: [
      'Prevé entre un 5% y 8% adicional del valor del inmueble para gastos iniciales de escrituración: impuestos de adquisición (ISAI/ITP), derechos de inscripción en el Registro Público de la Propiedad, avalúo comercial y honorarios del notario.',
      'Compara siempre el Costo Anual Total (CAT) y no únicamente la tasa nominal: un banco con menor tasa pero seguros más caros o comisiones de administración recurrentes puede ser más costoso en el largo plazo.',
      'Realiza abonos anticipados directo a capital durante los primeros 5 a 7 años del crédito: por regulación de CONDUSEF, no pueden cobrarte penalización por prepago en créditos a tasa fija, y cada peso anticipado reduce directamente el saldo insoluto evitando años de intereses.',
      'Solicita en enero o febrero a tu banco tu Constancia Anual de Intereses Reales Pagados: conforme al Artículo 151 de la Ley del ISR, los intereses reales devengados son una deducción personal aplicable en tu Declaración Anual del SAT.'
    ],
    assumptions: [
      'Esquema de amortización fija tradicional en moneda nacional (pesos mexicanos).',
      'Las primas mensuales de seguros se consideran uniformes a lo largo del plazo proyectado.',
      'Los pagos se efectúan puntualmente mes a mes, sin generar intereses moratorios ni recargos.',
      'No se consideran amortizaciones extraordinarias ni aportaciones patronales de subcuenta de vivienda que acorten el plazo original.'
    ],
    limitations: [
      'No calcula en automático los impuestos y derechos notariales locales de escrituración (varían de 4% a 9% según la entidad federativa).',
      'No modela hipotecas en esquemas de pago creciente ni créditos contratados en Unidades de Inversión (UDIS).',
      'No sustituye la cotización oficial vinculante ni la aprobación formal de crédito emitida por la entidad bancaria tras el análisis de riesgo y buró.'
    ],
    faqs: [
      {
        question: '¿Qué porcentaje de mis ingresos mensuales puede absorber la hipoteca?',
        answer: 'La CONDUSEF y las políticas de la banca comercial en México recomiendan que la mensualidad de tu crédito hipotecario no supere el 30% al 35% de tus ingresos netos mensuales libres de impuestos (o el 40% si consideras todos tus compromisos crediticios combinados, como tarjetas y autos).'
      },
      {
        question: '¿Qué incluye obligatoriamente el Costo Anual Total (CAT) hipotecario?',
        answer: 'El CAT es una medida estandarizada por el Banco de México expresada en porcentaje anual que incorpora la totalidad de los costos inherentes al financiamiento: la tasa de interés ordinaria, las comisiones por apertura y administración de cuenta, el costo del avalúo inicial y las primas de los seguros obligatorios de vida, invalidez y daños al inmueble.'
      },
      {
        question: '¿Puedo deducir los intereses de mi hipoteca en la Declaración Anual del SAT?',
        answer: 'Sí. El Artículo 151 Fracción IV de la Ley del Impuesto sobre la Renta permite a las personas físicas deducir los intereses reales efectivamente devengados y pagados en créditos hipotecarios destinados a su casa habitación. El interés real corresponde al interés nominal pagado menos la tasa oficial de inflación anual.'
      },
      {
        question: '¿Qué diferencia hay entre amortizar a 15 años vs 20 años?',
        answer: 'Al optar por un plazo de 15 años, la mensualidad suele incrementarse únicamente entre un 12% y un 18% respecto a la de 20 años; sin embargo, al liquidar la deuda 5 años antes, el ahorro total en intereses acumulados pagados al banco puede representar entre el 30% y el 40% del monto total del financiamiento.'
      },
      {
        question: '¿Qué ocurre con la deuda hipotecaria en caso de fallecimiento del titular?',
        answer: 'Todos los créditos hipotecarios bancarios e institucionales en México incluyen por mandato de ley un seguro de vida e invalidez total permanente. En caso de fallecimiento del titular acreditado, la aseguradora liquida el saldo insoluto remanente del crédito ante el banco, liberando el gravamen sobre la vivienda en favor de los beneficiarios designados.'
      }
    ],
    relatedCalculators: [
      'prestamos/calculadora-prestamo-personal',
      'inversiones/calculadora-cetes-directo',
      'nomina/calculadora-salario-neto-bruto'
    ],
    sources: [
      {
        name: 'CONDUSEF — Simulador y Comparador de Crédito Hipotecario',
        url: 'https://phpapps.condusef.gob.mx/condusefhipotecario/',
        description: 'Herramienta comparativa oficial de tasas de interés, CAT y ofertas crediticias de la banca comercial en México.'
      },
      {
        name: 'Banco de México (Banxico) — Circular 21/2009 (Cálculo del CAT)',
        url: 'https://www.banxico.org.mx',
        description: 'Normativa oficial que rige la transparencia y fórmulas obligatorias del Costo Anual Total en créditos garantizados.'
      },
      {
        name: 'INFONAVIT — Portal Institucional de Créditos de Vivienda',
        url: 'https://portalmx.infonavit.org.mx',
        description: 'Reglas de otorgamiento de crédito tradicional, Cofinavit y aportaciones patronales a la subcuenta de vivienda.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador financiero de orientación didáctica. Las condiciones definitivas de tasa de interés, aforo, costo de seguros y comisiones están sujetas a la evaluación del perfil de riesgo crediticio, historial en buró de crédito y dictamen de avalúo de la entidad financiera otorgante.'
  }
};
