import Header from "@/components/Header";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-end pt-20">
        <Calculator />
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;