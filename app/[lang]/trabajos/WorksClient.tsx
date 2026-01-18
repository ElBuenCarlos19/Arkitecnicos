"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiCalendar, HiLocationMarker, HiUsers } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Work } from "@/lib/types/product"

const translations = {
    es: {
        title: "Todos Nuestros Trabajos",
        subtitle: "Portafolio Completo de Proyectos Realizados",
        viewWork: "Ver Trabajo",
        noWorks: "No se encontraron trabajos",
        keyResults: "Resultados Clave:",
    },
    en: {
        title: "All Our Works",
        subtitle: "Complete Portfolio of Completed Projects",
        viewWork: "View Work",
        noWorks: "No works found",
        keyResults: "Key Results:",
    },
}

interface WorksClientProps {
    works: Work[]
    lang: string
}

export function WorksClient({ works, lang }: WorksClientProps) {
    const t = translations[lang as keyof typeof translations] || translations.es

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:pr-20">
            <div className="container-custom section-padding py-12 sm:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h1>
                    <p className="text-lg sm:text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
                </motion.div>

                {/* Works Grid */}
                {works.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral text-lg">{t.noWorks}</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {works.map((work, index) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-secondary rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                            >
                                {/* Work Image */}
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={work.image_urls?.[0] || "/placeholder.svg?height=300&width=400&text=Trabajo"}
                                        alt={work.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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

                                    <h3 className="text-lg font-bold text-tertiary mb-2 line-clamp-2">{work.name}</h3>

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
                )}
            </div>
        </div>
    )
}
