"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Our Products</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="border rounded-2xl shadow-md overflow-hidden cursor-pointer">
              <div className="relative w-full h-52 overflow-hidden group">
                <Image
                  fill
                  alt={product.name}
                  src={product.image}
                  className="scale-animation object-contain md:object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  style={{ backgroundImage: `url(${product.image})` }}
                  className="absolute object-cover object-center blur-2xl -z-10 inset-0 bg-black/50 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="p-4 gap-1 flex items-center justify-between">
                <h2 className="font-semibold truncate overflow-hidden whitespace-nowrap">
                  {product.name}
                </h2>
                <Button className="px-2 text-white">
                  <Link href={`/product/${product.id}`} key={product.id}>
                    View Product
                  </Link>
                </Button>
                {/* <p className="text-gray-600 text-sm dark:text-gray-300">
                {product.description}
              </p> */}
                {/* <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  N{product.price}
                </span>
                <Button className="px-4 py-2 text-white">Add to Cart</Button>
              </div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
