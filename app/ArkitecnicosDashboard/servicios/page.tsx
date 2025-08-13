"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiCog } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getServices, deleteService } from "@/lib/db/services"
import type { Service } from "@/lib/types/product"
import Link from "next/link"

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredServices(filtered)
  }, [services, searchTerm])

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      return
    }

    try {
      setDeleteLoading(id)
      await deleteService(id)
      await loadServices()
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Error al eliminar el servicio")
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Gestión de Servicios</h1>
          <p className="text-neutral mt-1">Administra los servicios ofrecidos</p>
        </div>
        <Link href="/ArkitecnicosDashboard/servicios/nuevo">
          <Button className="btn-primary">
            <HiPlus className="w-4 h-4 mr-2" />
            Nuevo Servicio
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-5 h-5" />
          <Input
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Características
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <HiCog className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.features ? service.features.split(", ").length : 0} características
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(service.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/ArkitecnicosDashboard/servicios/${service.id}`}>
                        <Button variant="ghost" size="sm">
                          <HiEye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/ArkitecnicosDashboard/servicios/${service.id}/editar`}>
                        <Button variant="ghost" size="sm">
                          <HiPencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        disabled={deleteLoading === service.id}
                        className="text-red-600 hover:text-red-700"
                      >
                        {deleteLoading === service.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <HiTrash className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <HiCog className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay servicios</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "No se encontraron servicios con ese término" : "Comienza creando un nuevo servicio"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
