import { supabase } from "./connection"
import { Facility } from "@/actions/facilities"

export const getFacilities = async (): Promise<Facility[]> => {
  const { data, error } = await supabase
    .from('facilities')
    .select('*, clients(name)')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Facility[]
}

export const getFacilityById = async (id: string): Promise<Facility | null> => {
  const { data, error } = await supabase
    .from('facilities')
    .select('*, clients(name)')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data as Facility
}

export const addFacility = async (facility: Omit<Facility, "id" | "created_at" | "clients">): Promise<Facility> => {
  const { data, error } = await supabase.from("facilities").insert(facility).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateFacility = async (id: string, updates: Partial<Facility> & { details?: string; images?: string[] }): Promise<Facility> => {
  const { data, error } = await supabase
    .from("facilities")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteFacility = async (id: string): Promise<void> => {
  const { error } = await supabase.from("facilities").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export const getRecentFacilities = async (limit = 5): Promise<Facility[]> => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('facilities')
    .select('*, clients(name)')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent facilities:', error)
    return []
  }

  return data as Facility[]
}

export const getUpcomingMaintenance = async (limit = 5): Promise<Facility[]> => {
  const { data, error } = await supabase
    .from('facilities')
    .select('*, clients(name)')
    .order('last_maintenance_date', { ascending: true }) // Oldest maintenance first (most urgent?) 
    // Actually we need to calculate next due date. 
    // For simplicity in SQL, let's just fetch all and filter in JS or fetch those with old last_maintenance_date
    
  if (error) {
    return []
  }

  // Calculate due date and filter
  const today = new Date()
  const upcoming = data.map((f: any) => {
    const lastDate = new Date(f.last_maintenance_date || f.installation_date)
    const nextDate = new Date(lastDate)
    nextDate.setMonth(nextDate.getMonth() + (f.maintenance_period_months || 3))
    return { ...f, nextDate }
  }).filter((f: any) => f.nextDate >= today) // Future dates
  .sort((a: any, b: any) => a.nextDate.getTime() - b.nextDate.getTime()) // Soonest first
  .slice(0, limit)

  return upcoming
}
