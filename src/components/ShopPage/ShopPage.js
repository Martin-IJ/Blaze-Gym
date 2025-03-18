"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch products.");
        }
      } catch (error) {
        // toast.error(
        //   error.message || "An error occurred while fetching products."
        // );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Our Products</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products available.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/shop/product/${product.id}`} key={product.id}>
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
                  <Button className="px-2 text-white">Shop Product</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
