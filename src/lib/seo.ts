export const SPANISH_ONLY_ROUTES = [
  'calculadora-comisiones-tarjeta-dolares',
  'consulta-ruc-sunat',
  'widgets',
  'calculadora-quinta-categoria-peru',
  'tipo-de-cambio-para-solventar-obligaciones',
  'tablas-e-indicadores-sunat',
  'calculadora-gratificacion-peru',
  'calculadora-cts-peru',
  'calculadora-igv-peru',
  'formatos',
  'semanas-cotizadas-imss',
  'dolar-hoy',
  'precio-del-dolar-en-peru',
  'tipo-de-cambio',
  'tipo-de-cambio-sunat',
  'dolares-a-soles',
  'soles-a-dolares',
  'calculadora-dolares-a-soles',
  'calculadora-soles-a-dolares',
  'calendario-fiscal',
  'blog',
];

export function isSpanishOnlyRoute(route: string): boolean {
  const clean = route.replace(/^\/en/, '').replace(/^\//, '').split('/')[0];
  return SPANISH_ONLY_ROUTES.includes(clean);
}

export function getSeoAlternates(route: string, lang: string) {
  const cleanRoute = route.startsWith('/') ? route : `/${route}`;
  const baseDomain = 'https://www.calculadorasat.org';
  
  const esPath = cleanRoute === '/' ? '' : cleanRoute;
  const esUrl = `${baseDomain}${esPath}`;
  const enUrl = `${baseDomain}/en${esPath}`;

  const cleanSlug = esPath.replace(/^\//, '').split('/')[0];
  const isSpanishOnly = SPANISH_ONLY_ROUTES.includes(cleanSlug);

  // If the route only exists in Spanish, canonical must ALWAYS point to the primary Spanish URL,
  // and there should be no en-US alternate to prevent Google reporting duplicate canonical issues.
  if (isSpanishOnly) {
    return {
      canonical: esUrl,
      languages: {
        'es-MX': esUrl,
        'x-default': esUrl,
      },
    };
  }

  const canonicalUrl = `${baseDomain}${lang === 'en' ? '/en' : ''}${esPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      'es-MX': esUrl,
      'en-US': enUrl,
      'x-default': esUrl,
    },
  };
}
