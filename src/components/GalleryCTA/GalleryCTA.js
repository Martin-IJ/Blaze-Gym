"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function GalleryCTA() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setImages(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch gallery images.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while fetching gallery images.");
      }
    };

    fetchGalleryImages();
  }, []);

  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative group overflow-x-auto whitespace-nowrap scrollbar-hide shadow-inner">
      <Link href="/gallery">
        <div className="absolute group-hover:flex hidden z-10 justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm">
          <p className="text-3xl text-white font-semibold">View Full Gallery</p>
        </div>
      </Link>
      <motion.div
        className="flex w-max"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="flex-none w-60 h-40 relative">
            <Image
              src={image.image}
              alt={image.description || "Gallery image"}
              layout="fill"
              objectFit="cover"
              className="shadow-md"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
