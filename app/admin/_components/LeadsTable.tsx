'use client'

import { useState, useMemo } from 'react'
import type { Lead, LeadStatus } from '@/lib/types/lead'
import { updateLeadStatus, toggleLeadContacted } from '@/lib/actions/leads'
import { format } from 'date-fns'
import { Filter, Eye, Mail, Phone, Building2 } from 'lucide-react'
import { LeadDetailModal } from './LeadDetailModal'

interface LeadsTableProps {
  initialLeads: Lead[]
}

const STATUS_OPTIONS: LeadStatus[] = ['New', 'In Progress', 'Contacted', 'Closed', 'Archived']

const STATUS_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'Contacted': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Closed': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  'Archived': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredLeads = useMemo(() => {
    if (statusFilter === 'All') return leads
    return leads.filter((lead) => lead.status === statusFilter)
  }, [leads, statusFilter])

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus)
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      )
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleContactedToggle = async (leadId: string, contacted: boolean) => {
    try {
      await toggleLeadContacted(leadId, contacted)
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, contacted } : lead
        )
      )
    } catch (error) {
      console.error('Failed to toggle contacted:', error)
    }
  }

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    )
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Filter by status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === 'All'
                ? 'bg-accent-gold text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            All ({leads.length})
          </button>
          {STATUS_OPTIONS.map((status) => {
            const count = leads.filter((lead) => lead.status === status).length
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-accent-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {status} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Contact
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Company
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Status
              </th>
              <th className="text-center py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Contacted
              </th>
              <th className="text-center py-3 px-4 text-xs font-mono text-gray-400 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{lead.full_name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="w-3 h-3" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-accent-gold transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone className="w-3 h-3" />
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-accent-gold transition-colors"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {lead.company_name ? (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Building2 className="w-3 h-3" />
                        {lead.company_name}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-400">
                      {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(lead.created_at), 'HH:mm')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as LeadStatus)
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                        STATUS_COLORS[lead.status]
                      } bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status} className="bg-[#050505]">
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lead.contacted}
                        onChange={(e) =>
                          handleContactedToggle(lead.id, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                    </label>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => openLeadDetail(lead)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleLeadUpdate}
        />
      )}
    </>
  )
}
