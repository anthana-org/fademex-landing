'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { acceptInvite } from '@/lib/actions/admins'
import { createClient } from '@/lib/supabase/client'
import { Lock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import type { AdminUser } from '@/lib/types/admin'

interface AcceptInviteFormProps {
    admin: AdminUser
}

export default function AcceptInviteForm({ admin }: AcceptInviteFormProps) {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Validation
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setIsLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            setIsLoading(false)
            return
        }

        try {
            const result = await acceptInvite(admin.id, password)

            if (!result.success) {
                setError(result.error || 'Error al aceptar la invitación')
                setIsLoading(false)
                return
            }

            setSuccess(true)

            // Sign in the user
            const supabase = createClient()
            await supabase.auth.signInWithPassword({
                email: admin.email,
                password: password
            })

            // Redirect to admin panel after a brief delay
            setTimeout(() => {
                router.push('/admin')
                router.refresh()
            }, 2000)
        } catch (err) {
            setError('Ocurrió un error inesperado')
            console.error('Accept invite error:', err)
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-ink mb-2">
                    ¡Cuenta Activada!
                </h2>
                <p className="text-ink/60 mb-4">
                    Tu cuenta de administrador ha sido creada exitosamente.
                </p>
                <p className="text-sm text-ink/40">
                    Redirigiendo al panel de administración...
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Info */}
            <div className="bg-ink/5 rounded-xl p-4">
                <p className="text-sm text-ink/70">
                    Estás configurando la cuenta para: <strong className="text-ink">{admin.email}</strong>
                </p>
                {admin.full_name && (
                    <p className="text-sm text-ink/70 mt-1">
                        Nombre: <strong className="text-ink">{admin.full_name}</strong>
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Lock className="w-3 h-3" />
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            {/* Confirm Password Field */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Lock className="w-3 h-3" />
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repite tu contraseña"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    'Activando cuenta...'
                ) : (
                    <>
                        Activar Cuenta
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    )
}
