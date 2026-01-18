'use client'

import { useState } from 'react'
import { addClient } from '@/lib/db/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ClientForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string

        try {
            await addClient({
                name,
                email,
                phone,
                first_interaction_date: new Date().toISOString(),
            })
            setMessage('Cliente agregado exitosamente')
                ; (e.target as HTMLFormElement).reset()
            router.refresh()
        } catch (error: any) {
            setMessage(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-600" /> Agregar Nuevo Cliente
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                        <Input name="name" placeholder="Ej. Juan Pérez" required className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <Input name="email" type="email" placeholder="juan@ejemplo.com" className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                        <Input name="phone" placeholder="+57 300 123 4567" className="bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                    <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Guardar Cliente
                    </Button>
                </div>
            </form>
        </div>
    )
}
