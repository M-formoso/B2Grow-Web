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
import mainImage7 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4-07-2.0.png";

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

// COLORES OFICIALES - ESTOS SON LOS CORRECTOS
const GREENSIDE_COLOR = "#84cc16"; // lime-500
const MULTISELECT_COLOR = "#eab308"; // yellow-500

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
          "3 Garantía en baterías / 5 años en Base principal e inversores",
          "Conectable al tablero de tu casa y listo para transportar a donde quieras",
          "Un mismo equipo en múltiples lugares y para usos diversos",
          "Podes usar la energía almacenada en el equipo para alimentar parte o toda la instalación eléctrica de tu casa"
        ],
        images: [
          { src: mainImage1, category: "Principal" },
          { src: mainImage2, category: "Principal" },
          { src: mainImage3, category: "Principal" },
          { src: mainImage5, category: "Principal" },
          { src: mainImage6, category: "Principal" },
          { src: mainImage7, category: "Principal" },
          { src: detailImage1, category: "Detalle" },
          { src: detailImage3, category: "Detalle" }
        ]
      },
      {
        categoryName: "PANEL SOLAR",
        categoryDescription: "Panel Solar Plegable Portátil",
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
          "Temperatura de funcionamiento: -25 a + 45ºC",
          "5 años de garantía"
        ],
        products: [
          {
            name: "B2GHB12-100W",
            description: "Luminaria LED Colgante o de fijar - 100W",
            specs: ["100W", "IP65", "5 años garantía"]
          },
          {
            name: "B2GHB12-150W",
            description: "Luminaria LED Colgante o de fijar - 150W",
            specs: ["150W", "IP65", "5 años garantía"]
          },
          {
            name: "B2GHB12-200W",
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
          },
          {
            name: "B2GDECO12-150W",
            description: "Luminaria LED Colgante Decorativa - 150W",
            specs: ["150W", "Control deslumbramiento", "5 años garantía"]
          },
          {
            name: "B2GDECO12-200W",
            description: "Luminaria LED Colgante Decorativa - 200W",
            specs: ["200W", "Control deslumbramiento", "5 años garantía"]
          }
        ]
      },
      {
        categoryName: "ACCESORIOS",
        categoryDescription: "Accesorios inteligentes para maximizar el control y eficiencia de tus luminarias",
        accessories: [
          {
            name: "Control Remoto",
            image: "/Control remoto.png",
            description: "Programá niveles de dimerización, sensibilidad, tiempo de encendido y apagado, escenas y mucho más"
          },
          {
            name: "Sensor de Movimiento",
            image: "/sensor-movimiento.png",
            description: "Convertí tu luminaria a smart y optimizá el consumo y programá los escenarios que quieras"
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
    console.log("activeModule cambió a:", activeModule);
    if (activeModule === 'greenside') {
      setColor('green');
    } else if (activeModule === 'multiselect') {
      setColor('yellow');
    } else {
      setColor('white');
    }
  }, [activeModule, setColor]);

  // Debug: Monitor activeSubcategory changes
  useEffect(() => {
    console.log("activeSubcategory cambió a:", activeSubcategory);
  }, [activeSubcategory]);

  const modules = [
    {
      id: "greenside",
      title: "LÍNEA GREENSIDE",
      subtitle: "Estaciones de Energía",
      description: "Soluciones inteligentes de energía portátil y solar para independencia energética",
      icon: Battery,
      color: "from-lime-500 to-lime-600"
    },
    {
      id: "multiselect",
      title: "LÍNEA MULTISELECT",
      subtitle: "Luminarias",
      description: "Luminarias inteligentes con tecnología multiselect para máxima eficiencia",
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600"
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
              { id: "power-station", name: "ESTACIÓN DE ENERGÍA", subtitle: "Energía Inteligente", icon: Zap, color: GREENSIDE_COLOR },
              { id: "solar-panel", name: "PANEL SOLAR", subtitle: "Energía Solar Portátil", icon: Sun, color: GREENSIDE_COLOR },
              { id: "calculator", name: "CALCULADORA", subtitle: "Armá tu Solución", icon: CalcIcon, color: GREENSIDE_COLOR }
            ]
          : [
              { id: "industrial", name: "UFO INDUSTRIAL", subtitle: "Luminaria Industrial", icon: Lightbulb, color: MULTISELECT_COLOR },
              { id: "deco", name: "UFO DECO", subtitle: "Luminaria Decorativa", icon: Sparkles, color: MULTISELECT_COLOR },
              { id: "accesorios", name: "ACCESORIOS", subtitle: "Control Inteligente", icon: Zap, color: MULTISELECT_COLOR }
            ];

        const bgImage = isGreenside ? greensideBg : multiselectBg;
        const logoImage = isGreenside ? null : null; // Eliminado multiselectLogo
        return (
          <div className="relative">
            {/* Banner Hero FULLWIDTH - Altura aumentada */}
            <motion.div 
              ref={headerContainerRef}
              className="relative w-full min-h-[70vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${isGreenside ? 'from-lime-500/30 to-lime-600/30' : 'from-yellow-500/30 to-yellow-600/30'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full min-h-[70vh] flex flex-col justify-end p-8 lg:p-16 container mx-auto">
                <div className="max-w-4xl mb-16">
                  {logoImage ? (
                    <motion.img 
                      src={logoImage} 
                      alt={line.lineName}
                      className="h-24 lg:h-32 w-auto mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  ) : (
                    <motion.h1 
                      className="text-4xl lg:text-6xl font-black mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <GradientText 
                        colors={['#ffffff', '#f0f0f0', '#e0e0e0', '#ffffff']}
                        animationSpeed={4}
                        className="text-4xl lg:text-6xl font-black"
                      >
                        {line.lineName}
                      </GradientText>
                    </motion.h1>
                  )}
                  
                  <motion.div 
                    className="text-2xl lg:text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {line.lineSubtitle}
                  </motion.div>
                  
                  <motion.div 
                    className="text-lg lg:text-xl text-white/90 max-w-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {line.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Botón Ver Todas las Líneas - DEBAJO del banner */}
            <div className="container mx-auto px-8 lg:px-16 py-6 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-background font-bold px-6 py-5 text-base shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setActiveModule(null)}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Volver Atrás
                </Button>
              </motion.div>
            </div>

            {/* Who are our clients section - Only for Greenside */}
            {isGreenside && (
              <div className="container mx-auto px-8 lg:px-16 py-12 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="max-w-5xl mx-auto bg-gradient-to-br from-lime-500/10 to-lime-600/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-lime-500/20"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-lime-400 text-center">
                    ¿Quiénes son nuestros clientes?
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Para vida al aire libre,</span> como camping y off road o aventura. Llevá tu estación de energía de forma práctica a todos lados y utilizá energía solar o de red para mantener energía siempre disponible.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Para comercios,</span> como apoyo para cortes de energía. Ante imprevistos, seguí trabajando y mantené tu negocio en marcha sin preocupaciones.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Para empresas,</span> como unidad de apoyo para cortes de energía para mantener a los sistemas vitales de tu empresa siempre funcionando ante imprevistos, con la primera Estación de energía UPS con switcheo instantáneo ante cortes de energía.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Para uso doméstico,</span> ya sea en casas o departamentos. Mantené tus consumos esenciales siempre activos, con un sistema modular y escalable de gran practicidad para usarlo cuando y donde necesites.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Para consorcios,</span> donde siempre es vital y necesario mantener iluminación, seguridad, wifi y accesos con energía ante cualquier imprevisto.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lime-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">En general</span> para cualquier aplicación que requiera seguir demandando energía con independencia de la red o del lugar físico donde la necesites. Dimensioná tu equipo en base a las necesidades y escalá casi sin límites.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Who are our clients section - Only for Multiselect */}
            {!isGreenside && (
              <div className="container mx-auto px-8 lg:px-16 py-12 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="max-w-5xl mx-auto bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-yellow-500/20"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-yellow-400 text-center">
                    ¿Quiénes son nuestros clientes?
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Naves logísticas e industriales,</span> galpones, fábricas o empresas, uso deportivo y grandes áreas.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Comercios, oficinas y viviendas.</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        También realizamos <span className="font-semibold text-white">diseños y proyectos de iluminación</span> que maximicen la eficiencia energética en iluminación, acorde a las normas y requerimientos funcionales, operativos y estéticos del cliente.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Subcategory Selection */}
            <div className="container mx-auto px-4 pb-20 relative z-10">
              <div className="space-y-20 max-w-7xl mx-auto">
                {subcategories.map((subcat, index) => {
                  const Icon = subcat.icon;
                  const categoryData = line.categories[index];
                  const isEven = index % 2 === 0;

                  // Render calculator directly if categoryData doesn't exist
                  if (!categoryData) {
                    return (
                      <motion.div 
                        key={subcat.id} 
                        className="relative w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <Calculator />
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div 
                      key={subcat.id} 
                      className="relative"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start`}>
                        {/* Icon and Title Section */}
                        <div className="flex-1 space-y-6 lg:mt-16">
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
                            {categoryData.categoryDescription}
                          </div>

                          {!categoryData.accessories && (
                            <Button
                              onClick={() => setActiveSubcategory(subcat.id)}
                              className="group gap-2"
                              size="lg"
                            >
                              <span>Explorar {subcat.name}</span>
                              <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          )}
                        </div>

                        {/* Features Section */}
                        {categoryData.features && (
                          <div className="flex-1 space-y-4">
                            {categoryData.features.slice(0, 9).map((feature, fIdx) => (
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
                        )}

                        {/* Accessories Preview for ACCESORIOS */}
                        {categoryData.accessories && (
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              {categoryData.accessories.map((accessory, aIdx) => (
                                <motion.div
                                  key={aIdx}
                                  className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-primary/10 hover:border-primary/30 transition-all text-center"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.4, delay: aIdx * 0.1 }}
                                  viewport={{ once: true }}
                                >
                                  <div className="h-24 flex items-center justify-center mb-2">
                                    <img
                                      src={accessory.image}
                                      alt={accessory.name}
                                      className="max-h-full w-auto object-contain"
                                    />
                                  </div>
                                  <p className="text-sm font-semibold" style={{ color: subcat.color }}>
                                    {accessory.name}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // Handle calculator subcategory for Greenside
      if (activeModule === "greenside" && activeSubcategory === "calculator") {
        return (
          <div className="space-y-12">
            <div className="container mx-auto px-4 pt-40 pb-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  console.log("Volver a Categorías clickeado");
                  setActiveSubcategory(null);
                }}
                className="gap-2 hover:gap-3 transition-all text-base cursor-pointer"
                size="lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a Categorías
              </Button>
            </div>

            <div ref={headerContainerRef} className="relative text-center space-y-6 container mx-auto px-4">
              <GradientText 
                colors={['#84cc16', '#a3e635', '#bef264', '#84cc16']}
                animationSpeed={6}
                className="text-3xl lg:text-5xl font-black"
              >
                Calculadora de Eficiencia Energética
              </GradientText>
              <div className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Armá un producto a tu medida según tus necesidades
              </div>
            </div>
            <Calculator />
          </div>
        );
      }

      // Show specific subcategory content
      const category = line.categories?.find(cat => {
        if (activeModule === "greenside") {
          return (activeSubcategory === "power-station" && cat.categoryName === "ESTACIÓN DE ENERGÍA") ||
                 (activeSubcategory === "solar-panel" && cat.categoryName === "PANEL SOLAR");
        } else {
          return (activeSubcategory === "industrial" && cat.categoryName === "UFO INDUSTRIAL") ||
                 (activeSubcategory === "deco" && cat.categoryName === "UFO DECO") ||
                 (activeSubcategory === "accesorios" && cat.categoryName === "ACCESORIOS");
        }
      });

      if (!category) return null;

      const categoryColor = activeModule === "greenside" ? GREENSIDE_COLOR : MULTISELECT_COLOR;
      
      return (
        <div className="space-y-12">
          {/* Botón Volver - Mejor posicionado y funcional */}
          <div className="container mx-auto px-4 pt-40 pb-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                console.log("Volver a Categorías clickeado");
                setActiveSubcategory(null);
              }}
              className="gap-2 hover:gap-3 transition-all text-base cursor-pointer"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver a Categorías
            </Button>
          </div>

          {/* Título y descripción */}
          <div ref={headerContainerRef} className="relative text-center space-y-6 container mx-auto px-4 pb-8">
            {activeModule === "greenside" && activeSubcategory === "solar-panel" ? (
              <h2 className="text-3xl lg:text-5xl font-black text-white">
                {category.categoryName}
              </h2>
            ) : (
              <GradientText
                colors={activeModule === "greenside" ? ['#84cc16', '#a3e635', '#bef264', '#84cc16'] : ['#eab308', '#fbbf24', '#fcd34d', '#eab308']}
                animationSpeed={6}
                className="text-3xl lg:text-5xl font-black"
              >
                {category.categoryName}
              </GradientText>
            )}
            <div className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              {category.categoryDescription}
            </div>
          </div>

          {/* Modelos for Power Station */}
          {activeModule === "greenside" && activeSubcategory === "power-station" && (
            <div className="mb-16">
              <div className="text-center mb-6">
                <h3 className="text-2xl lg:text-3xl font-black" style={{ color: GREENSIDE_COLOR }}>
                  Modelos
                </h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 max-w-[1400px] mx-auto px-2">
                {[
                  { name: "A1", power: "2200W", autonomy: "1037 Wh" },
                  { name: "A1P4", power: "4400W", autonomy: "1037 Wh" },
                  { name: "A2 lite", power: "2200W", autonomy: "2074 Wh" },
                  { name: "A2", power: "4400W", autonomy: "2074 Wh" },
                  { name: "A2 P6", power: "6600W", autonomy: "2074 Wh" },
                  { name: "A2 P8", power: "8800W", autonomy: "2074 Wh" },
                  { name: "A3 lite", power: "2200W", autonomy: "3197Wh" },
                  { name: "A3", power: "4400W", autonomy: "3197Wh" },
                  { name: "A3 P6", power: "6600W", autonomy: "3197Wh" },
                  { name: "A3 P8", power: "8800W", autonomy: "3197Wh" },
                  { name: "A4 Lite", power: "2200W", autonomy: "4234Wh" },
                  { name: "A4 P4", power: "4400W", autonomy: "4234Wh" },
                  { name: "A4 P6", power: "6600W", autonomy: "4234Wh" },
                  { name: "A4 P8", power: "8800W", autonomy: "4234Wh" },
                  { name: "A5 Lite", power: "2200W", autonomy: "5357Wh" },
                  { name: "A5", power: "4400W", autonomy: "5357Wh" },
                  { name: "A5 P6", power: "6600W", autonomy: "5357Wh" },
                  { name: "A5 P8", power: "8800W", autonomy: "5357Wh" },
                  { name: "A6 Lite", power: "2200W", autonomy: "6394Wh" },
                  { name: "A6", power: "4400W", autonomy: "6394Wh" },
                  { name: "A6 P6", power: "6600W", autonomy: "6394Wh" },
                  { name: "A6 P8", power: "8800W", autonomy: "6394Wh" },
                  { name: "A7 Lite", power: "2200W", autonomy: "7517Wh" },
                  { name: "A7", power: "4400W", autonomy: "7517Wh" },
                  { name: "A7 P6", power: "6600W", autonomy: "7517Wh" },
                  { name: "A7 P8", power: "8800W", autonomy: "7517Wh" },
                  { name: "A8 Lite", power: "2200W", autonomy: "8554Wh" },
                  { name: "A8", power: "4400W", autonomy: "8554Wh" },
                  { name: "A8 P6", power: "6600W", autonomy: "8554Wh" },
                  { name: "A8 P8", power: "8800W", autonomy: "8554Wh" }
                ].map((model, idx) => (
                  <motion.div
                    key={idx}
                    className="relative overflow-hidden rounded-lg p-1.5 sm:p-2 text-center min-h-[70px] sm:min-h-[85px] flex flex-col justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${GREENSIDE_COLOR}1a, ${GREENSIDE_COLOR}33)`,
                      border: `1.5px solid ${GREENSIDE_COLOR}4d`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, borderColor: `${GREENSIDE_COLOR}99` }}
                  >
                    <div className="text-sm sm:text-base font-black mb-0.5 leading-tight" style={{ color: GREENSIDE_COLOR }}>
                      {model.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-white/90 leading-tight">
                      <div className="truncate">P: {model.power}</div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/70 leading-tight">
                      <div className="truncate">A: {model.autonomy}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Power Options for Solar Panel */}
          {activeModule === "greenside" && activeSubcategory === "solar-panel" && (
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { power: "200W" },
                { power: "400W" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl p-8 text-center min-w-[160px]"
                  style={{
                    background: `linear-gradient(135deg, ${GREENSIDE_COLOR}1a, ${GREENSIDE_COLOR}33)`,
                    border: `2px solid ${GREENSIDE_COLOR}4d`
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, borderColor: `${GREENSIDE_COLOR}99` }}
                >
                  <div className="text-6xl font-black" style={{ color: GREENSIDE_COLOR }}>
                    {item.power}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Images Gallery for Greenside Products */}
          {activeModule === "greenside" && "images" in category && category.images && (
            <>
              {activeSubcategory === "solar-panel" ? (
                /* Layout especial para Panel Solar - Fullwidth con intercalación */
                <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] space-y-12">
                  {(() => {
                    const mainImages = category.images.filter(img => img.category === "Principal");
                    const features = category.features;
                    const items = [];
                    
                    // Intercalar: 2 imágenes, luego 4-6 features, repetir
                    let imgIndex = 0;
                    let featureIndex = 0;
                    
                    while (imgIndex < mainImages.length || featureIndex < features.length) {
                      // Agregar 2 imágenes
                      const imagePair = [];
                      if (imgIndex < mainImages.length) {
                        imagePair.push(mainImages[imgIndex]);
                        imgIndex++;
                      }
                      if (imgIndex < mainImages.length) {
                        imagePair.push(mainImages[imgIndex]);
                        imgIndex++;
                      }
                      if (imagePair.length > 0) {
                        items.push({ type: 'images', data: imagePair });
                      }
                      
                      // Agregar 4-6 features
                      const featureSlice = features.slice(featureIndex, featureIndex + 6);
                      if (featureSlice.length > 0) {
                        items.push({ type: 'features', data: featureSlice });
                        featureIndex += 6;
                      }
                    }
                    
                    return items.map((item, idx) => {
                      if (item.type === 'images') {
                        return (
                          <div key={`images-${idx}`} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {item.data.map((img, imgIdx) => (
                              <motion.div
                                key={`img-${idx}-${imgIdx}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: imgIdx * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="relative overflow-hidden"
                              >
                                <img
                                  src={img.src}
                                  alt={`${category.categoryName} - Imagen ${imgIdx + 1}`}
                                  className="w-full h-auto object-contain"
                                />
                              </motion.div>
                            ))}
                          </div>
                        );
                      } else {
                        return (
                          <div key={`features-${idx}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-8">
                            {item.data.map((feature, fIdx) => (
                              <motion.div
                                key={fIdx}
                                className="flex items-start gap-3 bg-background/60 backdrop-blur-sm rounded-xl p-5 border border-primary/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: fIdx * 0.05 }}
                                viewport={{ once: true }}
                              >
                                <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-lime-500" />
                                <span className="text-sm lg:text-base leading-relaxed">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        );
                      }
                    });
                  })()}
                </div>
              ) : (
                /* Layout normal para Estación de Energía */
                <div className="relative container mx-auto px-4">
                  <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Alternating Images and Features */}
                <div className="flex-1 space-y-16">
                  {(() => {
                    const mainImages = category.images.filter(img => img.category === "Principal");
                    const features = category.features;
                    const items = [];
                    
                    // Mostrar las primeras 5 imágenes en columna izquierda
                    const leftImages = mainImages.slice(0, 5);
                    // La última imagen va a la derecha
                    
                    // Distribuir features: primeras 8 a la izquierda, últimas 2 a la derecha
                    const leftFeatures = features.slice(0, 8);
                    
                    // Intercalar: imagen, 2 features en la columna izquierda
                    let featureIndex = 0;
                    leftImages.forEach((img, i) => {
                      // Add image
                      items.push({
                        type: 'image',
                        data: img,
                        index: i
                      });
                      
                      // Add 2 features después de cada imagen (excepto después de la última)
                      if (featureIndex < leftFeatures.length && i < leftImages.length - 1) {
                        const featureSlice = leftFeatures.slice(featureIndex, featureIndex + 2);
                        if (featureSlice.length > 0) {
                          items.push({
                            type: 'features',
                            data: featureSlice,
                            index: i
                          });
                          featureIndex += 2;
                        }
                      }
                    });
                    
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

                {/* Right Column - Detail images + última imagen + últimas 2 features */}
                <div className="lg:w-2/5 space-y-6">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {(() => {
                      const mainImages = category.images.filter(img => img.category === "Principal");
                      const detailImages = category.images.filter(img => img.category === "Detalle");
                      const lastImage = mainImages[5]; // Última imagen principal (índice 5)
                      const rightFeatures = category.features.slice(8); // Últimas 2 features
                      const rightItems = [];
                      
                      // Agregar imágenes de detalle primero
                      detailImages.forEach((img, idx) => {
                        rightItems.push({ type: 'detailImage', data: img, index: idx });
                      });
                      
                      // Agregar última imagen principal
                      if (lastImage) {
                        rightItems.push({ type: 'mainImage', data: lastImage, index: 5 });
                      }
                      
                      // Agregar últimas 2 features
                      rightFeatures.forEach((feature, idx) => {
                        rightItems.push({ type: 'feature', data: feature, index: idx });
                      });
                      
                      return rightItems.map((item, idx) => {
                        if (item.type === 'detailImage') {
                          return (
                            <motion.div
                              key={`detail-${idx}`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: idx * 0.2 }}
                              viewport={{ once: true }}
                              className="relative overflow-hidden rounded-2xl shadow-2xl"
                            >
                              <img 
                                src={item.data.src} 
                                alt={`${category.categoryName} - Vista detallada ${item.index + 1}`}
                                className="w-full h-auto"
                              />
                            </motion.div>
                          );
                        } else if (item.type === 'mainImage') {
                          return (
                            <motion.div
                              key={`main-${item.index}`}
                              initial={{ opacity: 0, x: 50 }}
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
                              key={`feature-${item.index}`}
                              className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20"
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: item.index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <ScrollReveal 
                                baseOpacity={0.3} 
                                enableBlur={true} 
                                baseRotation={2} 
                                blurStrength={6}
                              >
                                <div className="flex items-start gap-3">
                                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: categoryColor }} />
                                  <span className="text-sm lg:text-base leading-relaxed">{item.data}</span>
                                </div>
                              </ScrollReveal>
                            </motion.div>
                          );
                        }
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
              )}
            </>
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

          {activeModule === "multiselect" && activeSubcategory === "accesorios" && category.accessories && (
            <div className="space-y-12 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {category.accessories.map((accessory, idx) => (
                  <motion.div
                    key={idx}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Accessory Image */}
                    <motion.div
                      className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-background/50 to-background/30 p-8"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-auto object-contain max-h-[300px]"
                      />
                    </motion.div>

                    {/* Accessory Name */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-center" style={{ color: MULTISELECT_COLOR }}>
                      {accessory.name}
                    </h3>

                    {/* Accessory Description */}
                    <p className="text-base lg:text-lg text-muted-foreground text-center leading-relaxed px-4">
                      {accessory.description}
                    </p>
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
                  { power: "100W" },
                  { power: "150W" },
                  { power: "200W" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl p-8 text-center min-w-[160px]"
                    style={{ 
                      background: `linear-gradient(135deg, ${MULTISELECT_COLOR}1a, ${MULTISELECT_COLOR}33)`,
                      border: `2px solid ${MULTISELECT_COLOR}4d`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, borderColor: `${MULTISELECT_COLOR}99` }}
                  >
                    <div className="text-6xl font-black" style={{ color: MULTISELECT_COLOR }}>
                      {item.power}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Product Images */}
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {[
                  { src: ufoIndustrialHB12_150w_1, alt: "UFO INDUSTRIAL B2GHB12-150W - Vista superior" },
                  { src: ufoIndustrialHB12_150w_2, alt: "UFO INDUSTRIAL B2GHB12-150W - Vista lateral" },
                  { src: ufoIndustrialHB12_200w_1, alt: "UFO INDUSTRIAL B2GHB12-200W - Vista frontal" },
                  { src: ufoIndustrialHB12_200w_2, alt: "UFO INDUSTRIAL B2GHB12-200W - Vista detalle LED" }
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
                  Características Destacadas
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
                  Modelos Disponibles
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

    return null;
  };

  return (
    <section className="bg-gradient-tech relative overflow-hidden">
      {/* DotGrid Background Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#4a5261"
          activeColor="#5f6575"
          proximity={120}
          shockRadius={200}
          shockStrength={4}
          resistance={800}
          returnDuration={1.2}
        />
      </div>
      
      {/* Dashboard or Module Content */}
      {!activeModule ? (
        <div className="relative z-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {modules.filter(m => m.id !== 'calculator').map((module, idx) => {
              const Icon = module.icon;
              const bgImage = module.id === "greenside" ? greensideBg : multiselectBg;
              
              return (
                <motion.div
                  key={module.id}
                  className="group relative overflow-hidden min-h-[600px] flex flex-col justify-end p-8 md:p-12 lg:p-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

                  <div className="relative z-[100] space-y-3 max-w-xl">
                    <Icon className="h-12 w-12 text-primary" />
                    <h3 className="text-2xl lg:text-3xl font-black tracking-tight">
                      {module.title}
                    </h3>
                    <p className="text-base lg:text-lg font-semibold text-primary">
                      {module.subtitle}
                    </p>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>

                    {/* Botón simplificado sin wrappers */}
                    <button
                      type="button"
                      onClick={() => {
                        console.log("✅ CLICK - Módulo:", module.id);
                        setActiveModule(module.id);
                      }}
                      onTouchStart={() => {
                        console.log("👆 TOUCH START - Módulo:", module.id);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        console.log("👆 TOUCH END - Módulo:", module.id);
                        setActiveModule(module.id);
                      }}
                      className="relative z-[101] inline-flex items-center gap-2 px-5 py-3 bg-primary text-background rounded-full font-bold border-2 border-primary shadow-xl cursor-pointer touch-manipulation text-base min-h-[48px] active:scale-95 transition-transform"
                    >
                      <span>Explorar {module.title.includes("GREENSIDE") ? "Greenside" : "Multiselect"}</span>
                      <ArrowLeft className="h-5 w-5 rotate-180" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in relative z-10">
          {renderModuleContent()}
        </div>
      )}
    </section>
  );
};

export default ProductSection;