import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude internal files and assets (this is also handled by matcher, but keep as double check)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. If pathname is exactly /es or starts with /es/, redirect to non-prefixed path (Spanish as default)
  if (pathname === '/es') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }
  if (pathname.startsWith('/es/')) {
    const newPathname = pathname.replace(/^\/es/, '');
    return NextResponse.redirect(new URL(newPathname, request.url), 301);
  }

  // 2.0 Consolidated 301 Permanent Redirects (Peru URLs, currency consolidation, and canonical aliases)
  const permanentRedirectMap: Record<string, string> = {
    // Old Peru URLs previously under /calculadoras/tipo-de-cambio/*
    '/calculadoras/tipo-de-cambio/consulta-ruc-sunat': '/calculadoras/peru/consulta-ruc-sunat',
    '/calculadoras/tipo-de-cambio/calculadora-igv-peru': '/calculadoras/peru/calculadora-igv-peru',
    '/calculadoras/tipo-de-cambio/calculadora-cts-peru': '/calculadoras/peru/calculadora-cts-peru',
    '/calculadoras/tipo-de-cambio/calculadora-gratificacion-peru': '/calculadoras/peru/calculadora-gratificacion-peru',
    '/calculadoras/tipo-de-cambio/calculadora-quinta-categoria-peru': '/calculadoras/peru/calculadora-quinta-categoria-peru',
    '/calculadoras/tipo-de-cambio/tipo-de-cambio-sunat': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/calculadoras/tipo-de-cambio/tablas-e-indicadores-sunat': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/calculadoras/tipo-de-cambio/tipo-de-cambio-para-solventar-obligaciones': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/calculadoras/tipo-de-cambio/dolar-hoy': '/tipo-de-cambio',
    '/calculadoras/tipo-de-cambio/precio-del-dolar-en-peru': '/tipo-de-cambio',
    '/calculadoras/tipo-de-cambio/calculadora-dolares-a-soles': '/tipo-de-cambio',
    '/calculadoras/tipo-de-cambio/calculadora-soles-a-dolares': '/tipo-de-cambio',
    '/calculadoras/tipo-de-cambio/soles-a-dolares': '/tipo-de-cambio',

    // Standalone Peru routes consolidated into /calculadoras/peru/*
    '/consulta-ruc-sunat': '/calculadoras/peru/consulta-ruc-sunat',
    '/calculadora-igv-peru': '/calculadoras/peru/calculadora-igv-peru',
    '/calculadora-cts-peru': '/calculadoras/peru/calculadora-cts-peru',
    '/calculadora-gratificacion-peru': '/calculadoras/peru/calculadora-gratificacion-peru',
    '/calculadora-quinta-categoria-peru': '/calculadoras/peru/calculadora-quinta-categoria-peru',
    '/tipo-de-cambio-sunat': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/tablas-e-indicadores-sunat': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/tipo-de-cambio-para-solventar-obligaciones': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/calculadoras/peru/tablas-e-indicadores-sunat': '/calculadoras/peru/tipo-de-cambio-sunat',
    '/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones': '/calculadoras/peru/tipo-de-cambio-sunat',

    // Currency consolidation (all redirect to Universal Converter /tipo-de-cambio)
    '/dolar-hoy': '/tipo-de-cambio',
    '/precio-del-dolar-en-peru': '/tipo-de-cambio',
    '/dolares-a-soles': '/tipo-de-cambio',
    '/calculadora-dolares-a-soles': '/tipo-de-cambio',
    '/soles-a-dolares': '/tipo-de-cambio',
    '/calculadora-soles-a-dolares': '/tipo-de-cambio',
    '/calculadoras/peru/precio-del-dolar-en-peru': '/tipo-de-cambio',
    '/calculadoras/peru/dolar-hoy': '/tipo-de-cambio',
    '/calculadoras/peru/dolares-a-soles': '/tipo-de-cambio',
    '/calculadoras/peru/calculadora-dolares-a-soles': '/tipo-de-cambio',
    '/calculadoras/peru/soles-a-dolares': '/tipo-de-cambio',
    '/calculadoras/peru/calculadora-soles-a-dolares': '/tipo-de-cambio',

    // 9 Currency routes under /calculadoras/divisas/* (consolidated into universal /tipo-de-cambio)
    '/calculadoras/divisas/dolar-hoy-mexico': '/tipo-de-cambio',
    '/calculadoras/divisas/euro-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/quetzal-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/yen-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/yuan-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/libra-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/franco-suizo-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/dolar-canadiense-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas/real-brasileno-a-peso-mexicano': '/tipo-de-cambio',
    '/calculadoras/divisas': '/tipo-de-cambio',
    '/divisas': '/tipo-de-cambio',

    // Core Mexican calculator slug aliases (avoiding 404s and chains)
    '/calculadoras/sat/calculadora-isr': '/calculadoras/sat/calculadora-isr-pf',
    '/calculadoras/sat/calculadora-resico': '/calculadoras/sat/calculadora-resico-pf',
    '/calculadoras/nomina/calculadora-salario-neto': '/calculadoras/nomina/calculadora-salario-neto-bruto',
    '/calculadoras/nomina/calculadora-finiquito': '/calculadoras/nomina/calculadora-finiquito-liquidacion',
    '/calculadoras/nomina/calculadora-vacaciones': '/calculadoras/nomina/calculadora-vacaciones-prima',
    '/calculadoras/nomina/calculadora-prima-vacacional': '/calculadoras/nomina/calculadora-vacaciones-prima',
    '/calculadoras/laboral/calculadora-vacaciones': '/calculadoras/nomina/calculadora-vacaciones-prima',
    '/calculadoras/laboral/calculadora-ptu': '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
    '/calculadoras/nomina/calculadora-ptu': '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
    '/calculadoras/laboral/calculadora-ptu-reparto-utilidades': '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
    '/calculadoras/laboral/calculadora-semanas-cotizadas-imss': '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
    '/calculadoras/fiscal/resico-vs-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',
    '/calculadoras/sat/resico-vs-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',
    '/calculadoras/sat/comparador-resico-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',
    '/calculadoras/resico/resico-vs-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',

    // Root shorthand aliases (direct 1-hop 301 to canonical)
    '/calculadora-finiquito': '/calculadoras/nomina/calculadora-finiquito-liquidacion',
    '/calculadora-salario-neto': '/calculadoras/nomina/calculadora-salario-neto-bruto',
    '/calculadora-salario-bruto': '/calculadoras/nomina/calculadora-salario-neto-bruto',
    '/calculadora-salario': '/calculadoras/nomina/calculadora-salario-neto-bruto',
    '/calculadora-resico': '/calculadoras/sat/calculadora-resico-pf',
    '/calculadora-vacaciones': '/calculadoras/nomina/calculadora-vacaciones-prima',
    '/calculadora-aguinaldo': '/calculadoras/nomina/calculadora-aguinaldo',
    '/calculadora-iva': '/calculadoras/sat/calculadora-iva',
    '/calculadora-isr': '/calculadoras/sat/calculadora-isr-pf',
    '/calculadora-ptu': '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
    '/calculadora-ptu-reparto-utilidades': '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
    '/calculadora-semanas-cotizadas-imss': '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
    '/semanas-cotizadas-imss': '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
    '/resico-vs-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',
    '/comparador-resico-actividad-empresarial': '/calculadoras/resico/comparador-resico-actividad-empresarial',
  };

  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  if (permanentRedirectMap[normalizedPath]) {
    return NextResponse.redirect(new URL(permanentRedirectMap[normalizedPath], request.url), 301);
  }

  // 2.1 If requesting an /en/ URL for a Spanish-only route, 301 redirect to canonical Spanish route
  if (pathname.startsWith('/en/')) {
    const pathWithoutEn = pathname.replace(/^\/en\//, '');
    const firstSegment = pathWithoutEn.split('/')[0];
    const spanishOnlyList = [
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
    if (spanishOnlyList.includes(firstSegment)) {
      return NextResponse.redirect(new URL(`/${pathWithoutEn}`, request.url), 301);
    }
  }

  // 3. If it starts with a supported locale (currently only /en is left), let it pass
  const hasLocale = pathname.startsWith('/en/') || pathname === '/en';
  if (hasLocale) {
    return NextResponse.next();
  }

  // 4. For default language (Spanish), internally rewrite it to /es/...
  // This keeps the URL in the browser as /... but serves the content from /[lang]/...
  return NextResponse.rewrite(new URL(`/es${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Match all request paths except api routes, next static files, next images, favicon.ico, and files with extensions (like images)
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
