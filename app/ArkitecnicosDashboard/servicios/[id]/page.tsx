"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPencil, HiTrash, HiCog } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { getServiceById, deleteService } from "@/lib/db/services"
import type { Service } from "@/lib/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [service, setService] = useState<Service | null>(null)

  useEffect(() => {
    loadService()
  }, [id])

  const loadService = async () => {
    try {
      setLoading(true)
      const serviceData = await getServiceById(Number(id))

      if (!serviceData) {
        alert("Servicio no encontrado")
        router.push("/ArkitecnicosDashboard/servicios")
        return
      }

      setService(serviceData)
    } catch (error) {
      console.error("Error loading service:", error)
      alert("Error al cargar el servicio")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      setDeleteLoading(true)
      await deleteService(Number(id))
      alert("Servicio eliminado exitosamente")
      router.push("/ArkitecnicosDashboard/servicios")
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Error al eliminar el servicio")
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Servicio no encontrado</h2>
        <Link href="/ArkitecnicosDashboard/servicios">
          <Button className="btn-primary">Volver a Servicios</Button>
        </Link>
      </div>
    )
  }

  const features = service.features ? service.features.split(", ") : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Detalle del Servicio</h1>
          <p className="text-neutral mt-1">Información completa del servicio</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ArkitecnicosDashboard/servicios">
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver
            </Button>
          </Link>
          <Link href={`/ArkitecnicosDashboard/servicios/${id}/editar`}>
            <Button className="btn-primary">
              <HiPencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Button
            onClick={handleDelete}
            disabled={deleteLoading}
            variant="outline"
            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 bg-transparent"
          >
            {deleteLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
            ) : (
              <HiTrash className="w-4 h-4 mr-2" />
            )}
            Eliminar
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Service Icon */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiCog className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-tertiary">{service.name}</h2>
          </div>
        </motion.div>

        {/* Service Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <p className="mt-1 text-sm text-gray-900">{service.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <p className="mt-1 text-sm text-gray-900 leading-relaxed">{service.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(service.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
