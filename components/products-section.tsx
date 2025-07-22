"use client"

import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"

const translations = {
  es: {
    title: "Nuestros Productos",
    subtitle: "Catálogo de Soluciones Tecnológicas",
    viewDetails: "Ver Detalles",
    viewCategories: "Ver Categorías",
    viewProducts: "Ver Productos",
    featured: "Destacado",
  },
  en: {
    title: "Our Products",
    subtitle: "Catalog of Technological Solutions",
    viewDetails: "View Details",
    viewCategories: "View Categories",
    viewProducts: "View Products",
    featured: "Featured",
  },
}

interface ProductsSectionProps {
  lang: string
}

export function ProductsSection({ lang }: ProductsSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es

  // Mostrar solo los primeros 6 productos destacados
  const featuredProducts = products.slice(0, 6)

  return (
    <section id="productos" className="py-20 bg-secondary">
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
          <p className="text-xl text-neutral max-w-3xl mx-auto mb-8">{t.subtitle}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/productos`}>
              <Button className="btn-primary">
                {t.viewCategories}
                <HiArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={`/${lang}/productos/catalogo`}>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
              >
                {t.viewProducts}
                <HiArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Featured Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {index < 3 && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t.featured}
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-tertiary mb-2">{product.name}</h3>
                <p className="text-neutral text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-neutral">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">${product.price.toLocaleString()}</div>
                  <Link href={`/${lang}/productos/producto/${product.id}`}>
                    <Button size="sm" className="btn-primary group">
                      {t.viewDetails}
                      <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
