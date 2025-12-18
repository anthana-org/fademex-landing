import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, Upload, LogOut, User } from 'lucide-react'

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/portal/login')
    }

    // Get customer profile
    const { data: customer } = await supabase
        .from('customers')
        .select('full_name, company_name')
        .eq('user_id', user.id)
        .single()

    // If no customer profile exists, redirect to complete registration
    if (!customer) {
        redirect('/portal/complete-profile')
    }

    const navItems = [
        { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/portal/contracts', label: 'Contratos', icon: FileText },
        { href: '/portal/documents', label: 'Documentos', icon: Upload },
    ]

    return (
        <div className="min-h-screen bg-canvas text-ink relative">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-0 w-[520px] h-[520px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Header */}
            <header className="border-b border-ink/10 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/portal" className="text-xl font-extrabold text-ink">
                            FADEMEX <span className="text-accent-gold">Portal</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-2 text-ink/60 hover:text-ink transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-ink/70">
                            <User className="w-4 h-4" />
                            <span>{customer.full_name}</span>
                            {customer.company_name && (
                                <span className="text-ink/50">• {customer.company_name}</span>
                            )}
                        </div>
                        <form action="/api/auth/signout" method="post">
                            <button
                                type="submit"
                                className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Cerrar Sesión</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden border-t border-ink/10 px-6 py-2 flex items-center gap-4 overflow-x-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors whitespace-nowrap"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
                {children}
            </main>
        </div>
    )
}
