"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiShoppingCart, HiX, HiPlus, HiMinus, HiTrash } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import Image from "next/image"
import Link from "next/link"

interface CartButtonProps {
  lang: string
  isScrolled?: boolean
}

const translations = {
  es: {
    cart: "Carrito",
    empty: "Tu carrito está vacío",
    total: "Total",
    talkToAdvisor: "Hablar con Asesor",
    continueShopping: "Seguir Comprando",
    items: "artículos",
  },
  en: {
    cart: "Cart",
    empty: "Your cart is empty",
    total: "Total",
    talkToAdvisor: "Talk to Advisor",
    continueShopping: "Continue Shopping",
    items: "items",
  },
}

export function CartButton({ lang, isScrolled = false }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, isHydrated } = useCart()
  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // No renderizar hasta que esté hidratado y montado
  if (!mounted || !isHydrated) {
    return (
      <button className={`relative p-2 transition-colors ${isScrolled ? "text-tertiary" : "text-white"}`}>
        <HiShoppingCart className="w-6 h-6" />
      </button>
    )
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`relative p-2 transition-colors hover:text-primary ${isScrolled ? "text-tertiary" : "text-white"}`}
      >
        <HiShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full Page Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
              }}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-white">
                <h2 className="text-xl font-bold text-tertiary">
                  {t.cart} ({totalItems} {t.items})
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                  <HiX className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <HiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-neutral">{t.empty}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex items-center space-x-4 p-4 bg-secondary rounded-lg"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-tertiary text-sm truncate">{item.name}</h3>
                          <p className="text-primary font-bold">${item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <HiMinus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <HiPlus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <HiTrash className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6 space-y-4 bg-white">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{t.total}:</span>
                    <span className="text-primary">${totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full btn-primary"
                      onClick={() => {
                        setIsOpen(false)
                        // Aquí se puede agregar lógica para WhatsApp o contacto
                        window.open(
                          `https://wa.me/5215512345678?text=Hola, me interesa cotizar los productos en mi carrito`,
                          "_blank",
                        )
                      }}
                    >
                      {t.talkToAdvisor}
                    </Button>
                    <Link href={`/${lang}/productos/catalogo`}>
                      <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                        {t.continueShopping}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
