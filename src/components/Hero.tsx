import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Globe } from "lucide-react";
import powerStationHero from "@/assets/power-station-new.png";
const powerStationCard = "/central-electrica-modular-card-home.png";
import solarPanelsHero from "@/assets/solar-panel-new.png";
import ledLightingHero from "@/assets/led-light-new.png";
import CardSwap, { Card } from "@/components/CardSwap";
import GradientText from "@/components/effects/GradientText";
import DecryptedText from "@/components/effects/DecryptedText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Threads from "@/components/effects/Threads";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import type { CarouselApi } from "@/components/ui/carousel";

const campaignVideo = "/videos/Copia de Video intro web 1.mp4";
const ufoVideo = "/videos/ufo-video.mp4";
const greensideVideo = "/videos/B2Grow Greenside Institucional IG (2).mp4";
const multiselectVideo = "/videos/VIDEO ORIGINAL B2GROW (1).MP4";


const Hero = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil para optimizar animaciones
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

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
    <section className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-tech opacity-100 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float pointer-events-none" style={{ animationDelay: "2s" }}></div>
      
      {/* Video Banner Section - FULL WIDTH */}
      <div className="relative w-full z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Video Container - Full Width with limited height */}
          <div className="relative w-full h-[85vh] overflow-hidden">
            <div className="relative w-full h-full">
              <video
                src={campaignVideo}
                autoPlay
                muted
                loop
                playsInline
                preload={isMobile ? "metadata" : "auto"}
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta el tag de video.
              </video>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

              {/* Text Overlay */}
              <div className="absolute bottom-12 md:bottom-0 left-0 right-0 p-4 md:p-12 lg:p-16 pointer-events-none">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl"
                  >
                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-3 tracking-tight">
                      <GradientText
                        colors={['#ffffff', '#f0f0f0', '#e0e0e0', '#ffffff']}
                        animationSpeed={4}
                        className="text-2xl md:text-5xl lg:text-6xl font-black"
                      >
                        POWERING THE FUTURE
                      </GradientText>
                    </h1>
                    <div className="text-sm md:text-xl text-white/90 max-w-2xl mb-3 md:mb-6">
                      <ScrollReveal baseOpacity={0.4} enableBlur={true} baseRotation={1} blurStrength={4}>
                        Tecnología inteligente de energía para un mundo sustentable
                      </ScrollReveal>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons - Más pequeños y responsivos */}
          <div className="absolute bottom-2 md:bottom-6 left-0 right-0 z-20">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-2 md:gap-4 justify-start max-w-4xl"
              >
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-background font-bold px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm shadow-energy"
                  onClick={() => window.location.href = '/productos'}
                >
                  Ver Productos
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm"
                  onClick={() => window.location.href = '/calculadora'}
                >
                  Calculadora
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Threads Effect Section - COMPACT VERSION */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative h-[40vh] w-full overflow-hidden">
          {/* Floating Products Animation - Above Threads - Solo en Desktop */}
          {!isMobile && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {/* Product 1 - Left side, slow fall */}
            <motion.div
              className="absolute z-10"
              initial={{ top: '-20%', left: '10%', opacity: 0, rotate: -15, scale: 0.6 }}
              animate={{
                top: '110%',
                left: '5%',
                opacity: [0, 0.9, 0.9, 0],
                rotate: -25,
                scale: [0.6, 0.8, 0.8, 0.6]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 0
              }}
            >
              <img
                src={powerStationHero}
                alt="Power Station"
                className="w-32 md:w-48 lg:w-64 filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Product 2 - Right side, medium speed */}
            <motion.div
              className="absolute"
              initial={{ top: '-25%', right: '15%', opacity: 0, rotate: 20, scale: 0.5 }}
              animate={{
                top: '110%',
                right: '10%',
                opacity: [0, 0.6, 0.6, 0],
                rotate: 30,
                scale: [0.5, 0.7, 0.7, 0.5]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 5
              }}
            >
              <img
                src={ledLightingHero}
                alt="LED Lighting"
                className="w-28 md:w-40 lg:w-56 filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Product 3 - Center, slow with blur effect */}
            <motion.div
              className="absolute z-10"
              initial={{ top: '-30%', left: '50%', x: '-50%', opacity: 0, rotate: 5, scale: 0.7 }}
              animate={{
                top: '110%',
                opacity: [0, 0.8, 0.8, 0],
                rotate: 15,
                scale: [0.7, 0.9, 0.9, 0.7]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
                delay: 4
              }}
            >
              <img
                src={powerStationHero}
                alt="Power Station"
                className="w-36 md:w-52 lg:w-72 filter drop-shadow-2xl blur-[1px]"
              />
            </motion.div>

            {/* Product 4 - Left center, fast fall */}
            <motion.div
              className="absolute"
              initial={{ top: '-15%', left: '25%', opacity: 0, rotate: -10, scale: 0.4 }}
              animate={{
                top: '110%',
                left: '20%',
                opacity: [0, 0.8, 0.8, 0],
                rotate: -20,
                scale: [0.4, 0.6, 0.6, 0.4]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 3
              }}
            >
              <img
                src={solarPanelsHero}
                alt="Solar Panel"
                className="w-24 md:w-36 lg:w-48 filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Product 5 - Right center, medium-slow */}
            <motion.div
              className="absolute"
              initial={{ top: '-20%', right: '30%', opacity: 0, rotate: 12, scale: 0.55 }}
              animate={{
                top: '110%',
                right: '25%',
                opacity: [0, 0.65, 0.65, 0],
                rotate: 22,
                scale: [0.55, 0.75, 0.75, 0.55]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
                delay: 6
              }}
            >
              <img
                src={ledLightingHero}
                alt="LED Lighting"
                className="w-30 md:w-44 lg:w-60 filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Product 6 - Left side, medium speed - Solar Panel */}
            <motion.div
              className="absolute"
              initial={{ top: '-18%', left: '40%', opacity: 0, rotate: -8, scale: 0.5 }}
              animate={{
                top: '110%',
                left: '35%',
                opacity: [0, 0.7, 0.7, 0],
                rotate: -18,
                scale: [0.5, 0.7, 0.7, 0.5]
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "linear",
                delay: 9
              }}
            >
              <img
                src={solarPanelsHero}
                alt="Solar Panel"
                className="w-26 md:w-38 lg:w-52 filter drop-shadow-2xl"
              />
            </motion.div>
          </div>
          )}

          {/* Threads Background - Simplificado en móvil */}
          <div className="absolute inset-0 w-full h-full">
            <Threads
              amplitude={isMobile ? 2 : 3}
              distance={isMobile ? 0.3 : 0.5}
              enableMouseInteraction={!isMobile}
            />
          </div>
        </div>

        {/* Title Section - Outside video */}
        <div className="pb-4 pt-2 relative z-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-4 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold mb-3 text-white">
                Conocé Nuestra Tecnología
              </h2>
              <p className="text-xl text-white/90">
                Descubrí cómo nuestras soluciones están revolucionando el sector energético
              </p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="pb-32 relative z-20">
          <div className="max-w-6xl mx-auto px-4">

            {/* Videos Carousel - FULL WIDTH */}
            <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw] mb-12">
              <Carousel
                setApi={setCarouselApi}
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {/* Campaign Video */}
                  <CarouselItem>
                    <div className="relative">
                      <div className="relative w-full h-[75vh] overflow-hidden">
                        <video
                          ref={videoRef1}
                          src={greensideVideo}
                          controls
                          muted
                          loop
                          playsInline
                          preload={isMobile ? "metadata" : "auto"}
                          className="w-full h-full object-cover"
                        >
                          Tu navegador no soporta el tag de video.
                        </video>
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 pointer-events-none">
                          <div className="container mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Campaña B2GROW</h3>
                            <p className="text-base md:text-lg text-white/80">Nuestra visión de tecnología sustentable</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* UFO Video */}
                  <CarouselItem>
                    <div className="relative">
                      <div className="relative w-full h-[75vh] overflow-hidden">
                        <video
                          ref={videoRef2}
                          src={multiselectVideo}
                          controls
                          muted
                          loop
                          playsInline
                          preload={isMobile ? "metadata" : "auto"}
                          className="w-full h-full object-cover"
                        >
                          Tu navegador no soporta el tag de video.
                        </video>
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 pointer-events-none">
                          <div className="container mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Iluminación UFO</h3>
                            <p className="text-base md:text-lg text-white/80">Tecnología de última generación</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20 ml-4" />
                <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-4" />
              </Carousel>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir al video ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Cards with Features Grid beside them */}
            <div className="-mt-12 lg:mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-start gap-8 lg:gap-16 max-w-7xl mx-auto pl-0 lg:pl-8">
              {/* Features Grid - LEFT SIDE */}
              <div className="flex-shrink-0 w-full lg:w-96 space-y-4 lg:space-y-8 lg:pt-12 mb-20 lg:mb-0">
                {/* Innovación - Primera card */}
                <motion.div
                  className="flex items-center gap-4 md:gap-6"
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-green-500/10 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap className="w-7 h-7 md:w-10 md:h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-1 text-white">Innovación</h3>
                    <p className="text-white/70 text-xs md:text-sm">
                      Tecnología LED de última generación
                    </p>
                  </div>
                </motion.div>

                {/* Sustentabilidad - Segunda card */}
                <motion.div
                  className="flex items-center gap-4 md:gap-6"
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-green-500/10 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Leaf className="w-7 h-7 md:w-10 md:h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-1 text-white">Sustentabilidad</h3>
                    <p className="text-white/70 text-xs md:text-sm">
                      Soluciones energéticamente eficientes
                    </p>
                  </div>
                </motion.div>

                {/* Alcance Global - Tercera card */}
                <motion.div
                  className="flex items-center gap-4 md:gap-6"
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-green-500/10 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Globe className="w-7 h-7 md:w-10 md:h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-1 text-white">Alcance Global</h3>
                    <p className="text-white/70 text-xs md:text-sm">
                      Presencia en múltiples mercados
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CardSwap - RIGHT SIDE */}
              <div className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center">
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
                  <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl bg-transparent">
                    <img
                      src={powerStationCard}
                      alt="Estación de Energía Portátil B2Grow"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-3xl font-bold mb-2 text-white"></h2>
                      <p className="text-lg text-white/90">

                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl bg-transparent">
                    <img
                      src={solarPanelsHero}
                      alt="Paneles Solares Flexibles B2Grow"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-3xl font-bold mb-2 text-white"></h2>
                      <p className="text-lg text-white/90">

                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="relative rounded-2xl h-full overflow-hidden border border-white/10 shadow-2xl bg-transparent">
                    <img
                      src={ledLightingHero}
                      alt="Iluminación LED Inteligente B2Grow"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-3xl font-bold mb-2 text-white"></h2>
                      <p className="text-lg text-white/90">

                      </p>
                    </div>
                  </div>
                </Card>
              </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;