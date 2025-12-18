import { getMyContracts } from '@/lib/actions/customers'
import { FileText, Download, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function ContractsPage() {
    const contracts = await getMyContracts()

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-accent-teal/10 text-accent-teal border-accent-teal/20'
            case 'Pending': return 'bg-highlight/10 text-yellow-600 border-highlight/20'
            case 'Completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            case 'Cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20'
            default: return 'bg-ink/5 text-ink/60 border-ink/10'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return CheckCircle
            case 'Pending': return Clock
            case 'Completed': return CheckCircle
            case 'Cancelled': return XCircle
            default: return FileText
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Mis Contratos</h1>
                <p className="text-ink/60">Gestiona y consulta tus contratos activos e históricos.</p>
            </div>

            {contracts.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 mx-auto mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-2">No hay contratos disponibles</h3>
                    <p className="text-ink/60 max-w-md mx-auto">
                        Aún no tienes contratos registrados en la plataforma. Si crees que esto es un error, por favor contacta a soporte.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contracts.map((contract) => {
                        const StatusIcon = getStatusIcon(contract.status)
                        return (
                            <div key={contract.id} className="glass-panel p-6 flex flex-col h-full hover:border-accent-gold/50 transition-colors group">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getStatusColor(contract.status)}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {contract.status === 'Active' ? 'Activo' :
                                            contract.status === 'Pending' ? 'Pendiente' :
                                                contract.status === 'Completed' ? 'Completado' : 'Cancelado'}
                                    </div>
                                    {contract.contract_number && (
                                        <span className="text-xs font-mono text-ink/40">#{contract.contract_number}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-ink mb-2 line-clamp-2" title={contract.title}>
                                        {contract.title}
                                    </h3>
                                    {contract.description && (
                                        <p className="text-sm text-ink/60 line-clamp-3 mb-4">
                                            {contract.description}
                                        </p>
                                    )}

                                    <div className="space-y-2 mt-4">
                                        {contract.start_date && (
                                            <div className="flex items-center gap-2 text-xs text-ink/60">
                                                <Calendar className="w-3 h-3" />
                                                <span>Inicio: {format(new Date(contract.start_date), 'd MMM, yyyy', { locale: es })}</span>
                                            </div>
                                        )}
                                        {contract.end_date && (
                                            <div className="flex items-center gap-2 text-xs text-ink/60">
                                                <Calendar className="w-3 h-3" />
                                                <span>Fin: {format(new Date(contract.end_date), 'd MMM, yyyy', { locale: es })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 pt-6 border-t border-ink/5">
                                    {contract.file_url ? (
                                        <a
                                            href={contract.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-ink-light transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Descargar PDF
                                        </a>
                                    ) : (
                                        <button disabled className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-ink/5 text-ink/40 text-sm font-semibold cursor-not-allowed">
                                            <FileText className="w-4 h-4" />
                                            Documento no disponible
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
