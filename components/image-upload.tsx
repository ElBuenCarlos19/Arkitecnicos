"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiPlus, HiUpload, HiPhotograph, HiTrash } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export type ImageItem = {
  id: string
  url: string // For preview (blob URL or existing URL)
  file?: File // Original file for upload
  isExisting?: boolean // True if it's an existing URL from database
}

interface ImageUploadProps {
  images: string[] // Existing URLs from database
  onImagesChange: (images: string[]) => void // Only existing URLs
  onFilesChange: (files: File[]) => void // New files to upload
  maxImages: number
  folder: "products" | "works" | "profiles"
  className?: string
}

export function ImageUpload({
  images,
  onImagesChange,
  onFilesChange,
  maxImages,
  folder,
  className = "",
}: ImageUploadProps): ReactElement {
  const [imageItems, setImageItems] = useState<ImageItem[]>(() =>
    images.map((url, index) => ({
      id: `existing-${index}`,
      url,
      isExisting: true,
    })),
  )
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateParent = useCallback(
    (items: ImageItem[]) => {
      const existingUrls = items
        .filter((item) => item.isExisting && item.url.startsWith("http"))
        .map((item) => item.url)

      const newFiles = items.filter((item) => !item.isExisting && item.file).map((item) => item.file!)

      console.log("[v0] Updating parent - existing URLs:", existingUrls.length, "new files:", newFiles.length)
      onImagesChange(existingUrls)
      onFilesChange(newFiles)
    },
    [onImagesChange, onFilesChange],
  )

  React.useEffect(() => {
    const currentExistingUrls = imageItems.filter((item) => item.isExisting).map((item) => item.url)

    if (JSON.stringify(currentExistingUrls.sort()) !== JSON.stringify(images.sort())) {
      const existingItems = images.map((url, index) => ({
        id: `existing-${index}-${Date.now()}`,
        url,
        isExisting: true,
      }))

      const newFileItems = imageItems.filter((item) => !item.isExisting)
      setImageItems([...existingItems, ...newFileItems])
    }
  }, [images])

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const currentCount = imageItems.length
    const remainingSlots = maxImages - currentCount

    if (fileArray.length > remainingSlots) {
      alert(`Solo puedes agregar ${remainingSlots} imagen(es) más`)
      return
    }

    const newItems: ImageItem[] = fileArray.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file,
      isExisting: false,
    }))

    const updatedItems = [...imageItems, ...newItems]
    setImageItems(updatedItems)
    updateParent(updatedItems)
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
    const item = imageItems[index]

    if (!item.isExisting && item.url.startsWith("blob:")) {
      URL.revokeObjectURL(item.url)
    }

    const newItems = imageItems.filter((_, i) => i !== index)
    setImageItems(newItems)
    updateParent(newItems)
  }

  const addManualUrl = () => {
    const url = prompt("Ingresa la URL de la imagen:")
    if (url && url.trim()) {
      const trimmedUrl = url.trim()
      if (!trimmedUrl.startsWith("http") && !trimmedUrl.startsWith("https")) {
        alert("Por favor ingresa una URL válida que comience con http:// o https://")
        return
      }

      if (imageItems.length < maxImages) {
        const newItem: ImageItem = {
          id: `manual-${Date.now()}`,
          url: trimmedUrl,
          isExisting: true,
        }
        const newItems = [...imageItems, newItem]
        setImageItems(newItems)
        updateParent(newItems)
      } else {
        alert(`Máximo ${maxImages} imágenes permitidas`)
      }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imágenes ({imageItems.length}/{maxImages})
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={imageItems.length >= maxImages}
            className="bg-transparent"
          >
            <HiUpload className="w-4 h-4 mr-2" />
            Seleccionar
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addManualUrl}
            disabled={imageItems.length >= maxImages}
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
      {imageItems.length < maxImages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-primary/5"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center">
            <HiPhotograph className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Arrastra imágenes aquí o haz clic en "Seleccionar"</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 10MB</p>
            <p className="text-xs text-blue-600 mt-1">Las imágenes se subirán al crear/guardar el producto</p>
          </div>
        </motion.div>
      )}

      {/* Image preview grid */}
      {imageItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {imageItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    onError={(e) => {
                      console.error("[v0] Image load error:", item.url)
                      const target = e.currentTarget as HTMLImageElement
                      if (!target.src.includes("placeholder.svg")) {
                        target.src = "/placeholder.svg?height=200&width=200"
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                  {!item.isExisting && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Nuevo</div>
                  )}

                  {/* Delete button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0"
                  >
                    <HiTrash className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center truncate">
                  {item.isExisting ? "Existente" : "Para subir"} - Imagen {index + 1}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Las imágenes nuevas se subirán cuando guardes el {folder === "products" ? "producto" : "trabajo"}</p>
        <p>• Las imágenes se optimizarán automáticamente a formato WebP</p>
      </div>
    </div>
  )
}
