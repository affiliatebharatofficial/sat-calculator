import { CalculatorConfig } from '../../types/calculator';

export const ptuCalculator: CalculatorConfig = {
  id: 'calculo-ptu',
  title: 'Calculadora de PTU (Reparto de Utilidades)',
  shortDescription: 'Calcula tu Participación en las Utilidades de la Empresa (PTU) proporcional a tus días trabajados y salarios devengados en el año.',
  category: 'Nómina y LFT',
  categorySlug: 'nomina',
  slug: 'calculadora-ptu-reparto-utilidades',
  seo: {
    metaTitle: 'Calculadora de PTU 2026 - Reparto de Utilidades LFT',
    metaDescription: 'Calcula cuánto te corresponde de PTU (Reparto de Utilidades) en México. Simulación proporcional por días, salarios e ISR exento (15 UMAS).',
    keywords: ['calculadora ptu', 'reparto de utilidades lft', 'tope de ptu 3 meses', 'como se calcula la ptu', 'utilidades sat mexico'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_utilidad_total',
      label: 'Monto total a repartir por la empresa ($)',
      type: 'number',
      defaultValue: 500000,
      placeholder: '10% de la utilidad fiscal de la empresa',
      suffix: 'MXN'
    },
    {
      id: 'total_dias_empresa',
      label: 'Suma de días trabajados por todos los empleados',
      type: 'number',
      defaultValue: 3650,
      placeholder: 'Suma de días de toda la plantilla en el año'
    },
    {
      id: 'total_salarios_empresa',
      label: 'Suma de salarios anuales de todos los empleados ($)',
      type: 'number',
      defaultValue: 1200000,
      placeholder: 'Suma de salarios devengados por la plantilla'
    },
    {
      id: 'dias_trabajados_usuario',
      label: 'Tus días trabajados en el año de utilidad',
      type: 'number',
      defaultValue: 365,
      placeholder: 'Tus días laborados (máx 365)'
    },
    {
      id: 'salario_anual_usuario',
      label: 'Tu salario acumulado en ese año ($)',
      type: 'number',
      defaultValue: 180000,
      placeholder: 'Tu sueldo bruto anual acumulado',
      suffix: 'MXN'
    },
    {
      id: 'sueldo_mensual_usuario',
      label: 'Tu sueldo mensual actual ($) (para tope LFT)',
      type: 'number',
      defaultValue: 15000,
      placeholder: 'Sueldo mensual actual',
      suffix: 'MXN'
    }
  ],
  calculate: (inputs) => {
    const ptuTotal = parseFloat(inputs.monto_utilidad_total) || 0;
    const diasEmpresa = parseFloat(inputs.total_dias_empresa) || 1;
    const salariosEmpresa = parseFloat(inputs.total_salarios_empresa) || 1;
    const diasUsuario = Math.min(365, parseFloat(inputs.dias_trabajados_usuario) || 0);
    const salarioAnualUsuario = parseFloat(inputs.salario_anual_usuario) || 0;
    const sueldoMensual = parseFloat(inputs.sueldo_mensual_usuario) || 0;

    // 1. PTU is divided into two halves (50% by days, 50% by wages)
    const bolsaDias = ptuTotal / 2;
    const bolsaSalarios = ptuTotal / 2;

    // 2. Portion based on days worked
    const ptuPorDias = (bolsaDias / diasEmpresa) * diasUsuario;

    // 3. Portion based on wages earned
    const ptuPorSalarios = (bolsaSalarios / salariosEmpresa) * salarioAnualUsuario;

    const ptuBrutaCalculada = ptuPorDias + ptuPorSalarios;

    // 4. LFT Cap: Max of 3 months salary (Art. 127 Fracc. VIII LFT)
    const tope3Meses = sueldoMensual * 3;
    const ptuFinalConTope = Math.min(ptuBrutaCalculada, tope3Meses);

    // 5. Tax Exemption: 15 UMAs (2026 UMA = $113.14 MXN -> $1,697.10 MXN)
    const exentoPtu = 15 * 113.14;
    const ptuGravable = Math.max(0, ptuFinalConTope - exentoPtu);

    const steps = [
      {
        description: `La bolsa de utilidades ($${ptuTotal.toFixed(2)}) se divide en dos partes iguales del 50%. Una se reparte por días trabajados y la otra por salarios devengados.`,
        mathFormula: `Bolsa\\ D\\acute{\\imath}as = Bolsa\\ Salarios = \\frac{$${ptuTotal.toFixed(2)}}{2} = $${bolsaDias.toFixed(2)}`
      },
      {
        description: `Se calcula tu porción de utilidades por Días Trabajados.`,
        mathFormula: `PTU\\ D\\acute{\\imath}as = \\left( \\frac{$${bolsaDias.toFixed(2)}}{${diasEmpresa}} \\right) \\times ${diasUsuario} = $${ptuPorDias.toFixed(2)}`
      },
      {
        description: `Se calcula tu porción de utilidades por Salarios Devengados.`,
        mathFormula: `PTU\\ Salarios = \\left( \\frac{$${bolsaSalarios.toFixed(2)}}{$${salariosEmpresa.toFixed(2)}} \\right) \\times $${salarioAnualUsuario.toFixed(2)} = $${ptuPorSalarios.toFixed(2)}`
      },
      {
        description: `Se suman ambas partes para obtener la PTU Bruta Inicial.`,
        mathFormula: `PTU\\ Bruta = $${ptuPorDias.toFixed(2)} + $${ptuPorSalarios.toFixed(2)} = $${ptuBrutaCalculada.toFixed(2)}`
      },
      {
        description: `Se aplica el tope del Artículo 127 de la LFT (máximo de 3 meses de salario ordinario: $${tope3Meses.toFixed(2)}).`,
        mathFormula: `PTU\\ Final = M\\acute{\\imath}n(PTU\\ Bruta,\\ 3\\ meses\\ sueldo) = M\\acute{\\imath}n($${ptuBrutaCalculada.toFixed(2)}, $${tope3Meses.toFixed(2)}) = $${ptuFinalConTope.toFixed(2)}`
      },
      {
        description: `Se descuenta la exención fiscal del SAT equivalente a 15 UMAs 2026 ($${exentoPtu.toFixed(2)}). Solo la diferencia genera pago de ISR.`,
        mathFormula: `Base\\ Gravable = $${ptuFinalConTope.toFixed(2)} - $${exentoPtu.toFixed(2)} = $${ptuGravable.toFixed(2)}`
      }
    ];

    return {
      results: [
        { label: 'PTU por Días Trabajados', value: ptuPorDias, formatted: `$${ptuPorDias.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'PTU por Salario Devengado', value: ptuPorSalarios, formatted: `$${ptuPorSalarios.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'PTU Bruto Sin Tope', value: ptuBrutaCalculada, formatted: `$${ptuBrutaCalculada.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Tope LFT (3 Meses de Sueldo)', value: tope3Meses, formatted: `$${tope3Meses.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Exento de ISR (15 UMAs 2026)', value: exentoPtu, formatted: `$${exentoPtu.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Monto Gravable para Retención de ISR', value: ptuGravable, formatted: `$${ptuGravable.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'PTU Neta Estimada a Pagar', value: ptuFinalConTope, formatted: `$${ptuFinalConTope.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con exactitud matemática y apego a la Ley Federal del Trabajo (LFT) y al Artículo 123 Constitucional el monto que le corresponde a un trabajador por concepto de Participación de los Trabajadores en las Utilidades (PTU), desglosando la mitad proporcional por días trabajados, la mitad proporcional por salarios devengados, la aplicación del tope de 3 meses de salario y la exención fiscal de 15 UMAs para ISR.',
    whoShouldUse: [
      'Trabajadores de planta y eventuales (con más de 60 días laborados en el año fiscal) que auditan su reparto de utilidades',
      'Extrabajadores que laboraron al menos 60 días durante el ejercicio anterior y desean calcular el monto proporcional que les corresponde cobrar en mayo o junio',
      'Comisiones Mixtas de PTU en empresas integradas por representantes de los trabajadores y del patrón para formular el proyecto de reparto',
      'Departamentos de Recursos Humanos y nóminas encargados de elaborar la carátula y liquidación de utilidades conforme al tope de la reforma laboral'
    ],
    howItWorks: 'Divide el 10% de la utilidad fiscal reportada por la empresa en dos bolsas iguales del 50%. La primera bolsa se distribuye entre el total de días laborados por la plantilla para obtener un factor por día, multiplicándolo por tus días trabajados. La segunda bolsa se divide entre la masa salarial total de la empresa para obtener un factor salarial, multiplicándolo por tu salario anual devengado. Suma ambas porciones para obtener la PTU bruta, aplica el tope legal del Artículo 127 Fracc. VIII (máximo 3 meses de tu sueldo ordinario) y descuenta la exención de 15 UMAs para determinar la base gravable de ISR.',
    explanation: 'La Participación de los Trabajadores en las Utilidades (PTU) es un derecho constitucional en México en el que los trabajadores reciben una parte de las ganancias fiscales netas generadas por su patrón durante el año fiscal anterior. La Ley Federal del Trabajo dicta que se debe repartir el 10% de la utilidad fiscal de la empresa, dividiéndose a la mitad para premiar equitativamente los días trabajados y la otra mitad el salario bruto devengado. A partir de la reforma de subcontratación de 2021, la LFT fijó un tope máximo de 3 meses de salario del trabajador o el promedio de PTU de los últimos 3 años (el que resulte más favorable). Fiscalmente, el Artículo 93 Fracción XIV de la LISR exenta de impuestos hasta 15 días de salario mínimo general/UMA.',
    formula: '1. Bolsa Total PTU = 10% de la Utilidad Fiscal Neta de la Declaración Anual\n2. Bolsa por Días (50%) = Bolsa Total / 2\n3. Bolsa por Salarios (50%) = Bolsa Total / 2\n4. PTU por Días = ( Bolsa por Días / Total Días Empresa ) * Días Trabajados por el Empleado\n5. PTU por Salarios = ( Bolsa por Salarios / Total Salarios Empresa ) * Salario Anual del Empleado\n6. PTU Bruta Inicial = PTU por Días + PTU por Salarios\n7. Tope Legal LFT = Sueldo Mensual Ordinario * 3\n8. PTU con Tope = Mínimo(PTU Bruta Inicial, Tope Legal LFT)\n9. Límite Exento de ISR = 15 * Valor Diario de la UMA Vigente ($113.14 MXN en 2026 = $1,697.10 MXN)\n10. Base Gravable para ISR = Max(0, PTU con Tope - Límite Exento)',
    example: 'Empresa moral con utilidad fiscal de $5,000,000 MXN (Bolsa PTU 10% = $500,000 MXN). Total de días de la plantilla: 3,650; total de salarios anuales: $1,200,000 MXN. Empleado con 365 días laborados, salario anual devengado de $180,000 MXN y sueldo mensual de $15,000 MXN:\n• Bolsa por Días: $250,000 MXN | Porción Días: ($250,000 / 3,650) * 365 = $25,000.00 MXN\n• Bolsa por Salarios: $250,000 MXN | Porción Salarios: ($250,000 / $1,200,000) * $180,000 = $37,500.00 MXN\n• PTU Bruta Inicial: $25,000.00 + $37,500.00 = $62,500.00 MXN\n• Tope Legal LFT (3 meses de sueldo): $15,000.00 * 3 = $45,000.00 MXN\n• PTU Final a Recibir: Mínimo($62,500.00, $45,000.00) = $45,000.00 MXN\n• Exención de ISR (15 UMAs 2026 = 15 * $113.14): $1,697.10 MXN\n• Base Gravable sujeta a retención de ISR: $45,000.00 - $1,697.10 = $43,302.90 MXN',
    howToInterpret: 'La simulación desglosa cuatro conceptos indispensables para tu recibo de utilidades:\n1. PTU por Días vs por Salarios: Muestra cuánto aportó tu tiempo efectivo trabajado y cuánto aportó tu nivel salarial al cálculo de la bolsa.\n2. Impacto del Tope de 3 Meses: Si tu PTU calculada rebasa 3 meses de tu salario ordinario, la cifra se ajusta al tope de ley conforme al Artículo 127 Fracc. VIII de la LFT (a menos que el promedio de tus últimos 3 años sea superior).\n3. Monto Exento de ISR: Los primeros $1,697.10 MXN (15 UMAs en 2026) están completamente libres de retención tributaria.\n4. Base Gravable: Es el saldo sobre el cual tu patrón calculará la retención de ISR de conformidad con el procedimiento del Artículo 96 o el Artículo 174 del Reglamento de la LISR.',
    legislation: 'Constitución Política de los Estados Unidos Mexicanos (CPEUM), Artículo 123, Apartado A, Fracción IX; Ley Federal del Trabajo (LFT), Artículos 117 al 131; Decreto de reforma laboral en materia de subcontratación publicado en el DOF el 23 de abril de 2021 (tope de utilidades); y Ley del Impuesto sobre la Renta (LISR), Artículo 93 Fracción XIV (exención de 15 UMAs).',
    tips: [
      'Las empresas morales deben pagar las utilidades a más tardar el 30 de mayo; las personas físicas con actividad empresarial (patrones individuales) tienen como fecha límite el 29 de junio.',
      'Si ya no laboras en la empresa pero trabajaste al menos 60 días durante el año fiscal evaluado, tienes derecho al cobro de tu parte proporcional. Tu derecho a cobrar prescribe en un año a partir del día siguiente al que sea exigible.',
      'El patrón está obligado por ley a entregar a los representantes de los trabajadores una copia de la carátula de su Declaración Anual del SAT dentro de los 10 días siguientes a su presentación.',
      'El salario que sirve de base para el reparto es la cuota diaria ordinaria en efectivo; no se computan horas extras, gratificaciones extraordinarias ni prestaciones de previsión social.'
    ],
    assumptions: [
      'Se asume que la empresa generó utilidad fiscal positiva en su declaración anual del SAT correspondiente al ejercicio inmediato anterior.',
      'El trabajador acumuló al menos 60 días laborados en el ejercicio fiscal y no ocupa puestos directivos excluidos por ley (director general, administrador único).',
      'Aplica el tope estándar de 3 meses de sueldo ordinario conforme al Art. 127 de la LFT.'
    ],
    limitations: [
      'No aplica para empresas de nueva creación durante su primer año de funcionamiento, ni para instituciones de asistencia privada sin fines de lucro.',
      'No calcula el procedimiento opcional de tasa de retención de ISR previsto en el Artículo 174 del Reglamento de la LISR.',
      'No sustituye el proyecto de reparto elaborado y firmado por la Comisión Mixta de Participación de Utilidades de tu centro de trabajo.'
    ],
    faqs: [
      {
        question: '¿Cuándo se debe pagar el reparto de utilidades en México?',
        answer: 'Para empresas morales (personas jurídicas), la fecha límite legal de pago es a más tardar el 30 de mayo. Para personas físicas con actividad empresarial (patrones individuales), el pago debe entregarse a más tardar el 29 de junio.'
      },
      {
        question: '¿Qué empleados no tienen derecho al cobro de utilidades?',
        answer: 'Directores generales, administradores, gerentes generales, socios o accionistas, trabajadores domésticos, y trabajadores eventuales que hayan laborado menos de 60 días en el año correspondiente.'
      },
      {
        question: '¿Cómo funciona el tope de 3 meses de salario para la PTU?',
        answer: 'Conforme al Artículo 127 Fracción VIII de la LFT, el monto máximo de la PTU tendrá como límite superior tres meses del salario del trabajador o el promedio de la PTU recibida en los últimos tres años, aplicándose siempre el monto que resulte más favorable al trabajador.'
      },
      {
        question: '¿El reparto de utilidades paga impuestos ante el SAT?',
        answer: 'El Artículo 93 Fracción XIV de la Ley del ISR establece una exención fiscal equivalente a 15 veces el valor diario de la UMA ($1,697.10 MXN en 2026). Solo el importe que exceda dicha cifra genera retención de ISR.'
      }
    ],
    sources: [
      {
        name: 'PROFEDET — Guía de Participación de los Trabajadores en las Utilidades',
        url: 'https://www.gob.mx/profedet',
        description: 'Orientación oficial sobre derechos laborales y fechas límites para el pago de PTU en México.'
      },
      {
        name: 'Cámara de Diputados — Ley Federal del Trabajo',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto vigente de los Artículos 117 al 131 de la Ley Federal del Trabajo.'
      },
      {
        name: 'Servicio de Administración Tributaria (SAT)',
        url: 'https://www.sat.gob.mx',
        description: 'Disposiciones fiscales sobre exención de 15 UMAs en pagos de utilidades conforme a la LISR.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-aguinaldo',
      'nomina/calculadora-salario-neto-bruto',
      'nomina/calculadora-finiquito-liquidacion'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador matemático basado en la LFT y la LISR. La determinación oficial definitiva de utilidades es formulada por la Comisión Mixta de PTU de tu empresa.'
  },
  translations: {
    en: {
      title: 'Profit Sharing Calculator (PTU Mexico)',
      shortDescription: 'Calculate your statutory employee profit sharing (PTU) based on days worked, annual earnings, and the 3-month LFT statutory cap in Mexico.',
      category: 'Payroll & Labor',
      inputs: [
        {
          id: 'monto_utilidad_total',
          label: 'Total Company Profit Sharing Pool ($)',
          placeholder: '10% of company taxable fiscal profit'
        },
        {
          id: 'total_dias_empresa',
          label: 'Total Days Worked by All Employees',
          placeholder: 'Sum of days worked across all staff'
        },
        {
          id: 'total_salarios_empresa',
          label: 'Total Annual Salaries Paid by Company ($)',
          placeholder: 'Total payroll wage base for the tax year'
        },
        {
          id: 'dias_trabajados_usuario',
          label: 'Your Days Worked in the Tax Year',
          placeholder: 'Days worked (up to 365)'
        },
        {
          id: 'salario_anual_usuario',
          label: 'Your Cumulative Annual Salary ($)',
          placeholder: 'Gross annual wages earned'
        },
        {
          id: 'sueldo_mensual_usuario',
          label: 'Your Current Monthly Base Salary ($)',
          placeholder: 'Current regular monthly salary'
        }
      ],
      content: {
        whatItDoes: 'Calculates the statutory employee profit sharing (PTU) owed to an employee in Mexico under Article 123 of the Constitution and Articles 117-131 of the Federal Labor Law (LFT), breaking down 50% allocation by days worked, 50% allocation by wages earned, the 3-month salary statutory cap, and the 15-UMA income tax exemption.',
        whoShouldUse: [
          'Permanent and temporary workers (with at least 60 days worked in the tax year) auditing their profit sharing payout',
          'Former employees who worked at least 60 days during the previous year calculating their prorated profit share due in May/June',
          'Joint Labor-Management PTU Commissions drafting the official distribution roster',
          'Human resources and payroll departments computing distributions under statutory caps'
        ],
        howItWorks: 'Splits 10% of the company\'s net fiscal profit into two equal 50% pools. The first pool is divided by total company days worked to obtain a daily factor, multiplied by your days. The second pool is divided by total company payroll to obtain a wage factor, multiplied by your annual earnings. Combines both to yield gross PTU, applies the 3-month statutory salary cap (LFT Art. 127), and subtracts the 15-UMA tax exemption to determine taxable income.',
        explanation: 'PTU is a constitutional right in Mexico ensuring employees receive 10% of their employer\'s taxable net earnings from the previous tax year. LFT establishes a dual distribution model: 50% based on attendance and 50% based on earnings. Following the 2021 outsourcing labor reform, a statutory cap was introduced limiting payouts to 3 months salary or the 3-year historical average (whichever is more favorable). Under Article 93 Section XIV LISR, the first 15 UMAs are tax-exempt.',
        formula: '1. Total PTU Pool = 10% of Net Taxable Profit\n2. Days Pool (50%) = Total Pool / 2\n3. Wage Pool (50%) = Total Pool / 2\n4. PTU by Days = ( Days Pool / Total Company Days ) * Employee Days\n5. PTU by Wages = ( Wage Pool / Total Company Wages ) * Employee Annual Salary\n6. Initial Gross PTU = PTU by Days + PTU by Wages\n7. Statutory Cap = Monthly Base Wage * 3\n8. Capped PTU = Min(Initial Gross PTU, Statutory Cap)\n9. Tax Exemption = 15 * Daily UMA ($113.14 MXN in 2026 = $1,697.10 MXN)\n10. Taxable Base = Max(0, Capped PTU - Tax Exemption)',
        example: 'Company with $5,000,000 MXN taxable profit ($500,000 MXN PTU pool). Staff worked 3,650 days with $1,200,000 MXN total payroll. Employee with 365 days worked, $180,000 MXN annual wage, and $15,000 MXN monthly salary:\n• Days Pool: $250,000 MXN | Days Portion: ($250,000 / 3,650) * 365 = $25,000.00 MXN\n• Wage Pool: $250,000 MXN | Wage Portion: ($250,000 / $1,200,000) * $180,000 = $37,500.00 MXN\n• Initial Gross PTU: $25,000.00 + $37,500.00 = $62,500.00 MXN\n• Statutory Cap (3 months salary): $15,000.00 * 3 = $45,000.00 MXN\n• Final PTU Payable: Min($62,500.00, $45,000.00) = $45,000.00 MXN\n• Tax Exemption (15 UMAs 2026): $1,697.10 MXN\n• Taxable Base Subject to ISR: $45,000.00 - $1,697.10 = $43,302.90 MXN',
        howToInterpret: 'The simulation outlines four key values:\n1. PTU by Days vs. Wages: Displays the separate contribution of your attendance and earnings level to the profit pool.\n2. 3-Month Statutory Cap: If calculated profit exceeds 3 months of regular salary, it is capped under Article 127 Fraction VIII LFT (unless your 3-year average is higher).\n3. Tax-Exempt Amount: The first $1,697.10 MXN (15 daily UMAs in 2026) is 100% exempt from income tax.\n4. Taxable Base: The remaining portion subject to income tax withholding by your employer.',
        legislation: 'Mexican Federal Constitution, Article 123 Section A Fraction IX; Federal Labor Law (LFT), Articles 117–131; Decree on Subcontracting Reform (DOF April 23, 2021); and Income Tax Law (LISR), Article 93 Fraction XIV.',
        tips: [
          'Corporations must disburse profit sharing by May 30th; individual employers must disburse by June 29th.',
          'Former workers with at least 60 days of service during the tax year are entitled to collect their prorated share within one year of the due date.',
          'Employers must deliver a copy of their SAT annual tax declaration cover sheet to employee representatives within 10 days of filing.'
        ],
        assumptions: [
          'Assumes the company reported positive taxable net income on its SAT declaration for the preceding tax year.',
          'The employee worked at least 60 days and does not hold an excluded executive title (General Director, General Administrator).',
          'Applies the standard 3-month statutory cap per Article 127 LFT.'
        ],
        limitations: [
          'Does not apply to newly created companies during their first operating year, nor non-profit charitable institutions.',
          'Does not compute optional withholding methods under Article 174 of the LISR Regulations.',
          'Does not replace the official roster approved by your company\'s Joint PTU Commission.'
        ],
        faqs: [
          {
            question: 'When must profit sharing be paid in Mexico?',
            answer: 'Corporations (Personas Morales) must disburse PTU no later than May 30th. Individual employers (Personas Físicas) have until June 29th.'
          },
          {
            question: 'Are former employees who voluntarily resigned entitled to PTU?',
            answer: 'Yes. Any employee who worked at least 60 days during the relevant calendar year has a statutory right to their prorated share, regardless of separation cause.'
          }
        ],
        sources: [
          {
            name: 'PROFEDET — Federal Labor Defense Bureau',
            url: 'https://www.gob.mx/profedet',
            description: 'Official Mexican government agency providing free legal counseling on employee profit sharing.'
          },
          {
            name: 'SAT — Mexican Tax Administration Service',
            url: 'https://www.sat.gob.mx',
            description: 'Official tax rules on 15 UMA profit sharing tax exemptions under the LISR.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational simulation based on the LFT and LISR. Official profit sharing amounts are certified by your company\'s Joint PTU Commission.'
      }
    }
  }
};
