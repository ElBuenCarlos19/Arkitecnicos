"use server"

import { supabase } from "@/lib/db/connection"
import { supabasePrivate } from "@/lib/db/connectionPrivate"

export interface SystemStatus {
  database: {
    status: "connected" | "disconnected" | "error"
    message: string
    responseTime?: number
  }
  storage: {
    status: "connected" | "disconnected" | "error"
    message: string
    responseTime?: number
  }
  lastSync: {
    timestamp: Date
    message: string
  }
}

export async function getSystemStatus(): Promise<SystemStatus> {
  const status: SystemStatus = {
    database: {
      status: "disconnected",
      message: "No conectado",
    },
    storage: {
      status: "disconnected",
      message: "No conectado",
    },
    lastSync: {
      timestamp: new Date(),
      message: "Nunca",
    },
  }

  try {
    // Test database connection
    const dbStart = Date.now()
    const { data, error } = await supabase.from("products").select("id").limit(1)
    const dbTime = Date.now() - dbStart

    if (error) {
      status.database = {
        status: "error",
        message: "Error de conexión",
        responseTime: dbTime,
      }
    } else {
      status.database = {
        status: "connected",
        message: "Conectada",
        responseTime: dbTime,
      }
    }

    // Test storage connection
    const storageStart = Date.now()
    const { data: buckets, error: storageError } = await supabasePrivate.storage.listBuckets()
    const storageTime = Date.now() - storageStart
    if (storageError) {
      status.storage = {
        status: "error",
        message: "Error de conexión",
        responseTime: storageTime,
      }
    } else {
      const arkitecnicosBucket = buckets?.find((bucket) => bucket.name === "arkitecnicos-storage")
      if (arkitecnicosBucket) {
        status.storage = {
          status: "connected",
          message: "Conectado",
          responseTime: storageTime,
        }
      } else {
        status.storage = {
          status: "error",
          message: "Bucket no encontrado",
          responseTime: storageTime,
        }
      }
    }

    // Set last sync time
    status.lastSync = {
      timestamp: new Date(),
      message: "Ahora mismo",
    }
  } catch (error) {
    console.error("Error checking system status:", error)
    status.database.status = "error"
    status.database.message = "Error del sistema"
    status.storage.status = "error"
    status.storage.message = "Error del sistema"
  }

  return status
}
