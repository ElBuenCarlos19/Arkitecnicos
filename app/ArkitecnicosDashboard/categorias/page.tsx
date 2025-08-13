 "use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiFolder } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllProductsCategory, deleteProductCategory } from "@/lib/db/products_category"
import type { ProductCategory } from "@/lib/types/product"
import Image from "next/image"
import Link from "next/link"

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [filteredCategories, setFilteredCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCategories(filtered)
  }, [categories, searchTerm])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await getAllProductsCategory()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      return
    }

    try {
      setDeleteLoading(id)
      await deleteProductCategory(id)
      await loadCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("Error al eliminar la categoría")
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
          <h1 className="text-3xl font-bold text-tertiary">Gestión de Categorías</h1>
          <p className="text-neutral mt-1">Administra las categorías de productos</p>
        </div>
        <Link href="/ArkitecnicosDashboard/categorias/nueva">
          <Button className="btn-primary">
            <HiPlus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-5 h-5" />
          <Input
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Category Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.image_url || "/placeholder.svg?height=200&width=300&text=Categoría"}
                alt={category.name}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-tertiary mb-2">{category.name}</h3>
              <p className="text-neutral text-sm mb-4 line-clamp-2">{category.description}</p>

              {/* Items */}
              {category.items && category.items.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Elementos ({category.items.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {category.items.slice(0, 3).map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                    {category.items.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{category.items.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-gray-500 mb-4">Creada: {new Date(category.created_at).toLocaleDateString()}</p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">ID: {category.idname}</span>
                <div className="flex items-center space-x-2">
                  <Link href={`/ArkitecnicosDashboard/categorias/${category.id}`}>
                    <Button variant="ghost" size="sm">
                      <HiEye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/ArkitecnicosDashboard/categorias/${category.id}/editar`}>
                    <Button variant="ghost" size="sm">
                      <HiPencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    disabled={deleteLoading === category.id}
                    className="text-red-600 hover:text-red-700"
                  >
                    {deleteLoading === category.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    ) : (
                      <HiTrash className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <HiFolder className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay categorías</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "No se encontraron categorías con ese término" : "Comienza creando una nueva categoría"}
          </p>
        </div>
      )}
    </div>
  )
}
