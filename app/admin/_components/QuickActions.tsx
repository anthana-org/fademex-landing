'use client'

import Link from 'next/link'
import {
    UserPlus,
    FileSearch,
    Download,
    Users,
    ArrowRight
} from 'lucide-react'

const actions = [
    {
        label: 'Ver Leads Pendientes',
        description: 'Leads sin contactar',
        href: '/admin',
        icon: UserPlus,
        color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
    },
    {
        label: 'Revisar Documentos',
        description: 'Documentos por aprobar',
        href: '/admin/documents',
        icon: FileSearch,
        color: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
    },
    {
        label: 'Ver Clientes',
        description: 'Lista de clientes activos',
        href: '/admin/customers',
        icon: Users,
        color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
    },
    {
        label: 'Exportar Leads',
        description: 'Descargar en CSV',
        href: '#',
        icon: Download,
        color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
        onClick: 'export' as const,
    },
]

interface QuickActionsProps {
    onExport?: () => void
}

export function QuickActions({ onExport }: QuickActionsProps) {
    return (
        <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-ink mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon

                    if (action.onClick === 'export') {
                        return (
                            <button
                                key={action.label}
                                onClick={onExport}
                                className={`
                  flex items-center gap-3 p-4 rounded-xl transition-all
                  ${action.color} text-left group
                `}
                            >
                                <div className="p-2 rounded-lg bg-white/50">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-ink">{action.label}</p>
                                    <p className="text-xs text-ink/60">{action.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </button>
                        )
                    }

                    return (
                        <Link
                            key={action.label}
                            href={action.href}
                            className={`
                flex items-center gap-3 p-4 rounded-xl transition-all
                ${action.color} group
              `}
                        >
                            <div className="p-2 rounded-lg bg-white/50">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-ink">{action.label}</p>
                                <p className="text-xs text-ink/60">{action.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
