import { useState, useRef, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import DotGrid from "@/components/effects/DotGrid";
import VariableProximity from "@/components/effects/VariableProximity";
import ScrollReveal from "@/components/effects/ScrollReveal";
import GradientText from "@/components/effects/GradientText";
import DecryptedText from "@/components/effects/DecryptedText";
import { ArrowLeft, Battery, Lightbulb, Calculator as CalcIcon, Zap, Sun, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Calculator from "./Calculator";
import { useCursorColor } from "@/contexts/CursorColorContext";
import { motion } from "framer-motion";

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
  const { setColor } = useCursorColor();

  // Update cursor color based on active module
  useEffect(() => {
    if (activeModule === 'greenside') {
      setColor('green');
    } else if (activeModule === 'multiselect') {
      setColor('yellow');
    } else {
      setColor('white');
    }
  }, [activeModule, setColor]);

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
              { id: "power-station", name: "ESTACIÓN DE ENERGÍA", subtitle: "Energía Inteligente", icon: Zap, color: "#10b981" },
              { id: "solar-panel", name: "PANEL SOLAR 200W", subtitle: "Energía Solar Portátil", icon: Sun, color: "#10b981" }
            ]
          : [
              { id: "deco", name: "UFO DECO", subtitle: "Luminaria Decorativa", icon: Sparkles, color: "#f59e0b" },
              { id: "industrial", name: "UFO INDUSTRIAL", subtitle: "Luminaria Industrial", icon: Lightbulb, color: "#f59e0b" }
            ];

        return (
          <div className="space-y-16">
            <div ref={headerContainerRef} className="relative text-center space-y-6">
              <GradientText 
                colors={isGreenside ? ['#10b981', '#34d399', '#6ee7b7', '#10b981'] : ['#f59e0b', '#fbbf24', '#fcd34d', '#f59e0b']}
                animationSpeed={6}
                className="text-4xl lg:text-6xl font-black"
              >
                {line.lineName}
              </GradientText>
              <div className="text-2xl lg:text-3xl font-bold">
                <DecryptedText 
                  text={line.lineSubtitle}
                  animateOn="view"
                  speed={30}
                />
              </div>
              <div className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={3} blurStrength={8}>
                  {line.description}
                </ScrollReveal>
              </div>
            </div>

            {/* Subcategory Selection - Dynamic Layout */}
            <div className="space-y-20 max-w-7xl mx-auto">
              {subcategories.map((subcat, index) => {
                const Icon = subcat.icon;
                const categoryData = line.categories[index];
                const isEven = index % 2 === 0;

                return (
                  <motion.div 
                    key={subcat.id} 
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                      {/* Icon and Title Section */}
                      <div className="flex-1 space-y-6">
                        <motion.div
                          className="inline-flex items-center gap-4 cursor-pointer group"
                          onClick={() => setActiveSubcategory(subcat.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all"
                            style={{ 
                              background: `linear-gradient(135deg, ${subcat.color}22, ${subcat.color}44)`,
                              border: `2px solid ${subcat.color}66`
                            }}
                          >
                            <Icon className="h-10 w-10" style={{ color: subcat.color }} />
                          </div>
                          <div className="text-left">
                            <h4 className="text-3xl lg:text-4xl font-black tracking-tight group-hover:text-primary transition-colors">
                              {subcat.name}
                            </h4>
                            <p className="text-lg font-semibold" style={{ color: subcat.color }}>
                              {subcat.subtitle}
                            </p>
                          </div>
                        </motion.div>

                        <div className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                          <ScrollReveal baseOpacity={0.2} enableBlur={true} baseRotation={2} blurStrength={6}>
                            {categoryData.categoryDescription}
                          </ScrollReveal>
                        </div>

                        <Button
                          onClick={() => setActiveSubcategory(subcat.id)}
                          className="group gap-2"
                          size="lg"
                        >
                          <span>Explorar {subcat.name}</span>
                          <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      {/* Features Section */}
                      <div className="flex-1 space-y-4">
                        {categoryData.features.slice(0, 6).map((feature, fIdx) => (
                          <motion.div
                            key={fIdx}
                            className="flex items-start gap-3 bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-primary/10 hover:border-primary/30 transition-all"
                            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: fIdx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: subcat.color }} />
                            <span className="text-sm lg:text-base text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
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

      const categoryColor = activeModule === "greenside" ? "#10b981" : "#f59e0b";
      
      return (
        <div className="space-y-12">
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

          <div ref={headerContainerRef} className="relative text-center space-y-6">
            <GradientText 
              colors={activeModule === "greenside" ? ['#10b981', '#34d399', '#6ee7b7', '#10b981'] : ['#f59e0b', '#fbbf24', '#fcd34d', '#f59e0b']}
              animationSpeed={6}
              className="text-3xl lg:text-5xl font-black"
            >
              {category.categoryName}
            </GradientText>
            <div className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={3} blurStrength={8}>
                {category.categoryDescription}
              </ScrollReveal>
            </div>
          </div>

          {/* Images Gallery for Greenside Products - NEW LAYOUT */}
          {activeModule === "greenside" && "images" in category && category.images && (
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Alternating Images and Features */}
                <div className="flex-1 space-y-16">
                  {(() => {
                    const mainImages = category.images.filter(img => img.category === "Principal");
                    const features = category.features;
                    const items = [];
                    
                    // Intercalate images and features
                    const maxItems = Math.max(mainImages.length, Math.ceil(features.length / 3));
                    for (let i = 0; i < maxItems; i++) {
                      // Add image if available
                      if (mainImages[i]) {
                        items.push({
                          type: 'image',
                          data: mainImages[i],
                          index: i
                        });
                      }
                      
                      // Add 2-3 features as a text block
                      const featureStart = i * 3;
                      const featureSlice = features.slice(featureStart, featureStart + 3);
                      if (featureSlice.length > 0) {
                        items.push({
                          type: 'features',
                          data: featureSlice,
                          index: i
                        });
                      }
                    }
                    
                    return items.map((item, idx) => {
                      if (item.type === 'image') {
                        return (
                          <motion.div
                            key={`img-${idx}`}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03 }}
                            className="relative overflow-hidden rounded-2xl shadow-2xl"
                          >
                            <img 
                              src={item.data.src} 
                              alt={`${category.categoryName} - Imagen ${item.index + 1}`}
                              className="w-full h-auto"
                            />
                          </motion.div>
                        );
                      } else {
                        return (
                          <motion.div
                            key={`features-${idx}`}
                            className="space-y-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            {item.data.map((feature, fIdx) => (
                              <div 
                                key={fIdx}
                                className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20"
                              >
                                <ScrollReveal 
                                  baseOpacity={0.3} 
                                  enableBlur={true} 
                                  baseRotation={2} 
                                  blurStrength={6}
                                >
                                  <div className="flex items-start gap-3">
                                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: categoryColor }} />
                                    <span className="text-sm lg:text-base leading-relaxed">{feature}</span>
                                  </div>
                                </ScrollReveal>
                              </div>
                            ))}
                          </motion.div>
                        );
                      }
                    });
                  })()}
                </div>

                {/* Right Column - Fixed Long Images */}
                <div className="lg:w-2/5 space-y-6">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {category.images
                      .filter(img => img.category === "Detalle")
                      .map((img, idx) => (
                        <motion.div
                          key={`detail-${idx}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: idx * 0.2 }}
                          viewport={{ once: true }}
                          className="relative overflow-hidden rounded-2xl shadow-2xl"
                        >
                          <img 
                            src={img.src} 
                            alt={`${category.categoryName} - Vista detallada ${idx + 1}`}
                            className="w-full h-auto"
                          />
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Images Gallery for Multiselect Products */}
          {activeModule === "multiselect" && activeSubcategory === "deco" && (
            <div className="space-y-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { src: ufoDecoBanner1, alt: "UFO DECO - Línea Deco adaptable a todos los ambientes" },
                  { src: ufoDecoBanner2, alt: "UFO DECO - Calidad, Diseño y Confort" },
                  { src: ufoDecoBanner3, alt: "UFO DECO - Grandes prestaciones para todos tus proyectos" },
                  { src: ufoDecoProduct, alt: "UFO DECO - Características del producto" }
                ].map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeModule === "multiselect" && activeSubcategory === "industrial" && (
            <div className="space-y-12 mb-12">
              {/* Power Options */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {[
                  { power: "100W", label: "Potencia Baja" },
                  { power: "150W", label: "Potencia Media" },
                  { power: "200W", label: "Potencia Alta" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl p-8 text-center min-w-[160px]"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.2))',
                      border: '2px solid rgba(245, 158, 11, 0.3)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, borderColor: 'rgba(245, 158, 11, 0.6)' }}
                  >
                    <div className="text-6xl font-black mb-2" style={{ color: '#f59e0b' }}>
                      {item.power}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Product Images */}
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {[
                  { src: ufoIndustrialHB12_150w_1, alt: "UFO INDUSTRIAL B2G-HB12 150W - Vista superior" },
                  { src: ufoIndustrialHB12_150w_2, alt: "UFO INDUSTRIAL B2G-HB12 150W - Vista lateral" },
                  { src: ufoIndustrialHB12_200w_1, alt: "UFO INDUSTRIAL B2G-HB12 200W - Vista frontal" },
                  { src: ufoIndustrialHB12_200w_2, alt: "UFO INDUSTRIAL B2G-HB12 200W - Vista detalle LED" }
                ].map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="break-inside-avoid"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Features List - Only for Multiselect or if no images */}
          {(activeModule === "multiselect" || !("images" in category)) && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="text-center mb-8">
                <h5 className="text-2xl font-bold">
                  <DecryptedText 
                    text="Características Destacadas"
                    animateOn="view"
                    speed={20}
                  />
                </h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.features.map((feature, fIdx) => (
                  <motion.div
                    key={fIdx}
                    className="flex items-start gap-3 bg-background/60 backdrop-blur-sm rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: fIdx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, borderColor: categoryColor }}
                  >
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: categoryColor }} />
                    <span className="text-sm lg:text-base text-foreground leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Product Cards (only for Multiselect) */}
          {activeModule === "multiselect" && "products" in category && category.products && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center">
                <h5 className="text-2xl font-bold">
                  <DecryptedText 
                    text="Modelos Disponibles"
                    animateOn="view"
                    speed={20}
                  />
                </h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, pIdx) => (
                  <motion.div 
                    key={pIdx}
                    className="relative overflow-hidden rounded-2xl p-6 bg-background/40 backdrop-blur-sm border-2 transition-all"
                    style={{ borderColor: `${categoryColor}33` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, borderColor: `${categoryColor}99` }}
                  >
                    <h5 className="text-2xl font-black mb-3" style={{ color: categoryColor }}>
                      {product.name}
                    </h5>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-xs px-3 py-1.5 rounded-full font-semibold"
                          style={{ 
                            background: `${categoryColor}22`,
                            color: categoryColor,
                            border: `1px solid ${categoryColor}44`
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }


    if (activeModule === "calculator") {
      return (
        <div className="space-y-12">
          <div ref={headerContainerRef} className="relative text-center space-y-6">
            <GradientText 
              colors={['#3b82f6', '#06b6d4', '#8b5cf6', '#3b82f6']}
              animationSpeed={6}
              className="text-3xl lg:text-5xl font-black"
            >
              Calculadora de Eficiencia Energética
            </GradientText>
            <div className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={3} blurStrength={8}>
                Armá un producto a tu medida según tus necesidades
              </ScrollReveal>
            </div>
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

        {/* Dashboard or Module Content */}
        {!activeModule ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {modules.filter(m => m.id !== 'calculator').map((module, idx) => {
                const Icon = module.icon;
                const bgImage = module.id === "greenside" ? greensideBg : multiselectBg;
                
                return (
                  <motion.div
                    key={module.id}
                    className="group cursor-pointer relative overflow-hidden rounded-3xl min-h-[500px] flex flex-col justify-end p-8"
                    onClick={() => setActiveModule(module.id)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    <div className="relative z-10 space-y-4">
                      <Icon className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="text-3xl lg:text-4xl font-black tracking-tight">
                        {module.title}
                      </h3>
                      <p className="text-lg font-semibold text-primary">
                        {module.subtitle}
                      </p>
                      <div className="text-muted-foreground leading-relaxed">
                        <ScrollReveal baseOpacity={0.3} enableBlur={false} baseRotation={0}>
                          {module.description}
                        </ScrollReveal>
                      </div>
                      <div className="flex items-center text-primary font-bold group-hover:gap-2 transition-all pt-4">
                        <span>Explorar</span>
                        <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Calculator Section */}
            <Calculator />
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