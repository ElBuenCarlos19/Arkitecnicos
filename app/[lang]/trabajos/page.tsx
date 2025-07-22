"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiCalendar, HiLocationMarker, HiUsers } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

const translations = {
  es: {
    title: "Todos Nuestros Trabajos",
    subtitle: "Portafolio Completo de Proyectos Realizados",
    viewWork: "Ver Trabajo",
    works: [
      {
        id: "automatizacion-linea-automotriz",
        title: "Automatización Línea de Producción Automotriz",
        client: "AutoTech Industries",
        location: "México, CDMX",
        date: "2024",
        description:
          "Implementación completa de sistema automatizado para línea de ensamble de vehículos, incluyendo robots colaborativos y sistema de control centralizado.",
        image: "/placeholder.svg?height=400&width=600&text=Línea+Automotriz",
        tags: ["Robótica", "PLC", "SCADA", "Industria 4.0"],
        results: ["40% aumento en productividad", "60% reducción de errores", "25% ahorro energético"],
      },
      {
        id: "sistema-control-planta-quimica",
        title: "Sistema de Control para Planta Química",
        client: "ChemPro Solutions",
        location: "Guadalajara, JAL",
        date: "2023",
        description:
          "Desarrollo e instalación de sistema de control distribuido para planta de procesamiento químico con monitoreo en tiempo real.",
        image: "/placeholder.svg?height=400&width=600&text=Planta+Química",
        tags: ["DCS", "Seguridad", "Monitoreo", "Proceso Químico"],
        results: ["99.8% uptime del sistema", "30% mejora en eficiencia", "Certificación ISO 9001"],
      },
      {
        id: "modernizacion-sistema-electrico",
        title: "Modernización de Sistema Eléctrico Industrial",
        client: "PowerGrid Corp",
        location: "Monterrey, NL",
        date: "2023",
        description:
          "Actualización completa del sistema eléctrico industrial incluyendo tableros de control, protecciones y sistema de monitoreo energético.",
        image: "/placeholder.svg?height=400&width=600&text=Sistema+Eléctrico",
        tags: ["Sistemas Eléctricos", "Protecciones", "Eficiencia Energética"],
        results: ["20% reducción en consumo", "Cero fallas eléctricas", "ROI en 18 meses"],
      },
      {
        id: "automatizacion-almacen-inteligente",
        title: "Automatización de Almacén Inteligente",
        client: "LogiSmart Warehouse",
        location: "Tijuana, BC",
        date: "2024",
        description:
          "Implementación de sistema automatizado de almacenamiento y recuperación con AGVs y software de gestión de inventario.",
        image: "/placeholder.svg?height=400&width=600&text=Almacén+Inteligente",
        tags: ["AGV", "WMS", "IoT", "Logística"],
        results: ["50% reducción en tiempos", "95% precisión inventario", "35% ahorro operativo"],
      },
      {
        id: "control-calidad-automatizado",
        title: "Control de Calidad Automatizado",
        client: "QualityFirst Manufacturing",
        location: "Puebla, PUE",
        date: "2023",
        description:
          "Sistema de inspección automatizada con visión artificial para control de calidad en línea de producción de componentes electrónicos.",
        image: "/placeholder.svg?height=400&width=600&text=Control+Calidad",
        tags: ["Visión Artificial", "Control de Calidad", "IA", "Manufactura"],
        results: ["99.5% detección defectos", "70% reducción rechazos", "45% aumento velocidad"],
      },
      {
        id: "sistema-tratamiento-aguas",
        title: "Sistema de Tratamiento de Aguas",
        client: "AquaTech Environmental",
        location: "Cancún, QR",
        date: "2024",
        description:
          "Automatización completa de planta de tratamiento de aguas residuales con control remoto y monitoreo ambiental.",
        image: "/placeholder.svg?height=400&width=600&text=Tratamiento+Aguas",
        tags: ["Tratamiento Agua", "Ambiental", "Telemetría", "Sustentabilidad"],
        results: ["100% cumplimiento normativo", "30% ahorro químicos", "Monitoreo 24/7"],
      },
    ],
  },
  en: {
    title: "All Our Works",
    subtitle: "Complete Portfolio of Completed Projects",
    viewWork: "View Work",
    works: [
      {
        id: "automotive-line-automation",
        title: "Automotive Production Line Automation",
        client: "AutoTech Industries",
        location: "Mexico City, CDMX",
        date: "2024",
        description:
          "Complete implementation of automated system for vehicle assembly line, including collaborative robots and centralized control system.",
        image: "/placeholder.svg?height=400&width=600&text=Automotive+Line",
        tags: ["Robotics", "PLC", "SCADA", "Industry 4.0"],
        results: ["40% productivity increase", "60% error reduction", "25% energy savings"],
      },
      {
        id: "chemical-plant-control-system",
        title: "Control System for Chemical Plant",
        client: "ChemPro Solutions",
        location: "Guadalajara, JAL",
        date: "2023",
        description:
          "Development and installation of distributed control system for chemical processing plant with real-time monitoring.",
        image: "/placeholder.svg?height=400&width=600&text=Chemical+Plant",
        tags: ["DCS", "Safety", "Monitoring", "Chemical Process"],
        results: ["99.8% system uptime", "30% efficiency improvement", "ISO 9001 certification"],
      },
      {
        id: "electrical-system-modernization",
        title: "Industrial Electrical System Modernization",
        client: "PowerGrid Corp",
        location: "Monterrey, NL",
        date: "2023",
        description:
          "Complete upgrade of industrial electrical system including control panels, protections and energy monitoring system.",
        image: "/placeholder.svg?height=400&width=600&text=Electrical+System",
        tags: ["Electrical Systems", "Protections", "Energy Efficiency"],
        results: ["20% consumption reduction", "Zero electrical failures", "ROI in 18 months"],
      },
      {
        id: "smart-warehouse-automation",
        title: "Smart Warehouse Automation",
        client: "LogiSmart Warehouse",
        location: "Tijuana, BC",
        date: "2024",
        description:
          "Implementation of automated storage and retrieval system with AGVs and inventory management software.",
        image: "/placeholder.svg?height=400&width=600&text=Smart+Warehouse",
        tags: ["AGV", "WMS", "IoT", "Logistics"],
        results: ["50% time reduction", "95% inventory accuracy", "35% operational savings"],
      },
      {
        id: "automated-quality-control",
        title: "Automated Quality Control",
        client: "QualityFirst Manufacturing",
        location: "Puebla, PUE",
        date: "2023",
        description:
          "Automated inspection system with machine vision for quality control in electronic component production line.",
        image: "/placeholder.svg?height=400&width=600&text=Quality+Control",
        tags: ["Machine Vision", "Quality Control", "AI", "Manufacturing"],
        results: ["99.5% defect detection", "70% rejection reduction", "45% speed increase"],
      },
      {
        id: "water-treatment-system",
        title: "Water Treatment System",
        client: "AquaTech Environmental",
        location: "Cancun, QR",
        date: "2024",
        description:
          "Complete automation of wastewater treatment plant with remote control and environmental monitoring.",
        image: "/placeholder.svg?height=400&width=600&text=Water+Treatment",
        tags: ["Water Treatment", "Environmental", "Telemetry", "Sustainability"],
        results: ["100% regulatory compliance", "30% chemical savings", "24/7 monitoring"],
      },
    ],
  },
}

export default function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es

  return (
    <div className="min-h-screen pt-20">
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

        {/* Works Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-secondary rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Work Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-neutral mb-3">
                  <div className="flex items-center">
                    <HiCalendar className="w-4 h-4 mr-1" />
                    {work.date}
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker className="w-4 h-4 mr-1" />
                    {work.location}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-tertiary mb-2 line-clamp-2">{work.title}</h3>

                <div className="flex items-center text-sm text-primary mb-3">
                  <HiUsers className="w-4 h-4 mr-1" />
                  {work.client}
                </div>

                <p className="text-neutral text-sm mb-4 leading-relaxed line-clamp-3">{work.description}</p>

                {/* Results */}
                <div className="space-y-1 mb-6">
                  {work.results.slice(0, 2).map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-xs text-neutral">
                      <div className="w-1 h-1 bg-success rounded-full mr-2" />
                      {result}
                    </div>
                  ))}
                </div>

                <Link href={`/${lang}/trabajos/${work.id}`}>
                  <Button className="w-full btn-primary group text-sm">
                    {t.viewWork}
                    <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
