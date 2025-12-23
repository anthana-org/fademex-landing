'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createDocument } from '@/lib/actions/customers'
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DocumentUpload({ customerId }: { customerId: string }) {
    const router = useRouter()
    const [isDragOver, setIsDragOver] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0])
        }
    }

    const validateAndSetFile = (file: File) => {
        setError('')
        const validTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]

        if (!validTypes.includes(file.type)) {
            setError('Formato no válido. Solo PDF, Imágenes, Word y Excel.')
            return
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError('El archivo es demasiado grande (Máx. 10MB).')
            return
        }

        setFile(file)
    }

    const getFileType = (mimeType: string): 'pdf' | 'image' | 'word' | 'excel' => {
        if (mimeType.includes('pdf')) return 'pdf'
        if (mimeType.includes('image')) return 'image'
        if (mimeType.includes('word') || mimeType.includes('document')) return 'word'
        if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'excel'
        return 'pdf' // fallback
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        setError('')

        try {
            const supabase = createClient()
            const ext = file.name.split('.').pop()
            const fileName = `${customerId}/${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`

            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('customer-documents')
                .upload(fileName, file)

            if (uploadError) {
                throw new Error('Error al subir el archivo: ' + uploadError.message)
            }

            // 2. We don't need the public URL anymore as we'll use signed URLs generated on the server
            // Just access the file path we already have: fileName

            // 3. Create Database Record
            await createDocument({
                customer_id: customerId,
                file_name: file.name,
                file_type: getFileType(file.type),
                file_size_bytes: file.size,
                file_url: fileName, // Store path for signed URL generation
                category: 'General'
            })

            setFile(null)
            router.refresh()
        } catch (err: any) {
            console.error('Upload Error:', err)
            setError(err.message || 'Error al subir el documento')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="w-full">
            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragOver
                            ? 'border-accent-gold bg-accent-gold/5'
                            : 'border-ink/10 hover:border-accent-gold/50 hover:bg-canvas'
                        }
          `}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                    />
                    <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-4 text-ink/60">
                        <Upload className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-ink mb-1">Haz clic o arrastra un archivo aquí</p>
                    <p className="text-sm text-ink/40">PDF, Imágenes, Word o Excel (Máx. 10MB)</p>
                    {error && <p className="text-sm text-red-500 mt-4 font-medium">{error}</p>}
                </div>
            ) : (
                <div className="bg-canvas border border-ink/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-white border border-ink/10 flex items-center justify-center shrink-0">
                                {file.type.includes('image') ? <ImageIcon className="w-5 h-5 text-purple-500" /> : <FileText className="w-5 h-5 text-blue-500" />}
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-ink truncate">{file.name}</p>
                                <p className="text-xs text-ink/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-1 hover:bg-ink/5 rounded-full text-ink/40 hover:text-ink transition-colors"
                            disabled={isUploading}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-accent-gold text-ink font-semibold py-2.5 rounded-lg hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Subir Archivo
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
