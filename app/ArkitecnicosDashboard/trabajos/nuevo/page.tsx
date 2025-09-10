"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPlus, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { addWork } from "@/lib/db/works"
import { uploadMultipleImages } from "@/actions/image-upload"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewWorkPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    idname: "",
    name: "",
    client: "",
    location: "",
    date: new Date().getFullYear(),
    description: "",
    tags: [""],
    image_urls: [] as string[],
    results: [""],
  })
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.client || !formData.description) {
        alert("Por favor completa todos los campos obligatorios")
        return
      }

      const workId =
        formData.idname ||
        formData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")

      let allImageUrls = [...formData.image_urls]

      if (newImageFiles.length > 0) {
        console.log("[v0] Uploading", newImageFiles.length, "new images for work:", workId)
        const uploadResult = await uploadMultipleImages(newImageFiles, "works", workId, 4)

        if (uploadResult.success) {
          allImageUrls = [...allImageUrls, ...uploadResult.urls]
          console.log("[v0] Successfully uploaded images:", uploadResult.urls)
        } else {
          console.error("[v0] Error uploading images:", uploadResult.errors)
          alert(`Error al subir imágenes: ${uploadResult.errors.join(", ")}`)
          return
        }
      }

      const cleanData = {
        ...formData,
        image_urls: allImageUrls,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        results: formData.results.filter((result) => result.trim() !== ""),
        idname: workId,
      }

      console.log("[v0] Creating work with data:", cleanData)
      await addWork(cleanData)
      console.log("[v0] Work created successfully")

      alert("Trabajo creado exitosamente")
      router.push("/ArkitecnicosDashboard/trabajos")
    } catch (error) {
      console.error("[v0] Error creating work:", error)
      alert("Error al crear el trabajo")
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }))
  }

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const updateTag = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, i) => (i === index ? value : tag)),
    }))
  }

  const addResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, ""],
    }))
  }

  const removeResult = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }))
  }

  const updateResult = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.map((result, i) => (i === index ? value : result)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Nuevo Trabajo</h1>
          <p className="text-neutral mt-1">Agregar un nuevo trabajo al portafolio</p>
        </div>
        <Link href="/ArkitecnicosDashboard/trabajos">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Trabajo *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Automatización Línea de Producción"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID del Trabajo</label>
              <Input
                value={formData.idname}
                onChange={(e) => setFormData((prev) => ({ ...prev, idname: e.target.value }))}
                placeholder="Se genera automáticamente si se deja vacío"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
              <Input
                value={formData.client}
                onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                placeholder="Ej: AutoTech Industries"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Ej: México, CDMX"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
              <Input
                type="number"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: Number(e.target.value) }))}
                placeholder="2024"
                min="2000"
                max="2030"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción detallada del trabajo realizado..."
              rows={4}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tecnologías/Tags</label>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder="Ej: Robótica, PLC, SCADA"
                    className="flex-1"
                  />
                  {formData.tags.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <HiX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addTag} className="bg-transparent">
                <HiPlus className="w-4 h-4 mr-2" />
                Agregar Tag
              </Button>
            </div>
          </div>

          {/* Images Upload */}
          <ImageUpload
            images={formData.image_urls}
            onImagesChange={(images) => setFormData((prev) => ({ ...prev, image_urls: images }))}
            onFilesChange={setNewImageFiles}
            maxImages={4}
            folder="works"
          />

          {/* Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resultados Obtenidos</label>
            <div className="space-y-2">
              {formData.results.map((result, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={result}
                    onChange={(e) => updateResult(index, e.target.value)}
                    placeholder="Ej: 40% aumento en productividad"
                    className="flex-1"
                  />
                  {formData.results.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeResult(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <HiX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addResult} className="bg-transparent">
                <HiPlus className="w-4 h-4 mr-2" />
                Agregar Resultado
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {newImageFiles.length > 0 ? "Subiendo imágenes y creando..." : "Creando..."}
                </div>
              ) : (
                "Crear Trabajo"
              )}
            </Button>
            <Link href="/ArkitecnicosDashboard/trabajos">
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
