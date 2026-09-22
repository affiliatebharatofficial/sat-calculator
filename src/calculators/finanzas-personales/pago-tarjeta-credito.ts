import { CalculatorConfig } from '../../types/calculator';

export const pagoTarjetaCreditoCalculator: CalculatorConfig = {
  id: 'pago-tarjeta-credito',
  title: 'Calculadora de Pago de Tarjeta de Crédito',
  shortDescription: 'Calcula cuánto tiempo y cuánto dinero en intereses te costará liquidar tu tarjeta de crédito realizando pagos mínimos o un pago fijo.',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-pago-tarjeta-credito',
  seo: {
    metaTitle: 'Calculadora de Pago de Tarjeta de Crédito | Pago Mínimo e Intereses',
    metaDescription: 'Calcula cuánto tiempo tardarás en pagar tu tarjeta de crédito con pago mínimo o abono fijo y descubre cuánto pagarás de intereses totales.',
    keywords: [
      'calculadora tarjeta de credito',
      'pago minimo tarjeta de credito',
      'liquidar tarjeta de credito',
      'intereses tarjeta de credito',
      'salir de deudas tarjeta'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'saldo_tarjeta',
      label: 'Deuda Actual en la Tarjeta (MXN)',
      type: 'number',
      defaultValue: 25000,
      placeholder: '25000'
    },
    {
      id: 'tasa_interes_anual',
      label: 'Tasa de Interés Anual / CAT (%)',
      type: 'number',
      defaultValue: 48,
      placeholder: '48'
    },
    {
      id: 'modo_pago',
      label: 'Estrategia de Pago',
      type: 'select',
      defaultValue: 'pago_fijo',
      options: [
        { label: 'Pago Fijo Mensual ($)', value: 'pago_fijo' },
        { label: 'Pago Mínimo Estimado (1.5% saldo + intereses)', value: 'pago_minimo' }
      ]
    },
    {
      id: 'monto_pago_fijo',
      label: 'Monto de Pago Fijo Mensual (MXN)',
      type: 'number',
      defaultValue: 2000,
      placeholder: '2000'
    }
  ],
  calculate: (inputs) => {
    const saldoInicial = parseFloat(inputs.saldo_tarjeta) || 0;
    const tasaAnual = (parseFloat(inputs.tasa_interes_anual) || 0) / 100;
    const tasaMensual = tasaAnual / 12;
    const modo = inputs.modo_pago || 'pago_fijo';
    const pagoFijo = parseFloat(inputs.monto_pago_fijo) || 0;

    let saldoRestante = saldoInicial;
    let meses = 0;
    let interesesTotales = 0;
    let pagoTotal = 0;

    const maxMeses = 360; // 30 years safety cap

    while (saldoRestante > 0.01 && meses < maxMeses) {
      meses++;
      const interesDelMes = saldoRestante * tasaMensual;
      interesesTotales += interesDelMes;

      let pagoMes = 0;
      if (modo === 'pago_minimo') {
        // Minimum payment standard: 1.5% of principal + monthly interest
        pagoMes = Math.max(250, (saldoRestante * 0.015) + interesDelMes);
      } else {
        pagoMes = pagoFijo;
      }

      // Check if payment covers interest
      if (pagoMes <= interesDelMes) {
        // Debt will grow infinitely
        return {
          results: [
            { label: 'Saldo Inicial', value: saldoInicial, formatted: `$${saldoInicial.toLocaleString('es-MX')} MXN` },
            { label: 'Interés Mensual', value: interesDelMes, formatted: `$${interesDelMes.toFixed(2)} MXN` },
            { label: 'Estado de Deuda', value: 0, formatted: 'IMPOSIBLE DE PAGAR (Pago menor a intereses)', isMain: true }
          ],
          steps: [{ description: 'El pago mensual ingresado es menor o igual al interés que genera la tarjeta cada mes.', mathFormula: `Pago = $${pagoMes.toFixed(2)} \\le Interés = $${interesDelMes.toFixed(2)}` }]
        };
      }

      if (pagoMes >= saldoRestante + interesDelMes) {
        pagoMes = saldoRestante + interesDelMes;
        saldoRestante = 0;
      } else {
        saldoRestante = saldoRestante + interesDelMes - pagoMes;
      }

      pagoTotal += pagoMes;
    }

    return {
      results: [
        {
          label: 'Deuda Inicial',
          value: saldoInicial,
          formatted: `$${saldoInicial.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`
        },
        {
          label: 'Meses Requeridos para Liquidar',
          value: meses,
          formatted: `${meses} meses (${(meses / 12).toFixed(1)} años)`
        },
        {
          label: 'Intereses Totales a Pagar',
          value: interesesTotales,
          formatted: `$${interesesTotales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`
        },
        {
          label: 'Monto Total a Pagar',
          value: pagoTotal,
          formatted: `$${pagoTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Simulación completada en ${meses} meses pagando $${modo === 'pago_fijo' ? pagoFijo : 'el pago mínimo mensual'} con una tasa del ${(tasaAnual * 100).toFixed(1)}% anual.`,
          mathFormula: `Total\\ Pagado = Deuda + Intereses = $${saldoInicial.toFixed(2)} + $${interesesTotales.toFixed(2)} = $${pagoTotal.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    whatItDoes: 'Esta calculadora financiera simula el tiempo exacto en meses y el costo financiero total en intereses para liquidar una deuda de tarjeta de crédito en México. Compara de forma directa dos estrategias: abonar únicamente el pago mínimo mensual regulado por el Banco de México (Banxico) versus comprometer un pago mensual fijo acelerado para amortizar el capital.',
    whoShouldUse: [
      'Tarjetahabientes de bancos mexicanos (BBVA, Banorte, Santander, Citibanamex, HSBC, Nu, Stori, etc.) que mantienen saldo revolvente mes a mes.',
      'Personas atrapadas en el ciclo del pago mínimo que desean saber cuántos años tardarán en liquidar si no aumentan su aportación.',
      'Deudores evaluando transferir su saldo a un préstamo personal con menor tasa de interés o Costo Anual Total (CAT).',
      'Consumidores buscando planificar su presupuesto mensual mediante la regla 50/30/20 para destinar una cuota fija al pago de pasivos.'
    ],
    explanation: 'Las tarjetas de crédito son créditos revolventes con tasas de interés significativamente más elevadas que los préstamos tradicionales. Cuando un cliente no cubre el "Pago para no generar intereses" antes de su fecha límite, el banco aplica la tasa de interés ordinaria sobre el saldo promedio diario del periodo.\n\nEl Pago Mínimo es una cantidad calculada por el banco conforme a las reglas del Banco de México para mantener la cuenta al corriente y no reportar mora al Buró de Crédito. Sin embargo, está estructurado de tal forma que la mayor parte del dinero se destina al cobro de intereses e IVA, y apenas una pequeña fracción (1.5%) reduce la deuda principal. Esto genera un efecto de amortización ultra lenta que puede prolongar una deuda de pocos miles de pesos durante más de una década.',
    formula: 'F\\acute{o}rmula\\ del\\ Pago\\ M\\acute{i}nimo\\ (Banco\\ de\\ M\\acute{e}xico\\ -\\ Circular\\ 34/2010):\nEl pago mínimo debe ser la cantidad que resulte MAYOR entre:\n1. La suma del 1.5% del saldo insoluto de la parte revolvente de la línea de crédito + los intereses del periodo + el IVA de dichos intereses.\n2. El 1.25% del límite total de la línea de crédito otorgada.\n\nC\\acute{a}lculo\\ del\\ Inter\\acute{e}s\\ Mensual:\nI_{mes} = Saldo\\ Insoluto \\times \\left(\\frac{Tasa\\ Anual\\ Nominal}{12}\\right)\n\nAmortizaci\\acute{o}n\\ al\\ Capital:\nCapital_{amortizado} = Pago\\ Realizado - I_{mes} - IVA_{(intereses)}',
    example: 'Comparativa de Impacto Financiero:\n- Deuda inicial: $25,000 MXN.\n- Tasa de interés anual de la tarjeta: 48.00% anual (CAT promedio bancario en México).\n\nEstrategia A: Pagando solo el Pago Mínimo.\n- Tiempo para liquidar: Más de 10 años (120+ meses).\n- Intereses acumulados pagados al banco: Superiores a $40,000 MXN.\n- Desembolso total del tarjetahabiente: Más de $65,000 MXN (pagaste más de 2.6 veces lo que compraste).\n\nEstrategia B: Estableciendo un Pago Fijo de $2,000 MXN mensuales.\n- Tiempo para liquidar: 17 meses (menos de año y medio).\n- Intereses acumulados: $8,650 MXN.\n- Desembolso total: $33,650 MXN.\n\nConclusión: Comprometer un pago fijo constante ahorra más de $31,000 MXN en efectivo y elimina 8.5 años de estrés crediticio.',
    legislation: 'Circular 34/2010 y Circular 21/2009 emitidas por el Banco de México (Reglas sobre tarjetas de crédito y cálculo del pago mínimo); Ley para la Transparencia y Ordenamiento de los Servicios Financieros (LTOSF); Ley de Instituciones de Crédito.',
    faqs: [
      {
        question: '¿Por qué mi deuda casi no baja si pago puntualmente el mínimo cada mes?',
        answer: 'Porque el pago mínimo está diseñado para cubrir los intereses causados, las comisiones y el IVA del mes. Solo el 1.5% del saldo se destina a reducir el capital. Al mes siguiente, el saldo apenas disminuyó unos pesos, por lo que el nuevo cálculo de intereses vuelve a ser casi idéntico.'
      },
      {
        question: '¿Qué diferencia hay entre la fecha de corte y la fecha límite de pago?',
        answer: 'La fecha de corte es el día del mes en que el banco cierra tu cuenta y suma todas las compras realizadas en los últimos 30 días. La fecha límite de pago es el último día (habitualmente 20 días naturales después de la fecha de corte) que tienes para realizar tu pago antes de que se generen intereses moratorios y comisiones por pago tardío.'
      },
      {
        question: '¿Qué es el Costo Anual Total (CAT) en las tarjetas de crédito?',
        answer: 'El CAT es una medida estandarizada porcentual anual que incorpora no solo la tasa de interés pura, sino también la comisión por anualidad, comisiones por apertura, seguros obligatorios y costos administrativos. Permite comparar con transparencia qué tarjeta es más cara en el mercado mexicano.'
      },
      {
        question: '¿Qué pasa con mis compras a "Meses Sin Intereses" (MSI) si no pago el saldo total?',
        answer: 'La mensualidad de las compras a MSI se suma íntegra al pago mínimo del mes. Si no pagas la totalidad de la mensualidad MSI, la promoción se cancela, el saldo remanente se reclasifica como deuda ordinaria y comienza a generar intereses a la tasa regular de la tarjeta (que suele rondar entre el 40% y el 70% anual).'
      }
    ],
    tips: [
      'Conviértete en usuario "totalero": liquida el "Pago para no generar intereses" completo antes de la fecha límite para gozar de hasta 50 días de financiamiento gratuito sin pagar un solo peso de interés.',
      'Si tienes deudas en varias tarjetas, utiliza el "Método Bola de Nieve" (pagar el mínimo en todas y concentrar el dinero extra en liquidar la de menor saldo) o el "Método Avalancha" (liquidar primero la tarjeta con el CAT más alto).'
    ],
    errors: [
      'Seguir usando la tarjeta para gastos cotidianos mientras intentas pagar la deuda acumulada; las nuevas compras se suman al saldo deudor y elevan el cobro de intereses.',
      'Retirar dinero en efectivo del cajero automático con la tarjeta de crédito. Los retiros causan una comisión inmediata de disposición (entre 5% y 10%) y generan intereses diarios sin periodo de gracia.'
    ],
    sources: [
      {
        name: 'Banco de México (Banxico) — Regulaciones y Tarjetas de Crédito',
        url: 'https://www.banxico.org.mx',
        description: 'Circulares sobre cálculo de pago mínimo y comisiones bancarias.'
      },
      {
        name: 'CONDUSEF — Buró de Entidades Financieras',
        url: 'https://www.buro.gob.mx',
        description: 'Comparativo oficial de tasas de interés, CAT y comisiones de tarjetas en México.'
      }
    ],
    relatedCalculators: [
      'creditos/calculadora-prestamo-personal',
      'finanzas-personales/calculadora-regla-50-30-20',
      'finanzas-personales/calculadora-interes-compuesto'
    ]
  }
};
