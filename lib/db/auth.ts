import { supabase } from "./connection"
import type { Profile } from "@/lib/types/product"

export interface AuthUser {
  id: string
  email: string
  role?: number
  profile?: Profile
}

export const signIn = async (email: string, password: string): Promise<AuthUser | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.user) {
    // Obtener el perfil del usuario
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

    return {
      id: data.user.id,
      email: data.user.email!,
      role: profile?.role,
      profile: profile,
    }
  }

  return null
}

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Obtener el perfil del usuario
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return {
    id: user.id,
    email: user.email!,
    role: profile?.role,
    profile: profile,
  }
}

export const isAdmin = async (userId: string): Promise<boolean> => {
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single()

  // Asumiendo que el role 1 es admin
  return profile?.role === 1
}

export const signUp = async (email: string, password: string, fullName: string, username: string): Promise<AuthUser | null> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.user) {
    return {
      id: data.user.id,
      email: data.user.email!,
    }
  }

  return null
}
