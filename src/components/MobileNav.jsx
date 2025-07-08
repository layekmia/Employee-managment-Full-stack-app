import { useEffect, useRef } from "react";

export default function MobileNav({ isNavToggle, setIsNavToggle }) {
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the clicked element is NOT inside navRef
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsNavToggle]);

  return (
    <div
      ref={navRef}
      className={`items-center gap-1 font-primary font-semibold text-base absolute flex-col flex top-20 bg-white left-0 right-0 px-5 py-5 transition-transform duration-300 ${
        isNavToggle ? "-translate-y-0" : "-translate-y-[300px]"
      }`}
    >
      <button className="py-[15px] px-[20px] text-left w-full">Login</button>
      <button className="py-4 px-8 rounded-full bg-[#4361ee] text-white w-full">
        Sign Up
      </button>
    </div>
  );
}
