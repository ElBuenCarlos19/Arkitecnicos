import { ProductDetailClient } from "./ProductDetailClient"
import { getProductByIdname } from "@/lib/db/products"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id } = await params
  const product = await getProductByIdname(id)

  if (!product) {
    return {
      title: "Producto no encontrado | Arkitecnicos",
    }
  }

  const title =
    lang === "es"
      ? `${product.name} | Arkitecnicos Barranquilla`
      : `${product.name} | Arkitecnicos Barranquilla`

  const description =
    lang === "es"
      ? `Compra ${product.name} en Barranquilla. ${product.description}. Automatización y seguridad garantizada.`
      : `Buy ${product.name} in Barranquilla. ${product.description}. Automation and security guaranteed.`

  return {
    title,
    description,
    keywords: [
      product.name,
      "Comprar " + product.name,
      "Precio " + product.name,
      product.products_category?.name || "Automatización",
      "Barranquilla",
      "Colombia",
      ...(product.features || []),
    ],
    openGraph: {
      title,
      description,
      type: "website", // Changed to website as 'product' type is not standard OG, but we use JSON-LD for that
      locale: lang,
      siteName: "Arkitecnicos",
      images: product.images_url?.[0]
        ? [
          {
            url: product.images_url[0],
            width: 800,
            height: 600,
            alt: product.name,
          },
        ]
        : [],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params

  let product = null
  let error = null

  try {
    product = await getProductByIdname(id)
  } catch (err) {
    console.error("Error loading product:", err)
    error = err instanceof Error ? err.message : "Error desconocido"
  }

  // JSON-LD Structured Data for Product
  const jsonLd = product
    ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.images_url,
      description: product.description,
      brand: {
        "@type": "Brand",
        name: "Arkitecnicos", // Or the specific brand if available in DB
      },
      offers: {
        "@type": "Offer",
        url: `https://arkitecnicos.com/${lang}/productos/producto/${product.idname}`,
        priceCurrency: "COP",
        price: "0", // Replace with actual price if available, or use "Call for price" logic
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Arkitecnicos",
        },
      },
    }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient product={product} lang={lang} error={error} />
    </>
  )
}
