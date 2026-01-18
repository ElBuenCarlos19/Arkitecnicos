'use client'

import { useEffect, useState } from 'react'
import { getClients } from '@/lib/db/clients'
import { Client } from '@/actions/clients'
import ClientForm from './ClientForm'
import { User, Calendar, Mail, Phone, Loader2 } from 'lucide-react'

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)

    const fetchClients = async () => {
        try {
            const data = await getClients()
            setClients(data)
        } catch (error) {
            console.error('Error fetching clients:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    // Listen for updates from the form
    useEffect(() => {
        const handleRefresh = () => fetchClients()
        window.addEventListener('refreshClients', handleRefresh)
        return () => window.removeEventListener('refreshClients', handleRefresh)
    }, [])

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Gestión de Clientes
                </h1>
                <p className="text-gray-500 mt-2">Administra tu base de datos de clientes</p>
            </header>

            <ClientForm />

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono">
                                    {new Date(client.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{client.name}</h3>

                            <div className="space-y-2 text-sm text-gray-500">
                                {client.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{client.email}</span>
                                    </div>
                                )}
                                {client.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{client.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>1ª Interacción: {new Date(client.first_interaction_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {clients.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No hay clientes registrados aún.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
