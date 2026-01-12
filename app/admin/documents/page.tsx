import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import { FileText, Image, FileSpreadsheet, File, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react'

export default async function AdminDocumentsPage() {
    const supabase = await createClient()

    // Get all documents with customer info
    const { data: documents, error } = await supabase
        .from('customer_documents')
        .select(`
      *,
      customers:customer_id (
        id,
        full_name,
        company_name
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching documents:', error)
    }

    const docs = documents || []

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText className="w-5 h-5 text-red-500" />
            case 'image':
                return <Image className="w-5 h-5 text-blue-500" />
            case 'excel':
                return <FileSpreadsheet className="w-5 h-5 text-green-500" />
            default:
                return <File className="w-5 h-5 text-ink/50" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <Clock className="w-3 h-3" />
                        Pendiente
                    </span>
                )
            case 'Approved':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Aprobado
                    </span>
                )
            case 'Rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3" />
                        Rechazado
                    </span>
                )
            case 'Reviewed':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <CheckCircle className="w-3 h-3" />
                        Revisado
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {status}
                    </span>
                )
        }
    }

    const pendingCount = docs.filter(d => d.status === 'Pending').length
    const approvedCount = docs.filter(d => d.status === 'Approved').length
    const rejectedCount = docs.filter(d => d.status === 'Rejected').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Documentos</h1>
                <p className="text-ink/60">Documentos subidos por clientes para revisión</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 text-center">
                    <p className="text-2xl font-bold text-ink">{docs.length}</p>
                    <p className="text-sm text-ink/60">Total</p>
                </div>
                <div className="glass-panel p-4 text-center border-2 border-amber-200">
                    <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                    <p className="text-sm text-ink/60">Pendientes</p>
                </div>
                <div className="glass-panel p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                    <p className="text-sm text-ink/60">Aprobados</p>
                </div>
                <div className="glass-panel p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                    <p className="text-sm text-ink/60">Rechazados</p>
                </div>
            </div>

            {/* Documents Table */}
            <div className="glass-panel overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-ink/5 border-b border-ink/10">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-ink text-sm">Documento</th>
                            <th className="px-6 py-4 font-semibold text-ink text-sm">Cliente</th>
                            <th className="px-6 py-4 font-semibold text-ink text-sm">Fecha</th>
                            <th className="px-6 py-4 font-semibold text-ink text-sm">Estado</th>
                            <th className="px-6 py-4 font-semibold text-ink text-sm text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                        {docs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-ink/40">
                                    No hay documentos subidos aún.
                                </td>
                            </tr>
                        ) : (
                            docs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-ink/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(doc.file_type)}
                                            <div>
                                                <p className="font-medium text-ink truncate max-w-[200px]" title={doc.file_name}>
                                                    {doc.file_name}
                                                </p>
                                                <p className="text-xs text-ink/50 uppercase">{doc.file_type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.customers ? (
                                            <Link
                                                href={`/admin/customers/${doc.customers.id}`}
                                                className="text-sm text-ink hover:text-accent-gold transition-colors"
                                            >
                                                <p className="font-medium">{doc.customers.full_name}</p>
                                                <p className="text-ink/50 text-xs">{doc.customers.company_name}</p>
                                            </Link>
                                        ) : (
                                            <span className="text-ink/40">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-ink/60">
                                        {format(new Date(doc.created_at), 'dd MMM yyyy', { locale: es })}
                                        <br />
                                        <span className="text-xs text-ink/40">
                                            {format(new Date(doc.created_at), 'HH:mm')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(doc.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href={doc.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-accent-gold hover:text-accent-gold-dark transition-colors"
                                        >
                                            Ver <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
