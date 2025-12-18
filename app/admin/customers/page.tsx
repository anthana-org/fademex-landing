import { getAllCustomers } from '@/lib/actions/customers'
import Link from 'next/link'
import { Users, FileText, Upload, MoreHorizontal, Plus } from 'lucide-react'

export default async function AdminCustomersPage() {
    const customers = await getAllCustomers()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-ink">Clientes</h1>
                    <p className="text-ink/60 mt-1">Gestión de usuarios del portal</p>
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
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
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-ink/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-ink font-bold">
                                            {customer.full_name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-ink">{customer.full_name}</div>
                                            <div className="text-sm text-ink/60">{customer.company_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-ink">
                                        <div>{customer.email}</div>
                                        <div className="text-ink/60">{customer.phone}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}
                  `}>
                                        {customer.status === 'Active' ? 'Activo' :
                                            customer.status === 'Pending' ? 'Pendiente' : 'Inactivo'}
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
                        ))}

                        {customers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-ink/40">
                                    No hay clientes registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
