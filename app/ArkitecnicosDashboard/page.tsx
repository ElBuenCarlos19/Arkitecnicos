"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiCube, HiBriefcase, HiCog, HiUsers, HiTrendingUp, HiEye, HiDatabase, HiServer } from "react-icons/hi"
import { getProducts } from "@/lib/db/products"
import { getAllProductsCategory } from "@/lib/db/products_category"
import { getWorks } from "@/lib/db/works"
import { getServices } from "@/lib/db/services"
import { getSystemStatus, type SystemStatus } from "@/actions/system-status"

interface DashboardStats {
  products: number
  categories: number
  works: number
  services: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    categories: 0,
    works: 0,
    services: 0,
  })
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
    // Actualizar estado del sistema cada 30 segundos
    const interval = setInterval(loadSystemStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const [products, categories, works, services] = await Promise.all([
        getProducts(),
        getAllProductsCategory(),
        getWorks(),
        getServices(),
      ])

      setStats({
        products: products.length,
        categories: categories.length,
        works: works.length,
        services: services.length,
      })

      await loadSystemStatus()
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadSystemStatus = async () => {
    try {
      const status = await getSystemStatus()
      setSystemStatus(status)
    } catch (error) {
      console.error("Error loading system status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600"
      case "error":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Ahora mismo"
    if (minutes === 1) return "Hace 1 minuto"
    if (minutes < 60) return `Hace ${minutes} minutos`

    const hours = Math.floor(minutes / 60)
    if (hours === 1) return "Hace 1 hora"
    if (hours < 24) return `Hace ${hours} horas`

    const days = Math.floor(hours / 24)
    if (days === 1) return "Hace 1 día"
    return `Hace ${days} días`
  }

  const statCards = [
    {
      title: "Productos",
      value: stats.products,
      icon: HiCube,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Categorías",
      value: stats.categories,
      icon: HiUsers,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Trabajos",
      value: stats.works,
      icon: HiBriefcase,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Servicios",
      value: stats.services,
      icon: HiCog,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

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
          <h1 className="text-3xl font-bold text-tertiary">Dashboard</h1>
          <p className="text-neutral mt-1">Resumen general del sistema</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-neutral">
          <HiEye className="w-4 h-4" />
          <span>Última actualización: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card.bgColor} rounded-xl p-6 border border-gray-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-tertiary mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/ArkitecnicosDashboard/productos/nuevo"
            className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <HiCube className="w-5 h-5 text-primary" />
            <span className="font-medium text-tertiary">Nuevo Producto</span>
          </a>
          <a
            href="/ArkitecnicosDashboard/trabajos/nuevo"
            className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <HiBriefcase className="w-5 h-5 text-primary" />
            <span className="font-medium text-tertiary">Nuevo Trabajo</span>
          </a>
          <a
            href="/ArkitecnicosDashboard/servicios/nuevo"
            className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <HiCog className="w-5 h-5 text-primary" />
            <span className="font-medium text-tertiary">Nuevo Servicio</span>
          </a>
          <a
            href="/ArkitecnicosDashboard/categorias/nueva"
            className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <HiUsers className="w-5 h-5 text-primary" />
            <span className="font-medium text-tertiary">Nueva Categoría</span>
          </a>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-tertiary">Estado del Sistema</h2>
          <div className="flex items-center space-x-2">
            <HiTrendingUp className="w-5 h-5 text-green-500" />
            <button onClick={loadSystemStatus} className="text-sm text-primary hover:text-primary/80 transition-colors">
              Actualizar
            </button>
          </div>
        </div>

        {systemStatus ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <HiDatabase className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-neutral">Base de datos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getStatusColor(systemStatus.database.status)}`}>
                  {systemStatus.database.message}
                </span>
                {systemStatus.database.responseTime && (
                  <span className="text-xs text-gray-500">({systemStatus.database.responseTime}ms)</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <HiServer className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-neutral">Almacenamiento</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getStatusColor(systemStatus.storage.status)}`}>
                  {systemStatus.storage.message}
                </span>
                {systemStatus.storage.responseTime && (
                  <span className="text-xs text-gray-500">({systemStatus.storage.responseTime}ms)</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-neutral">Última sincronización</span>
              <span className="text-sm font-medium text-neutral">{getTimeAgo(systemStatus.lastSync.timestamp)}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
            <span className="text-sm text-neutral">Verificando estado del sistema...</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
