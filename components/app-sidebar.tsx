'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Wrench, LogOut } from 'lucide-react'

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/ArkitecnicosApp',
        icon: LayoutDashboard,
    },
    {
        title: 'Clientes',
        href: '/ArkitecnicosApp/clients',
        icon: Users,
    },
    {
        title: 'Instalaciones',
        href: '/ArkitecnicosApp/facilities',
        icon: Wrench,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 shadow-sm">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">
                    Arkitecnicos
                </h1>
                <p className="text-xs text-gray-500 mt-1">Panel de Administración</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-red-600" : "text-gray-400")} />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium">
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}
