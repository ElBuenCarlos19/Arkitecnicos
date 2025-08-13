"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPlus, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getProductsCategoryById, updateProductCategory } from "@/lib/db/products_category"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    idname: "",
    name: "",
    description: "",
    items: [""],
    image_url: "",
  })

  useEffect(() => {
    loadCategory()
  }, [id])

  const loadCategory = async () => {
    try {
      setInitialLoading(true)
      const categoryData = await getProductsCategoryById(Number(id))

      if (!categoryData) {
        alert("Categoría no encontrada")
        router.push("/ArkitecnicosDashboard/categorias")
        return
      }

      setFormData({
        idname: categoryData.idname,
        name: categoryData.name,
        description: categoryData.description,
        items: categoryData.items.length > 0 ? categoryData.items : [""],
        image_url: categoryData.image_url || "",
      })
    } catch (error) {
      console.error("Error loading category:", error)
      alert("Error al cargar la categoría")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.description) {
        alert("Por favor completa todos los campos obligatorios")
        return
      }

      const cleanData = {
        ...formData,
        items: formData.items.filter((item) => item.trim() !== ""),
      }

      await updateProductCategory(Number(id), cleanData)
      alert("Categoría actualizada exitosamente")
      router.push("/ArkitecnicosDashboard/categorias")
    } catch (error) {
      console.error("Error updating category:", error)
      alert("Error al actualizar la categoría")
    } finally {
      setLoading(false)
    }
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, ""],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? value : item)),
    }))
  }

  if (initialLoading) {
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
          <h1 className="text-3xl font-bold text-tertiary">Editar Categoría</h1>
          <p className="text-neutral mt-1">Modificar información de la categoría</p>
        </div>
        <Link href="/ArkitecnicosDashboard/categorias">
          <Button variant="outline" className="group bg-transparent">
            <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Button>
        </Link>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Categoría *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Motores para Puertas Abatibles"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID de la Categoría</label>
              <Input
                value={formData.idname}
                onChange={(e) => setFormData((prev) => ({ ...prev, idname: e.target.value }))}
                placeholder="ID único de la categoría"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción detallada de la categoría..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Elementos de la Categoría</label>
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder="Elemento de la categoría"
                    className="flex-1"
                  />
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <HiX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="bg-transparent">
                <HiPlus className="w-4 h-4 mr-2" />
                Agregar Elemento
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Actualizando...
                </div>
              ) : (
                "Actualizar Categoría"
              )}
            </Button>
            <Link href="/ArkitecnicosDashboard/categorias">
              <Button type="button" variant="outline" className="bg-transparent">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
