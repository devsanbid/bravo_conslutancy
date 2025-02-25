import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register', '/forgotpassword'];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isModRoute = request.nextUrl.pathname.startsWith('/mod');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // If not authenticated and trying to access protected route
  if (!session && (isDashboardRoute || isAdminRoute || isModRoute)) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If authenticated and trying to access auth pages
  if (session && isPublicRoute && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check role-based access
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (isAdminRoute && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isModRoute && profile?.role !== 'moderator') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};