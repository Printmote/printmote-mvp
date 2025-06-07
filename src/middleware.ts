import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response early with the original request headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // try {
  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       get(name: string) {
  //         return request.cookies.get(name)?.value
  //       },
  //       set(name: string, value: string, options: CookieOptions) {
  //           try {
  //         response.cookies.set({
  //           name,
  //           value,
  //           ...options,
  //               // Ensure these are explicitly set
  //               path: options.path ?? '/',
  //               sameSite: options.sameSite ?? 'lax',
  //         })
  //           } catch (error) {
  //             console.error('Error setting cookie:', error)
  //           }
  //       },
  //       remove(name: string, options: CookieOptions) {
  //           try {
  //         response.cookies.set({
  //           name,
  //           value: '',
  //               path: options.path ?? '/',
  //               expires: new Date(0),
  //         })
  //           } catch (error) {
  //             console.error('Error removing cookie:', error)
  //           }
  //       },
  //     },
  //   }
  // )

  //   // Refresh the auth session
  //   const { data: { session } } = await supabase.auth.getSession()

  // return response

  // } catch (error) {
  //   console.error('Middleware error:', error)
  //   // Return the response even if there's an error
  //   return response
  // }
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}