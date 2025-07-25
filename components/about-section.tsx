"use client"

import { motion } from "framer-motion"
import {  HiEye, HiHeart, HiUsers, HiLightBulb, HiCog } from "react-icons/hi"
import { FiTarget } from "react-icons/fi"
import Image from "next/image"

const translations = {
  es: {
    title: "Quienes Somos",
    subtitle: "Líderes en Automatización Industrial",
    description:
      "Dentro de las expectativas de un País en desarrollo se fundó ARKITECNICOS WALL SAS, una Empresa con toda la experiencia en el área de la Arquitectura, Construcción, Remodelación, Servicios en acabados arquitectónicos e integrales, Mantenimiento, Reparaciones en todas las actividades integrales de la cadena del proceso constructivo.",
    mission: {
      title: "Nuestra Misión",
      description:
        "Proporcionar soluciones de automatización industrial innovadoras y confiables que optimicen los procesos productivos de nuestros clientes.",
    },
    vision: {
      title: "Nuestra Visión",
      description:
        "Ser la empresa de referencia en automatización industrial, reconocida por nuestra excelencia técnica e innovación constante.",
    },
    values: {
      title: "Nuestros Valores",
      items: [
        { icon: HiHeart, title: "Compromiso", description: "Dedicación total con cada proyecto y cliente" },
        { icon: HiLightBulb, title: "Innovación", description: "Búsqueda constante de soluciones creativas" },
        { icon: HiUsers, title: "Trabajo en Equipo", description: "Colaboración y sinergia en cada proceso" },
        { icon: HiCog, title: "Excelencia", description: "Calidad superior en todos nuestros servicios" },
      ],
    },
  },
  en: {
    title: "About Us",
    subtitle: "Leaders in Industrial Automation",
    description:
      "With over 15 years of experience, Arkitécnicos has established itself as a leading company in the development of industrial automation solutions. Our team of specialized engineers works daily to transform industrial processes through cutting-edge technology.",
    mission: {
      title: "Our Mission",
      description:
        "To provide innovative and reliable industrial automation solutions that optimize our clients' production processes.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the reference company in industrial automation, recognized for our technical excellence and constant innovation.",
    },
    values: {
      title: "Our Values",
      items: [
        { icon: HiHeart, title: "Commitment", description: "Total dedication to every project and client" },
        { icon: HiLightBulb, title: "Innovation", description: "Constant search for creative solutions" },
        { icon: HiUsers, title: "Teamwork", description: "Collaboration and synergy in every process" },
        { icon: HiCog, title: "Excellence", description: "Superior quality in all our services" },
      ],
    },
  },
}

interface AboutSectionProps {
  lang: string
}

export function AboutSection({ lang }: AboutSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es

  return (
    <section id="nosotros" className="py-20 bg-secondary">
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
          <p className="text-xl text-neutral max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/team.png"
              alt="Arkitécnicos Team"
              width={500}
              height={300}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-neutral leading-relaxed">{t.description}</p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-neutral">Trabajos Completados</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-neutral">Años de Experiencia</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <FiTarget  className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-tertiary">{t.mission.title}</h3>
            </div>
            <p className="text-neutral leading-relaxed">{t.mission.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <HiEye className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-tertiary">{t.vision.title}</h3>
            </div>
            <p className="text-neutral leading-relaxed">{t.vision.description}</p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-tertiary mb-12">{t.values.title}</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-tertiary mb-2">{value.title}</h4>
                <p className="text-sm text-neutral">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
