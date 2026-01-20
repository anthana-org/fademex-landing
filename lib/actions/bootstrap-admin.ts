'use server'

import { createAdminClient } from '@/lib/supabase/server'

// Bootstrap admin emails - these always have admin access
// Keep in sync with the list in lib/supabase/middleware.ts
const BOOTSTRAP_ADMIN_EMAILS = [
  'admin@fademex.com',
  'juanjo@anthana.com',
]

/**
 * Ensures a bootstrap admin exists in the admin_users table.
 * If the email is a bootstrap admin and doesn't exist in the table,
 * this function will create an entry with status: 'active'.
 *
 * This should be called when a bootstrap admin accesses admin routes
 * but doesn't have a record in the admin_users table yet.
 */
export async function ensureBootstrapAdmin(
  email: string,
  userId: string
): Promise<{ success: boolean; created: boolean; error?: string }> {
  const normalizedEmail = email.toLowerCase()

  // Only process bootstrap admin emails
  if (!BOOTSTRAP_ADMIN_EMAILS.includes(normalizedEmail)) {
    return { success: false, created: false, error: 'Not a bootstrap admin email' }
  }

  const supabase = await createAdminClient()

  // Check if admin record already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id, status')
    .eq('email', normalizedEmail)
    .single()

  if (existing) {
    // If exists but disabled, reactivate
    if (existing.status === 'disabled') {
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ status: 'active' })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error reactivating bootstrap admin:', updateError)
        return { success: false, created: false, error: 'Failed to reactivate admin' }
      }
      return { success: true, created: false }
    }
    // Already exists and active/pending - nothing to do
    return { success: true, created: false }
  }

  // Create new admin record
  const { error: insertError } = await supabase
    .from('admin_users')
    .insert([{
      email: normalizedEmail,
      user_id: userId,
      full_name: normalizedEmail === 'admin@fademex.com' ? 'Admin FADEMEX' : null,
      status: 'active',
      accepted_at: new Date().toISOString()
    }])

  if (insertError) {
    console.error('Error creating bootstrap admin:', insertError)
    return { success: false, created: false, error: 'Failed to create admin record' }
  }

  console.log(`Bootstrap admin created: ${normalizedEmail}`)
  return { success: true, created: true }
}

/**
 * Check if an email is a bootstrap admin
 */
export function isBootstrapAdminEmail(email: string): boolean {
  return BOOTSTRAP_ADMIN_EMAILS.includes(email.toLowerCase())
}
