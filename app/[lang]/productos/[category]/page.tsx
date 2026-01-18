import { CategoryClient } from "./CategoryClient"
import { getProductsByCategoryIdname } from "@/lib/db/products"
import { getProductsCategoryByIdname } from "@/lib/db/products_category"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>
}): Promise<Metadata> {
  const { lang, category } = await params
  const categoryInfo = await getProductsCategoryByIdname(category)

  if (!categoryInfo) {
    return {
      title: "Categoría no encontrada | Arkitecnicos",
    }
  }

  const title =
    lang === "es"
      ? `${categoryInfo.name} en Barranquilla | Arkitecnicos`
      : `${categoryInfo.name} in Barranquilla | Arkitecnicos`

  const description =
    lang === "es"
      ? `Encuentra los mejores ${categoryInfo.name} en Barranquilla. ${categoryInfo.description}`
      : `Find the best ${categoryInfo.name} in Barranquilla. ${categoryInfo.description}`

  return {
    title,
    description,
    keywords: [
      categoryInfo.name,
      `Venta de ${categoryInfo.name}`,
      `Instalación de ${categoryInfo.name}`,
      "Barranquilla",
      "Automatización",
      ...(categoryInfo.items || []),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      siteName: "Arkitecnicos",
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params

  let products: any[] = []
  let categoryInfo = null
  let error = null

  try {
    const [productsData, categoryData] = await Promise.all([
      getProductsByCategoryIdname(category),
      getProductsCategoryByIdname(category),
    ])
    products = productsData
    categoryInfo = categoryData
  } catch (err) {
    console.error("Error loading data:", err)
    error = err instanceof Error ? err.message : "Error desconocido"
  }

  return <CategoryClient products={products} categoryInfo={categoryInfo} lang={lang} error={error} />
}
