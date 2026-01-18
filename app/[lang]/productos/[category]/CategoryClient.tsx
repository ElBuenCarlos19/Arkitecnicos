"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiArrowLeft } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { ProductWithCategoryName, ProductCategory } from "@/lib/types/product"

const translations = {
    es: {
        backToProducts: "Volver a Productos",
        viewDetails: "Ver Detalles",
        noProducts: "No se encontraron productos en esta categoría",
        categoryNotFound: "Categoría no encontrada",
    },
    en: {
        backToProducts: "Back to Products",
        viewDetails: "View Details",
        noProducts: "No products found in this category",
        categoryNotFound: "Category not found",
    },
}

interface CategoryClientProps {
    products: ProductWithCategoryName[]
    categoryInfo: ProductCategory | null
    lang: string
    error?: string | null
}

export function CategoryClient({ products, categoryInfo, lang, error }: CategoryClientProps) {
    const t = translations[lang as keyof typeof translations] || translations.es

    if (error || !categoryInfo) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-tertiary mb-4">{t.categoryNotFound}</h1>
                    <p className="text-neutral mb-4">{error}</p>
                    <Link href={`/${lang}/productos`}>
                        <Button className="btn-primary">Volver a Productos</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 pr-16">
            <div className="container-custom section-padding py-20">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <Link href={`/${lang}/productos`}>
                        <Button variant="outline" className="group bg-transparent">
                            <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            {t.backToProducts}
                        </Button>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">{categoryInfo.name}</h1>
                    <p className="text-xl text-neutral max-w-3xl mx-auto">{categoryInfo.description}</p>

                    {/* Category Features */}
                    {categoryInfo.items && categoryInfo.items.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {categoryInfo.items.map((item, index) => (
                                <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral text-lg">{t.noProducts}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={product.images_url?.[0] || "/placeholder.svg?height=300&width=400&text=Producto"}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Product Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-tertiary mb-2">{product.name}</h3>
                                    <p className="text-neutral text-sm mb-4 leading-relaxed line-clamp-3">{product.description}</p>

                                    {/* Features */}
                                    {product.features && product.features.length > 0 && (
                                        <div className="space-y-2 mb-6">
                                            {product.features.slice(0, 3).map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center text-sm text-neutral">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Link href={`/${lang}/productos/producto/${product.idname}`}>
                                        <Button className="w-full btn-primary group">
                                            {t.viewDetails}
                                            <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
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
