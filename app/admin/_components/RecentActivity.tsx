import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    UserPlus,
    Upload,
    FileCheck,
    UserCheck,
    Clock
} from 'lucide-react'

interface ActivityItem {
    id: string
    type: 'new_lead' | 'new_customer' | 'document_uploaded' | 'lead_contacted'
    title: string
    description: string
    timestamp: string
}

interface RecentActivityProps {
    leads: Array<{
        id: string
        full_name: string
        created_at: string
        contacted: boolean
    }>
    documents: Array<{
        id: string
        file_name: string
        created_at: string
        status: string
    }>
}

export function RecentActivity({ leads, documents }: RecentActivityProps) {
    // Combine and sort activities by timestamp
    const activities: ActivityItem[] = [
        ...leads.slice(0, 5).map((lead) => ({
            id: `lead-${lead.id}`,
            type: lead.contacted ? 'lead_contacted' as const : 'new_lead' as const,
            title: lead.full_name,
            description: lead.contacted ? 'Lead contactado' : 'Nuevo lead registrado',
            timestamp: lead.created_at,
        })),
        ...documents.slice(0, 3).map((doc) => ({
            id: `doc-${doc.id}`,
            type: 'document_uploaded' as const,
            title: doc.file_name,
            description: doc.status === 'Pending' ? 'Documento pendiente de revisión' : `Estado: ${doc.status}`,
            timestamp: doc.created_at,
        })),
    ]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 8)

    const getIcon = (type: ActivityItem['type']) => {
        switch (type) {
            case 'new_lead':
                return <UserPlus className="w-4 h-4 text-blue-500" />
            case 'new_customer':
                return <UserCheck className="w-4 h-4 text-green-500" />
            case 'document_uploaded':
                return <Upload className="w-4 h-4 text-amber-500" />
            case 'lead_contacted':
                return <FileCheck className="w-4 h-4 text-purple-500" />
            default:
                return <Clock className="w-4 h-4 text-ink/50" />
        }
    }

    const getIconBg = (type: ActivityItem['type']) => {
        switch (type) {
            case 'new_lead':
                return 'bg-blue-500/10'
            case 'new_customer':
                return 'bg-green-500/10'
            case 'document_uploaded':
                return 'bg-amber-500/10'
            case 'lead_contacted':
                return 'bg-purple-500/10'
            default:
                return 'bg-ink/5'
        }
    }

    return (
        <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-ink mb-4">Actividad Reciente</h2>

            {activities.length === 0 ? (
                <div className="text-center py-8 text-ink/50">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No hay actividad reciente</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-ink/5 transition-colors"
                        >
                            <div className={`p-2 rounded-lg ${getIconBg(activity.type)}`}>
                                {getIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-ink text-sm truncate">
                                    {activity.title}
                                </p>
                                <p className="text-xs text-ink/60">
                                    {activity.description}
                                </p>
                            </div>
                            <span className="text-xs text-ink/40 whitespace-nowrap">
                                {formatDistanceToNow(new Date(activity.timestamp), {
                                    addSuffix: true,
                                    locale: es,
                                })}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
