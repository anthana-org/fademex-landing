import { getCustomerStats, getCurrentCustomer } from '@/lib/actions/customers'
import { Card } from '@/components/ui/card' // Assuming we have or will make a Card component, or I'll standard divs
import { FileText, Upload, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default async function PortalDashboard() {
    const customer = await getCurrentCustomer()
    const stats = await getCustomerStats()

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-ink">
                        Hola, {customer?.full_name?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-ink/60 mt-1">
                        Bienvenido a tu portal de clientes FADEMEX
                    </p>
                </div>
                <Link
                    href="/portal/documents"
                    className="inline-flex items-center gap-2 bg-accent-gold text-ink font-semibold px-6 py-3 rounded-xl hover:bg-accent-gold-dark transition-colors shadow-button hover:shadow-button-hover"
                >
                    <Upload className="w-4 h-4" />
                    Subir Documento
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-ink/60 uppercase tracking-wide">Contratos Activos</span>
                    </div>
                    <p className="text-3xl font-bold text-ink">{stats?.active_contracts || 0}</p>
                </div>

                <div className="glass-panel p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center text-ink">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-ink/60 uppercase tracking-wide">Docs Pendientes</span>
                    </div>
                    <p className="text-3xl font-bold text-ink">{stats?.pending_documents || 0}</p>
                </div>

                <div className="glass-panel p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-ink">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-ink/60 uppercase tracking-wide">Total Projectos</span>
                    </div>
                    <p className="text-3xl font-bold text-ink">{stats?.total_contracts || 0}</p>
                </div>

                <div className="glass-panel p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-ink">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-ink/60 uppercase tracking-wide">Total Documentos</span>
                    </div>
                    <p className="text-3xl font-bold text-ink">{stats?.total_documents || 0}</p>
                </div>
            </div>

            {/* Recent Activity / Quick Actions Section could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Links */}
                <div className="glass-panel p-8">
                    <h2 className="text-xl font-bold text-ink mb-6">Accesos Rápidos</h2>
                    <div className="space-y-4">
                        <Link href="/portal/contracts" className="block p-4 rounded-xl border border-ink/10 hover:border-accent-gold/50 hover:bg-canvas transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-canvas-alt flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5 text-accent-teal" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-ink">Mis Contratos</p>
                                        <p className="text-sm text-ink/60">Ver y descargar contratos activos</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center group-hover:bg-accent-gold group-hover:text-ink transition-colors">
                                    →
                                </div>
                            </div>
                        </Link>

                        <Link href="/portal/documents" className="block p-4 rounded-xl border border-ink/10 hover:border-accent-gold/50 hover:bg-canvas transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-canvas-alt flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5 text-highlight" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-ink">Mis Documentos</p>
                                        <p className="text-sm text-ink/60">Subir y administrar archivos</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center group-hover:bg-accent-gold group-hover:text-ink transition-colors">
                                    →
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Support Card */}
                <div className="glass-panel p-8 bg-gradient-to-br from-white/80 to-accent-gold/10">
                    <h2 className="text-xl font-bold text-ink mb-4">¿Necesitas Ayuda?</h2>
                    <p className="text-ink/70 mb-6">
                        Si tienes dudas sobre tus contratos o necesitas asistencia con la plataforma, no dudes en contactar a nuestro equipo de soporte.
                    </p>
                    <a
                        href="mailto:contacto@fademex.com"
                        className="inline-block px-6 py-3 bg-white border border-ink/10 rounded-xl text-ink font-semibold hover:border-accent-gold transition-colors"
                    >
                        Contactar Soporte
                    </a>
                </div>
            </div>
        </div>
    )
}
