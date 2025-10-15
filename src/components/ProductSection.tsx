import ProductCard from "./ProductCard";
import Hyperspeed, { hyperspeedPresets } from "@/components/effects/Hyperspeed";
import { motion } from "framer-motion";

// Import Module Power Station images
import mainImage1 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-01.jpg";
import mainImage2 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-02.jpg";
import mainImage3 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-03.jpg";
import mainImage4 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-04.jpg";
import mainImage5 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-05.jpg";
import mainImage6 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-06.jpg";
import mainImage7 from "@/assets/b2grow-greenside/images/module-power-station/main-images-800x800/A4_-07.jpg";

import detailImage1 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-01.jpg";
import detailImage2 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-02.jpg";
import detailImage3 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-03.jpg";
import detailImage5 from "@/assets/b2grow-greenside/images/module-power-station/detailed-images/long_picture-05.jpg";

const products = [
  {
    name: "Estaciones de Energía Portátil Inteligente",
    description: "Soluciones de energía portátil de alta capacidad con tecnología inteligente para múltiples aplicaciones industriales y comerciales.",
    mainImages: [mainImage1, mainImage2, mainImage3, mainImage4, mainImage5, mainImage6, mainImage7],
    detailImages: [detailImage1, detailImage2, detailImage3, detailImage5]
  },
  {
    name: "Panel Solar Portátil 200W",
    description: "Panel solar de alta eficiencia, plegable y portátil, ideal para cargar dispositivos en exteriores y aplicaciones móviles.",
    mainImages: [], // AGREGA TUS IMÁGENES AQUÍ: [imagen1, imagen2, ...]
    detailImages: [] // OPCIONAL: Agrega imágenes detalladas aquí
  },
  {
    name: "Iluminación LED Grow",
    description: "Sistema de iluminación LED especializado para cultivo indoor con espectro optimizado y control inteligente de intensidad.",
    mainImages: [], // AGREGA TUS IMÁGENES AQUÍ: [imagen1, imagen2, ...]
    detailImages: [] // OPCIONAL: Agrega imágenes detalladas aquí
  },
  {
    name: "Sistema de Almacenamiento de Energía",
    description: "Baterías de litio de alta capacidad para almacenamiento residencial y comercial con gestión inteligente de energía.",
    mainImages: [], // AGREGA TUS IMÁGENES AQUÍ: [imagen1, imagen2, ...]
    detailImages: [] // OPCIONAL: Agrega imágenes detalladas aquí
  },
  {
    name: "Inversor Solar Híbrido",
    description: "Inversor de última generación con tecnología híbrida para máxima eficiencia en sistemas solares residenciales y comerciales.",
    mainImages: [], // AGREGA TUS IMÁGENES AQUÍ: [imagen1, imagen2, ...]
    detailImages: [] // OPCIONAL: Agrega imágenes detalladas aquí
  },
  {
    name: "Kit Solar Completo",
    description: "Solución integral que incluye paneles, inversor, baterías y accesorios para instalación solar residencial completa.",
    mainImages: [], // AGREGA TUS IMÁGENES AQUÍ: [imagen1, imagen2, ...]
    detailImages: [] // OPCIONAL: Agrega imágenes detalladas aquí
  }
];

const ProductSection = () => {
  return (
    <section className="py-20 bg-gradient-tech relative overflow-hidden">
      {/* Hyperspeed Background Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Hyperspeed 
          effectOptions={hyperspeedPresets.one}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="relative text-center mb-16 animate-slide-up overflow-hidden">
          {/* Content over the effect */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Nuestros </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Productos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnología, eficiencia energética y sustentabilidad fusionadas en soluciones inteligentes 
              para múltiples industrias.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <ProductCard
                name={product.name}
                description={product.description}
                mainImages={product.mainImages}
                detailImages={product.detailImages}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;