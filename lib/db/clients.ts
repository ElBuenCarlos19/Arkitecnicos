import { supabase } from "./connection"
import { Client } from "@/actions/clients"

export const getClients = async (search?: string): Promise<Client[]> => {
  let query = supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data as Client[]
}

export const addClient = async (client: Omit<Client, "id" | "created_at">): Promise<Client> => {
  const { data, error } = await supabase.from("clients").insert(client).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
