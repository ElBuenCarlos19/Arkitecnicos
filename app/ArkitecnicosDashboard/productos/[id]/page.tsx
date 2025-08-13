"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPencil, HiTrash } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { getProductById, deleteProduct } from "@/lib/db/products"
import { getProductsCategoryById } from "@/lib/db/products_category"
import type { Product, ProductCategory } from "@/lib/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"
import Image from "next/image"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<ProductCategory | null>(null)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const productData = await getProductById(Number(id))

      if (!productData) {
        alert("Producto no encontrado")
        router.push("/ArkitecnicosDashboard/productos")
        return
      }

      setProduct(productData)

      // Cargar categoría
      const categoryData = await getProductsCategoryById(productData.category)
      setCategory(categoryData)
    } catch (error) {
      console.error("Error loading product:", error)
      alert("Error al cargar el producto")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      setDeleteLoading(true)
      await deleteProduct(Number(id))
      alert("Producto eliminado exitosamente")
      router.push("/ArkitecnicosDashboard/productos")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error al eliminar el producto")
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

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
        <Link href="/ArkitecnicosDashboard/productos">
          <Button className="btn-primary">Volver a Productos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Detalle del Producto</h1>
          <p className="text-neutral mt-1">Información completa del producto</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ArkitecnicosDashboard/productos">
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver
            </Button>
          </Link>
          <Link href={`/ArkitecnicosDashboard/productos/${id}/editar`}>
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
        {/* Product Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imágenes</h3>
            {product.images_url && product.images_url.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {product.images_url.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={url || "/placeholder.svg?height=200&width=200&text=Imagen"}
                      alt={`${product.name} - Imagen ${index + 1}`}
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

        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <p className="mt-1 text-sm text-gray-900">{product.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{product.idname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <p className="mt-1 text-sm text-gray-900">{category?.name || "Sin categoría"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <p className="mt-1 text-sm text-gray-900 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(product.created_at).toLocaleDateString("es-ES", {
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
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-sm font-medium text-gray-700">{key}</span>
                    <span className="text-sm text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
