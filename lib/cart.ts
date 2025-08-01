"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specifications: Record<string, string>
  features: string[]
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isHydrated: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  setHydrated: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    },
  ),
)
