import { Link } from "react-router-dom";
import SocialMediaLinks from "./SocialMediaLinks";
import Logo from "./Logo";
import useAuth from "@/hook/useAuth";

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-[#2B405A] text-gray-300 py-10 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-center md:justify-between items-center">
        <div className="space-y-8 flex items-center md:items-start flex-col font-secondary">
          <div className="flex items-center md:items-start flex-col justify-center">
            <Logo color="text-white" />
            <p className="max-w-sm text-sm text-white mt-1">
              Employee monitoring and timesheets for remote teams
            </p>
          </div>
          {!user && (
            <Link
              to="/signup"
              className="inline-block bg-[#4361EE] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-600 transition"
            >
              Create Account
            </Link>
          )}
        </div>

        <div className="flex justify-start md:justify-end font-medium">
          <div className=" flex flex-col gap-3 text-sm text-white">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact Us
            </Link>
          </div>
        </div>

        <div>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
