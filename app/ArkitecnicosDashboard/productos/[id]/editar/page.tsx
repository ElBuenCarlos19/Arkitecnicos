"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPlus, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { getProductById, updateProduct } from "@/lib/db/products"
import { getAllProductsCategory } from "@/lib/db/products_category"
import type { ProductCategory } from "@/lib/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [formData, setFormData] = useState({
    idname: "",
    name: "",
    description: "",
    images_url: [] as string[],
    category: 0,
    specifications: {} as Record<string, string>,
    features: [""],
  })
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setInitialLoading(true)
      const [productData, categoriesData] = await Promise.all([getProductById(Number(id)), getAllProductsCategory()])

      if (!productData) {
        alert("Producto no encontrado")
        router.push("/ArkitecnicosDashboard/productos")
        return
      }

      setFormData({
        idname: productData.idname,
        name: productData.name,
        description: productData.description,
        images_url: productData.images_url || [],
        category: productData.category,
        specifications: productData.specifications || {},
        features: productData.features.length > 0 ? productData.features : [""],
      })
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
      alert("Error al cargar los datos")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.description || !formData.category) {
        alert("Por favor completa todos los campos obligatorios")
        return
      }

      const validImageUrls = formData.images_url.filter((url) => {
        return (
          url && url.trim() !== "" && !url.startsWith("blob:") && (url.startsWith("http") || url.startsWith("https"))
        )
      })

      console.log("[v0] Valid image URLs for product update:", validImageUrls)

      const cleanData = {
        ...formData,
        images_url: validImageUrls,
        features: formData.features.filter((feature) => feature.trim() !== ""),
      }

      console.log("[v0] Updating product with data:", cleanData)
      await updateProduct(Number(id), cleanData)
      console.log("[v0] Product updated successfully")

      alert("Producto actualizado exitosamente")
      router.push("/ArkitecnicosDashboard/productos")
    } catch (error) {
      console.error("[v0] Error updating product:", error)
      alert("Error al actualizar el producto")
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue,
        },
      }))
      setSpecKey("")
      setSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: Object.fromEntries(Object.entries(prev.specifications).filter(([k]) => k !== key)),
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
          <h1 className="text-3xl font-bold text-tertiary">Editar Producto</h1>
          <p className="text-neutral mt-1">Modificar información del producto</p>
        </div>
        <Link href="/ArkitecnicosDashboard/productos">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: BULLDOZER 850"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID del Producto</label>
              <Input
                value={formData.idname}
                onChange={(e) => setFormData((prev) => ({ ...prev, idname: e.target.value }))}
                placeholder="ID único del producto"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción detallada del producto..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value={0}>Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Images Upload */}
          <ImageUpload
            images={formData.images_url}
            onImagesChange={(images) => setFormData((prev) => ({ ...prev, images_url: images }))}
            onFilesChange={(files) => {
              // Handle new files - they will be uploaded when form is submitted
              console.log("[v0] New files selected:", files.length)
            }}
            maxImages={3}
            folder="products"
          />

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Especificaciones Técnicas</label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Nombre de la especificación"
                  className="flex-1"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Valor"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpecification}
                  disabled={!specKey || !specValue}
                  className="bg-transparent"
                >
                  <HiPlus className="w-4 h-4" />
                </Button>
              </div>

              {Object.entries(formData.specifications).length > 0 && (
                <div className="border rounded-lg p-4 space-y-2">
                  {Object.entries(formData.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">
                        <strong>{key}:</strong> {value}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpecification(key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <HiX className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Característica del producto"
                    className="flex-1"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <HiX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeature} className="bg-transparent">
                <HiPlus className="w-4 h-4 mr-2" />
                Agregar Característica
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
                "Actualizar Producto"
              )}
            </Button>
            <Link href="/ArkitecnicosDashboard/productos">
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
