import Image from "next/image";
import { CiDumbbell } from "react-icons/ci";
import { FaFireAlt } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { GiBiceps } from "react-icons/gi";
import { MdOutlineAccessAlarm } from "react-icons/md";

const Why = () => {
  const features = [
    {
      icon: <GiBiceps />,
      title: "Expert Trainers",
      description: "Certified professionals to guide and motivate you.",
    },
    {
      icon: <CiDumbbell />,
      title: "Top-Notch Equipment",
      description: "State-of-the-art machines and free weights.",
    },
    {
      icon: <FaFireAlt />,
      title: "Results-Driven Programs",
      description: "Personalized workouts tailored to your goals.",
    },
    {
      icon: <MdOutlineAccessAlarm />,
      title: "Flexible Hours",
      description: "24/7 access to fit your busy schedule.",
    },
    {
      icon: <FaHandshakeSimple />,
      title: "Supportive Community",
      description: "Train with like-minded people who push you forward.",
    },
    {
      icon: <FaSackDollar />,
      title: "Affordable Plans",
      description: "Memberships designed to fit any budget.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute w-full h-full -right-3/4 top-0 -z-50 flex justify-start items-end overflow-hidden">
        <Image
          alt="Weight lifting equipment"
          height={1000}
          width={1000}
          src="/images/weight.png"
          className="object-contain opacity-5 overflow-hidden"
        />
      </div>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-500 mb-10">
            We provide the best training experience to help you reach your fitness goals.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <article
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center transition-all duration-300"
              >
                <div className="flex justify-center text-tertiary-dark text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl text-primary font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mt-2">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Why;