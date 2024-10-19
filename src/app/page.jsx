import Welcome from "@/components/herosection";
import React from "react";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="text-slate-400 min-h-screen flex  flex-col justify-center  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Welcome />
        {/* Stats Section */}
        <Stats />
        {/* Testimonial Section */}
        <Testimonials />
        {/* Pricing Section */}
        <Pricing />
        {/* Enhanced Footer */}
        <Cta />
      </div>
      <Footer />
    </>
  );
};

export default Home;
