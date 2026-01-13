import { getCustomerWithDetails } from '@/lib/actions/customers'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building, Calendar, FileText, Upload, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import CreateContractForm from './_components/CreateContractForm'

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
    const { customer, contracts, documents } = await getCustomerWithDetails(params.id)

    if (!customer) {
        return <div>Cliente no encontrado</div>
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/admin/customers"
                    className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Clientes
                </Link>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-ink flex items-center gap-3">
                            {customer.full_name}
                            <span className={`text-base px-2.5 py-0.5 rounded-full font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {customer.status}
                            </span>
                        </h1>
                        <p className="text-ink/60 mt-1">ID: {customer.id}</p>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 text-ink/60 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Email</span>
                    </div>
                    <p className="font-medium text-ink truncate" title={customer.email}>{customer.email}</p>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 text-ink/60 mb-2">
                        <Building className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Empresa</span>
                    </div>
                    <p className="font-medium text-ink">{customer.company_name || 'No registrada'}</p>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 text-ink/60 mb-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Teléfono</span>
                    </div>
                    <p className="font-medium text-ink">{customer.phone || 'No registrado'}</p>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 text-ink/60 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Inversión</span>
                    </div>
                    <p className="font-medium text-ink">{customer.investment_range || 'No especificado'}</p>
                </div>
            </div>

            {/* Contracts Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Contratos ({contracts.length})
                    </h2>
                    <CreateContractForm customerId={customer.id} />
                </div>

                <div className="glass-panel overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-ink/5 border-b border-ink/10">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Título</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Estado</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Fechas</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm text-right">Archivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                            {contracts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-ink/40">
                                        No hay contratos registrados.
                                    </td>
                                </tr>
                            ) : (
                                contracts.map(contract => (
                                    <tr key={contract.id} className="hover:bg-ink/5">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-ink">{contract.title}</div>
                                            <div className="text-xs text-ink/40">{contract.contract_number}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`
                        inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold
                        ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-ink/60">
                                            {contract.start_date ? format(new Date(contract.start_date), 'dd/MM/yy') : '-'}
                                            {' '}-{' '}
                                            {contract.end_date ? format(new Date(contract.end_date), 'dd/MM/yy') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {contract.file_url ? (
                                                <a href={contract.file_url} target="_blank" className="text-accent-teal hover:underline text-sm font-medium">
                                                    Ver PDF
                                                </a>
                                            ) : (
                                                <span className="text-ink/30 text-xs">Sin archivo</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Documents Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Documentos Subidos ({documents.length})
                </h2>

                <div className="glass-panel overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-ink/5 border-b border-ink/10">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Nombre del Archivo</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Tipo</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm">Fecha Subida</th>
                                <th className="px-6 py-3 font-semibold text-ink text-sm text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                            {documents.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-ink/40">
                                        El cliente no ha subido documentos.
                                    </td>
                                </tr>
                            ) : (
                                documents.map(doc => (
                                    <tr key={doc.id} className="hover:bg-ink/5">
                                        <td className="px-6 py-4 font-medium text-ink">{doc.file_name}</td>
                                        <td className="px-6 py-4 text-sm text-ink/60 uppercase">{doc.file_type}</td>
                                        <td className="px-6 py-4 text-sm text-ink/60">
                                            {format(new Date(doc.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={doc.file_url} target="_blank" className="text-accent-teal hover:underline text-sm font-medium">
                                                Descargar
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
