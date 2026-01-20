'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Upload } from 'lucide-react'

const navItems = [
    { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/portal/contracts', label: 'Contratos', icon: FileText },
    { href: '/portal/documents', label: 'Documentos', icon: Upload },
]

export function PortalNav() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/portal') {
            return pathname === '/portal'
        }
        return pathname.startsWith(href)
    }

    return (
        <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            active
                                ? 'bg-accent-gold/10 text-ink font-medium'
                                : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                        }`}
                    >
                        <item.icon className={`w-4 h-4 ${active ? 'text-accent-gold' : ''}`} />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}

export function PortalMobileNav() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/portal') {
            return pathname === '/portal'
        }
        return pathname.startsWith(href)
    }

    return (
        <nav className="md:hidden border-t border-ink/10 px-6 py-2 flex items-center gap-2 overflow-x-auto">
            {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                            active
                                ? 'bg-accent-gold/10 text-ink font-medium'
                                : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                        }`}
                    >
                        <item.icon className={`w-4 h-4 ${active ? 'text-accent-gold' : ''}`} />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}
