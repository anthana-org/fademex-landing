import { createClient } from '@/lib/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const requestUrl = request.nextUrl.clone()
  const supabase = await createClient()

  // Sign out logic
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Sign out error:', error)
  }

  // Redirect to portal login page after signout
  requestUrl.pathname = '/portal/login'
  return NextResponse.redirect(requestUrl)
}

export async function GET(request: NextRequest) {
  const requestUrl = request.nextUrl.clone()
  requestUrl.pathname = '/portal/login'
  return NextResponse.redirect(requestUrl)
}
