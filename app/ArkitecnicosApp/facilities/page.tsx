'use client'

import { useEffect, useState } from 'react'
import { getFacilities } from '@/lib/db/facilities'
import { Facility } from '@/actions/facilities'
import FacilityForm from './FacilityForm'
import { Wrench, Calendar, Clock, User, Loader2 } from 'lucide-react'

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([])
    const [loading, setLoading] = useState(true)

    const fetchFacilities = async () => {
        try {
            const data = await getFacilities()
            setFacilities(data)
        } catch (error) {
            console.error('Error fetching facilities:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFacilities()
    }, [])

    // Listen for updates from the form
    useEffect(() => {
        const handleRefresh = () => fetchFacilities()
        window.addEventListener('refreshFacilities', handleRefresh)
        return () => window.removeEventListener('refreshFacilities', handleRefresh)
    }, [])

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Gestión de Instalaciones
                </h1>
                <p className="text-gray-500 mt-2">Registra instalaciones y configura recordatorios automáticos</p>
            </header>

            <FacilityForm />

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility) => (
                        <div key={facility.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-red-50 rounded-bl-xl border-b border-l border-red-100">
                                <span className="text-xs text-red-600 font-medium">Cada {facility.maintenance_period_months} meses</span>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-red-50 rounded-lg">
                                    <Wrench className="w-6 h-6 text-red-600" />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-1 text-gray-900">{facility.name}</h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                <User className="w-4 h-4" />
                                <span>{facility.clients?.name || 'Cliente desconocido'}</span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span>Instalado: {new Date(facility.installation_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span>Último Mant.: {facility.last_maintenance_date ? new Date(facility.last_maintenance_date).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {facilities.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No hay instalaciones registradas aún.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
