import { MetadataRoute } from 'next'
import { getAllProductsCategory } from '@/lib/db/products_category'
import { getWorks } from '@/lib/db/works'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arkitecnicos.com'

  // Static routes
  const routes = [
    '',
    '/es',
    '/en',
    '/es/productos',
    '/en/productos',
    '/es/servicios',
    '/en/servicios',
    '/es/trabajos',
    '/en/trabajos',
    '/es/contacto',
    '/en/contacto',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // Dynamic routes: Categories
  const categories = await getAllProductsCategory()
  const categoryRoutes = categories.flatMap((category) => [
    {
      url: `${baseUrl}/es/productos/${category.idname}`,
      lastModified: new Date(category.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/productos/${category.idname}`,
      lastModified: new Date(category.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  // Dynamic routes: Works
  const works = await getWorks()
  const workRoutes = works.flatMap((work) => [
    {
      url: `${baseUrl}/es/trabajos/${work.idname}`,
      lastModified: new Date(), // Using current date as work.date might be a display string like "Enero 2024"
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/trabajos/${work.idname}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  return [...routes, ...categoryRoutes, ...workRoutes]
}
