"use client";

import Image from "next/image";
import { FaDumbbell, FaRunning, FaUserAlt } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function OurServices() {
  const services = [
    {
      icon: <FaDumbbell className="text-4xl text-blue-500" />,
      title: "Strength Training",
      image: "/images/DSC1.jpg",
      description:
        "Build muscle, tone your body, and increase strength with our professional guidance.",
    },
    {
      icon: <FaRunning className="text-4xl text-green-500" />,
      title: "Cardio Workouts",
      image: "/images/DSC2.jpg",
      description:
        "Boost your stamina with intense, heart-pumping cardio sessions.",
    },
    {
      icon: <FaUserAlt className="text-4xl text-yellow-500" />,
      title: "Personal Training",
      image: "/images/DSC3.jpg",
      description:
        "Work one-on-one with our certified trainers for personalized fitness plans.",
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="bg-gray-800 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <p className="text-lg text-gray-300 mb-12">
          We offer a variety of services tailored to your fitness goals.
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={ref}
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.2, duration: 0.2 }}
            >
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                <Image
                  alt={`Service: ${service.title}`}
                  className="object-cover img scale-animation object-center transition-all duration-500"
                  fill
                  src={service.image}
                />
              </div>
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
