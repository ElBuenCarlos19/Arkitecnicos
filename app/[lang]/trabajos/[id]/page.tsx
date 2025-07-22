"use client"

import { motion } from "framer-motion"
import { HiArrowLeft, HiCalendar, HiLocationMarker, HiUsers, HiCheckCircle } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

const worksData = {
  "automatizacion-linea-automotriz": {
    es: {
      title: "Automatización Línea de Producción Automotriz",
      client: "AutoTech Industries",
      location: "México, CDMX",
      date: "2024",
      duration: "8 meses",
      description:
        "Implementación completa de sistema automatizado para línea de ensamble de vehículos, incluyendo robots colaborativos y sistema de control centralizado que revolucionó la producción de la planta.",
      challenge:
        "La planta de AutoTech Industries enfrentaba problemas de eficiencia en su línea de producción, con altos tiempos de ciclo y errores frecuentes que afectaban la calidad del producto final.",
      solution:
        "Diseñamos e implementamos un sistema integral de automatización que incluye robots colaborativos, sistemas de visión artificial, control PLC centralizado y monitoreo en tiempo real.",
      images: [
        "/placeholder.svg?height=400&width=600&text=Línea+Automatizada",
        "/placeholder.svg?height=400&width=600&text=Robots+Colaborativos",
        "/placeholder.svg?height=400&width=600&text=Sistema+Control",
      ],
      technologies: ["Robótica Colaborativa", "PLC Siemens", "SCADA", "Visión Artificial", "Industria 4.0"],
      results: [
        "40% aumento en productividad",
        "60% reducción de errores",
        "25% ahorro energético",
        "ROI alcanzado en 14 meses",
        "Certificación ISO 9001",
      ],
      phases: [
        {
          title: "Análisis y Diseño",
          description: "Evaluación completa de la línea existente y diseño del nuevo sistema",
          duration: "2 meses",
        },
        {
          title: "Implementación",
          description: "Instalación de equipos y programación de sistemas",
          duration: "4 meses",
        },
        {
          title: "Pruebas y Optimización",
          description: "Pruebas exhaustivas y optimización del sistema",
          duration: "1.5 meses",
        },
        {
          title: "Capacitación y Entrega",
          description: "Capacitación del personal y entrega oficial del proyecto",
          duration: "0.5 meses",
        },
      ],
    },
  },
  // Agregar más trabajos aquí...
}

export default function WorkDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = use(params)
  const work = worksData[id as keyof typeof worksData]
  const t = work?.[lang as keyof typeof work] || work?.es

  if (!t) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tertiary mb-4">Trabajo no encontrado</h1>
          <Link href={`/${lang}#trabajos`}>
            <Button className="btn-primary">Volver a Trabajos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href={`/${lang}#trabajos`}>
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver a Trabajos
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">{t.title}</h1>

          <div className="flex flex-wrap gap-6 text-neutral mb-6">
            <div className="flex items-center">
              <HiUsers className="w-5 h-5 mr-2 text-primary" />
              {t.client}
            </div>
            <div className="flex items-center">
              <HiLocationMarker className="w-5 h-5 mr-2 text-primary" />
              {t.location}
            </div>
            <div className="flex items-center">
              <HiCalendar className="w-5 h-5 mr-2 text-primary" />
              {t.date} • {t.duration}
            </div>
          </div>

          <p className="text-lg text-neutral leading-relaxed max-w-4xl">{t.description}</p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Image
            src={t.images[0] || "/placeholder.svg"}
            alt={t.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-tertiary mb-4">El Desafío</h2>
              <p className="text-neutral leading-relaxed">{t.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-tertiary mb-4">La Solución</h2>
              <p className="text-neutral leading-relaxed">{t.solution}</p>
            </motion.div>

            {/* Project Phases */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-tertiary mb-6">Fases del Proyecto</h2>
              <div className="space-y-4">
                {t.phases.map((phase, index) => (
                  <div key={index} className="bg-secondary p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-tertiary">{phase.title}</h3>
                      <span className="text-sm text-primary font-medium">{phase.duration}</span>
                    </div>
                    <p className="text-neutral text-sm">{phase.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Images */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-tertiary mb-6">Galería del Proyecto</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${t.title} - Imagen ${index + 2}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-xl shadow-md"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-bold text-tertiary mb-4">Tecnologías Utilizadas</h3>
              <div className="space-y-2">
                {t.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center text-sm text-neutral">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-bold text-tertiary mb-4">Resultados Obtenidos</h3>
              <div className="space-y-3">
                {t.results.map((result, index) => (
                  <div key={index} className="flex items-center text-sm text-neutral">
                    <HiCheckCircle className="w-5 h-5 mr-3 text-success flex-shrink-0" />
                    {result}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-primary p-6 rounded-2xl text-white"
            >
              <h3 className="text-xl font-bold mb-3">¿Tienes un proyecto similar?</h3>
              <p className="text-sm mb-4 opacity-90">
                Contáctanos para discutir cómo podemos ayudarte a automatizar tus procesos.
              </p>
              <Link href={`/${lang}#contacto`}>
                <Button className="w-full bg-white text-primary hover:bg-gray-100">Contactar Ahora</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
