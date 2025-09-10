"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { HiX } from "react-icons/hi"
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SingleImageUploadProps {
  image?: string
  onImageChange: (imageUrl: string) => void
  onFileChange: (file: File | null) => void
  maxSize?: number
  folder: "products" | "works"
}

export default function SingleImageUpload({
  image,
  onImageChange,
  onFileChange,
  maxSize = 5,
  folder,
}: SingleImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      const file = files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona solo archivos de imagen")
        return
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo es muy grande. Máximo ${maxSize}MB permitido`)
        return
      }

      setLoading(true)

      try {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)

        // Pass the file to parent component
        onFileChange(file)

        console.log("[v0] Single image file selected:", file.name)
      } catch (error) {
        console.error("[v0] Error handling file:", error)
        alert("Error al procesar la imagen")
      } finally {
        setLoading(false)
      }
    },
    [maxSize, onFileChange],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    },
    [handleFiles],
  )

  const removeImage = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
    onImageChange("")
    onFileChange(null)
  }, [preview, onImageChange, onFileChange])

  const currentImage = preview || image

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de la Categoría</label>

      {currentImage ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={currentImage || "/placeholder.svg"}
              alt="Category preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
          >
            <HiX className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
          />

          <div className="space-y-2">
            <MdOutlinePhotoLibrary className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-primary">Haz clic para subir</span> o arrastra una imagen aquí
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta {maxSize}MB</p>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
