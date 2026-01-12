import { createClient } from '@/lib/supabase/server'
import { Users, Shield, Server, Mail } from 'lucide-react'

export default async function AdminSettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // For now, we show static admin emails since they're defined in RLS policies
    const adminEmails = [
        'admin@fademex.com',
        'juanjo@anthana.com',
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Configuración</h1>
                <p className="text-ink/60">Información del sistema y equipo</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Info */}
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-accent-gold/10">
                            <Server className="w-5 h-5 text-accent-gold" />
                        </div>
                        <h2 className="text-xl font-bold text-ink">Información del Sistema</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-ink/10">
                            <span className="text-ink/60">Plataforma</span>
                            <span className="font-medium text-ink">FADEMEX Admin Panel</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-ink/10">
                            <span className="text-ink/60">Versión</span>
                            <span className="font-medium text-ink">2.0.0</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-ink/10">
                            <span className="text-ink/60">Backend</span>
                            <span className="font-medium text-ink">Supabase</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-ink/60">Sesión actual</span>
                            <span className="font-medium text-ink text-sm truncate max-w-[200px]" title={user?.email}>
                                {user?.email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Admin Team */}
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-ink">Equipo Administrador</h2>
                    </div>

                    <p className="text-sm text-ink/60 mb-4">
                        Usuarios con acceso completo al panel de administración.
                    </p>

                    <div className="space-y-3">
                        {adminEmails.map((email, index) => (
                            <div
                                key={email}
                                className="flex items-center gap-3 p-3 rounded-lg bg-ink/5"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-ink font-bold text-sm">
                                    {email.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-ink text-sm truncate">{email}</p>
                                    <p className="text-xs text-ink/50">
                                        {email === user?.email ? 'Sesión actual' : 'Administrador'}
                                    </p>
                                </div>
                                {email === user?.email && (
                                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                        Activo
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                            <strong>Nota:</strong> Para agregar nuevos administradores, es necesario actualizar
                            las políticas de seguridad (RLS) en Supabase.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-panel p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-500/10">
                        <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-ink">Resumen de Uso</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-ink">~10</p>
                        <p className="text-sm text-ink/60">Empleados</p>
                    </div>
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-ink">{adminEmails.length}</p>
                        <p className="text-sm text-ink/60">Administradores</p>
                    </div>
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-accent-gold">∞</p>
                        <p className="text-sm text-ink/60">Leads</p>
                    </div>
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-accent-gold">∞</p>
                        <p className="text-sm text-ink/60">Clientes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
