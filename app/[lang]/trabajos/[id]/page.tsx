"use client"

import { motion } from "framer-motion"
import { HiArrowLeft, HiCalendar, HiLocationMarker, HiUsers, HiCheckCircle } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use, useState, useEffect } from "react"
import { getWorkByIdname } from "@/lib/db/works"
import type { Work } from "@/lib/types/product"

const translations = {
  es: {
    backToWorks: "Volver a Trabajos",
    challenge: "El Desafío",
    solution: "La Solución",
    results: "Resultados Obtenidos",
    technologies: "Tecnologías Utilizadas",
    contactCTA: "¿Tienes un proyecto similar?",
    contactDescription: "Contáctanos para discutir cómo podemos ayudarte a automatizar tus procesos.",
    contactNow: "Contactar Ahora",
    workNotFound: "Trabajo no encontrado",
    loading: "Cargando trabajo...",
    error: "Error al cargar trabajo",
  },
  en: {
    backToWorks: "Back to Works",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "Results Achieved",
    technologies: "Technologies Used",
    contactCTA: "Do you have a similar project?",
    contactDescription: "Contact us to discuss how we can help you automate your processes.",
    contactNow: "Contact Now",
    workNotFound: "Work not found",
    loading: "Loading work...",
    error: "Error loading work",
  },
}

export default function WorkDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es

  const [work, setWork] = useState<Work | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWork = async () => {
      try {
        setLoading(true)
        setError(null)
        const workData = await getWorkByIdname(id)
        setWork(workData)
      } catch (err) {
        console.error("Error loading work:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    loadWork()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral">{t.loading}</p>
        </div>
      </div>
    )
  }

  if (error || !work) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tertiary mb-4">{t.workNotFound}</h1>
          <p className="text-neutral mb-4">{error}</p>
          <Link href={`/${lang}/trabajos`}>
            <Button className="btn-primary">Volver a Trabajos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:pr-20">
      <div className="container-custom section-padding py-12 sm:py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href={`/${lang}/trabajos`}>
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t.backToWorks}
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4 sm:mb-6">
            {work.name}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 text-neutral mb-4 sm:mb-6">
            <div className="flex items-center">
              <HiUsers className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
              <span className="truncate">{work.client}</span>
            </div>
            <div className="flex items-center">
              <HiLocationMarker className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
              <span className="truncate">{work.location}</span>
            </div>
            <div className="flex items-center">
              <HiCalendar className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
              <span>{work.date}</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-neutral leading-relaxed max-w-4xl">{work.description}</p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <Image
            src={work.image_urls?.[0] || "/placeholder.svg?height=600&width=1200&text=Trabajo"}
            alt={work.name}
            width={1200}
            height={600}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-tertiary mb-4">{t.challenge}</h2>
              <p className="text-neutral leading-relaxed">
                Este proyecto presentó desafíos únicos que requirieron soluciones innovadoras y un enfoque personalizado
                para cumplir con los objetivos del cliente.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-tertiary mb-4">{t.solution}</h2>
              <p className="text-neutral leading-relaxed">
                Implementamos una solución integral que combinó tecnología de vanguardia con metodologías probadas,
                asegurando resultados excepcionales y superando las expectativas del cliente.
              </p>
            </motion.div>

            {/* Additional Images */}
            {work.image_urls && work.image_urls.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid sm:grid-cols-2 gap-4 sm:gap-6"
              >
                {work.image_urls.slice(1, 3).map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${work.name} - Imagen ${index + 2}`}
                    width={400}
                    height={300}
                    className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-md"
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg sm:text-xl font-bold text-tertiary mb-4">{t.technologies}</h3>
              <div className="space-y-2">
                {work.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-sm text-neutral"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    <span>{tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg sm:text-xl font-bold text-tertiary mb-4">{t.results}</h3>
              <div className="space-y-3">
                {work.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-sm text-neutral"
                  >
                    <HiCheckCircle className="w-5 h-5 mr-3 text-success flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{result}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-primary p-4 sm:p-6 rounded-2xl text-white"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3">{t.contactCTA}</h3>
              <p className="text-sm mb-4 opacity-90 leading-relaxed">{t.contactDescription}</p>
              <Link href={`/${lang}#contacto`}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">{t.contactNow}</Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
