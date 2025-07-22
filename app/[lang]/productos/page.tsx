"use client"

import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

const translations = {
  es: {
    title: "Nuestros Productos",
    subtitle: "Catálogo Completo de Soluciones de Automatización",
    viewCategory: "Ver Categoría",
    categories: [
      {
        slug: "motores-puertas-abatibles",
        title: "Motores para Puertas Abatibles",
        description:
          "Sistemas de automatización para puertas abatibles residenciales y comerciales con tecnología avanzada.",
        image: "/placeholder.svg?height=300&width=400&text=Puertas+Abatibles",
        productCount: "12 productos",
        features: ["Control remoto", "Sensores de seguridad", "Batería de respaldo", "Instalación profesional"],
      },
      {
        slug: "motores-puertas-garaje",
        title: "Motores para Puertas de Garaje",
        description: "Automatización completa para puertas de garaje con sistemas de seguridad integrados.",
        image: "/placeholder.svg?height=300&width=400&text=Puertas+Garaje",
        productCount: "8 productos",
        features: ["Apertura silenciosa", "Sistema anti-aplastamiento", "Control por smartphone", "Garantía extendida"],
      },
      {
        slug: "motores-puertas-corredizas",
        title: "Motores para Puertas Corredizas",
        description: "Soluciones de automatización para puertas corredizas industriales y residenciales.",
        image: "/placeholder.svg?height=300&width=400&text=Puertas+Corredizas",
        productCount: "15 productos",
        features: ["Alta durabilidad", "Velocidad variable", "Detección de obstáculos", "Mantenimiento mínimo"],
      },
      {
        slug: "motores-cortinas-enrollables",
        title: "Motores para Cortinas Enrollables",
        description: "Automatización de cortinas enrollables para protección solar y seguridad.",
        image: "/placeholder.svg?height=300&width=400&text=Cortinas+Enrollables",
        productCount: "10 productos",
        features: ["Control de luz", "Programación horaria", "Sensor de viento", "Operación silenciosa"],
      },
      {
        slug: "motores-puertas-peatonales",
        title: "Motores para Puertas Peatonales",
        description: "Sistemas de automatización para puertas peatonales con acceso controlado.",
        image: "/placeholder.svg?height=300&width=400&text=Puertas+Peatonales",
        productCount: "6 productos",
        features: ["Control de acceso", "Integración biométrica", "Registro de eventos", "Diseño compacto"],
      },
      {
        slug: "talanqueras",
        title: "Talanqueras",
        description: "Sistemas de control vehicular con talanqueras automáticas para estacionamientos y accesos.",
        image: "/placeholder.svg?height=300&width=400&text=Talanqueras",
        productCount: "9 productos",
        features: [
          "Reconocimiento de placas",
          "Integración con sistemas",
          "LED de señalización",
          "Construcción robusta",
        ],
      },
    ],
  },
  en: {
    title: "Our Products",
    subtitle: "Complete Catalog of Automation Solutions",
    viewCategory: "View Category",
    categories: [
      {
        slug: "motores-puertas-abatibles",
        title: "Swing Gate Motors",
        description: "Automation systems for residential and commercial swing gates with advanced technology.",
        image: "/placeholder.svg?height=300&width=400&text=Swing+Gates",
        productCount: "12 products",
        features: ["Remote control", "Safety sensors", "Battery backup", "Professional installation"],
      },
      {
        slug: "motores-puertas-garaje",
        title: "Garage Door Motors",
        description: "Complete automation for garage doors with integrated security systems.",
        image: "/placeholder.svg?height=300&width=400&text=Garage+Doors",
        productCount: "8 products",
        features: ["Silent operation", "Anti-crush system", "Smartphone control", "Extended warranty"],
      },
      {
        slug: "motores-puertas-corredizas",
        title: "Sliding Gate Motors",
        description: "Automation solutions for industrial and residential sliding gates.",
        image: "/placeholder.svg?height=300&width=400&text=Sliding+Gates",
        productCount: "15 products",
        features: ["High durability", "Variable speed", "Obstacle detection", "Minimal maintenance"],
      },
      {
        slug: "motores-cortinas-enrollables",
        title: "Rolling Shutter Motors",
        description: "Automation of rolling shutters for sun protection and security.",
        image: "/placeholder.svg?height=300&width=400&text=Rolling+Shutters",
        productCount: "10 products",
        features: ["Light control", "Time programming", "Wind sensor", "Silent operation"],
      },
      {
        slug: "motores-puertas-peatonales",
        title: "Pedestrian Door Motors",
        description: "Automation systems for pedestrian doors with controlled access.",
        image: "/placeholder.svg?height=300&width=400&text=Pedestrian+Doors",
        productCount: "6 products",
        features: ["Access control", "Biometric integration", "Event logging", "Compact design"],
      },
      {
        slug: "talanqueras",
        title: "Barrier Gates",
        description: "Vehicle control systems with automatic barriers for parking lots and access points.",
        image: "/placeholder.svg?height=300&width=400&text=Barrier+Gates",
        productCount: "9 products",
        features: ["License plate recognition", "System integration", "LED signaling", "Robust construction"],
      },
    ],
  },
}

export default function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t = translations[lang as keyof typeof translations] || translations.es

  return (
    <div className="min-h-screen pt-20">
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
          {t.categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Category Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category.productCount}
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-tertiary mb-2">{category.title}</h3>
                <p className="text-neutral text-sm mb-4 leading-relaxed">{category.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-neutral">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href={`/${lang}/productos/${category.slug}`}>
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
