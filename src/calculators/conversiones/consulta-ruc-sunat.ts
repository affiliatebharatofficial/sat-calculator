import { CalculatorConfig } from '../../types/calculator';

/**
 * Checks RUC 11-digit structure and Modulo 11 Checksum for Peru RUC numbers.
 * Valid prefixes in Peru:
 * - 10: Persona Natural con DNI
 * - 15/17: Persona Natural (Carnet Extranjería / Pasaporte)
 * - 20: Persona Jurídica / Empresa
 */
export function validateRucChecksum(ruc: string): { isValid: boolean; message: string; type?: string } {
  const cleanRuc = ruc.trim();
  if (!/^\d{11}$/.test(cleanRuc)) {
    return { isValid: false, message: 'El RUC debe ser un número de exactamente 11 dígitos.' };
  }

  const prefix = cleanRuc.substring(0, 2);
  const validPrefixes = ['10', '15', '16', '17', '20'];
  if (!validPrefixes.includes(prefix)) {
    return { isValid: false, message: 'Prefijo no reconocido en Perú (debe iniciar con 10, 15, 17 o 20).' };
  }

  let typeLabel = 'Persona Natural';
  if (prefix === '20') typeLabel = 'Persona Jurídica (Empresa / Sociedad)';
  if (prefix === '10') typeLabel = 'Persona Natural con Negocio / DNI';

  // Modulo 11 checksum verification
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanRuc[i], 10) * weights[i];
  }

  const remainder = sum % 11;
  let checkDigit = 11 - remainder;
  if (checkDigit === 10) checkDigit = 0;
  if (checkDigit === 11) checkDigit = 1;

  const actualCheckDigit = parseInt(cleanRuc[10], 10);
  const isValid = checkDigit === actualCheckDigit;

  return {
    isValid,
    message: isValid 
      ? `Estructura y dígito verificador del RUC válidos. Categoría: ${typeLabel}.` 
      : 'El dígito de verificación del RUC no coincide con el algoritmo oficial de SUNAT.',
    type: typeLabel
  };
}

export const consultaRucSunatCalculator: CalculatorConfig = {
  id: 'consulta-ruc-sunat',
  title: 'Validador de RUC',
  shortDescription: 'Valida la estructura de 11 dígitos, prefijo tributario y algoritmo Módulo 11 del dígito verificador de un RUC peruano. No consulta la base de datos de SUNAT.',
  category: 'Herramientas Perú',
  categorySlug: 'peru',
  slug: 'consulta-ruc-sunat',
  seo: {
    metaTitle: 'Validador de RUC: Verificar Estructura y Dígito de Control SUNAT',
    metaDescription: 'Comprueba el algoritmo Módulo 11 y formato de 11 dígitos de un RUC en Perú. Validador de estructura técnica con enlace directo a la consulta oficial de SUNAT.',
    keywords: [
      'validador de ruc',
      'validador ruc sunat',
      'verificar ruc sunat',
      'digito verificador ruc peru',
      'algoritmo modulo 11 ruc',
      'estructura ruc peru'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ruc_input',
      label: 'Número de RUC (11 dígitos)',
      type: 'number',
      defaultValue: 20100047218,
      placeholder: 'Ej: 20100047218'
    }
  ],
  calculate: (inputs) => {
    const rucStr = String(inputs.ruc_input || '').trim();
    const val = validateRucChecksum(rucStr);

    return {
      results: [
        {
          label: 'Número de RUC Ingresado',
          value: parseFloat(rucStr) || 0,
          formatted: rucStr || '---'
        },
        {
          label: 'Estructura Matemática y Dígito Verificador',
          value: val.isValid ? 1 : 0,
          formatted: val.isValid ? 'VÁLIDO' : 'INVÁLIDO',
          isMain: true
        },
        {
          label: 'Tipo de Contribuyente según Prefijo',
          value: val.isValid ? 1 : 0,
          formatted: val.type || 'No identificado'
        }
      ],
      steps: [
        {
          description: val.message,
          mathFormula: `RUC = ${rucStr} \\rightarrow Modulo\\ 11 = ${val.isValid ? 'VÁLIDO' : 'ERROR'}`
        },
        {
          description: 'Aviso importante: Este validador no consulta la base de datos de SUNAT ni verifica si el contribuyente está ACTIVO o HABIDO.',
          mathFormula: '\\text{Base de datos oficial} \\rightarrow \\text{Exclusivo portal SUNAT e-Consulta}'
        }
      ]
    };
  },
  content: {
    whatItDoes: 'Validador de sintaxis y algoritmo Módulo 11 para números de Registro Único de Contribuyentes (RUC) en Perú. Verifica al instante que el número tenga exactamente 11 dígitos, identifique el prefijo legal de contribuyente (10, 15, 17 o 20) y que el 11.° dígito coincida matemáticamente con la regla de ponderación oficial de la SUNAT. IMPORTANTE: Esta herramienta NO realiza consultas en vivo a la base de datos de SUNAT ni obtiene Razón Social.',
    whoShouldUse: [
      'Desarrolladores y diseñadores de sistemas contables o ERP que implementan validación previa de RUC en formularios',
      'Contadores y auxiliares que depuran bases de datos de clientes o proveedores para detectar errores tipográficos',
      'Facturadores electrónicos que desean evitar el rechazo de comprobantes por RUCs con dígito de control erróneo',
      'Usuarios que buscan el enlace directo al portal oficial e-Consulta RUC de la SUNAT para consultar razón social y estado'
    ],
    howItWorks: 'El usuario ingresa el número de 11 dígitos. El algoritmo extrae los primeros 10 dígitos y los multiplica de izquierda a derecha por los factores de ponderación oficiales de SUNAT [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]. Suma los productos, obtiene el residuo de la división entre 11 y calcula el dígito verificador esperado (11 - Residuo). Si coincide con el 11.° dígito ingresado, la estructura es matemáticamente válida.',
    explanation: 'El Registro Único de Contribuyentes (RUC) es el registro informático a cargo de la SUNAT que identifica a los contribuyentes en el Perú. Consta de 11 dígitos estructurados: los 2 primeros corresponden al tipo de persona (10 para Persona Natural con DNI, 15/17 para extranjeros, 20 para Personas Jurídicas/empresas), los 8 siguientes identifican al sujeto y el 11.° es un dígito de control calculado mediante el algoritmo Módulo 11. Esta herramienta valida la integridad matemática del número.',
    formula: 'Algoritmo de Validación RUC (Módulo 11 oficial SUNAT):\nPonderadores oficiales: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]\n1. Suma = (d1*5) + (d2*4) + (d3*3) + (d4*2) + (d5*7) + (d6*6) + (d7*5) + (d8*4) + (d9*3) + (d10*2)\n2. Residuo = Suma % 11\n3. Dígito Calculado = 11 - Residuo (Regla: si es 10 -> 0; si es 11 -> 1)\n4. Válido = (Dígito Calculado === d11)',
    example: 'Ejemplo con RUC 20100047218 (Persona Jurídica):\n• Dígitos: 2, 0, 1, 0, 0, 0, 4, 7, 2, 1\n• Ponderadores: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]\n• Productos: (2*5=10) + (0*4=0) + (1*3=3) + (0*2=0) + (0*7=0) + (0*6=0) + (4*5=20) + (7*4=28) + (2*3=6) + (1*2=2)\n• Suma total de productos: 10 + 0 + 3 + 0 + 0 + 0 + 20 + 28 + 6 + 2 = 69\n• División: 69 / 11 = 6 (con Residuo = 3)\n• Dígito de Control: 11 - 3 = 8\n• Verificación: El 11.° dígito es 8. Coincide exactamente, por lo que la estructura es VÁLIDA.',
    legislation: 'Decreto Legislativo N.º 943 (Ley del Registro Único de Contribuyentes), Resolución de Superintendencia N.º 210-2004/SUNAT (Reglamento del RUC) y disposiciones técnicas sobre comprobantes de pago electrónicos de la SUNAT.',
    tips: [
      'Para consultar la Razón Social, domicilio fiscal y estado ACTIVO/HABIDO con validez oficial, utiliza el portal [e-Consulta RUC de la SUNAT](https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp).',
      'Antes de aceptar una factura con crédito fiscal de IGV (18%), verifica siempre en SUNAT que el emisor figure en condición de HABIDO; las facturas de proveedores "No Habidos" no otorgan derecho al crédito fiscal.',
      'Si administras un sistema web o software de facturación, implementar la validación Módulo 11 en el frontend te evitará llamadas innecesarias o errores de formato al emitir comprobantes.'
    ],
    assumptions: [
      'La herramienta valida de forma estrictamente local la sintaxis de 11 dígitos y el algoritmo Módulo 11 oficial de SUNAT.',
      'El cálculo se ejecuta 100% en tu navegador y no transmite ningún dato o número consultado a servidores externos.',
      'No se asume que un número matemáticamente correcto esté efectivamente registrado ni activo en el padrón nacional.'
    ],
    limitations: [
      'NO consulta ni accede a la base de datos o padrón en vivo de la SUNAT.',
      'NO muestra razón social, nombre comercial, domicilio fiscal, fecha de inscripción ni representantes legales.',
      'NO verifica el estado tributario del contribuyente (ACTIVO, BAJA DE OFICIO, SUSPENSIÓN TEMPORAL).',
      'NO certifica la condición de domicilio fiscal (HABIDO, NO HABIDO o NO HALLADO).',
      'Para trámites vinculantes o emisión de constancias, utiliza exclusivamente el portal institucional oficial de [SUNAT](https://www.sunat.gob.pe).'
    ],
    faqs: [
      {
        question: '¿Esta herramienta consulta en vivo el padrón de contribuyentes de SUNAT?',
        answer: 'No. Esta herramienta realiza una validación matemática local del formato y del dígito de control (Módulo 11). No se conecta a los servidores de SUNAT ni puede certificar si el RUC está activo, de baja o habido.'
      },
      {
        question: '¿Dónde puedo consultar la razón social y el estado Activo/Habido de un RUC?',
        answer: 'Para obtener la información oficial completa (Razón Social, domicilio fiscal, estado ACTIVO/BAJA y condición HABIDO/NO HABIDO), debes utilizar la plataforma oficial gratuita e-Consulta RUC de la SUNAT (e-consultaruc.sunat.gob.pe).'
      },
      {
        question: '¿Qué significan los dos primeros dígitos de un RUC en Perú?',
        answer: 'El prefijo 10 corresponde a Personas Naturales con DNI (los 8 dígitos centrales corresponden a su DNI). Los prefijos 15 y 17 corresponden a Personas Naturales extranjeras con Carné de Extranjería o Pasaporte. El prefijo 20 identifica a Personas Jurídicas (empresas, sociedades SAC, SRL, EIRL, etc.).'
      },
      {
        question: '¿Por qué un RUC con estructura válida puede ser rechazado por SUNAT?',
        answer: 'Un número de RUC puede tener un dígito verificador matemáticamente correcto pero no haber sido emitido nunca por la SUNAT, o encontrarse en condición de NO HABIDO, BAJA DEFINITIVA o SUSPENSIÓN TEMPORAL en el padrón tributario.'
      }
    ],
    sources: [
      {
        name: 'Portal Oficial e-Consulta RUC — SUNAT',
        url: 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp',
        description: 'Servicio oficial y gratuito de la SUNAT para consultar en tiempo real Razón Social, estado y condición de cualquier contribuyente en Perú.'
      },
      {
        name: 'Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)',
        url: 'https://www.sunat.gob.pe',
        description: 'Portal institucional oficial de la administración tributaria y aduanera de la República del Perú.'
      },
      {
        name: 'Decreto Legislativo N.º 943 — Ley del RUC',
        url: 'https://www.sunat.gob.pe/legislacion/ruc/index.html',
        description: 'Marco normativo que regula la inscripción, uso y obligaciones del Registro Único de Contribuyentes.'
      }
    ],
    relatedCalculators: [
      'peru/calculadora-igv-peru',
      'peru/tipo-de-cambio-sunat',
      'peru/tablas-e-indicadores-sunat'
    ],
    lastUpdated: 'Actualizado para el ejercicio fiscal 2026',
    disclaimer: 'Esta herramienta es un validador sintáctico independiente y no está afiliada, autorizada ni asociada con la SUNAT, el Ministerio de Economía y Finanzas (MEF) ni el Gobierno del Perú. Para consultas oficiales y vinculantes del padrón tributario, recurre siempre a e-consultaruc.sunat.gob.pe.'
  },
  translations: {
    en: {
      title: 'RUC Validator Peru (SUNAT Check Digit)',
      shortDescription: 'Technical syntax and Modulo 11 check digit validator for 11-digit Peru RUC tax IDs. Does not access SUNAT taxpayer records.',
      category: 'Peru Tools',
      seo: {
        metaTitle: 'RUC Validator Peru: Check 11-Digit Format and SUNAT Check Digit',
        metaDescription: 'Validate the Modulo 11 check digit algorithm and structure of Peruvian RUC numbers. Access the official SUNAT registry link for active taxpayer status.'
      }
    }
  }
};
