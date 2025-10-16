// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // You can implement your authentication logic here
    // For example, check for a token in cookies or session
    const token = request.cookies.get('TOKEN')?.value
    // Or check for a session cookie (adjust based on your auth system)
    const isAuthenticated = !!token // Replace with your actual auth logic

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    // You can add more protected routes here
  ]
}