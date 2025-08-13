"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiArrowLeft } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getServiceById, updateService } from "@/lib/db/services"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
  })

  useEffect(() => {
    loadService()
  }, [id])

  const loadService = async () => {
    try {
      setInitialLoading(true)
      const serviceData = await getServiceById(Number(id))

      if (!serviceData) {
        alert("Servicio no encontrado")
        router.push("/ArkitecnicosDashboard/servicios")
        return
      }

      setFormData({
        name: serviceData.name,
        description: serviceData.description,
        features: serviceData.features || "",
      })
    } catch (error) {
      console.error("Error loading service:", error)
      alert("Error al cargar el servicio")
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

      await updateService(Number(id), formData)
      alert("Servicio actualizado exitosamente")
      router.push("/ArkitecnicosDashboard/servicios")
    } catch (error) {
      console.error("Error updating service:", error)
      alert("Error al actualizar el servicio")
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-3xl font-bold text-tertiary">Editar Servicio</h1>
          <p className="text-neutral mt-1">Modificar información del servicio</p>
        </div>
        <Link href="/ArkitecnicosDashboard/servicios">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Servicio *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Automatización de Procesos Industriales"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción detallada del servicio..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
            <Textarea
              value={formData.features}
              onChange={(e) => setFormData((prev) => ({ ...prev, features: e.target.value }))}
              placeholder="Características separadas por comas: Control PLC, Sistemas SCADA, Integración de sensores..."
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">Separa las características con comas</p>
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
                "Actualizar Servicio"
              )}
            </Button>
            <Link href="/ArkitecnicosDashboard/servicios">
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
