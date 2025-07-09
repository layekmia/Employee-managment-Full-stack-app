import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import SidebarMenu from "../components/Dashboard/Sidebar";
import { IoMdNotifications } from "react-icons/io";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { dashboardRouteTitles } from "../utils/helper";
import { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const title = dashboardRouteTitles[location.pathname] || "Dashboard";

  return (
    <div className="flex min-h-screen">
      <aside
        className={`w-[250px] lg:w-[250px] bg-white fixed top-0 bottom-0 shadow-md md:shadow-none transition-transform duration-300 ${`${
          sidebarToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}`}
      >
        <div className="h-16 flex items-center border-b px-4 bg-[#fcfcfc] relative">
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
      <div className="bg-gray-50 flex-1 md:ml-[250px] ">
        <nav className=" flex items-center justify-between h-16 border-b px-5 bg-[#fcfcfc] max-md:w-full md:fixed top-0 md:left-[250px] right-0">
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
            <span className="text-xl text-gray-600">
              <IoMdNotifications />
            </span>
            {/* <div className="cursor-pointer">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div> */}
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <img
                  src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                />
              )}
            >
              <DropdownHeader>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  bonnie@flowbite.com
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
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
