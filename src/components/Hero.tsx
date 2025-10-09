import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-tech relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Energía Inteligente
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Soluciones innovadoras de energía portátil, paneles solares flexibles e iluminación LED inteligente 
              para un futuro más eficiente y sustentable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
              >
                Explorar Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Calculadora de Eficiencia
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2 p-3">
                <Zap className="h-6 w-6 text-white" />
                <span className="text-sm font-medium text-white">20 años de experiencia</span>
              </div>
              
              <div className="flex items-center gap-2 p-3">
                <Leaf className="h-6 w-6 text-white" />
                <span className="text-sm font-medium text-white">100% Sustentable</span>
              </div>
              
              <div className="flex items-center gap-2 p-3">
                <Globe className="h-6 w-6 text-white" />
                <span className="text-sm font-medium text-white">Tecnología Global</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Energía Portátil</h2>
              <img 
                src={powerStationHero} 
                alt="Estación de Energía Portátil B2Grow" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-white/80">
                Estaciones de energía inteligentes para un futuro sustentable.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Paneles Solares</h2>
              <img 
                src={solarPanelsHero} 
                alt="Paneles Solares Flexibles B2Grow" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-white/80">
                Paneles flexibles de alta eficiencia para máxima captación.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">LED Inteligente</h2>
              <img 
                src={ledLightingHero} 
                alt="Iluminación LED Inteligente B2Grow" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-white/80">
                Sistemas LED IoT para máxima eficiencia energética.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;