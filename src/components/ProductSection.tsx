import CircularGallery from "./CircularGallery";
import SpeedLines from "@/components/effects/SpeedLines";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";
import powerStationHero from "@/assets/power-station-hero.png";

const galleryItems = [
  {
    image: powerStationHero,
    text: "Estaciones de Energía Portátil Inteligente"
  },
  {
    image: solarPanelsHero,
    text: "Paneles Solares Flexibles"
  },
  {
    image: ledLightingHero,
    text: "Iluminación LED Inteligente"
  }
];

const ProductSection = () => {
  return (
    <section className="py-20 bg-gradient-tech">
      <div className="container mx-auto px-4">
        {/* Header with Speed Lines background effect */}
        <div className="relative text-center mb-16 animate-slide-up overflow-hidden">
          {/* Speed Lines background effect */}
          <div className="absolute inset-0 w-full h-32 -top-16 opacity-40">
            <SpeedLines 
              color="#ff4444"
              intensity={30}
              speed={1.5}
            />
          </div>
          <div className="absolute inset-0 w-full h-32 -top-16 opacity-20">
            <SpeedLines 
              color="#4444ff" 
              intensity={20}
              speed={2}
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

        {/* Circular Gallery Container */}
        <div className="relative" style={{ height: '600px' }}>
          <CircularGallery 
            items={galleryItems}
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollEase={0.02}
            font="bold 24px Arial"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;