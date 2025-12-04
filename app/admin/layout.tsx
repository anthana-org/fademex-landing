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
    <div className="min-h-screen bg-[#050505]">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-white">
              FADEMEX <span className="text-accent-gold">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
