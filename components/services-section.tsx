"use client"

import { motion } from "framer-motion"
import { HiCog, HiChip, HiArrowRight } from "react-icons/hi"
import { FaWrench } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const translations = {
  es: {
    title: "Servicios Destacados",
    subtitle: "Nuestras Especialidades Principales",
    cta: "Solicitar Cotización",
    viewAll: "Ver Todos los Servicios",
    services: [
      {
        icon: HiCog,
        title: "Automatización de Procesos",
        description:
          "Diseño e implementación de sistemas automatizados para optimizar procesos industriales y aumentar la eficiencia operativa.",
        features: ["Control PLC", "Sistemas SCADA", "Integración de sensores", "Programación personalizada"],
      },
      {
        icon: HiChip,
        title: "Sistemas de Control",
        description:
          "Desarrollo de sistemas de control avanzados para maquinaria industrial y procesos de manufactura.",
        features: ["Control distribuido", "Interfaces HMI", "Comunicación industrial", "Monitoreo remoto"],
      },
      {
        icon: FaWrench,
        title: "Mantenimiento Industrial",
        description:
          "Servicios de mantenimiento preventivo y correctivo para garantizar el funcionamiento óptimo de sus equipos.",
        features: ["Mantenimiento preventivo", "Diagnóstico técnico", "Reparación especializada", "Soporte 24/7"],
      },
    ],
  },
  en: {
    title: "Featured Services",
    subtitle: "Our Main Specialties",
    cta: "Request Quote",
    viewAll: "View All Services",
    services: [
      {
        icon: HiCog,
        title: "Process Automation",
        description:
          "Design and implementation of automated systems to optimize industrial processes and increase operational efficiency.",
        features: ["PLC Control", "SCADA Systems", "Sensor Integration", "Custom Programming"],
      },
      {
        icon: HiChip,
        title: "Control Systems",
        description: "Development of advanced control systems for industrial machinery and manufacturing processes.",
        features: ["Distributed Control", "HMI Interfaces", "Industrial Communication", "Remote Monitoring"],
      },
      {
        icon: FaWrench,
        title: "Industrial Maintenance",
        description: "Preventive and corrective maintenance services to ensure optimal operation of your equipment.",
        features: ["Preventive Maintenance", "Technical Diagnosis", "Specialized Repair", "24/7 Support"],
      },
    ],
  },
}

interface ServicesSectionProps {
  lang: string
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es

  return (
    <section id="servicios" className="py-20 bg-white">
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

        {/* Featured Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-tertiary mb-3">{service.title}</h3>
                <p className="text-neutral leading-relaxed mb-6">{service.description}</p>
              </div>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-neutral">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                className="w-full btn-primary group-hover:scale-105 transition-transform"
                onClick={() => {
                  window.open(
                    `https://wa.me/5215512345678?text=Hola, me interesa el servicio de ${service.title}`,
                    "_blank",
                  )
                }}
              >
                {t.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${lang}/servicios`}>
            <Button className="btn-primary group">
              {t.viewAll}
              <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
