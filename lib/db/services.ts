import { supabase } from "./connection"
import type { Service } from "@/lib/types/product"

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getServiceById = async (id: number): Promise<Service | null> => {
  const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const addService = async (service: Omit<Service, "id" | "created_at">): Promise<Service> => {
  const { data, error } = await supabase.from("services").insert(service).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateService = async (id: number, updates: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteService = async (id: number): Promise<void> => {
  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
