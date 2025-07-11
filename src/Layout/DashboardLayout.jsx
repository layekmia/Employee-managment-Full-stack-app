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

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const title = dashboardRouteTitles[location.pathname] || "Dashboard"; 

  const { user, signOutUser } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside
        className={`w-[200px] bg-white fixed top-0 bottom-0 shadow-md md:shadow-none transition-transform duration-300 ${`${
          sidebarToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}`}
      >
        <div className="h-14 flex items-center border-b px-4 bg-[#fcfcfc] relative">
          <Logo />
          <button
            className="absolute top-2 right-3 font-bold text-gray-600 md:hidden"
            onClick={() => setSidebarToggle(false)}
          >
            <RxCross1 />
          </button>
        </div>
        <SidebarMenu userRole="hr" setSidebarToggle={setSidebarToggle} />
      </aside>
      <div className="bg-gray-50 flex-1 md:ml-[200px] ">
        <nav className=" flex items-center justify-between h-14 border-b px-5 bg-[#fcfcfc] max-md:w-full md:fixed top-0 md:left-[200px] right-0">
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
          <div className="flex items-center gap-5">
            <span className="text-2xl text-gray-500 cursor-pointer">
              <IoMdNotifications />
            </span>
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
        <main className="min-h-screen p-5 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
