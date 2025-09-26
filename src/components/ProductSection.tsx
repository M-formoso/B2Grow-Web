import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Sun, Lightbulb, Zap, ArrowRight } from "lucide-react";
import Hyperspeed from "@/components/effects/Hyperspeed";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";
import powerStationHero from "@/assets/power-station-hero.png";

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  gradient: string;
  image: string;
}

const products: Product[] = [
  {
    id: "energia",
    title: "Estaciones de Energía Portátil Inteligente",
    description: "Tecnología de vanguardia con marco de aleación de aluminio aeroespacial y sobrecarga máxima de 150kg.",
    icon: Battery,
    features: [
      "Aleación de aluminio grado aeroespacial",
      "Sobrecarga máxima 150kg",
      "Sistema inteligente de gestión",
      "Diseño portátil y robusto"
    ],
    gradient: "bg-gradient-primary",
    image: powerStationHero
  },
  {
    id: "paneles",
    title: "Paneles Solares Flexibles",
    description: "Paneles solares de última generación con máxima eficiencia y adaptabilidad para cualquier superficie.",
    icon: Sun,
    features: [
      "Máxima eficiencia energética",
      "Flexibilidad total",
      "Resistencia extrema",
      "Instalación versátil"
    ],
    gradient: "bg-gradient-energy",
    image: solarPanelsHero
  },
  {
    id: "iluminacion",
    title: "Iluminación LED Inteligente",
    description: "Sistemas de iluminación LED con tecnología inteligente para máxima eficiencia y ahorro energético.",
    icon: Lightbulb,
    features: [
      "Control inteligente",
      "Ahorro hasta 90%",
      "Sensores de ocupación",
      "Programación automática"
    ],
    gradient: "bg-gradient-energy",
    image: ledLightingHero
  }
];

const ProductSection = () => {
  return (
    <section className="py-20 bg-gradient-tech">
      <div className="container mx-auto px-4">
        {/* Header with Hyperspeed background effect */}
        <div className="relative text-center mb-16 animate-slide-up overflow-hidden">
          {/* Hyperspeed background effect */}
          <div className="absolute inset-0 w-full h-32 -top-16 opacity-30">
            <Hyperspeed 
              effectOptions={{
                distortion: 'turbulentDistortion',
                length: 200,
                roadWidth: 8,
                islandWidth: 1,
                lanesPerRoad: 2,
                fov: 120,
                speedUp: 1,
                carLightsFade: 0.6,
                totalSideLightSticks: 15,
                lightPairsPerRoadWay: 20,
                colors: {
                  roadColor: 0x1a1a1a,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0x444444,
                  brokenLines: 0x444444,
                  leftCars: [0xff4444, 0xff6666, 0xff8888],
                  rightCars: [0x4444ff, 0x6666ff, 0x8888ff],
                  sticks: 0x666666
                }
              }}
            />
          </div>
          
          {/* Content over the effect */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Nuestros </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Productos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnología, eficiencia energética y sustentabilidad fusionadas en soluciones inteligentes 
              para múltiples industrias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:shadow-lift transition-all duration-500 animate-slide-up h-[500px]"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`absolute inset-0 ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>
              
              <CardContent className="p-6 relative z-10 flex flex-col h-[calc(100%-192px)]">
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${product.gradient} mb-4`}>
                    <product.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 mt-auto"
                >
                  Conocer Más
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;