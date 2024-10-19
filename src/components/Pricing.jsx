"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("monthly");
  const plans = {
    monthly: [
      {
        name: "Starter",
        price: "29",
        features: [
          "Basic Analytics",
          "5 Team Members",
          "1,000 Monthly Views",
          "Email Support",
        ],
      },
      {
        name: "Professional",
        price: "99",
        features: [
          "Advanced Analytics",
          "15 Team Members",
          "50,000 Monthly Views",
          "Priority Support",
          "Custom Reports",
        ],
      },
      {
        name: "Enterprise",
        price: "299",
        features: [
          "Full Analytics Suite",
          "Unlimited Team Members",
          "Unlimited Views",
          "24/7 Support",
          "Custom Integration",
          "Dedicated Manager",
        ],
      },
    ],
    yearly: [
      {
        name: "Starter",
        price: "24",
        features: [
          "Basic Analytics",
          "5 Team Members",
          "1,000 Monthly Views",
          "Email Support",
        ],
      },
      {
        name: "Professional",
        price: "79",
        features: [
          "Advanced Analytics",
          "15 Team Members",
          "50,000 Monthly Views",
          "Priority Support",
          "Custom Reports",
        ],
      },
      {
        name: "Enterprise",
        price: "249",
        features: [
          "Full Analytics Suite",
          "Unlimited Team Members",
          "Unlimited Views",
          "24/7 Support",
          "Custom Integration",
          "Dedicated Manager",
        ],
      },
    ],
  };

  return (
    <div>
      {" "}
      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            Transparent Pricing
          </h2>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 rounded-md ${
                  activePlan === "monthly" ? "bg-white shadow-sm" : ""
                }`}
                onClick={() => setActivePlan("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activePlan === "yearly" ? "bg-white shadow-sm" : ""
                }`}
                onClick={() => setActivePlan("yearly")}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans[activePlan].map((plan, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  index === 1 ? "border-blue-500 border-2" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Get Started
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
