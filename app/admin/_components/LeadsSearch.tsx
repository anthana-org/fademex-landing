'use client'

import { useState } from 'react'
import { Search, X, Calendar } from 'lucide-react'
import type { LeadStatus } from '@/lib/types/lead'

interface LeadsSearchProps {
    onSearch: (query: string) => void
    onFilterStatus: (status: LeadStatus | 'All') => void
    currentStatus: LeadStatus | 'All'
    totalCount: number
    filteredCount: number
}

const STATUS_OPTIONS: Array<LeadStatus | 'All'> = ['All', 'New', 'In Progress', 'Contacted', 'Closed', 'Archived']

export function LeadsSearch({
    onSearch,
    onFilterStatus,
    currentStatus,
    totalCount,
    filteredCount,
}: LeadsSearchProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        onSearch(value)
    }

    const clearSearch = () => {
        setSearchQuery('')
        onSearch('')
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o empresa..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-ink/10 bg-white/50 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-ink/10 text-ink/40 hover:text-ink transition-colors"
                        aria-label="Limpiar búsqueda"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
                <select
                    value={currentStatus}
                    onChange={(e) => onFilterStatus(e.target.value as LeadStatus | 'All')}
                    className="px-4 py-2.5 rounded-lg border border-ink/10 bg-white/50 text-ink focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer"
                >
                    {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                            {status === 'All' ? 'Todos los estados' : status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-sm text-ink/60">
                {filteredCount === totalCount ? (
                    <span>{totalCount} leads</span>
                ) : (
                    <span>{filteredCount} de {totalCount} leads</span>
                )}
            </div>
        </div>
    )
}
