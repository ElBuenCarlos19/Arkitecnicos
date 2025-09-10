import { supabase } from "@/lib/db/connection"

export async function uploadSingleImage(file: File, folder: "products" | "works", itemId?: string): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `${itemId || "category"}-${timestamp}-${randomString}.${fileExtension}`

    // Upload to Supabase Storage
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage.from("arkitecnicos-storage").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("[v0] Upload error:", error)
      throw new Error(`Error uploading image: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("arkitecnicos-storage").getPublicUrl(filePath)

    console.log("[v0] Image uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("[v0] Single image upload error:", error)
    throw error
  }
}
