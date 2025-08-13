import { supabase } from "./connection"
import type { Product, ProductWithCategoryName } from "@/lib/types/product"

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getProductsWithCategoryName = async (): Promise<ProductWithCategoryName[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      idname,
      name,
      description,
      images_url,
      category,
      specifications,
      features,
      created_at,
      products_category (
        id,
        idname,
        name,
        description,
        items,
        image_url
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  // Transformar los datos para que coincidan con el tipo esperado
  const transformedData: ProductWithCategoryName[] = (data || []).map((item: any) => ({
    id: item.id,
    idname: item.idname,
    name: item.name,
    description: item.description,
    images_url: item.images_url,
    category: item.category,
    specifications: item.specifications,
    features: item.features,
    created_at: item.created_at,
    products_category: Array.isArray(item.products_category)
      ? item.products_category[0] || null
      : item.products_category,
  }))

  return transformedData
}

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", categoryId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getProductsByCategoryIdname = async (categoryIdname: string): Promise<ProductWithCategoryName[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      idname,
      name,
      description,
      images_url,
      category,
      specifications,
      features,
      created_at,
      products_category!inner (
        id,
        idname,
        name,
        description,
        items,
        image_url
      )
    `)
    .eq("products_category.idname", categoryIdname)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  // Transformar los datos para que coincidan con el tipo esperado
  const transformedData: ProductWithCategoryName[] = (data || []).map((item: any) => ({
    id: item.id,
    idname: item.idname,
    name: item.name,
    description: item.description,
    images_url: item.images_url,
    category: item.category,
    specifications: item.specifications,
    features: item.features,
    created_at: item.created_at,
    products_category: Array.isArray(item.products_category)
      ? item.products_category[0] || null
      : item.products_category,
  }))

  return transformedData
}

export const addProduct = async (product: Omit<Product, "id" | "created_at">): Promise<Product> => {
  const { data, error } = await supabase.from("products").insert(product).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getProductById = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const getProductByIdname = async (idname: string): Promise<ProductWithCategoryName | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      idname,
      name,
      description,
      images_url,
      category,
      specifications,
      features,
      created_at,
      products_category (
        id,
        idname,
        name,
        description,
        items,
        image_url
      )
    `)
    .eq("idname", idname)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  // Transformar los datos para que coincidan con el tipo esperado
  const transformedData: ProductWithCategoryName = {
    id: data.id,
    idname: data.idname,
    name: data.name,
    description: data.description,
    images_url: data.images_url,
    category: data.category,
    specifications: data.specifications,
    features: data.features,
    created_at: data.created_at,
    products_category: Array.isArray(data.products_category)
      ? data.products_category[0] || null
      : data.products_category,
  }

  return transformedData
}

export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteProduct = async (id: number): Promise<void> => {
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
    