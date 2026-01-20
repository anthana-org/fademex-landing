import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from './_components/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get pending counts for sidebar badges
  const [leadsResult, docsResult] = await Promise.all([
    supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('contacted', false),
    supabase
      .from('customer_documents')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'Pending')
  ])

  const pendingLeads = leadsResult.count || 0
  const pendingDocuments = docsResult.count || 0

  return (
    <div className="min-h-screen bg-canvas text-ink relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-[520px] h-[520px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Layout with Sidebar */}
      <div className="flex min-h-screen">
        <AdminSidebar
          userEmail={user.email || ''}
          pendingLeads={pendingLeads}
          pendingDocuments={pendingDocuments}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

