'use client'

import { useState, useEffect } from 'react'
import { addFacility } from '@/lib/db/facilities'
import { getClients } from '@/lib/db/clients'
import { Client } from '@/actions/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Wrench, Search } from 'lucide-react'

export default function FacilityForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [clients, setClients] = useState<Client[]>([])
    const [search, setSearch] = useState('')
    const [loadingClients, setLoadingClients] = useState(true)

    // Fetch clients on mount and when search changes
    useEffect(() => {
        const fetchClients = async () => {
            setLoadingClients(true)
            try {
                const data = await getClients(search)
                setClients(data)
            } catch (error) {
                console.error('Error fetching clients:', error)
            } finally {
                setLoadingClients(false)
            }
        }

        // Debounce search
        const timeoutId = setTimeout(fetchClients, 300)
        return () => clearTimeout(timeoutId)
    }, [search])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        const formData = new FormData(e.currentTarget)
        const client_id = formData.get('client_id') as string
        const name = formData.get('name') as string
        const installation_date = formData.get('installation_date') as string
        const maintenance_period_months = parseInt(formData.get('maintenance_period_months') as string || '3')

        try {
            await addFacility({
                client_id,
                name,
                installation_date,
                maintenance_period_months,
            })
            setMessage('Instalación registrada exitosamente')
                ; (e.target as HTMLFormElement).reset()
            window.dispatchEvent(new Event('refreshFacilities'))
        } catch (error: any) {
            setMessage(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-red-600" /> Registrar Nueva Instalación
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Cliente</label>
                        <div className="relative mb-2">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar cliente..."
                                className="pl-8 h-9 text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            name="client_id"
                            required
                            className="w-full h-10 px-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                            <option value="">
                                {loadingClients ? 'Cargando...' : 'Seleccionar Cliente...'}
                            </option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                        {clients.length === 0 && !loadingClients && (
                            <p className="text-xs text-red-500 mt-1">No se encontraron clientes</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de Instalación</label>
                        <Input name="name" placeholder="Ej. Motor Levadizo" required className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Instalación</label>
                        <Input name="installation_date" type="date" required className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Periodo Mantenimiento (Meses)</label>
                        <Input name="maintenance_period_months" type="number" defaultValue="3" min="1" className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                    <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Registrar Instalación
                    </Button>
                </div>
            </form>
        </div>
    )
}
