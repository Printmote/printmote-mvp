import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Convert the cookie options to match Next.js format
          response.cookies.set({
            name,
            value,
            path: options.path,
            maxAge: options.maxAge,
            domain: options.domain,
            secure: options.secure,
            httpOnly: options.httpOnly,
            sameSite: options.sameSite,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            path: options.path,
            maxAge: -1, // Delete the cookie
          })
        },
      },
    }
  )

  try {
    // Refresh session if expired
    await supabase.auth.getSession()
  } catch (error) {
    console.error('Middleware session refresh error:', error)
  }

  return response
} 