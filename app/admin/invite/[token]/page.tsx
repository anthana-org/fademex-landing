import { getAdminByToken } from '@/lib/actions/admins'
import AcceptInviteForm from './_components/AcceptInviteForm'
import Link from 'next/link'
import { AlertTriangle, Shield } from 'lucide-react'

interface InvitePageProps {
    params: Promise<{
        token: string
    }>
}

export default async function InvitePage({ params }: InvitePageProps) {
    const { token } = await params
    const admin = await getAdminByToken(token)

    // Invalid or expired token
    if (!admin) {
        return (
            <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <div className="glass-panel p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-ink mb-2">
                            Invitación No Válida
                        </h1>
                        <p className="text-ink/60 mb-6">
                            Este enlace de invitación no existe o ha expirado.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-accent-gold text-ink font-semibold px-6 py-3 rounded-xl hover:bg-accent-gold-dark transition-all"
                        >
                            Ir a Inicio de Sesión
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Already used
    if (admin.status !== 'pending') {
        return (
            <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <div className="glass-panel p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-ink mb-2">
                            Invitación Ya Utilizada
                        </h1>
                        <p className="text-ink/60 mb-6">
                            Esta invitación ya fue aceptada o deshabilitada.
                            Si ya tienes una cuenta, inicia sesión.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-accent-gold text-ink font-semibold px-6 py-3 rounded-xl hover:bg-accent-gold-dark transition-all"
                        >
                            Ir a Inicio de Sesión
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-0 w-[520px] h-[520px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-2xl font-extrabold text-ink">
                            FADEMEX <span className="text-accent-gold">Admin</span>
                        </h1>
                    </Link>
                    <h2 className="text-xl font-bold text-ink mb-2">
                        Acepta tu Invitación
                    </h2>
                    <p className="text-ink/60 text-sm">
                        Configura tu contraseña para activar tu cuenta de administrador
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-panel p-8">
                    <AcceptInviteForm admin={admin} />
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-ink/40 mt-6">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-accent-gold hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}
