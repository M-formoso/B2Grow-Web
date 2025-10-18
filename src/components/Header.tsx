import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import b2growLogo from "@/assets/b2grow-logo.png";
import StaggeredMenu from "./StaggeredMenu";
import PillNav from "./PillNav";

const Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: "Inicio", href: "/", ariaLabel: "Ir al inicio" },
    { label: "Productos", href: "/productos", ariaLabel: "Ver productos" },
    { label: "Nosotros", href: "/nosotros", ariaLabel: "Conocer sobre nosotros" },
    { label: "Contacto", href: "/contacto", ariaLabel: "Contactar" },
  ];

  const staggeredNavItems = [
    { label: "Inicio", link: "/", ariaLabel: "Ir al inicio" },
    { label: "Productos", link: "/productos", ariaLabel: "Ver productos" },
    { label: "Nosotros", link: "/nosotros", ariaLabel: "Conocer sobre nosotros" },
    { label: "Contacto", link: "/contacto", ariaLabel: "Contactar" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "https://linkedin.com/company/b2grow" },
    { label: "Facebook", link: "https://facebook.com/b2grow" },
    { label: "Instagram", link: "https://instagram.com/b2grow" }
  ];

  if (isMobile) {
    return (
      <div className="fixed top-0 w-full z-50" style={{ height: '100vh', pointerEvents: 'none' }}>
        <StaggeredMenu
          position="right"
          items={staggeredNavItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="hsl(var(--foreground))"
          openMenuButtonColor="hsl(var(--foreground))"
          changeMenuColorOnOpen={true}
          colors={['hsl(var(--primary))', 'hsl(var(--accent))']}
          logoUrl={b2growLogo}
          accentColor="hsl(var(--primary))"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
          className="pointer-events-auto"
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="w-full flex justify-center pointer-events-auto">
        <PillNav
          logo={b2growLogo}
          logoAlt="B2Grow Logo"
          items={navItems}
          activeHref={location.pathname}
          className="pill-nav-custom"
          ease="power2.easeOut"
          baseColor="#FFFFFF"
          pillColor="rgba(255, 255, 255, 0.1)"
          hoveredPillTextColor="#FFFFFF"
          pillTextColor="#FFFFFF"
          onMobileMenuClick={() => console.log('Mobile menu clicked')}
        />
      </div>
    </div>
  );
};

export default Header;