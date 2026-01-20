'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { updatePassword } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'

export default function CustomerResetPasswordForm() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isValidSession, setIsValidSession] = useState<boolean | null>(null)

    useEffect(() => {
        // Check if user has a valid session from the reset link
        const checkSession = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            setIsValidSession(!!user)
        }
        checkSession()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        setIsLoading(true)

        try {
            const result = await updatePassword(password)

            if (result.success) {
                setIsSuccess(true)
                // Redirect to portal login after 3 seconds
                setTimeout(() => {
                    router.push('/portal/login')
                }, 3000)
            } else if (result.error) {
                setError(result.error)
            }
        } catch (err) {
            setError('Ocurrió un error inesperado. Por favor intenta de nuevo.')
            console.error('Password update error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    // Loading state while checking session
    if (isValidSession === null) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
            </div>
        )
    }

    // Invalid or expired session
    if (!isValidSession) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-ink mb-2">Enlace Inválido o Expirado</h2>
                    <p className="text-ink-light">
                        Este enlace de recuperación es inválido o ha expirado. Por favor solicita uno nuevo.
                    </p>
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/portal/forgot-password"
                        className="inline-block bg-accent-gold text-ink font-semibold py-3 px-6 rounded-xl hover:bg-accent-gold-dark transition-all shadow-button hover:shadow-button-hover"
                    >
                        Solicitar Nuevo Enlace
                    </Link>
                </div>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-ink mb-2">Contraseña Actualizada</h2>
                    <p className="text-ink-light">
                        Tu contraseña ha sido restablecida exitosamente. Serás redirigido al inicio de sesión en breve.
                    </p>
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/portal/login"
                        className="text-sm text-accent-teal hover:text-ink font-medium transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ir al inicio de sesión ahora
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="text-center mb-6">
                <p className="text-ink-light">
                    Ingresa tu nueva contraseña a continuación.
                </p>
            </div>

            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Lock className="w-3 h-3" />
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

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
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover"
            >
                {isLoading ? 'Actualizando...' : 'Restablecer Contraseña'}
            </button>

            <div className="text-center pt-2">
                <Link
                    href="/portal/login"
                    className="text-sm text-accent-teal hover:text-ink font-medium transition-colors inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio de sesión
                </Link>
            </div>
        </form>
    )
}
