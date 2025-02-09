"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const images = [
  { id: 1, src: "/images/simg1.jpg", alt: "Image 1" },
  { id: 2, src: "/images/simg2.jpg", alt: "Image 2" },
  { id: 3, src: "/images/simg3.jpg", alt: "Image 3" },
  { id: 4, src: "/images/simg1.jpg", alt: "Image 4" },
  { id: 5, src: "/images/simg2.jpg", alt: "Image 5" },
  { id: 6, src: "/images/simg3.jpg", alt: "Image 6" },
  { id: 7, src: "/images/simg1.jpg", alt: "Image 7" },
  { id: 8, src: "/images/simg2.jpg", alt: "Image 8" },
  { id: 9, src: "/images/simg3.jpg", alt: "Image 9" },
  { id: 10, src: "/images/simg1.jpg", alt: "Image 10" },
];

export default function GalleryCTA() {
  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide shadow-inner">
      <Link href="/gallery">
        <motion.div
          className="flex w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {images.map((image) => (
            <div key={image.id} className="flex-none w-60 h-40 relative">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </Link>
    </div>
  );
}
