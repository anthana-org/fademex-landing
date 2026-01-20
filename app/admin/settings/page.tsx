import { createClient } from '@/lib/supabase/server'
import { getAllAdmins } from '@/lib/actions/admins'
import { Users, Shield, Server } from 'lucide-react'
import AdminSettingsClient from './_components/AdminSettingsClient'

export default async function AdminSettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Get admin users from database
    const admins = await getAllAdmins()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-ink mb-2">Configuración</h1>
                <p className="text-ink/60">Información del sistema y gestión de equipo</p>
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
                            <span className="font-medium text-ink">2.1.0</span>
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

                {/* Admin Team - Client Component for interactivity */}
                <AdminSettingsClient
                    admins={admins}
                    currentUserEmail={user?.email || ''}
                />
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
                        <p className="text-2xl font-bold text-ink">{admins.filter(a => a.status === 'active').length}</p>
                        <p className="text-sm text-ink/60">Admins Activos</p>
                    </div>
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-accent-gold">{admins.filter(a => a.status === 'pending').length}</p>
                        <p className="text-sm text-ink/60">Invitaciones Pendientes</p>
                    </div>
                    <div className="text-center p-4 bg-ink/5 rounded-lg">
                        <p className="text-2xl font-bold text-accent-gold">24/7</p>
                        <p className="text-sm text-ink/60">Monitoreo NOC</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
