import { CalculatorConfig } from '../../types/calculator';

export const comisionesTarjetaDolaresCalculator: CalculatorConfig = {
  id: 'comisiones-tarjeta-dolares',
  title: 'Calculadora de Comisiones por Compras en Dólares con Tarjeta',
  shortDescription: 'Calcula el costo real en Soles o Pesos de comprar en dólares con tu tarjeta bancaria incluyendo el margen cambiario (Spread) y la comisión por conversión Forex (3%-5%).',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-comisiones-tarjeta-dolares',
  seo: {
    metaTitle: 'Calculadora de Compras en Dólares con Tarjeta | Comisiones Forex',
    metaDescription: 'Calcula cuánto te cuesta comprar en dólares con tu tarjeta de débito o crédito. Incluye comisiones bancarias por conversión de divisa y spread cambiario.',
    keywords: [
      'compras en dolares con tarjeta',
      'comision por cambio de divisa tarjeta',
      'dolar tarjeta peru',
      'comision forex tarjeta de credito',
      'cuanto cobra el banco por comprar en dolares'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_usd',
      label: 'Monto de la Compra en Dólares (USD)',
      type: 'number',
      defaultValue: 100,
      placeholder: 'Ej: 100 USD'
    },
    {
      id: 'tasa_cambio_base',
      label: 'Tipo de Cambio Interbancario / Oficial (MXN por USD)',
      type: 'number',
      defaultValue: 18.50,
      placeholder: 'Ej: 18.50'
    },
    {
      id: 'comision_porcentaje',
      label: 'Margen Cambiario / Comisión Bancaria por Transacción Internacional (%)',
      type: 'number',
      defaultValue: 3.5,
      placeholder: 'Ej: 3.5 % (rango usual 2% a 5%)'
    }
  ],
  calculate: (inputs) => {
    const usd = parseFloat(inputs.monto_usd) || 0;
    const tasaBase = parseFloat(inputs.tasa_cambio_base) || 18.50;
    const porcentajeComision = parseFloat(inputs.comision_porcentaje) || 0;

    const montoBaseLocal = usd * tasaBase;
    const comisionMonto = montoBaseLocal * (porcentajeComision / 100);
    const montoTotalConComision = montoBaseLocal + comisionMonto;
    const tasaEfectivaCobrada = usd > 0 ? montoTotalConComision / usd : tasaBase;

    return {
      results: [
        {
          label: 'Monto de Compra en USD',
          value: usd,
          formatted: `$${usd.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
        },
        {
          label: 'Costo al Tipo de Cambio Interbancario Base',
          value: montoBaseLocal,
          formatted: `$${montoBaseLocal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`
        },
        {
          label: `Comisión / Margen Cambiario Aplicado (${porcentajeComision}%)`,
          value: comisionMonto,
          formatted: `$${comisionMonto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`
        },
        {
          label: 'Tipo de Cambio Efectivo Final por Dólar',
          value: tasaEfectivaCobrada,
          formatted: `$${tasaEfectivaCobrada.toFixed(4)} MXN / USD`
        },
        {
          label: 'Monto Total Estimado en Estado de Cuenta',
          value: montoTotalConComision,
          formatted: `$${montoTotalConComision.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Se convierte el importe en dólares ($${usd.toFixed(2)} USD) a moneda local con la tasa interbancaria de $${tasaBase.toFixed(4)} MXN.`,
          mathFormula: `Costo\\ Base = USD \\times Tasa\\ Base = $${usd.toFixed(2)} \\times $${tasaBase.toFixed(2)} = $${montoBaseLocal.toFixed(2)}\\ MXN`
        },
        {
          description: `Se calcula el sobreprecio bancario o tarifa por transacción internacional del ${porcentajeComision}%.`,
          mathFormula: `Comisi\\acute{o}n = $${montoBaseLocal.toFixed(2)} \\times ${(porcentajeComision / 100).toFixed(4)} = $${comisionMonto.toFixed(2)}\\ MXN`
        },
        {
          description: `Se determina el cobro final total sumando el costo base y la comisión.`,
          mathFormula: `Total\\ a\\ Pagar = $${montoBaseLocal.toFixed(2)} + $${comisionMonto.toFixed(2)} = $${montoTotalConComision.toFixed(2)}\\ MXN`
        }
      ]
    };
  },
  content: {
    whatItDoes: 'Esta calculadora determina el costo real en moneda local de realizar compras en línea o en el extranjero denominadas en dólares estadounidenses (USD) utilizando tarjetas de crédito o débito bancarias. Desglosa el impacto del diferencial cambiario (spread entre el tipo de cambio interbancario de Banxico y la tasa ventanilla del emisor) más las comisiones por conversión de divisas internacionales.',
    whoShouldUse: [
      'Compradores digitales en México adquiriendo productos en plataformas internacionales como Amazon Estados Unidos, AliExpress, eBay, Shein o Steam.',
      'Profesionistas y empresas pagando suscripciones mensuales de software SaaS (Google Workspace, AWS, Zoom, Adobe, OpenAI, Slack) facturadas en USD.',
      'Viajeros planificando el presupuesto de gastos en el extranjero con tarjetas mexicanas.',
      'Usuarios comparando el costo efectivo entre pagar directamente con tarjeta bancaria tradicional vs utilizar fintechs o cuentas multidivisa.'
    ],
    explanation: 'Cuando realizas un pago en dólares con una tarjeta emitida en pesos, la transacción pasa por tres intermediarios: el comercio internacional, la red de procesamiento (Visa, Mastercard o American Express) y tu banco emisor. Aunque consultes en Google o en las noticias que el dólar cotiza a cierto precio oficial (tipo de cambio FIX de Banxico), tu banco no te cobra esa tasa.\n\nLos bancos aplican su propia "Tasa de Venta", la cual incluye un sobreprecio o spread cambiario (generalmente entre 1.5% y 3.5% por encima del FIX). Adicionalmente, algunas tarjetas de débito o crédito cargan una "Comisión por Transacción Internacional" o cargo Forex (Foreign Exchange Fee) de entre 1% y 3% adicional. El resultado es que cada dólar gastado te cuesta significativamente más de lo presupuestado.',
    formula: '1. Costo\\ Base\\ al\\ Interbancario:\nCB = Monto_{USD} \\times Tasa\\ Interbancaria\n\n2. Sobrecosto\\ Cambiario\\ y\\ Comisi\\acute{o}n\\ Forex:\nC_{forex} = CB \\times \\left(\\frac{\\%\\ Comisi\\acute{o}n}{100}\\right)\n\n3. Total\\ Facturado\\ en\\ Tarjeta:\nTotal_{MXN} = CB + C_{forex} = Monto_{USD} \\times Tasa\\ Efectiva\n\n4. Tasa\\ Efectiva\\ Real\\ por\\ D\\acute{o}lar:\nTasa\\ Efectiva = Tasa\\ Interbancaria \\times \\left(1 + \\frac{\\%\\ Comisi\\acute{o}n}{100}\\right)',
    example: 'Caso práctico: Compra en tienda digital extranjera.\n- Compra: $100.00 USD en mercancía.\n- Tipo de cambio FIX de Banxico del día: $18.50 MXN por USD.\n- Tipo de cambio de venta aplicado por el banco (spread del 3.5%): $19.1475 MXN por USD.\n\nDesglose de cobro:\n- Costo nominal sin comisiones: $100 x $18.50 = $1,850.00 MXN.\n- Margen bancario / spread: $1,850 x 3.5% = $64.75 MXN.\n- Cargo total reflejado en tu estado de cuenta: $1,914.75 MXN.\n\nSi compras una suscripción anual de $1,200 USD para tu empresa, este diferencial representa más de $770 MXN en costos cambiarios silenciosos.',
    legislation: 'Ley para la Transparencia y Ordenamiento de los Servicios Financieros (LTOSF); Circulares del Banco de México sobre comisiones cambiarias; Ley Monetaria de los Estados Unidos Mexicanos (Artículo 8, cumplimiento de obligaciones en moneda extranjera dentro del territorio nacional).',
    faqs: [
      {
        question: '¿Qué es la Conversión Dinámica de Moneda (DCC) y por qué debo rechazarla?',
        answer: 'La Conversión Dinámica de Moneda (DCC) ocurre cuando un comercio extranjero o un cajero en el exterior te pregunta en la pantalla: "¿Deseas pagar en tu moneda local (pesos) o en la moneda del país (dólares)?". NUNCA elijas pagar en pesos. Si aceptas la conversión del comercio, ellos aplican un tipo de cambio inflado con sobreprecios de hasta el 7% al 10%. Siempre selecciona pagar en la moneda original (USD) y deja que la conversión la realice tu red emisora (Visa/Mastercard).'
      },
      {
        question: '¿Qué tipo de cambio utiliza el banco: el del día de la compra o el del día del procesamiento?',
        answer: 'El tipo de cambio oficial de tu compra no es el del instante en que pasas la tarjeta (cargo pendiente), sino el del día hábil en que el comercio procesa y liquida la transacción con la red bancaria (generalmente entre 24 y 72 horas después). Durante ese lapso, si el dólar sube, el cargo final en pesos aumentará ligeramente.'
      },
      {
        question: '¿Cómo puedo ahorrar en comisiones al comprar en dólares frecuentemente?',
        answer: 'Puedes utilizar tarjetas fintech de débito que aplican el tipo de cambio oficial interbancario de Mastercard o Visa sin sobreprecio bancario agregado, o bien aperturar cuentas en dólares (para personas físicas con residencia en franja fronteriza norte o personas morales en todo el país).'
      },
      {
        question: '¿Las compras en dólares con tarjeta generan IVA en México?',
        answer: 'Si compras un producto físico importado, los impuestos aduanales (IVA de importación y aranceles) se pagan al ingresar a la aduana mediante la paquetería. Si compras un servicio digital (como streaming o software en la nube de un proveedor extranjero registrado en el RFC del SAT), el banco o la plataforma desglosará el 16% de IVA conforme al Artículo 18-B de la Ley del IVA.'
      }
    ],
    tips: [
      'Al pagar en Amazon, PayPal o AliExpress, desactiva la opción de "Conversión de Divisas de PayPal/Amazon" y configura que el cobro se envíe en la divisa original del vendedor (USD). Tu banco mexicano casi siempre ofrecerá mejor tasa que la pasarela de pago.',
      'Revisa el contrato de tu tarjeta de crédito: algunas instituciones cobran un cargo fijo por cada compra internacional además del spread en el tipo de cambio.'
    ],
    errors: [
      'Asumir que el tipo de cambio que ves en Google es el que verás en tu estado de cuenta bancario; el tipo de cambio ventanilla de los bancos incluye un margen comercial indispensable de considerar.',
      'Retirar dólares en efectivo de un cajero en el extranjero con tarjeta de crédito: acumula comisión por retiro (5%-10%), comisión de cajero foráneo ($3 a $7 USD), spread cambiario e intereses diarios inmediatos.'
    ],
    sources: [
      {
        name: 'Banco de México (Banxico) — Tipo de Cambio FIX Oficial',
        url: 'https://www.banxico.org.mx/tipcamb/llenarFormato.do?seccion=4',
        description: 'Consulta diaria del tipo de cambio FIX para solventar obligaciones en moneda extranjera.'
      },
      {
        name: 'CONDUSEF — Recomendaciones para Compras en el Extranjero',
        url: 'https://www.condusef.gob.mx',
        description: 'Guía de educación financiera sobre cargos internacionales y comisiones de divisas.'
      }
    ],
    relatedCalculators: [
      'finanzas-personales/calculadora-pago-tarjeta-credito',
      'sat/calculadora-iva',
      'sat/calculadora-conversion-impuestos'
    ]
  }
};
