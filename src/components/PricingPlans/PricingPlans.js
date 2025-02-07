"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoCheckboxOutline } from "react-icons/io5";

export default function PricingPlans() {
  const plans = [
    {
      title: "Monthly Plan",
      price: "50,000",
      description: "Access to gym + cardio equipment.",
      features: [
        "Access to gym facilities",
        "Cardio machines",
        "Locker room access",
        "Free Wi-Fi",
      ],
      isPopular: false,
    },
    {
      title: "Quarterly Plan",
      price: "100,000",
      description:
        "Everything in Basic plus group classes and personal training.",
      features: [
        "Access to gym facilities",
        "Cardio + strength equipment",
        "Group classes",
        "One personal training session",
        "Priority booking",
      ],
      isPopular: true,
    },
    {
      title: "Yearly Plan",
      price: "200,000",
      description:
        "All-access plus exclusive perks like 24/7 access and wellness treatments.",
      features: [
        "24/7 gym access",
        "Full access to all equipment",
        "Group classes + personal training",
        "Monthly wellness treatments",
        "Free guest pass",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
        <p className="text-lg text-gray-500 mb-12">
          Choose a plan that fits your fitness journey. No hidden fees, just
          results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`${
                plan.isPopular
                  ? "border-2 border-tertiary-dark"
                  : "border border-gray-500"
              } max-w-[350px] w-full min-h-[500px] h-full mx-auto text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}
            >
              <CardHeader className="text-center space-y-3">
                <CardTitle
                  className={`${
                    plan.isPopular ? "text-tertiary-dark" : "text-primary"
                  } text-2xl font-semibold`}
                >
                  {plan.title}
                </CardTitle>
                <p className="">{plan.description}</p>
                <p
                  className={`${
                    plan.isPopular ? "text-tertiary-dark" : "text-primary"
                  } text-4xl font-bold`}
                >
                  N{plan.price}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="text-start mb-4 md:mb-2 divide-y">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 py-3">
                      <IoCheckboxOutline /> {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <div className="mt-auto p-6">
                <Button
                  className={`w-full py-6 shadow-lg ${
                    plan.isPopular
                      ? "bg-tertiary-dark hover:bg-tertiary-dark/90 text-white"
                      : "text-white"
                  }`}
                >
                  {plan.isPopular ? "Best Value - Join Now" : "Sign Up"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
