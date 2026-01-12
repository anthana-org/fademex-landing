'use client'

import { useState, useMemo } from 'react'
import type { Lead, LeadStatus } from '@/lib/types/lead'
import { updateLeadStatus, toggleLeadContacted } from '@/lib/actions/leads'
import { format } from 'date-fns'
import { Search, X, Eye, Mail, Phone, Building2, Download } from 'lucide-react'
import { LeadDetailModal } from './LeadDetailModal'

interface LeadsTableProps {
  initialLeads: Lead[]
}

const STATUS_OPTIONS: LeadStatus[] = ['New', 'In Progress', 'Contacted', 'Closed', 'Archived']

const STATUS_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
  'Contacted': 'bg-green-100 text-green-700 border-green-200',
  'Closed': 'bg-gray-100 text-gray-600 border-gray-200',
  'Archived': 'bg-purple-100 text-purple-700 border-purple-200',
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredLeads = useMemo(() => {
    let result = leads

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter((lead) => lead.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((lead) =>
        lead.full_name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.company_name && lead.company_name.toLowerCase().includes(query))
      )
    }

    return result
  }, [leads, statusFilter, searchQuery])

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

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Empresa', 'Estado', 'Contactado', 'Fecha']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${lead.full_name}"`,
        lead.email,
        lead.phone || '',
        `"${lead.company_name || ''}"`,
        lead.status,
        lead.contacted ? 'Sí' : 'No',
        format(new Date(lead.created_at), 'yyyy-MM-dd'),
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  return (
    <>
      {/* Search and Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-ink/10 bg-white/50 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-ink/10 text-ink/40"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'All')}
          className="px-4 py-2.5 rounded-lg border border-ink/10 bg-white/50 text-ink focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer"
        >
          <option value="All">Todos ({leads.length})</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status} ({leads.filter(l => l.status === status).length})
            </option>
          ))}
        </select>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-gold hover:bg-accent-gold-dark text-ink font-medium rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar CSV</span>
        </button>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-ink/60 mb-4">
          {filteredLeads.length} de {leads.length} leads
        </p>
      )}


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="text-left py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Contact
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Company
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Status
              </th>
              <th className="text-center py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Contacted
              </th>
              <th className="text-center py-3 px-4 text-xs font-mono text-ink/70 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-ink/70">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-ink">{lead.full_name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-ink/70">
                        <Mail className="w-3 h-3" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-accent-gold transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-ink/70">
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
                      <div className="flex items-center gap-2 text-sm text-ink/70">
                        <Building2 className="w-3 h-3" />
                        {lead.company_name}
                      </div>
                    ) : (
                      <span className="text-sm text-ink/60">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-ink/70">
                      {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-ink/60">
                      {format(new Date(lead.created_at), 'HH:mm')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as LeadStatus)
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${STATUS_COLORS[lead.status]
                        } bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status} className="bg-white">
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
                      <div className="w-11 h-6 bg-ink/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                    </label>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => openLeadDetail(lead)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink/5 hover:bg-ink/10 border border-ink/10 rounded-lg text-sm text-ink/70 hover:text-ink transition-all"
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
