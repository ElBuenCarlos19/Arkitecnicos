import { ProductsClient } from "./ProductsClient"
import { getAllProductsCategory } from "@/lib/db/products_category"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const categories = await getAllProductsCategory()
  const categoryNames = categories.map((c) => c.name).join(", ")

  const title = lang === "es" ? "Catálogo de Motores y Automatismos | Arkitecnicos" : "Motors and Automation Catalog | Arkitecnicos"
  const description =
    lang === "es"
      ? `Catálogo completo de motores para portones levadizos, corredizos y batientes. Cerraduras digitales y accesorios de automatización en Barranquilla.`
      : `Complete catalog of motors for lifting, sliding, and swinging gates. Digital locks and automation accessories in Barranquilla.`

  return {
    title,
    description,
    keywords: [
      "Catálogo Motores",
      "Venta Motores Levadizos",
      "Venta Motores Corredizos",
      "Venta Motores Batientes",
      "Cerraduras Digitales",
      "Accessmatic",
      "Barranquilla",
      ...categories.map((c) => c.name),
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

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const categories = await getAllProductsCategory()

  return <ProductsClient categories={categories} lang={lang} />
}
