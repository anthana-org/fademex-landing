'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createCustomerProfile } from '@/lib/actions/customers'
import { Mail, Lock, User, Building, Phone, AlertCircle, ArrowRight, DollarSign } from 'lucide-react'
import Link from 'next/link'

// Bootstrap admin emails that should not register as customers
const ADMIN_RESERVED_EMAILS = [
    'admin@fademex.com',
    'juanjo@anthana.com',
]

export default function CustomerRegisterForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        monthlyElectricBill: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden')
            setIsLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setIsLoading(false)
            return
        }

        // Block admin emails from registering as customers
        const normalizedEmail = formData.email.toLowerCase()
        if (ADMIN_RESERVED_EMAILS.includes(normalizedEmail)) {
            setError('Este correo está reservado para uso administrativo. Por favor usa la página de inicio de sesión de administrador en /login')
            setIsLoading(false)
            return
        }

        try {
            const supabase = createClient()

            // 1. Sign up the user
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    }
                }
            })

            if (signUpError) {
                setError(signUpError.message)
                setIsLoading(false)
                return
            }

            if (authData.user) {
                // 2. Create customer profile
                // Note: In a real production app, we might want to handle this via database triggers
                // or ensure the auth user is fully created before this step
                try {
                    // We need to wait a moment or handle cases where session isn't immediately available
                    // For now we'll rely on the server action which checks auth

                    // Re-auth might be needed if auto-sign-in is disabled, but by default Supabase signs in

                    await createCustomerProfile({
                        full_name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        company_name: formData.companyName,
                        monthly_electric_bill: formData.monthlyElectricBill
                    })

                    router.push('/portal')
                    router.refresh()
                } catch (profileError) {
                    console.error('Profile creation error:', profileError)
                    // Even if profile creation fails, the user is created.
                    // They will be redirected to complete-profile page by layout check
                    router.push('/portal/complete-profile')
                }
            }
        } catch (err) {
            setError('Ocurrió un error inesperado de registro.')
            console.error('Registration error:', err)
            setIsLoading(false)
        }
    }

    return (
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

            {/* Email */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Mail className="w-3 h-3" />
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@empresa.com"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            {/* Company & Phone Row */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Monthly Electric Bill */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <DollarSign className="w-3 h-3" />
                    Gasto Mensual Promedio (Luz) (MXN)
                </label>
                <div className="relative">
                    <select
                        name="monthlyElectricBill"
                        value={formData.monthlyElectricBill}
                        onChange={handleChange}
                        required
                        className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Selecciona un rango...</option>
                        <option value="$3,000 - $10,000">$3,000 - $10,000</option>
                        <option value="$10,000 - $30,000">$10,000 - $30,000</option>
                        <option value="Más de $30,000">Más de $30,000</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Lock className="w-3 h-3" />
                    Contraseña
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            {/* Confirm Password */}
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
                    <Lock className="w-3 h-3" />
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover flex items-center justify-center gap-2 mt-2"
            >
                {isLoading ? (
                    'Creando cuenta...'
                ) : (
                    <>
                        <span>Registrarse</span>
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>

            {/* Additional Info */}
            <div className="text-center pt-2">
                <p className="text-sm text-ink-light">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/portal/login" className="text-accent-teal hover:text-ink font-medium transition-colors">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </form>
    )
}
