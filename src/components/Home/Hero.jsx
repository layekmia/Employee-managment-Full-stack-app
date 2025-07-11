import { assets } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className=" bg-[#f7fcfe] hero">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className=" rounded-b-lg overflow-hidden"
      >
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 md:p-10 h-[calc(100vh-80px)] sm:max-h-[527px]">
            <div>
              <h2 className="text-[25px] md:text-5xl font-bold mb-4 font-primary">
                The All-in-One Employee Management Platform
              </h2>
              <p className="mb-6 font-primary">
                Manage Payroll, Tasks & Performance—All in One Place.
              </p>
              <button
                className="px-6 py-3 bg-white text-blue-600 rounded font-semibold hover:bg-gray-100"
                onClick={() => navigate("/auth/register")}
              >
                Get Started
              </button>
            </div>
            <img
              src={assets.dashboard}
              alt="App Screenshot"
              className="rounded-lg  sm:h-[300px] md:h-[400px] object-cover inline-block mx-auto"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gradient-to-r from-green-500 to-teal-600 text-white p-5 md:p-10 h-[calc(100vh-80px)] sm:max-h-[527px]">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Trusted by 100+ Companies Worldwide
              </h2>
              <p className="mb-6">
                From startups to enterprises, our platform powers employee
                management across industries.
              </p>
              <button className="px-6 py-3 bg-white text-green-600 rounded font-semibold hover:bg-gray-100">
                See How They Succeed
              </button>
            </div>
            <div className="flex flex-col">
              <img
                src={assets.meeting2}
                alt="Company 1"
                className="h-[150px] sm:h-[220px] ml-20 object-contain"
              />
              <img
                src={assets.meeting1}
                alt="Company 2"
                className=" h-[150px] sm:h-[220px] object-contain -mt-5"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white p-10 h-[calc(100vh-80px)] sm:max-h-[527px]">
            <div>
              <h2 className="text-[25px] md:text-5xl font-bold mb-4">
                Simplify HR Workflows. Save Hours Every Day.
              </h2>
              <ul className="list-disc ml-5 mb-6 space-y-2">
                <li>Secure Payroll Processing</li>
                <li>Real-Time Performance Analytics</li>
                <li>Seamless Team Collaboration</li>
                <li>Role-based Access Control</li>
              </ul>
              <button className="px-6 py-3 bg-white text-pink-600 rounded font-semibold hover:bg-gray-100">
                Start Free Trial
              </button>
            </div>
            <img
              src={assets.collaboration}
              alt="Team Collaboration"
              className="rounded-lg shadow-lg max-md:h-[200px] max-md:mx-auto"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
