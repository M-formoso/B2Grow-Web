import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-hero.png";
import solarPanelsHero from "@/assets/solar-panels-hero.png";
import ledLightingHero from "@/assets/led-lighting-hero.png";
import CardSwap, { Card } from "@/components/CardSwap";
import GradientText from "@/components/effects/GradientText";
import DecryptedText from "@/components/effects/DecryptedText";
import ScrollReveal from "@/components/effects/ScrollReveal";

const campaignVideo = "https://ahcwuywqoxbelvtyucrq.supabase.co/storage/v1/object/public/videos/video-b2grow-1760627822221.mp4";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-tech relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
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

          <div className="flex items-center justify-center" style={{ height: '600px', position: 'relative' }}>
            <CardSwap
              width={500}
              height={500}
              cardDistance={60}
              verticalDistance={70}
              delay={4000}
              pauseOnHover={true}
              easing="elastic"
            >
              <Card>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between border border-white/10 shadow-2xl">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">Energía Portátil</h2>
                    <img 
                      src={powerStationHero} 
                      alt="Estación de Energía Portátil B2Grow" 
                      className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-white/90">
                    Estaciones de energía inteligentes para un futuro sustentable.
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between border border-white/10 shadow-2xl">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">Paneles Solares</h2>
                    <img 
                      src={solarPanelsHero} 
                      alt="Paneles Solares Flexibles B2Grow" 
                      className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-white/90">
                    Paneles flexibles de alta eficiencia para máxima captación.
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between border border-white/10 shadow-2xl">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">LED Inteligente</h2>
                    <img 
                      src={ledLightingHero} 
                      alt="Iluminación LED Inteligente B2Grow" 
                      className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-white/90">
                    Sistemas LED IoT para máxima eficiencia energética.
                  </p>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>

        {/* Video Section */}
        <div className="container mx-auto px-4 pb-20 pt-48">
          <div className="max-w-6xl mx-auto">
            {/* Video Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <DecryptedText 
                  text="Conocé Nuestra Tecnología"
                  speed={30}
                  maxIterations={8}
                  sequential={true}
                  revealDirection="center"
                  animateOn="view"
                  className="text-white"
                  encryptedClassName="text-white/40"
                />
              </h2>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={true}
                baseRotation={2}
                blurStrength={6}
                textClassName="text-xl text-white/90"
              >
                Descubrí cómo nuestras soluciones están revolucionando el sector energético
              </ScrollReveal>
            </div>

            {/* Video Container */}
            <div className="relative group">
              {/* Decorative border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Video wrapper */}
              <div className="relative bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="aspect-video w-full">
                  <video 
                    src={campaignVideo}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Tu navegador no soporta el tag de video.
                  </video>
                </div>
              </div>
            </div>

            {/* Optional: Video description or features below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <Zap className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">
                  <GradientText
                    colors={["#ffffff", "#e0e0e0", "#ffffff"]}
                    animationSpeed={4}
                    showBorder={false}
                    className="text-white"
                  >
                    Innovación
                  </GradientText>
                </h3>
                <p className="text-white/70">Tecnología de vanguardia en cada producto</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <Leaf className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">
                  <GradientText
                    colors={["#ffffff", "#e0e0e0", "#ffffff"]}
                    animationSpeed={4}
                    showBorder={false}
                    className="text-white"
                  >
                    Sostenibilidad
                  </GradientText>
                </h3>
                <p className="text-white/70">Comprometidos con el medio ambiente</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <Globe className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">
                  <GradientText
                    colors={["#ffffff", "#e0e0e0", "#ffffff"]}
                    animationSpeed={4}
                    showBorder={false}
                    className="text-white"
                  >
                    Alcance Global
                  </GradientText>
                </h3>
                <p className="text-white/70">Presencia en múltiples mercados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;