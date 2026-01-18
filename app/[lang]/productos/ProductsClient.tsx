"use client"

import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { ProductCategory } from "@/lib/types/product"

const translations = {
    es: {
        title: "Nuestros Productos",
        subtitle: "Catálogo Completo de Soluciones de Automatización",
        viewCategory: "Ver Categoría",
    },
    en: {
        title: "Our Products",
        subtitle: "Complete Catalog of Automation Solutions",
        viewCategory: "View Category",
    },
}

interface ProductsClientProps {
    categories: ProductCategory[]
    lang: string
}

export function ProductsClient({ categories, lang }: ProductsClientProps) {
    const t = translations[lang as keyof typeof translations] || translations.es

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

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.idname}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                            {/* Category Image */}
                            <div className="relative overflow-hidden">
                                <Image
                                    src={category.image_url || "/placeholder.svg"}
                                    alt={category.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Category Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-tertiary mb-2">{category.name}</h3>
                                <p className="text-neutral text-sm mb-4 leading-relaxed">{category.description}</p>

                                {/* Features */}
                                <div className="space-y-2 mb-6">
                                    {category.items.map((feature: string, featureIndex: number) => (
                                        <div key={featureIndex} className="flex items-center text-sm text-neutral">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Link href={`/${lang}/productos/${category.idname}`}>
                                    <Button className="w-full btn-primary group">
                                        {t.viewCategory}
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
