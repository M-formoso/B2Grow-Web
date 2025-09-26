import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;