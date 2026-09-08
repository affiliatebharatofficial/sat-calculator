import { CalculatorConfig } from '../../types/calculator';

// General Minimum Wage in Mexico 2026 (CONASAMI Statutory Benchmark)
const MIN_WAGE_2026 = 315.04;

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

export const finiquitoCalculator: CalculatorConfig = {
  id: 'calculo-finiquito',
  title: 'Calculadora de Finiquito y Liquidación',
  shortDescription: 'Calcula lo que te corresponde recibir al terminar tu relación laboral, ya sea por renuncia voluntaria o por despido injustificado.',
  category: 'Nómina y LFT',
  categorySlug: 'nomina',
  slug: 'calculadora-finiquito-liquidacion',
  seo: {
    metaTitle: 'Calculadora de Finiquito y Liquidación LFT 2026',
    metaDescription: 'Calcula tu finiquito por renuncia o tu indemnización por despido injustificado (liquidación). Incluye prima de antigüedad y aguinaldo proporcional.',
    keywords: ['calculadora finiquito', 'liquidación por despido', 'indemnización constitucional lft', 'calcular finiquito renuncia', 'despido injustificado'],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_mensual',
      label: 'Sueldo Mensual Bruto ($)',
      type: 'number',
      defaultValue: 18000,
      placeholder: 'Sueldo bruto mensual ordinario',
      suffix: 'MXN'
    },
    {
      id: 'antiguedad_anos',
      label: 'Años completos laborados (Antigüedad)',
      type: 'number',
      defaultValue: 2,
      placeholder: 'Ej: 2 años'
    },
    {
      id: 'dias_anio_actual',
      label: 'Días laborados en el año de la baja (Transcurridos del año)',
      type: 'number',
      defaultValue: 180,
      placeholder: 'Ej: 180 días (aproximado a medio año)'
    },
    {
      id: 'salarios_devengados',
      label: 'Días trabajados pendientes de pago en el mes ($)',
      type: 'number',
      defaultValue: 5,
      placeholder: 'Días laborados desde el último pago quincenal/semanal'
    },
    {
      id: 'motivo',
      label: 'Motivo de salida',
      type: 'select',
      defaultValue: 'renuncia',
      options: [
        { label: 'Renuncia Voluntaria (Finiquito únicamente)', value: 'renuncia' },
        { label: 'Despido Injustificado / Recorte (Finiquito + Liquidación)', value: 'despido' }
      ]
    }
  ],
  calculate: (inputs, lang) => {
    const sueldoMensual = parseFloat(inputs.sueldo_mensual) || 0;
    const antiguedadAnos = parseFloat(inputs.antiguedad_anos) || 0;
    const diasAnioActual = Math.min(365, parseFloat(inputs.dias_anio_actual) || 0);
    const salariosDevengados = parseFloat(inputs.salarios_devengados) || 0;
    const motivo = inputs.motivo;
    const isEn = lang === 'en';

    const sueldoDiario = sueldoMensual / 30;

    // 1. FINIQUITO CALCULATION
    const pagoSalariosDevengados = sueldoDiario * salariosDevengados;

    // Proportional Aguinaldo (15 days per full year)
    const aguinaldoProporcional = ((sueldoDiario * 15) / 365) * diasAnioActual;

    // Proportional Vacations (Current year entitlement)
    const diasVacacionesEntitlement = getVacationDays(antiguedadAnos + 1);
    const vacacionesProporcionales = (diasVacacionesEntitlement / 365) * diasAnioActual;
    const pagoVacaciones = sueldoDiario * vacacionesProporcionales;

    // Proportional Prima Vacacional (25% minimum)
    const pagoPrimaVacacional = pagoVacaciones * 0.25;

    const subtotalFiniquito = pagoSalariosDevengados + aguinaldoProporcional + pagoVacaciones + pagoPrimaVacacional;

    // 2. LIQUIDACION CALCULATION
    let indemnizacion3Meses = 0;
    let indemnizacion20Dias = 0;
    let primaAntiguedad = 0;

    if (motivo === 'despido') {
      // 3 Months of salary
      indemnizacion3Meses = sueldoMensual * 3;

      // 20 Days of salary per year worked
      indemnizacion20Dias = sueldoDiario * 20 * antiguedadAnos;

      // Prima de antigüedad: 12 days per year, capped at 2x minimum wage
      const topeDiarioPrima = MIN_WAGE_2026 * 2;
      const cuotaDiariaPrima = Math.min(sueldoDiario, topeDiarioPrima);
      // Legally, prima applies for dismissal at any year, or resignation after 15 years
      primaAntiguedad = cuotaDiariaPrima * 12 * (antiguedadAnos + (diasAnioActual / 365));
    }

    const subtotalLiquidacion = indemnizacion3Meses + indemnizacion20Dias + primaAntiguedad;
    const totalRecibir = subtotalFiniquito + subtotalLiquidacion;

    const steps = [
      {
        description: isEn
          ? `Daily Wage: Gross Monthly Salary / 30.`
          : `Se calcula el Salario Diario: Sueldo Mensual / 30.`,
        mathFormula: `Salario\\ Diario = \\frac{$${sueldoMensual.toFixed(2)}}{30} = $${sueldoDiario.toFixed(2)}`
      },
      {
        description: isEn
          ? `Earned Unpaid Days: Daily wage x ${salariosDevengados} pending days.`
          : `Finiquito - Salarios Devengados por ${salariosDevengados} días pendientes de cobro en el mes.`,
        mathFormula: `Salarios\\ Devengados = $${sueldoDiario.toFixed(2)} \\times ${salariosDevengados} = $${pagoSalariosDevengados.toFixed(2)}`
      },
      {
        description: isEn
          ? `Proportional Christmas Bonus: (${diasAnioActual} days worked / 365) x 15 days statutory bonus.`
          : `Finiquito - Aguinaldo Proporcional por ${diasAnioActual} días del año transcurridos (sobre base de 15 días anuales).`,
        mathFormula: `Aguinaldo = \\frac{$${sueldoDiario.toFixed(2)} \\times 15}{365} \\times ${diasAnioActual} = $${aguinaldoProporcional.toFixed(2)}`
      },
      {
        description: isEn
          ? `Proportional Vacation: Entitlement of ${diasVacacionesEntitlement} days prorated for ${diasAnioActual} days.`
          : `Finiquito - Vacaciones Proporcionales (Para el año de antigüedad correspondiente le tocan ${diasVacacionesEntitlement} días de ley).`,
        mathFormula: `Vacaciones = \\frac{${diasVacacionesEntitlement}\\ d\\acute{\\imath}as}{365} \\times ${diasAnioActual} \\times $${sueldoDiario.toFixed(2)} = $${pagoVacaciones.toFixed(2)}`
      },
      {
        description: isEn
          ? `Vacation Bonus: 25% statutory minimum applied to accrued vacation pay.`
          : `Finiquito - Prima Vacacional Proporcional aplicando el 25% mínimo legal sobre las vacaciones.`,
        mathFormula: `Prima\\ Vacacional = $${pagoVacaciones.toFixed(2)} \\times 25\\% = $${pagoPrimaVacacional.toFixed(2)}`
      }
    ];

    if (motivo === 'despido') {
      steps.push({
        description: isEn
          ? `Severance - 90 Days Constitutional Indemnity (3 months gross salary).`
          : `Liquidación - Indemnización Constitucional equivalente a 3 meses (90 días) de salario bruto.`,
        mathFormula: `Indemnizaci\\acute{o}n\\ 3\\ Meses = $${sueldoMensual.toFixed(2)} \\times 3 = $${indemnizacion3Meses.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `Severance - 20 Days per year worked (${antiguedadAnos} completed years).`
          : `Liquidación - Indemnización adicional por despido equivalente a 20 días de sueldo por cada año completo trabajado (${antiguedadAnos} años).`,
        mathFormula: `20\\ D\\acute{\\imath}as\\ por\\ A\\tilde{n}o = $${sueldoDiario.toFixed(2)} \\times 20 \\times ${antiguedadAnos} = $${indemnizacion20Dias.toFixed(2)}`
      });
      steps.push({
        description: isEn
          ? `Severance - Seniority Premium: 12 days per year, capped at 2x 2026 minimum wage ($${(MIN_WAGE_2026 * 2).toFixed(2)} MXN).`
          : `Liquidación - Prima de Antigüedad equivalente a 12 días por año laborado (incluyendo partes proporcionales), con salario diario topado a 2 veces el salario mínimo general vigente 2026 ($${(MIN_WAGE_2026 * 2).toFixed(2)} MXN).`,
        mathFormula: `Prima\\ de\\ Antig\\ddot{u}edad = $${primaAntiguedad.toFixed(2)}`
      });
    }

    return {
      results: [
        { label: isEn ? 'Earned Unpaid Wages' : 'Salarios Devengados Pendientes', value: pagoSalariosDevengados, formatted: `$${pagoSalariosDevengados.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Proportional Christmas Bonus' : 'Aguinaldo Proporcional', value: aguinaldoProporcional, formatted: `$${aguinaldoProporcional.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Proportional Vacation' : 'Vacaciones Proporcionales', value: pagoVacaciones, formatted: `$${pagoVacaciones.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Proportional Vacation Bonus (25%)' : 'Prima Vacacional Proporcional (25%)', value: pagoPrimaVacacional, formatted: `$${pagoPrimaVacacional.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        { label: isEn ? 'Statutory Finiquito Subtotal' : 'Subtotal Finiquito (De Ley Obligatorio)', value: subtotalFiniquito, formatted: `$${subtotalFiniquito.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
        ...(motivo === 'despido' ? [
          { label: isEn ? 'Constitutional Indemnity (90 days)' : 'Indemnización Constitucional (90 días)', value: indemnizacion3Meses, formatted: `$${indemnizacion3Meses.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
          { label: isEn ? '20 Days per Year Indemnity' : 'Indemnización 20 Días por Año', value: indemnizacion20Dias, formatted: `$${indemnizacion20Dias.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
          { label: isEn ? 'Seniority Premium (12 days/yr capped)' : 'Prima de Antigüedad (12 días/año topado)', value: primaAntiguedad, formatted: `$${primaAntiguedad.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` },
          { label: isEn ? 'Severance Subtotal (Dismissal)' : 'Subtotal Liquidación por Despido', value: subtotalLiquidacion, formatted: `$${subtotalLiquidacion.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN` }
        ] : []),
        { label: isEn ? 'Total Gross Settlement Amount' : 'Total Bruto Sugerido a Recibir', value: totalRecibir, formatted: `$${totalRecibir.toLocaleString(isEn ? 'en-US' : 'es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, isMain: true }
      ],
      steps
    };
  },
  content: {
    whatItDoes: 'Calcula con precisión matemática y apego a la Ley Federal del Trabajo (LFT) el desglose de percepciones que le corresponden a un trabajador al concluir su relación laboral en México, distinguiendo entre renuncia voluntaria (finiquito con prestaciones devengadas) y despido injustificado (liquidación constitucional con indemnizaciones y prima de antigüedad).',
    whoShouldUse: [
      'Trabajadores que contemplan presentar su renuncia voluntaria y desean proyectar el cobro exacto de sus partes proporcionales de aguinaldo, vacaciones y salarios devengados',
      'Empleados que enfrentan un despido injustificado, reajuste de personal o terminación unilateral de contrato por el patrón y necesitan validar su propuesta de liquidación',
      'Especialistas de Recursos Humanos, contadores y gestores de nómina que elaboran convenios de terminación laboral conforme a la LFT',
      'Abogados y asesores en conciliación laboral que requieren un desglose transparente de conceptos para mediaciones ante el Centro de Conciliación'
    ],
    howItWorks: 'Determina el salario diario dividiendo el sueldo mensual bruto entre 30 días. Calcula las prestaciones devengadas irrenunciables (salarios no pagados, aguinaldo proporcional de mínimo 15 días, y vacaciones proporcionales con base en la tabla de Vacaciones Dignas más el 25% de prima vacacional). En caso de despido injustificado, adiciona la indemnización constitucional de 90 días (3 meses), la indemnización de 20 días por cada año laborado, y la prima de antigüedad de 12 días por año con salario topado a 2 veces el salario mínimo general vigente.',
    explanation: 'Al finalizar una relación laboral en México existen dos figuras jurídicas fundamentales: el Finiquito y la Liquidación. El Finiquito comprende los derechos irrenunciables que el trabajador ya devengó por el simple hecho de prestar sus servicios (salarios pendientes, proporción de aguinaldo, vacaciones no disfrutadas y prima vacacional); este pago corresponde en el 100% de las bajas, incluyendo la renuncia voluntaria. Por el contrario, la Liquidación o Indemnización Constitucional es una sanción económica y resarcitoria que la LFT impone al patrón cuando despide a un empleado sin una causa justificada de las previstas en el Artículo 47 de la LFT. La liquidación incluye 3 meses de salario, 20 días de compensación por año y la prima de antigüedad.',
    formula: '1. Salario Diario = Sueldo Mensual Bruto / 30\n2. Salarios Devengados = Salario Diario * Días Pendientes de Pago\n3. Aguinaldo Proporcional = ( ( Salario Diario * 15 ) / 365 ) * Días del Año en Curso\n4. Días Vacaciones según Antigüedad = Tabla Art. 76 LFT (12 días año 1, 14 año 2, etc.)\n5. Vacaciones Proporcionales = ( Días Vacaciones / 365 ) * Días del Año en Curso * Salario Diario\n6. Prima Vacacional = Vacaciones Proporcionales * 0.25\n7. Subtotal Finiquito = Salarios + Aguinaldo + Vacaciones + Prima Vacacional\n-- En caso de Despido Injustificado (Liquidación):\n8. Indemnización Constitucional = Sueldo Mensual * 3 (o Salario Diario * 90)\n9. 20 Días por Año = Salario Diario * 20 * Años de Antigüedad\n10. Prima de Antigüedad = Min(Salario Diario, 2 * Salario Mínimo) * 12 * Años Totales\n11. Total a Recibir = Subtotal Finiquito + Subtotal Liquidación',
    example: 'Para un trabajador con sueldo mensual de $18,000 MXN, 2 años cumplidos de antigüedad, 180 días laborados en el año actual, 5 días de salarios devengados y despido injustificado:\n• Salario Diario: $18,000 / 30 = $600.00 MXN\n• Salarios Devengados: $600 * 5 días = $3,000.00 MXN\n• Aguinaldo Proporcional: (($600 * 15) / 365) * 180 = $4,438.36 MXN\n• Vacaciones Proporcionales (año 3 le tocan 16 días): (16 / 365) * 180 * $600 = $4,734.25 MXN\n• Prima Vacacional (25%): $4,734.25 * 0.25 = $1,183.56 MXN\n• Subtotal Finiquito de Ley: $13,356.17 MXN\n• Indemnización Constitucional (3 meses): $18,000 * 3 = $54,000.00 MXN\n• 20 Días por Año (2 años): $600 * 20 * 2 = $24,000.00 MXN\n• Prima de Antigüedad: Al ser $600.00 inferior al tope de 2 salarios mínimos ($315.04 * 2 = $630.08), se aplica $600.00 * 12 días * 2.493 años = $17,949.60 MXN\n• Subtotal Liquidación por Despido: $95,949.60 MXN\n• Gran Total Bruto a Recibir: $109,305.77 MXN',
    legislation: 'Ley Federal del Trabajo (LFT): Artículos 47 (causas de rescisión patronal justificada), 48 (derecho a reinstalación o indemnización de 3 meses y salarios vencidos), 50 (indemnización de 20 días por año cuando no procede reinstalación), 76 al 81 (vacaciones anuales pagadas y prima mínima del 25%), 87 (pago de aguinaldo), y 162 (prima de antigüedad con tope salarial de dos salarios mínimos generales). Ley del Impuesto sobre la Renta (LISR): Artículo 93 Fracción XIII (exención fiscal de 90 UMAs por año laborado en indemnizaciones).',
    tips: [
      'Si te están despidiendo injustificadamente, jamás firmes una hoja en blanco o una carta de renuncia voluntaria: firmar la renuncia extingue legalmente tu derecho a reclamar la indemnización de 3 meses y los 20 días por año.',
      'Tienes un plazo legal perentorio de dos meses a partir del día siguiente al despido para acudir al Centro Federal o Local de Conciliación Laboral a solicitar una audiencia prejudicial obligatoria.',
      'La prima de antigüedad tiene un límite máximo diario legal equivalente a 2 veces el salario mínimo general vigente; aunque percibas un sueldo elevado, este concepto específico se calcula con dicho tope.',
      'Si el despido se formaliza legalmente, exige el desglose por escrito y verifica que las prestaciones devengadas (aguinaldo y vacaciones) no sean condicionadas a la aceptación de un porcentaje menor de indemnización.'
    ],
    assumptions: [
      'El cálculo se realiza con base en el salario nominal ordinario dividido entre 30 días civiles.',
      'Para la liquidación formal por despido, la ley marca el uso del Salario Diario Integrado (SDI) que adiciona las partes proporcionales de aguinaldo y prima vacacional a la base de cálculo de los 90 días y 20 días por año.',
      'Se asume un año civil estándar de 365 días para el prorrateo de prestaciones proporcionales.',
      'El cálculo no descuenta adeudos personales, créditos Infonavit ni préstamos internos que pudieran existir.'
    ],
    limitations: [
      'No calcula salarios caídos ni intereses procesales derivados de un juicio laboral contencioso que sobrepase los plazos de conciliación.',
      'No aplica para trabajadores del apartado B (servidores públicos regidos por leyes burocráticas especiales y tribunales federales de conciliación).',
      'No realiza el cálculo final de retención de ISR sobre finiquito y liquidación, el cual requiere aplicar la tarifa del Art. 96 LISR para prestaciones ordinarias y el procedimiento de tasa efectiva del Art. 95 LISR para las indemnizaciones.'
    ],
    faqs: [
      {
        question: '¿Cuál es la diferencia legal entre finiquito y liquidación?',
        answer: 'El finiquito es el pago de los derechos laborales ya ganados por el trabajador (salarios pendientes, aguinaldo proporcional, vacaciones y prima vacacional no disfrutadas) y se entrega obligatoriamente en cualquier terminación, incluida la renuncia. La liquidación es una indemnización que se paga exclusivamente cuando el trabajador es despedido injustificadamente o cuando la empresa cierra, e integra 3 meses de salario, 20 días por año laborado y prima de antigüedad.'
      },
      {
        question: '¿Me corresponde prima de antigüedad si presento mi renuncia voluntaria?',
        answer: 'Por regla general no, a menos que tengas cumplidos 15 años de servicio ininterrumpido en la empresa (Art. 162 Fracción III LFT). Sin embargo, si eres despedido —ya sea con justificación legal o sin ella—, o si te separas con causa imputable al patrón (rescisión justificada), la prima de antigüedad de 12 días por año es obligatoria sin importar los años que lleves laborando.'
      },
      {
        question: '¿Cómo se calcula el tope de la prima de antigüedad?',
        answer: 'El Artículo 486 de la Ley Federal del Trabajo establece que si el salario que percibe el trabajador excede del doble del salario mínimo de la zona geográfica correspondiente, se considerará esa suma (2 salarios mínimos) como salario máximo para el pago de la prima de antigüedad. Si el salario del trabajador es inferior al doble del salario mínimo, se toma su salario diario real.'
      },
      {
        question: '¿Cuánto tiempo tengo para demandar si sufro un despido injustificado?',
        answer: 'Conforme al Artículo 518 de la LFT, el plazo legal es de dos meses contados a partir del día siguiente a la fecha del despido. Actualmente es obligatorio iniciar primero un procedimiento de conciliación prejudicial ante el Centro Federal o Local de Conciliación Laboral, el cual suspende temporalmente el cómputo del plazo de prescripción.'
      },
      {
        question: '¿La indemnización por despido paga impuestos al SAT?',
        answer: 'El Artículo 93 Fracción XIII de la Ley del ISR otorga una exención de hasta 90 veces el valor de la UMA diaria por cada año completo de servicios prestados (o fracciones mayores a 6 meses). El monto de la liquidación que supere este límite de exención acumulado causará retención de ISR conforme a la tasa efectiva del último sueldo ordinario mensual del trabajador.'
      }
    ],
    relatedCalculators: [
      'nomina/calculadora-aguinaldo',
      'nomina/calculadora-salario-neto-bruto',
      'nomina/calculadora-semanas-cotizadas-imss'
    ],
    sources: [
      {
        name: 'PROFEDET — Procuraduría Federal de la Defensa del Trabajo',
        url: 'https://www.gob.mx/profedet',
        description: 'Guía oficial de derechos y acompañamiento legal gratuito ante despidos y pago de finiquitos en México.'
      },
      {
        name: 'Centro Federal de Conciliación y Registro Laboral (CFCRL)',
        url: 'https://centrolaboral.gob.mx',
        description: 'Instancia federal obligatoria para la conciliación prejudicial de conflictos individuales y colectivos de trabajo.'
      },
      {
        name: 'Cámara de Diputados — Ley Federal del Trabajo',
        url: 'https://www.diputados.gob.mx',
        description: 'Texto vigente de los Artículos 48, 50, 76, 87 y 162 de la Ley Federal del Trabajo.'
      }
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta calculadora es una herramienta interactiva con fines puramente informativos y de orientación general. La cuantificación definitiva de liquidaciones, integración del salario (SDI) y exenciones fiscales debe ser formalizada ante el Centro de Conciliación Laboral o validada por un profesional en derecho del trabajo.'
  },
  translations: {
    en: {
      title: 'Severance & Settlement Calculator (Mexico LFT)',
      shortDescription: 'Calculate the statutory settlement amount you are entitled to receive when leaving a job in Mexico, whether by voluntary resignation (Finiquito) or unjustified dismissal (Liquidación).',
      category: 'Payroll & Labor',
      inputs: [
        {
          id: 'sueldo_mensual',
          label: 'Gross Monthly Salary ($)',
          placeholder: 'Regular monthly salary'
        },
        {
          id: 'antiguedad_anos',
          label: 'Completed Years of Service',
          placeholder: 'e.g. 2 years'
        },
        {
          id: 'dias_anio_actual',
          label: 'Days Worked in Current Year',
          placeholder: 'e.g. 180 days'
        },
        {
          id: 'salarios_devengados',
          label: 'Unpaid Worked Days in Month',
          placeholder: 'Days worked since last pay period'
        },
        {
          id: 'motivo',
          label: 'Termination Reason',
          options: [
            { label: 'Voluntary Resignation (Finiquito Only)', value: 'renuncia' },
            { label: 'Unjustified Dismissal / Layoff (Finiquito + Severance)', value: 'despido' }
          ]
        }
      ],
      content: {
        whatItDoes: 'Calculates the statutory compensation owed to an employee upon terminating employment in Mexico under the Federal Labor Law (LFT), distinguishing between voluntary resignation (accrued entitlements) and unjustified dismissal (constitutional 3-month severance, 20 days per year, and seniority premium).',
        whoShouldUse: [
          'Employees evaluating voluntary resignation who want to estimate accrued bonus, vacation, and unpaid salary',
          'Workers facing layoff or termination who need to verify employer severance proposals against statutory minimums',
          'Human resources specialists and payroll managers drafting legal termination agreements',
          'Labor attorneys and mediators at the Federal Center of Conciliation'
        ],
        howItWorks: 'Computes daily base wage by dividing gross monthly salary by 30. Calculates accrued, non-forfeitable entitlements (unpaid days, prorated 15-day Christmas bonus, and prorated vacation pay under Vacaciones Dignas plus a 25% bonus). For unjustified dismissal, adds constitutional 90-day severance, 20 days per year worked, and seniority premium of 12 days per year capped at 2x minimum wage.',
        explanation: 'Mexican labor legislation (LFT) defines two core separation remedies: Finiquito and Liquidación. Finiquito represents accrued statutory entitlements that the worker earned through service and is non-negotiable regardless of departure cause. Liquidación represents economic indemnification required when an employer terminates employment without just cause under Article 47 LFT.',
        formula: '1. Daily Wage = Monthly Salary / 30\n2. Unpaid Wages = Daily Wage * Unpaid Days\n3. Accrued Christmas Bonus = ( (Daily Wage * 15) / 365 ) * Days Worked in Year\n4. Accrued Vacation = ( Statutory Vacation Days / 365 ) * Days Worked in Year * Daily Wage\n5. Vacation Bonus = Accrued Vacation * 0.25\n-- Dismissal Severance Additions:\n6. Constitutional Indemnity = Monthly Salary * 3\n7. 20 Days/Year = Daily Wage * 20 * Years Worked\n8. Seniority Premium = Min(Daily Wage, 2 * Minimum Wage) * 12 * Total Years Worked',
        example: 'Worker with $18,000 MXN gross monthly salary, 2 completed years of seniority, 180 days worked in current year, 5 unpaid earned days, dismissed without cause:\n• Daily Wage: $18,000 / 30 = $600.00 MXN\n• Earned Wages: $600 * 5 = $3,000.00 MXN\n• Prorated Christmas Bonus: (($600 * 15) / 365) * 180 = $4,438.36 MXN\n• Prorated Vacation (year 3 entitlement 16 days): (16 / 365) * 180 * $600 = $4,734.25 MXN\n• Vacation Bonus (25%): $4,734.25 * 0.25 = $1,183.56 MXN\n• Finiquito Subtotal: $13,356.17 MXN\n• Constitutional Indemnity (3 months): $18,000 * 3 = $54,000.00 MXN\n• 20 Days/Year (2 years): $600 * 20 * 2 = $24,000.00 MXN\n• Seniority Premium: Since $600.00 is below the 2x minimum wage cap ($315.04 * 2 = $630.08), applies $600.00 * 12 * 2.493 = $17,949.60 MXN\n• Dismissal Severance Subtotal: $95,949.60 MXN\n• Total Gross Payout: $109,305.77 MXN',
        legislation: 'Federal Labor Law (LFT), Articles 47, 48, 50, 76-81, 87, and 162; Income Tax Law (LISR), Article 93 Section XIII (90 UMA per year severance tax exemption).',
        tips: [
          'If being dismissed without cause, never sign a blank paper or voluntary resignation letter, as doing so forfeits the right to 3-month severance.',
          'You have a strict statutory limit of two months from the day following dismissal to file for mandatory conciliation at the Labor Conciliation Center.',
          'Seniority premium has a mandatory statutory daily cap equal to twice the general minimum wage.'
        ],
        assumptions: [
          'Calculations are based on nominal base pay divided by 30 civil days.',
          'Prorating assumes a standard 365-day calendar year.',
          'Does not subtract personal loans or Infonavit deductions.'
        ],
        limitations: [
          'Does not calculate procedural interest or lost wages arising from prolonged contentious lawsuits beyond conciliation stages.',
          'Does not apply to public-sector government employees governed under Article 123 Apartado B.',
          'Does not calculate final ISR tax withholdings under Article 95 LISR.'
        ],
        faqs: [
          {
            question: 'What is the difference between Finiquito and Liquidación in Mexico?',
            answer: 'Finiquito includes earned entitlements (unpaid wages, prorated Christmas bonus, unused vacation and vacation bonus) payable in all separations including resignation. Liquidación is indemnification payable exclusively for unjustified dismissal or company shutdown, comprising 3 months salary, 20 days per year, and seniority premium.'
          },
          {
            question: 'Am I entitled to seniority premium if I voluntarily resign?',
            answer: 'Generally no, unless you have completed at least 15 uninterrupted years of service with the employer (Art. 162 Section III LFT). However, if dismissed (with or without cause), seniority premium is mandatory regardless of tenure.'
          }
        ],
        sources: [
          {
            name: 'PROFEDET — Federal Labor Defense Bureau',
            url: 'https://www.gob.mx/profedet',
            description: 'Official Mexican government agency providing free legal defense for workers in termination disputes.'
          }
        ],
        lastUpdated: 'Verified for Fiscal Year 2026',
        disclaimer: 'This calculator is an educational simulation tool. Final severance payouts and integrated wage calculations must be certified before the Labor Conciliation Center or an authorized labor attorney.'
      }
    }
  }
};
