"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoCheckboxOutline } from "react-icons/io5";
import BankDetails from "../BankDetails/BankDetails";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function PricingPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const bankDetailsRef = useRef(null);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/plans/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setPlans(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch membership plans.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching membership plans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipPlans();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleScrollToBankDetails = () => {
    if (bankDetailsRef.current) {
      bankDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Membership <br /> Packages
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Choose a plan that fits your fitness journey. No hidden fees, just
          results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="border rounded-2xl shadow-md overflow-hidden"
                >
                  <CardHeader className="text-center space-y-3">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                    <Skeleton className="h-10 w-1/3 mx-auto" />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="text-start mb-4 md:mb-2 divide-y">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <li key={idx} className="flex items-center gap-2 py-3">
                          <Skeleton className="h-6 w-full" />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="mt-auto p-6">
                    <Skeleton className="h-12 w-full" />
                  </div>
                </Card>
              ))
            : plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`${
                    index === 1
                      ? "border-2 border-tertiary-dark"
                      : "border border-gray-500"
                  } max-w-[350px] w-full min-h-[500px] h-full mx-auto text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}
                >
                  <CardHeader className="text-center space-y-3">
                    <CardTitle
                      className={`${
                        index === 1 ? "text-tertiary-dark" : "text-primary"
                      } text-2xl font-semibold`}
                    >
                      {plan.name}
                    </CardTitle>
                    <p className="">{plan.description}</p>
                    <p
                      className={`${
                        index === 1 ? "text-tertiary-dark" : "text-primary"
                      } text-4xl font-bold`}
                    >
                      ₦{formatPrice(plan.price)}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <ul className="text-start mb-4 md:mb-2 divide-y">
                      {plan.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 py-3">
                          <IoCheckboxOutline /> {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <div className="mt-auto p-6">
                    <Button
                      className={`w-full py-6 shadow-lg ${
                        index === 1
                          ? "bg-tertiary-dark hover:bg-tertiary-dark/90 text-white"
                          : "text-white"
                      }`}
                      onClick={handleScrollToBankDetails}
                    >
                      {index === 1 ? "Best Value - Join Now" : "Sign Up"}
                    </Button>
                  </div>
                </Card>
              ))}
        </div>
      </div>

      {/* Bank Details */}
      <section ref={bankDetailsRef}>
        <BankDetails />
      </section>
    </section>
  );
}