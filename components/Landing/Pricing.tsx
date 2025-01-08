import React from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our platform",
    features: [
      "Generate 3 courses per month",
      "Basic AI course generation",
      "Access to community",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for individual learners and creators",
    features: [
      "Unlimited course generation",
      "Advanced AI customization",
      "Priority support",
      "Custom learning paths",
      "Progress tracking",
      "Downloadable resources",
    ],
    buttonText: "Start Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations and teams",
    features: [
      "Everything in Pro",
      "Custom AI model training",
      "Team collaboration",
      "Advanced analytics",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

function Pricing() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-3">
          <h1 className="text-4xl font-semibold animate-fade-in">Pricing</h1>
          <p className="text-3xl font-bold tracking-tight bg-clip-text sm:text-4xl">
            Choose the right plan for you
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Simple, transparent pricing that grows with you. Try any plan free
            for 14 days.
          </p>
        </div>

        <div className="isolate mx-auto mt-12 grid max-w-md grid-cols-1 gap-y-8 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                tier.popular
                  ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl ring-1 ring-gray-900"
                  : "bg-white text-gray-900 shadow-lg hover:shadow-xl ring-1 ring-gray-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 px-3 py-1 text-center text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold leading-8">{tier.name}</h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  tier.popular ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-5xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.name !== "Enterprise" && (
                  <span
                    className={`text-lg ${
                      tier.popular ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    /month
                  </span>
                )}
              </p>
              <button
                className={`mt-8 w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                    ? "bg-white text-gray-900 hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                    : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-[0_4px_20px_rgba(79,70,229,0.25)]"
                }`}
              >
                {tier.buttonText}
              </button>
              <ul className="mt-10 space-y-4 text-sm leading-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-x-3">
                    <Check
                      className={`h-5 w-5 flex-none ${
                        tier.popular ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    <span
                      className={
                        tier.popular ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
