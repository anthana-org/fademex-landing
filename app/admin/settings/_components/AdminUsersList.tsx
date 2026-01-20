'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { disableAdmin, enableAdmin, resendInvite } from '@/lib/actions/admins'
import { MoreVertical, Mail, UserX, UserCheck, Loader2 } from 'lucide-react'
import type { AdminUser } from '@/lib/types/admin'

interface AdminUsersListProps {
    admins: AdminUser[]
    currentUserEmail: string
}

export default function AdminUsersList({ admins, currentUserEmail }: AdminUsersListProps) {
    const router = useRouter()
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const handleResendInvite = async (adminId: string) => {
        setLoadingId(adminId)
        try {
            const result = await resendInvite(adminId)
            if (!result.success) {
                alert(result.error || 'Error al reenviar invitación')
            } else {
                alert('Invitación reenviada correctamente')
            }
        } catch (err) {
            alert('Error inesperado')
        }
        setLoadingId(null)
        setOpenMenuId(null)
    }

    const handleDisable = async (adminId: string) => {
        if (!confirm('¿Estás seguro de deshabilitar este administrador?')) return

        setLoadingId(adminId)
        try {
            const result = await disableAdmin(adminId)
            if (!result.success) {
                alert(result.error || 'Error al deshabilitar')
            }
            router.refresh()
        } catch (err) {
            alert('Error inesperado')
        }
        setLoadingId(null)
        setOpenMenuId(null)
    }

    const handleEnable = async (adminId: string) => {
        setLoadingId(adminId)
        try {
            const result = await enableAdmin(adminId)
            if (!result.success) {
                alert(result.error || 'Error al habilitar')
            }
            router.refresh()
        } catch (err) {
            alert('Error inesperado')
        }
        setLoadingId(null)
        setOpenMenuId(null)
    }

    const getStatusBadge = (status: AdminUser['status']) => {
        switch (status) {
            case 'active':
                return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Activo</span>
            case 'pending':
                return <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">Pendiente</span>
            case 'disabled':
                return <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">Deshabilitado</span>
        }
    }

    return (
        <div className="space-y-3">
            {admins.map((admin) => {
                const isCurrentUser = admin.email.toLowerCase() === currentUserEmail.toLowerCase()
                const isLoading = loadingId === admin.id
                const isMenuOpen = openMenuId === admin.id

                return (
                    <div
                        key={admin.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-ink/5 group"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-ink font-bold text-sm flex-shrink-0">
                            {admin.email.substring(0, 2).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-ink text-sm truncate">
                                    {admin.full_name || admin.email}
                                </p>
                                {getStatusBadge(admin.status)}
                            </div>
                            <p className="text-xs text-ink/50 truncate">
                                {admin.email}
                                {isCurrentUser && ' (tú)'}
                            </p>
                        </div>

                        {/* Actions */}
                        {!isCurrentUser && (
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenuId(isMenuOpen ? null : admin.id)}
                                    disabled={isLoading}
                                    className="p-2 rounded-lg hover:bg-ink/10 text-ink/50 hover:text-ink transition-colors"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <MoreVertical className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isMenuOpen && !isLoading && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setOpenMenuId(null)}
                                        />
                                        <div className="absolute right-0 top-full mt-1 z-20 bg-canvas-alt border border-ink/10 rounded-lg shadow-lg py-1 min-w-[160px]">
                                            {admin.status === 'pending' && (
                                                <button
                                                    onClick={() => handleResendInvite(admin.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-ink/5 transition-colors"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                    Reenviar Invitación
                                                </button>
                                            )}
                                            {admin.status !== 'disabled' ? (
                                                <button
                                                    onClick={() => handleDisable(admin.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <UserX className="w-4 h-4" />
                                                    Deshabilitar
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEnable(admin.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                                                >
                                                    <UserCheck className="w-4 h-4" />
                                                    Habilitar
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )
            })}

            {admins.length === 0 && (
                <p className="text-sm text-ink/50 text-center py-4">
                    No hay administradores configurados
                </p>
            )}
        </div>
    )
}
