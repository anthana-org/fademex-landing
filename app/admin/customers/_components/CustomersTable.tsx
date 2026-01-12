'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import type { Customer } from '@/lib/types/customer'

interface CustomersTableProps {
    initialCustomers: Customer[]
}

type StatusFilter = 'All' | 'Active' | 'Pending' | 'Inactive'

export function CustomersTable({ initialCustomers }: CustomersTableProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')

    const filteredCustomers = useMemo(() => {
        let result = initialCustomers

        // Apply status filter
        if (statusFilter !== 'All') {
            result = result.filter((c) => c.status === statusFilter)
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter((c) =>
                c.full_name.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                (c.company_name && c.company_name.toLowerCase().includes(query))
            )
        }

        return result
    }, [initialCustomers, statusFilter, searchQuery])

    const getStatusBadge = (status: Customer['status']) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800'
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusLabel = (status: Customer['status']) => {
        switch (status) {
            case 'Active':
                return 'Activo'
            case 'Pending':
                return 'Pendiente'
            default:
                return 'Inactivo'
        }
    }

    return (
        <div className="glass-panel overflow-hidden">
            {/* Search and Filter Bar */}
            <div className="p-4 border-b border-ink/10 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o empresa..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-ink/10 bg-white/50 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
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
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="px-4 py-2 rounded-lg border border-ink/10 bg-white/50 text-ink focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer"
                >
                    <option value="All">Todos los estados</option>
                    <option value="Active">Activos</option>
                    <option value="Pending">Pendientes</option>
                    <option value="Inactive">Inactivos</option>
                </select>
            </div>

            {/* Results Count */}
            {(searchQuery || statusFilter !== 'All') && (
                <div className="px-4 py-2 bg-ink/5 text-sm text-ink/60">
                    {filteredCustomers.length} de {initialCustomers.length} clientes
                </div>
            )}

            {/* Table */}
            <table className="w-full text-left">
                <thead className="bg-ink/5 border-b border-ink/10">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-ink text-sm">Cliente / Empresa</th>
                        <th className="px-6 py-4 font-semibold text-ink text-sm">Contacto</th>
                        <th className="px-6 py-4 font-semibold text-ink text-sm">Estado</th>
                        <th className="px-6 py-4 font-semibold text-ink text-sm text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                    {filteredCustomers.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-ink/40">
                                {searchQuery || statusFilter !== 'All'
                                    ? 'No se encontraron clientes con los filtros aplicados.'
                                    : 'No hay clientes registrados aún.'}
                            </td>
                        </tr>
                    ) : (
                        filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-ink/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-ink font-bold">
                                            {customer.full_name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-ink">{customer.full_name}</div>
                                            <div className="text-sm text-ink/60">{customer.company_name || '—'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-ink">
                                        <div>{customer.email}</div>
                                        <div className="text-ink/60">{customer.phone || '—'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(customer.status)}`}>
                                        {getStatusLabel(customer.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/customers/${customer.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-ink/10 rounded-lg text-sm font-medium text-ink hover:bg-white hover:border-accent-gold transition-colors"
                                    >
                                        Ver Detalles
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
