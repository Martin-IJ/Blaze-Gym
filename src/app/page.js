import GalleryCTA from "@/components/GalleryCTA/GalleryCTA";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import Map from "@/components/Map/Map";
import OurServices from "@/components/OurServices/OurServices";
import PricingPlanCTA from "@/components/PricingPlanCTA/PricingPlanCTA";
import Why from "@/components/Why/Why";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Why />
      <GalleryCTA />
      <OurServices />
      <PricingPlanCTA />
      <Map />
    </>
  );
}
