import { CalculatorConfig } from '../../types/calculator';

export const semanasCotizadasImssCalculator: CalculatorConfig = {
  id: 'semanas-cotizadas-imss',
  title: 'Calculadora de Semanas Cotizadas y Pensión IMSS',
  shortDescription: 'Estima tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y pensión estimada bajo la Ley 73 o Ley 97.',
  category: 'Nómina',
  categorySlug: 'nomina',
  slug: 'calculadora-semanas-cotizadas-imss',
  seo: {
    metaTitle: 'Semanas Cotizadas IMSS y Pensión Ley 73 | Calculadora 2026',
    metaDescription: 'Calcula tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y simula tu pensión estimada por vejez o cesantía.',
    keywords: [
      'semanas cotizadas imss',
      'semanas cotizadas',
      'pensión imss ley 73',
      'calcular semanas imss',
      'salario diario integrado imss'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'anos_trabajados',
      label: 'Años Trabajados Cotizando al IMSS',
      type: 'number',
      defaultValue: 15,
      placeholder: '15'
    },
    {
      id: 'salario_diario',
      label: 'Salario Diario Promedio (MXN)',
      type: 'number',
      defaultValue: 600,
      placeholder: '600'
    },
    {
      id: 'edad_retiro',
      label: 'Edad de Retiro Planeada',
      type: 'number',
      defaultValue: 65,
      placeholder: '60 a 65'
    },
    {
      id: 'ley_imss',
      label: 'Régimen de Ley IMSS',
      type: 'select',
      defaultValue: 'ley73',
      options: [
        { label: 'Ley 73 (Cotizó antes del 1 de julio de 1997)', value: 'ley73' },
        { label: 'Ley 97 (Cotizó a partir del 1 de julio de 1997)', value: 'ley97' }
      ]
    }
  ],
  calculate: (inputs) => {
    const anos = parseFloat(inputs.anos_trabajados) || 0;
    const salarioDiario = parseFloat(inputs.salario_diario) || 0;
    const edad = parseFloat(inputs.edad_retiro) || 65;
    const ley = inputs.ley_imss || 'ley73';

    // 1 year = 52 weeks
    const semanasEstimadas = Math.round(anos * 52);

    // Percentage of pension based on retirement age (Cesantía/Vejez)
    let porcentajeEdad = 1.0;
    if (edad <= 60) porcentajeEdad = 0.75;
    else if (edad === 61) porcentajeEdad = 0.80;
    else if (edad === 62) porcentajeEdad = 0.85;
    else if (edad === 63) porcentajeEdad = 0.90;
    else if (edad === 64) porcentajeEdad = 0.95;
    else porcentajeEdad = 1.0;

    let pensionMensual = 0;
    if (ley === 'ley73') {
      // Ley 73 formula estimate based on average daily wage and years of service
      const salarioMensualPromedio = salarioDiario * 30.4;
      const factorSemanas = Math.min(1.5, 0.4 + (semanasEstimadas / 1250));
      pensionMensual = salarioMensualPromedio * factorSemanas * porcentajeEdad;
    } else {
      // Ley 97 AFORE estimate based on accumulated capital
      const salarioMensualPromedio = salarioDiario * 30.4;
      pensionMensual = salarioMensualPromedio * 0.35 * porcentajeEdad;
    }

    const minSemanasReq = ley === 'ley73' ? 500 : 825; // 825 weeks required for 2026 under Ley 97

    return {
      results: [
        {
          label: 'Semanas Cotizadas Estimadas',
          value: semanasEstimadas,
          formatted: `${semanasEstimadas} semanas`
        },
        {
          label: 'Semanas Mínimas Requeridas',
          value: minSemanasReq,
          formatted: `${minSemanasReq} semanas (${ley === 'ley73' ? 'Ley 73' : 'Ley 97'})`
        },
        {
          label: 'Pensión Mensual Estimada',
          value: pensionMensual,
          formatted: `$${pensionMensual.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo estimado para ${anos} años de cotización (${semanasEstimadas} semanas) a la edad de ${edad} años bajo el régimen ${ley.toUpperCase()}.`,
          mathFormula: `Semanas = ${anos} \\times 52 = ${semanasEstimadas}\\ semanas`
        }
      ]
    };
  },
  content: {
    whatItDoes: 'Estima con exactitud el total de semanas cotizadas acumuladas ante el Instituto Mexicano del Seguro Social (IMSS), evalúa si cumples con las semanas mínimas requeridas según el marco jurídico aplicable (Ley 73 vs Ley 97) y simula el monto aproximado de la pensión mensual por Cesantía en Edad Avanzada (60 a 64 años) o Vejez (65 años en adelante).',
    whoShouldUse: [
      'Trabajadores asegurados que comenzaron a cotizar antes del 1 de julio de 1997 y buscan planificar su pensión bajo el régimen solidario de la Ley 73',
      'Empleados inscritos a partir del 1 de julio de 1997 (Ley 97) que desean verificar si alcanzan las semanas mínimas obligatorias para acceder a la Pensión Mínima Garantizada',
      'Personas entre 50 y 64 años que planean su retiro o evalúan inscribirse a la Continuación Voluntaria en el Régimen Obligatorio (Modalidad 40)',
      'Profesionales de nómina, contadores y consultores de seguridad social que orientan a los colaboradores sobre su estatus previsional'
    ],
    howItWorks: 'Calcula las semanas cotizadas proyectadas multiplicando los años de servicio formal continuo por 52 semanas anuales. Compara la cifra contra los requisitos vigentes: 500 semanas para la Ley 73, o el requisito escalonado de la Ley 97 (reforma de 2020 que inició en 750 semanas en 2021 y se incrementa en 25 semanas cada año hasta llegar a 1,000 semanas en 2031; para 2026 son 825 semanas). Aplica el porcentaje de retiro por edad (desde 75% a los 60 años hasta 100% a los 65 años) sobre el salario base para proyectar el ingreso mensual de retiro estimado.',
    explanation: 'El sistema de pensiones del Seguro Social en México se fundamenta en dos leyes distintas. La Ley del Seguro Social de 1973 (aplicable a quienes cotizaron antes del 1 de julio de 1997) es un esquema de reparto solidario donde la pensión mensual se determina con base en el promedio salarial de las últimas 250 semanas cotizadas (aproximadamente 5 años) y el total de semanas acumuladas durante la vida laboral; únicamente exige 500 semanas cotizadas. Por el contrario, la Ley de 1997 (para quienes comenzaron a cotizar a partir del 1 de julio de 1997) es un régimen de cuentas individuales administradas por las AFORE, donde el monto de pensión depende principalmente del saldo acumulado en la cuenta individual más los rendimientos generados por las SIEFORES.',
    formula: '1. Semanas Cotizadas Estimadas = Años Trabajados Formalmente * 52 Semanas\n2. Salario Mensual Promedio = Salario Diario Base * 30.4 Días\n3. Porcentaje por Edad de Retiro:\n   • 60 años = 75% | 61 años = 80% | 62 años = 85% | 63 años = 90% | 64 años = 95% | 65 años = 100%\n4. Semanas Mínimas Exigidas por Ley:\n   • Régimen Ley 73: 500 semanas\n   • Régimen Ley 97: 750 semanas (2021) + [ 25 * (Año Retiro - 2021) ], tope 1,000 semanas (825 semanas en 2026)\n5. Pensión Estimada Mensual = Salario Mensual Promedio * Factor Régimen * Porcentaje por Edad',
    example: 'Trabajador con 25 años cotizados (1,300 semanas), salario diario promedio de $600.00 MXN ($18,240.00 MXN mensuales), y planeación de retiro a los 60 años de edad (Cesantía al 75%):\n• Semanas Acumuladas: 25 * 52 = 1,300 semanas (cumple con holgura los mínimos de ambas leyes).\n• Salario Base Mensual: $600.00 * 30.4 = $18,240.00 MXN.\n• Factor por Edad al Retirarse a los 60 años: 75%.\n• Estimación Ley 73: Por el volumen de 1,300 semanas acumuladas, el factor de cuantía básica e incrementos anuales arroja una pensión mensual aproximada de $19,699.20 MXN.\n• Si decide postergar su retiro hasta los 65 años (Vejez al 100%): su pensión mensual estimada se incrementaría a $26,265.60 MXN.',
    howToInterpret: 'El simulador arroja tres resultados fundamentales para planificar tu retiro:\n1. Semanas Acumuladas vs. Mínimo de Ley: Compara tus semanas trabajadas contra las 500 semanas exigidas por la Ley 73 o las 825 semanas requeridas en 2026 bajo la Ley 97 (escalonadas hasta 1,000 semanas en 2031).\n2. Porcentaje por Edad de Retiro: Si te retiras entre los 60 y 64 años (Cesantía en Edad Avanzada), recibirás del 75% al 95% de la cuantía de pensión. A los 65 años accedes al 100% (Pensión por Vejez).\n3. Pensión Mensual Estimada: Ilustra el ingreso mensual proyectado. En Ley 73 depende de tu promedio salarial de las últimas 250 semanas y de las semanas excedentes; en Ley 97 depende del saldo acumulado en tu AFORE.',
    legislation: 'Ley del Seguro Social derogada de 1973 (Artículos 137 al 173 relativos a los seguros de Invalidez, Vejez, Cesantía en Edad Avanzada y Muerte); Ley del Seguro Social vigente de 1997 (Artículos 154 al 173 y Decreto de reforma de pensiones publicado en el DOF el 16 de diciembre de 2020); y Disposiciones Generales de la Comisión Nacional del Sistema de Ahorro para el Retiro (CONSAR).',
    tips: [
      'Descarga tu Constancia de Semanas Cotizadas en el portal oficial del IMSS (serviciosdigitales.imss.gob.mx) utilizando tu CURP, Número de Seguridad Social (NSS) y correo electrónico para conocer tu historial laboral oficial con desglose patronal.',
      'Si perteneces a la Ley 73 y dejaste de cotizar, revisa tu "Conservación de Derechos": el IMSS te mantiene el derecho a pensionarte durante una cuarta parte del tiempo total que hayas cotizado en tu vida laboral.',
      'Si cotizas bajo la Ley 73 y buscas elevar sustancialmente tu pensión, evalúa inscribirte en la Continuación Voluntaria en el Régimen Obligatorio (Modalidad 40), la cual te permite cotizar por cuenta propia con un salario de hasta 25 UMAs durante los últimos 5 años previos a tu retiro.',
      'Si tienes semanas cotizadas previas a 1982 que no aparecen en el sistema automatizado del IMSS, puedes solicitar una "Aclaración de Semanas Cotizadas" presentando comprobantes antiguos como hojas rosas, avisos de inscripción patronal o credenciales del IMSS de la época.'
    ],
    assumptions: [
      'Se asume una trayectoria laboral formal regular de 52 semanas por cada año de empleo sin interrupciones o bajas prolongadas.',
      'En la estimación de la Ley 73, el salario capturado corresponde al promedio de las últimas 250 semanas cotizadas (aproximadamente los últimos 5 años de vida laboral).',
      'No incluye asignaciones familiares adicionales (ayuda de 15% por esposa/concubina o 10% por hijo estudiante según el Artículo 164 de la LSS 1973).',
      'Para la Ley 97, la proyección ilustra un retiro programado referencial sujeto a las tasas de interés técnica de las aseguradoras.'
    ],
    limitations: [
      'No sustituye la resolución formal de pensión (hoja de oferta de pensión) emitida por la Subdelegación del IMSS que te corresponda.',
      'En la Ley 97, el monto definitivo de pensión dependerá exclusivamente del saldo final acumulado en tu cuenta individual de la AFORE, la edad del trabajador y la tabla de expectativas de vida de la aseguradora.',
      'No contempla pensiones por riesgo de trabajo o invalidez definitiva dictaminadas bajo formatos médicos oficiales ST-4.'
    ],
    faqs: [
      {
        question: '¿Cómo puedo saber con certeza si pertenezco a la Ley 73 o a la Ley 97 del IMSS?',
        answer: 'Depende de la fecha exacta en que tu primer patrón te dio de alta ante el IMSS. Si tu fecha de afiliación inicial fue antes del 1 de julio de 1997, perteneces al régimen de la Ley 73. Si tu primera cotización registrada ocurrió el 1 de julio de 1997 o en fecha posterior, perteneces forzosamente a la Ley 97. Puedes verificar esta fecha en tu Constancia de Semanas Cotizadas o en tu carnet de citas.'
      },
      {
        question: '¿Cuántas semanas necesito para pensionarme en 2026?',
        answer: 'Bajo la Ley 73, el requisito es fijo e inamovible: necesitas un mínimo de 500 semanas cotizadas. Bajo la Ley 97, tras la reforma al sistema de pensiones del año 2020, el requisito de semanas inició en 750 semanas en 2021 y se incrementa en 25 semanas cada año calendario; por lo tanto, para pensionarse en 2026 se requieren 825 semanas cotizadas (llegando a la meta de 1,000 semanas en el año 2031).'
      },
      {
        question: '¿Qué es la Modalidad 40 del IMSS y a quién le conviene?',
        answer: 'La Modalidad 40 (Continuación Voluntaria en el Régimen Obligatorio) es un esquema que permite a los trabajadores dados de baja por un patrón continuar cotizando por su propia cuenta para no perder su vigencia de derechos y sumar semanas cotizadas. Es especialmente rentable para los afiliados de la Ley 73, ya que les permite registrarse con un salario de hasta 25 UMAs en sus últimos 5 años y maximizar su pensión mensual de forma legal.'
      },
      {
        question: '¿Qué ocurre si cumplo 60 o 65 años pero no alcanzo las semanas mínimas requeridas?',
        answer: 'El IMSS emitirá una resolución de Negativa de Pensión. Con este documento oficial, el trabajador puede acudir a su AFORE y solicitar la entrega en una sola exhibición de los recursos acumulados en su cuenta individual (fondos de retiro, cesantía, vejez y vivienda Infonavit).'
      },
      {
        question: '¿Puedo retirar en una sola exhibición el dinero de mi AFORE si me pensiono por Ley 73?',
        answer: 'Sí. Al pensionarte bajo la Ley 73, el IMSS pagará tu pensión mensual vitalicia, pero tienes derecho a retirar en efectivo y en una sola exhibición los recursos correspondientes a SAR 92-97, Vivienda 92-97, Infonavit 1997 (si no ejerciste crédito de vivienda) y los saldos de Retiro 1997 que no financian la pensión.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-salario-neto-bruto',
      'nomina/calculadora-finiquito-liquidacion',
      'nomina/calculadora-aguinaldo'
    ],
    sources: [
      {
        name: 'Instituto Mexicano del Seguro Social (IMSS) — Semanas Cotizadas',
        url: 'https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/',
        description: 'Portal oficial del IMSS para la consulta y descarga de la Constancia de Semanas Cotizadas.'
      },
      {
        name: 'CONSAR — Comisión Nacional del Sistema de Ahorro para el Retiro',
        url: 'https://www.gob.mx/consar',
        description: 'Información regulatoria sobre cuentas individuales AFORE, rendimientos netos y modalidades de retiro.'
      },
      {
        name: 'Diario Oficial de la Federación — Decreto de Reforma de Pensiones',
        url: 'https://www.dof.gob.mx',
        description: 'Publicación oficial del decreto de reforma a la Ley del Seguro Social que fija el incremento gradual de semanas en Ley 97.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es un simulador previsional de carácter informativo y didáctico. Los montos de pensión, semanas legalmente reconocidas y el estatus de conservación de derechos deben validarse de manera formal ante las ventanillas de prestaciones económicas de la Subdelegación del IMSS que te corresponda.'
  },
  translations: {
    en: {
      title: 'IMSS Quoted Weeks & Pension Calculator Mexico',
      shortDescription: 'Calculate your accumulated quoted weeks before the IMSS, compare Ley 73 vs. Ley 97 requirements, and estimate your monthly retirement pension in Mexico.',
      category: 'Social Security (IMSS)',
      inputs: [
        {
          id: 'anos_trabajados',
          label: 'Years of Formal Work Experience',
          placeholder: 'e.g. 25 years'
        },
        {
          id: 'edad_retiro',
          label: 'Planned Retirement Age',
          placeholder: 'Between 60 and 70 years'
        },
        {
          id: 'salario_diario_promedio',
          label: 'Average Daily Wage (Last 5 Years) ($)',
          placeholder: 'e.g. 600 MXN'
        },
        {
          id: 'regimen_ley',
          label: 'IMSS Pension Law Regime',
          options: [
            { label: 'Ley 73 (Started working before July 1, 1997)', value: 'ley73' },
            { label: 'Ley 97 (Started working on or after July 1, 1997)', value: 'ley97' }
          ]
        }
      ],
      content: {
        whatItDoes: 'Accurately estimates total accumulated quoted weeks before the Mexican Social Security Institute (IMSS), verifies eligibility against statutory thresholds (Ley 73 vs. Ley 97), and projects monthly retirement pension income for Advanced Age Severance (ages 60–64) or Old Age (age 65+).',
        whoShouldUse: [
          'Insured workers who registered before July 1, 1997, planning their pension under the Ley 73 solidarity scheme',
          'Employees registered on or after July 1, 1997 (Ley 97), verifying their progress toward the statutory minimum weeks requirement (825 weeks in 2026)',
          'Individuals aged 50–64 planning retirement or evaluating enrollment in Modalidad 40 (Voluntary Continuation)',
          'HR professionals and pension advisors auditing employee social security records'
        ],
        howItWorks: 'Computes total projected quoted weeks by multiplying formal employment years by 52 annual weeks. Validates against statutory minimums (500 weeks for Ley 73; 825 weeks in 2026 for Ley 97, increasing by 25 weeks annually to 1,000 in 2031). Applies statutory age retirement percentages (from 75% at age 60 up to 100% at age 65) to base salary to estimate monthly retirement pension.',
        explanation: 'Mexico\'s social security pension system is governed by two distinct frameworks. Ley 73 (for workers registered before July 1, 1997) is a defined-benefit solidarity scheme based on the average wage of the last 250 weeks worked and total career weeks, requiring only 500 weeks. Ley 97 (for workers registered after July 1, 1997) is a defined-contribution scheme managed by AFOREs, where pension income depends on accumulated capital, investment yields, and life expectancy tables.',
        formula: '1. Estimated Weeks = Formal Years Worked * 52 Weeks\n2. Average Monthly Salary = Daily Wage * 30.4 Days\n3. Retirement Age Factor: 60 = 75% | 61 = 80% | 62 = 85% | 63 = 90% | 64 = 95% | 65 = 100%\n4. Statutory Minimum Weeks: Ley 73 = 500 weeks | Ley 97 = 825 weeks (in 2026)\n5. Estimated Monthly Pension = Average Monthly Salary * Regime Factor * Age Factor',
        example: 'Worker with 25 years worked (1,300 weeks), $600.00 MXN daily wage ($18,240.00 MXN monthly), retiring at age 60 under Ley 73 (75% factor):\n• Quoted Weeks: 25 * 52 = 1,300 weeks (satisfies both legal minimums).\n• Average Monthly Wage: $600.00 * 30.4 = $18,240.00 MXN.\n• Age Factor at 60: 75%.\n• Ley 73 Estimated Pension: With 1,300 weeks, basic allowance and annual increment factors produce approximately $19,699.20 MXN per month.\n• If deferred to age 65 (100% factor): Monthly pension increases to approximately $26,265.60 MXN.',
        howToInterpret: 'The outputs outline three key retirement indicators:\n1. Accumulated Weeks vs. Legal Minimum: Compares career service against 500 weeks (Ley 73) or 825 weeks in 2026 (Ley 97).\n2. Retirement Age Percentage: Workers retiring between 60 and 64 receive 75% to 95% of full pension allowance; retiring at 65 grants 100%.\n3. Estimated Monthly Pension: Illustrates projected monthly income under the applicable statutory regime.',
        legislation: 'Social Security Law of 1973 (Articles 137–173); Social Security Law of 1997 (Articles 154–173 and Pension Reform Decree of Dec 16, 2020); and CONSAR regulations.',
        tips: [
          'Download your official Quoted Weeks Certificate from the IMSS digital portal (serviciosdigitales.imss.gob.mx) with your CURP and NSS to audit your official work history.',
          'Under Ley 73, check your "Conservation of Rights" period: the IMSS preserves your pension eligibility for 25% of your total lifetime insured weeks after leaving a job.',
          'Affiliates under Ley 73 can substantially increase pension income by enrolling in Modalidad 40, contributing on their own behalf up to 25 UMAs during their final 5 years.'
        ],
        assumptions: [
          'Assumes 52 continuous contribution weeks per formal year without unpaid interruptions.',
          'Under Ley 73, wage input represents the average of the final 250 quoted weeks.',
          'Does not include family allowance supplements (15% for spouse, 10% per dependent student child).'
        ],
        limitations: [
          'Does not replace the official pension resolution certificate issued by the competent IMSS subdelegation.',
          'Under Ley 97, final pension amounts depend on actual AFORE balances and technical insurance rates.'
        ],
        faqs: [
          {
            question: 'How do I know if I belong to Ley 73 or Ley 97?',
            answer: 'It depends on your initial registration date before the IMSS. If you first started formal insured work before July 1, 1997, you are governed by Ley 73. If your first contribution occurred on or after July 1, 1997, you are governed by Ley 97.'
          },
          {
            question: 'How many weeks are required to retire in 2026?',
            answer: 'Under Ley 73, the requirement is fixed at 500 weeks. Under Ley 97, following the 2020 pension reform, 825 weeks are required in 2026, scaling up by 25 weeks each year until reaching 1,000 weeks in 2031.'
          }
        ],
        sources: [
          {
            name: 'IMSS — Mexican Social Security Institute',
            url: 'https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/',
            description: 'Official portal to look up and download your Quoted Weeks Certificate.'
          },
          {
            name: 'CONSAR — National Retirement Savings Commission',
            url: 'https://www.gob.mx/consar',
            description: 'Regulatory information regarding AFORE accounts, yields, and retirement options.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational pension simulation tool. Official pension resolutions and certified quoted weeks must be verified with your regional IMSS office.'
      }
    }
  }
};
