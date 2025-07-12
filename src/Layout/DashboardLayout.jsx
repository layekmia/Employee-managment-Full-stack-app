import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import SidebarMenu from "../components/Dashboard/Sidebar";
import { IoMdNotifications } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { dashboardRouteTitles } from "../utils/helper";
import { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import useAuth from "../hook/useAuth";
import useTheme from "../hook/useTheme";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const title = dashboardRouteTitles[location.pathname] || "Dashboard";

  const { user, signOutUser } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  return (
    <div className="flex min-h-screen relative">
      <aside
        className={`w-[200px] bg-white fixed top-0 bottom-0 shadow-md md:shadow-none z-50 transition-transform duration-300 ${`${
          sidebarToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}`}
      >
        <div className="h-14 flex items-center border-b px-4 bg-white relative">
          <Logo />
          <button
            className="absolute top-2 text-xs right-3 font-bold text-gray-600 md:hidden"
            onClick={() => setSidebarToggle(false)}
          >
            <RxCross1 />
          </button>
        </div>
        <SidebarMenu userRole={user.role} setSidebarToggle={setSidebarToggle} />
      </aside>
      <div className="bg-[#fcfcfc] flex-1 md:ml-[200px] ">
        <nav className=" flex items-center justify-between h-14 border-b px-5 bg-white max-md:w-full md:fixed top-0 md:left-[200px] right-0 z-30">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setSidebarToggle(!sidebarToggle)}
            >
              <HiMiniBars3BottomLeft className="text-xl" />
            </button>
            <h2 className="text-xl font-secondary text-[#212529] font-semibold">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl text-gray-500 cursor-pointer">
              <IoMdNotifications />
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 flex items-center justify-center rounded-md  text-gray-500 ${
                darkMode ? "hover:bg-[#374151]" : "hover:bg-[#f2f2f2]"
              } transition-all duration-300`}
            >
              {darkMode ? (
                <IoSunnySharp className="text-base" />
              ) : (
                <FaMoon className="text-base" />
              )}
            </button>
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover border-[3px] border-blue-600"
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
        </nav>
        <main className="min-h-screen p-5 md:p-8 md:mt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
