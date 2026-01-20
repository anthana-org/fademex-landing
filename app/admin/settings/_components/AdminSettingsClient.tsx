'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, UserPlus } from 'lucide-react'
import AdminUsersList from './AdminUsersList'
import InviteAdminModal from './InviteAdminModal'
import type { AdminUser } from '@/lib/types/admin'

interface AdminSettingsClientProps {
    admins: AdminUser[]
    currentUserEmail: string
}

export default function AdminSettingsClient({ admins, currentUserEmail }: AdminSettingsClientProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleInviteSuccess = () => {
        router.refresh()
    }

    return (
        <>
            <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-ink">Equipo Administrador</h2>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-ink font-medium rounded-lg hover:bg-accent-gold-dark transition-colors text-sm"
                    >
                        <UserPlus className="w-4 h-4" />
                        Invitar
                    </button>
                </div>

                <p className="text-sm text-ink/60 mb-4">
                    Usuarios con acceso completo al panel de administración.
                </p>

                <AdminUsersList
                    admins={admins}
                    currentUserEmail={currentUserEmail}
                />
            </div>

            <InviteAdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleInviteSuccess}
            />
        </>
    )
}
