// Middleware helper for Supabase authentication
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Use new publishable key format, fallback to legacy anon key
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  // If Supabase is not configured, skip auth checks but still protect admin routes
  if (!supabaseKey || !supabaseUrl) {
    console.warn('Supabase not configured. Admin routes will be inaccessible.')

    // Redirect admin/login routes to home if Supabase not configured
    if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/login')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }

    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Redirect to login page if not authenticated
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role
    const userEmail = user.email
    const allowedAdmins = [
      'admin@fademex.com',
      'juanjo@anthana.com'
      // Add more admin emails here
    ]

    if (!allowedAdmins.includes(userEmail || '')) {
      // Redirect to unauthorized page or home
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Protect /portal routes
  if (request.nextUrl.pathname.startsWith('/portal')) {
    // Exclude public portal routes (login, register)
    const isPublicPortalRoute =
      request.nextUrl.pathname.startsWith('/portal/login') ||
      request.nextUrl.pathname.startsWith('/portal/register')

    if (!user && !isPublicPortalRoute) {
      // Redirect to portal login
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/portal/login'
      return NextResponse.redirect(redirectUrl)
    }

    if (user && isPublicPortalRoute) {
      // Redirect to portal dashboard if already logged in
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/portal'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}
