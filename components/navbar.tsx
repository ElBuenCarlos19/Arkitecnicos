"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  HiMenu, 
  HiX, 
  HiGlobeAlt, 
  HiChevronDown, 
  HiHome,
  HiUsers,
  HiCog,
  HiCube,
  HiBriefcase,
  HiMail,
  HiChevronLeft
} from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart-button"
import Image from "next/image"

const translations = {
  es: {
    home: "Inicio",
    about: "Quiénes Somos",
    services: "Servicios",
    products: "Productos",
    works: "Trabajos",
    contact: "Contacto",
    productCategories: {
      title: "Categorías de Productos",
      abatibles: "Motores para Puertas Abatibles",
      garaje: "Motores para Puertas de Garaje",
      corredizas: "Motores para Puertas Corredizas",
      cortinas: "Motores para Cortinas Enrollables",
      peatonales: "Motores para Puertas Peatonales",
      talanqueras: "Talanqueras",
    },
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    products: "Products",
    works: "Works",
    contact: "Contact",
    productCategories: {
      title: "Product Categories",
      abatibles: "Swing Gate Motors",
      garaje: "Garage Door Motors",
      corredizas: "Sliding Gate Motors",
      cortinas: "Rolling Shutter Motors",
      peatonales: "Pedestrian Door Motors",
      talanqueras: "Barrier Gates",
    },
  },
}

interface NavbarProps {
  lang: string
}

export function Navbar({ lang }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [productsDropdown, setProductsDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const pathname = usePathname()
  const isHomePage = pathname === `/${lang}` || pathname === "/"

  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: `/${lang}#inicio`, label: t.home, icon: HiHome },
    { href: `/${lang}#nosotros`, label: t.about, icon: HiUsers },
    { href: `/${lang}/servicios`, label: t.services, icon: HiCog },
    { href: `/${lang}/productos`, label: t.products, icon: HiCube, hasDropdown: true },
    { href: `/${lang}#trabajos`, label: t.works, icon: HiBriefcase },
    { href: `/${lang}#contacto`, label: t.contact, icon: HiMail },
  ]

  const productCategories = [
    { slug: "motores-puertas-abatibles", label: t.productCategories.abatibles },
    { slug: "motores-puertas-garaje", label: t.productCategories.garaje },
    { slug: "motores-puertas-corredizas", label: t.productCategories.corredizas },
    { slug: "motores-cortinas-enrollables", label: t.productCategories.cortinas },
    { slug: "motores-puertas-peatonales", label: t.productCategories.peatonales },
    { slug: "talanqueras", label: t.productCategories.talanqueras },
  ]

  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 z-50 h-screen w-16 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="flex flex-col items-center justify-start pt-4">
          <div className="text-primary">
            <Image src={"/logo.png"} alt="Logo Arkitecnicos" width={40} height={40} />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Mobile Menu Button - Solo visible en móvil */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white/90 backdrop-blur-md shadow-lg"
        >
          {isMobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false)
          setLangDropdown(false)
          setProductsDropdown(false)
        }}
        className={`hidden lg:flex fixed top-0 right-0 z-50 h-screen transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        } bg-white/95 backdrop-blur-md shadow-lg`}
      >
        <div className="flex flex-col w-full">
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b border-gray-200">
            <Link href={`/${lang}`} className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="text-primary"
              >
                <Image 
                  src={"/logo.png"} 
                  alt="Logo Arkitecnicos" 
                  width={isExpanded ? 50 : 40} 
                  height={isExpanded ? 50 : 40}
                  className="transition-all duration-300"
                />
              </motion.div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 text-lg font-bold text-primary whitespace-nowrap"
                  >
                    Arkitécnicos
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-2"
                >
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button 
                        className="w-full flex items-center px-4 py-3 text-tertiary hover:text-primary hover:bg-secondary/50 transition-colors"
                        onClick={() => isExpanded && setProductsDropdown(!productsDropdown)}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="ml-3 whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="ml-auto"
                            >
                              <HiChevronDown className={`w-4 h-4 transition-transform ${productsDropdown ? 'rotate-180' : ''}`} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>

                      <AnimatePresence>
                        {productsDropdown && isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-gray-50"
                          >
                            {productCategories.map((category) => (
                              <Link
                                key={category.slug}
                                href={`/${lang}/productos/${category.slug}`}
                                className="block px-8 py-2 text-sm text-neutral hover:bg-secondary hover:text-primary transition-colors"
                              >
                                {category.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="flex items-center px-4 py-3 text-tertiary hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-3 whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Section - Language & Cart */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => isExpanded && setLangDropdown(!langDropdown)}
                className="w-full flex items-center px-2 py-2 text-tertiary hover:text-primary hover:bg-secondary/50 transition-colors rounded-md"
              >
                <HiGlobeAlt className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 uppercase whitespace-nowrap"
                    >
                      {lang}
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-auto"
                    >
                      <HiChevronDown className={`w-4 h-4 transition-transform ${langDropdown ? 'rotate-180' : ''}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {langDropdown && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border overflow-hidden"
                  >
                    <Link
                      href="/es"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setLangDropdown(false)}
                    >
                      Español
                    </Link>
                    <Link
                      href="/en"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setLangDropdown(false)}
                    >
                      English
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <div className="flex justify-center">
              <CartButton lang={lang} isScrolled={true} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="lg:hidden fixed inset-0 z-40 bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link href={`/${lang}`} className="flex items-center space-x-2">
                  <Image src={"/logo.png"} alt="Logo Arkitecnicos" width={40} height={40} />
                  <span className="text-xl font-bold text-primary">Arkitécnicos</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileOpen(false)}>
                  <HiX className="w-6 h-6" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.href} className="mb-2">
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-3 text-tertiary hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                      {item.hasDropdown && (
                        <div className="ml-8 space-y-1">
                          {productCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/${lang}/productos/${category.slug}`}
                              className="block px-4 py-2 text-sm text-neutral hover:bg-gray-100 transition-colors"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t p-4 space-y-2">
                <Link
                  href="/es"
                  className="block px-4 py-2 text-tertiary hover:bg-gray-100 transition-colors rounded-md"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Español
                </Link>
                <Link
                  href="/en"
                  className="block px-4 py-2 text-tertiary hover:bg-gray-100 transition-colors rounded-md"
                  onClick={() => setIsMobileOpen(false)}
                >
                  English
                </Link>
                <div className="flex justify-center pt-2">
                  <CartButton lang={lang} isScrolled={true} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}