import { getAllCustomers } from '@/lib/actions/customers'
import Link from 'next/link'
import { Users, UserCheck, Clock, Search } from 'lucide-react'
import { CustomersTable } from './_components/CustomersTable'

export default async function AdminCustomersPage() {
    const customers = await getAllCustomers()

    const activeCount = customers.filter(c => c.status === 'Active').length
    const pendingCount = customers.filter(c => c.status === 'Pending').length
    const inactiveCount = customers.filter(c => c.status === 'Inactive').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Clientes</h1>
                <p className="text-ink/60">Gestión de usuarios del portal de clientes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-ink">{customers.length}</p>
                            <p className="text-sm text-ink/60">Total</p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                            <p className="text-sm text-ink/60">Activos</p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                            <p className="text-sm text-ink/60">Pendientes</p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-500/10">
                            <Users className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-500">{inactiveCount}</p>
                            <p className="text-sm text-ink/60">Inactivos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customers Table with Search */}
            <CustomersTable initialCustomers={customers} />
        </div>
    )
}

