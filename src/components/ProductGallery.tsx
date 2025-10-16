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
  const totalImages = currentProduct.images.length;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % totalImages);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const nextFullscreenImage = () => {
    if (fullscreenImage !== null) {
      setFullscreenImage((prev) => prev !== null ? (prev + 1) % totalImages : 0);
    }
  };

  const previousFullscreenImage = () => {
    if (fullscreenImage !== null) {
      setFullscreenImage((prev) => prev !== null ? (prev - 1 + totalImages) % totalImages : 0);
    }
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

      {/* Main Gallery Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Large Image Display */}
        <motion.div
          key={selectedProduct}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border shadow-elegant group"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={currentProduct.images[selectedImage]?.src}
              alt={`${currentProduct.name} - Image ${selectedImage + 1}`}
              className="w-full h-full object-contain cursor-zoom-in"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
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
          {totalImages > 1 && (
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
            {selectedImage + 1} / {totalImages}
          </div>
        </motion.div>

        {/* Product Info & Thumbnail Grid */}
        <motion.div
          key={`info-${selectedProduct}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {currentProduct.name}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentProduct.description}
            </p>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {currentProduct.images.map((image, index) => (
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

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(currentProduct.images.map(img => img.category))).map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreenImage !== null} onOpenChange={(open) => !open && setFullscreenImage(null)}>
        <DialogContent className="max-w-full h-screen p-0 bg-background/95 backdrop-blur-sm border-0">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Navigation Arrows */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={previousFullscreenImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-4 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextFullscreenImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-4 rounded-full hover:bg-background transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {fullscreenImage !== null && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                {fullscreenImage + 1} / {totalImages}
              </div>
            )}

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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductGallery;
