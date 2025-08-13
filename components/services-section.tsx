"use client"

import { motion } from "framer-motion"
import { HiCog, HiChip, HiArrowRight, HiShieldCheck, HiSupport, HiChartBar } from "react-icons/hi"
import { FaWrench, FaRobot } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getServices } from "@/lib/db/services"
import type { Service } from "@/lib/types/product"

const translations = {
  es: {
    title: "Servicios Destacados",
    subtitle: "Nuestras Especialidades Principales",
    cta: "Solicitar Cotización",
    viewAll: "Ver Todos los Servicios",
    loading: "Cargando servicios...",
  },
  en: {
    title: "Featured Services",
    subtitle: "Our Main Specialties",
    cta: "Request Quote",
    viewAll: "View All Services",
    loading: "Loading services...",
  },
}

// Iconos para los servicios (se asignan por orden)
const serviceIcons = [HiCog, HiChip, FaWrench, HiShieldCheck, HiSupport, HiChartBar, FaRobot, HiCog]

interface ServicesSectionProps {
  lang: string
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices()
        setServices(data.slice(0, 3)) // Mostrar solo los primeros 3 servicios
      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <section id="servicios" className="py-20 bg-white lg:pr-20">
        <div className="container-custom section-padding">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="servicios" className="py-20 bg-white lg:pr-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h2>
          <p className="text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Featured Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] || HiCog
            const features = service.features ? service.features.split(", ") : []

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-tertiary mb-3">{service.name}</h3>
                  <p className="text-neutral leading-relaxed mb-6">{service.description}</p>
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

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${lang}/servicios`}>
            <Button className="btn-primary group">
              {t.viewAll}
              <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
