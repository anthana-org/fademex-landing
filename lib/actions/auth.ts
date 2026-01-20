'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Request a password reset email for a user.
 * Works for both admin and customer accounts.
 *
 * @param email - The user's email address
 * @param redirectTo - The URL to redirect to after clicking the reset link
 */
export async function requestPasswordReset(
    email: string,
    redirectTo: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
    })

    if (error) {
        console.error('Error requesting password reset:', error)
        // Don't reveal if email exists or not for security
        // Always return success to prevent email enumeration
    }

    // Always return success to prevent email enumeration attacks
    return { success: true }
}

/**
 * Update a user's password after they've clicked the reset link.
 * The user must have an active session from the reset link.
 *
 * @param newPassword - The new password to set
 */
export async function updatePassword(
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()

    // Check if user has an active session (from reset link)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return {
            success: false,
            error: 'Sesión inválida o expirada. Solicita un nuevo enlace de recuperación.'
        }
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (error) {
        console.error('Error updating password:', error)

        if (error.message.includes('should be at least')) {
            return {
                success: false,
                error: 'La contraseña debe tener al menos 6 caracteres.'
            }
        }

        return {
            success: false,
            error: 'Error al actualizar la contraseña. Intenta de nuevo.'
        }
    }

    return { success: true }
}
