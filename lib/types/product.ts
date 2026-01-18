export interface Product {
  id: number
  idname: string
  name: string
  description: string
  images_url: string[]
  category: number
  specifications: Record<string, any>
  features: string[]
  created_at: string
}

export interface ProductWithCategoryName {
  id: number
  idname: string
  name: string
  description: string
  images_url: string[]
  category: number
  specifications: Record<string, any>
  features: string[]
  created_at: string
  products_category: {
    id: number
    idname: string
    name: string
    description: string
    items: string[]
    image_url: string
  } | null
}

export interface ProductCategory {
  id: number
  idname: string
  name: string
  description: string
  items: string[]
  image_url: string
  created_at: string
}

export interface Service {
  id: number
  name: string
  description: string
  features: string
  created_at: string
}

export interface Work {
  id: number
  idname: string
  name: string
  client: string
  location: string
  date: number
  description: string
  tags: string[]
  image_urls: string[]
  results: string[]
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  username: string | null
  email: string | null
  avatar_url: string | null
  role: number | null
  adminpage?: boolean
  created_at: string
  updated_at: string | null
}

export interface Role {
  id: number
  name: string
  description: string | null
  privileges: number | null
  created_at: string
}

export interface Privileges {
  id: number
  privileges_characterist: Record<string, any>
  created_at: string
}

// Tipos para el carrito (compatibilidad con el sistema existente)
export interface CartProduct {
  id: number
  idname: string
  name: string
  description: string
  price: number
  images_url: string[]
  category: number
  specifications: Record<string, string>
  features: string[]
}

export interface CartItem extends CartProduct {
  quantity: number
}
