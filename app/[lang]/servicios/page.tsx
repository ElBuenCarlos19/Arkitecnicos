"use client"

import { motion } from "framer-motion"
import { HiCog, HiChip, HiChartBar, HiShieldCheck, HiSupport } from "react-icons/hi"
import { FaWrench, FaRobot, FaCogs } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { use, useState, useEffect } from "react"
import { getServices } from "@/lib/db/services"
import type { Service } from "@/lib/types/product"

const translations = {
  es: {
    title: "Todos Nuestros Servicios",
    subtitle: "Soluciones Integrales de Automatización Industrial",
    cta: "Solicitar Cotización",
    loading: "Cargando servicios...",
    error: "Error al cargar servicios",
    noServices: "No se encontraron servicios",
  },
  en: {
    title: "All Our Services",
    subtitle: "Comprehensive Industrial Automation Solutions",
    cta: "Request Quote",
    loading: "Loading services...",
    error: "Error loading services",
    noServices: "No services found",
  },
}

// Iconos para los servicios (se asignan por orden)
const serviceIcons = [HiCog, HiChip, FaWrench, HiShieldCheck, HiSupport, HiChartBar, FaRobot, FaCogs]

export default function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getServices()
        setServices(data)
      } catch (err) {
        console.error("Error loading services:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral">{t.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {t.error}: {error}
          </p>
          <Button onClick={() => window.location.reload()} className="btn-primary">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pr-16">
      <div className="container-custom section-padding py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h1>
          <p className="text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral text-lg">{t.noServices}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length] || HiCog
              const features = service.features ? service.features.split(", ") : []

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-tertiary mb-3">{service.name}</h3>
                    <p className="text-neutral leading-relaxed mb-4">{service.description}</p>
                  </div>

                  {features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-neutral">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {feature.trim()}
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full btn-primary group-hover:scale-105 transition-transform"
                    onClick={() => {
                      window.open(
                        `https://wa.me/5215512345678?text=Hola, me interesa el servicio de ${service.name}`,
                        "_blank",
                      )
                    }}
                  >
                    {t.cta}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
