"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiLightningBolt, HiShieldCheck } from "react-icons/hi"
import { FaAward } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

const translations = {
  es: {
    title: "Automatización Industrial",
    subtitle: "del Futuro",
    description:
      "Transformamos procesos industriales con tecnología de vanguardia. Más de 15 años automatizando el éxito de nuestros clientes.",
    cta1: "Conocer Servicios",
    cta2: "Ver Productos",
    stats: {
      projects: "Proyectos",
      experience: "Años",
      clients: "Clientes",
    },
  },
  en: {
    title: "Industrial Automation",
    subtitle: "of the Future",
    description:
      "We transform industrial processes with cutting-edge technology. Over 15 years automating our clients' success.",
    cta1: "Our Services",
    cta2: "View Products",
    stats: {
      projects: "Projects",
      experience: "Years",
      clients: "Clients",
    },
  },
}

interface HeroSectionProps {
  lang: string
}

// Posiciones fijas para los elementos animados
const animatedElements = [
  { left: "10%", top: "20%", duration: 3 },
  { left: "80%", top: "15%", duration: 4 },
  { left: "15%", top: "60%", duration: 3.5 },
  { left: "70%", top: "70%", duration: 4.5 },
  { left: "30%", top: "30%", duration: 3.2 },
  { left: "85%", top: "45%", duration: 4.2 },
]

export function HeroSection({ lang }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)
  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 gradient-bg">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      </div>

      {/* Animated background elements */}
      {mounted && (
        <div className="absolute inset-0">
          {animatedElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: element.left,
                top: element.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: element.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-accent">
                <HiLightningBolt className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Innovación Tecnológica</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">{t.title}</span>
                <span className="block text-accent">{t.subtitle}</span>
              </h1>

              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">{t.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/${lang}/servicios`}>
                    <Button className="btn-primary group">
                      {t.cta1}
                      <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/${lang}/productos`}>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black group bg-transparent"
                    >
                      {t.cta2}
                      <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 mt-6 border-t border-white/20"
            >
              {[
                { number: "150+", label: t.stats.projects },
                { number: "15+", label: t.stats.experience },
                { number: "98%", label: t.stats.clients },
              ].map((stat, index) => (
                <div key={index} className="text-center ">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-accent "
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500&text=Automatización+Industrial"
                alt="Automatización Industrial"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
              >
                <HiShieldCheck className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 -left-4 bg-accent rounded-full p-4 shadow-lg"
              >
                <FaAward className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll</span>
          <div className="w-px h-8 bg-white/50" />
        </div>
      </motion.div>
    </section>
  )
}
