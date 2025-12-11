import { getLeadStats, getLeads } from '@/lib/actions/leads'
import { StatsCards } from './_components/StatsCards'
import { LeadsTable } from './_components/LeadsTable'

export default async function AdminDashboard() {
  const [stats, leads] = await Promise.all([
    getLeadStats(),
    getLeads(),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ink mb-2">Dashboard</h1>
        <p className="text-ink/70">Manage your client leads and registrations</p>
      </div>

      <StatsCards stats={stats} />

      <div className="glass-panel p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ink mb-1">All Leads</h2>
          <p className="text-sm text-ink/70">View and manage client registrations</p>
        </div>
        <LeadsTable initialLeads={leads} />
      </div>
    </div>
  )
}
