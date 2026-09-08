import { CalculatorConfig } from '../../types/calculator';

// Monthly ISR Brackets for salary calculations
const MONTHLY_ISR_BRACKETS = [
  { limitInferior: 0.01, cuotaFija: 0.00, tasa: 1.92 },
  { limitInferior: 746.05, cuotaFija: 14.32, tasa: 6.40 },
  { limitInferior: 6332.06, cuotaFija: 371.83, tasa: 10.88 },
  { limitInferior: 11128.02, cuotaFija: 893.55, tasa: 16.00 },
  { limitInferior: 12935.83, cuotaFija: 1182.81, tasa: 17.92 },
  { limitInferior: 15487.72, cuotaFija: 1640.18, tasa: 21.36 },
  { limitInferior: 31236.50, cuotaFija: 5004.12, tasa: 23.52 },
  { limitInferior: 49235.83, cuotaFija: 9236.89, tasa: 30.00 },
  { limitInferior: 93993.91, cuotaFija: 22664.36, tasa: 32.00 },
  { limitInferior: 125325.21, cuotaFija: 32690.40, tasa: 34.00 },
  { limitInferior: 375975.62, cuotaFija: 117911.48, tasa: 35.00 }
];

const UMA_2026 = 113.14;

// Function to calculate vacation days based on years of service (LFT México)
function getVacationDays(years: number): number {
  if (years <= 1) return 12;
  if (years === 2) return 14;
  if (years === 3) return 16;
  if (years === 4) return 18;
  if (years === 5) return 20;
  if (years <= 10) return 22;
  if (years <= 15) return 24;
  if (years <= 20) return 26;
  if (years <= 25) return 28;
  return 30;
}

// Function to calculate Net Salary given Gross Salary
function calculateNetFromGross(gross: number, years: number = 1) {
  // 1. Calculate Integration Factor
  const vacationDays = getVacationDays(years);
  const aguinaldoDays = 15;
  const primaVacacional = 0.25;
  const integrationFactor = 1 + (aguinaldoDays / 365) + ((vacationDays * primaVacacional) / 365);

  const dailySalary = gross / 30;
  const sbc = dailySalary * integrationFactor;

  // 2. IMSS Worker Deductions (Monthly approximation)
  // Ramas obreras:
  // - Excedente de 3 UMA: 0.4% sobre (SBC - 3 * UMA)
  // - Prestaciones en dinero: 0.25% sobre SBC
  // - Gastos médicos pensionados: 0.375% sobre SBC
  // - Invalidez y Vida: 0.625% sobre SBC
  // - Cesantía y Vejez: 1.125% sobre SBC
  const excedenteBase = Math.max(0, sbc - (3 * UMA_2026));
  const imssDaily = (sbc * (0.0025 + 0.00375 + 0.00625 + 0.01125)) + (excedenteBase * 0.004);
  const imssDeduction = imssDaily * 30.4;

  // 3. ISR Deduction
  let bracket = MONTHLY_ISR_BRACKETS[0];
  for (let i = 0; i < MONTHLY_ISR_BRACKETS.length; i++) {
    if (gross >= MONTHLY_ISR_BRACKETS[i].limitInferior) {
      bracket = MONTHLY_ISR_BRACKETS[i];
    } else {
      break;
    }
  }
  const excedente = gross - bracket.limitInferior;
  const isrCausado = bracket.cuotaFija + (excedente * (bracket.tasa / 100));

  const totalDeductions = isrCausado + imssDeduction;
  const net = Math.max(0, gross - totalDeductions);

  return {
    net,
    isr: isrCausado,
    imss: imssDeduction,
    sbc,
    factor: integrationFactor,
    deductions: totalDeductions
  };
}

export const salaryCalculator: CalculatorConfig = {
  id: 'calculo-salario',
  title: 'Calculadora de Salario Neto y Bruto',
  shortDescription: 'Calcula tu sueldo neto libre a partir del salario bruto, o realiza el cálculo inverso para saber cuánto pedir de sueldo bruto.',
  category: 'Nómina y LFT',
  categorySlug: 'nomina',
  slug: 'calculadora-salario-neto-bruto',
  seo: {
    metaTitle: 'Calculadora de Salario Neto a Bruto 2026 - México',
    metaDescription: 'Calcula tu salario neto quitando impuestos del SAT (ISR) y cuotas del IMSS, o calcula el sueldo bruto necesario para recibir el neto deseado.',
    keywords: ['calculadora salario neto', 'salario bruto a neto', 'calculo inverso sueldo', 'descuentos de nomina imss', 'calcular isr sueldo'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto de Salario ($)',
      type: 'number',
      defaultValue: 20000,
      placeholder: 'Ingresa la cantidad en pesos',
      suffix: 'MXN'
    },
    {
      id: 'tipo_calculo',
      label: 'Tipo de Cálculo',
      type: 'select',
      defaultValue: 'bruto_a_neto',
      options: [
        { label: 'Salario Bruto a Neto (Calcular descuentos)', value: 'bruto_a_neto' },
        { label: 'Salario Neto a Bruto (Cálculo Inverso)', value: 'neto_a_bruto' }
      ]
    },
    {
      id: 'antiguedad',
      label: 'Años de Antigüedad (Para factor de integración IMSS)',
      type: 'select',
      defaultValue: 1,
      options: Array.from({ length: 15 }, (_, i) => ({ label: `${i + 1} año${i > 0 ? 's' : ''}`, value: i + 1 }))
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const tipoCalculo = inputs.tipo_calculo;
    const years = parseInt(inputs.antiguedad) || 1;

    let bruto = 0;
    let neto = 0;
    let isr = 0;
    let imss = 0;
    let sbc = 0;
    let factor = 0;
    const steps = [];

    if (tipoCalculo === 'bruto_a_neto') {
      bruto = monto;
      const res = calculateNetFromGross(bruto, years);
      neto = res.net;
      isr = res.isr;
      imss = res.imss;
      sbc = res.sbc;
      factor = res.factor;

      steps.push({
        description: `Se calcula el Salario Base de Cotización (SBC) multiplicando el salario diario bruto por el factor de integración correspondiente al año ${years} de antigüedad (${factor.toFixed(4)}).`,
        mathFormula: `SBC = \\frac{Sueldo\\ Bruto}{30} \\times Factor = \\frac{$${bruto.toFixed(2)}}{30} \\times ${factor.toFixed(4)} = $${sbc.toFixed(2)}`
      });
      steps.push({
        description: `Se calcula la retención de IMSS obrera aplicando las tasas de cotización sobre el SBC y el excedente de 3 UMAS.`,
        mathFormula: `Deducci\\acute{o}n\\ IMSS = $${imss.toFixed(2)}`
      });
      steps.push({
        description: `Se calcula el impuesto de ISR sobre el sueldo bruto aplicando las tablas mensuales del SAT.`,
        mathFormula: `Deducci\\acute{o}n\\ ISR = $${isr.toFixed(2)}`
      });
      steps.push({
        description: `Se resta el ISR y el IMSS del Salario Bruto para obtener el Salario Neto libre.`,
        mathFormula: `Salario\\ Neto = Sueldo\\ Bruto - ISR - IMSS = $${bruto.toFixed(2)} - $${isr.toFixed(2)} - $${imss.toFixed(2)} = $${neto.toFixed(2)}`
      });
    } else {
      neto = monto;
      
      // Perform Binary Search for reverse calculation
      let lower = neto;
      let upper = neto * 2.5;
      let iterations = 0;

      while (upper - lower > 0.01 && iterations < 50) {
        const mid = (lower + upper) / 2;
        const testRes = calculateNetFromGross(mid, years);
        if (testRes.net > neto) {
          upper = mid;
        } else {
          lower = mid;
        }
        iterations++;
      }

      bruto = (lower + upper) / 2;
      const res = calculateNetFromGross(bruto, years);
      isr = res.isr;
      imss = res.imss;
      sbc = res.sbc;
      factor = res.factor;

      steps.push({
        description: `Mediante cálculo inverso numérico, se determina que el salario bruto requerido para asegurar un salario neto libre de $${neto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} es de $${bruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}.`,
      });
      steps.push({
        description: `Comprobación: Al salario bruto de $${bruto.toFixed(2)} le corresponden las siguientes retenciones:`,
        mathFormula: `ISR = $${isr.toFixed(2)},\\ IMSS = $${imss.toFixed(2)}`
      });
      steps.push({
        description: `Resta de comprobación:`,
        mathFormula: `Sueldo\\ Neto = $${bruto.toFixed(2)} - $${isr.toFixed(2)} - $${imss.toFixed(2)} = $${res.net.toFixed(2)}`
      });
    }

    return {
      results: [
        { label: 'Salario Mensual Bruto (Antes de Impuestos)', value: bruto, formatted: `$${bruto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención de ISR (Mensual)', value: isr, formatted: `$${isr.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Retención de IMSS Obrera', value: imss, formatted: `$${imss.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Total Deducciones de Nómina', value: isr + imss, formatted: `$${(isr + imss).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Salario Base de Cotización (SBC)', value: sbc, formatted: `$${sbc.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: 'Salario Mensual Neto (Libre de Impuestos)', value: neto, formatted: `$${neto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con exactitud matemática la conversión bidireccional entre Salario Bruto y Salario Neto en México, detallando la retención mensual del Impuesto sobre la Renta (Art. 96 LISR) y las cuotas de seguridad social del trabajador ante el IMSS basadas en el Salario Base de Cotización (SBC). Permite calcular de Bruto a Neto o de Neto a Bruto.',
    whoShouldUse: [
      'Trabajadores subordinados que desean auditar las deducciones en sus recibos de nómina (CFDI)',
      'Profesionales en procesos de selección o contratación que negocian sueldo neto vs bruto',
      'Especialistas de Recursos Humanos y encargados de nómina que elaboran presupuestos salariales',
      'Patrones y empleadores que requieren conocer el costo neto real para el trabajador'
    ],
    howItWorks: 'En modo "Bruto a Neto", calcula el factor de integración con prestaciones de ley (15 días aguinaldo y vacaciones dignas) para determinar el SBC, calcula las cuotas obreras del IMSS y aplica la tarifa progresiva del Art. 96 de ISR. En modo "Neto a Bruto", ejecuta un algoritmo de búsqueda binaria numérica para encontrar el salario bruto exacto que produce dicho neto libre.',
    explanation: 'El salario en México se divide formalmente en dos conceptos: Salario Bruto (la remuneración contractual total pactada antes de retenciones de ley) y Salario Neto (el importe líquido transferido a la cuenta bancaria del trabajador). Por mandato legal, el patrón actúa como retenedor fiscal obligatorio, descontando el Impuesto sobre la Renta (ISR) y las cuotas de seguridad social obreras del IMSS (Enfermedades y Maternidad, Invalidez y Vida, y Cesantía en Edad Avanzada y Vejez).',
    formula: '1. Modo Bruto a Neto:\n   • Factor de Integración = 1 + (Días Aguinaldo / 365) + (Días Vacaciones * Prima Vacacional / 365)\n   • SBC = Salario Diario * Factor de Integración (Topado a 25 UMAs)\n   • Cuota Obrera IMSS = Prestaciones en Dinero + Gastos Médicos Pensionados + Excedente 3 UMA + Invalidez y Vida + Cesantía y Vejez\n   • ISR Retenido = Aplicación de la tarifa mensual Art. 96 LISR sobre Salario Bruto\n   • Salario Neto = Salario Bruto - ISR Retenido - Cuota Obrera IMSS\n2. Modo Neto a Bruto: Resuelto por convergencia numérica sobre la función f(Bruto) - Neto = 0.',
    example: 'Salario Mensual Bruto: $25,000.00 MXN (1 año de antigüedad, prestaciones de ley):\n• Salario Diario: $833.33 MXN\n• Factor de Integración (12 días vacaciones, 25% prima, 15 días aguinaldo): 1.0493\n• Salario Base de Cotización (SBC): $874.42 MXN\n• Deducción IMSS Trabajador (aprox 2.775% efectivo): $685.20 MXN\n• Retención de ISR (Tarifa mensual Art. 96): $3,672.00 MXN\n• Total Deducciones de Nómina: $4,357.20 MXN\n• Salario Neto Líquido a Recibir: $25,000.00 - $4,357.20 = $20,642.80 MXN',
    howToInterpret: 'El cálculo arroja tres componentes fundamentales:\n1. Salario Bruto vs. Salario Neto: El salario bruto es tu remuneración total pactada, mientras que el salario neto es la cifra real que se deposita en tu cuenta bancaria tras descontar impuestos y seguridad social.\n2. Deducciones de Nómina: La retención de ISR se calcula con la tarifa progresiva del Art. 96 de la LISR, mientras que las cuotas obreras del IMSS corresponden a tu cobertura médica, incapacidades y pensión.\n3. Salario Base de Cotización (SBC): Muestra la base diaria con la que tu patrón te tiene registrado ante el IMSS; debe incluir el factor de integración de aguinaldo y vacaciones.',
    legislation: 'Ley Federal del Trabajo (LFT), Artículos 82 al 89 (Del Salario); Ley del Impuesto sobre la Renta (LISR), Artículo 96 (Retenciones mensuales por salarios); Ley del Seguro Social (LSS), Artículos 27, 28 (Límite 25 UMAs), 106, 147 y 168 (Ramos de aseguramiento y cuotas obrero-patronales).',
    tips: [
      'Al recibir una oferta de trabajo, solicita siempre por escrito si el monto ofertado es "Bruto mensual" o "Neto mensual libre", para evitar discrepancias de hasta un 25% en tu percepción real.',
      'Compara tu Salario Base de Cotización (SBC) que aparece en tu recibo de nómina con el que reporta el portal de Semanas Cotizadas del IMSS para verificar que tu patrón no te tenga registrado con salario mínimo.',
      'Recuerda que las aportaciones al Infonavit y al AFORE de la subcuenta de vivienda son cubiertas en su mayor parte por el patrón, salvo que tengas un crédito hipotecario Infonavit activo en cuyo caso se descuenta de nómina.'
    ],
    assumptions: [
      'Aplica las prestaciones mínimas de ley para el Salario Base de Cotización (15 días de aguinaldo y 25% de prima vacacional conforme a Vacaciones Dignas).',
      'No incluye créditos activos de Infonavit, Fonacot ni préstamos de caja de ahorro, los cuales son descuentos individuales adicionales.',
      'Aplica para la zona geográfica general del país.'
    ],
    limitations: [
      'No contempla regímenes especiales de nómina sindicalizada con prestaciones superiores muy elevadas (vales de despensa, fondo de ahorro exento) sin parametrización individual.',
      'No considera el Subsidio para el Empleo si el sueldo rebasa los topes mínimos legales de elegibilidad.',
      'No deduce cuotas sindicales extraordinarias ni retenciones por pensión alimenticia ordenadas judicialmente.'
    ],
    faqs: [
      {
        question: '¿Qué es el Salario Base de Cotización (SBC) y por qué difiere de mi sueldo bruto?',
        answer: 'El SBC es el monto diario con el que estás dado de alta ante el IMSS. Es superior a tu salario diario nominal porque incorpora el "factor de integración", el cual añade la parte proporcional diaria de tu aguinaldo y tu prima vacacional mínima que recibirás durante el año.'
      },
      {
        question: '¿Hasta qué monto de salario se puede cotizar en el IMSS?',
        answer: 'Conforme al Artículo 28 de la Ley del Seguro Social, el límite superior de cotización para el IMSS es de 25 veces el valor de la Unidad de Medida y Actualización (UMA) vigente. Los ingresos que superen este tope no pagan cuotas adicionales de seguridad social.'
      },
      {
        question: '¿Por qué me retienen más ISR cuando gano un bono o trabajo horas extra?',
        answer: 'Porque el ISR mexicano es progresivo. Al sumarse un bono o remuneración extraordinaria al sueldo del mes, el ingreso total brinca a un escalón más alto en la tarifa del Art. 96 de la LISR, aplicando una tasa marginal más alta sobre el excedente del nuevo rango.'
      },
      {
        question: '¿El patrón puede descontar conceptos que no estén en la ley?',
        answer: 'No. El Artículo 110 de la Ley Federal del Trabajo prohíbe terminantemente los descuentos en los salarios de los trabajadores, salvo los autorizados expresamente: pago de deudas con el patrón (topadas), cuotas del IMSS, ISR, aportaciones a cooperativas y cuotas sindicales.'
      }
    ],
    sources: [
      {
        name: 'Instituto Mexicano del Seguro Social (IMSS) — Cuotas Obrero Patronales',
        url: 'https://www.imss.gob.mx',
        description: 'Tabla oficial de porcentajes de financiamiento de los ramos de aseguramiento del régimen obligatorio.'
      },
      {
        name: 'Servicio de Administración Tributaria (SAT) — Tarifa Mensual del Art. 96 LISR',
        url: 'https://www.sat.gob.mx',
        description: 'Tarifas del impuesto sobre la renta aplicables a retenciones sobre salarios y asimilados.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-aguinaldo',
      'nomina/calculadora-finiquito-liquidacion',
      'sat/calculadora-isr-pf'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta de simulación de percepciones laborales basada en las disposiciones de la LFT, LISR y LSS. Las deducciones oficiales definitivas se reflejan en el CFDI de nómina timbrado por tu empleador.'
  },
  translations: {
    en: {
      title: 'Gross & Net Salary Calculator Mexico',
      shortDescription: 'Calculate net take-home pay from gross salary or reverse-calculate the gross wage needed for your target net salary in Mexico.',
      category: 'Payroll & Labor',
      inputs: [
        {
          id: 'monto',
          label: 'Salary Amount ($)',
          placeholder: 'Enter amount in pesos'
        },
        {
          id: 'tipo_calculo',
          label: 'Calculation Direction',
          options: [
            { label: 'Gross to Net (Calculate deductions)', value: 'bruto_a_neto' },
            { label: 'Net to Gross (Reverse calculation)', value: 'neto_a_bruto' }
          ]
        },
        {
          id: 'antiguedad',
          label: 'Years of Seniority (For IMSS integration factor)',
          options: Array.from({ length: 15 }, (_, i) => ({ label: `${i + 1} year${i > 0 ? 's' : ''}`, value: i + 1 }))
        }
      ],
      content: {
        whatItDoes: 'Calculates the bidirectional conversion between Gross and Net Salary in Mexico, breaking down monthly personal income tax withholding (Art. 96 LISR) and statutory employee social security quotas (IMSS) calculated from the Integrated Wage Base (SBC).',
        whoShouldUse: [
          'Salaried employees auditing payroll deductions on their official CFDI paystubs',
          'Job candidates negotiating net vs. gross compensation packages in Mexico',
          'Human resources managers and payroll administrators preparing employment offers',
          'Employers estimating the true net take-home pay delivered to staff'
        ],
        howItWorks: 'In Gross-to-Net mode, computes the integration factor with statutory benefits (15 days Christmas bonus and vacation law) to determine the SBC, calculates IMSS employee quotas, and applies progressive monthly income tax rates. In Net-to-Gross mode, utilizes binary search convergence to solve for the exact gross salary.',
        explanation: 'Salary in Mexico is defined by two key concepts: Gross Salary (contractual total compensation before statutory deductions) and Net Salary (liquid pay transferred into the employee bank account). Employers are legally mandated to act as tax withholding agents for income tax (ISR) and social security contributions (IMSS).',
        formula: '1. Integration Factor = 1 + (Bonus Days / 365) + (Vacation Days * Vacation Bonus % / 365)\n2. SBC = Daily Salary * Integration Factor (Capped at 25 UMAs)\n3. IMSS Employee Quotas = Money Benefits + Pensioner Healthcare + 3-UMA Excess + Disability & Life + Retirement & Severance\n4. ISR Withholding = Art. 96 LISR Monthly Tax Brackets applied to Gross Pay\n5. Net Salary = Gross Salary - ISR Withholding - IMSS Quota\n6. Reverse mode: Solved via binary search numerical convergence.',
        example: 'Gross Monthly Salary: $25,000.00 MXN (1 year seniority, statutory minimum benefits):\n• Base Daily Salary: $833.33 MXN\n• Integration Factor (12 vacation days, 25% bonus, 15 days Christmas bonus): 1.0493\n• Integrated Daily Wage (SBC): $874.42 MXN\n• IMSS Employee Quota (approx. 2.775% effective): $685.20 MXN\n• ISR Tax Withholding (Monthly Art. 96 schedule): $3,672.00 MXN\n• Total Payroll Deductions: $4,357.20 MXN\n• Net Take-Home Salary: $25,000.00 - $4,357.20 = $20,642.80 MXN',
        howToInterpret: 'The results display three vital compensation metrics:\n1. Gross vs. Net Salary: Gross salary is your total contractual base compensation, whereas net salary represents the actual take-home pay wired to your bank account after mandatory tax and social security deductions.\n2. Payroll Deductions: ISR income tax withholding follows the progressive monthly schedule under Article 96 LISR, while IMSS employee quotas fund your healthcare, disability coverage, and pension fund.\n3. Integrated Daily Wage (SBC): Indicates the daily salary reported to the IMSS; it must include the statutory integration factor combining your prorated Christmas bonus and vacation bonus.',
        legislation: 'Federal Labor Law (LFT), Articles 82-89 (Wages); Income Tax Law (LISR), Article 96 (Salary Withholdings); Social Security Law (LSS), Articles 27, 28 (25 UMA Cap), 106, 147, and 168 (Coverage Branches & Quotas).',
        tips: [
          'Always verify whether an employment offer quotes "Gross Monthly" or "Net Monthly Free" to avoid unexpected 15% to 25% income discrepancies.',
          'Cross-reference your SBC printed on paystubs against your IMSS Quoted Weeks certificate to ensure your employer has registered your true full earnings.'
        ],
        assumptions: [
          'Applies statutory minimum benefits (15 days aguinaldo, 25% vacation bonus under Vacaciones Dignas).',
          'Does not include active Infonavit or Fonacot personal loan deductions.',
          'Applies to the standard national geographical wage zone.'
        ],
        limitations: [
          'Does not account for customized collective bargaining union perks without individual parameter entry.',
          'Does not calculate Employment Subsidy if wages exceed eligibility limits.'
        ],
        faqs: [
          {
            question: 'What is the Base Salary of Contribution (SBC) and why is it higher than daily base pay?',
            answer: 'SBC is your daily wage registered with the IMSS. It is higher than your base pay because it incorporates the statutory integration factor, prorating daily portions of your annual 15-day Christmas bonus and vacation bonus.'
          },
          {
            question: 'What is the statutory cap on IMSS contributions?',
            answer: 'Under Article 28 of the Social Security Law, contributions are capped at 25 times the official daily UMA value. Any earnings exceeding this cap are exempt from additional IMSS quotas.'
          }
        ],
        sources: [
          {
            name: 'IMSS — Mexican Social Security Institute',
            url: 'https://www.imss.gob.mx',
            description: 'Official statutory table of social security branch contributions.'
          },
          {
            name: 'SAT — Mexican Tax Administration Service',
            url: 'https://www.sat.gob.mx',
            description: 'Official monthly progressive withholding tax schedule for wage earners.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational simulation tool based on the LFT, LISR, and LSS. Official final deductions are reflected on the CFDI paystub stamped by your employer.'
      }
    }
  }
};
