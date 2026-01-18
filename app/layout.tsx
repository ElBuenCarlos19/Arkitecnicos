import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://arkitecnicos.com"),
  title: {
    default: "Arkitecnicos - Automatismos Industriales y Seguridad",
    template: "%s | Arkitecnicos",
  },
  description:
    "Especialistas en automatización de accesos en Barranquilla. Venta e instalación de motores para puertas levadizas, corredizas y batientes. Cerraduras digitales y control de acceso Accessmatic.",
  keywords: [
    "Automatización",
    "Portones Eléctricos",
    "Barranquilla",
    "Motores para Puertas Levadizas",
    "Motores para Puertas Corredizas",
    "Motores para Puertas Batientes",
    "Cerraduras Digitales",
    "Accessmatic",
    "Control de Acceso",
    "Seguridad Electrónica",
    "Puertas Automáticas",
    "Mantenimiento de Portones",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://arkitecnicos.com",
    siteName: "Arkitecnicos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arkitecnicos - Soluciones de Automatización",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <link rel="icon" href="/logo.png" />
      <Analytics />
      <SpeedInsights />
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
