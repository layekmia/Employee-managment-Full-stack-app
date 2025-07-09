import { HiMiniBars3BottomRight } from "react-icons/hi2";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
  const [isNavToggle, setIsNavToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <nav className="flex items-center justify-between max-w mx-auto h-20 bg-white px-5 relative z-10">
        <Logo />
        <div className="items-center gap-1 font-primary font-semibold text-base hidden sm:flex">
          <button
            onClick={() => navigate("/auth/login")}
            className="py-[15px] px-[20px]"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className="py-4 px-8 rounded-full bg-[#4361ee] text-white"
          >
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
      <MobileNav isNavToggle={isNavToggle} setIsNavToggle={setIsNavToggle} />
    </header>
  );
}
