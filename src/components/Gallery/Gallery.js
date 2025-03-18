"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaTimes,
} from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok) {
          setImages(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch gallery images.");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error(
            error.message || "An error occurred while fetching gallery images."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "/images/fallback-image.png";
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const showPreviousImage = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const showNextImage = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="container min-h-[500px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Blaze Gym Fitness <span className="text-tertiary-dark">Gallery</span>
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-md overflow-hidden"
            >
              <Skeleton className="relative w-full h-52" />
            </div>
          ))
        ) : images.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No images available.
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={image.id}
              className="border rounded-2xl shadow-md overflow-hidden"
              onClick={() => handleImageClick(image, index)}
            >
              <div className="relative w-full h-52 overflow-hidden group">
                <Image
                  fill
                  alt="Gallery image"
                  src={image.image}
                  className="scale-animation object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  onError={handleImageError}
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

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 px-1 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative rounded-lg shadow-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white drop-shadow-md bg-black/20 hover:text-gray-700 rounded-full h-6 w-6 flex items-center justify-center"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl bg-white text-tertiary-dark hover:text-gray-700 rounded-full h-6 w-6 flex items-center justify-center disabled:opacity-50"
              onClick={showPreviousImage}
              disabled={currentIndex === 0}
            >
              <FaArrowAltCircleLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl bg-white text-tertiary-dark hover:text-gray-700 rounded-full h-6 w-6 flex items-center justify-center disabled:opacity-50"
              onClick={showNextImage}
              disabled={currentIndex === images.length - 1}
            >
              <FaArrowAltCircleRight />
            </button>
            <Image
              src={selectedImage.image}
              alt="Gallery image"
              width={800}
              height={600}
              className="object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
