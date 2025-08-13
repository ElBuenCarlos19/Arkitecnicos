"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPencil, HiTrash, HiCalendar, HiLocationMarker, HiUsers } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { getWorkById, deleteWork } from "@/lib/db/works"
import type { Work } from "@/lib/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"
import Image from "next/image"

export default function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [work, setWork] = useState<Work | null>(null)

  useEffect(() => {
    loadWork()
  }, [id])

  const loadWork = async () => {
    try {
      setLoading(true)
      const workData = await getWorkById(Number(id))

      if (!workData) {
        alert("Trabajo no encontrado")
        router.push("/ArkitecnicosDashboard/trabajos")
        return
      }

      setWork(workData)
    } catch (error) {
      console.error("Error loading work:", error)
      alert("Error al cargar el trabajo")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este trabajo? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      setDeleteLoading(true)
      await deleteWork(Number(id))
      alert("Trabajo eliminado exitosamente")
      router.push("/ArkitecnicosDashboard/trabajos")
    } catch (error) {
      console.error("Error deleting work:", error)
      alert("Error al eliminar el trabajo")
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

  if (!work) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Trabajo no encontrado</h2>
        <Link href="/ArkitecnicosDashboard/trabajos">
          <Button className="btn-primary">Volver a Trabajos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Detalle del Trabajo</h1>
          <p className="text-neutral mt-1">Información completa del trabajo</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ArkitecnicosDashboard/trabajos">
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver
            </Button>
          </Link>
          <Link href={`/ArkitecnicosDashboard/trabajos/${id}/editar`}>
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
        {/* Work Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imágenes del Proyecto</h3>
            {work.image_urls && work.image_urls.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {work.image_urls.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={url || "/placeholder.svg?height=200&width=200&text=Trabajo"}
                      alt={`${work.name} - Imagen ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No hay imágenes disponibles</p>
            )}
          </div>
        </motion.div>

        {/* Work Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
                <p className="mt-1 text-sm text-gray-900">{work.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{work.idname}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cliente</label>
                  <div className="flex items-center mt-1">
                    <HiUsers className="w-4 h-4 text-primary mr-2" />
                    <p className="text-sm text-gray-900">{work.client}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Año</label>
                  <div className="flex items-center mt-1">
                    <HiCalendar className="w-4 h-4 text-primary mr-2" />
                    <p className="text-sm text-gray-900">{work.date}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                <div className="flex items-center mt-1">
                  <HiLocationMarker className="w-4 h-4 text-primary mr-2" />
                  <p className="text-sm text-gray-900">{work.location}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <p className="mt-1 text-sm text-gray-900 leading-relaxed">{work.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(work.created_at).toLocaleDateString("es-ES", {
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

          {/* Tags */}
          {work.tags && work.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {work.results && work.results.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados Obtenidos</h3>
              <ul className="space-y-2">
                {work.results.map((result, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0" />
                    {result}
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
