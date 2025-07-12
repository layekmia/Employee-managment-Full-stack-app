import { HiMiniBars3BottomRight } from "react-icons/hi2";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../hook/useAuth";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

export default function NavBar() {
  const [isNavToggle, setIsNavToggle] = useState(false);
  const navigate = useNavigate();

  const { user, signOutUser } = useAuth();

  return (
    <header className="shadow-md">
      <nav className="flex items-center justify-between max-w mx-auto h-20 bg-white px-5 relative z-20">
        <Logo />
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-2">
            <li className="font-medium font-secondary text-sm">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="font-medium font-secondary text-sm">
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>
          {user ? (
            <div>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <img
                    src={user.image}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full cursor-pointer object-cover border-[3px] border-blue-600"
                  />
                )}
              >
                <DropdownHeader>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </DropdownHeader>
                <DropdownItem>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/dashboard/settings">Settings</Link>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={signOutUser}>Sign out</DropdownItem>
              </Dropdown>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </div>
      </nav>
      <MobileNav isNavToggle={isNavToggle} setIsNavToggle={setIsNavToggle} />
    </header>
  );
}
