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
  title: 'Validador de RUC SUNAT (Estructura y Dígito de Control)',
  shortDescription: 'Valida la estructura de 11 dígitos y el algoritmo Módulo 11 del dígito verificador de un RUC peruano. No consulta la base de datos de SUNAT.',
  category: 'Herramientas Perú',
  categorySlug: 'peru',
  slug: 'consulta-ruc-sunat',
  seo: {
    metaTitle: 'Validador de RUC SUNAT: Verificar Estructura y Dígito Verificador',
    metaDescription: 'Comprueba el algoritmo Módulo 11 y formato de 11 dígitos de un RUC en Perú. Identifica prefijos y accede al padrón oficial de SUNAT para consultar razón social y estado.',
    keywords: [
      'validador ruc sunat',
      'verificar ruc sunat',
      'digito verificador ruc peru',
      'algoritmo modulo 11 ruc',
      'estructura ruc peru',
      'consulta ruc sunat'
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
    explanation: 'Esta herramienta es un validador matemático que verifica si una clave de RUC cumple con el estándar de 11 dígitos y el algoritmo oficial de ponderación Módulo 11 utilizado por la SUNAT en Perú. No realiza consultas directas a los servidores de SUNAT ni expone datos tributarios privados.',
    formula: 'Algoritmo de Validación RUC (Módulo 11 de SUNAT):\nPonderación de dígitos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]\nSuma = \\sum (dígito_i \\times peso_i)\nResiduo = Suma % 11\nDígito Verificador esperado = 11 - Residuo (si es 10 = 0; si es 11 = 1)',
    example: 'Para el RUC 20100047218 (Persona Jurídica): Se multiplican los primeros 10 dígitos por los coeficientes [5,4,3,2,7,6,5,4,3,2], se suman los productos y se calcula el residuo respecto a 11. El resultado coincide exactamente con el 11.° dígito (8), confirmando su validez matemática.',
    legislation: 'Decreto Legislativo N.º 943 (Ley del Registro Único de Contribuyentes) y Resoluciones de Superintendencia de la SUNAT.',
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
        answer: 'El prefijo 10 corresponde a Personas Naturales con DNI (los 8 dígitos centrales son el DNI del titular). Los prefijos 15 y 17 corresponden a Personas Naturales extranjeras. El prefijo 20 identifica a Personas Jurídicas (empresas, sociedades y entidades).'
      },
      {
        question: '¿Por qué un RUC con estructura válida puede ser rechazado por SUNAT?',
        answer: 'Un número de RUC puede tener un dígito verificador matemáticamente correcto pero no haber sido emitido nunca por la SUNAT, o encontrarse en condición de NO HABIDO, BAJA DEFINITIVA o SUSPENSIÓN TEMPORAL.'
      }
    ],
    tips: [
      'Antes de aceptar una factura o hacer un pago comercial, verifica siempre en el portal e-Consulta oficial de SUNAT que el proveedor figure en estado ACTIVO y condición HABIDO.',
      'Si necesitas automatizar la validación de sintaxis en tus sistemas contables antes de emitir comprobantes, el algoritmo Módulo 11 permite descartar números mal digitados de forma instantánea.'
    ],
    errors: [
      'Asumir que un RUC matemáticamente válido garantiza que la empresa existe o que está autorizada para emitir comprobantes de pago.',
      'Aceptar comprobantes con crédito fiscal emitidos por contribuyentes que figuren como NO HABIDOS en la base oficial de SUNAT.'
    ]
  }
};
