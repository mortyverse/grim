import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// T048-T053: Protected route middleware
export function middleware(request: NextRequest) {
  // T050: Define protected route patterns
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // T049: Session check using JWT token from cookies
  const token = request.cookies.get('authjs.session-token')?.value ||
                request.cookies.get('__Secure-authjs.session-token')?.value

  if (isProtectedRoute && !token) {
    // T051, T052: Redirect to login with callbackUrl preservation
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname)

    // Validate callbackUrl starts with '/' to prevent open redirect
    const isValidCallback = request.nextUrl.pathname.startsWith('/')

    if (isValidCallback) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      )
    } else {
      // Fallback for invalid paths
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // T055: Allow authenticated access to protected pages
  return NextResponse.next()
}

// T053: Configure middleware matcher to apply to protected routes only
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}
