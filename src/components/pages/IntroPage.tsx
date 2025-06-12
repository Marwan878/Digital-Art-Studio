import Layout from "../shared/Layout";
import Header from "../shared/Header";
import HeroSection from "../intro/HeroSection";
import FeaturesSection from "../intro/FeaturesSection";
import ActionButtons from "../intro/ActionButtons";
import Footer from "../intro/Footer";

const IntroPage = () => {
  return (
    <Layout>
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <HeroSection />
          <FeaturesSection />
          <ActionButtons />
          <Footer />
        </div>
      </main>
    </Layout>
  );
};

export default IntroPage;
