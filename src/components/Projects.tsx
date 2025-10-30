import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    image: "/proyectos/Proyectos realizados - Bar.png",
    title: "Proyecto en Palermo",
    testimonial: "Probando el equipo acá en Palermo, estaba cansado de que me corten la luz, estoy contento porque este mes tuve un corte de casi 2h y seguí trabajando con casi todo encendido",
    author: "Cliente Palermo"
  },
  {
    image: "/proyectos/Proyectos Realizados - Herramientas.png",
    title: "Taller Mecánico",
    testimonial: "La verdad que estoy re contento con el equipo chicos, pruebo herramientas en el taller y se la re banca!",
    author: "Taller Mecánico"
  }
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proyectos <span className="text-primary">Realizados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conocé las experiencias reales de nuestros clientes con nuestros productos
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-4"
                  >
                    <div
                      className="relative group cursor-pointer mx-auto max-w-2xl"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-[350px] lg:h-[400px] object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        {/* Title - Always visible */}
                        <div className="absolute top-8 left-8 right-8">
                          <h3 className="text-3xl font-bold text-white">
                            {project.title}
                          </h3>
                        </div>

                        {/* Testimonial - Appears on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            y: hoveredIndex === index ? 0 : 20
                          }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-8 lg:p-12"
                        >
                          <Quote className="w-12 h-12 text-primary mb-6" />
                          <p className="text-xl lg:text-2xl text-white text-center leading-relaxed mb-6 italic">
                            "{project.testimonial}"
                          </p>
                          <p className="text-primary font-semibold text-lg">
                            - {project.author}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Controls */}
            <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20 left-4" />
            <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20 right-4" />
          </Carousel>
        </div>

        {/* Optional: Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index ? 'w-8 bg-primary' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
