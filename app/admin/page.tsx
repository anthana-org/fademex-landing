import { getLeadStats, getLeads } from '@/lib/actions/leads'
import { createClient } from '@/lib/supabase/server'
import { StatsCards } from './_components/StatsCards'
import { LeadsTable } from './_components/LeadsTable'
import { QuickActions } from './_components/QuickActions'
import { RecentActivity } from './_components/RecentActivity'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [stats, leads, documentsResult] = await Promise.all([
    getLeadStats(),
    getLeads(),
    supabase
      .from('customer_documents')
      .select('id, file_name, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  const documents = documentsResult.data || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-ink mb-2">Dashboard</h1>
        <p className="text-ink/60">Gestiona leads, clientes y operaciones</p>
      </div>

      {/* Stats Overview */}
      <StatsCards stats={stats} />

      {/* Quick Actions + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions leads={leads} />
        <RecentActivity
          leads={leads.slice(0, 5).map(l => ({
            id: l.id,
            full_name: l.full_name,
            created_at: l.created_at,
            contacted: l.contacted,
          }))}
          documents={documents}
        />
      </div>

      {/* Leads Table */}
      <div className="glass-panel p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ink mb-1">Leads Recientes</h2>
          <p className="text-sm text-ink/60">Gestiona los registros de clientes potenciales</p>
        </div>
        <LeadsTable initialLeads={leads} />
      </div>
    </div>
  )
}

