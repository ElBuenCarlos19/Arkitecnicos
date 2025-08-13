"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, signOut } from "@/lib/db/auth"
import type { AuthUser } from "@/lib/db/auth"
import { motion } from "framer-motion"
import { HiHome, HiCube, HiBriefcase, HiCog, HiLogout, HiUser, HiChartBar } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser.role !== 1) {
          router.push("/ArkitecnicosAdmin")
          return
        }

        setUser(currentUser)
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/ArkitecnicosAdmin")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/ArkitecnicosAdmin")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const menuItems = [
    { href: "/ArkitecnicosDashboard", label: "Dashboard", icon: HiChartBar },
    { href: "/ArkitecnicosDashboard/productos", label: "Productos", icon: HiCube },
    { href: "/ArkitecnicosDashboard/categorias", label: "Categorías", icon: HiHome },
    { href: "/ArkitecnicosDashboard/trabajos", label: "Trabajos", icon: HiBriefcase },
    { href: "/ArkitecnicosDashboard/servicios", label: "Servicios", icon: HiCog },
    { href: "/ArkitecnicosDashboard/perfil", label: "Mi Perfil", icon: HiUser },
  ]

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Arkitécnicos" width={40} height={40} className="rounded-lg" />
            <div>
              <h2 className="font-bold text-tertiary">Arkitécnicos</h2>
              <p className="text-xs text-neutral">Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={user.profile?.avatar_url || "/placeholder.svg?height=32&width=32&text=U"}
                alt="Avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-tertiary truncate">{user.profile?.full_name || user.email}</p>
              <p className="text-xs text-neutral">Administrador</p>
            </div>
          </div>

          <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <HiLogout className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
