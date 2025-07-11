import { useEffect } from "react";
import { services } from "../../utils/helper";
import "aos/dist/aos.css";
import AOS from "aos";

export default function PlatformFeatures() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-[#f9f9f9] py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-secondary mb-3 pt-8 text-[#222222]">
          PLATFORM FEATURES
        </h2>
        <p className="text-[#222222] font-secondary text-lg mb-8 ">
          Everything you need to create a high-performance culture
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((feature, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white text-left p-6 rounded-sm hover:shadow-lg transition-shadow duration-500 flex flex-col items-start"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="object-cover w-[60px] h-[60px]"
              />
              <h3 className="font-semibold text-2xl my-3">{feature.title}</h3>
              <p className="text-gray-500 text-base mb-4 flex-grow">
                {feature.description}
              </p>
              <button className="text-blue-600 text-sm font-medium hover:underline mt-auto">
                Explore more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
