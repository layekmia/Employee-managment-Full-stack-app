import { div } from "framer-motion/client";
import Hero from "../components/Home/Hero";
import PlatformFeatures from "../components/Home/Services";
import Features from "../components/Home/Features";
import LogosSlider from "../components/Home/Companies";

export default function Home() {
  return (
    <div>
      <Hero/>
      <PlatformFeatures/>
      <Features/>
      <LogosSlider/>
    </div>
  );
}