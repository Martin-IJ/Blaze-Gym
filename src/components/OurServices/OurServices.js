"use client";

import Image from "next/image";
import { FaDumbbell, FaRunning, FaUserAlt } from "react-icons/fa";

export default function OurServices() {
  const services = [
    {
      icon: <FaDumbbell className="text-4xl text-blue-500" />,
      title: "Strength Training",
      image: "/images/simg1.jpg",
      description:
        "Build muscle, tone your body, and increase strength with our professional guidance.",
    },
    {
      icon: <FaRunning className="text-4xl text-green-500" />,
      title: "Cardio Workouts",
      image: "/images/simg2.jpg",
      description:
        "Boost your stamina with intense, heart-pumping cardio sessions.",
    },
    {
      icon: <FaUserAlt className="text-4xl text-yellow-500" />,
      title: "Personal Training",
      image: "/images/simg3.jpg",
      description:
        "Work one-on-one with our certified trainers for personalized fitness plans.",
    },
  ];

  return (
    <section className="bg-gray-800 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <p className="text-lg text-gray-300 mb-12">
          We offer a variety of services tailored to your fitness goals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
              <Image
                alt={service.title}
                className="object-cover object-center transition-all duration-500"
                fill
                src={service.image}
              />
              </div>
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
