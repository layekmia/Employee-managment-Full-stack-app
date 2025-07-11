import { hrSolutions } from "../../utils/helper";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function Features() {

      useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);

  return (
    <div className="py-10">
      {hrSolutions.map((item, idx) => (
        <section
          key={item.id}
          data-aos='fade-up'
          data-aos-delay={idx * 200}
          className={`py-10 ${idx % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div
            className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 gap-10 lg:gap-14
      ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-2xl md:text-3xl text-[#141a3e] font-bold mb-2 font-secondary ">
                {item.title}
              </h2>
              <p className=" text-base font-secondary mb-6 text-[#222222]">
                {item.description}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <img
                      src="https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/tick-circle-svg.svg"
                      alt=""
                    />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
