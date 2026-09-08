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
  }
};
