import { assets } from "../../assets/assets";

export default function Hero() {
  return (
    <div className=" bg-[#f7fcfe] hero">
      <div className="max-w-6xl mx-auto  h-[560px] flex flex-col items-center justify-center gap-5 sm:gap-10 px-6 lg:px-0">
        <h1 className="text-3xl sm:text-[64px] text-primary font-bold pt-5 mb-2.5 text-center leading-[40px] sm:leading-[64px]">
          Employee monitoring <br /> software with time tracking
        </h1>
        <p className="text-primary text-lg sm:text-xl font-normal font-primary text-center ">
          Boost your team productivity by 2x with an intelligent monitoring
          system
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:w-full max-w-4xl mx-auto gap-5">
          <div className="flex items-center gap-2 text-[#333333] font-bold text-lg font-primary ">
            <img src={assets.checkIcon} alt="icon" />
            <p>Activity Monitoring</p>
          </div>
          <div className="flex items-center gap-2 text-[#333333] font-bold text-lg font-primary ">
            <img src={assets.checkIcon} alt="icon" />
            <p>Optional Screenshots</p>
          </div>
          <div className="flex items-center gap-2 text-[#333333] font-bold text-lg font-primary ">
            <img src={assets.checkIcon} alt="icon" />
            <p>Accurate Timesheets</p>
          </div>
        </div>
        <button className="py-4 px-2.5 sm:px-8 rounded-full bg-[#4361ee] text-white font-primary max-sm:mt-10 text-sm sm:text-base">
          Start monitoring your team - it's free!
        </button>
      </div>
    </div>
  );
}
