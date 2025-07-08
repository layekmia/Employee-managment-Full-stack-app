import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { assets } from "../assets/assets";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isNavToggle, setIsNavToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <nav className="flex items-center justify-between max-w mx-auto h-20 bg-white px-5 relative z-10">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="" />
          <h2 className="text-primary text-[25px] font-semibold font-primary">
            WorkSync
          </h2>
        </div>
        <div className="items-center gap-1 font-primary font-semibold text-base hidden sm:flex">
          <button className="py-[15px] px-[20px]">Login</button>
          <button onClick={() => navigate('/register')} className="py-4 px-8 rounded-full bg-[#4361ee] text-white">
            Sign Up
          </button>
        </div>
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsNavToggle(!isNavToggle)}
        >
          <HiMiniBars3BottomRight />
        </button>
      </nav>
      <MobileNav isNavToggle={isNavToggle}  setIsNavToggle={setIsNavToggle}/>
    </header>
  );
}
