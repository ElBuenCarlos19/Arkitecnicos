"use client"

import { motion } from "framer-motion"
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiPaperAirplane } from "react-icons/hi"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const translations = {
  es: {
    title: "Contacto",
    subtitle: "Hablemos de tu Próximo Proyecto",
    form: {
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      company: "Empresa",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar Mensaje",
    },
    info: {
      title: "Información de Contacto",
      address: "Av. Tecnológico 1234, Col. Industrial, Ciudad de México, CP 01234",
      phone: "+52 (55) 1234-5678",
      email: "contacto@arkitecnicos.com",
      hours: "Lun - Vie: 8:00 AM - 6:00 PM",
    },
    social: "Síguenos en Redes Sociales",
  },
  en: {
    title: "Contact",
    subtitle: "Let's Talk About Your Next Project",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone",
      company: "Company",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
    },
    info: {
      title: "Contact Information",
      address: "Av. Tecnológico 1234, Col. Industrial, Mexico City, CP 01234",
      phone: "+52 (55) 1234-5678",
      email: "contact@arkitecnicos.com",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM",
    },
    social: "Follow Us on Social Media",
  },
}

interface ContactSectionProps {
  lang: string
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = translations[lang as keyof typeof translations] || translations.es

  return (
    <section id="contacto" className="py-20 bg-tertiary text-white">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder={t.form.name}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t.form.email}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder={t.form.phone}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder={t.form.company}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <Input
                  placeholder={t.form.subject}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Textarea
                  placeholder={t.form.message}
                  rows={5}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 group">
                  {t.form.send}
                  <HiPaperAirplane className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.info.title}</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dirección</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{t.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiPhone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Teléfono</h4>
                    <p className="text-gray-300 text-sm">{t.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-300 text-sm">{t.info.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiClock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Horarios</h4>
                    <p className="text-gray-300 text-sm">{t.info.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">{t.social}</h4>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                  { icon: FaInstagram, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white/5 rounded-2xl p-6 h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <HiLocationMarker className="w-12 h-12 mx-auto mb-2" />
                <p>Mapa Interactivo</p>
                <p className="text-sm">Ubicación de nuestras oficinas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
