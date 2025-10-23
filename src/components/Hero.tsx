import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-new.png";
import solarPanelsHero from "@/assets/solar-panel-new.png";
import ledLightingHero from "@/assets/led-light-new.png";
import CardSwap, { Card } from "@/components/CardSwap";
import GradientText from "@/components/effects/GradientText";
import DecryptedText from "@/components/effects/DecryptedText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const campaignVideo = "https://ahcwuywqoxbelvtyucrq.supabase.co/storage/v1/object/public/videos/video-b2grow-1760627822221.mp4";
const ufoVideo = "/videos/ufo-video.mp4";

const Hero = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (!video1 || !video2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log("Autoplay prevented:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video1);
    observer.observe(video2);

    return () => {
      observer.disconnect();
    };
  }, []);

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
                <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={powerStationHero} 
                    alt="Estación de Energía Portátil B2Grow" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-bold mb-2 text-white">Energía Portátil</h2>
                    <p className="text-lg text-white/90">
                      Estaciones de energía inteligentes para un futuro sustentable.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={solarPanelsHero} 
                    alt="Paneles Solares Flexibles B2Grow" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-bold mb-2 text-white">Paneles Solares</h2>
                    <p className="text-lg text-white/90">
                      Paneles flexibles de alta eficiencia para máxima captación.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={ledLightingHero} 
                    alt="Iluminación LED Inteligente B2Grow" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-bold mb-2 text-white">LED Inteligente</h2>
                    <p className="text-lg text-white/90">
                      Sistemas LED IoT para máxima eficiencia energética.
                    </p>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>

        {/* Video Section */}
        <div className="container mx-auto px-4 pb-20 pt-48">
          <div className="max-w-6xl mx-auto">
            {/* Video Header */}
            <div className="text-center mb-12 animate-fade-in">
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

            {/* Videos Carousel */}
            <div className="relative mb-12 px-16">
              <Carousel 
                className="w-full max-w-5xl mx-auto"
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                  }),
                ]}
              >
                <CarouselContent>
                  {/* Campaign Video */}
                  <CarouselItem>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <div className="aspect-video w-full">
                          <video 
                            ref={videoRef1}
                            src={campaignVideo}
                            controls
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            Tu navegador no soporta el tag de video.
                          </video>
                        </div>
                        <div className="p-6 bg-black/40 backdrop-blur-sm">
                          <h3 className="text-2xl font-semibold text-white mb-2">Campaña B2GROW</h3>
                          <p className="text-base text-white/70">Nuestra visión de tecnología sustentable</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* UFO Video */}
                  <CarouselItem>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <div className="aspect-video w-full">
                          <video 
                            ref={videoRef2}
                            src={ufoVideo}
                            controls
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            Tu navegador no soporta el tag de video.
                          </video>
                        </div>
                        <div className="p-6 bg-black/40 backdrop-blur-sm">
                          <h3 className="text-2xl font-semibold text-white mb-2">Iluminación UFO</h3>
                          <p className="text-base text-white/70">Tecnología LED de última generación</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
                <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              </Carousel>
            </div>

            {/* Optional: Video description or features below - NOW WITH SCROLL STACK EFFECT */}
            <ScrollStack 
              className="mt-12 max-w-4xl mx-auto"
              itemDistance={150}
              itemScale={0.05}
              itemStackDistance={40}
              stackPosition="30%"
              scaleEndPosition="20%"
              baseScale={0.9}
              useWindowScroll={false}
            >
              <ScrollStackItem itemClassName="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Zap className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    Innovación
                  </h3>
                  <p className="text-white/70 text-lg">Tecnología de vanguardia en cada producto</p>
                </div>
              </ScrollStackItem>
              
              <ScrollStackItem itemClassName="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Leaf className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    Sostenibilidad
                  </h3>
                  <p className="text-white/70 text-lg">Comprometidos con el medio ambiente</p>
                </div>
              </ScrollStackItem>
              
              <ScrollStackItem itemClassName="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Globe className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    Alcance Global
                  </h3>
                  <p className="text-white/70 text-lg">Presencia en múltiples mercados</p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;