'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCustomerProfile } from '@/lib/actions/customers'
import { Building, Phone, AlertCircle, ArrowRight, User } from 'lucide-react'

export default function CompleteProfilePage() {
    const router = useRouter()
    // We'll collect missing info. Name and email should come from Auth but for simplicity
    // and robustness we'll ask for full profile confirmation here.
    // Ideally we'd pre-fill from Auth user metadata if available.

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        companyName: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            // Create profile for current authenticated user
            // Email is automatically taken from the auth session in the server action
            await createCustomerProfile({
                full_name: formData.fullName,
                email: '', // Server action handles this from session
                phone: formData.phone,
                company_name: formData.companyName
            })

            router.push('/portal')
            router.refresh()
        } catch (err) {
            setError('Error al crear perfil. Inténtalo de nuevo.')
            console.error('Profile creation error:', err)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-canvas text-ink relative overflow-hidden flex items-center justify-center p-6">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="glass-panel p-8 bg-white/80">
                    <h2 className="text-2xl font-bold text-ink mb-2">Completa tu Perfil</h2>
                    <p className="text-ink/60 mb-6 text-sm">
                        Necesitamos algunos datos adicionales para configurar tu cuenta.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Full Name */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                                <User className="w-3 h-3" />
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Juan Pérez"
                                className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                                <Building className="w-3 h-3" />
                                Empresa
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Empresa S.A."
                                className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                                <Phone className="w-3 h-3" />
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+52 55..."
                                className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? 'Guardando...' : 'Completar Registro'} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
