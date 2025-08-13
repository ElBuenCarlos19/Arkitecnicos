"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiArrowLeft, HiFilter } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use, useState, useEffect } from "react"
import { getAllProductsCategory } from "@/lib/db/products_category"
import { getProductsWithCategoryName } from "@/lib/db/products"
import type { ProductCategory, ProductWithCategoryName } from "@/lib/types/product"

const translations = {
  es: {
    title: "Catálogo Completo",
    subtitle: "Todos Nuestros Productos de Automatización",
    viewDetails: "Ver Detalles",
    allCategories: "Todas las Categorías",
    filterBy: "Filtrar por:",
    productsFound: "productos encontrados",
    loading: "Cargando productos...",
    error: "Error al cargar productos",
    noProducts: "No se encontraron productos",
  },
  en: {
    title: "Complete Catalog",
    subtitle: "All Our Automation Products",
    viewDetails: "View Details",
    allCategories: "All Categories",
    filterBy: "Filter by:",
    productsFound: "products found",
    loading: "Loading products...",
    error: "Error loading products",
    noProducts: "No products found",
  },
}

export default function CatalogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [products, setProducts] = useState<ProductWithCategoryName[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.products_category?.idname === selectedCategory)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [categoriesData, productsData] = await Promise.all([
          getAllProductsCategory(),
          getProductsWithCategoryName(),
        ])

        setCategories(categoriesData)
        setProducts(productsData)
      } catch (err) {
        console.error("Error loading data:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    loadData()
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
    <div className="min-h-screen pt-20">
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
              Volver a Productos
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h1>
          <p className="text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 p-6 bg-secondary rounded-2xl">
            <div className="flex items-center text-tertiary font-medium">
              <HiFilter className="w-5 h-5 mr-2" />
              {t.filterBy}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "btn-primary" : ""}
              >
                {t.allCategories}
              </Button>

              {categories.map((category) => (
                <Button
                  key={category.idname}
                  variant={selectedCategory === category.idname ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.idname)}
                  className={selectedCategory === category.idname ? "btn-primary" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-neutral">
            {filteredProducts.length} {t.productsFound}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral text-lg">{t.noProducts}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={product.images_url?.[0] || "/placeholder.svg?height=200&width=300&text=Producto"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.products_category && (
                    <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs">
                      {product.products_category.name}
                    </div>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-tertiary mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-neutral text-sm mb-3 leading-relaxed line-clamp-2">{product.description}</p>

                  {/* Key Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {product.features.slice(0, 2).map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-center text-xs text-neutral">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <Link href={`/${lang}/productos/producto/${product.idname}`}>
                      <Button size="sm" className="btn-primary group text-xs px-3 py-1">
                        {t.viewDetails}
                        <HiArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
