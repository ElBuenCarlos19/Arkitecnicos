'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getFacilityById, updateFacility } from '@/lib/db/facilities'
import { Facility } from '@/actions/facilities'
import { ImageUpload } from '@/components/image-upload'
import { uploadMultipleImages } from '@/actions/image-upload'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, Save } from 'lucide-react'

export default function FacilityReportPage() {
    const params = useParams()
    const router = useRouter()
    const facilityId = params.id as string

    const [facility, setFacility] = useState<Facility | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    // Form state
    const [details, setDetails] = useState('')
    const [existingImages, setExistingImages] = useState<string[]>([])
    const [newFiles, setNewFiles] = useState<File[]>([])

    useEffect(() => {
        const loadFacility = async () => {
            try {
                const data = await getFacilityById(facilityId)
                if (data) {
                    setFacility(data)
                    setDetails(data.details || '')
                    setExistingImages(data.images || [])
                }
            } catch (error) {
                console.error('Error loading facility:', error)
            } finally {
                setLoading(false)
            }
        }

        loadFacility()
    }, [facilityId])

    const handleSave = async () => {
        setSaving(true)
        setMessage('')

        try {
            // Upload new images
            let uploadedUrls: string[] = []
            if (newFiles.length > 0) {
                const uploadResult = await uploadMultipleImages(newFiles, 'facilities', facilityId, 10)

                if (!uploadResult.success) {
                    setMessage(`Error al subir imágenes: ${uploadResult.errors.join(', ')}`)
                    setSaving(false)
                    return
                }

                uploadedUrls = uploadResult.urls
            }

            // Combine existing and new images
            const allImages = [...existingImages, ...uploadedUrls]

            // Update facility
            await updateFacility(facilityId, {
                details,
                images: allImages,
            })

            setMessage('Reporte guardado exitosamente')
            setNewFiles([])
            setExistingImages(allImages)
        } catch (error: any) {
            setMessage(`Error: ${error.message}`)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        )
    }

    if (!facility) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Instalación no encontrada</h1>
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Button variant="outline" onClick={() => router.push('/ArkitecnicosApp/facilities')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Instalaciones
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{facility.name}</h1>
                <p className="text-gray-500">Cliente: {facility.clients?.name || 'Desconocido'}</p>
                <p className="text-gray-500">Instalado: {new Date(facility.installation_date).toLocaleDateString()}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reporte Técnico</h2>

                <div className="space-y-6">
                    {/* Details */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Detalles de la Instalación
                        </label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Describe los detalles técnicos de la instalación, trabajos realizados, observaciones, etc."
                        />
                    </div>

                    {/* Image Upload */}
                    <ImageUpload
                        images={existingImages}
                        onImagesChange={setExistingImages}
                        onFilesChange={setNewFiles}
                        maxImages={10}
                        folder="facilities"
                    />

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar Reporte
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
