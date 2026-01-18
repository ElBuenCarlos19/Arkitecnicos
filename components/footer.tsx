"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp } from "react-icons/hi"
import { Button } from "@/components/ui/button"

const translations = {
  es: {
    company: "Empresa",
    services: "Servicios",
    support: "Soporte",
    legal: "Legal",
    description:
      "Líderes en automatización industrial con más de 15 años de experiencia transformando procesos industriales.",
    links: {
      about: "Quiénes Somos",
      mission: "Misión y Visión",
      team: "Nuestro Equipo",
      careers: "Carreras",
      automation: "Automatización",
      control: "Sistemas de Control",
      maintenance: "Mantenimiento",
      consulting: "Consultoría",
      technical: "Soporte Técnico",
      documentation: "Documentación",
      training: "Capacitación",
      warranty: "Garantía",
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      cookies: "Política de Cookies",
    },
    contact: {
      title: "Contacto",
      address: "Av. 20 de Julio # 80-205, Nte. Centro Historico, Barranquilla, Atlántico",
      phone: "+57 311 2148410",
      email: "contacto@arkitecnicos.com",
    },
    copyright: "© 2026 Arkitécnicos. Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },
  en: {
    company: "Company",
    services: "Services",
    support: "Support",
    legal: "Legal",
    description: "Leaders in industrial automation with over 15 years of experience transforming industrial processes.",
    links: {
      about: "About Us",
      mission: "Mission & Vision",
      team: "Our Team",
      careers: "Careers",
      automation: "Automation",
      control: "Control Systems",
      maintenance: "Maintenance",
      consulting: "Consulting",
      technical: "Technical Support",
      documentation: "Documentation",
      training: "Training",
      warranty: "Warranty",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      cookies: "Cookie Policy",
    },
    contact: {
      title: "Contact",
      address: "Av. 20 de Julio # 80-205, Nte. Centro Historico, Barranquilla, Atlántico",
      phone: "+57 311 2148410",
      email: "contacto@arkitecnicos.com",
    },
    copyright: "© 2026 Arkitécnicos. All rights reserved.",
    backToTop: "Back to top",
  },
}

interface FooterProps {
  lang: string
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang as keyof typeof translations] || translations.es

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-tertiary text-white lg:pr-14">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href={`/${lang}`} className="text-2xl font-bold text-primary mb-4 block">
              Arkitecnicos
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">{t.description}</p>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <HiLocationMarker className="w-4 h-4 mr-2 text-primary" />
                {t.contact.address}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <HiPhone className="w-4 h-4 mr-2 text-primary" />
                {t.contact.phone}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <HiMail className="w-4 h-4 mr-2 text-primary" />
                {t.contact.email}
              </div>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">{t.services}</h3>
            <ul className="space-y-2">
              {[t.links.automation, t.links.control, t.links.maintenance, t.links.consulting].map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">{t.support}</h3>
            <ul className="space-y-2">
              {[t.links.technical, t.links.documentation, t.links.training, t.links.warranty].map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400 mb-4 md:mb-0"
            >
              {t.copyright}
            </motion.div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-4 text-sm">
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t.links.privacy}
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  {t.links.terms}
                </Link>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={scrollToTop}
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-primary hover:border-primary bg-transparent"
                >
                  <HiArrowUp className="w-4 h-4 mr-1" />
                  {t.backToTop}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
