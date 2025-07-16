import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { testimonials } from "../../utils/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function renderStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  for (let i = 0; i < full; i++) {
    stars.push(<FaStar key={i} className="text-orange-500" />);
  }
  if (half) {
    stars.push(<FaStarHalfAlt key="half" className="text-orange-500" />);
  }
  while (stars.length < 5) {
    stars.push(
      <FaRegStar key={"empty" + stars.length} className="text-orange-500" />
    );
  }
  return <div className="flex mt-3">{stars}</div>;
}

export default function TestimonialSlider() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className="bg-white py-12 px-4" data-aos='fade-up'
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold font-secondary text-[#141a3e]">
          Wall of love
        </h2>
        <p className="text-[#707070] font-secondary text-lg">
          People love RapidHR! Here is what some of our users have to say.
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="max-w-7xl mx-auto h-[250px]"
      >
        {testimonials.map((user, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition h-[180px]">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm font-secondary">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-secondary">
                    {user.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-[11px]">{user.text}</p>
              {renderStars(user.rating)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
