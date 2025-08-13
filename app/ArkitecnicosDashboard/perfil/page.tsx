"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiUser, HiMail, HiShieldCheck, HiPencil, HiCamera } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentUser, type AuthUser } from "@/lib/db/auth"
import { updateProfile } from "@/lib/db/profiles"
import { ImageUpload } from "@/components/image-upload"
import Image from "next/image"

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    avatar_url: "",
  })

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      setLoading(true)
      const userData = await getCurrentUser()
      if (userData) {
        setUser(userData)
        setFormData({
          full_name: userData.profile?.full_name || "",
          avatar_url: userData.profile?.avatar_url || "",
        })
      }
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user?.id) return

    try {
      setSaving(true)
      await updateProfile(user.id, {
        full_name: formData.full_name,
        avatar_url: formData.avatar_url,
      })

      // Reload user data
      await loadUser()
      setEditing(false)
      alert("Perfil actualizado exitosamente")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error al actualizar el perfil")
    } finally {
      setSaving(false)
    }
  }

  const getRoleName = (role?: number) => {
    switch (role) {
      case 1:
        return "Administrador"
      case 2:
        return "Usuario"
      default:
        return "Sin rol asignado"
    }
  }

  const getPrivileges = (role?: number) => {
    switch (role) {
      case 1:
        return ["Lectura", "Escritura", "Eliminación", "Administración"]
      case 2:
        return ["Lectura"]
      default:
        return ["Sin privilegios"]
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No se pudo cargar el perfil</h2>
        <Button onClick={loadUser} className="btn-primary">
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-tertiary">Mi Perfil</h1>
          <p className="text-neutral mt-1">Gestiona tu información personal y configuración</p>
        </div>
        <Button onClick={() => (editing ? handleSave() : setEditing(true))} disabled={saving} className="btn-primary">
          {saving ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Guardando...
            </div>
          ) : editing ? (
            "Guardar Cambios"
          ) : (
            <>
              <HiPencil className="w-4 h-4 mr-2" />
              Editar Perfil
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mx-auto">
                <Image
                  src={formData.avatar_url || "/placeholder.svg?height=128&width=128&text=Usuario"}
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              {editing && (
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
                  <HiCamera className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-tertiary mb-2">{user.profile?.full_name || "Usuario sin nombre"}</h2>
            <p className="text-neutral text-sm mb-4">{user.email}</p>

            {editing && (
              <div className="mt-6">
                <ImageUpload
                  images={formData.avatar_url ? [formData.avatar_url] : []}
                  onImagesChange={(images: any) => setFormData((prev) => ({ ...prev, avatar_url: images[0] || "" }))}
                  maxImages={1}
                  folder="profiles"
                  className="text-left"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Información Personal</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  {editing ? (
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Ingresa tu nombre completo"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-md">
                      <HiUser className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{user.profile?.full_name || "No especificado"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <HiMail className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">El correo no se puede modificar</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID de Usuario</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-900 font-mono text-sm">{user.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role and Permissions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Rol y Permisos</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol Actual</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <HiShieldCheck className="w-5 h-5 text-primary mr-3" />
                  <span className="text-gray-900 font-medium">{getRoleName(user.role)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Privilegios</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getPrivileges(user.role).map((privilege, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-md text-sm font-medium"
                    >
                      {privilege}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <HiShieldCheck className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Información sobre Roles</h4>
                    <p className="text-sm text-blue-700">
                      {user.role === 1
                        ? "Como administrador, tienes acceso completo al sistema y puedes gestionar todos los contenidos."
                        : "Como usuario regular, tienes acceso de solo lectura. Contacta al administrador para cambios de permisos."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Información de la Cuenta</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Fecha de registro</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.profile?.created_at
                    ? new Date(user.profile.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No disponible"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Última actualización</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.profile?.updated_at
                    ? new Date(user.profile.updated_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Nunca"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Estado de la cuenta</span>
                <span className="text-sm font-medium text-green-600">Activa</span>
              </div>
            </div>
          </div>

          {editing && (
            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button
                onClick={() => {
                  setEditing(false)
                  setFormData({
                    full_name: user.profile?.full_name || "",
                    avatar_url: user.profile?.avatar_url || "",
                  })
                }}
                variant="outline"
                className="bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
