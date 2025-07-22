import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProductsSection } from "@/components/products-section"
import { WorksSection } from "@/components/works-section"
import { ContactSection } from "@/components/contact-section"
import { use } from "react"

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
