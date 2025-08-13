import { supabase } from "./connection"
import type { ProductCategory } from "@/lib/types/product"

export const getProductsCategory = async (): Promise<{ name: string }[]> => {
  const { data, error } = await supabase
    .from("products_category")
    .select("name")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getAllProductsCategory = async (): Promise<ProductCategory[]> => {
  const { data, error } = await supabase
    .from("products_category")
    .select("id, idname, name, description, items, image_url, created_at")
    .order("created_at", { ascending: false })
  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getProductsCategoryById = async (id: number): Promise<ProductCategory | null> => {
  const { data, error } = await supabase.from("products_category").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const getProductsCategoryByIdname = async (idname: string): Promise<ProductCategory | null> => {
  const { data, error } = await supabase.from("products_category").select("*").eq("idname", idname).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const addProductCategory = async (
  category: Omit<ProductCategory, "id" | "created_at">,
): Promise<ProductCategory> => {
  const { data, error } = await supabase.from("products_category").insert(category).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateProductCategory = async (
  id: number,
  updates: Partial<ProductCategory>,
): Promise<ProductCategory> => {
  const { data, error } = await supabase.from("products_category").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteProductCategory = async (id: number): Promise<void> => {
  const { error } = await supabase.from("products_category").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
