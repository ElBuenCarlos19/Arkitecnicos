'use server'

import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  first_interaction_date: string
  created_at: string
}

export async function getClients() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data as Client[]
}

export async function createClient(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  
  if (!name) {
    return { success: false, error: 'Name is required' }
  }

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('clients')
    .insert({
      name,
      email,
      phone,
      first_interaction_date: new Date().toISOString(),
    })

  if (error) {
    console.error('Error creating client:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/ArkitecnicosApp/clients')
  return { success: true }
}

export async function deleteClient(id: string) {
  const supabase = await createServerClient()
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting client:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/ArkitecnicosApp/clients')
  return { success: true }
}
