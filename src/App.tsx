import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashCursor from "@/components/effects/SplashCursor";
import { CursorColorProvider } from "@/contexts/CursorColorContext";
import ChatButton from "@/components/ChatButton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Calculator from "./pages/Calculator";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil o tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CursorColorProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* TEMPORALMENTE DESHABILITADO PARA DEBUG */}
          {/* {!isMobile && <SplashCursor />} */}
          <ChatButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/calculadora" element={<Calculator />} />
              <Route path="/nosotros" element={<AboutUs />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CursorColorProvider>
    </QueryClientProvider>
  );
};

export default App;
