import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductCardProps {
  name: string;
  description: string;
  mainImages: string[];
  detailImages?: string[];
}

const ProductCard = ({ name, description, mainImages, detailImages }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number | null>(null);
  
  const displayImages = showDetails && detailImages ? detailImages : mainImages;
  const totalImages = displayImages.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const nextFullscreenImage = () => {
    if (fullscreenImageIndex !== null && detailImages) {
      setFullscreenImageIndex((prev) => prev !== null ? (prev + 1) % detailImages.length : 0);
    }
  };

  const previousFullscreenImage = () => {
    if (fullscreenImageIndex !== null && detailImages) {
      setFullscreenImageIndex((prev) => prev !== null ? (prev - 1 + detailImages.length) % detailImages.length : 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-elegant hover:shadow-glow transition-all duration-300 group relative"
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      {/* Main Image Display */}
      <div className="relative aspect-square bg-muted overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={displayImages[currentImageIndex]}
            alt={`${name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {totalImages}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">
            {name}
          </h3>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{description}</p>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                currentImageIndex === index
                  ? "border-primary shadow-glow scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Toggle Details Button */}
        {detailImages && detailImages.length > 0 && (
          <button
            onClick={() => {
              setShowDetails(!showDetails);
              setCurrentImageIndex(0);
              setFullscreenImageIndex(0);
            }}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
          >
            {showDetails ? "Ver imágenes principales" : "Ver imágenes detalladas"}
          </button>
        )}
      </div>

      {/* Fullscreen Dialog for Detail Images */}
      <Dialog open={fullscreenImageIndex !== null} onOpenChange={(open) => !open && setFullscreenImageIndex(null)}>
        <DialogContent className="max-w-full h-screen p-0 bg-background/95 backdrop-blur-sm border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setFullscreenImageIndex(null)}
              className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {detailImages && detailImages.length > 1 && (
              <>
                <button
                  onClick={previousFullscreenImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextFullscreenImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {detailImages && fullscreenImageIndex !== null && (
              <div className="absolute bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-lg">
                {fullscreenImageIndex + 1} / {detailImages.length}
              </div>
            )}

            {/* Full Image Display */}
            <AnimatePresence mode="wait">
              {fullscreenImageIndex !== null && detailImages && (
                <motion.img
                  key={fullscreenImageIndex}
                  src={detailImages[fullscreenImageIndex]}
                  alt={`${name} - Detailed Image ${fullscreenImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProductCard;
