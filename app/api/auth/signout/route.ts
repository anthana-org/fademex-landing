import { createClient } from '@/lib/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Determine redirect based on referrer (admin vs portal)
  const referer = request.headers.get('referer') || ''
  const isAdminLogout = referer.includes('/admin')

  // Sign out logic
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Sign out error:', error)
  }

  // Redirect to appropriate login page
  const redirectPath = isAdminLogout ? '/login' : '/portal/login'
  const redirectUrl = new URL(redirectPath, request.url)

  return NextResponse.redirect(redirectUrl, { status: 303 })
}

export async function GET(request: NextRequest) {
  // Determine redirect based on referrer
  const referer = request.headers.get('referer') || ''
  const isAdminLogout = referer.includes('/admin')

  const redirectPath = isAdminLogout ? '/login' : '/portal/login'
  const redirectUrl = new URL(redirectPath, request.url)

  return NextResponse.redirect(redirectUrl, { status: 303 })
}
