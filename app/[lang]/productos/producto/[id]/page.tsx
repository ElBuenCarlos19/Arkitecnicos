"use client"

import { motion } from "framer-motion"
import { HiArrowLeft, HiShoppingCart, HiChat, HiCheckCircle, HiStar } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use, useState } from "react"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart"

const translations = {
  es: {
    backToProducts: "Volver a Productos",
    specifications: "Especificaciones Técnicas",
    features: "Características",
    addToCart: "Agregar al Carrito",
    talkToAdvisor: "Hablar con Asesor",
    productNotFound: "Producto no encontrado",
    addedToCart: "¡Agregado al carrito!",
    relatedProducts: "Productos Relacionados",
  },
  en: {
    backToProducts: "Back to Products",
    specifications: "Technical Specifications",
    features: "Features",
    addToCart: "Add to Cart",
    talkToAdvisor: "Talk to Advisor",
    productNotFound: "Product not found",
    addedToCart: "Added to cart!",
    relatedProducts: "Related Products",
  },
}

export default function ProductDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  const product = getProductById(id)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tertiary mb-4">{t.productNotFound}</h1>
          <Link href={`/${lang}/productos/catalogo`}>
            <Button className="btn-primary">Volver al Catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
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
          <Link href={`/${lang}/productos/catalogo`}>
            <Button variant="outline" className="group bg-transparent">
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t.backToProducts}
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-lg">
                ${product.price.toLocaleString()}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">{product.name}</h1>
              <p className="text-lg text-neutral leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-tertiary mb-4 flex items-center">
                <HiStar className="w-5 h-5 mr-2 text-primary" />
                {t.features}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-neutral">
                    <HiCheckCircle className="w-5 h-5 mr-3 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full btn-primary group relative"
                    disabled={showAddedMessage}
                  >
                    {showAddedMessage ? (
                      <>
                        <HiCheckCircle className="w-5 h-5 mr-2" />
                        {t.addedToCart}
                      </>
                    ) : (
                      <>
                        <HiShoppingCart className="w-5 h-5 mr-2" />
                        {t.addToCart}
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white group bg-transparent"
                  >
                    <HiChat className="w-5 h-5 mr-2" />
                    {t.talkToAdvisor}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-tertiary mb-8">{t.specifications}</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`p-6 ${index % 2 === 0 ? "bg-secondary" : "bg-white"} border-b border-gray-200 last:border-b-0`}
                >
                  <div className="font-semibold text-tertiary mb-1">{key}</div>
                  <div className="text-neutral">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
