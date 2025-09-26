import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-tech relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Energía
              </span>
              <br />
              <span className="text-foreground">Inteligente</span>
              <br />
              <span className="text-accent">Sustentable</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
              Soluciones innovadoras de energía portátil, paneles solares flexibles e iluminación LED inteligente 
              para un futuro más eficiente y sustentable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
              >
                Explorar Productos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Calculadora de Eficiencia
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 animate-slide-up" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">20 años de experiencia</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">100% Sustentable</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Tecnología Global</span>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in" style={{ animationDelay: "300ms" }}>
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-glow"></div>
            <img 
              src={powerStationHero} 
              alt="Estación de Energía B2Grow" 
              className="relative z-10 w-full max-w-lg mx-auto animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;