import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import i18n from '../i18n.json';

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  // Then check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  for (const part of acceptLanguage.split(',')) {
    const lang = part.split(';')[0].trim().split('-')[0];
    if (locales.includes(lang)) return lang;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.endsWith('/ads.txt') ||
    pathname.endsWith('/favicon.ico') ||
    pathname.endsWith('/favicon.svg') ||
    pathname.endsWith('/logo.png') ||
    pathname.endsWith('/robots.txt') ||
    pathname.startsWith('/scripts/') ||
    pathname.endsWith('/manifest.json') ||
    pathname.endsWith('/apple-touch-icon.png') ||
    pathname.startsWith('/sounds/') ||
    pathname.startsWith('/images/')
  ) {
    return NextResponse.next();
  }

  // Check if the path already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
