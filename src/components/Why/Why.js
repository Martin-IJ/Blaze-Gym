const Why = () => {
  const features = [
    {
      icon: "💪",
      title: "Expert Trainers",
      description: "Certified professionals to guide and motivate you.",
    },
    {
      icon: "🏋️",
      title: "Top-Notch Equipment",
      description: "State-of-the-art machines and free weights.",
    },
    {
      icon: "🔥",
      title: "Results-Driven Programs",
      description: "Personalized workouts tailored to your goals.",
    },
    {
      icon: "⏰",
      title: "Flexible Hours",
      description: "24/7 access to fit your busy schedule.",
    },
    {
      icon: "🤝",
      title: "Supportive Community",
      description: "Train with like-minded people who push you forward.",
    },
    {
      icon: "💰",
      title: "Affordable Plans",
      description: "Memberships designed to fit any budget.",
    },
  ];
  return (
    <div>
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-300 mb-10">
            We provide the best training experience to help you reach your
            fitness goals.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:bg-gray-700 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Why;
