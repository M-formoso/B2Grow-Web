import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

const Greenside = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProductSection initialModule="greenside" lockModule />
      <Footer />
    </div>
  );
};

export default Greenside;
