import { WorkDetailClient } from "./WorkDetailClient"
import { getWorkByIdname } from "@/lib/db/works"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id } = await params
  const work = await getWorkByIdname(id)

  if (!work) {
    return {
      title: "Trabajo no encontrado | Arkitecnicos",
    }
  }

  const title =
    lang === "es" ? `${work.name} | Proyectos Arkitecnicos` : `${work.name} | Arkitecnicos Projects`

  const description =
    lang === "es"
      ? `Proyecto realizado: ${work.name}. Cliente: ${work.client}. Ubicación: ${work.location}. ${work.description}`
      : `Project completed: ${work.name}. Client: ${work.client}. Location: ${work.location}. ${work.description}`

  return {
    title,
    description,
    keywords: [
      work.name,
      work.client,
      work.location,
      "Proyecto Automatización",
      "Caso de Éxito",
      ...(work.tags || []),
    ],
    openGraph: {
      title,
      description,
      type: "article",
      locale: lang,
      siteName: "Arkitecnicos",
      images: work.image_urls?.[0]
        ? [
          {
            url: work.image_urls[0],
            width: 1200,
            height: 630,
            alt: work.name,
          },
        ]
        : [],
    },
  }
}

export default async function WorkDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params

  let work = null
  let error = null

  try {
    work = await getWorkByIdname(id)
  } catch (err) {
    console.error("Error loading work:", err)
    error = err instanceof Error ? err.message : "Error desconocido"
  }

  return <WorkDetailClient work={work} lang={lang} error={error} />
}
