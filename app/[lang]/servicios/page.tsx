"use client"

import { motion } from "framer-motion"
import { HiCog, HiChip, HiChartBar, HiShieldCheck, HiSupport } from "react-icons/hi"
import { FaWrench } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { use } from "react"

const translations = {
  es: {
    title: "Todos Nuestros Servicios",
    subtitle: "Soluciones Integrales de Automatización Industrial",
    cta: "Solicitar Cotización",
    services: [
      {
        icon: HiCog,
        title: "Automatización de Procesos",
        description:
          "Diseño e implementación de sistemas automatizados para optimizar procesos industriales y aumentar la eficiencia operativa.",
        features: ["Control PLC", "Sistemas SCADA", "Integración de sensores", "Programación personalizada"],
        price: "Desde $15,000 MXN",
      },
      {
        icon: HiChip,
        title: "Sistemas de Control",
        description:
          "Desarrollo de sistemas de control avanzados para maquinaria industrial y procesos de manufactura.",
        features: ["Control distribuido", "Interfaces HMI", "Comunicación industrial", "Monitoreo remoto"],
        price: "Desde $12,000 MXN",
      },
      {
        icon: FaWrench,
        title: "Mantenimiento Industrial",
        description:
          "Servicios de mantenimiento preventivo y correctivo para garantizar el funcionamiento óptimo de sus equipos.",
        features: ["Mantenimiento preventivo", "Diagnóstico técnico", "Reparación especializada", "Soporte 24/7"],
        price: "Desde $3,000 MXN/mes",
      },
      {
        icon: HiChartBar,
        title: "Consultoría Técnica",
        description:
          "Asesoramiento especializado para la optimización de procesos y implementación de nuevas tecnologías.",
        features: [
          "Análisis de procesos",
          "Estudios de factibilidad",
          "Optimización energética",
          "Capacitación técnica",
        ],
        price: "Desde $5,000 MXN",
      },
      {
        icon: HiShieldCheck,
        title: "Seguridad Industrial",
        description: "Implementación de sistemas de seguridad para proteger personal, equipos y procesos industriales.",
        features: ["Sistemas de seguridad", "Análisis de riesgos", "Normativas industriales", "Certificaciones"],
        price: "Desde $8,000 MXN",
      },
      {
        icon: HiSupport,
        title: "Soporte Técnico",
        description:
          "Servicio de soporte técnico especializado disponible para resolver cualquier incidencia o consulta.",
        features: ["Soporte remoto", "Asistencia en sitio", "Actualizaciones", "Documentación técnica"],
        price: "Desde $2,500 MXN/mes",
      },
    ],
  },
  en: {
    title: "All Our Services",
    subtitle: "Comprehensive Industrial Automation Solutions",
    cta: "Request Quote",
    services: [
      {
        icon: HiCog,
        title: "Process Automation",
        description:
          "Design and implementation of automated systems to optimize industrial processes and increase operational efficiency.",
        features: ["PLC Control", "SCADA Systems", "Sensor Integration", "Custom Programming"],
        price: "From $750 USD",
      },
      {
        icon: HiChip,
        title: "Control Systems",
        description: "Development of advanced control systems for industrial machinery and manufacturing processes.",
        features: ["Distributed Control", "HMI Interfaces", "Industrial Communication", "Remote Monitoring"],
        price: "From $600 USD",
      },
      {
        icon: FaWrench,
        title: "Industrial Maintenance",
        description: "Preventive and corrective maintenance services to ensure optimal operation of your equipment.",
        features: ["Preventive Maintenance", "Technical Diagnosis", "Specialized Repair", "24/7 Support"],
        price: "From $150 USD/month",
      },
      {
        icon: HiChartBar,
        title: "Technical Consulting",
        description: "Specialized consulting for process optimization and implementation of new technologies.",
        features: ["Process Analysis", "Feasibility Studies", "Energy Optimization", "Technical Training"],
        price: "From $250 USD",
      },
      {
        icon: HiShieldCheck,
        title: "Industrial Safety",
        description: "Implementation of safety systems to protect personnel, equipment and industrial processes.",
        features: ["Safety Systems", "Risk Analysis", "Industrial Standards", "Certifications"],
        price: "From $400 USD",
      },
      {
        icon: HiSupport,
        title: "Technical Support",
        description: "Specialized technical support service available to resolve any incident or query.",
        features: ["Remote Support", "On-site Assistance", "Updates", "Technical Documentation"],
        price: "From $125 USD/month",
      },
    ],
  },
}

export default function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-tertiary mb-3">{service.title}</h3>
                <p className="text-neutral leading-relaxed mb-4">{service.description}</p>
                <div className="text-lg font-bold text-primary mb-4">{service.price}</div>
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
      </div>
    </div>
  )
}
