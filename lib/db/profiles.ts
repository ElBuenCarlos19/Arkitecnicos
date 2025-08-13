import { supabase } from "./connection"
import type { Profile } from "@/lib/types/product"

export const getProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getProfileById = async (id: string): Promise<Profile | null> => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No data found
    }
    throw new Error(error.message)
  }

  return data
}

export const updateProfile = async (id: string, updates: Partial<Profile>): Promise<Profile> => {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteProfile = async (id: string): Promise<void> => {
  const { error } = await supabase.from("profiles").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
