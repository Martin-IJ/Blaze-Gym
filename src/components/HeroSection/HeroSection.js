"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const images = [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg",
    "/images/gym4.jpg",
    "/images/gym5.jpg",
  ];

  return (
    <section>
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[calc(100vh-85px)] lg:h-[calc(100vh-100px)]"
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.reset()}
      >
        <div className="absolute z-30 w-full h-full flex justify-center items-center text-white">
          <motion.div
            className="max-w-[600px] w-full px-4 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-lg md:text-xl mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 1 }}
            >
              Welcome to{" "}
              <span className="text-tertiary-light">Blaze Gym Fitness</span>
            </motion.p>
            <motion.h1
              className="text-3xl md:text-5xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 1 }}
            >
              Transform Your Body, Transform Your Life
            </motion.h1>
            <motion.p
              className="text-sm md:text-base my-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Achieve your fitness goals with expert coaching, top-tier
              equipment, and a supportive community. Start your journey today!
            </motion.p>
            <Link href="/membership-plan">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <Button className="py-5 px-10">Join Now</Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1 relative w-full h-[calc(100vh-85px)] lg:h-[calc(100vh-100px)]">
                <Image
                  src={src}
                  alt={`Blaze Gym equipment and facilities Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
