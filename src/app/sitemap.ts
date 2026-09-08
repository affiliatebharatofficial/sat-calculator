import type { MetadataRoute } from 'next';
import { calculators } from '@/calculators';
import posts from '@/data/posts.json';
import { SPANISH_ONLY_ROUTES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://www.calculadorasat.org';
  const currentDate = new Date();

  // 1. Static & Cluster routes (Only canonical, non-redirected paths)
  const staticPaths = [
    '',
    'about',
    'contact',
    'developer',
    'privacy',
    'terms',
    'disclaimer',
    'calendario-fiscal',
    'blog',
    'llms.txt',
    'formatos',
    'widgets',
    'semanas-cotizadas-imss',
    'tipo-de-cambio',
  ];

  const staticEntries = staticPaths.map((path) => {
    const segment = path ? `/${path}` : '';
    const isSpanishOnly = SPANISH_ONLY_ROUTES.includes(path);
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1.0 : (path === 'dolar-hoy' ? 0.9 : 0.8),
      alternates: isSpanishOnly
        ? {
            languages: {
              es: `${domain}${segment}`,
            },
          }
        : {
            languages: {
              es: `${domain}${segment}`,
              en: `${domain}/en${segment}`,
            },
          },
    };
  });

  // 2. Category routes
  const uniqueCategories = Array.from(
    new Set(calculators.map((calc) => calc.categorySlug))
  );

  const categoryEntries = uniqueCategories.map((categorySlug) => {
    const segment = `/calculadoras/${categorySlug}`;
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        },
      },
    };
  });

  // 3. Calculator detail routes
  const calculatorEntries = calculators.map((calc) => {
    const segment = `/calculadoras/${calc.categorySlug}/${calc.slug}`;
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
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
