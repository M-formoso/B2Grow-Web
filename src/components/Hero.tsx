import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";
import GradientText from "@/components/effects/GradientText";
import ElectricBorder from "@/components/effects/ElectricBorder";
import ScrollReveal from "@/components/effects/ScrollReveal";
import CardSwap, { Card } from "@/components/CardSwap";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-tech relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <GradientText 
                colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
                animationSpeed={4}
                className="block mb-4"
              >
                Energía Inteligente
              </GradientText>
            </h1>
            
            <ScrollReveal baseOpacity={0.3} enableBlur={true}>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
                Soluciones innovadoras de energía portátil, paneles solares flexibles e iluminación LED inteligente 
                para un futuro más eficiente y sustentable.
              </p>
            </ScrollReveal>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up mb-8" style={{ animationDelay: "400ms" }}>
              <ElectricBorder color="#FFFFFF" speed={0.8} chaos={0.5} thickness={2} style={{ borderRadius: 8 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </ElectricBorder>
              
              <ElectricBorder color="#FFFFFF" speed={0.8} chaos={0.5} thickness={2} style={{ borderRadius: 8 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Calculadora de Eficiencia
                </Button>
              </ElectricBorder>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 animate-slide-up" style={{ animationDelay: "600ms" }}>
              <ElectricBorder color="#FFFFFF" thickness={2} speed={0.8} chaos={0.5} style={{ borderRadius: 8 }}>
                <div className="flex items-center gap-2 p-3">
                  <Zap className="h-6 w-6 text-white" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">20 años de experiencia</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
              
              <ElectricBorder color="#FFFFFF" thickness={2} speed={0.8} chaos={0.5} style={{ borderRadius: 8 }}>
                <div className="flex items-center gap-2 p-3">
                  <Leaf className="h-6 w-6 text-white" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">100% Sustentable</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
              
              <ElectricBorder color="#FFFFFF" thickness={2} speed={0.8} chaos={0.5} style={{ borderRadius: 8 }}>
                <div className="flex items-center gap-2 p-3">
                  <Globe className="h-6 w-6 text-white" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">Tecnología Global</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
            </div>
          </div>

          <div className="relative" style={{ height: '600px', position: 'relative' }}>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
              width={500}
              height={400}
            >
              <Card>
                <div className="grid grid-cols-1 gap-4 items-center h-full w-full p-6 bg-gradient-primary/20 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      <GradientText 
                        colors={["#FFFFFF", "#FFFFFF"]}
                        animationSpeed={3}
                      >
                        Energía Portátil
                      </GradientText>
                    </h2>
                    <div className="relative mb-4">
                      <img 
                        src={powerStationHero} 
                        alt="Estación de Energía Portátil B2Grow" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estaciones de energía inteligentes para un futuro sustentable.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="grid grid-cols-1 gap-4 items-center h-full w-full p-6 bg-gradient-primary/20 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      <GradientText 
                        colors={["#FFFFFF", "#FFFFFF"]}
                        animationSpeed={3}
                      >
                        Paneles Solares
                      </GradientText>
                    </h2>
                    <div className="relative mb-4">
                      <img 
                        src={solarPanelsHero} 
                        alt="Paneles Solares Flexibles B2Grow" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paneles flexibles de alta eficiencia para máxima captación.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="grid grid-cols-1 gap-4 items-center h-full w-full p-6 bg-gradient-primary/20 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      <GradientText 
                        colors={["#FFFFFF", "#FFFFFF"]}
                        animationSpeed={3}
                      >
                        LED Inteligente
                      </GradientText>
                    </h2>
                    <div className="relative mb-4">
                      <img 
                        src={ledLightingHero} 
                        alt="Iluminación LED Inteligente B2Grow" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sistemas LED IoT para máxima eficiencia energética.
                    </p>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;