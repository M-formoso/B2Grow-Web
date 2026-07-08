import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import StaggeredMenu from "./StaggeredMenu";
import PillNav from "./PillNav";
import greensideLogo from "@/assets/b2grow-greenside-logo.png";
import multiselectLogo from "@/assets/b2grow-multiselect-logo.png";
import greensideBg from "@/assets/greenside-bg.png";

const b2growLogo = "/Marca B2Grow png.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Interceptar clicks en el nav de productos para siempre ir al dashboard principal
    const handleProductsClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/productos"]');

      // Solo aplicar si estamos en el header/nav, no en toda la página
      const isInNav = target.closest('header, nav, .pill-nav-custom');

      if (link && isInNav) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/productos', { replace: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleProductsClick, true);
    return () => document.removeEventListener('click', handleProductsClick, true);
  }, [navigate]);

  const navItems = [
    { label: "Inicio", href: "/", ariaLabel: "Ir al inicio" },
    {
      label: "Productos",
      href: "/productos",
      ariaLabel: "Ver productos",
      children: [
        {
          label: "Greenside",
          href: "/greenside",
          ariaLabel: "Ver línea Greenside",
          icon: greensideLogo,
          description: "Estaciones de energía portátil, paneles solares y proyectos de energía solar",
        },
        {
          label: "Multiselect",
          href: "/multiselect",
          ariaLabel: "Ver línea Multiselect",
          icon: multiselectLogo,
          description: "Luminarias UFO industriales y decorativas con color, potencia y ángulo seleccionables",
        },
      ],
      featured: {
        label: "TODAS LAS LÍNEAS",
        title: "Ver todos los productos",
        description: "Explorá el catálogo completo de B2Grow en una sola vista.",
        image: greensideBg,
        href: "/productos",
      },
    },
    { label: "Nosotros", href: "/nosotros", ariaLabel: "Conocer sobre nosotros" },
    { label: "Contacto", href: "/contacto", ariaLabel: "Contactar" },
  ];

  const staggeredNavItems = [
    { label: "Inicio", link: "/", ariaLabel: "Ir al inicio" },
    { label: "Greenside", link: "/greenside", ariaLabel: "Ver línea Greenside" },
    { label: "Multiselect", link: "/multiselect", ariaLabel: "Ver línea Multiselect" },
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
      <>
        {/* Backdrop cuando el menú está abierto */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Botones de tiendas visibles fuera del menú hamburguesa */}
        {!menuOpen && (
          <div className="fixed top-[30px] right-[110px] z-[60] flex flex-col gap-1.5 pointer-events-auto">
            <a
              href="https://estaciondeenergia.mitiendanube.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#E63329" }}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-white rounded-full font-semibold text-[10px] shadow-md whitespace-nowrap"
              aria-label="Comprá acá · Clientes"
            >
              <ShoppingCart className="w-3 h-3" strokeWidth={2.25} />
              Clientes
            </a>
            <a
              href="https://bnaconecta.com.ar/B2Grow"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#16A34A" }}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-white rounded-full font-semibold text-[10px] shadow-md whitespace-nowrap"
              aria-label="Comprá acá · Industrias"
            >
              <ShoppingCart className="w-3 h-3" strokeWidth={2.25} />
              Industrias
            </a>
          </div>
        )}

        {/* StaggeredMenu se renderiza directamente, maneja su propio posicionamiento */}
        <StaggeredMenu
          position="right"
          items={staggeredNavItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#FFFFFF"
          openMenuButtonColor="#FFFFFF"
          changeMenuColorOnOpen={false}
          colors={['#FFFFFF', '#F0F0F0']}
          logoUrl={b2growLogo}
          accentColor="#FFFFFF"
          onMenuOpen={() => {
            console.log('Menu opened');
            setMenuOpen(true);
          }}
          onMenuClose={() => {
            console.log('Menu closed');
            setMenuOpen(false);
          }}
        />
      </>
    );
  }

  return (
    <div className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="w-full grid grid-cols-3 items-center px-8 py-0.05 pointer-events-auto min-h-[120px]">
        {/* Logo - Columna izquierda */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="transition-transform hover:scale-110 duration-300 flex flex-col items-start gap-1"
            aria-label="Ir al inicio"
          >
            <img
              src={b2growLogo}
              alt="B2Grow Logo"
              className="h-24 lg:h-28 w-auto"
            />
            <p className="text-white/90 text-xs lg:text-sm font-medium tracking-wide">
              Energía inteligente para un mundo sustentable
            </p>
          </Link>
        </div>

        {/* Nav Pills - Columna central (perfectamente centrado) */}
        <div className="flex justify-center">
          <PillNav
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

        {/* CTA Calculadora - Columna derecha */}
        <div className="flex justify-end items-center gap-3">
          <div className="flex flex-col gap-2">
            <a
              href="https://estaciondeenergia.mitiendanube.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#E63329" }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-white rounded-full font-semibold text-xs hover:scale-105 hover:brightness-110 transition-all shadow-md whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2.25} />
              Comprá acá · Clientes
            </a>
            <a
              href="https://bnaconecta.com.ar/B2Grow"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#16A34A" }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-white rounded-full font-semibold text-xs hover:scale-105 hover:brightness-110 transition-all shadow-md whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2.25} />
              Comprá acá · Industrias
            </a>
          </div>
          {location.pathname !== "/calculadora" && (
            <Link
              to="/calculadora"
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full font-semibold text-sm hover:scale-105 transition-all shadow-lg hover:shadow-green whitespace-nowrap"
            >
              Calculá tu equipo ideal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;