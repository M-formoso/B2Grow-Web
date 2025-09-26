import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20">
        <ProductSection />
      </div>
      <Footer />
    </div>
  );
};

export default Products;