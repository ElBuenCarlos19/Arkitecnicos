import { ServicesClient } from "./ServicesClient"
import { getServices } from "@/lib/db/services"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const services = await getServices()
  const serviceNames = services.map((s) => s.name).join(", ")

  const title = lang === "es" ? "Servicios de Automatización | Arkitecnicos" : "Automation Services | Arkitecnicos"
  const description =
    lang === "es"
      ? `Servicios profesionales de automatización en Barranquilla: ${serviceNames}. Mantenimiento, instalación y reparación de portones eléctricos y sistemas de seguridad.`
      : `Professional automation services in Barranquilla: ${serviceNames}. Maintenance, installation, and repair of electric gates and security systems.`

  return {
    title,
    description,
    keywords: [
      "Servicios Automatización",
      "Mantenimiento Portones",
      "Reparación Motores",
      "Instalación Portones Eléctricos",
      "Barranquilla",
      "Atlántico",
      ...services.map((s) => s.name),
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

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const services = await getServices()

  return <ServicesClient services={services} lang={lang} />
}
