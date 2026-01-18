"use client"

import { motion } from "framer-motion"
import { HiArrowRight, HiLightningBolt } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

const translations = {
  es: {
    title: "Arkitecnicos",
    subtitle: "WALL S.A.S",
    innovation: "Innovación Tecnológica",
    description:
      "Transformamos procesos industriales con tecnología de vanguardia. Más de 15 años automatizando el éxito de nuestros clientes.",
    cta1: "Conocer Servicios",
    cta2: "Ver Productos",
    prevwords: "Contamos con ",
    words: [
      "Puertas Abatibles",
      "Puertas de Garaje",
      "Puertas Corredizas",
      "Cortinas Enrollables",
      "Puertas Peatonales",
      "Talanqueras",
      "Cercados electricos",
    ],
  },
  en: {
    title: "Industrial Automation",
    subtitle: "of the Future",
    innovation: "Innovative Technology",
    description:
      "We transform industrial processes with cutting-edge technology. Over 15 years automating our clients' success.",
    cta1: "Our Services",
    cta2: "View Products",
    prevwords: "We have ",
    words: [
      "Swing Doors",
      "Garage Doors",
      "Sliding Doors",
      "Roller Blinds",
      "Pedestrian Doors",
      "Boom Barriers",
      "Electric Barriers",
    ],
  },
}

interface HeroSectionProps {
  lang: string
}

const animatedElements = [
  { left: "10%", top: "20%", duration: 3 },
  { left: "95%", top: "30%", duration: 4 },
  { left: "15%", top: "60%", duration: 3.5 },
  { left: "40%", top: "70%", duration: 4.5 },
  { left: "30%", top: "30%", duration: 3.2 },
  { left: "50%", top: "45%", duration: 4.2 },
  { left: "10%", top: "50%", duration: 4.2 },
  { left: "90%", top: "60%", duration: 4.2 },
]

export function HeroSection({ lang }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)
  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center overflow-hidden py-0 px-4 sm:px-6 lg:pr-20 bg-[#212529]"
    >
      {/* Right Side Video Background - Width 35% for vertical video feel */}
      <div className="absolute top-0 right-0 w-full lg:w-[35%] h-full z-0 pointer-events-none">
        {/* Enhanced Gradient to blend video seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#212529] via-[#212529]/60 to-transparent z-10 w-[40%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#212529] via-transparent to-transparent z-10 h-[20%] bottom-0 top-auto" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#212529] via-transparent to-transparent z-10 h-[20%]" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <img src="/image.png" alt="Hero Background" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Modern Ambient Blobs - Focused Red and White Palette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Stronger Red Glow top right/center */}
        <div className="absolute top-[-20%] right-[30%] w-[800px] h-[800px] bg-[#cc232c]/10 rounded-full blur-[130px] mix-blend-screen animate-pulse" />
        {/* Subtle White Glow bottom left */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] mix-blend-overlay" />

        {/* Additional Blobs for Depth */}
        {/* Small Red Blob bottom right */}
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#cc232c]/10 rounded-full blur-[80px] mix-blend-screen" />
        {/* White Blob top left */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[90px] mix-blend-overlay" />
        {/* Center-Left Red Accent */}
        <div className="absolute top-[40%] left-[20%] w-[250px] h-[250px] bg-[#cc232c]/5 rounded-full blur-[60px] mix-blend-screen" />
      </div>

      {mounted && (
        <div className="absolute inset-0 z-0">
          {animatedElements.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? "bg-[#cc232c]" : "bg-white"}`}
              style={{
                left: element.left,
                top: element.top,
                width: i % 3 === 0 ? "4px" : "2px",
                height: i % 3 === 0 ? "4px" : "2px",
                opacity: 0.3
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: element.duration + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-20 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Left Content - Expanded to take more space since video is narrow */}
          <div className="text-white col-span-1 lg:col-span-8 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-fit"
            >
              <div className="absolute -inset-4 bg-[#cc232c]/20 blur-xl rounded-full opacity-50" />
              <Image
                src={"/logo.png"}
                alt="Logo Arkitecnicos"
                width={90}
                height={90}
                className="relative rounded-2xl mb-2"
              />
            </motion.div>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="p-1.5 bg-[#cc232c]/10 rounded-lg backdrop-blur-sm border border-[#cc232c]/20">
                  <HiLightningBolt className="w-4 h-4 text-[#cc232c]" />
                </div>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-300 border-l-2 border-[#cc232c] pl-3">
                  {t.innovation}
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block text-white"
                >
                  {t.title}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="block text-[#cc232c] mt-1"
                >
                  {t.subtitle}
                </motion.span>
              </h1>

              <div className="flex flex-col space-y-4">
                <div className="h-12 sm:h-16 flex items-center">
                  <TypewriterEffect t={t} />
                </div>

                {/* Separator Line moved here */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="w-24 h-1 bg-[#cc232c] rounded-full origin-left"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed"
                >
                  {t.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href={`/${lang}/servicios`}>
                    <Button className="h-12 px-8 text-base bg-[#cc232c] text-white hover:bg-[#a01b22] rounded-full shadow-[0_0_20px_rgba(204,35,44,0.4)] transition-all duration-300 w-full sm:w-auto border-none">
                      {t.cta1}
                      <HiArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href={`/${lang}/productos`}>
                    <Button
                      variant="outline"
                      className="h-12 px-8 text-base border-white/30 text-white hover:bg-white/10 backdrop-blur-md rounded-full w-full sm:w-auto"
                    >
                      {t.cta2}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            {/* Statistics removed to prevent overflow and improve layout focus */}
          </div>

          {/* Empty column for spacing */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>
      </div>
    </section>
  )
}

function TypewriterEffect({ t }: { t: (typeof translations)["es"] }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const typingSpeed = isDeleting ? 50 : 100
  const pauseTime = 1000

  useEffect(() => {
    const currentWord = t.words[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex <= currentWord.length) {
      setDisplayText(currentWord.slice(0, charIndex))
      timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed)
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(currentWord.slice(0, charIndex))
      timeout = setTimeout(() => setCharIndex((c) => c - 1), typingSpeed)
    } else {
      timeout = setTimeout(() => {
        if (!isDeleting) {
          setIsDeleting(true)
        } else {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % t.words.length)
        }
      }, pauseTime)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, t.words])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.0 }}
      className="inline-block text-white px-0 py-2 font-bold whitespace-nowrap text-xl sm:text-2xl leading-relaxed tracking-wide"
    >
      {t.prevwords}
      {charIndex > 0 && <span className="text-[#cc232c] border-r-2 border-[#cc232c] animate-blink ml-1">{displayText}</span>}
    </motion.span>
  )
}
