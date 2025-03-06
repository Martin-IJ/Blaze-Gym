import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const PricingPlanCTA = () => {
  return (
    <div
      className="relative isolate py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(/images/memberImg.JPG)` }}
    >
      <div className="max-w-5xl mx-auto text-center text-white">
        <h3 className="text-4xl font-bold mb-6">
          Discover Our Premium Membership
        </h3>
        <p className="text-lg mb-12">
          Check out our flexible membership options and discover what works best
          for you. Hit the link below to see the prices and get started today!
        </p>
        <Link href="/membership-plan">
          <Button className="text-lg py-7 px-7 text-white">
            Become a Member
          </Button>
        </Link>
      </div>
      <div className="absolute -z-10 inset-0 bg-black/60"></div>
    </div>
  );
};

export default PricingPlanCTA;
