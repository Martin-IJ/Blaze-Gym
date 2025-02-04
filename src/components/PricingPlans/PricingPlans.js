"use client"

export default function PricingPlans() {
  const plans = [
    {
      title: "Basic Plan",
      price: "$29/month",
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
      title: "Premium Plan",
      price: "$59/month",
      description: "Everything in Basic plus group classes and personal training.",
      features: [
        "Access to gym facilities",
        "Cardio + strength equipment",
        "Group classes",
        "One personal training session/month",
        "Priority booking",
      ],
      isPopular: true, // Highlight this plan
    },
    {
      title: "VIP Plan",
      price: "$99/month",
      description: "All-access plus exclusive perks like 24/7 access and wellness treatments.",
      features: [
        "24/7 gym access",
        "Full access to all equipment",
        "Group classes + personal training",
        "Monthly wellness treatments",
        "Free guest pass",
      ],
      isPopular: false,
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
        <p className="text-lg text-gray-300 mb-12">
          Choose a plan that fits your fitness journey. No hidden fees, just results.
        </p>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.isPopular ? "border-4 border-yellow-500" : "border-2"
              } p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-xl text-gray-400 mb-4">{plan.description}</p>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>

              <ul className="text-gray-400 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">{feature}</li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#signup"
                className={`${
                  plan.isPopular ? "bg-yellow-500" : "bg-blue-600"
                } text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300`}
              >
                {plan.isPopular ? "Best Value - Join Now" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
