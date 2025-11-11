import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Quote } from "lucide-react";
import greensideLogo from "@/assets/b2grow-greenside-logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      image: "/proyectos/Proyectos realizados - Bar.png",
      title: "Proyecto en Palermo",
      testimonial: "Probando el equipo acá en Palermo, estaba cansado de que me corten la luz, estoy contento porque este mes tuve un corte de casi 2h y seguí trabajando con casi todo encendido"
    },
    {
      image: "/proyectos/Proyectos Realizados - Herramientas.png",
      title: "Taller Mecánico",
      testimonial: "La verdad que estoy re contento con el equipo chicos, pruebo herramientas en el taller y se la re banca!"
    },
    {
      image: "/proyectos/mundo-movimiento.png",
      title: "Eventos y Festivales",
      testimonial: "Presentes en las mejores producciones, festivales y eventos con tecnología de vanguardia que garantiza energía confiable en cualquier situación"
    },
    {
      image: "/proyectos/Proyectos realizados camioneta.png",
      title: "Aventura en Familia",
      testimonial: "Un equipo maravilloso, preparándome para salir de campamento con mi Familia."
    },
    {
      image: "/proyectos/Proyectos realizados nave industrial.png",
      title: "Nave Industrial",
      testimonial: "Instalamos los equipos en nuestra planta industrial y funcionan impecables. Mantienen la producción activa incluso durante interrupciones del suministro eléctrico, evitando pérdidas significativas."
    },
    {
      image: "/proyectos/Proyectos realizados pileta.png",
      title: "Hogar en City Bell",
      testimonial: "Debido a los continuos cortes de energía compré este equipo que me da soluciones a todas las necesidades de mi hogar"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Calculadora", href: "/calculadora" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" }
  ];

  return (
    <footer className="bg-gradient-tech border-t border-border">
      {/* Projects Carousel */}
      <div className="py-8 overflow-hidden">
        <div className="container mx-auto px-4 mb-6">
          <h3 className="text-3xl font-bold text-center mb-5">
            <span className="text-foreground">Nuestros </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Proyectos</span>
          </h3>
        </div>
        
        <div className="flex space-x-6 animate-slide-x">
          {[...projects, ...projects].map((project, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-80 h-48 overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:shadow-lift transition-all duration-500 group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>

                {/* Title - Always visible */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
                </div>

                {/* Testimonial - Appears on hover */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in">
                    <Quote className="w-8 h-8 text-primary mb-3" />
                    <p className="text-sm text-white text-center leading-relaxed italic">
                      "{project.testimonial}"
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Brand - LOGO TAMAÑO ORIGINAL */}
          <div className="animate-slide-up">
            <div>
              <img 
                src={greensideLogo} 
                alt="B2Grow Greenside" 
                className="h-36 lg:h-40 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm -mt-12">
              Tecnología, eficiencia energética y sustentabilidad para un futuro más inteligente.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-primary hover:border-primary group"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4 group-hover:text-primary-foreground" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h4 className="text-lg font-bold text-foreground mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h4 className="text-lg font-bold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@b2grow.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm text-center md:text-left">
            © 2024 B2Grow - Línea Greenside. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Aviso Legal
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;