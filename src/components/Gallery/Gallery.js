"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setImages(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch gallery images.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching gallery images."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="container min-h-[500px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Blaze Gym Fitness <span className="text-tertiary-dark">Gallery</span>
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-2xl shadow-md overflow-hidden">
              <Skeleton className="relative w-full h-52" />
            </div>
          ))
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="border rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden group">
                <Image
                  fill
                  alt={image.description || "Gallery image"}
                  src={image.image}
                  className="scale-animation object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  style={{ backgroundImage: `url(${image.image})` }}
                  className="absolute object-cover object-center blur-2xl -z-10 inset-0 bg-black/50 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              {/* <div className="p-4">
                <p className="text-sm text-gray-600">{image.description}</p>
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
