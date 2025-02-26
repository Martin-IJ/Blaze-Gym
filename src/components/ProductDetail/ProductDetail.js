"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Gym Glove",
    description: "Classic 35mm film camera for photography enthusiasts.",
    price: "15,000",
    image: "/images/gymglove.jpg",
  },
  {
    id: 2,
    name: "Protein",
    description: "High-quality sound with a sleek, modern design.",
    price: "8,000",
    image: "/images/gymProtein.jpg",
  },
  {
    id: 3,
    name: "Hand Strap",
    description: "Reusable bottle made from sustainable materials.",
    price: "25,000",
    image: "/images/gymstrap.png",
  },
  {
    id: 4,
    name: "Protein",
    description: "High-quality sound with a sleek, modern design.",
    price: "8,000",
    image: "/images/gymProtein.jpg",
  },
  {
    id: 5,
    name: "Hand Strap",
    description: "Reusable bottle made from sustainable materials.",
    price: "25,000",
    image: "/images/gymstrap.png",
  },
  {
    id: 6,
    name: "Gym Glove",
    description: "Classic 35mm film camera for photography enthusiasts.",
    price: "15,000",
    image: "/images/gymglove.jpg",
  },
  {
    id: 7,
    name: "Hand Strap",
    description: "Reusable bottle made from sustainable materials.",
    price: "25,000",
    image: "/images/gymstrap.png",
  },
  {
    id: 8,
    name: "Gym Glove",
    description: "Classic 35mm film camera for photography enthusiasts.",
    price: "15,000",
    image: "/images/gymglove.jpg",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto md:flex items-center gap-8 space-y-8 md:space-y-0">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={400}
          className="rounded-2xl shadow-md object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary mb-4">
            N{product.price}
          </p>

          <Button className="px-6 py-3 text-white">
            <FaPhoneAlt />
            Call to Order
          </Button>
        </div>
      </div>
    </div>
  );
}
