import { NextResponse } from 'next/server';

const ADMIN_HOST = process.env.KEYSTATIC_ADMIN_HOST || 'admin.ledtehnika.com';

function normalizeHost(host) {
  return (host || '').replace(/:\d+$/, '').toLowerCase();
}

function isLocalHost(host) {
  return host === 'localhost' || host === '127.0.0.1';
}

export function middleware(request) {
  const host = normalizeHost(request.headers.get('host'));
  const { pathname } = request.nextUrl;

  if (isLocalHost(host)) {
    return NextResponse.next();
  }

  const isAdminHost = host === ADMIN_HOST.toLowerCase() || host === `www.${ADMIN_HOST.toLowerCase()}`;
  const isKeystaticPath =
    pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic');

  if (isAdminHost) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/keystatic', request.url));
    }
    if (!isKeystaticPath) {
      return new NextResponse('Not found', { status: 404 });
    }
    return NextResponse.next();
  }

  if (isKeystaticPath) {
    const adminUrl = new URL(pathname, `https://${ADMIN_HOST}`);
    adminUrl.search = request.nextUrl.search;
    return NextResponse.redirect(adminUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
