import type { MetadataRoute } from 'next';
import { calculators } from '@/calculators';
import posts from '@/data/posts.json';
import { SPANISH_ONLY_ROUTES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://www.calculadorasat.org';
  const currentDate = new Date();

  // 1. Static & Cluster routes (Only canonical, non-redirected paths returning HTTP 200)
  const staticPaths = [
    '',
    'about',
    'contact',
    'privacy',
    'terms',
    'disclaimer',
    'calendario-fiscal',
    'blog',
    'metodologia',
    'fuentes',
    'actualizaciones',
    'reportar-error',
    'formatos',
    'widgets',
    'tipo-de-cambio',
  ];

  const staticEntries = staticPaths.map((path) => {
    const segment = path ? `/${path}` : '';
    const isSpanishOnly = SPANISH_ONLY_ROUTES.includes(path);
    const isHomepage = path === '';
    const isCoreTool = [
      'tipo-de-cambio',
      'calendario-fiscal',
      'blog',
      'metodologia',
      'fuentes',
      'actualizaciones',
      'reportar-error',
    ].includes(path);
    
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: isHomepage ? ('daily' as const) : ('weekly' as const),
      priority: isHomepage ? 1.0 : (isCoreTool ? 0.8 : 0.6),
      alternates: isSpanishOnly
        ? {
            languages: {
              es: `${domain}${segment}`,
              'x-default': `${domain}${segment}`,
            },
          }
        : {
            languages: {
              es: `${domain}${segment}`,
              en: `${domain}/en${segment}`,
              'x-default': `${domain}${segment}`,
            },
          },
    };
  });

  // Consolidated slugs that are redirected to canonical hubs and must not be in sitemap.xml
  const REDIRECTED_CALC_SLUGS = [
    'dolar-hoy',
    'tablas-e-indicadores-sunat',
    'tipo-de-cambio-para-solventar-obligaciones',
    'calculadora-dolares-a-soles',
  ];

  const canonicalCalculators = calculators.filter(
    (calc) => !REDIRECTED_CALC_SLUGS.includes(calc.slug)
  );

  // 2. Category routes
  const uniqueCategories = Array.from(
    new Set(canonicalCalculators.map((calc) => calc.categorySlug))
  );

  const categoryEntries = uniqueCategories.map((categorySlug) => {
    const segment = `/calculadoras/${categorySlug}`;
    const isSpanishOnly = categorySlug === 'peru';
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: isSpanishOnly
        ? {
            languages: {
              es: `${domain}${segment}`,
              'x-default': `${domain}${segment}`,
            },
          }
        : {
            languages: {
              es: `${domain}${segment}`,
              en: `${domain}/en${segment}`,
              'x-default': `${domain}${segment}`,
            },
          },
    };
  });

  // 3. Calculator detail routes
  const calculatorEntries = canonicalCalculators.map((calc) => {
    const segment = `/calculadoras/${calc.categorySlug}/${calc.slug}`;
    const isSpanishOnly = calc.categorySlug === 'peru';
    const isHighPriority = [
      'calculadora-iva',
      'calculadora-isr-pf',
      'calculadora-resico-pf',
      'calculadora-aguinaldo',
      'calculadora-finiquito-liquidacion',
      'calculadora-salario-neto-bruto',
      'calculadora-vacaciones-prima',
      'calculadora-ptu-reparto-utilidades',
    ].includes(calc.slug);

    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: isHighPriority ? 0.9 : 0.8,
      alternates: isSpanishOnly
        ? {
            languages: {
              es: `${domain}${segment}`,
              'x-default': `${domain}${segment}`,
            },
          }
        : {
            languages: {
              es: `${domain}${segment}`,
              en: `${domain}/en${segment}`,
              'x-default': `${domain}${segment}`,
            },
          },
    };
  });

  // 4. Blog post routes
  const publishedPosts = (posts as any[]).filter(p => p.status === 'published');
  const blogEntries = publishedPosts.map((post) => {
    const segment = `/blog/${post.slug}`;
    const languages = post.lang === 'es'
      ? {
          es: `${domain}${segment}`,
          'x-default': `${domain}${segment}`,
        }
      : {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        };

    return {
      url: `${domain}${segment}`,
      lastModified: new Date(post.date || currentDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages,
      },
    };
  });

  return [...staticEntries, ...categoryEntries, ...calculatorEntries, ...blogEntries];
}
