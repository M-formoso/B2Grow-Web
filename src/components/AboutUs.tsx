import { motion, AnimatePresence } from "framer-motion";
import aboutHeroImage from "@/assets/about-us-hero.png";
import facility1 from "@/assets/about-us/facility-1.jpg";
import greensideLogo from "@/assets/b2grow-greenside-logo.png";
import multiselectLogo from "@/assets/b2grow-multiselect-logo.png";
import DecryptedText from "@/components/effects/DecryptedText";
import ScrollReveal from "@/components/effects/ScrollReveal";
import VariableProximity from "@/components/effects/VariableProximity";
import { useRef, useState, useEffect } from "react";

const AboutUs = () => {
  const containerRef = useRef(null);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  const logos = [
    { src: greensideLogo, alt: "B2Grow Línea Greenside" },
    { src: multiselectLogo, alt: "B2Grow Línea Multiselect" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % logos.length);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <section 
      id="nosotros" 
      ref={containerRef}
      className="min-h-screen bg-gradient-tech relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section with Decrypted Text Effect */}
        <div className="min-h-screen flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            {/* Logo Carousel */}
            <div className="relative h-32 lg:h-48 mb-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentLogoIndex}
                  src={logos[currentLogoIndex].src}
                  alt={logos[currentLogoIndex].alt}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.6 }}
                  className="max-h-full w-auto object-contain"
                />
              </AnimatePresence>
            </div>
            
            <div className="text-2xl lg:text-3xl font-light text-foreground/80 mb-12">
              <VariableProximity
                label="Tecnología • Eficiencia • Sustentabilidad"
                fromFontVariationSettings="'wght' 300"
                toFontVariationSettings="'wght' 700"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
                className="text-primary"
              />
            </div>
          </motion.div>

          {/* Main Description with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="text-xl lg:text-2xl leading-relaxed text-foreground/90">
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={true}
                baseRotation={2}
                blurStrength={6}
              >
                Somos una fusión de tecnología, eficiencia energética y sustentabilidad. 
                Creamos soluciones inteligentes de iluminación, movilidad e independencia energética 
                para clientes que exigen productos dinámicos y de gran calidad. Con 20 años de experiencia, 
                apostamos con creatividad a un futuro más eficiente y sustentable.
              </ScrollReveal>
            </div>
          </motion.div>

          {/* Image Grid with Parallax Effect */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={aboutHeroImage}
                  alt="B2Grow Technology"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    <DecryptedText
                      text="Innovación Constante"
                      speed={30}
                      animateOn="hover"
                      className="text-white"
                    />
                  </h3>
                  <p className="text-white/80">Tecnología de vanguardia</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={facility1}
                  alt="B2Grow Facilities"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    <DecryptedText
                      text="Calidad Superior"
                      speed={30}
                      animateOn="hover"
                      className="text-white"
                    />
                  </h3>
                  <p className="text-white/80">Producción de excelencia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section with Dynamic Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm border border-primary/20"
            >
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
                20+
              </div>
              <div className="text-sm lg:text-base text-foreground/70">
                <ScrollReveal baseOpacity={0.4} enableBlur={false}>
                  Años de Experiencia
                </ScrollReveal>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm border border-accent/20"
            >
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-energy bg-clip-text text-transparent mb-3">
                500+
              </div>
              <div className="text-sm lg:text-base text-foreground/70">
                <ScrollReveal baseOpacity={0.4} enableBlur={false}>
                  Proyectos Completados
                </ScrollReveal>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm border border-primary/20"
            >
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
                85%
              </div>
              <div className="text-sm lg:text-base text-foreground/70">
                <ScrollReveal baseOpacity={0.4} enableBlur={false}>
                  Ahorro Energético
                </ScrollReveal>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm border border-accent/20"
            >
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-energy bg-clip-text text-transparent mb-3">
                15+
              </div>
              <div className="text-sm lg:text-base text-foreground/70">
                <ScrollReveal baseOpacity={0.4} enableBlur={false}>
                  Países Atendidos
                </ScrollReveal>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement with Scroll Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            <VariableProximity
              label="Nuestro Compromiso"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
              className="bg-gradient-primary bg-clip-text text-transparent"
            />
          </h2>
          
          <div className="space-y-8 text-lg lg:text-xl leading-relaxed text-foreground/80">
            <ScrollReveal baseOpacity={0.2} enableBlur={true} blurStrength={8}>
              Desarrollamos tecnología de vanguardia para soluciones energéticas del futuro, 
              comprometidos con el medio ambiente y un futuro más verde para todos.
            </ScrollReveal>
            
            <ScrollReveal baseOpacity={0.2} enableBlur={true} blurStrength={8}>
              Cada producto que creamos es resultado de años de investigación, desarrollo 
              y un profundo entendimiento de las necesidades de nuestros clientes.
            </ScrollReveal>
            
            <ScrollReveal baseOpacity={0.2} enableBlur={true} blurStrength={8}>
              Nuestra misión es hacer que la energía eficiente y sustentable sea accesible 
              para todos, transformando la manera en que el mundo consume y produce energía.
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;