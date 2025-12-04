// Server-side Supabase client for use in Server Components and Server Actions
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side use
 * Uses publishable key by default (respects RLS policies)
 *
 * For admin operations that need to bypass RLS, use createAdminClient() instead
 */
export async function createClient() {
  const cookieStore = await cookies()

  // Use new publishable key format, fallback to legacy anon key for backwards compatibility
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseKey) {
    throw new Error('Missing Supabase key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or legacy NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Creates a Supabase admin client for server-side use
 * Uses secret key - BYPASSES ALL RLS POLICIES
 *
 * Use with caution! Only for trusted server-side operations.
 * Never expose this client to the browser.
 *
 * WARNING: Secret keys (sb_secret_*) cannot be used in browsers - will return 401 Unauthorized
 */
export async function createAdminClient() {
  const cookieStore = await cookies()

  // Use new secret key format, fallback to legacy service_role key for backwards compatibility
  const adminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!adminKey) {
    throw new Error('Missing admin key. Set SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) for admin operations.')
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    adminKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Ignore cookie errors in Server Components
          }
        },
      },
    }
  )
}
