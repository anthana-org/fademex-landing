'use client'

import { useState } from 'react'
import { inviteAdmin } from '@/lib/actions/admins'
import { X, Mail, User, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface InviteAdminModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function InviteAdminModal({ isOpen, onClose, onSuccess }: InviteAdminModalProps) {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await inviteAdmin({
                email: email.trim(),
                full_name: fullName.trim() || undefined
            })

            if (!result.success) {
                setError(result.error || 'Error al enviar la invitación')
                setIsLoading(false)
                return
            }

            setSuccess(true)
            setTimeout(() => {
                onSuccess()
                handleClose()
            }, 2000)
        } catch (err) {
            setError('Ocurrió un error inesperado')
            console.error('Invite admin error:', err)
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setEmail('')
        setFullName('')
        setError('')
        setSuccess(false)
        setIsLoading(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-canvas-alt border border-ink/10 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-ink/10">
                    <h2 className="text-xl font-bold text-ink">
                        Invitar Administrador
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-ink/5 text-ink/50 hover:text-ink transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {success ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-ink mb-2">
                                Invitación Enviada
                            </h3>
                            <p className="text-ink/60 text-sm">
                                Se ha enviado un correo de invitación a {email}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                                    <Mail className="w-3 h-3" />
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="nuevo.admin@empresa.com"
                                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Full Name Field */}
                            <div>
                                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                                    <User className="w-3 h-3" />
                                    Nombre Completo (opcional)
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Juan Pérez"
                                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Info */}
                            <p className="text-xs text-ink/50 bg-ink/5 p-3 rounded-lg">
                                Se enviará un correo con un enlace para que el nuevo administrador configure su contraseña y active su cuenta.
                            </p>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-3 border border-ink/10 rounded-xl text-ink font-medium hover:bg-ink/5 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-accent-gold text-ink font-semibold py-3 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Invitación'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
