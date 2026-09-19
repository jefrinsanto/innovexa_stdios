import Header from "./components/Header";
import Hero from "./components/Hero";
import FirstScrollStatement from "./components/FirstScrollStatement";
import FeaturedWork from "./components/FeaturedWork";
import ServicesPreview from "./components/ServicesPreview";
import Trust from "./components/Trust";
import Founder from "./components/Founder";
import FinalCTA from "./components/FinalCTA";
import Connect from "./components/Connect";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-base font-body text-white">
      <Header />
      <main>
        <Hero />
        <FirstScrollStatement />
        <FeaturedWork />
        <ServicesPreview />
        <Trust />
        <Founder />
        <FinalCTA />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
