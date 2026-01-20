'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { AdminUser, InviteAdminData } from '@/lib/types/admin'
import { Resend } from 'resend'
import { getAdminInviteHtml } from '@/lib/email'

// =====================================================
// Admin User Operations
// =====================================================

// Get all admin users
export async function getAllAdmins(): Promise<AdminUser[]> {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching admins:', error)
        return []
    }

    return data as AdminUser[]
}

// Check if email is an active admin
export async function isAdmin(email: string): Promise<boolean> {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email.toLowerCase())
        .eq('status', 'active')
        .single()

    if (error || !data) {
        return false
    }

    return true
}

// Get admin by ID (token validation)
export async function getAdminByToken(id: string): Promise<AdminUser | null> {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching admin by token:', error)
        return null
    }

    return data as AdminUser
}

// Invite new admin
export async function inviteAdmin(inviteData: InviteAdminData): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()
    const adminSupabase = await createAdminClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    // Check if email already exists
    const { data: existing } = await adminSupabase
        .from('admin_users')
        .select('id, status')
        .eq('email', inviteData.email.toLowerCase())
        .single()

    if (existing) {
        if (existing.status === 'disabled') {
            return { success: false, error: 'Este usuario fue deshabilitado. Reactívalo en lugar de crear uno nuevo.' }
        }
        return { success: false, error: 'Ya existe un administrador con este correo' }
    }

    // Create admin record
    const { data: newAdmin, error: insertError } = await adminSupabase
        .from('admin_users')
        .insert([{
            email: inviteData.email.toLowerCase(),
            full_name: inviteData.full_name || null,
            invited_by: user.id,
            status: 'pending'
        }])
        .select()
        .single()

    if (insertError) {
        console.error('Error creating admin invite:', insertError)
        return { success: false, error: 'Error al crear la invitación' }
    }

    // Send invite email
    try {
        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
            console.warn('RESEND_API_KEY not configured, skipping email')
        } else {
            const resend = new Resend(resendApiKey)
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
            const inviteUrl = `${baseUrl}/admin/invite/${newAdmin.id}`

            await resend.emails.send({
                from: 'FADEMEX <noreply@fademex.com>',
                to: inviteData.email,
                subject: 'Invitación al Panel de Administración - FADEMEX',
                html: getAdminInviteHtml({
                    name: inviteData.full_name || inviteData.email,
                    inviteUrl,
                    invitedBy: user.email || 'Un administrador'
                })
            })
        }
    } catch (emailError) {
        console.error('Error sending invite email:', emailError)
        // Don't fail the invite if email fails - admin can resend
    }

    revalidatePath('/admin/settings')
    return { success: true }
}

// Resend invite email
export async function resendInvite(adminId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()
    const adminSupabase = await createAdminClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    // Get admin record
    const { data: admin, error } = await adminSupabase
        .from('admin_users')
        .select('*')
        .eq('id', adminId)
        .single()

    if (error || !admin) {
        return { success: false, error: 'Administrador no encontrado' }
    }

    if (admin.status !== 'pending') {
        return { success: false, error: 'Solo se puede reenviar a invitaciones pendientes' }
    }

    // Send invite email
    try {
        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
            return { success: false, error: 'Servicio de email no configurado' }
        }

        const resend = new Resend(resendApiKey)
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const inviteUrl = `${baseUrl}/admin/invite/${admin.id}`

        await resend.emails.send({
            from: 'FADEMEX <noreply@fademex.com>',
            to: admin.email,
            subject: 'Invitación al Panel de Administración - FADEMEX',
            html: getAdminInviteHtml({
                name: admin.full_name || admin.email,
                inviteUrl,
                invitedBy: user.email || 'Un administrador'
            })
        })

        return { success: true }
    } catch (emailError) {
        console.error('Error resending invite email:', emailError)
        return { success: false, error: 'Error al enviar el correo' }
    }
}

// Accept invite and create auth user
export async function acceptInvite(
    adminId: string,
    password: string
): Promise<{ success: boolean; error?: string }> {
    const adminSupabase = await createAdminClient()

    // Get admin record
    const { data: admin, error: fetchError } = await adminSupabase
        .from('admin_users')
        .select('*')
        .eq('id', adminId)
        .single()

    if (fetchError || !admin) {
        return { success: false, error: 'Invitación no encontrada o inválida' }
    }

    if (admin.status !== 'pending') {
        return { success: false, error: 'Esta invitación ya fue utilizada o está deshabilitada' }
    }

    // Create auth user with admin service role
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email: admin.email,
        password: password,
        email_confirm: true, // Auto-confirm since it's an invite
        user_metadata: {
            full_name: admin.full_name
        }
    })

    if (authError) {
        console.error('Error creating auth user:', authError)
        if (authError.message.includes('already been registered')) {
            return { success: false, error: 'Este correo ya tiene una cuenta. Inicia sesión en su lugar.' }
        }
        return { success: false, error: 'Error al crear la cuenta' }
    }

    // Update admin record with user_id and status
    const { error: updateError } = await adminSupabase
        .from('admin_users')
        .update({
            user_id: authData.user.id,
            status: 'active',
            accepted_at: new Date().toISOString()
        })
        .eq('id', adminId)

    if (updateError) {
        console.error('Error updating admin record:', updateError)
        return { success: false, error: 'Error al activar la cuenta' }
    }

    return { success: true }
}

// Disable admin
export async function disableAdmin(adminId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()
    const adminSupabase = await createAdminClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    // Get admin to disable
    const { data: admin } = await adminSupabase
        .from('admin_users')
        .select('*')
        .eq('id', adminId)
        .single()

    if (!admin) {
        return { success: false, error: 'Administrador no encontrado' }
    }

    // Prevent self-disable
    if (admin.user_id === user.id) {
        return { success: false, error: 'No puedes deshabilitarte a ti mismo' }
    }

    const { error } = await adminSupabase
        .from('admin_users')
        .update({ status: 'disabled' })
        .eq('id', adminId)

    if (error) {
        console.error('Error disabling admin:', error)
        return { success: false, error: 'Error al deshabilitar administrador' }
    }

    revalidatePath('/admin/settings')
    return { success: true }
}

// Enable admin
export async function enableAdmin(adminId: string): Promise<{ success: boolean; error?: string }> {
    const adminSupabase = await createAdminClient()

    const { data: admin } = await adminSupabase
        .from('admin_users')
        .select('*')
        .eq('id', adminId)
        .single()

    if (!admin) {
        return { success: false, error: 'Administrador no encontrado' }
    }

    // If they had accepted, set to active. If never accepted, set to pending
    const newStatus = admin.accepted_at ? 'active' : 'pending'

    const { error } = await adminSupabase
        .from('admin_users')
        .update({ status: newStatus })
        .eq('id', adminId)

    if (error) {
        console.error('Error enabling admin:', error)
        return { success: false, error: 'Error al habilitar administrador' }
    }

    revalidatePath('/admin/settings')
    return { success: true }
}
