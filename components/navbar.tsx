"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiMenu, HiX, HiGlobeAlt, HiChevronDown } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart-button"

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
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [productsDropdown, setProductsDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  // Determinar si el navbar debe tener fondo oscuro
  const shouldUseDarkBackground = !isHomePage || isScrolled
  const textColor = shouldUseDarkBackground ? "text-tertiary" : "text-white"
  const hoverColor = shouldUseDarkBackground ? "hover:text-primary" : "hover:text-accent"

  const navItems = [
    { href: `/${lang}#inicio`, label: t.home },
    { href: `/${lang}#nosotros`, label: t.about },
    { href: `/${lang}/servicios`, label: t.services },
    { href: `/${lang}/productos`, label: t.products, hasDropdown: true },
    { href: `/${lang}#trabajos`, label: t.works },
    { href: `/${lang}#contacto`, label: t.contact },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-primary">Arkitécnicos</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldUseDarkBackground ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-primary">
              Arkitécnicos
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setProductsDropdown(true)}
                    onMouseLeave={() => setProductsDropdown(false)}
                  >
                    <button className={`font-medium transition-colors ${textColor} ${hoverColor} flex items-center`}>
                      {item.label}
                      <HiChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    <AnimatePresence>
                      {productsDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-[60]"
                        >
                          <div className="p-4">
                            <h3 className="font-semibold text-tertiary mb-3 text-sm">{t.productCategories.title}</h3>
                            <div className="space-y-2">
                              {productCategories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/${lang}/productos/${category.slug}`}
                                  className="block px-3 py-2 text-sm text-neutral hover:bg-secondary hover:text-primary transition-colors rounded-md"
                                >
                                  {category.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href} className={`font-medium transition-colors ${textColor} ${hoverColor}`}>
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangDropdown(!langDropdown)}
                className={`flex items-center space-x-1 ${textColor} ${hoverColor}`}
              >
                <HiGlobeAlt className="w-4 h-4" />
                <span className="uppercase">{lang}</span>
                <HiChevronDown className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-[60]"
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
            <CartButton lang={lang} isScrolled={shouldUseDarkBackground} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <CartButton lang={lang} isScrolled={shouldUseDarkBackground} />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HiX className={`w-6 h-6 ${textColor}`} /> : <HiMenu className={`w-6 h-6 ${textColor}`} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white rounded-lg shadow-lg mt-2 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-tertiary hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <div className="ml-4 space-y-1">
                        {productCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/${lang}/productos/${category.slug}`}
                            className="block px-4 py-2 text-sm text-neutral hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <Link
                    href="/es"
                    className="block px-4 py-2 text-tertiary hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Español
                  </Link>
                  <Link
                    href="/en"
                    className="block px-4 py-2 text-tertiary hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    English
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
