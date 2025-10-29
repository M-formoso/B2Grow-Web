import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Users, ExternalLink, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import ledsceneLogo from "@/assets/logo-ledscene.png";
import growthledLogo from "@/assets/logo-growthled.jpg";

const Contact = () => {
  const [showDistributorForm, setShowDistributorForm] = useState(false);
  const [distributorFormData, setDistributorFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    province: "",
    experience: "",
    message: ""
  });

  const handleDistributorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!distributorFormData.name || !distributorFormData.email || !distributorFormData.phone || !distributorFormData.company) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos
    console.log("Datos del distribuidor:", distributorFormData);
    toast.success("¡Formulario enviado exitosamente! Nos pondremos en contacto pronto.");
    
    // Limpiar formulario y cerrar modal
    setDistributorFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      province: "",
      experience: "",
      message: ""
    });
    setShowDistributorForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDistributorFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            {/* WhatsApp Cards - Destacados */}
            <Card className="group hover:shadow-green transition-all duration-500 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                  Contacto Directo WhatsApp
                </h3>
                <div className="space-y-4">
                  {/* Cotización */}
                  <a
                    href="https://wa.me/5491151857753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Cotización</p>
                          <p className="text-sm text-muted-foreground">+54 9 11 5185-7753</p>
                        </div>
                      </div>
                      <ExternalLink className="h-5 w-5 text-green-500" />
                    </div>
                  </a>
                  
                  {/* Asesoramiento */}
                  <a
                    href="https://wa.me/5491166230246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Asesoramiento</p>
                          <p className="text-sm text-muted-foreground">+54 9 11 6623-0246</p>
                        </div>
                      </div>
                      <ExternalLink className="h-5 w-5 text-blue-500" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Distributors */}
            <Card className="group hover:shadow-energy transition-all duration-500 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-energy p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-4">Distribuidores Mayoristas Exclusivos</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors group/item">
                        <img 
                          src={ledsceneLogo} 
                          alt="Ledscene" 
                          className="h-6 object-contain"
                        />
                        <Button variant="ghost" size="sm" className="group-hover/item:text-primary">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors group/item">
                        <img 
                          src={growthledLogo} 
                          alt="Growthled" 
                          className="h-12 object-contain"
                        />
                        <Button variant="ghost" size="sm" className="group-hover/item:text-primary">
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
                <Button
                  onClick={() => setShowDistributorForm(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Quiero ser Distribuidor
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="group hover:shadow-energy transition-all duration-500 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Email</h4>
                <a 
                  href="mailto:info@b2grow.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@b2grow.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Formulario de Distribuidor */}
      <Dialog open={showDistributorForm} onOpenChange={setShowDistributorForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Solicitud para Ser Distribuidor
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleDistributorSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dist-name">Nombre Completo *</Label>
                <Input 
                  id="dist-name"
                  name="name"
                  value={distributorFormData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo" 
                  className="mt-2" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="dist-email">Email *</Label>
                <Input 
                  id="dist-email"
                  name="email"
                  type="email"
                  value={distributorFormData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com" 
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dist-phone">Teléfono *</Label>
                <Input 
                  id="dist-phone"
                  name="phone"
                  value={distributorFormData.phone}
                  onChange={handleInputChange}
                  placeholder="+54 11 1234-5678" 
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dist-company">Empresa *</Label>
                <Input 
                  id="dist-company"
                  name="company"
                  value={distributorFormData.company}
                  onChange={handleInputChange}
                  placeholder="Nombre de tu empresa" 
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dist-city">Ciudad</Label>
                <Input 
                  id="dist-city"
                  name="city"
                  value={distributorFormData.city}
                  onChange={handleInputChange}
                  placeholder="Tu ciudad" 
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="dist-province">Provincia/Estado</Label>
                <Input 
                  id="dist-province"
                  name="province"
                  value={distributorFormData.province}
                  onChange={handleInputChange}
                  placeholder="Tu provincia" 
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dist-experience">Experiencia en el Sector</Label>
              <Input 
                id="dist-experience"
                name="experience"
                value={distributorFormData.experience}
                onChange={handleInputChange}
                placeholder="Ej: 5 años en distribución de productos eléctricos" 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="dist-message">Mensaje / Información Adicional</Label>
              <Textarea 
                id="dist-message"
                name="message"
                value={distributorFormData.message}
                onChange={handleInputChange}
                placeholder="Cuéntanos sobre tu interés en distribuir nuestros productos, tu experiencia previa, zona de cobertura, etc..."
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowDistributorForm(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-primary hover:shadow-energy"
              >
                Enviar Solicitud
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;