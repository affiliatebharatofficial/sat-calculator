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

  // 2.0 Currency consolidation 301 redirects (eliminating duplicate & thin keyword variants)
  const currencyRedirectMap: Record<string, string> = {
    '/precio-del-dolar-en-peru': '/dolar-hoy',
    '/calculadora-dolares-a-soles': '/dolares-a-soles',
    '/soles-a-dolares': '/dolares-a-soles',
    '/calculadora-soles-a-dolares': '/dolares-a-soles',
    '/calculadoras/peru/precio-del-dolar-en-peru': '/dolar-hoy',
    '/calculadoras/peru/calculadora-dolares-a-soles': '/dolares-a-soles',
    '/calculadoras/peru/soles-a-dolares': '/dolares-a-soles',
    '/calculadoras/peru/calculadora-soles-a-dolares': '/dolares-a-soles',
  };

  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  if (currencyRedirectMap[normalizedPath]) {
    return NextResponse.redirect(new URL(currencyRedirectMap[normalizedPath], request.url), 301);
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
