'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Facility {
  id: string
  client_id: string
  name: string
  installation_date: string
  maintenance_period_months: number
  last_maintenance_date?: string
  created_at: string
  clients?: {
    name: string
  }
}

export async function getFacilities() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('facilities')
    .select('*, clients(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching facilities:', error)
    return []
  }

  return data as Facility[]
}

export async function createFacility(formData: FormData) {
  const client_id = formData.get('client_id') as string
  const name = formData.get('name') as string
  const installation_date = formData.get('installation_date') as string
  const maintenance_period_months = parseInt(formData.get('maintenance_period_months') as string || '3')

  if (!client_id || !name || !installation_date) {
    return { success: false, error: 'Missing required fields' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('facilities')
    .insert({
      client_id,
      name,
      installation_date,
      maintenance_period_months,
    })

  if (error) {
    console.error('Error creating facility:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/ArkitecnicosApp/facilities')
  return { success: true }
}

export async function deleteFacility(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('facilities')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting facility:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/ArkitecnicosApp/facilities')
  return { success: true }
}
