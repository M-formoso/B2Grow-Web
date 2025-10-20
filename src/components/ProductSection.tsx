import { useState, useRef } from "react";
import ProductGallery from "./ProductGallery";
import DotGrid from "@/components/effects/DotGrid";
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

// Import UFO DECO images
import ufoDecoBanner1 from "@/assets/b2grow-greenside/images/ufo-deco/banner-deco-1.png";
import ufoDecoBanner2 from "@/assets/b2grow-greenside/images/ufo-deco/banner-deco-2.png";
import ufoDecoBanner3 from "@/assets/b2grow-greenside/images/ufo-deco/banner-deco-3.png";
import ufoDecoProduct from "@/assets/b2grow-greenside/images/ufo-deco/banner-deco-product.png";

// Import UFO INDUSTRIAL images
import ufoIndustrialHB12_150w_1 from "@/assets/b2grow-greenside/images/ufo-industrial/hb12-150w-1.png";
import ufoIndustrialHB12_150w_2 from "@/assets/b2grow-greenside/images/ufo-industrial/hb12-150w-2.png";
import ufoIndustrialHB12_200w_1 from "@/assets/b2grow-greenside/images/ufo-industrial/hb12-200w-1.png";
import ufoIndustrialHB12_200w_2 from "@/assets/b2grow-greenside/images/ufo-industrial/hb12-200w-2.png";

// Import background images for product cards
import greensideBg from "@/assets/greenside-bg.png";
import multiselectBg from "@/assets/multiselect-bg.png";

const productLines = [
  {
    lineId: "greenside",
    lineName: "LÍNEA GREENSIDE",
    lineSubtitle: "ESTACIONES DE ENERGÍA",
    description: "Soluciones inteligentes de energía portátil y solar para independencia energética",
    categories: [
      {
        categoryName: "ESTACIÓN DE ENERGÍA",
        categoryDescription: "Estación de energía inteligente escalable y transportable",
        features: [
          "Anti cortes de energía",
          "UPS profesional con 3 configuraciones",
          "Sin mantenimiento",
          "Sin ruidos",
          "Sin combustibles, sin humo",
          "A tu medida, escalable a tu necesidad",
          "Fácil de trasladar y transportar",
          "Múltiples usos y aplicaciones",
          "Aplicación móvil con excelente experiencia de usuario",
          "3 Garantía en baterías / 5 años en Base principal e inversores"
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
        categoryName: "PANEL SOLAR 200W",
        categoryDescription: "Panel Solar Plegable Portátil 200W",
        features: [
          "Alta eficiencia 23%",
          "Celdas solares 10% más largas",
          "Salida Máxima 220W",
          "Tipo Monocristalino avanzado - Grado A+",
          "Soportes",
          "Diseño desmontable",
          "Kit de soporte ajustable, con estacas de seguridad",
          "Angulos ajustables 35º-45º-55º",
          "Resistente a la intemperie y duradero - IP67",
          "Energía portátil que te sigue el ritmo",
          "Resiste lo que otros no",
          "Plegalo. Guardalo. Llevá tu energía.",
          "Carga rápida, sin excusas"
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
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
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
    
    if ((activeModule === "greenside" || activeModule === "multiselect") && line) {
      // If no subcategory is selected, show the subcategory selection
      if (!activeSubcategory) {
        const isGreenside = activeModule === "greenside";
        const subcategories = isGreenside 
          ? [
              { id: "power-station", name: "ESTACIÓN DE ENERGÍA", subtitle: "Energía Inteligente", icon: Battery },
              { id: "solar-panel", name: "PANEL SOLAR 200W", subtitle: "Energía Solar Portátil", icon: Battery }
            ]
          : [
              { id: "deco", name: "UFO DECO", subtitle: "Luminaria Decorativa", icon: Lightbulb },
              { id: "industrial", name: "UFO INDUSTRIAL", subtitle: "Luminaria Industrial", icon: Lightbulb }
            ];

        return (
          <div className="space-y-8">
            <div ref={headerContainerRef} className="relative text-center space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold">
                <VariableProximity
                  label={line.lineName}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 900, 'opsz' 40"
                  containerRef={headerContainerRef}
                  radius={150}
                  falloff="linear"
                  className="text-foreground"
                />
              </h3>
              <p className="text-xl font-semibold text-primary">
                <VariableProximity
                  label={line.lineSubtitle}
                  fromFontVariationSettings="'wght' 300, 'opsz' 9"
                  toFontVariationSettings="'wght' 700, 'opsz' 30"
                  containerRef={headerContainerRef}
                  radius={120}
                  falloff="linear"
                />
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <VariableProximity
                  label={line.description}
                  fromFontVariationSettings="'wght' 300, 'opsz' 9"
                  toFontVariationSettings="'wght' 600, 'opsz' 25"
                  containerRef={headerContainerRef}
                  radius={100}
                  falloff="linear"
                />
              </p>
            </div>

            {/* Subcategory Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subcategories.map((subcat) => {
                const Icon = subcat.icon;
                const gradientColor = isGreenside ? "from-emerald-500 to-green-600" : "from-amber-500 to-yellow-600";
                const hoverBorderColor = isGreenside ? "hover:border-emerald-500/60" : "hover:border-amber-500/60";

                return (
                  <Card
                    key={subcat.id}
                    className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-primary/20 ${hoverBorderColor} bg-card/80 backdrop-blur-sm overflow-hidden`}
                    onClick={() => setActiveSubcategory(subcat.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <CardHeader className="relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {subcat.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary/80">
                        {subcat.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="mt-4 flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        <span>Ver más</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      }

      // Show specific subcategory content
      const category = line.categories?.find(cat => {
        if (activeModule === "greenside") {
          return (activeSubcategory === "power-station" && cat.categoryName === "ESTACIÓN DE ENERGÍA") ||
                 (activeSubcategory === "solar-panel" && cat.categoryName === "PANEL SOLAR 200W");
        } else {
          return (activeSubcategory === "deco" && cat.categoryName === "UFO DECO") ||
                 (activeSubcategory === "industrial" && cat.categoryName === "UFO INDUSTRIAL");
        }
      });

      if (!category) return null;

      return (
        <div className="space-y-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setActiveSubcategory(null)}
              className="gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Categorías
            </Button>
          </div>

          <div ref={headerContainerRef} className="relative text-center space-y-3">
            <h4 className="text-2xl lg:text-3xl font-bold">
              <VariableProximity
                label={category.categoryName}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={headerContainerRef}
                radius={150}
                falloff="linear"
                className="text-foreground"
              />
            </h4>
            <p className="text-muted-foreground max-w-xl mx-auto">
              <VariableProximity
                label={category.categoryDescription}
                fromFontVariationSettings="'wght' 300, 'opsz' 9"
                toFontVariationSettings="'wght' 600, 'opsz' 25"
                containerRef={headerContainerRef}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          {/* Images Gallery for Greenside Products */}
          {activeModule === "greenside" && "images" in category && category.images && (
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.slice(0, 6).map((img, idx) => (
                  <img 
                    key={idx}
                    src={img.src} 
                    alt={`${category.categoryName} - Imagen ${idx + 1}`}
                    className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                  />
                ))}
              </div>
              {category.images.length > 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.images.slice(6).map((img, idx) => (
                    <img 
                      key={idx + 6}
                      src={img.src} 
                      alt={`${category.categoryName} - Imagen detalle ${idx + 1}`}
                      className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Images Gallery for Multiselect Products */}
          {activeModule === "multiselect" && activeSubcategory === "deco" && (
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={ufoDecoBanner1} 
                  alt="UFO DECO - Línea Deco adaptable a todos los ambientes" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
                <img 
                  src={ufoDecoBanner2} 
                  alt="UFO DECO - Calidad, Diseño y Confort" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={ufoDecoBanner3} 
                  alt="UFO DECO - Grandes prestaciones para todos tus proyectos" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
                <img 
                  src={ufoDecoProduct} 
                  alt="UFO DECO - Características del producto" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>
          )}

          {activeModule === "multiselect" && activeSubcategory === "industrial" && (
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-lg p-6 border-2 border-amber-500/40 hover:border-amber-500/60 transition-all hover:scale-105 text-center">
                  <div className="text-5xl font-bold text-amber-500 mb-2">100W</div>
                  <div className="text-sm text-muted-foreground">Potencia Baja</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-lg p-6 border-2 border-amber-500/40 hover:border-amber-500/60 transition-all hover:scale-105 text-center">
                  <div className="text-5xl font-bold text-amber-500 mb-2">150W</div>
                  <div className="text-sm text-muted-foreground">Potencia Media</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-lg p-6 border-2 border-amber-500/40 hover:border-amber-500/60 transition-all hover:scale-105 text-center">
                  <div className="text-5xl font-bold text-amber-500 mb-2">200W</div>
                  <div className="text-sm text-muted-foreground">Potencia Alta</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={ufoIndustrialHB12_150w_1} 
                  alt="UFO INDUSTRIAL B2G-HB12 150W - Vista superior" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
                <img 
                  src={ufoIndustrialHB12_150w_2} 
                  alt="UFO INDUSTRIAL B2G-HB12 150W - Vista lateral" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={ufoIndustrialHB12_200w_1} 
                  alt="UFO INDUSTRIAL B2G-HB12 200W - Vista frontal" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
                <img 
                  src={ufoIndustrialHB12_200w_2} 
                  alt="UFO INDUSTRIAL B2G-HB12 200W - Vista detalle LED" 
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>
          )}

          {/* Features List */}
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

          {/* Product Cards (only for Multiselect) */}
          {activeModule === "multiselect" && "products" in category && category.products && (
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
          )}
        </div>
      );
    }


    if (activeModule === "calculator") {
      return (
        <div className="space-y-8">
          <div ref={headerContainerRef} className="relative text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold">
              <VariableProximity
                label="Calculadora de Eficiencia Energética"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={headerContainerRef}
                radius={150}
                falloff="linear"
                className="text-foreground"
              />
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <VariableProximity
                label="Armá un producto a tu medida según tus necesidades"
                fromFontVariationSettings="'wght' 300, 'opsz' 9"
                toFontVariationSettings="'wght' 600, 'opsz' 25"
                containerRef={headerContainerRef}
                radius={100}
                falloff="linear"
              />
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
      {/* DotGrid Background Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <DotGrid 
          dotSize={4}
          gap={20}
          baseColor="#ffffff"
          activeColor="#ffffff"
          proximity={120}
          shockRadius={200}
          shockStrength={4}
          resistance={800}
          returnDuration={1.2}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Back Button - Only show when a module is active and no subcategory is selected */}
        {activeModule && !activeSubcategory && (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {modules.filter(m => m.id !== 'calculator').map((module) => {
                const Icon = module.icon;
                return (
                  <Card
                    key={module.id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-primary/20 hover:border-primary/60 bg-card/80 backdrop-blur-sm overflow-hidden min-h-[400px] flex flex-col justify-end"
                    onClick={() => setActiveModule(module.id)}
                  >
                    {/* Background Image */}
                    {module.id === "greenside" && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ backgroundImage: `url(${greensideBg})` }}
                      />
                    )}
                    {module.id === "multiselect" && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ backgroundImage: `url(${multiselectBg})` }}
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <CardContent className="relative pb-8">
                      <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        <span>Ver más</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Calculator Section */}
            <div className="space-y-8">
              <div ref={headerContainerRef} className="relative text-center space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold">
                  <VariableProximity
                    label="Calculadora de Eficiencia Energética"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 900, 'opsz' 40"
                    containerRef={headerContainerRef}
                    radius={150}
                    falloff="linear"
                    className="text-foreground"
                  />
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  <VariableProximity
                    label="Armá un producto a tu medida según tus necesidades"
                    fromFontVariationSettings="'wght' 300, 'opsz' 9"
                    toFontVariationSettings="'wght' 600, 'opsz' 25"
                    containerRef={headerContainerRef}
                    radius={100}
                    falloff="linear"
                  />
                </p>
              </div>
              <Calculator />
            </div>
          </>
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