import { HeroSection } from "@/components/HeroSection/HeroSection";
import Map from "@/components/Map/Map";
import OurServices from "@/components/OurServices/OurServices";
import PricingPlans from "@/components/PricingPlans/PricingPlans";
import Why from "@/components/Why/Why";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Why />
      <OurServices />
      <PricingPlans />
      <Map />
    </>
  );
}
