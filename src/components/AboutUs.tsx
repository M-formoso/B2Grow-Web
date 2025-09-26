import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Zap, Globe } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: Users, label: "Años de Experiencia", value: "20+", color: "text-primary" },
    { icon: Award, label: "Proyectos Completados", value: "500+", color: "text-accent" },
    { icon: Zap, label: "Ahorro Energético", value: "85%", color: "text-primary" },
    { icon: Globe, label: "Países Atendidos", value: "15+", color: "text-accent" }
  ];

  return (
    <section id="nosotros" className="py-20 bg-gradient-tech relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Quiénes </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Somos</span>
          </h2>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos una fusión de <span className="text-primary font-semibold">tecnología</span>, 
                <span className="text-accent font-semibold"> eficiencia energética</span> y 
                <span className="text-primary font-semibold"> sustentabilidad</span> con soluciones inteligentes 
                de iluminación, movilidad e independencia energética, para múltiples clientes que exigen 
                productos dinámicos, de gran calidad y sobre todo con un alto nivel de atención y servicio.
              </p>
              <br />
              <p className="text-lg text-muted-foreground leading-relaxed">
                En eso trabajamos todos los días con mucho esfuerzo, con <span className="text-primary font-semibold">20 años de experiencia</span> 
                apostando con creatividad a un futuro más eficiente y sustentable.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="group bg-card/30 backdrop-blur-sm border-border hover:shadow-lift transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <stat.icon className={`h-12 w-12 ${stat.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="group bg-card/30 backdrop-blur-sm border-border hover:shadow-energy transition-all duration-500 animate-slide-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Innovación</h3>
              <p className="text-muted-foreground">
                Desarrollamos tecnología de vanguardia para soluciones energéticas del futuro.
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-card/30 backdrop-blur-sm border-border hover:shadow-green transition-all duration-500 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Sustentabilidad</h3>
              <p className="text-muted-foreground">
                Comprometidos con el medio ambiente y un futuro más verde para todos.
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-card/30 backdrop-blur-sm border-border hover:shadow-energy transition-all duration-500 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Calidad</h3>
              <p className="text-muted-foreground">
                Productos de la más alta calidad con atención y servicio excepcional.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;