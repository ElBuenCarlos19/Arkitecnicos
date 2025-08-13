"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPencil, HiTrash, HiFolder } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { getProductsCategoryById, deleteProductCategory } from "@/lib/db/products_category"
import type { ProductCategory } from "@/lib/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"
import Image from "next/image"

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [category, setCategory] = useState<ProductCategory | null>(null)

  useEffect(() => {
    loadCategory()
  }, [id])

  const loadCategory = async () => {
    try {
      setLoading(true)
      const categoryData = await getProductsCategoryById(Number(id))

      if (!categoryData) {
        alert("Categoría no encontrada")
        router.push("/ArkitecnicosDashboard/categorias")
        return
      }

      setCategory(categoryData)
    } catch (error) {
      console.error("Error loading category:", error)
      alert("Error al cargar la categoría")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      setDeleteLoading(true)
      await deleteProductCategory(Number(id))
      alert("Categoría eliminada exitosamente")
      router.push("/ArkitecnicosDashboard/categorias")
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("Error al eliminar la categoría")
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

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Categoría no encontrada</h2>
        <Link href="/ArkitecnicosDashboard/categorias">
          <Button className="btn-primary">Volver a Categorías</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Detalle de la Categoría</h1>
          <p className="text-neutral mt-1">Información completa de la categoría</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ArkitecnicosDashboard/categorias">
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver
            </Button>
          </Link>
          <Link href={`/ArkitecnicosDashboard/categorias/${id}/editar`}>
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
        {/* Category Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imagen de la Categoría</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={category.image_url || "/placeholder.svg?height=300&width=400&text=Categoría"}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <p className="mt-1 text-sm text-gray-900">{category.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{category.idname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <p className="mt-1 text-sm text-gray-900 leading-relaxed">{category.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(category.created_at).toLocaleDateString("es-ES", {
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

          {/* Items */}
          {category.items && category.items.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Elementos de la Categoría ({category.items.length})
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <HiFolder className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    {item}
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
