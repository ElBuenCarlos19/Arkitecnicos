"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiShoppingCart, HiX, HiTrash, HiPlus, HiMinus } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import Image from "next/image"

const translations = {
  es: {
    cart: "Carrito",
    empty: "Carrito vacío",
    emptyMessage: "No hay productos en tu carrito",
    total: "Total",
    checkout: "Proceder al pago",
    remove: "Eliminar",
    continueShopping: "Seguir comprando",
    quantity: "Cantidad",
    subtotal: "Subtotal",
    contactUs: "Contactar para Cotización",
  },
  en: {
    cart: "Cart",
    empty: "Empty cart",
    emptyMessage: "No products in your cart",
    total: "Total",
    checkout: "Proceed to checkout",
    remove: "Remove",
    continueShopping: "Continue shopping",
    quantity: "Quantity",
    subtotal: "Subtotal",
    contactUs: "Contact for Quote",
  },
}

interface CartButtonProps {
  lang: string
  isScrolled?: boolean
}

export function CartButton({ lang, isScrolled = false }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalItems, isHydrated } = useCart()

  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isHydrated) {
    return (
      <Button variant="ghost" size="sm" className="relative p-2 hover:bg-secondary/50 transition-colors">
        <HiShoppingCart className="w-5 h-5" />
      </Button>
    )
  }

  const totalItems = getTotalItems()

  const handleContactForQuote = () => {
    const productNames = items.map((item) => `${item.quantity}x ${item.name}`).join(", ")
    const message = `Hola, me interesa cotizar los siguientes productos: ${productNames}`
    window.open(`https://wa.me/5215512345678?text=${encodeURIComponent(message)}`, "_blank")
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-secondary/50 transition-colors"
      >
        <HiShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
            {totalItems}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-tertiary flex items-center">
                  <HiShoppingCart className="w-5 h-5 mr-2" />
                  {t.cart} ({totalItems})
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="hover:bg-gray-100">
                  <HiX className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <HiShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-tertiary mb-2">{t.empty}</h3>
                    <p className="text-neutral text-sm">{t.emptyMessage}</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                      >
                        <Image
                          src={item.images_url?.[0] || "/placeholder.svg?height=60&width=60&text=Producto"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-tertiary text-sm truncate">{item.name}</h4>
                          <p className="text-primary font-semibold text-sm">Cotización disponible</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center mt-2 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <HiMinus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <HiPlus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
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
                <div className="border-t p-4 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-neutral mb-2">
                      Los productos no tienen precio fijo. Contacta para obtener una cotización personalizada.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={handleContactForQuote}
                    >
                      {t.contactUs}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                      {t.continueShopping}
                    </Button>
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
