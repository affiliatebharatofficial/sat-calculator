import { CalculatorConfig } from '../../types/calculator';

export const aforeCalculator: CalculatorConfig = {
  id: 'calculo-afore',
  title: 'Calculadora de AFORE y Retiro',
  shortDescription: 'Simula el saldo proyectado en tu AFORE al jubilarte y calcula la pensión mensual estimada según tus aportaciones obligatorias y voluntarias.',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-afore-retiro',
  seo: {
    metaTitle: 'Calculadora de AFORE y Retiro 2026 - Proyecta tu Pensión',
    metaDescription: 'Simula el fondo de tu AFORE para la jubilación en México. Proyecta tu pensión mensual estimada sumando aportaciones obligatorias y voluntarias.',
    keywords: ['calculadora afore', 'proyeccion de retiro', 'pension estimada mexico', 'aportaciones voluntarias afore', 'jubilacion consar'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'saldo_actual',
      label: 'Saldo Actual en tu AFORE ($)',
      type: 'number',
      defaultValue: 50000,
      placeholder: 'Consulta el saldo en tu estado de cuenta',
      suffix: 'MXN'
    },
    {
      id: 'edad_actual',
      label: 'Edad Actual (Años)',
      type: 'number',
      defaultValue: 30,
      placeholder: 'Ej: 30'
    },
    {
      id: 'edad_retiro',
      label: 'Edad de Retiro / Jubilación (Años)',
      type: 'number',
      defaultValue: 65,
      placeholder: 'Suele ser 60 o 65 años'
    },
    {
      id: 'salario_mensual',
      label: 'Salario Mensual Bruto Actual ($)',
      type: 'number',
      defaultValue: 15000,
      placeholder: 'Sueldo base para aportación obligatoria',
      suffix: 'MXN'
    },
    {
      id: 'aportacion_voluntaria',
      label: 'Aportación Voluntaria Mensual ($)',
      type: 'number',
      defaultValue: 500,
      placeholder: 'Monto extra que deseas ahorrar',
      suffix: 'MXN'
    },
    {
      id: 'rendimiento_anual',
      label: 'Rendimiento Anual Estimado del AFORE (%)',
      type: 'number',
      defaultValue: 5.5,
      placeholder: 'Promedio histórico real es entre 4% y 6%'
    }
  ],
  calculate: (inputs, lang) => {
    const saldoActual = parseFloat(inputs.saldo_actual) || 0;
    const edadActual = parseInt(inputs.edad_actual) || 30;
    const edadRetiro = parseInt(inputs.edad_retiro) || 65;
    const salario = parseFloat(inputs.salario_mensual) || 0;
    const voluntaria = parseFloat(inputs.aportacion_voluntaria) || 0;
    const rendimiento = parseFloat(inputs.rendimiento_anual) || 5.5;
    const isEn = lang === 'en';

    const anosAhorro = Math.max(0, edadRetiro - edadActual);
    const mesesAhorro = anosAhorro * 12;

    // Aportación obligatoria promedio en México es del 6.5% del salario base
    const obligatoriaMensual = salario * 0.065;
    const totalAhorroMensual = obligatoriaMensual + voluntaria;

    const rMensual = (rendimiento / 100) / 12;

    let saldoProyectado = saldoActual;
    if (mesesAhorro > 0) {
      if (rMensual > 0) {
        const factorInteres = Math.pow(1 + rMensual, mesesAhorro);
        saldoProyectado = (saldoActual * factorInteres) + (totalAhorroMensual * ((factorInteres - 1) / rMensual));
      } else {
        saldoProyectado = saldoActual + (totalAhorroMensual * mesesAhorro);
      }
    }

    // Proyección de pensión mensual considerando esperanza de vida de 20 años post-jubilación (240 meses)
    const pensionEstimada = saldoProyectado / 240;

    const steps = [
      {
        description: isEn
          ? `The total saving period is determined in years and months until retirement at ${edadRetiro} years.`
          : `Se determina el período total de ahorro en años y meses hasta la jubilación a los ${edadRetiro} años.`,
        mathFormula: `A\\tilde{n}os\\ de\\ Ahorro = ${edadRetiro} - ${edadActual} = ${anosAhorro}\\ a\\tilde{n}os\\ (${mesesAhorro}\\ meses)`
      },
      {
        description: isEn
          ? `The monthly mandatory contribution from the employee and employer is calculated (estimated at 6.5% of the base salary) plus the monthly voluntary savings.`
          : `Se calcula la aportación obligatoria mensual del trabajador y el patrón (estimada en 6.5% del sueldo ordinario) más el ahorro voluntario mensual.`,
        mathFormula: `Aportaci\\acute{o}n\\ Mensual = (Sueldo \\times 6.5\\%) + Voluntaria = ($${salario.toFixed(2)} \\times 0.065) + $${voluntaria.toFixed(2)} = $${totalAhorroMensual.toFixed(2)}`
      },
      {
        description: isEn
          ? `The monthly compound interest formula is applied to project the final balance to future value.`
          : `Se aplica la fórmula de interés compuesto mensual para proyectar el saldo final a valor futuro.`,
        mathFormula: `Saldo\\ Proyectado = Saldo\\ Inicial \\times (1 + r)^n + Ahorro\\ Mensual \\times \\frac{(1 + r)^n - 1}{r} = $${saldoProyectado.toFixed(2)}`
      },
      {
        description: isEn
          ? `The monthly pension amount is estimated assuming a programmed withdrawal over a 20-year life expectancy (240 months).`
          : `Se estima el monto mensual de pensión asumiendo un retiro programado a lo largo de 20 años de esperanza de vida (240 meses).`,
        mathFormula: `Pensi\\acute{o}n\\ Mensual = \\frac{Saldo\\ Proyectado}{240} = $${pensionEstimada.toFixed(2)}`
      }
    ];

    return {
      results: [
        { 
          label: isEn ? 'Total Monthly Contribution' : 'Aportación Mensual Total', 
          value: totalAhorroMensual, 
          formatted: `$${totalAhorroMensual.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` 
        },
        { 
          label: isEn ? 'Years to Retirement' : 'Años para el Retiro', 
          value: anosAhorro, 
          formatted: isEn ? `${anosAhorro} years` : `${anosAhorro} años` 
        },
        { 
          label: isEn ? 'Estimated AFORE Balance at Retirement' : 'Saldo Estimado en AFORE al Jubilarte', 
          value: saldoProyectado, 
          formatted: `$${saldoProyectado.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` 
        },
        { 
          label: isEn ? 'Estimated Monthly Pension' : 'Pensión Mensual Estimada', 
          value: pensionEstimada, 
          formatted: `$${pensionEstimada.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, 
          isMain: true 
        }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Proyecta el capital acumulado en tu cuenta individual de AFORE a la edad de retiro y calcula la pensión mensual estimada resultante, considerando tu saldo actual, salario base, aportaciones voluntarias recurrentes y tasa de rendimiento real esperada.',
    whoShouldUse: [
      'Trabajadores afiliados al IMSS bajo el régimen de la Ley 97 (cuentas individuales de AFORE)',
      'Profesionistas independientes o empleados que desean planificar su retiro y evaluar el impacto del ahorro voluntario',
      'Personas que buscan proyectar si su pensión futura será suficiente para mantener su nivel de vida',
      'Ahorradores que desean calcular las deducciones fiscales anuales potenciales por aportaciones a su subcuenta de retiro'
    ],
    howItWorks: 'Determina los años y meses restantes hasta la edad de jubilación proyectada. Calcula la aportación obligatoria tripartita sobre el salario bruto más la aportación voluntaria mensual. Aplica la fórmula de valor futuro con interés compuesto y anualidad ordinaria para estimar el saldo final a los 60 o 65 años, y divide dicho capital entre una esperanza de vida estándar post-jubilación (20 años o 240 mensualidades) para estimar la pensión mensual en retiro programado.',
    explanation: 'El sistema de AFORE en México funciona a través de cuentas individuales administradas por Sociedades de Inversión Especializadas en Fondos para el Retiro (SIEFORES). Las aportaciones bimestrales obligatorias provienen del patrón, del trabajador y del gobierno. Realizar aportaciones voluntarias recurrentes incrementa sustancialmente el saldo final y la pensión debido al efecto del interés compuesto a largo plazo.',
    formula: 'Fórmula de Valor Futuro de Ahorro Recurrente:\nFV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]\n\nDonde:\nFV = Saldo proyectado final\nPV = Saldo inicial actual\nPMT = Aportación mensual acumulada\nr = Tasa de rendimiento real mensual (Tasa Anual / 12)\nn = Número de meses de ahorro (Años a jubilarse * 12)',
    example: 'Si tienes 30 años, un saldo de $50,000 pesos en tu AFORE, aportas obligatoriamente por tu sueldo de $15,000 pesos ($975 pesos) y decides ahorrar voluntariamente $500 pesos extras al mes ($1,475 pesos mensuales totales) con un rendimiento promedio neto del 5.5% anual:\nAl cumplir 65 años (35 años de ahorro), el saldo estimado en tu AFORE será de $2,187,015 pesos mexicanos, lo que equivaldría a una pensión mensual estimada de $9,112 pesos mexicanos.',
    legislation: 'Ley de los Sistemas de Ahorro para el Retiro (LSAR) y Ley del Seguro Social (LSS), relativas a los regímenes de jubilación (Ley 73 y Ley 97) y las reformas a las aportaciones patronales de 2023-2030.',
    assumptions: [
      'La tasa de rendimiento seleccionada se asume constante en términos reales (descontando comisiones de la Administradora e inflación).',
      'La aportación patronal y obrera se calcula con base en la tasa legal estándar sobre el sueldo registrado.',
      'Se proyecta una expectativa de retiro programado a 20 años (240 meses) tras cumplir la edad de retiro elegida.',
      'No se contemplan retiros parciales por desempleo o matrimonio durante el periodo de acumulación.'
    ],
    limitations: [
      'No modela rentas vitalicias contratadas con aseguradoras privadas (sujetas a cotizaciones actuariales de mercado al momento del retiro).',
      'No aplica para trabajadores amparados exclusivamente por la Ley 73 del IMSS (cálculo por promedio salarial de las últimas 250 semanas).',
      'No calcula subsidios federales de la Pensión Mínima Garantizada si el saldo resulta insuficiente.'
    ],
    faqs: [
      {
        question: '¿Qué es la Ley 73 y la Ley 97 del IMSS?',
        answer: 'La Ley 73 aplica a quienes cotizaron antes del 1 de julio de 1997; su pensión se calcula por el promedio salarial de los últimos 5 años. La Ley 97 aplica a quienes empezaron a cotizar después de esa fecha; su pensión depende exclusivamente del saldo acumulado en su cuenta individual AFORE.'
      },
      {
        question: '¿Las aportaciones voluntarias son deducibles de impuestos?',
        answer: 'Sí, las aportaciones voluntarias a tu cuenta de AFORE son deducibles de impuestos en tu declaración anual, con un límite del 10% de tus ingresos anuales acumulables o hasta 5 UMA anualizadas.'
      },
      {
        question: '¿Qué son las SIEFORES Generacionales?',
        answer: 'Son los fondos donde se invierten tus recursos de acuerdo a tu año de nacimiento. A menor edad, el fondo invierte en activos con mayor rendimiento y riesgo; a mayor edad, la inversión se vuelve más conservadora para proteger tu dinero del retiro.'
      }
    ],
    tips: [
      'Configura la domiciliación de aportaciones voluntarias desde la app Afore Móvil. Automatizar tu ahorro mensual de $200 o $500 pesos incrementa tu pensión futura enormemente gracias al interés compuesto. Puedes proyectar escenarios generales con la [Calculadora de Interés Compuesto](/calculadoras/interes-compuesto/calculadora-interes-compuesto).',
      'Revisa tu estado de cuenta tres veces al año para vigilar el rendimiento neto y las comisiones cobradas por tu Administradora.'
    ],
    errors: [
      'Creer que el sueldo que registraste ante el IMSS no afecta a tu pensión. Cotizar con el salario mínimo reduce drásticamente las aportaciones de tu patrón al AFORE.',
      'Retirar dinero por desempleo o matrimonio sin reponer las semanas de cotización perdidas, lo cual aplaza tu edad de retiro.'
    ],
    relatedCalculators: [
      'nomina/calculadora-semanas-cotizadas-imss',
      'finanzas-personales/calculadora-interes-compuesto',
      'nomina/calculadora-salario-neto'
    ],
    sources: [
      {
        name: 'CONSAR — Comisión Nacional del Sistema de Ahorro para el Retiro',
        url: 'https://www.gob.mx/consar',
        description: 'Tablas oficiales de rendimiento neto de las SIEFORES Generacionales, comisiones y normativa del SAR.'
      },
      {
        name: 'IMSS — Ley del Seguro Social y Regímenes de Pensión',
        url: 'https://www.imss.gob.mx/pensiones',
        description: 'Lineamientos oficiales sobre requisitos de semanas de cotización y modalidades de retiro Ley 73 y Ley 97.'
      },
      {
        name: 'Cámara de Diputados — Ley de los Sistemas de Ahorro para el Retiro',
        url: 'https://www.diputados.gob.mx',
        description: 'Marco legislativo que regula las cuentas individuales, AFOREs y SIEFORES en México.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio 2026',
    disclaimer: 'Esta calculadora es un simulador financiero de orientación didáctica y preventiva. Los rendimientos futuros de las SIEFORES son variables y dependen de los mercados financieros. La pensión definitiva será calculada por el IMSS y tu Administradora de Fondos al momento del trámite formal de retiro conforme a las semanas reconocidas y el saldo efectivamente acumulado.'
  },
  translations: {
    en: {
      title: 'AFORE & Retirement Calculator',
      shortDescription: 'Simulate the projected balance in your AFORE upon retirement and calculate the estimated monthly pension based on your mandatory and voluntary contributions.',
      category: 'Personal Finance',
      seo: {
        metaTitle: 'AFORE & Retirement Calculator 2026 - Project Your Pension',
        metaDescription: 'Simulate your AFORE fund for retirement in Mexico. Project your estimated monthly pension by combining mandatory and voluntary contributions.',
        keywords: ['afore calculator', 'retirement projection', 'estimated pension mexico', 'voluntary contributions afore', 'consar retirement']
      },
      inputs: [
        {
          id: 'saldo_actual',
          label: 'Current Balance in your AFORE ($)',
          placeholder: 'Check the balance on your account statement'
        },
        {
          id: 'edad_actual',
          label: 'Current Age (Years)',
          placeholder: 'e.g. 30'
        },
        {
          id: 'edad_retiro',
          label: 'Retirement / Pension Age (Years)',
          placeholder: 'Usually 60 or 65 years'
        },
        {
          id: 'salario_mensual',
          label: 'Current Gross Monthly Salary ($)',
          placeholder: 'Base salary for mandatory contribution'
        },
        {
          id: 'aportacion_voluntaria',
          label: 'Voluntary Monthly Contribution ($)',
          placeholder: 'Extra amount you want to save'
        },
        {
          id: 'rendimiento_anual',
          label: 'Estimated AFORE Annual Return (%)',
          placeholder: 'Real historical average is between 4% and 6%'
        }
      ],
      content: {
        whatItDoes: 'Projects your accumulated individual AFORE balance at retirement and computes the estimated monthly pension, incorporating current savings, base salary, recurring voluntary contributions, and projected real investment yield.',
        whoShouldUse: [
          'Mexican employees contributing to IMSS under the 1997 Social Security Law (individual AFORE accounts)',
          'Independent professionals and formal workers planning retirement cash flow and voluntary savings strategies',
          'Individuals projecting whether their retirement balance will sustain their target standard of living',
          'Taxpayers assessing annual tax deduction limits on voluntary retirement contributions'
        ],
        howItWorks: 'Calculates the remaining years and months until the projected retirement age. Computes the mandatory tripartite contribution on base salary plus voluntary monthly savings. Applies the compound interest future value formula with ordinary annuity to estimate final capital at age 60 or 65, dividing the resulting balance over a standard 20-year post-retirement horizon (240 months) to project a scheduled monthly withdrawal pension.',
        explanation: 'The AFORE system in Mexico works through individual accounts managed by Retirement Fund Administrators (AFORE). The mandatory bi-monthly contributions come from the employer, the employee, and the government. Making recurring voluntary contributions substantially increases the final balance and pension due to the effect of long-term compound interest.',
        formula: 'Future Value Formula for Recurring Savings:\nFV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]\n\nWhere:\nFV = Final projected balance\nPV = Current initial balance\nPMT = Accumulated monthly contribution\nr = Monthly real return rate (Annual Rate / 12)\nn = Number of savings months (Years to retirement * 12)',
        example: 'If you are 30 years old, have a balance of $50,000 pesos in your AFORE, contribute obligatorily for your salary of $15,000 pesos ($975 pesos), and decide to voluntarily save $500 pesos extra per month ($1,475 pesos total monthly) with an average net yield of 5.5% per year:\nAt age 65 (35 years of savings), the estimated balance in your AFORE will be $2,187,015 Mexican pesos, which would equal an estimated monthly pension of $9,112 Mexican pesos.',
        legislation: 'Retirement Savings Systems Law (LSAR) and Social Security Law (LSS), relating to retirement regimes (73 Law and 97 Law) and reforms to employer contributions of 2023-2030.',
        assumptions: [
          'The chosen annual rate represents net real return (after administrator management fees and inflation).',
          'Mandatory employer and employee contributions follow standard statutory baseline rates on registered salary.',
          'Scheduled withdrawal is modeled over a 20-year post-retirement life expectancy (240 monthly payouts).',
          'Assumes uninterrupted contributions with no partial withdrawals for unemployment or marriage.'
        ],
        limitations: [
          'Does not quote private life annuities with commercial insurance carriers (which depend on prevailing market interest rates and mortality tables at retirement).',
          'Does not apply to workers grandfathered exclusively under IMSS Law 1973 (whose pension depends on average salary of final 5 years and total contribution weeks).',
          'Does not calculate statutory Federal Guaranteed Minimum Pension subsidies if accumulated funds are insufficient.'
        ],
        faqs: [
          {
            question: 'What is IMSS Law 73 and Law 97?',
            answer: 'Law 73 applies to those who contributed before July 1, 1997; their pension is calculated by the average salary of the last 5 years. Law 97 applies to those who started contributing after that date; their pension depends exclusively on the balance accumulated in their individual AFORE account.'
          },
          {
            question: 'Are voluntary contributions tax-deductible?',
            answer: 'Yes, voluntary contributions to your AFORE account are tax-deductible in your annual tax return, with a limit of 10% of your accumulated annual income or up to 5 annualized UMAs.'
          },
          {
            question: 'What are Generational SIEFORES?',
            answer: 'They are the funds where your resources are invested according to your birth year. At a younger age, the fund invests in assets with higher yield and risk; at an older age, the investment becomes more conservative to protect your money for retirement.'
          }
        ],
        tips: [
          'Set up automatic voluntary contributions from the Afore Móvil app. Automating your monthly savings of $200 or $500 pesos increases your future pension enormously thanks to compound interest. You can project general scenarios with the [Compound Interest Calculator](/calculadoras/interes-compuesto/calculadora-interes-compuesto).',
          'Review your account statement three times a year to monitor net returns and commissions charged by your Administrator.'
        ],
        errors: [
          'Believing that the salary you registered with the IMSS does not affect your pension. Contributing with the minimum wage drastically reduces your employer\'s contributions to the AFORE.',
          'Withdrawing money for unemployment or marriage without replacing the lost contribution weeks, which postpones your retirement age.'
        ],
        relatedCalculators: [
          'nomina/calculadora-semanas-cotizadas-imss',
          'finanzas-personales/calculadora-interes-compuesto',
          'nomina/calculadora-salario-neto'
        ],
        sources: [
          {
            name: 'CONSAR — National Commission of the Retirement Savings System',
            url: 'https://www.gob.mx/consar',
            description: 'Official net yield tables for Generational SIEFORE funds, administrator fees, and SAR regulations.'
          },
          {
            name: 'IMSS — Social Security Law and Pension Regimes',
            url: 'https://www.imss.gob.mx/pensiones',
            description: 'Official rules on required contribution weeks and retirement modalities under Law 73 and Law 97.'
          },
          {
            name: 'Chamber of Deputies — Retirement Savings Systems Law',
            url: 'https://www.diputados.gob.mx',
            description: 'Federal statutory framework governing individual retirement accounts, AFOREs, and SIEFOREs in Mexico.'
          }
        ],
        lastUpdated: 'Updated for fiscal year 2026',
        disclaimer: 'This calculator is an educational projection tool. Future SIEFORE investment yields fluctuate with financial markets. Your definitive pension will be computed by IMSS and your chosen AFORE administrator at the time of formal retirement based on verified contribution weeks and net accumulated balance.'
      }
    }
  }
};
