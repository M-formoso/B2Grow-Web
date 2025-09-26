import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import b2growLogo from "@/assets/b2grow-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Estaciones de Energía", href: "#energia" },
    { name: "Paneles Solares", href: "#paneles" },
    { name: "Calculadora", href: "#calculadora" },
    { name: "Iluminación LED", href: "#iluminacion" },
    { name: "Quiénes Somos", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2 animate-slide-up">
            <img src={b2growLogo} alt="B2Grow" className="h-12 w-12" />
            <div>
              <h1 className="text-xl font-bold text-foreground">B2Grow</h1>
              <p className="text-sm text-accent font-medium">Línea Greenside</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <Button 
            variant="outline" 
            className="hidden lg:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground animate-slide-up"
            style={{ animationDelay: "600ms" }}
          >
            Solicitar Presupuesto
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                variant="outline" 
                className="mx-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Solicitar Presupuesto
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;