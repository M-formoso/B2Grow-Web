import CircularGallery from "./CircularGallery";
import SpeedLines from "@/components/effects/SpeedLines";
import Hyperspeed, { hyperspeedPresets } from "@/components/effects/Hyperspeed";
import ElectricBorder from "@/components/effects/ElectricBorder";
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
    <section className="py-20 bg-gradient-tech relative overflow-hidden">
      {/* Hyperspeed Background Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Hyperspeed 
          effectOptions={hyperspeedPresets.one}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="relative text-center mb-16 animate-slide-up overflow-hidden">
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

        {/* Circular Gallery Container with Electric Border */}
        <div className="relative" style={{ height: '600px' }}>
          <ElectricBorder 
            color="#7df9ff" 
            speed={1.5} 
            chaos={0.8} 
            thickness={3}
            className=""
            style={{ 
              borderRadius: '20px',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <CircularGallery 
                items={galleryItems}
                bend={3} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollEase={0.02}
                font="bold 24px Arial"
              />
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;