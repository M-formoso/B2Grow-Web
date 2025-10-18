import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import aboutHeroImage from "@/assets/about-us-hero.png";

const AboutUs = () => {
  return (
    <section id="nosotros" className="py-20 bg-gradient-tech relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section with Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold">
                <span className="text-foreground">Quiénes </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">Somos</span>
              </h2>
              
              <div className="text-lg text-muted-foreground leading-relaxed">
                <p>
                  Somos una fusión de <span className="text-primary font-semibold">tecnología</span>, 
                  <span className="text-primary font-semibold"> eficiencia energética</span> y 
                  <span className="text-primary font-semibold"> sustentabilidad</span> con soluciones inteligentes 
                  de iluminación, movilidad e independencia energética, para múltiples clientes que exigen 
                  productos dinámicos, de gran calidad y sobre todo con un alto nivel de atención y servicio. 
                  En eso trabajamos todos los días con mucho esfuerzo, con <span className="text-primary font-semibold">20 años de experiencia</span> apostando 
                  con creatividad a un futuro más eficiente y sustentable.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <h3 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">20+</h3>
                  <p className="text-sm text-muted-foreground">Años de Experiencia</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <h3 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground">Proyectos Completados</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <h3 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">85%</h3>
                  <p className="text-sm text-muted-foreground">Ahorro Energético</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <h3 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">15+</h3>
                  <p className="text-sm text-muted-foreground">Países Atendidos</p>
                </motion.div>
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutHeroImage} 
                  alt="B2Grow - Calidad, Diseño y Confort" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <Card className="bg-card/30 backdrop-blur-sm border-border h-full">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">01</div>
                <h3 className="text-2xl font-bold text-foreground">Innovación</h3>
                <p className="text-muted-foreground">
                  Desarrollamos tecnología de vanguardia para soluciones energéticas del futuro.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-energy opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <Card className="bg-card/30 backdrop-blur-sm border-border h-full">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-energy bg-clip-text text-transparent">02</div>
                <h3 className="text-2xl font-bold text-foreground">Sustentabilidad</h3>
                <p className="text-muted-foreground">
                  Comprometidos con el medio ambiente y un futuro más verde para todos.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <Card className="bg-card/30 backdrop-blur-sm border-border h-full">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">03</div>
                <h3 className="text-2xl font-bold text-foreground">Calidad</h3>
                <p className="text-muted-foreground">
                  Productos de la más alta calidad con atención y servicio excepcional.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;