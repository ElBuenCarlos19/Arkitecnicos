import type { Product } from "./cart"

export const products: Product[] = [
  // Motores para Puertas Abatibles
  {
    id: "motor-abatible-pro-400",
    name: "BULLDOZER 850",
    description: "Motor de alta potencia para puertas abatibles de hasta 400kg por hoja",
    price: 1200,
    image: "/ejemplo1.jpg",
    category: "motores-puertas-abatibles",
    specifications: {
      Potencia: "400W",
      "Peso máximo por hoja": "400kg",
      "Velocidad de apertura": "15-20 cm/s",
      Alimentación: "220V AC",
      "Temperatura de trabajo": "-20°C a +55°C",
      "Grado de protección": "IP44",
      Garantía: "3 años",
    },
    features: [
      "Control remoto incluido",
      "Sensores de seguridad",
      "Batería de respaldo",
      "Sistema anti-aplastamiento",
      "Programación de tiempos",
      "Compatible con domótica",
    ],
  },
  {
    id: "motor-abatible-eco-250",
    name: "FOX 1000 PRO",
    description: "Solución económica para puertas residenciales de hasta 250kg por hoja",
    price: 800,
    image: "/ejemplo2.jpg",
    category: "motores-puertas-abatibles",
    specifications: {
      Potencia: "250W",
      "Peso máximo por hoja": "250kg",
      "Velocidad de apertura": "12-18 cm/s",
      Alimentación: "220V AC",
      "Temperatura de trabajo": "-15°C a +50°C",
      "Grado de protección": "IP43",
      Garantía: "2 años",
    },
    features: [
      "Instalación sencilla",
      "Control remoto básico",
      "Bajo consumo energético",
      "Diseño compacto",
      "Funcionamiento silencioso",
    ],
  },
  // Motores para Puertas de Garaje
  {
    id: "motor-garaje-premium-800",
    name: "PITBULL 400",
    description: "Motor premium para puertas de garaje seccionales y basculantes",
    price: 1500,
    image: "/ejemplo3.jpg",
    category: "motores-puertas-garaje",
    specifications: {
      Potencia: "800W",
      "Peso máximo puerta": "150kg",
      "Altura máxima": "2.5m",
      Alimentación: "220V AC",
      Velocidad: "20 cm/s",
      "Ciclos por hora": "30",
      Garantía: "5 años",
    },
    features: [
      "Apertura silenciosa",
      "Sistema anti-aplastamiento",
      "Control por smartphone",
      "Iluminación LED integrada",
      "Detección de obstáculos",
      "Modo vacaciones",
    ],
  },
  // Motores para Puertas Corredizas
  {
    id: "motor-corrediza-industrial-1000",
    name: "Motor Corrediza Industrial 1000",
    description: "Motor industrial para puertas corredizas de gran peso",
    price: 2200,
    image: "/placeholder.svg?height=400&width=400&text=Motor+Corrediza+1000",
    category: "motores-puertas-corredizas",
    specifications: {
      Potencia: "1000W",
      "Peso máximo puerta": "800kg",
      Velocidad: "25 cm/s",
      Alimentación: "220V/380V AC",
      "Ciclos diarios": "500",
      "Grado de protección": "IP54",
      Garantía: "3 años",
    },
    features: [
      "Alta durabilidad",
      "Velocidad variable",
      "Detección de obstáculos",
      "Mantenimiento mínimo",
      "Control de frecuencia",
      "Monitoreo remoto",
    ],
  },
  // Motores para Cortinas Enrollables
  {
    id: "motor-cortina-solar-300",
    name: "Motor Cortina Solar 300",
    description: "Motor tubular para cortinas enrollables con control solar",
    price: 650,
    image: "/placeholder.svg?height=400&width=400&text=Motor+Cortina+300",
    category: "motores-cortinas-enrollables",
    specifications: {
      Potencia: "300W",
      Torque: "30 Nm",
      "Diámetro tubo": "60-70mm",
      Alimentación: "220V AC",
      Velocidad: "17 rpm",
      "Peso máximo cortina": "80kg",
      Garantía: "3 años",
    },
    features: [
      "Control de luz automático",
      "Programación horaria",
      "Sensor de viento",
      "Operación silenciosa",
      "Control remoto",
      "Posiciones programables",
    ],
  },
  // Motores para Puertas Peatonales
  {
    id: "motor-peatonal-access-200",
    name: "Motor Peatonal Access 200",
    description: "Sistema de automatización para puertas peatonales con control de acceso",
    price: 950,
    image: "/placeholder.svg?height=400&width=400&text=Motor+Peatonal+200",
    category: "motores-puertas-peatonales",
    specifications: {
      Potencia: "200W",
      "Peso máximo puerta": "120kg",
      Velocidad: "15 cm/s",
      Alimentación: "24V DC",
      "Ciclos por hora": "100",
      "Grado de protección": "IP65",
      Garantía: "2 años",
    },
    features: [
      "Control de acceso integrado",
      "Integración biométrica",
      "Registro de eventos",
      "Diseño compacto",
      "Batería de respaldo",
      "Comunicación TCP/IP",
    ],
  },
  // Talanqueras
  {
    id: "talanquera-smart-barrier",
    name: "Talanquera Smart Barrier",
    description: "Sistema de control vehicular con reconocimiento de placas",
    price: 3200,
    image: "/placeholder.svg?height=400&width=400&text=Smart+Barrier",
    category: "talanqueras",
    specifications: {
      "Longitud barrera": "3-6 metros",
      "Tiempo apertura": "3-6 segundos",
      Alimentación: "220V AC",
      "Temperatura trabajo": "-30°C a +70°C",
      "Ciclos diarios": "2000",
      "Grado protección": "IP54",
      Garantía: "3 años",
    },
    features: [
      "Reconocimiento de placas",
      "Integración con sistemas",
      "LED de señalización",
      "Construcción robusta",
      "Control remoto",
      "Sistema anti-vandalismo",
    ],
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}

export const getAllCategories = () => {
  const categories = Array.from(new Set(products.map((product) => product.category)))
  return categories
}
