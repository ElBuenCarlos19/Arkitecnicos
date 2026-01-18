import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProductsSection } from "@/components/products-section"
import { WorksSection } from "@/components/works-section"
import { ContactSection } from "@/components/contact-section"
import { use } from "react"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const title =
    lang === "es"
      ? "Arkitecnicos | Motores para Portones Levadizos, Corredizos y Batientes en Barranquilla"
      : "Arkitecnicos | Lifting, Sliding, and Swinging Gate Motors in Barranquilla"

  const description =
    lang === "es"
      ? "Líderes en automatización en Barranquilla. Venta de motores para todo tipo de portones (levadizos, corredizos, batientes), cerraduras digitales Accessmatic y sistemas de seguridad."
      : "Leaders in automation in Barranquilla. Sales of motors for all types of gates (lifting, sliding, swinging), Accessmatic digital locks, and security systems."

  return {
    title,
    description,
    keywords: [
      "Portones Barranquilla",
      "Motores Puertas Levadizas",
      "Motores Puertas Corredizas",
      "Motores Puertas Batientes",
      "Automatización de Portones",
      "Cerraduras Inteligentes",
      "Accessmatic",
      "Seguridad Electrónica",
      "Barranquilla",
      "Atlántico",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      siteName: "Arkitecnicos",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Arkitecnicos - Automatización Industrial",
        },
      ],
    },
    alternates: {
      canonical: `https://arkitecnicos.com/${lang}`,
      languages: {
        es: "https://arkitecnicos.com/es",
        en: "https://arkitecnicos.com/en",
      },
    },
  }
}

export default function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)

  return (
    <div className="min-h-screen">
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <ServicesSection lang={lang} />
      <ProductsSection lang={lang} />
      <WorksSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  )
}
