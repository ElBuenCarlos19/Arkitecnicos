'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getRecentFacilities, getUpcomingMaintenance } from '@/lib/db/facilities'
import { getClients } from '@/lib/db/clients'
import { Facility } from '@/actions/facilities'
import { Client } from '@/actions/clients'
import { Users, Wrench, Calendar, Clock, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react'

export default function ArkitecnicosAppPage() {
    const [recentFacilities, setRecentFacilities] = useState<Facility[]>([])
    const [upcomingMaintenance, setUpcomingMaintenance] = useState<any[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [facilities, upcoming, clientsData] = await Promise.all([
                    getRecentFacilities(5),
                    getUpcomingMaintenance(5),
                    getClients(),
                ])

                setRecentFacilities(facilities)
                setUpcomingMaintenance(upcoming)
                setClients(clientsData)
            } catch (error) {
                console.error('Error loading dashboard:', error)
            } finally {
                setLoading(false)
            }
        }

        loadDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        )
    }

    // Recent clients (last 5)
    const recentClients = clients.slice(0, 5)

    return (
        <div className="h-full">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Dashboard de Arkitecnicos
                </h1>
                <p className="text-xl text-gray-500">
                    Panel de control para gestión de clientes e instalaciones
                </p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Clientes</p>
                            <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Instalaciones (7 días)</p>
                            <p className="text-3xl font-bold text-gray-900">{recentFacilities.length}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Mantenimientos Próximos</p>
                            <p className="text-3xl font-bold text-gray-900">{upcomingMaintenance.length}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <AlertTriangle className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-red-600" />
                            Actividad Reciente
                        </h2>
                        <Link href="/ArkitecnicosApp/facilities" className="text-sm text-red-600 hover:text-red-700">
                            Ver todas →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentFacilities.length > 0 ? (
                            recentFacilities.map((facility) => (
                                <Link
                                    key={facility.id}
                                    href={`/ArkitecnicosApp/facilities/${facility.id}/report`}
                                    className="block p-4 border border-gray-100 rounded-lg hover:border-red-200 hover:bg-red-50/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{facility.name}</h3>
                                            <p className="text-sm text-gray-500">{facility.clients?.name}</p>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(facility.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-8">No hay instalaciones recientes</p>
                        )}
                    </div>
                </div>

                {/* Upcoming Maintenance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-600" />
                            Mantenimientos Próximos
                        </h2>
                        <Link href="/ArkitecnicosApp/facilities" className="text-sm text-red-600 hover:text-red-700">
                            Ver todas →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {upcomingMaintenance.length > 0 ? (
                            upcomingMaintenance.map((facility) => (
                                <Link
                                    key={facility.id}
                                    href={`/ArkitecnicosApp/facilities/${facility.id}/report`}
                                    className="block p-4 border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{facility.name}</h3>
                                            <p className="text-sm text-gray-500">{facility.clients?.name}</p>
                                        </div>
                                        <span className="text-xs text-orange-600 font-medium">
                                            {new Date(facility.nextDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-8">No hay mantenimientos próximos</p>
                        )}
                    </div>
                </div>

                {/* Recent Clients */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            Clientes Recientes
                        </h2>
                        <Link href="/ArkitecnicosApp/clients" className="text-sm text-red-600 hover:text-red-700">
                            Ver todos →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentClients.length > 0 ? (
                            recentClients.map((client) => (
                                <div
                                    key={client.id}
                                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{client.name}</h3>
                                            {client.email && (
                                                <p className="text-sm text-gray-500">{client.email}</p>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(client.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-8">No hay clientes registrados</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>

                    <div className="space-y-3">
                        <Link
                            href="/ArkitecnicosApp/clients"
                            className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-gray-900">Gestionar Clientes</span>
                            </div>
                        </Link>

                        <Link
                            href="/ArkitecnicosApp/facilities"
                            className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Wrench className="w-5 h-5 text-red-600" />
                                <span className="font-medium text-gray-900">Gestionar Instalaciones</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
