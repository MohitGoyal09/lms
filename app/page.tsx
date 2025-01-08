"use client";
import ScrollProgress from "@/components/ui/scroll-progress";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import CTASection from "@/components/Landing/CTASection";
import Navbar from "@/components/Landing/Navbar";
import Testnomial from "@/components/Landing/Testnomial";
import Pricing from "@/components/Landing/Pricing";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollProgress className="top-[65px]" />
      <div className="container mx-auto px-4  pt-28">
        <HeroSection />
        <FeaturesSection />
        <Testnomial />
        <Pricing />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
