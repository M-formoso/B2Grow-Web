import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-new.png";
import solarPanelsHero from "@/assets/solar-panel-new.png";
import ledLightingHero from "@/assets/led-light-new.png";
import CardSwap, { Card } from "@/components/CardSwap";
import GradientText from "@/components/effects/GradientText";
import DecryptedText from "@/components/effects/DecryptedText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Threads from "@/components/effects/Threads";
import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const campaignVideo = "/videos/Copia de Video intro web 1.mp4";
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
      
      {/* Video Banner Section - FULL WIDTH */}
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Video Container - Full Width with limited height */}
          <div className="relative w-full max-h-[70vh] overflow-hidden">
            <div className="relative w-full">
              <video 
                src={campaignVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover max-h-[70vh]"
              >
                Tu navegador no soporta el tag de video.
              </video>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl"
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
                      <GradientText 
                        colors={['#ffffff', '#f0f0f0', '#e0e0e0', '#ffffff']}
                        animationSpeed={4}
                        className="text-3xl md:text-5xl lg:text-6xl font-black"
                      >
                        POWERING THE FUTURE
                      </GradientText>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
                      <ScrollReveal baseOpacity={0.4} enableBlur={true} baseRotation={1} blurStrength={4}>
                        Tecnología inteligente de energía para un mundo sustentable
                      </ScrollReveal>
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="absolute bottom-6 left-0 right-0 z-20">
            <div className="container mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-start max-w-4xl"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-background font-bold px-6 py-5 text-base shadow-energy"
                  onClick={() => window.location.href = '/productos'}
                >
                  Ver Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-5 text-base"
                  onClick={() => window.location.href = '/calculadora'}
                >
                  Calculadora Energética
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Threads Effect Section - AFTER VIDEO */}
      <div className="container mx-auto px-4">
        <div className="relative min-h-[85vh] w-full">
          {/* Threads Background */}
          <div className="absolute inset-0 w-full h-full">
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="pb-20 pt-48">
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

            {/* Features Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Innovación</h3>
                <p className="text-white/70 text-sm">
                  Tecnología LED de última generación
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Sustentabilidad</h3>
                <p className="text-white/70 text-sm">
                  Soluciones energéticamente eficientes
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Alcance Global</h3>
                <p className="text-white/70 text-sm">
                  Presencia en múltiples mercados
                </p>
              </div>
            </div>

            {/* Product Cards below video */}
            <div className="mt-24 flex items-center justify-center" style={{ minHeight: '600px', position: 'relative' }}>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;