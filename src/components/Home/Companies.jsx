import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "../../assets/assets";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function LogosSlider() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4"  data-aos='fade-up'
          data-aos-delay={100}>
      <h2 className="mb-5 font-secondary text-2xl text-[#141a3e] text-center font-bold">
        Discover why global clients trust RapidHR software. Join us today!
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        slidesPerGroup={2} // Slide 2 logos at a time
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        speed={800}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-24">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="max-h-16 object-contain transition"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
