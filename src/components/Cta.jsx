import React from "react";

const Cta = () => {
  return (
    <section className="py-16 mb-3 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to transform your business with data?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Start your free 14-day trial today. No credit card required.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors duration-300">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default Cta;
