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
      address: "Av. 20 de Julio # 80-205, Nte. Centro Historico, Barranquilla, Atlántico",
      phone: "+57 30000000",
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
      address: "Av. 20 de Julio # 80-205, Nte. Centro Historico, Barranquilla, Atlántico",
      phone: "+57 30000000",
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
    <section id="contacto" className="py-20 bg-tertiary text-white px-4 sm:px-6">
      <div className="container-custom section-padding">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder={t.form.name} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                <Input type="email" placeholder={t.form.email} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder={t.form.phone} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                <Input placeholder={t.form.company} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              </div>

              <Input placeholder={t.form.subject} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              <Textarea placeholder={t.form.message} rows={5} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none" />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 group">
                  {t.form.send}
                  <HiPaperAirplane className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </motion.div>

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
                {[
                  { icon: HiLocationMarker, label: "Dirección", value: t.info.address },
                  { icon: HiPhone, label: "Teléfono", value: t.info.phone },
                  { icon: HiMail, label: "Email", value: t.info.email },
                  { icon: HiClock, label: "Horarios", value: t.info.hours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.label}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.social}</h4>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 sm:p-6 flex items-center justify-center">
              <iframe
                className="w-full h-64 sm:h-72 rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5517683844973!2d-74.81769919999999!3d10.997166199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d77351c46a3%3A0xb3a717a6efe0fece!2sArkitecnicos%20es%20Arkigarajes!5e0!3m2!1sen!2sco!4v1753454097710!5m2!1sen!2sco"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
