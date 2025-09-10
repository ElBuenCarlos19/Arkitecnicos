"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPlus, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addProductCategory } from "@/lib/db/products_category"
import { uploadSingleImage } from "@/actions/single-image-upload"
import SingleImageUpload from "@/components/single-image-upload"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    idname: "",
    name: "",
    description: "",
    items: [""],
    image_url: "",
  })

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
        idname:
          formData.idname ||
          formData.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
      }

      if (imageFile) {
        console.log("[v0] Uploading category image...")
        const imageUrl = await uploadSingleImage(imageFile, "products", cleanData.idname)
        cleanData.image_url = imageUrl
      }

      await addProductCategory(cleanData)
      alert("Categoría creada exitosamente")
      router.push("/ArkitecnicosDashboard/categorias")
    } catch (error) {
      console.error("Error creating category:", error)
      alert("Error al crear la categoría")
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Nueva Categoría</h1>
          <p className="text-neutral mt-1">Crear una nueva categoría de productos</p>
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
                placeholder="Se genera automáticamente si se deja vacío"
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

          <SingleImageUpload
            image={formData.image_url}
            onImageChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            onFileChange={setImageFile}
            folder="products"
          />

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
                  Creando...
                </div>
              ) : (
                "Crear Categoría"
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
