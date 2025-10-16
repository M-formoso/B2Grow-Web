import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductImage {
  src: string;
  category: string;
}

interface Product {
  name: string;
  description: string;
  images: ProductImage[];
}

interface ProductGalleryProps {
  products: Product[];
}

const ProductGallery = ({ products }: ProductGalleryProps) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);

  const currentProduct = products[selectedProduct];
  const mainImages = currentProduct.images.filter(img => img.category === "Principal");
  const detailImages = currentProduct.images.filter(img => img.category === "Detalle");

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % mainImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + mainImages.length) % mainImages.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Product Selector */}
      <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setSelectedProduct(index);
              setSelectedImage(0);
            }}
            className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedProduct === index
                ? "bg-primary text-primary-foreground shadow-glow scale-105"
                : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card hover:scale-105"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {product.name}
          </motion.button>
        ))}
      </div>

      {/* Main Layout - Fixed Left, Scrollable Right */}
      <div className="grid lg:grid-cols-2 gap-6 items-start min-h-[85vh]">
        {/* LEFT SIDE - FIXED */}
        <div className="lg:sticky lg:top-24 space-y-4 h-full flex flex-col">
          {/* Product Info */}
          <motion.div
            key={`info-${selectedProduct}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 mb-4"
          >
            <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {currentProduct.name}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {currentProduct.description}
            </p>
          </motion.div>

          {/* Main Image Display */}
          <motion.div
            key={selectedProduct}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border shadow-elegant group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={mainImages[selectedImage]?.src}
                alt={`${currentProduct.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-contain cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setFullscreenImage(selectedImage)}
              />
            </AnimatePresence>

            {/* Zoom Icon */}
            <motion.button
              onClick={() => setFullscreenImage(selectedImage)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>

            {/* Navigation Arrows */}
            {mainImages.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {selectedImage + 1} / {mainImages.length}
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {mainImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? "border-primary shadow-glow scale-105"
                    : "border-border hover:border-primary/50 hover:scale-105"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>

          {/* Category Buttons */}
          <div className="flex gap-2 pt-2">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Principal
            </span>
            {detailImages.length > 0 && (
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                {detailImages.length} Imágenes Detalladas
              </span>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - SCROLLABLE DETAIL IMAGES */}
        <motion.div
          key={`details-${selectedProduct}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 h-full flex flex-col"
        >
          <h4 className="text-xl font-bold text-foreground mb-4">
            Imágenes Detalladas
          </h4>
          
          {detailImages.length > 0 ? (
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {detailImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden bg-card border border-border shadow-md hover:shadow-glow transition-all duration-300 group cursor-pointer"
                  onClick={() => setFullscreenImage(mainImages.length + index)}
                >
                  <img
                    src={image.src}
                    alt={`${currentProduct.name} - Detail ${index + 1}`}
                    className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay imágenes detalladas disponibles
            </div>
          )}
        </motion.div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreenImage !== null} onOpenChange={(open) => !open && setFullscreenImage(null)}>
        <DialogContent className="max-w-full h-screen p-0 bg-background/95 backdrop-blur-sm border-0">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Fullscreen Image */}
            <AnimatePresence mode="wait">
              {fullscreenImage !== null && (
                <motion.img
                  key={fullscreenImage}
                  src={currentProduct.images[fullscreenImage]?.src}
                  alt={`${currentProduct.name} - Fullscreen ${fullscreenImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Navigation in fullscreen */}
            {currentProduct.images.length > 1 && fullscreenImage !== null && (
              <>
                <button
                  onClick={() => setFullscreenImage((fullscreenImage - 1 + currentProduct.images.length) % currentProduct.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-4 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => setFullscreenImage((fullscreenImage + 1) % currentProduct.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-4 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Counter in fullscreen */}
            {fullscreenImage !== null && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                {fullscreenImage + 1} / {currentProduct.images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductGallery;
