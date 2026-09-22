import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsFilePath = path.join(__dirname, '..', 'src', 'data', 'posts.json');
const postsDir = path.join(__dirname, 'posts');

const existingPosts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));

const articlesMetadata = [
  {
    id: "art-isr-paso-a-paso-2026",
    file: "art1.md",
    title: "Cómo calcular el ISR en México (2026): Guía paso a paso con tarifas y ejemplos prácticos",
    slug: "como-calcular-el-isr-mexico-guia-paso-a-paso",
    excerpt: "Aprende a calcular paso a paso el Impuesto Sobre la Renta (ISR) en México con las tablas vigentes del Artículo 96 de la LISR, límite inferior, cuota fija y tasa marginal.",
    lang: "es",
    category: "SAT",
    date: "2026-09-22T08:00:00.000Z",
    author: "Firoz Khan (FkDigitalMedia)",
    editorialResponsibility: "FkDigitalMedia — Revisión técnica, modelado de tarifas progresivas y verificación conforme a la LISR y Anexo 8 de la RMF",
    lastReviewed: "2026-09-22",
    lastUpdated: "2026-09-22",
    legalBasis: "Artículos 96 y 152 de la Ley del Impuesto Sobre la Renta (LISR); Anexo 8 de la Resolución Miscelánea Fiscal vigente",
    status: "published"
  },
  {
    id: "art-como-calcular-quitar-iva-2026",
    file: "art2.md",
    title: "Cómo calcular y desglosar el IVA en México: Fórmulas para agregar y quitar el 16%",
    slug: "como-calcular-quitar-iva-mexico-formulas",
    excerpt: "Guía práctica con fórmulas matemáticas para agregar o quitar el 16% de IVA en México, evitar errores contables comunes y entender cómo acreditar el IVA ante el SAT.",
    lang: "es",
    category: "SAT",
    date: "2026-09-22T08:00:00.000Z",
    author: "Firoz Khan (FkDigitalMedia)",
    editorialResponsibility: "FkDigitalMedia — Revisión matemática y verificación con la Ley del Impuesto al Valor Agregado (LIVA)",
    lastReviewed: "2026-09-22",
    lastUpdated: "2026-09-22",
    legalBasis: "Ley del Impuesto al Valor Agregado (LIVA) Artículos 1, 1-A, 2-A, 4 y 5; Código Fiscal de la Federación (CFF)",
    status: "published"
  },
  {
    id: "art-sueldo-bruto-vs-neto-2026",
    file: "art3.md",
    title: "Sueldo Bruto vs Sueldo Neto en México (2026): Desglose exacto de retenciones de ISR e IMSS",
    slug: "sueldo-bruto-vs-neto-mexico-retenciones-isr-imss",
    excerpt: "Descubre exactamente qué deducciones legales se aplican a tu salario en México (ISR y cuotas obreras IMSS) para entender la diferencia entre sueldo bruto y sueldo neto.",
    lang: "es",
    category: "LFT",
    date: "2026-09-22T08:00:00.000Z",
    author: "Firoz Khan (FkDigitalMedia)",
    editorialResponsibility: "FkDigitalMedia — Validación de fórmulas laborales y de seguridad social (LFT, LSS y LISR)",
    lastReviewed: "2026-09-22",
    lastUpdated: "2026-09-22",
    legalBasis: "Ley Federal del Trabajo (LFT) Arts. 82-84; Ley del Seguro Social (LSS) Arts. 27, 28, 106, 147; Ley del ISR Art. 96",
    status: "published"
  },
  {
    id: "art-calculo-aguinaldo-mexico-2026",
    file: "art4.md",
    title: "Cálculo del Aguinaldo en México (2026): Fórmula de ley, parte proporcional y exención de ISR",
    slug: "calculo-aguinaldo-mexico-formula-dias-exencion-isr",
    excerpt: "Guía completa para calcular el aguinaldo conforme al Artículo 87 de la LFT, cómo determinar la parte proporcional y cómo calcular la exención de 30 UMAs ante el SAT.",
    lang: "es",
    category: "LFT",
    date: "2026-09-22T08:00:00.000Z",
    author: "Firoz Khan (FkDigitalMedia)",
    editorialResponsibility: "FkDigitalMedia — Verificación de fórmulas de derecho laboral (LFT Art. 87) y exenciones fiscales (LISR Art. 93)",
    lastReviewed: "2026-09-22",
    lastUpdated: "2026-09-22",
    legalBasis: "Artículo 87 de la Ley Federal del Trabajo (LFT); Artículo 93 fracción XIV de la Ley del ISR; UMA INEGI 2026",
    status: "published"
  },
  {
    id: "art-guia-resico-pf-2026",
    file: "art5.md",
    title: "Guía Completa de RESICO Personas Físicas (2026): Requisitos, tasas, facturación y retención del 1.25%",
    slug: "guia-resico-personas-fisicas-requisitos-tasas-obligaciones",
    excerpt: "Conoce a fondo el Régimen Simplificado de Confianza (RESICO) para personas físicas en 2026: tasas del 1% al 2.5%, retención del 1.25%, emisión de CFDI y obligaciones ante el SAT.",
    lang: "es",
    category: "SAT",
    date: "2026-09-22T08:00:00.000Z",
    author: "Firoz Khan (FkDigitalMedia)",
    editorialResponsibility: "FkDigitalMedia — Revisión fiscal especializada en RESICO y validación de reglas de la LISR y Miscelánea Fiscal",
    lastReviewed: "2026-09-22",
    lastUpdated: "2026-09-22",
    legalBasis: "Artículos 113-E al 113-J de la Ley del Impuesto Sobre la Renta (LISR); Resolución Miscelánea Fiscal vigente",
    status: "published"
  }
];

let addedCount = 0;
for (const item of articlesMetadata) {
  const content = fs.readFileSync(path.join(postsDir, item.file), 'utf8');
  const postObj = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: content,
    lang: item.lang,
    category: item.category,
    date: item.date,
    author: item.author,
    editorialResponsibility: item.editorialResponsibility,
    lastReviewed: item.lastReviewed,
    lastUpdated: item.lastUpdated,
    legalBasis: item.legalBasis,
    status: item.status
  };

  const existingIdx = existingPosts.findIndex(p => p.slug === item.slug);
  if (existingIdx >= 0) {
    console.log(`Updating existing post: ${item.slug}`);
    existingPosts[existingIdx] = postObj;
  } else {
    console.log(`Adding new post: ${item.slug}`);
    existingPosts.push(postObj);
    addedCount++;
  }
}

fs.writeFileSync(postsFilePath, JSON.stringify(existingPosts, null, 2), 'utf8');
console.log(`All articles merged successfully! Added: ${addedCount}. Total posts in file: ${existingPosts.length}`);
