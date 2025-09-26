import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";
import GradientText from "@/components/effects/GradientText";
import ElectricBorder from "@/components/effects/ElectricBorder";
import ScrollReveal from "@/components/effects/ScrollReveal";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-tech">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      {/* Scroll Stack Container */}
      <div className="scroll-stack-scroller" style={{ height: "300vh" }}>
        <div className="scroll-stack-inner">
          
          {/* Card 1: Energía Portátil */}
          <div className="scroll-stack-card">
            <ElectricBorder color="#ff4757" speed={1.5} chaos={0.3}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full p-8 bg-gradient-primary/10 backdrop-blur-sm rounded-xl">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                    <GradientText 
                      colors={["#ff4757", "#2ed573", "#ffa502"]}
                      animationSpeed={4}
                      className="block mb-4"
                    >
                      Energía Portátil
                    </GradientText>
                  </h1>
                  
                  <ScrollReveal baseOpacity={0.3} enableBlur={true}>
                    <p className="text-xl text-muted-foreground mb-8">
                      Estaciones de energía inteligentes y portátiles para un futuro más eficiente y sustentable.
                    </p>
                  </ScrollReveal>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

                  <div className="flex items-center justify-center lg:justify-start gap-6">
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">20 años de experiencia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-accent" />
                      <span className="text-sm font-medium">100% Sustentable</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-glow"></div>
                  <img 
                    src={powerStationHero} 
                    alt="Estación de Energía Portátil B2Grow" 
                    className="relative z-10 w-full max-w-lg mx-auto animate-float"
                  />
                </div>
              </div>
            </ElectricBorder>
          </div>
          
          {/* Card 2: Paneles Solares */}
          <div className="scroll-stack-card">
            <ElectricBorder color="#2ed573" speed={1.2} chaos={0.4}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full p-8 bg-gradient-primary/10 backdrop-blur-sm rounded-xl">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                    <GradientText 
                      colors={["#2ed573", "#ffa502", "#ff4757"]}
                      animationSpeed={4}
                      className="block mb-4"
                    >
                      Paneles Solares
                    </GradientText>
                  </h1>
                  
                  <ScrollReveal baseOpacity={0.3} enableBlur={true}>
                    <p className="text-xl text-muted-foreground mb-8">
                      Paneles solares flexibles de alta eficiencia para maximizar la captación de energía renovable.
                    </p>
                  </ScrollReveal>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
                    >
                      Ver Especificaciones
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      Solicitar Cotización
                    </Button>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-6">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-accent" />
                      <span className="text-sm font-medium">Flexibles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-6 w-6 text-yellow-500" />
                      <span className="text-sm font-medium">Alta Eficiencia</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-glow"></div>
                  <img 
                    src={solarPanelsHero} 
                    alt="Paneles Solares Flexibles B2Grow" 
                    className="relative z-10 w-full max-w-lg mx-auto animate-float"
                  />
                </div>
              </div>
            </ElectricBorder>
          </div>
          
          {/* Card 3: LED Inteligente */}
          <div className="scroll-stack-card">
            <ElectricBorder color="#ffa502" speed={0.9} chaos={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full p-8 bg-gradient-primary/10 backdrop-blur-sm rounded-xl">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                    <GradientText 
                      colors={["#ffa502", "#ff4757", "#2ed573"]}
                      animationSpeed={4}
                      className="block mb-4"
                    >
                      LED Inteligente
                    </GradientText>
                  </h1>
                  
                  <ScrollReveal baseOpacity={0.3} enableBlur={true}>
                    <p className="text-xl text-muted-foreground mb-8">
                      Sistemas de iluminación LED inteligentes con tecnología IoT para máxima eficiencia energética.
                    </p>
                  </ScrollReveal>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
                    >
                      Conocer Más
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      Demo en Vivo
                    </Button>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-6">
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">IoT Integrado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-6 w-6 text-yellow-500" />
                      <span className="text-sm font-medium">Control Remoto</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-glow"></div>
                  <img 
                    src={ledLightingHero} 
                    alt="Iluminación LED Inteligente B2Grow" 
                    className="relative z-10 w-full max-w-lg mx-auto animate-float"
                  />
                </div>
              </div>
            </ElectricBorder>
          </div>

          {/* End spacer */}
          <div className="scroll-stack-end" />
        </div>
      </div>
    </section>
  );
};

export default Hero;