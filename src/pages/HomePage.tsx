import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { ServicesSection } from "../components/Service";
import { FeaturedSection } from "../components/FeaturedSection";
import { Contact } from "../components/contact/Contact";
import { Map } from "../components/Map";
import { StickyWrapper } from "../components/ui/StickyWrapper";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.state]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <StickyWrapper id="hero">
        <Hero />
      </StickyWrapper>

      <StickyWrapper id="services">
        <ServicesSection />
      </StickyWrapper>

      <StickyWrapper id="about">
        <FeaturedSection />
      </StickyWrapper>

      <StickyWrapper id="contact">
        <Contact />
      </StickyWrapper>

      <Map />
      <Footer />
    </main>
  );
}
