"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiCalendar, HiLocationMarker, HiUsers } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getWorks } from "@/lib/db/works"
import type { Work } from "@/lib/types/product"

const translations = {
  es: {
    title: "Nuestros Trabajos",
    subtitle: "Casos de Éxito y Proyectos Realizados",
    viewWork: "Ver Trabajo",
    viewAll: "Ver Todos los Trabajos",
    loading: "Cargando trabajos...",
    keyResults: "Resultados Clave:",
  },
  en: {
    title: "Our Works",
    subtitle: "Success Stories and Completed Projects",
    viewWork: "View Work",
    viewAll: "View All Works",
    loading: "Loading works...",
    keyResults: "Key Results:",
  },
}

interface WorksSectionProps {
  lang: string
}

export function WorksSection({ lang }: WorksSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const data = await getWorks()
        setWorks(data.slice(0, 4)) // Mostrar solo los primeros 4 trabajos
      } catch (error) {
        console.error("Error loading works:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWorks()
  }, [])

  if (loading) {
    return (
      <section id="trabajos" className="py-20 bg-white lg:pr-20">
        <div className="container-custom section-padding">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="trabajos" className="py-20 bg-white lg:pr-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h2>
          <p className="text-lg sm:text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Works Grid */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-secondary rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Work Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={work.image_urls?.[0] || "/placeholder.svg?height=300&width=600&text=Trabajo"}
                  alt={work.name}
                  width={600}
                  height={300}
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.1 }}
                        className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work Content */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral mb-3">
                  <div className="flex items-center">
                    <HiCalendar className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{work.date}</span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{work.location}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-tertiary mb-2 line-clamp-2">{work.name}</h3>

                <div className="flex items-center text-sm text-primary mb-3">
                  <HiUsers className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{work.client}</span>
                </div>

                <p className="text-neutral text-sm mb-4 leading-relaxed line-clamp-3">{work.description}</p>

                {/* Results */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-tertiary text-sm">{t.keyResults}</h4>
                  {work.results.slice(0, 3).map((result, resultIndex) => (
                    <motion.div
                      key={resultIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: resultIndex * 0.1 }}
                      className="flex items-center text-sm text-neutral"
                    >
                      <div className="w-1.5 h-1.5 bg-success rounded-full mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{result}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href={`/${lang}/trabajos/${work.idname}`}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full btn-primary group">
                      {t.viewWork}
                      <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${lang}/trabajos`}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="btn-primary group">
                {t.viewAll}
                <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
