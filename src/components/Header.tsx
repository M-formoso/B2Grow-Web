import { useState } from "react";
import { Link } from "react-router-dom";
import b2growLogo from "@/assets/b2grow-logo.png";
import StaggeredMenu from "./StaggeredMenu";

const Header = () => {
  const navItems = [
    { label: "Inicio", link: "/", ariaLabel: "Ir al inicio" },
    { label: "Productos", link: "/productos", ariaLabel: "Ver productos" },
    { label: "Calculadora", link: "/calculadora", ariaLabel: "Usar calculadora" },
    { label: "Nosotros", link: "/nosotros", ariaLabel: "Conocer sobre nosotros" },
    { label: "Contacto", link: "/contacto", ariaLabel: "Contactar" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "https://linkedin.com/company/b2grow" },
    { label: "Facebook", link: "https://facebook.com/b2grow" },
    { label: "Instagram", link: "https://instagram.com/b2grow" }
  ];

  return (
    <div className="fixed top-0 w-full z-50" style={{ height: '100vh', pointerEvents: 'none' }}>
      <StaggeredMenu
        position="right"
        items={navItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="hsl(var(--foreground))"
        openMenuButtonColor="hsl(var(--foreground))"
        changeMenuColorOnOpen={true}
        colors={['hsl(var(--primary))', 'hsl(var(--primary-glow))']}
        logoUrl={b2growLogo}
        accentColor="hsl(var(--primary))"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        className="pointer-events-auto"
      />
    </div>
  );
};

export default Header;