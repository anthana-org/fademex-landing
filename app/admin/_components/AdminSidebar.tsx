'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    FileText,
    Menu,
    X
} from 'lucide-react'

interface AdminSidebarProps {
    userEmail: string
    pendingLeads?: number
    pendingDocuments?: number
}

const navItems = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        label: 'Leads',
        href: '/admin',
        icon: UserPlus,
        badge: 'pendingLeads' as const,
    },
    {
        label: 'Clientes',
        href: '/admin/customers',
        icon: Users,
    },
    {
        label: 'Documentos',
        href: '/admin/documents',
        icon: FileText,
        badge: 'pendingDocuments' as const,
    },
    {
        label: 'Configuración',
        href: '/admin/settings',
        icon: Settings,
    },
]

export function AdminSidebar({ userEmail, pendingLeads = 0, pendingDocuments = 0 }: AdminSidebarProps) {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    const badges = {
        pendingLeads,
        pendingDocuments,
    }

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin'
        }
        return pathname.startsWith(href)
    }

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-4 py-6 border-b border-ink/10`}>
                {!collapsed && (
                    <Link href="/" className="text-xl font-extrabold text-ink">
                        FADEMEX <span className="text-accent-gold">Admin</span>
                    </Link>
                )}
                {collapsed && (
                    <Link href="/" className="text-xl font-extrabold text-accent-gold">
                        F
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-1.5 rounded-lg hover:bg-ink/5 text-ink/50 hover:text-ink transition-colors"
                    aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    const badgeValue = item.badge ? badges[item.badge] : 0

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${active
                                    ? 'bg-accent-gold/10 text-ink font-medium'
                                    : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
                                }
                ${collapsed ? 'justify-center' : ''}
              `}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-accent-gold' : ''}`} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.label}</span>
                                    {badgeValue > 0 && (
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-accent-gold text-ink rounded-full">
                                            {badgeValue}
                                        </span>
                                    )}
                                </>
                            )}
                            {collapsed && badgeValue > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-gold rounded-full" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User Section */}
            <div className={`border-t border-ink/10 p-4 ${collapsed ? 'text-center' : ''}`}>
                {!collapsed && (
                    <div className="mb-3">
                        <p className="text-xs text-ink/50 uppercase tracking-wider">Sesión activa</p>
                        <p className="text-sm text-ink/80 truncate" title={userEmail}>
                            {userEmail}
                        </p>
                    </div>
                )}
                <form action="/api/auth/signout" method="post">
                    <button
                        type="submit"
                        className={`
              flex items-center gap-2 text-sm text-ink/60 hover:text-red-600 transition-colors
              ${collapsed ? 'justify-center w-full' : ''}
            `}
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && <span>Cerrar Sesión</span>}
                    </button>
                </form>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-ink/10"
                aria-label="Abrir menú"
            >
                <Menu className="w-5 h-5 text-ink" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-ink/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`
          lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl
          transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-ink/5 text-ink/50 hover:text-ink"
                    aria-label="Cerrar menú"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col h-full">
                    <SidebarContent />
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={`
          hidden lg:flex flex-col fixed inset-y-0 left-0 z-40
          bg-white/80 backdrop-blur-xl border-r border-ink/10
          transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'}
        `}
            >
                <SidebarContent />
            </aside>

            {/* Spacer for main content */}
            <div className={`hidden lg:block transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`} />
        </>
    )
}
