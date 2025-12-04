// TypeScript interfaces for Lead/Client data

export type LeadStatus = 'New' | 'In Progress' | 'Contacted' | 'Closed' | 'Archived'

export interface Lead {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  status: LeadStatus
  contacted: boolean
  admin_notes: string | null
  updated_at: string | null
}

export interface LeadStats {
  total_leads: number
  pending_contact: number
  new_this_week: number
  status_new: number
  status_in_progress: number
  status_contacted: number
  status_closed: number
  status_archived: number
}

export interface LeadFormData {
  full_name: string
  email: string
  phone?: string
  company_name?: string
}

export interface LeadUpdateData {
  status?: LeadStatus
  contacted?: boolean
  admin_notes?: string
}
