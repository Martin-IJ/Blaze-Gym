"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

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
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[calc(100vh-85px)] lg:h-[calc(100vh-100px)]"
      onMouseEnter={() => plugin.current?.stop()}
      onMouseLeave={() => plugin.current?.reset()}
    >
      <div className="absolute z-40 w-full h-full flex justify-center items-center text-white">
        <div className="max-w-[600px] w-full px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Transform Your Body, Transform Your Life
          </h1>
          <p className="text-sm md:text-base my-5">
            Achieve your fitness goals with expert coaching, top-tier equipment,
            and a supportive community. Start your journey today!
          </p>
          <Button className="py-5 px-10">Join Now</Button>
        </div>
      </div>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative w-full h-[calc(100vh-85px)] lg:h-[calc(100vh-100px)]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
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
  );
}
