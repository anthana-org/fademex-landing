// Middleware helper for Supabase authentication
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Bootstrap admin emails - these always have admin access
// Used to ensure primary admins can always access the admin portal
const BOOTSTRAP_ADMIN_EMAILS = [
  'admin@fademex.com',
  'juanjo@anthana.com',
]

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
      redirectUrl.searchParams.set('error', 'missing_supabase_keys')
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

  // Protect /admin routes (except login and invite pages which are public)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login and invite pages without auth
    const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login')
    const isInvitePage = request.nextUrl.pathname.startsWith('/admin/invite/')
    const isPublicAdminRoute = isLoginPage || isInvitePage

    if (!user && !isPublicAdminRoute) {
      // Redirect to admin login page if not authenticated
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is logged in and on admin login page, check if they're admin and redirect
    if (user && isLoginPage) {
      const userEmail = user.email?.toLowerCase()
      const fallbackAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
      const isFallbackAdmin = fallbackAdminEmail && userEmail === fallbackAdminEmail
      const isBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.includes(userEmail || '')

      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('id, status')
        .eq('email', userEmail || '')
        .eq('status', 'active')
        .single()

      if (adminRecord || isFallbackAdmin || isBootstrapAdmin) {
        // Admin is already logged in, redirect to admin dashboard
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/admin'
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Check if user has admin role (skip for public admin routes)
    if (user && !isPublicAdminRoute) {
      const userEmail = user.email?.toLowerCase()

      // Check for fallback admin email from environment
      const fallbackAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
      const isFallbackAdmin = fallbackAdminEmail && userEmail === fallbackAdminEmail

      // Check if user is a bootstrap admin
      const isBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.includes(userEmail || '')

      // Query admin_users table to check if user is an active admin
      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('id, status')
        .eq('email', userEmail || '')
        .eq('status', 'active')
        .single()

      // Auto-seed bootstrap admin if not in database
      if (!adminRecord && isBootstrapAdmin) {
        const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
        if (serviceRoleKey && supabaseUrl) {
          const adminSupabase = createServerClient(supabaseUrl, serviceRoleKey, {
            cookies: {
              getAll() { return request.cookies.getAll() },
              setAll() { /* no-op for admin client */ },
            },
          })

          // Check if any record exists (including disabled)
          const { data: existingAdmin } = await adminSupabase
            .from('admin_users')
            .select('id, status')
            .eq('email', userEmail || '')
            .single()

          if (existingAdmin) {
            // If disabled, reactivate
            if (existingAdmin.status === 'disabled') {
              await adminSupabase
                .from('admin_users')
                .update({ status: 'active' })
                .eq('id', existingAdmin.id)
              console.log(`Bootstrap admin reactivated: ${userEmail}`)
            }
          } else {
            // Create new admin record
            await adminSupabase
              .from('admin_users')
              .insert([{
                email: userEmail,
                user_id: user.id,
                full_name: userEmail === 'admin@fademex.com' ? 'Admin FADEMEX' : null,
                status: 'active',
                accepted_at: new Date().toISOString()
              }])
            console.log(`Bootstrap admin created: ${userEmail}`)
          }
        }
      }

      if (!adminRecord && !isFallbackAdmin && !isBootstrapAdmin) {
        // If user is logged in but not an admin, redirect to customer portal
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/portal'
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  // Protect /portal routes
  if (request.nextUrl.pathname.startsWith('/portal')) {
    // Exclude public portal routes (login, register, forgot-password, reset-password)
    const isPublicPortalRoute =
      request.nextUrl.pathname.startsWith('/portal/login') ||
      request.nextUrl.pathname.startsWith('/portal/register') ||
      request.nextUrl.pathname.startsWith('/portal/forgot-password') ||
      request.nextUrl.pathname.startsWith('/portal/reset-password')

    if (!user && !isPublicPortalRoute) {
      // Redirect to portal login
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/portal/login'
      return NextResponse.redirect(redirectUrl)
    }

    if (user) {
      // Check if user is a bootstrap admin - redirect them to admin portal
      const userEmail = user.email?.toLowerCase() || ''
      const isBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.includes(userEmail)

      if (isBootstrapAdmin) {
        // Redirect admin users to admin portal
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/admin'
        return NextResponse.redirect(redirectUrl)
      }

      if (isPublicPortalRoute) {
        // Redirect regular users to portal dashboard if already logged in
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/portal'
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return supabaseResponse
}
