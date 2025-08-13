"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiBriefcase } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getWorks, deleteWork } from "@/lib/db/works"
import type { Work } from "@/lib/types/product"
import Link from "next/link"

export default function WorksManagementPage() {
  const [works, setWorks] = useState<Work[]>([])
  const [filteredWorks, setFilteredWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

  useEffect(() => {
    loadWorks()
  }, [])

  useEffect(() => {
    const filtered = works.filter(
      (work) =>
        work.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredWorks(filtered)
  }, [works, searchTerm])

  const loadWorks = async () => {
    try {
      setLoading(true)
      const data = await getWorks()
      setWorks(data)
    } catch (error) {
      console.error("Error loading works:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este trabajo?")) {
      return
    }

    try {
      setDeleteLoading(id)
      await deleteWork(id)
      await loadWorks()
    } catch (error) {
      console.error("Error deleting work:", error)
      alert("Error al eliminar el trabajo")
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
          <h1 className="text-3xl font-bold text-tertiary">Gestión de Trabajos</h1>
          <p className="text-neutral mt-1">Administra el portafolio de trabajos realizados</p>
        </div>
        <Link href="/ArkitecnicosDashboard/trabajos/nuevo">
          <Button className="btn-primary">
            <HiPlus className="w-4 h-4 mr-2" />
            Nuevo Trabajo
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-5 h-5" />
          <Input
            placeholder="Buscar trabajos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Works Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Work Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span>{work.date}</span>
                  <span className="mx-2">•</span>
                  <span className="truncate">{work.location}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-tertiary mb-2 line-clamp-2">{work.name}</h3>
              <p className="text-sm text-primary mb-2">{work.client}</p>
              <p className="text-neutral text-sm mb-4 line-clamp-3">{work.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {work.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {work.tags.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{work.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Results */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Resultados ({work.results.length})</p>
                <div className="space-y-1">
                  {work.results.slice(0, 2).map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-xs text-gray-600">
                      <div className="w-1 h-1 bg-success rounded-full mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{result}</span>
                    </div>
                  ))}
                  {work.results.length > 2 && <p className="text-xs text-gray-500">+{work.results.length - 2} más</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">ID: {work.idname}</span>
                <div className="flex items-center space-x-2">
                  <Link href={`/ArkitecnicosDashboard/trabajos/${work.id}`}>
                    <Button variant="ghost" size="sm">
                      <HiEye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/ArkitecnicosDashboard/trabajos/${work.id}/editar`}>
                    <Button variant="ghost" size="sm">
                      <HiPencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(work.id)}
                    disabled={deleteLoading === work.id}
                    className="text-red-600 hover:text-red-700"
                  >
                    {deleteLoading === work.id ? (
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

      {filteredWorks.length === 0 && (
        <div className="text-center py-12">
          <HiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay trabajos</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "No se encontraron trabajos con ese término" : "Comienza creando un nuevo trabajo"}
          </p>
        </div>
      )}
    </div>
  )
}
