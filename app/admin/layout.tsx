import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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

  return (
    <div className="min-h-screen bg-canvas text-ink relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-[520px] h-[520px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Admin Header */}
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-extrabold text-ink">
              FADEMEX <span className="text-accent-gold">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin"
                className="text-ink/60 hover:text-ink transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/customers"
                className="text-ink/60 hover:text-ink transition-colors"
              >
                Clientes
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-ink/70 hidden sm:block">{user.email}</span>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-ink/70 hover:text-ink transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {children}
      </main>
    </div>
  )
}
