'use client'

import { useState } from 'react'
import type { Lead, LeadStatus } from '@/lib/types/lead'
import { updateLead, deleteLead } from '@/lib/actions/leads'
import { format } from 'date-fns'
import { X, Save, Trash2, Mail, Phone, Building2, Calendar, User } from 'lucide-react'

interface LeadDetailModalProps {
  lead: Lead
  isOpen: boolean
  onClose: () => void
  onUpdate: (lead: Lead) => void
}

const STATUS_OPTIONS: LeadStatus[] = ['New', 'In Progress', 'Contacted', 'Closed', 'Archived']

export function LeadDetailModal({ lead, isOpen, onClose, onUpdate }: LeadDetailModalProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.status)
  const [contacted, setContacted] = useState(lead.contacted)
  const [adminNotes, setAdminNotes] = useState(lead.admin_notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isOpen) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateLead(lead.id, {
        status,
        contacted,
        admin_notes: adminNotes,
      })

      onUpdate({
        ...lead,
        status,
        contacted,
        admin_notes: adminNotes,
      })

      onClose()
    } catch (error) {
      console.error('Failed to update lead:', error)
      alert('Failed to update lead. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteLead(lead.id)
      onClose()
      window.location.reload() // Refresh to update the list
    } catch (error) {
      console.error('Failed to delete lead:', error)
      alert('Failed to delete lead. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Lead Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                <User className="w-3 h-3" />
                Full Name
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white">
                {lead.full_name}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                <Mail className="w-3 h-3" />
                Email
              </label>
              <a
                href={`mailto:${lead.email}`}
                className="block bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-gold hover:bg-white/10 transition-colors"
              >
                {lead.email}
              </a>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                <Phone className="w-3 h-3" />
                Phone
              </label>
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="block bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-gold hover:bg-white/10 transition-colors"
                >
                  {lead.phone}
                </a>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-500">
                  Not provided
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                <Building2 className="w-3 h-3" />
                Company
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white">
                {lead.company_name || <span className="text-gray-500">Not provided</span>}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
                <Calendar className="w-3 h-3" />
                Registration Date
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white">
                {format(new Date(lead.created_at), 'MMM dd, yyyy HH:mm')}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2 block">
                Lead ID
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400 text-xs font-mono">
                {lead.id}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2 block">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#050505]">
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Contacted Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
            <div>
              <div className="font-medium text-white">Contacted</div>
              <div className="text-sm text-gray-400">Mark if this lead has been contacted</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contacted}
                onChange={(e) => setContacted(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
            </label>
          </div>

          {/* Admin Notes */}
          <div>
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-2 block">
              Admin Notes
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={6}
              placeholder="Add internal notes about this lead..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold text-black rounded-lg font-medium hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
