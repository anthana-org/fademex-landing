'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Lead, LeadStats, LeadStatus, LeadUpdateData } from '@/lib/types/lead'

// Fetch all leads with optional filtering and sorting
export async function getLeads(statusFilter?: LeadStatus): Promise<Lead[]> {
  const supabase = await createClient()

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (statusFilter) {
    query = query.eq('status', statusFilter)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching leads:', error)
    throw new Error('Failed to fetch leads')
  }

  return data as Lead[]
}

// Fetch a single lead by ID
export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching lead:', error)
    return null
  }

  return data as Lead
}

// Fetch lead statistics
export async function getLeadStats(): Promise<LeadStats> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lead_stats')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching lead stats:', error)
    // Return default stats if view doesn't exist or error occurs
    return {
      total_leads: 0,
      pending_contact: 0,
      new_this_week: 0,
      status_new: 0,
      status_in_progress: 0,
      status_contacted: 0,
      status_closed: 0,
      status_archived: 0,
    }
  }

  return data as LeadStats
}

// Update a lead's status
export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating lead status:', error)
    throw new Error('Failed to update lead status')
  }

  revalidatePath('/admin')
  return { success: true }
}

// Toggle contacted status
export async function toggleLeadContacted(id: string, contacted: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update({ contacted })
    .eq('id', id)

  if (error) {
    console.error('Error updating contacted status:', error)
    throw new Error('Failed to update contacted status')
  }

  revalidatePath('/admin')
  return { success: true }
}

// Update admin notes
export async function updateLeadNotes(id: string, admin_notes: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update({ admin_notes })
    .eq('id', id)

  if (error) {
    console.error('Error updating admin notes:', error)
    throw new Error('Failed to update admin notes')
  }

  revalidatePath('/admin')
  return { success: true }
}

// Update multiple fields at once
export async function updateLead(id: string, updates: LeadUpdateData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('Error updating lead:', error)
    throw new Error('Failed to update lead')
  }

  revalidatePath('/admin')
  return { success: true }
}

// Delete a lead
export async function deleteLead(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting lead:', error)
    throw new Error('Failed to delete lead')
  }

  revalidatePath('/admin')
  return { success: true }
}

// Create a new lead (for public registration)
export async function createLead(formData: {
  full_name: string
  email: string
  phone?: string
  company_name?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .insert([formData])
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    throw new Error('Failed to create lead')
  }

  return data as Lead
}
