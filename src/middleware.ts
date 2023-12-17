import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers
export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  const href = request.nextUrl.href;
  const index = href.indexOf('?');
  const pathName = index > 0 ? href.substring(0, index) : href;
  requestHeaders.set('pathName', pathName)
 
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
 
  // Set a new response header `x-hello-from-middleware2`
  //response.headers.set('x-hello-from-middleware2', 'hello')
  return response

//     return NextResponse.next({
//      request: {
//         // New request headers
//         'x-pathname': request.nextUrl.pathname,
//      },
//   });
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }