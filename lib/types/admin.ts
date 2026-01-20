// Admin User Types

export interface AdminUser {
    id: string
    user_id: string | null
    email: string
    full_name: string | null
    invited_by: string | null
    invited_at: string
    accepted_at: string | null
    status: 'pending' | 'active' | 'disabled'
    created_at: string
    updated_at: string
}

export interface InviteAdminData {
    email: string
    full_name?: string
}

export interface AdminInviteToken {
    id: string
    email: string
    full_name: string | null
    status: 'pending' | 'active' | 'disabled'
}
