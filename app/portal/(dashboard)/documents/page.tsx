import { getMyDocuments, getCurrentCustomer } from '@/lib/actions/customers'
import DocumentUpload from '../_components/DocumentUpload'
import { FileText, Image as ImageIcon, FileSpreadsheet, Download, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function DocumentsPage() {
    const documents = await getMyDocuments()
    const customer = await getCurrentCustomer()

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image': return ImageIcon
            case 'excel': return FileSpreadsheet
            case 'word': return FileText // Or a specific Word icon if available
            default: return FileText
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-accent-teal/10 text-accent-teal border-accent-teal/20'
            case 'Pending': return 'bg-highlight/10 text-yellow-600 border-highlight/20'
            case 'Rejected': return 'bg-red-500/10 text-red-600 border-red-500/20'
            default: return 'bg-ink/5 text-ink/60 border-ink/10'
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Mis Documentos</h1>
                <p className="text-ink/60">Sube y administra tus documentos importantes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-ink mb-4">Subir Nuevo Documento</h2>
                        <DocumentUpload customerId={customer?.id || ''} />

                        <div className="mt-6 p-4 bg-ink/5 rounded-xl text-sm text-ink/60 space-y-2">
                            <p className="font-semibold text-ink">Formatos permitidos:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>PDF (.pdf)</li>
                                <li>Imágenes (.jpg, .png)</li>
                                <li>Word (.doc, .docx)</li>
                                <li>Excel (.xls, .xlsx)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Documents List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-bold text-ink">Historial de Documentos</h2>

                    {documents.length === 0 ? (
                        <div className="glass-panel p-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 mx-auto mb-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-2">No hay documentos</h3>
                            <p className="text-ink/60 max-w-sm mx-auto">
                                Aún no has subido ningún documento. Utiliza el formulario de la izquierda para comenzar.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {documents.map((doc) => {
                                const Icon = getFileIcon(doc.file_type)
                                return (
                                    <div key={doc.id} className="glass-panel p-4 flex flex-col sm:flex-row sm:items-center gap-4 group">
                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-xl bg-canvas-alt border border-ink/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-ink/60" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-ink truncate" title={doc.file_name}>
                                                    {doc.file_name}
                                                </h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(doc.status)}`}>
                                                    {doc.status === 'Approved' ? 'Aprobado' :
                                                        doc.status === 'Rejected' ? 'Rechazado' : 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-ink/60">
                                                <span>{(doc.file_size_bytes ? doc.file_size_bytes / 1024 / 1024 : 0).toFixed(2)} MB</span>
                                                <span>•</span>
                                                <span>{format(new Date(doc.created_at), 'd MMM, yyyy HH:mm', { locale: es })}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-ink/5 rounded-lg text-ink/60 hover:text-ink transition-colors"
                                                title="Descargar"
                                            >
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
