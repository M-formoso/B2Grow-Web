import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Users, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section id="contacto" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Dónde </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Comprar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contáctanos y solicita un presupuesto según tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="animate-slide-up bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-6 w-6 text-primary" />
                Solicitar Presupuesto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+54 11 1234-5678" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="company">Empresa (Opcional)</Label>
                <Input id="company" placeholder="Nombre de tu empresa" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea 
                  id="message" 
                  placeholder="Cuéntanos sobre tu proyecto y necesidades energéticas..."
                  className="mt-2 min-h-[120px]"
                />
              </div>
              <Button className="w-full bg-gradient-primary hover:shadow-energy" size="lg">
                Enviar Consulta
              </Button>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            {/* Chat with AI */}
            <Card className="group hover:shadow-energy transition-all duration-500 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-primary p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">Chat con IA</h3>
                    <p className="text-muted-foreground mb-4">
                      En nuestro chat podés encontrar la información y respuestas frecuentes que estás necesitando.
                    </p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Iniciar Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distributors */}
            <Card className="group hover:shadow-green transition-all duration-500 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-energy p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">Distribuidores Mayoristas Exclusivos</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <span className="font-medium">Ledscene</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <span className="font-medium">Growthled</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Become Distributor */}
            <Card className="group hover:shadow-energy transition-all duration-500 bg-gradient-primary/10 border-primary/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">¿Te interesa ser distribuidor?</h3>
                <p className="text-muted-foreground mb-4">
                  Contáctanos y sumate a nuestra red de distribuidores
                </p>
                <Button className="bg-gradient-primary hover:shadow-energy">
                  Quiero ser Distribuidor
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="group hover:shadow-green transition-all duration-500 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">+54 11 1234-5678</p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-energy transition-all duration-500 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-muted-foreground">info@b2grow.com</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;