import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export const middleware = withAuth(
  function onSuccess() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
