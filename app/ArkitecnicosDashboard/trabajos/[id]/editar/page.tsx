"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft, HiPlus, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getWorkById, updateWork } from "@/lib/db/works"
import { ImageUpload } from "@/components/image-upload"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
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

  useEffect(() => {
    loadWork()
  }, [id])

  const loadWork = async () => {
    try {
      setInitialLoading(true)
      const workData = await getWorkById(Number(id))

      if (!workData) {
        alert("Trabajo no encontrado")
        router.push("/ArkitecnicosDashboard/trabajos")
        return
      }

      setFormData({
        idname: workData.idname,
        name: workData.name,
        client: workData.client,
        location: workData.location,
        date: workData.date,
        description: workData.description,
        tags: workData.tags.length > 0 ? workData.tags : [""],
        image_urls: workData.image_urls || [],
        results: workData.results.length > 0 ? workData.results : [""],
      })
    } catch (error) {
      console.error("Error loading work:", error)
      alert("Error al cargar el trabajo")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.client || !formData.description) {
        alert("Por favor completa todos los campos obligatorios")
        return
      }

      const cleanData = {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        results: formData.results.filter((result) => result.trim() !== ""),
      }

      await updateWork(Number(id), cleanData)
      alert("Trabajo actualizado exitosamente")
      router.push("/ArkitecnicosDashboard/trabajos")
    } catch (error) {
      console.error("Error updating work:", error)
      alert("Error al actualizar el trabajo")
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
          <h1 className="text-3xl font-bold text-tertiary">Editar Trabajo</h1>
          <p className="text-neutral mt-1">Modificar información del trabajo</p>
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
                placeholder="ID único del trabajo"
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

          {/* Images */}
          <ImageUpload
            images={formData.image_urls}
            onImagesChange={(images: any) => setFormData((prev) => ({ ...prev, image_urls: images }))}
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
                  Actualizando...
                </div>
              ) : (
                "Actualizar Trabajo"
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
