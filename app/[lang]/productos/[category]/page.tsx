"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiStar, HiArrowLeft } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"
import { getProductsByCategory } from "@/lib/products"
import { products } from "@/lib/products"

const categoryData = {
  "motores-puertas-abatibles": {
    es: {
      title: "Motores para Puertas Abatibles",
      description: "Sistemas de automatización profesionales para puertas abatibles residenciales y comerciales",
      products: [
        {
          name: "Motor Abatible Pro 400",
          description: "Motor de alta potencia para puertas abatibles de hasta 400kg por hoja",
          image: "/placeholder.svg?height=300&width=400&text=Motor+Pro+400",
          features: ["Potencia 400W", "Control remoto incluido", "Sensores de seguridad", "Batería de respaldo"],
          price: "Desde $1,200",
          featured: true,
        },
        {
          name: "Motor Abatible Eco 250",
          description: "Solución económica para puertas residenciales de hasta 250kg por hoja",
          image: "/placeholder.svg?height=300&width=400&text=Motor+Eco+250",
          features: ["Potencia 250W", "Instalación sencilla", "Garantía 2 años", "Bajo consumo"],
          price: "Desde $800",
          featured: false,
        },
      ],
    },
    en: {
      title: "Swing Gate Motors",
      description: "Professional automation systems for residential and commercial swing gates",
      products: [
        {
          name: "Swing Motor Pro 400",
          description: "High-power motor for swing gates up to 400kg per leaf",
          image: "/placeholder.svg?height=300&width=400&text=Motor+Pro+400",
          features: ["400W Power", "Remote control included", "Safety sensors", "Battery backup"],
          price: "From $1,200",
          featured: true,
        },
        {
          name: "Swing Motor Eco 250",
          description: "Economic solution for residential gates up to 250kg per leaf",
          image: "/placeholder.svg?height=300&width=400&text=Motor+Eco+250",
          features: ["250W Power", "Easy installation", "2-year warranty", "Low consumption"],
          price: "From $800",
          featured: false,
        },
      ],
    },
  },
  // Agregar más categorías aquí...
}

export default function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = use(params)
  const data = categoryData[category as keyof typeof categoryData]
  const categoryProducts = getProductsByCategory(category)
  const t = data?.[lang as keyof typeof data] || {
    title: categoryProducts[0]?.category || "Categoría",
    description: "Productos de automatización profesional",
    products: categoryProducts,
  }

  if (!t) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tertiary mb-4">Categoría no encontrada</h1>
          <Link href={`/${lang}/productos`}>
            <Button className="btn-primary">Volver a Productos</Button>
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">{t.title}</h1>
          <p className="text-xl text-neutral max-w-3xl mx-auto">{t.description}</p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
                {product.features && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <HiStar className="w-4 h-4 mr-1" />
                    Destacado
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-tertiary mb-2">{product.name}</h3>
                <p className="text-neutral text-sm mb-4 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-neutral">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">{product.price}</div>
                  <Link href={`/${lang}/productos/producto/${product.id}`}>
                    <Button size="sm" className="btn-primary group">
                      Ver Detalles
                      <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
