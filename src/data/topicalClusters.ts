import { TopicalCluster } from '@/types/topicalClusters';

export const TOPICAL_CLUSTERS: TopicalCluster[] = [
  {
    id: 'isr',
    name: 'Impuesto Sobre la Renta (ISR)',
    nameEn: 'Income Tax (ISR)',
    shortDescription: 'Tarifas progresivas de retención mensual, límites inferiores, cuotas fijas y cálculo anual para personas físicas y morales.',
    shortDescriptionEn: 'Progressive monthly withholding tables, lower limits, fixed fees, and annual income tax calculations.',
    calculators: [
      {
        slug: 'calculadora-isr',
        categorySlug: 'sat',
        title: 'Calculadora de ISR Personas Físicas',
        titleEn: 'Individual Income Tax (ISR) Calculator',
        contextualAnchor: 'Calcular retención de ISR mensual y anual',
        contextualAnchorEn: 'Calculate monthly and annual ISR withholding',
        description: 'Simula el impuesto a cargo aplicando las tarifas vigentes del Artículo 96 y 152 de la LISR.',
        descriptionEn: 'Simulate income tax liability using statutory progressive tax brackets.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-salario-neto',
        categorySlug: 'nomina',
        title: 'Calculadora de Salario Neto y Nómina',
        titleEn: 'Net Salary and Payroll Calculator',
        contextualAnchor: 'Ver desglose de retención de ISR en nómina',
        contextualAnchorEn: 'View payroll ISR withholding breakdown',
        description: 'Conoce exactamente cuánto te descuentan de ISR e IMSS en tu sueldo quincenal o mensual.',
        descriptionEn: 'Determine exact payroll ISR and social security deductions from your salary.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-isr-pm',
        categorySlug: 'sat',
        title: 'Calculadora de ISR Personas Morales',
        titleEn: 'Corporate Income Tax (ISR) Calculator',
        contextualAnchor: 'Estimar pagos provisionales de ISR corporativo',
        contextualAnchorEn: 'Estimate corporate monthly provisional tax payments',
        description: 'Aplica el coeficiente de utilidad y la tasa general del 30% a personas morales.',
        descriptionEn: 'Apply profit coefficient and the standard 30% corporate rate.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-recargos-sat',
        categorySlug: 'sat',
        title: 'Calculadora de Recargos y Actualización SAT',
        titleEn: 'SAT Late Payment & Interest Calculator',
        contextualAnchor: 'Calcular recargos por pago extemporáneo de ISR',
        contextualAnchorEn: 'Calculate late payment surcharges and inflation adjustment',
        description: 'Determina la actualización por INPC y recargos moratorios según el CFF.',
        descriptionEn: 'Determine inflation adjustment and late interest surcharges.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'como-calcular-el-isr-mexico-guia-paso-a-paso',
        title: 'Cómo calcular el ISR en México (2026): Guía paso a paso con tarifas y ejemplos prácticos',
        titleEn: 'How to calculate income tax (ISR) in Mexico: Step-by-step guide with tables',
        contextualAnchor: 'Consultar la guía paso a paso de tarifas de ISR',
        contextualAnchorEn: 'Read the step-by-step guide on ISR tax tables',
        description: 'Aprende a interpretar el límite inferior, excedente, cuota fija y la diferencia entre tasa marginal y efectiva.',
        descriptionEn: 'Learn how to interpret lower bracket limits, excess income, fixed quotas, and marginal vs effective tax rates.',
        isPrimary: true,
      },
      {
        slug: 'deducciones-personales-sat-2026-guia-y-limites',
        title: 'Deducciones Personales SAT 2026: Guía Completa, Límites en UMA y Requisitos',
        titleEn: 'Personal Tax Deductions SAT 2026: Limits and Requirements',
        contextualAnchor: 'Revisar deducciones personales permitidas para reducir tu ISR anual',
        contextualAnchorEn: 'Review allowed personal deductions to reduce annual income tax',
        description: 'Conoce los requisitos del Artículo 151 de la LISR para obtener saldo a favor en abril.',
        descriptionEn: 'Understand Article 151 deduction caps to maximize your tax refund in April.',
        isPrimary: false,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Identificación de tablas y tarifas oficiales de ISR',
      labelEn: 'Methodology: Identification of official statutory ISR tables',
    },
    primarySources: [
      {
        sourceId: 'lisr-art-96-152',
        institution: 'Cámara de Diputados / SAT',
        documentTitle: 'Ley del Impuesto Sobre la Renta (LISR) - Artículos 96 y 152',
        anchor: '/fuentes#lisr-art-96-152',
      }
    ]
  },
  {
    id: 'iva',
    name: 'Impuesto al Valor Agregado (IVA)',
    nameEn: 'Value Added Tax (IVA)',
    shortDescription: 'Cálculo de la tasa general del 16%, estímulo fronterizo al 8%, desglose de subtotal y acreditamiento en declaraciones mensuales.',
    shortDescriptionEn: 'Calculation of standard 16% VAT, 8% border incentive, net subtotal extraction, and monthly crediting.',
    calculators: [
      {
        slug: 'calculadora-iva',
        categorySlug: 'sat',
        title: 'Calculadora de IVA (16% y 8%)',
        titleEn: 'Value Added Tax (IVA) Calculator',
        contextualAnchor: 'Calcular o desglosar el 16% de IVA en línea',
        contextualAnchorEn: 'Calculate or separate 16% VAT online',
        description: 'Agrega o quita el IVA a cualquier cantidad con desglose inmediato de subtotal e impuesto.',
        descriptionEn: 'Add or extract VAT from any price with instant breakdown.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-conversor-impuestos',
        categorySlug: 'sat',
        title: 'Conversor Bruto a Neto con IVA e ISR',
        titleEn: 'Gross to Net Tax Converter with VAT and ISR',
        contextualAnchor: 'Convertir cotización bruta a neta con retenciones de IVA e ISR',
        contextualAnchorEn: 'Convert gross quote to net take-home with VAT and ISR',
        description: 'Calcula el desglose final para facturas de honorarios a personas morales.',
        descriptionEn: 'Compute the full breakdown for service invoices to legal entities.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-punto-equilibrio',
        categorySlug: 'negocios',
        title: 'Calculadora de Punto de Equilibrio',
        titleEn: 'Break-Even Point Calculator',
        contextualAnchor: 'Calcular punto de equilibrio considerando costos e IVA',
        contextualAnchorEn: 'Calculate break-even units taking VAT into account',
        description: 'Determina las unidades mínimas de venta para cubrir costos fijos y obligaciones.',
        descriptionEn: 'Determine minimum sales volume to cover fixed costs and obligations.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'como-calcular-quitar-iva-mexico-formulas',
        title: 'Cómo calcular y desglosar el IVA en México: Fórmulas para agregar y quitar el 16%',
        titleEn: 'How to calculate and separate VAT in Mexico: Formulas to add and remove 16%',
        contextualAnchor: 'Consultar fórmulas para agregar o quitar el IVA sin errores',
        contextualAnchorEn: 'Review formulas to add or extract VAT correctly',
        description: 'Aprende por qué dividir entre 1.16 es la única operación correcta y cómo opera el IVA acreditable.',
        descriptionEn: 'Discover why dividing by 1.16 is mathematically necessary and how crediting works.',
        isPrimary: true,
      }
    ],
    methodology: {
      anchor: '/metodologia#extraccion-formulas',
      stepNumber: 2,
      label: 'Metodología: Fórmulas aritméticas de traslación y desglose de IVA',
      labelEn: 'Methodology: Arithmetic formulas for VAT translation and breakdown',
    },
    primarySources: [
      {
        sourceId: 'liva-general',
        institution: 'Cámara de Diputados / SAT',
        documentTitle: 'Ley del Impuesto al Valor Agregado (LIVA) - Artículos 1, 1-A, 2-A, 4 y 5',
        anchor: '/fuentes#liva-general',
      }
    ]
  },
  {
    id: 'resico',
    name: 'Régimen Simplificado de Confianza (RESICO)',
    nameEn: 'Simplified Trust Regime (RESICO)',
    shortDescription: 'Tasas fijas del 1% al 2.5%, retención del 1.25% por personas morales, incompatibilidades y acreditamiento de IVA.',
    shortDescriptionEn: 'Flat rates from 1% to 2.5%, 1.25% withholding by companies, eligibility criteria, and VAT crediting.',
    calculators: [
      {
        slug: 'calculadora-resico-pf',
        categorySlug: 'sat',
        title: 'Calculadora RESICO Personas Físicas',
        titleEn: 'RESICO Individual Income Tax Calculator',
        contextualAnchor: 'Calcular impuesto mensual en RESICO',
        contextualAnchorEn: 'Calculate monthly RESICO income tax',
        description: 'Aplica las tasas preferenciales del 1.00% al 2.50% sobre ingresos cobrados brutos.',
        descriptionEn: 'Apply preferential rates from 1.00% to 2.50% on collected revenues.',
        isPrimary: true,
      },
      {
        slug: 'comparador-resico-actividad-empresarial',
        categorySlug: 'sat',
        title: 'Comparador RESICO vs Actividad Empresarial',
        titleEn: 'RESICO vs General Business Regime Comparator',
        contextualAnchor: 'Comparar ahorro fiscal entre RESICO y Régimen General',
        contextualAnchorEn: 'Compare tax savings between RESICO and General Regime',
        description: 'Analiza tu margen de gastos deducibles para saber cuál régimen te conviene más.',
        descriptionEn: 'Analyze your deductible profit margin to find your break-even regime.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-iva',
        categorySlug: 'sat',
        title: 'Calculadora de IVA',
        titleEn: 'VAT Calculator',
        contextualAnchor: 'Calcular IVA acreditable y trasladado en RESICO',
        contextualAnchorEn: 'Calculate creditable and collected VAT for RESICO',
        description: 'Simula el IVA que debes pagar mensualmente tras acreditar tus facturas de gastos.',
        descriptionEn: 'Simulate monthly VAT due after crediting expense invoices.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'guia-resico-personas-fisicas-requisitos-tasas-obligaciones',
        title: 'Guía Completa de RESICO Personas Físicas (2026): Requisitos, tasas, facturación y retención del 1.25%',
        titleEn: 'Complete Guide to RESICO Individuals (2026): Rates, Invoicing & 1.25% Withholding',
        contextualAnchor: 'Leer la guía completa sobre obligaciones y retención en RESICO',
        contextualAnchorEn: 'Read the complete guide on RESICO obligations and withholding',
        description: 'Todo sobre el tope de 3.5 millones, retención de empresas, buzón tributario y e.firma.',
        descriptionEn: 'Everything regarding the 3.5M cap, corporate withholding, tax mailbox, and e.firma.',
        isPrimary: true,
      },
      {
        slug: 'resico-vs-actividad-empresarial-cual-conviene-2026',
        title: 'RESICO vs Actividad Empresarial: ¿Cuál te conviene más en 2026?',
        titleEn: 'RESICO vs. General Business Tax Regime: 2026 Comparison',
        contextualAnchor: 'Analizar la comparativa a fondo entre RESICO y Actividad Empresarial',
        contextualAnchorEn: 'Review the in-depth comparison between RESICO and General Regime',
        description: 'Estudio financiero sobre punto de equilibrio, impacto de deducciones y exclusiones societarias.',
        descriptionEn: 'Financial breakdown of profit margin break-even points and corporate exclusions.',
        isPrimary: false,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Reglas del Artículo 113-E y 113-J de la LISR',
      labelEn: 'Methodology: Rules of Article 113-E and 113-J of LISR',
    },
    primarySources: [
      {
        sourceId: 'lisr-resico-113-e',
        institution: 'Cámara de Diputados / SAT',
        documentTitle: 'Ley del Impuesto Sobre la Renta (LISR) - Artículos 113-E al 113-J',
        anchor: '/fuentes#lisr-resico-113-e',
      }
    ]
  },
  {
    id: 'nomina',
    name: 'Nómina y Sueldos en México',
    nameEn: 'Payroll & Salaries in Mexico',
    shortDescription: 'Cálculo de sueldo bruto a neto, retenciones de ISR de nómina, cuotas del IMSS y prestaciones mínimas de ley.',
    shortDescriptionEn: 'Gross to net salary calculation, payroll ISR withholding, IMSS social security, and statutory labor benefits.',
    calculators: [
      {
        slug: 'calculadora-salario-neto',
        categorySlug: 'nomina',
        title: 'Calculadora de Salario Neto',
        titleEn: 'Net Take-Home Salary Calculator',
        contextualAnchor: 'Calcular sueldo neto quincenal o mensual',
        contextualAnchorEn: 'Calculate biweekly or monthly net salary',
        description: 'Desglosa de manera transparente el salario base, cuotas del IMSS y retención de ISR.',
        descriptionEn: 'Itemizes base pay, IMSS contributions, and monthly income tax withholdings.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-horas-extra',
        categorySlug: 'nomina',
        title: 'Calculadora de Horas Extra',
        titleEn: 'Overtime Hours Calculator',
        contextualAnchor: 'Calcular pago de horas extras dobles y triples',
        contextualAnchorEn: 'Calculate payment for double and triple overtime hours',
        description: 'Aplica las reglas de las primeras 9 horas semanales al 100% adicional conforme a la LFT.',
        descriptionEn: 'Apply statutory overtime rules for first 9 weekly hours under Mexican labor law.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-ptu-reparto-utilidades',
        categorySlug: 'nomina',
        title: 'Calculadora de PTU (Reparto de Utilidades)',
        titleEn: 'Profit Sharing (PTU) Calculator',
        contextualAnchor: 'Estimar pago de utilidades laborales con tope de 3 meses',
        contextualAnchorEn: 'Estimate profit-sharing payout with 3-month statutory cap',
        description: 'Simula el reparto obligatorio del 10% de utilidades fiscales conforme al Art. 127 de la LFT.',
        descriptionEn: 'Simulate statutory 10% profit-sharing distribution under Art. 127 LFT.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'sueldo-bruto-vs-neto-mexico-retenciones-isr-imss',
        title: 'Sueldo Bruto vs Sueldo Neto en México (2026): Desglose exacto de retenciones de ISR e IMSS',
        titleEn: 'Gross vs Net Salary in Mexico: Detailed ISR and IMSS Deductions',
        contextualAnchor: 'Ver la guía explicativa sobre diferencias entre sueldo bruto y neto',
        contextualAnchorEn: 'Read the guide explaining gross vs net salary differences',
        description: 'Aprende cómo se compone el Salario Base de Cotización (SBC) y qué porcentaje te descuenta el IMSS.',
        descriptionEn: 'Learn how the Base Contribution Wage (SBC) is integrated and what percentage IMSS deducts.',
        isPrimary: true,
      },
      {
        slug: 'como-calcular-el-isr-mexico-guia-paso-a-paso',
        title: 'Cómo calcular el ISR en México (2026): Guía paso a paso',
        titleEn: 'How to calculate income tax in Mexico: Step-by-step',
        contextualAnchor: 'Aprender cómo se calcula el ISR que descuentan en tu nómina',
        contextualAnchorEn: 'Learn how payroll income tax withholdings are determined',
        description: 'Conoce los escalones de la tarifa mensual que tu empleador aplica a tu recibo.',
        descriptionEn: 'Understand the monthly tariff brackets your employer applies to your paystub.',
        isPrimary: false,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Integración de nómina conforme a LFT y LSS',
      labelEn: 'Methodology: Payroll integration under LFT and Social Security statutes',
    },
    primarySources: [
      {
        sourceId: 'lss-cuotas-obreras',
        institution: 'Instituto Mexicano del Seguro Social (IMSS)',
        documentTitle: 'Ley del Seguro Social (LSS) - Artículos 27, 28, 106, 147 y 168',
        anchor: '/fuentes#lss-cuotas-obreras',
      },
      {
        sourceId: 'lisr-art-96-152',
        institution: 'Cámara de Diputados / SAT',
        documentTitle: 'Ley del Impuesto Sobre la Renta (LISR) - Artículo 96',
        anchor: '/fuentes#lisr-art-96-152',
      }
    ]
  },
  {
    id: 'imss',
    name: 'IMSS y Seguridad Social',
    nameEn: 'IMSS & Social Security',
    shortDescription: 'Cálculo de semanas cotizadas, aportaciones obrero-patronales, pensiones Ley 73 y Ley 97, y saldo de AFORE.',
    shortDescriptionEn: 'Calculations for registered weeks, employer-employee contributions, Ley 73/97 pensions, and AFORE retirement.',
    calculators: [
      {
        slug: 'calculadora-semanas-cotizadas-imss',
        categorySlug: 'nomina',
        title: 'Calculadora de Semanas Cotizadas IMSS',
        titleEn: 'IMSS Contributed Weeks Calculator',
        contextualAnchor: 'Calcular semanas cotizadas acumuladas ante el IMSS',
        contextualAnchorEn: 'Calculate total accumulated weeks under IMSS',
        description: 'Estima tus semanas de trabajo efectivas para cumplir los requisitos de pensión.',
        descriptionEn: 'Estimate your contributed working weeks for Mexican pension qualification.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-afore',
        categorySlug: 'finanzas-personales',
        title: 'Calculadora de AFORE y Retiro',
        titleEn: 'AFORE and Retirement Pension Calculator',
        contextualAnchor: 'Proyectar ahorro y pensión estimada en tu AFORE',
        contextualAnchorEn: 'Project savings and estimated retirement pension in your AFORE',
        description: 'Simula el crecimiento de tu saldo con aportaciones obligatorias y voluntarias.',
        descriptionEn: 'Simulate balance growth with mandatory and voluntary retirement savings.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-salario-neto',
        categorySlug: 'nomina',
        title: 'Calculadora de Salario Neto',
        titleEn: 'Net Salary Calculator',
        contextualAnchor: 'Calcular cuotas obreras del IMSS descontadas en nómina',
        contextualAnchorEn: 'Calculate employee IMSS deductions from paystub',
        description: 'Revisa las cuotas obreras por ramos de cesantía, vejez, enfermedad y vida.',
        descriptionEn: 'Review employee contributions for illness, life, disability, and retirement.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'sueldo-bruto-vs-neto-mexico-retenciones-isr-imss',
        title: 'Sueldo Bruto vs Sueldo Neto en México (2026): Desglose exacto de retenciones de ISR e IMSS',
        titleEn: 'Gross vs Net Salary in Mexico: Detailed Deductions',
        contextualAnchor: 'Conocer qué porcentaje te descuenta el IMSS y por qué conceptos',
        contextualAnchorEn: 'Find out what percentage IMSS withholds and for what branches',
        description: 'Desglose técnico de cuotas de Enfermedad, Invalidez, Cesantía y Vejez.',
        descriptionEn: 'Technical breakdown of healthcare, disability, and retirement quotas.',
        isPrimary: true,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Disposiciones de seguridad social de la Ley del Seguro Social',
      labelEn: 'Methodology: Social security provisions under the Mexican Social Security Act',
    },
    primarySources: [
      {
        sourceId: 'lss-cuotas-obreras',
        institution: 'Instituto Mexicano del Seguro Social (IMSS)',
        documentTitle: 'Ley del Seguro Social (LSS) - Artículos 27, 28, 106, 147 y 168',
        anchor: '/fuentes#lss-cuotas-obreras',
      }
    ]
  },
  {
    id: 'lft',
    name: 'Derecho Laboral y Prestaciones LFT',
    nameEn: 'Labor Rights & Statutory Benefits (LFT)',
    shortDescription: 'Regulaciones de la Ley Federal del Trabajo sobre descanso, vacaciones dignas, primas, jornadas y salarios.',
    shortDescriptionEn: 'Federal Labor Law regulations on rest periods, paid vacations, bonuses, work shifts, and wage protection.',
    calculators: [
      {
        slug: 'calculadora-vacaciones-prima-vacacional',
        categorySlug: 'nomina',
        title: 'Calculadora de Vacaciones y Prima Vacacional',
        titleEn: 'Vacation Days and Premium Calculator',
        contextualAnchor: 'Calcular días de vacaciones dignas y prima vacacional del 25%',
        contextualAnchorEn: 'Calculate paid vacation days and 25% vacation premium',
        description: 'Aplica la tabla de antigüedad de la reforma de Vacaciones Dignas y la exención de 15 UMAs.',
        descriptionEn: 'Apply the seniority scale under the Vacaciones Dignas reform and 15-UMA tax exemption.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-horas-extra',
        categorySlug: 'nomina',
        title: 'Calculadora de Horas Extra',
        titleEn: 'Overtime Calculator',
        contextualAnchor: 'Calcular horas extras conforme al Artículo 66 y 68 de la LFT',
        contextualAnchorEn: 'Calculate overtime pay under Articles 66 and 68 of LFT',
        description: 'Determina el pago de horas dobles y triples según los límites semanales de la LFT.',
        descriptionEn: 'Determine double and triple pay according to statutory weekly thresholds.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-ptu-reparto-utilidades',
        categorySlug: 'nomina',
        title: 'Calculadora de PTU',
        titleEn: 'Profit-Sharing Calculator',
        contextualAnchor: 'Calcular derecho individual al reparto de utilidades',
        contextualAnchorEn: 'Calculate individual right to corporate profit sharing',
        description: 'Simula la distribución por días laborados y salarios devengados en el año.',
        descriptionEn: 'Simulate distribution based on days worked and earned wages in the year.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'que-hacer-si-no-te-pagan-finiquito-de-ley-mexico',
        title: 'Qué hacer si no te pagan el finiquito de ley en México: Guía paso a paso',
        titleEn: 'What to do if statutory severance is withheld in Mexico: Step-by-step',
        contextualAnchor: 'Conocer tus derechos laborales y plazos de ley para reclamar prestaciones',
        contextualAnchorEn: 'Know your statutory labor rights and deadlines to claim compensation',
        description: 'Guía práctica para acudir a la PROFEDET y al Centro Federal de Conciliación Laboral.',
        descriptionEn: 'Practical guide for turning to PROFEDET and Federal Labor Conciliation Centers.',
        isPrimary: true,
      },
      {
        slug: 'calculo-aguinaldo-mexico-formula-dias-exencion-isr',
        title: 'Cálculo del Aguinaldo en México (2026): Fórmula de ley y exención de ISR',
        titleEn: 'Year-End Bonus Calculation in Mexico: Formula and Tax Exemption',
        contextualAnchor: 'Revisar la reglamentación del aguinaldo según el Artículo 87 de la LFT',
        contextualAnchorEn: 'Review year-end bonus legal provisions under Article 87 LFT',
        description: 'Aprende los plazos obligatorios de pago y las multas al patrón si no cumple.',
        descriptionEn: 'Learn mandatory payment deadlines and employer penalties for non-compliance.',
        isPrimary: false,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Interpretación de prestaciones mínimas irrenunciables de la LFT',
      labelEn: 'Methodology: Interpretation of mandatory statutory benefits under the LFT',
    },
    primarySources: [
      {
        sourceId: 'lft-vacaciones-dignas',
        institution: 'Diario Oficial de la Federación (DOF)',
        documentTitle: 'Decreto de Reforma a los Artículos 76 y 78 de la LFT (Vacaciones Dignas)',
        anchor: '/fuentes#lft-vacaciones-dignas',
      }
    ]
  },
  {
    id: 'deducciones',
    name: 'Deducciones Personales y Saldo a Favor',
    nameEn: 'Personal Tax Deductions & Refunds',
    shortDescription: 'Gastos deducibles en la declaración anual (Artículo 151 LISR), topes en UMA, colegiaturas y créditos hipotecarios.',
    shortDescriptionEn: 'Deductible expenses on the annual return (Article 151 LISR), UMA limits, school tuition, and mortgage interest.',
    calculators: [
      {
        slug: 'calculadora-isr',
        categorySlug: 'sat',
        title: 'Calculadora de ISR y Declaración Anual',
        titleEn: 'Annual Income Tax (ISR) & Deduction Calculator',
        contextualAnchor: 'Simular saldo a favor con deducciones personales',
        contextualAnchorEn: 'Simulate annual tax refund with personal deductions',
        description: 'Ingresa tus ingresos acumulables y gastos deducibles para proyectar tu devolución del SAT.',
        descriptionEn: 'Input annual earnings and allowable deductions to project your SAT tax refund.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-uma',
        categorySlug: 'conversiones',
        title: 'Calculadora de UMA',
        titleEn: 'UMA Conversion Calculator',
        contextualAnchor: 'Consultar topes de deducciones en UMA anual',
        contextualAnchorEn: 'Check personal deduction ceilings in annual UMA',
        description: 'Convierte el límite general de 5 UMAs anuales a pesos mexicanos vigentes.',
        descriptionEn: 'Convert the general 5-UMA ceiling to current Mexican pesos.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-credito-hipotecario',
        categorySlug: 'creditos',
        title: 'Calculadora de Crédito Hipotecario',
        titleEn: 'Mortgage Loan Calculator',
        contextualAnchor: 'Estimar amortización e intereses reales deducibles',
        contextualAnchorEn: 'Estimate amortization and deductible real mortgage interest',
        description: 'Calcula mensualidades y proyecta la deducción de intereses reales para tu declaración.',
        descriptionEn: 'Calculate monthly payments and project real interest deductions for your tax return.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'deducciones-personales-sat-2026-guia-y-limites',
        title: 'Deducciones Personales SAT 2026: Guía Completa, Límites en UMA y Requisitos',
        titleEn: 'Personal Tax Deductions SAT 2026: Limits and Requirements',
        contextualAnchor: 'Leer la guía exhaustiva sobre deducciones personales y claves CFDI',
        contextualAnchorEn: 'Read the comprehensive guide on personal deductions and CFDI codes',
        description: 'Todo sobre la regla del 15% o 5 UMAs, colegiaturas, gastos médicos y cómo evitar que el SAT las rechace.',
        descriptionEn: 'All about the 15% or 5 UMA rule, tuition caps, healthcare fees, and avoiding SAT rejections.',
        isPrimary: true,
      },
      {
        slug: 'como-calcular-el-isr-mexico-guia-paso-a-paso',
        title: 'Cómo calcular el ISR en México (2026): Guía paso a paso',
        titleEn: 'How to calculate income tax (ISR) in Mexico: Step-by-step',
        contextualAnchor: 'Entender cómo las deducciones reducen tu base gravable anual',
        contextualAnchorEn: 'Understand how personal deductions lower your annual taxable base',
        description: 'Aprende la relación matemática entre deducciones comprobadas y generación de saldo a favor.',
        descriptionEn: 'Learn the algebraic connection between verified deductions and direct tax refunds.',
        isPrimary: false,
      }
    ],
    methodology: {
      anchor: '/metodologia#casos-limite',
      stepNumber: 4,
      label: 'Metodología: Tratamiento de topes máximos y excepciones de deducciones',
      labelEn: 'Methodology: Statutory deduction caps and independent basket modeling',
    },
    primarySources: [
      {
        sourceId: 'lisr-art-96-152',
        institution: 'Cámara de Diputados / SAT',
        documentTitle: 'Ley del Impuesto Sobre la Renta (LISR) - Artículo 151',
        anchor: '/fuentes#lisr-art-96-152',
      },
      {
        sourceId: 'inegi-uma',
        institution: 'Instituto Nacional de Estadística y Geografía (INEGI)',
        documentTitle: 'Valores Oficiales de la Unidad de Medida y Actualización (UMA)',
        anchor: '/fuentes#inegi-uma',
      }
    ]
  },
  {
    id: 'finiquito-liquidacion',
    name: 'Finiquito y Liquidación Constitucional',
    nameEn: 'Severance Pay & Employment Termination',
    shortDescription: 'Cálculo de derechos devengados (finiquito) e indemnizaciones constitucionales (liquidación) por despido o renuncia.',
    shortDescriptionEn: 'Calculations of accrued rights (finiquito) and constitutional indemnity (severance) upon resignation or dismissal.',
    calculators: [
      {
        slug: 'calculadora-finiquito-liquidacion',
        categorySlug: 'nomina',
        title: 'Calculadora de Finiquito y Liquidación',
        titleEn: 'Finiquito & Severance Pay Calculator',
        contextualAnchor: 'Calcular finiquito o liquidación por despido injustificado',
        contextualAnchorEn: 'Calculate settlement or severance for unjustified termination',
        description: 'Simula con exactitud los 3 meses de salario integrado, 20 días por año y prima de antigüedad.',
        descriptionEn: 'Accurately simulate 3 months integrated wage, 20 days per year, and seniority premium.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-aguinaldo',
        categorySlug: 'nomina',
        title: 'Calculadora de Aguinaldo',
        titleEn: 'Year-End Bonus Calculator',
        contextualAnchor: 'Calcular parte proporcional de aguinaldo para finiquito',
        contextualAnchorEn: 'Calculate pro-rated year-end bonus for final settlement',
        description: 'Determina los días devengados de aguinaldo a integrar en el finiquito de ley.',
        descriptionEn: 'Determine accrued bonus days to include in the statutory final paycheck.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-vacaciones-prima-vacacional',
        categorySlug: 'nomina',
        title: 'Calculadora de Vacaciones y Prima',
        titleEn: 'Vacation and Premium Calculator',
        contextualAnchor: 'Calcular vacaciones pendientes de goce para el finiquito',
        contextualAnchorEn: 'Calculate accrued unused vacation pay for severance settlement',
        description: 'Calcula los días de descanso no disfrutados y el 25% de prima correspondiente.',
        descriptionEn: 'Compute untaken rest days and the 25% statutory premium due upon exit.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'que-hacer-si-no-te-pagan-finiquito-de-ley-mexico',
        title: 'Qué hacer si no te pagan el finiquito de ley en México: Guía paso a paso',
        titleEn: 'Severance Pay and Finiquito Under Mexican Labor Law (LFT): Complete Rights',
        contextualAnchor: 'Consultar la guía legal sobre cómo exigir tu finiquito o liquidación',
        contextualAnchorEn: 'Read the legal guide on demanding your statutory severance pay',
        description: 'Diferencias legales, plazos de prescripción (2 meses vs 1 año) y procedimiento ante el Centro de Conciliación.',
        descriptionEn: 'Legal differences, statutory limitation periods, and Conciliation Center hearings.',
        isPrimary: true,
      }
    ],
    methodology: {
      anchor: '/metodologia#casos-limite',
      stepNumber: 4,
      label: 'Metodología: Algoritmo de diferenciación entre despido y renuncia voluntaria',
      labelEn: 'Methodology: Algorithmic differentiation between dismissal and voluntary exit',
    },
    primarySources: [
      {
        sourceId: 'lft-finiquito-liquidacion',
        institution: 'Cámara de Diputados / STPS',
        documentTitle: 'Ley Federal del Trabajo (LFT) - Artículos 48, 50 y 162',
        anchor: '/fuentes#lft-finiquito-liquidacion',
      },
      {
        sourceId: 'profedet-asesoria',
        institution: 'Procuraduría Federal de la Defensa del Trabajo (PROFEDET)',
        documentTitle: 'Guía de Asesoría Integral y Conciliación Laboral Gratuita',
        anchor: '/fuentes#profedet-asesoria',
      }
    ]
  },
  {
    id: 'aguinaldo',
    name: 'Aguinaldo y Gratificación Anual',
    nameEn: 'Year-End Bonus (Aguinaldo)',
    shortDescription: 'Cálculo de los 15 días mínimos de ley, partes proporcionales del año y exención fiscal de 30 UMAs ante el SAT.',
    shortDescriptionEn: 'Calculations for minimum 15 days of base pay, pro-rated working days, and 30-UMA statutory tax exemption.',
    calculators: [
      {
        slug: 'calculadora-aguinaldo',
        categorySlug: 'nomina',
        title: 'Calculadora de Aguinaldo',
        titleEn: 'Year-End Bonus Calculator',
        contextualAnchor: 'Calcular monto de aguinaldo neto y parte exenta',
        contextualAnchorEn: 'Calculate net year-end bonus and tax-exempt portion',
        description: 'Calcula tu gratificación anual para año completo o días proporcionales con tope exento.',
        descriptionEn: 'Compute full-year or pro-rated year-end bonus with statutory tax exemptions.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-uma',
        categorySlug: 'conversiones',
        title: 'Calculadora de UMA',
        titleEn: 'UMA Benchmark Calculator',
        contextualAnchor: 'Verificar el valor de 30 UMAs para el aguinaldo exento',
        contextualAnchorEn: 'Verify the 30-UMA threshold for tax-exempt bonus',
        description: 'Revisa el valor diario oficial de la UMA para conocer el límite exento de ISR.',
        descriptionEn: 'Inspect the official daily UMA value to determine your tax-exempt ceiling.',
        isPrimary: false,
      },
      {
        slug: 'calculadora-salario-neto',
        categorySlug: 'nomina',
        title: 'Calculadora de Salario Neto',
        titleEn: 'Net Salary Calculator',
        contextualAnchor: 'Simular salario regular complementario al aguinaldo',
        contextualAnchorEn: 'Simulate regular salary alongside your year-end bonus',
        description: 'Comprueba el depósito habitual de nómina antes de recibir las prestaciones de fin de año.',
        descriptionEn: 'Check standard take-home pay prior to receiving year-end distributions.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'calculo-aguinaldo-mexico-formula-dias-exencion-isr',
        title: 'Cálculo del Aguinaldo en México (2026): Fórmula de ley, parte proporcional y exención de ISR',
        titleEn: 'Year-End Bonus Calculation in Mexico: Formula, Pro-rating & Tax Exemption',
        contextualAnchor: 'Revisar la guía con la fórmula exacta de aguinaldo y exención fiscal',
        contextualAnchorEn: 'Review the guide with the exact bonus formula and tax exemption',
        description: 'Explicación detallada del Artículo 87 de la LFT, cálculo proporcional y exención de 30 UMAs.',
        descriptionEn: 'Detailed analysis of Article 87 LFT, pro-rating arithmetic, and 30-UMA tax shield.',
        isPrimary: true,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Disposiciones de gratificación anual del Artículo 87 LFT',
      labelEn: 'Methodology: Statutory year-end bonus rules under Article 87 LFT',
    },
    primarySources: [
      {
        sourceId: 'lft-finiquito-liquidacion',
        institution: 'Cámara de Diputados / STPS',
        documentTitle: 'Ley Federal del Trabajo (LFT) - Artículo 87',
        anchor: '/fuentes#lft-finiquito-liquidacion',
      },
      {
        sourceId: 'inegi-uma',
        institution: 'Instituto Nacional de Estadística y Geografía (INEGI)',
        documentTitle: 'Valores Oficiales de la Unidad de Medida y Actualización (UMA)',
        anchor: '/fuentes#inegi-uma',
      }
    ]
  },
  {
    id: 'sat-general',
    name: 'Recursos Generales SAT y Conversiones',
    nameEn: 'General SAT Resources & Conversions',
    shortDescription: 'Unidad de Medida y Actualización (UMA), tipo de cambio oficial FIX, calendario de obligaciones fiscales y recargos.',
    shortDescriptionEn: 'UMA benchmarks, official FIX exchange rate, fiscal obligations calendar, and late surcharges.',
    calculators: [
      {
        slug: 'calculadora-uma',
        categorySlug: 'conversiones',
        title: 'Calculadora de UMA',
        titleEn: 'UMA Benchmark Calculator',
        contextualAnchor: 'Consultar equivalencias de la UMA diaria, mensual y anual',
        contextualAnchorEn: 'Check daily, monthly, and annual UMA conversion benchmarks',
        description: 'Herramienta de referencia para multas, créditos y exenciones fiscales en México.',
        descriptionEn: 'Reference tool for fines, statutory caps, and tax exemptions in Mexico.',
        isPrimary: true,
      },
      {
        slug: 'calculadora-recargos-sat',
        categorySlug: 'sat',
        title: 'Calculadora de Recargos SAT',
        titleEn: 'SAT Late Surcharges Calculator',
        contextualAnchor: 'Calcular recargos e inflación por declaraciones fuera de plazo',
        contextualAnchorEn: 'Calculate late surcharges and inflation for delayed filings',
        description: 'Aplica los porcentajes de recargos moratorios y actualización por INPC del Código Fiscal.',
        descriptionEn: 'Apply late surcharges and inflation adjustments from the Federal Fiscal Code.',
        isPrimary: false,
      }
    ],
    guides: [
      {
        slug: 'como-calcular-el-isr-mexico-guia-paso-a-paso',
        title: 'Cómo calcular el ISR en México (2026): Guía paso a paso',
        titleEn: 'How to calculate income tax in Mexico: Step-by-step',
        contextualAnchor: 'Consultar la guía de referencia sobre el cálculo de impuestos federales',
        contextualAnchorEn: 'Review the reference guide on Mexican federal tax calculations',
        description: 'Fundamentos del sistema tributario mexicano para personas físicas.',
        descriptionEn: 'Core fundamentals of the Mexican personal taxation system.',
        isPrimary: true,
      }
    ],
    methodology: {
      anchor: '/metodologia#identificacion-normas',
      stepNumber: 1,
      label: 'Metodología: Recopilación de parámetros macroeconómicos oficiales',
      labelEn: 'Methodology: Collection of official macroeconomic parameters',
    },
    primarySources: [
      {
        sourceId: 'inegi-uma',
        institution: 'Instituto Nacional de Estadística y Geografía (INEGI)',
        documentTitle: 'Valores Oficiales de la Unidad de Medida y Actualización (UMA)',
        anchor: '/fuentes#inegi-uma',
      }
    ]
  }
];

export function getClusterForCalculator(calculatorSlug: string, categorySlug?: string): TopicalCluster {
  // 1. Direct calculator match
  for (const cluster of TOPICAL_CLUSTERS) {
    if (cluster.calculators.some(c => c.slug === calculatorSlug)) {
      return cluster;
    }
  }

  // 2. Specific slug keyword fallback
  if (calculatorSlug.includes('aguinaldo')) return TOPICAL_CLUSTERS.find(c => c.id === 'aguinaldo')!;
  if (calculatorSlug.includes('finiquito') || calculatorSlug.includes('liquidacion')) return TOPICAL_CLUSTERS.find(c => c.id === 'finiquito-liquidacion')!;
  if (calculatorSlug.includes('vacaciones')) return TOPICAL_CLUSTERS.find(c => c.id === 'lft')!;
  if (calculatorSlug.includes('resico')) return TOPICAL_CLUSTERS.find(c => c.id === 'resico')!;
  if (calculatorSlug.includes('iva')) return TOPICAL_CLUSTERS.find(c => c.id === 'iva')!;
  if (calculatorSlug.includes('imss') || calculatorSlug.includes('afore')) return TOPICAL_CLUSTERS.find(c => c.id === 'imss')!;
  if (calculatorSlug.includes('isr')) return TOPICAL_CLUSTERS.find(c => c.id === 'isr')!;
  if (calculatorSlug.includes('salario') || calculatorSlug.includes('horas-extra') || calculatorSlug.includes('ptu')) return TOPICAL_CLUSTERS.find(c => c.id === 'nomina')!;
  if (calculatorSlug.includes('uma')) return TOPICAL_CLUSTERS.find(c => c.id === 'sat-general')!;

  // 3. Category match fallback
  if (categorySlug === 'sat') return TOPICAL_CLUSTERS.find(c => c.id === 'isr')!;
  if (categorySlug === 'nomina') return TOPICAL_CLUSTERS.find(c => c.id === 'nomina')!;
  if (categorySlug === 'resico') return TOPICAL_CLUSTERS.find(c => c.id === 'resico')!;
  if (categorySlug === 'conversiones') return TOPICAL_CLUSTERS.find(c => c.id === 'sat-general')!;

  return TOPICAL_CLUSTERS[0];
}

export function getClusterForGuide(postSlug: string, postCategory?: string): TopicalCluster {
  // 1. Direct post match
  for (const cluster of TOPICAL_CLUSTERS) {
    if (cluster.guides.some(g => g.slug === postSlug)) {
      return cluster;
    }
  }

  // 2. Slug keyword fallback
  if (postSlug.includes('aguinaldo')) return TOPICAL_CLUSTERS.find(c => c.id === 'aguinaldo')!;
  if (postSlug.includes('finiquito') || postSlug.includes('liquidacion')) return TOPICAL_CLUSTERS.find(c => c.id === 'finiquito-liquidacion')!;
  if (postSlug.includes('deducciones')) return TOPICAL_CLUSTERS.find(c => c.id === 'deducciones')!;
  if (postSlug.includes('resico')) return TOPICAL_CLUSTERS.find(c => c.id === 'resico')!;
  if (postSlug.includes('iva')) return TOPICAL_CLUSTERS.find(c => c.id === 'iva')!;
  if (postSlug.includes('sueldo') || postSlug.includes('neto') || postSlug.includes('imss')) return TOPICAL_CLUSTERS.find(c => c.id === 'nomina')!;
  if (postSlug.includes('isr')) return TOPICAL_CLUSTERS.find(c => c.id === 'isr')!;

  // 3. Category match fallback
  if (postCategory === 'LFT') return TOPICAL_CLUSTERS.find(c => c.id === 'lft')!;
  if (postCategory === 'SAT') return TOPICAL_CLUSTERS.find(c => c.id === 'isr')!;

  return TOPICAL_CLUSTERS[0];
}

export function getAllTopicalClusters(): TopicalCluster[] {
  return TOPICAL_CLUSTERS;
}
