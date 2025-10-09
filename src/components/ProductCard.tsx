import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  mainImages: string[];
  detailImages?: string[];
}

const ProductCard = ({ name, description, mainImages, detailImages }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const displayImages = showDetails && detailImages ? detailImages : mainImages;
  const totalImages = displayImages.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-elegant hover:shadow-glow transition-all duration-300"
    >
      {/* Main Image Display */}
      <div className="relative aspect-square bg-muted overflow-hidden">
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
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {name}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === index
                  ? "border-primary shadow-glow"
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
            }}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-3 rounded-lg transition-colors"
          >
            {showDetails ? "Ver imágenes principales" : "Ver imágenes detalladas"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
