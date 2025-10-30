import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Quote } from "lucide-react";
import greensideLogo from "@/assets/b2grow-greenside-logo.png";
import { useState } from "react";

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
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const quickLinks = [
    { name: "Estaciones de Energía", href: "#energia" },
    { name: "Paneles Solares", href: "#paneles" },
    { name: "Iluminación LED", href: "#iluminacion" },
    { name: "Calculadoras", href: "#calculadora" }
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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="animate-slide-up">
            <div className="flex items-center mb-1">
              <img src={greensideLogo} alt="B2Grow Greenside" className="h-44 lg:h-48 w-auto" />
            </div>
            <p className="text-muted-foreground mb-1 leading-relaxed">
              Tecnología, eficiencia energética y sustentabilidad para un futuro más inteligente.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-primary hover:border-primary group"
                >
                  <social.icon className="h-4 w-4 group-hover:text-primary-foreground" />
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
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#nosotros"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Quiénes Somos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h4 className="text-lg font-bold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@b2grow.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-muted-foreground">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h4 className="text-lg font-bold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-3">
              Suscríbete para recibir las últimas novedades en tecnología energética.
            </p>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <Button className="w-full bg-gradient-primary hover:shadow-energy">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 B2Grow - Línea Greenside. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
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