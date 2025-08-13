"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiPlus, HiX, HiUpload, HiPhotograph } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { uploadMultipleImages } from "@/actions/image-upload"
import Image from "next/image"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages: number
  folder: "products" | "works" | "profiles"
  className?: string
}

export function ImageUpload({ images, onImagesChange, maxImages, folder, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const remainingSlots = maxImages - images.length

    if (fileArray.length > remainingSlots) {
      alert(`Solo puedes subir ${remainingSlots} imagen(es) más`)
      return
    }

    setUploading(true)

    try {
      const result = await uploadMultipleImages(fileArray, folder, fileArray.length)

      if (result.success) {
        onImagesChange([...images, ...result.urls])
      } else {
        alert(`Errores al subir imágenes:\n${result.errors.join("\n")}`)
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Error al subir las imágenes")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const addManualUrl = () => {
    const url = prompt("Ingresa la URL de la imagen:")
    if (url && url.trim()) {
      if (images.length < maxImages) {
        onImagesChange([...images, url.trim()])
      } else {
        alert(`Máximo ${maxImages} imágenes permitidas`)
      }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imágenes ({images.length}/{maxImages})
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
            className="bg-transparent"
          >
            <HiUpload className="w-4 h-4 mr-2" />
            Subir
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addManualUrl}
            disabled={images.length >= maxImages}
            className="bg-transparent"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            URL
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Drop zone */}
      {images.length < maxImages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : uploading
                ? "border-gray-300 bg-gray-50"
                : "border-gray-300 hover:border-primary hover:bg-primary/5"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-sm text-gray-600">Subiendo imágenes...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <HiPhotograph className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Arrastra imágenes aquí o haz clic en "Subir"</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 10MB</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white h-6 w-6 p-0"
                  >
                    <HiX className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center truncate">Imagen {index + 1}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
