"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProduct(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch product.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCallToOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContact(data.data);
        window.location.href = `tel:${data.data.phone_number}`;
      } else {
        throw new Error(data.message || "Failed to fetch contact details.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching contact details."
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto md:flex items-center gap-8 space-y-8 md:space-y-0">
          <Skeleton className="w-full h-96 rounded-2xl" />
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-6" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(product.price);

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
            {formattedPrice}
          </p>

          <Button className="px-6 py-3 text-white" onClick={handleCallToOrder}>
            <FaPhoneAlt />
            Call to Order
          </Button>
        </div>
      </div>
    </div>
  );
}
