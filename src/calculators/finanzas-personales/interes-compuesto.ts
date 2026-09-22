import { CalculatorConfig } from '../../types/calculator';

export const compoundInterestCalculator: CalculatorConfig = {
  id: 'calculo-interes-compuesto',
  title: 'Calculadora de Interés Compuesto',
  shortDescription: 'Visualiza el crecimiento de tus ahorros e inversiones a largo plazo aplicando interés compuesto y aportaciones mensuales.',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-interes-compuesto',
  seo: {
    metaTitle: 'Calculadora de Interés Compuesto 2026 - Ahorro, Inversión y Retiro',
    metaDescription: 'Simula el crecimiento de tu capital con interés compuesto y aportaciones mensuales en México. Conoce la Regla del 72, rendimiento real y proyección a largo plazo.',
    keywords: ['calculadora interes compuesto', 'interes compuesto ahorro', 'regla del 72 finanzas', 'crecimiento de capital', 'planificacion retiro mexico', 'simulador de inversion'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'capital_inicial',
      label: 'Depósito Inicial ($)',
      type: 'number',
      defaultValue: 10000,
      placeholder: 'Capital de arranque',
      suffix: 'MXN'
    },
    {
      id: 'aportacion_mensual',
      label: 'Aportación Mensual Adicional ($)',
      type: 'number',
      defaultValue: 1000,
      placeholder: 'Cantidad a ahorrar cada mes',
      suffix: 'MXN'
    },
    {
      id: 'tasa_anual',
      label: 'Tasa de Interés Anual Estimada (%)',
      type: 'number',
      defaultValue: 10.00,
      placeholder: 'Ej: 10.00 %'
    },
    {
      id: 'anos',
      label: 'Plazo (Años)',
      type: 'number',
      defaultValue: 10,
      placeholder: 'Años de ahorro'
    }
  ],
  calculate: (inputs) => {
    const capitalInicial = parseFloat(inputs.capital_inicial) || 0;
    const aportacionMensual = parseFloat(inputs.aportacion_mensual) || 0;
    const tasaAnual = parseFloat(inputs.tasa_anual) || 0;
    const years = parseInt(inputs.anos) || 10;

    const monthlyRate = tasaAnual / 12 / 100;
    const totalMonths = years * 12;

    let balance = capitalInicial;
    let totalInvertido = capitalInicial;
    let totalIntereses = 0;

    for (let m = 1; m <= totalMonths; m++) {
      const interesGanado = balance * monthlyRate;
      balance += interesGanado + aportacionMensual;
      totalInvertido += aportacionMensual;
      totalIntereses += interesGanado;
    }

    const steps = [
      {
        description: `Se inicia con un capital base de $${capitalInicial.toLocaleString('es-MX', { minimumFractionDigits: 2 })}.`,
      },
      {
        description: `Cada mes, el capital acumulado genera intereses a una tasa mensual del ${(monthlyRate * 100).toFixed(4)}% y se le suma una aportación periódica de $${aportacionMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}.`,
      },
      {
        description: `Al cabo de ${totalMonths} meses (${years} años), el capital total aportado por el ahorrador suma $${totalInvertido.toLocaleString('es-MX', { minimumFractionDigits: 2 })}.`,
      },
      {
        description: `Los intereses generados y reinvertidos de forma compuesta sumaron un total de $${totalIntereses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}.`,
        mathFormula: `Total\\ Acumulado = Capital\\ Invertido + Intereses = $${totalInvertido.toFixed(2)} + $${totalIntereses.toFixed(2)} = $${balance.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'Capital Total Aportado', value: totalInvertido, formatted: `$${totalInvertido.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Total de Intereses Generados', value: totalIntereses, formatted: `$${totalIntereses.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Tasa Mensual Equivalente', value: monthlyRate * 100, formatted: `${(monthlyRate * 100).toFixed(4)} %` },
        { label: 'Saldo Total Acumulado', value: balance, formatted: `$${balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Esta calculadora simula la evolución patrimonial de una inversión o fondo de ahorro a lo largo del tiempo bajo el modelo de interés compuesto con aportaciones periódicas recurrentes. Permite proyectar con exactitud matemática cuánto dinero habrás aportado de tu bolsillo versus cuánto dinero provendrá directamente de los intereses reinvertidos que generaron más intereses.',
    whoShouldUse: [
      'Ahorradores e inversionistas particulares que planean su fondo de retiro o compra de vivienda a mediano y largo plazo.',
      'Personas que invierten en pagarés bancarios, fondos de deuda o CETES con opción de reinversión automática al vencimiento.',
      'Profesionistas y asalariados interesados en comparar el crecimiento geométrico frente al ahorro tradicional en cuenta corriente sin rendimientos.',
      'Padres de familia diseñando fondos de educación universitaria para sus hijos.'
    ],
    explanation: 'El interés compuesto representa la reinversión sistemática de los rendimientos generados sobre un capital inicial. En cada ciclo de capitalización (por ejemplo, cada mes), los intereses causados no se retiran, sino que se integran al saldo principal. En el siguiente ciclo, los nuevos intereses se calculan sobre esta base mayor. Este mecanismo transforma el crecimiento lineal en una curva exponencial (efecto "bola de nieve").',
    formula: 'A = P \\times \\left(1 + \\frac{r}{n}\\right)^{n \\times t} + PMT \\times \\left[ \\frac{\\left(1 + \\frac{r}{n}\\right)^{n \\times t} - 1}{\\frac{r}{n}} \\right]\n\nDonde:\n- A = Saldo final total acumulado.\n- P = Capital inicial invertido.\n- PMT = Aportación mensual recurrente.\n- r = Tasa de interés anual nominal en decimales (ej. 10% = 0.10).\n- n = Frecuencia de capitalización al año (mensual = 12).\n- t = Plazo total proyectado en años.',
    example: 'Caso práctico a 10 años:\n1. Capital inicial: $10,000 MXN.\n2. Aportación mensual: $1,000 MXN.\n3. Tasa de interés anual estimada: 10.00% fija anual (capitalizable mensualmente a 0.8333% mensual).\n\nResultados numéricos:\n- Aportaciones totales del usuario: $10,000 iniciales + (120 meses x $1,000) = $130,000 MXN.\n- Intereses generados y reinvertidos: $74,845.14 MXN.\n- Saldo final disponible: $204,845.14 MXN.\n\nEn este escenario, más del 36% del capital final acumulado corresponde a ganancias generadas sin que el usuario haya tenido que desembolsarlo directamente.',
    legislation: 'Código de Comercio de México (Artículo 363, que reconoce la validez del anatocismo o capitalización de intereses mediante estipulación contractual expresa); Ley de los Sistemas de Ahorro para el Retiro (SAR); Disposiciones regulatorias de la Comisión Nacional Bancaria y de Valores (CNBV).',
    faqs: [
      {
        question: '¿Qué es la "Regla del 72" y cómo se relaciona con el interés compuesto?',
        answer: 'La Regla del 72 es una fórmula matemática abreviada para estimar en cuántos años se duplicará una inversión a interés compuesto sin aportaciones adicionales. Basta con dividir 72 entre la tasa de interés anual estimada. Por ejemplo, a una tasa del 9% anual, tu dinero tardará aproximadamente 8 años (72 / 9 = 8) en duplicarse.'
      },
      {
        question: '¿Cuál es la diferencia fundamental con el interés simple?',
        answer: 'En el interés simple, los rendimientos devengados se pagan o se retiran al finalizar cada periodo, de modo que el capital sobre el cual se calcula el interés permanece inalterado y las ganancias crecen de forma lineal. En el interés compuesto, los intereses se suman al saldo principal, generando un crecimiento exponencial.'
      },
      {
        question: '¿Qué instrumentos financieros en México aplican interés compuesto?',
        answer: 'En México puedes aprovechar el interés compuesto en cuentas de ahorro a plazo con renovación automática de capital más intereses, pagarés bancarios con capitalización periódica, aportaciones voluntarias en AFORE, Sociedades Financieras Populares (SOFIPOS) con pago de intereses reinvertibles y plataformas gubernamentales como CETES Directo activando la instrucción de reinversión automática.'
      },
      {
        question: '¿Debo pagar impuestos sobre los intereses generados en México?',
        answer: 'Sí. Conforme a los Artículos 54 y 135 de la Ley del Impuesto Sobre la Renta (LISR), las instituciones del sistema financiero mexicano efectúan una retención provisional sobre el capital invertido (tasa fijada anualmente en la Ley de Ingresos de la Federación). En tu declaración anual de personas físicas, se calcula el impuesto definitivo sobre el interés real (ganancia obtenida por encima de la inflación anual).'
      }
    ],
    tips: [
      'El factor más determinante del interés compuesto no es el capital inicial, sino el tiempo. Empezar 5 años antes puede significar una diferencia de decenas de miles de pesos al retiro.',
      'Revisa que tu cuenta o instrumento financiero tenga configurada la opción de reinversión automática al vencimiento; de lo contrario, las ganancias quedan líquidas en cuenta corriente y no se capitalizan.'
    ],
    errors: [
      'Retirar anticipadamente los intereses mensuales para gasto corriente, lo cual interrumpe de inmediato la curva exponencial de crecimiento.',
      'Olvidar el efecto de la inflación: una tasa nominal del 10% con una inflación anual del 4.5% genera un rendimiento real aproximado del 5.5% anual.'
    ],
    sources: [
      {
        name: 'Banco de México (Banxico) — Tasas de Referencia e Indicadores',
        url: 'https://www.banxico.org.mx',
        description: 'Tasa objetivo y rendimientos de deuda soberana en México.'
      },
      {
        name: 'CONDUSEF — Simulador y Educación Financiera',
        url: 'https://www.condusef.gob.mx',
        description: 'Guías de ahorro formal, inversión a plazo y cálculo de valor futuro.'
      }
    ],
    relatedCalculators: [
      'finanzas-personales/calculadora-cetes-directo',
      'finanzas-personales/calculadora-afore',
      'finanzas-personales/calculadora-regla-50-30-20'
    ]
  }
};
