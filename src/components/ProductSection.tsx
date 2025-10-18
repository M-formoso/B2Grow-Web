import { useState, useRef } from "react";
import ProductGallery from "./ProductGallery";
import Hyperspeed, { hyperspeedPresets } from "@/components/effects/Hyperspeed";
import VariableProximity from "@/components/effects/VariableProximity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Battery, Lightbulb, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Calculator from "./Calculator";

// Import Module Power Station images
import mainImage1 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-01.jpg";
import mainImage2 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-02.jpg";
import mainImage3 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-03.jpg";
import mainImage4 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-04.jpg";
import mainImage5 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-05.jpg";
import mainImage6 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-06.jpg";
import mainImage7 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-07.jpg";

import detailImage1 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-01.jpg";
import detailImage3 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-03.jpg";

// Import Solar Panel 200W images
import solarPanel01 from "@/assets/b2grow-greenside/images/solar-panel-200w/01.jpg";
import solarPanel02 from "@/assets/b2grow-greenside/images/solar-panel-200w/02.jpg";
import solarPanel03 from "@/assets/b2grow-greenside/images/solar-panel-200w/03.jpg";
import solarPanel04 from "@/assets/b2grow-greenside/images/solar-panel-200w/04.jpg";
import solarPanel05 from "@/assets/b2grow-greenside/images/solar-panel-200w/05.jpg";
import solarPanel08 from "@/assets/b2grow-greenside/images/solar-panel-200w/08.jpg";

const productLines = [
  {
    lineId: "greenside",
    lineName: "LÍNEA GREENSIDE",
    lineSubtitle: "ESTACIONES DE ENERGÍA",
    description: "Soluciones inteligentes de energía portátil y solar para independencia energética",
    products: [
      {
        name: "Estación de Energía Inteligente",
        description: "Estación de energía inteligente escalable y transportable. Anti cortes de energía, UPS profesional con 3 configuraciones. Sin mantenimiento, sin ruidos, sin combustibles. A tu medida, escalable a tu necesidad, fácil de trasladar y transportar.",
        features: [
          "3 Garantía en baterías",
          "5 años en Base principal e inversores",
          "Aplicación móvil con excelente experiencia de usuario",
          "Múltiples usos y aplicaciones"
        ],
        images: [
          { src: mainImage1, category: "Principal" },
          { src: mainImage2, category: "Principal" },
          { src: mainImage3, category: "Principal" },
          { src: mainImage4, category: "Principal" },
          { src: mainImage5, category: "Principal" },
          { src: mainImage6, category: "Principal" },
          { src: mainImage7, category: "Principal" },
          { src: detailImage1, category: "Detalle" },
          { src: detailImage3, category: "Detalle" }
        ]
      },
      {
        name: "Panel Solar Plegable Portátil 200W",
        description: "Panel solar plegable de alta eficiencia con certificación A+ y resistencia IP67. Diseñado para exploradores, probado por la naturaleza.",
        features: [
          "Alta eficiencia 23%",
          "Salida Máxima 220W",
          "Tipo Monocristalino avanzado - Grado A+",
          "Resistente a la intemperie - IP67",
          "Kit de soporte ajustable (35º-45º-55º)"
        ],
        images: [
          { src: solarPanel01, category: "Principal" },
          { src: solarPanel02, category: "Principal" },
          { src: solarPanel03, category: "Principal" },
          { src: solarPanel04, category: "Principal" },
          { src: solarPanel05, category: "Principal" },
          { src: solarPanel08, category: "Principal" }
        ]
      }
    ]
  },
  {
    lineId: "multiselect",
    lineName: "LÍNEA MULTISELECT",
    lineSubtitle: "LUMINARIAS",
    description: "Luminarias inteligentes con tecnología multiselect para máxima eficiencia y versatilidad",
    categories: [
      {
        categoryName: "UFO INDUSTRIAL",
        categoryDescription: "Luminaria industrial con múltiples diferenciales integrados en una solución competitiva",
        features: [
          "Potencia seleccionable en la misma luminaria (alta-media-baja)",
          "Color seleccionable desde el producto (Blanco cálido – neutro – frío)",
          "Ángulo dinámico en el producto (60-90-120°)",
          "Sensor opcional de movimiento y luz día, con hasta 20 mts de alcance",
          "Dimerizable 1-10V",
          "Temperatura de funcionamiento: -20 a + 45ºC",
          "5 años de garantía"
        ],
        products: [
          {
            name: "B2GHB12-100W",
            description: "Luminaria LED Colgante o de fijar - 100W",
            specs: ["100W", "IP65", "5 años garantía"]
          },
          {
            name: "B2G-HB12-150W",
            description: "Luminaria LED Colgante o de fijar - 150W",
            specs: ["150W", "IP65", "5 años garantía"]
          },
          {
            name: "B2G-HB12-200W",
            description: "Luminaria LED Colgante o de fijar - 200W",
            specs: ["200W", "IP65", "5 años garantía"]
          }
        ]
      },
      {
        categoryName: "UFO DECO",
        categoryDescription: "Luminaria comercial, profesional y decorativa con múltiples diferenciales integrados",
        features: [
          "Potencia seleccionable en la misma luminaria (alta-media-baja)",
          "Color seleccionable desde el producto (Blanco cálido – neutro – frío)",
          "Frente difuso con control de deslumbramiento",
          "Sensor opcional de movimiento y luz día, con hasta 20 mts de alcance",
          "Dimerizable 1-10V",
          "Temperatura de funcionamiento: -20 a + 45ºC",
          "5 años de garantía"
        ],
        products: [
          {
            name: "B2GDECO12-100W",
            description: "Luminaria LED Colgante Decorativa - 100W",
            specs: ["100W", "Control deslumbramiento", "5 años garantía"]
          }
        ]
      }
    ]
  }
];

const ProductSection = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  const modules = [
    {
      id: "greenside",
      title: "LÍNEA GREENSIDE",
      subtitle: "Estaciones de Energía",
      description: "Soluciones inteligentes de energía portátil y solar para independencia energética",
      icon: Battery,
      color: "from-emerald-500 to-green-600"
    },
    {
      id: "multiselect",
      title: "LÍNEA MULTISELECT",
      subtitle: "Luminarias",
      description: "Luminarias inteligentes con tecnología multiselect para máxima eficiencia",
      icon: Lightbulb,
      color: "from-amber-500 to-yellow-600"
    },
    {
      id: "calculator",
      title: "CALCULADORA",
      subtitle: "Armá un Producto a tu Medida",
      description: "Calculá tu solución energética personalizada según tus necesidades",
      icon: CalcIcon,
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const renderModuleContent = () => {
    const line = productLines.find(l => l.lineId === activeModule);
    
    if (activeModule === "greenside" && line) {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold">
              <span className="text-foreground">{line.lineName}</span>
            </h3>
            <p className="text-xl font-semibold text-primary">{line.lineSubtitle}</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{line.description}</p>
          </div>
          <ProductGallery products={line.products} />
        </div>
      );
    }

    if (activeModule === "multiselect" && line) {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold">
              <span className="text-foreground">{line.lineName}</span>
            </h3>
            <p className="text-xl font-semibold text-primary">{line.lineSubtitle}</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{line.description}</p>
          </div>
          
          {line.categories && (
            <div className="space-y-16">
              {line.categories.map((category, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="text-center space-y-3">
                    <h4 className="text-2xl lg:text-3xl font-bold text-foreground">
                      {category.categoryName}
                    </h4>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                      {category.categoryDescription}
                    </p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-primary/20">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product, pIdx) => (
                      <div 
                        key={pIdx}
                        className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105"
                      >
                        <h5 className="text-xl font-bold text-foreground mb-2">
                          {product.name}
                        </h5>
                        <p className="text-sm text-muted-foreground mb-4">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.specs.map((spec, sIdx) => (
                            <span 
                              key={sIdx}
                              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeModule === "calculator") {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold">
              <span className="text-foreground">Calculadora de </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Eficiencia Energética</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Armá un producto a tu medida según tus necesidades
            </p>
          </div>
          <Calculator />
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-20 bg-gradient-tech relative overflow-hidden">
      {/* Hyperspeed Background Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Hyperspeed 
          effectOptions={hyperspeedPresets.one}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerContainerRef} className="relative text-center mb-16 animate-slide-up overflow-hidden">
          {/* Content over the effect */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <VariableProximity
                label="Nuestros Productos"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={headerContainerRef}
                radius={150}
                falloff="linear"
                className="text-foreground"
              />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <VariableProximity
                label="Tecnología, eficiencia energética y sustentabilidad fusionadas en soluciones inteligentes para múltiples industrias."
                fromFontVariationSettings="'wght' 300, 'opsz' 9"
                toFontVariationSettings="'wght' 700, 'opsz' 30"
                containerRef={headerContainerRef}
                radius={120}
                falloff="linear"
              />
            </p>
          </div>
        </div>

        {/* Back Button - Only show when a module is active */}
        {activeModule && (
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setActiveModule(null)}
              className="gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
          </div>
        )}

        {/* Dashboard Cards or Module Content */}
        {!activeModule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-primary/20 hover:border-primary/60 bg-card/80 backdrop-blur-sm overflow-hidden"
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary/80">
                      {module.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <p className="text-muted-foreground">
                      {module.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                      <span>Ver más</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="animate-fade-in">
            {renderModuleContent()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;