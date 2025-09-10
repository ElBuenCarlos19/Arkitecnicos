"use server"

import { supabasePrivate } from "@/lib/db/connectionPrivate"
import sharp from "sharp"

export interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadAndOptimizeImage(
  file: File,
  folder: "products" | "works" | "profiles",
  itemId?: string | number,
  maxWidth = 1200,
  quality = 85,
): Promise<ImageUploadResult> {
  try {
    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "El archivo debe ser una imagen" }
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "La imagen no debe superar los 10MB" }
    }

    // Convertir File a Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimizar imagen con Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({ quality, effort: 6 })
      .toBuffer()

    // Generar nombre único
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)

    // Crear estructura de carpetas: folder/itemId/timestamp-random.webp
    const fileName = itemId
      ? `${folder}/${itemId}/${timestamp}-${randomString}.webp`
      : `${folder}/${timestamp}-${randomString}.webp`

    // Subir a Supabase Storage
    const { data, error } = await supabasePrivate.storage.from("arkitecnicos-storage").upload(fileName, optimizedBuffer, {
      contentType: "image/webp",
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading to Supabase:", error)
      return { success: false, error: "Error al subir la imagen" }
    }
    // Obtener URL pública
    const { data: urlData } = supabasePrivate.storage.from("arkitecnicos-storage").getPublicUrl(data.path)

    return {
      success: true,
      url: urlData.publicUrl,
    }
  } catch (error) {
    console.error("Error processing image:", error)
    return { success: false, error: "Error al procesar la imagen" }
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extraer el path de la URL
    const urlParts = url.split("/")
    const bucketIndex = urlParts.findIndex((part) => part === "arkitecnicos-storage")

    if (bucketIndex === -1) {
      console.error("Invalid URL format")
      return false
    }

    // Obtener el path después del bucket
    const filePath = urlParts.slice(bucketIndex + 1).join("/")

    const { error } = await supabasePrivate.storage.from("arkitecnicos-storage").remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}

export async function uploadMultipleImages(
  files: File[],
  folder: "products" | "works" | "profiles",
  itemId?: string | number,
  maxImages = 3,
): Promise<{ success: boolean; urls: string[]; errors: string[] }> {
  if (files.length > maxImages) {
    return {
      success: false,
      urls: [],
      errors: [`Máximo ${maxImages} imágenes permitidas`],
    }
  }

  const results = await Promise.all(files.map((file) => uploadAndOptimizeImage(file, folder, itemId)))

  const urls: string[] = []
  const errors: string[] = []

  results.forEach((result, index) => {
    if (result.success && result.url) {
      urls.push(result.url)
    } else {
      errors.push(`Imagen ${index + 1}: ${result.error || "Error desconocido"}`)
    }
  })

  return {
    success: errors.length === 0,
    urls,
    errors,
  }
}

export async function deleteMultipleImages(urls: string[]): Promise<{ success: boolean; errors: string[] }> {
  const results = await Promise.all(urls.map((url) => deleteImage(url)))

  const errors: string[] = []
  results.forEach((success, index) => {
    if (!success) {
      errors.push(`Error eliminando imagen ${index + 1}`)
    }
  })

  return {
    success: errors.length === 0,
    errors,
  }
}
