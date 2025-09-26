import Header from "@/components/Header";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20">
        <Calculator />
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;