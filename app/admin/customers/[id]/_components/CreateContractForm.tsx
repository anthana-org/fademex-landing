'use client'

import { useState } from 'react'
import { createContract } from '@/lib/actions/customers'
import { Plus, X, Loader2 } from 'lucide-react'

export default function CreateContractForm({ customerId }: { customerId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        contractNumber: '',
        startDate: '',
        endDate: '',
        description: '',
        fileUrl: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createContract({
                customer_id: customerId,
                title: formData.title,
                contract_number: formData.contractNumber,
                start_date: formData.startDate || undefined,
                end_date: formData.endDate || undefined,
                description: formData.description,
                file_url: formData.fileUrl // In a real app, we'd upload file here too
            })
            setIsOpen(false)
            setFormData({
                title: '',
                contractNumber: '',
                startDate: '',
                endDate: '',
                description: '',
                fileUrl: ''
            })
        } catch (error) {
            console.error(error)
            alert('Error creando contrato')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-ink rounded-lg font-semibold hover:bg-accent-gold-dark transition-colors text-sm"
            >
                <Plus className="w-4 h-4" />
                Nuevo Contrato
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink">Nuevo Contrato</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-ink">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título del Contrato</label>
                        <input
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ej. Contrato de Mantenimiento Anual"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No. Contrato</label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                                value={formData.contractNumber}
                                onChange={e => setFormData({ ...formData, contractNumber: e.target.value })}
                                placeholder="CTR-2024-001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Archivo (PDF)</label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                                value={formData.fileUrl}
                                onChange={e => setFormData({ ...formData, fileUrl: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-accent-gold text-ink rounded-lg font-bold hover:bg-accent-gold-dark disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Crear Contrato
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
