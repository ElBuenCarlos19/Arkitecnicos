import { supabase } from "./connection"
import type { Work } from "@/lib/types/product"

export const getWorks = async (): Promise<Work[]> => {
  const { data, error } = await supabase.from("works").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getWorkById = async (id: number): Promise<Work | null> => {
  const { data, error } = await supabase.from("works").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const getWorkByIdname = async (idname: string): Promise<Work | null> => {
  const { data, error } = await supabase.from("works").select("*").eq("idname", idname).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const addWork = async (work: Omit<Work, "id" | "created_at">): Promise<Work> => {
  const { data, error } = await supabase.from("works").insert(work).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateWork = async (id: number, updates: Partial<Work>): Promise<Work> => {
  const { data, error } = await supabase.from("works").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteWork = async (id: number): Promise<void> => {
  const { error } = await supabase.from("works").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
