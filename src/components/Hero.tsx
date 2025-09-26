import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";
import GradientText from "@/components/effects/GradientText";
import TextType from "@/components/effects/TextType";
import ElectricBorder from "@/components/effects/ElectricBorder";
import ScrollReveal from "@/components/effects/ScrollReveal";

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
              <GradientText 
                colors={["#ff4757", "#2ed573", "#ffa502"]}
                animationSpeed={4}
                className="block mb-4"
              >
                <TextType 
                  text={["Energía", "Inteligente", "Sustentable"]}
                  typingSpeed={120}
                  pauseDuration={2500}
                  showCursor={false}
                  className="block"
                />
              </GradientText>
            </h1>
            
            <ScrollReveal baseOpacity={0.3} enableBlur={true}>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
                Soluciones innovadoras de energía portátil, paneles solares flexibles e iluminación LED inteligente 
                para un futuro más eficiente y sustentable.
              </p>
            </ScrollReveal>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <ElectricBorder color="#ff4757" speed={1.5} chaos={0.3}>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-energy transition-all duration-300 group"
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </ElectricBorder>
              
              <ElectricBorder color="#2ed573" speed={1.2} chaos={0.4}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Calculadora de Eficiencia
                </Button>
              </ElectricBorder>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 animate-slide-up" style={{ animationDelay: "600ms" }}>
              <ElectricBorder color="#ff4757" thickness={1} speed={0.8}>
                <div className="flex items-center gap-2 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">20 años de experiencia</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
              
              <ElectricBorder color="#2ed573" thickness={1} speed={0.9}>
                <div className="flex items-center gap-2 p-3">
                  <Leaf className="h-6 w-6 text-accent" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">100% Sustentable</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
              
              <ElectricBorder color="#ffa502" thickness={1} speed={0.7}>
                <div className="flex items-center gap-2 p-3">
                  <Globe className="h-6 w-6 text-yellow-500" />
                  <ScrollReveal>
                    <span className="text-sm font-medium">Tecnología Global</span>
                  </ScrollReveal>
                </div>
              </ElectricBorder>
            </div>
          </div>

          <ElectricBorder color="#ff4757" speed={0.6} chaos={0.2}>
            <div className="relative animate-scale-in p-6" style={{ animationDelay: "300ms" }}>
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-glow"></div>
              <img 
                src={powerStationHero} 
                alt="Estación de Energía B2Grow" 
                className="relative z-10 w-full max-w-lg mx-auto animate-float"
              />
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
};

export default Hero;