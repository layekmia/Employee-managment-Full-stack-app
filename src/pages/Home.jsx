import { div } from "framer-motion/client";
import Hero from "../components/Home/Hero";
import PlatformFeatures from "../components/Home/Services";
import Features from "../components/Home/Features";
import LogosSlider from "../components/Home/Companies";
import TestimonialSlider from "../components/Home/TestimonialSlider";

export default function Home() {
  return (
    <div>
      <Hero/>
      <PlatformFeatures/>
      <Features/>
      <LogosSlider/>
      <TestimonialSlider/>
    </div>
  );
}