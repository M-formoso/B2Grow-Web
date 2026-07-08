import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";

const Multiselect = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProductSection initialModule="multiselect" lockModule />
      <Footer />
    </div>
  );
};

export default Multiselect;
