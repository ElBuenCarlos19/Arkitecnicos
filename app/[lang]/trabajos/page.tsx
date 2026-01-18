import { WorksClient } from "./WorksClient"
import { getWorks } from "@/lib/db/works"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const works = await getWorks()
  const workNames = works.map((w) => w.name).join(", ")

  const title = lang === "es" ? "Proyectos Realizados | Arkitecnicos" : "Completed Projects | Arkitecnicos"
  const description =
    lang === "es"
      ? `Conoce nuestros proyectos de automatización en Barranquilla. Portafolio de trabajos: ${workNames}. Calidad y experiencia comprobada.`
      : `Explore our automation projects in Barranquilla. Portfolio of works: ${workNames}. Proven quality and experience.`

  return {
    title,
    description,
    keywords: [
      "Proyectos Automatización",
      "Instalaciones Recientes",
      "Casos de Éxito",
      "Barranquilla",
      "Portones Eléctricos Instalados",
      ...works.map((w) => w.name),
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

export default async function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const works = await getWorks()

  return <WorksClient works={works} lang={lang} />
}
