import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* ELIMINADO pt-20 para que los banners empiecen desde arriba */}
      <ProductSection />
      <Footer />
    </div>
  );
};

export default Products;