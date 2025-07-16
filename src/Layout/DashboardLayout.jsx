import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import SidebarMenu from "../components/Dashboard/Sidebar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { dashboardRouteTitles } from "../utils/helper";
import { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import useAuth from "../hook/useAuth";
import useTheme from "../hook/useTheme";
import { assets } from "../assets/assets";

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const title = dashboardRouteTitles[location.pathname] || "Dashboard";
  const navigate = useNavigate();


  const { user, signOutUser } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  return (
    <div className="flex min-h-screen relative">
      <aside
        className={`w-[200px] bg-white dark:bg-gray-800 fixed top-0 bottom-0 shadow-md md:shadow-none z-50 transition-transform duration-300 ${`${
          sidebarToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}`}
      >
        <div className="h-14 flex items-center border-b dark:border-b-gray-800 px-4 bg-white dark:bg-gray-800 relative">
          <div
            className="flex items-center gap-1  cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-9" src={assets.logo} alt="" />
            <h2
              className={`text-2xl font-semibold font-primary dark:text-white`}
            >
              WorkSync
            </h2>
          </div>
          <button
            className="absolute top-2 text-xs right-3 font-bold text-gray-600 md:hidden"
            onClick={() => setSidebarToggle(false)}
          >
            <RxCross1 />
          </button>
        </div>
        <SidebarMenu userRole={user.role} setSidebarToggle={setSidebarToggle} />
      </aside>
      <div className="bg-[#fcfcfc] dark:bg-gray-900 flex-1 md:ml-[200px] overflow-hidden">
        <nav className=" flex items-center justify-between h-14 border-b dark:border-gray-800 px-5 bg-white dark:bg-gray-800 max-md:w-full md:fixed top-0 md:left-[200px] right-0 z-30">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setSidebarToggle(!sidebarToggle)}
            >
              <HiMiniBars3BottomLeft className="text-xl" />
            </button>
            <h2 className="text-xl font-secondary text-[#212529] font-semibold dark:text-white">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500  dark:text-gray-300 mr-2 font-secondary text-sm capitalize">
              ({user.role})
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
              <DropdownHeader>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Theme
                  </span>
                </label>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownItem onClick={signOutUser}>Sign out</DropdownItem>
            </Dropdown>
          </div>
        </nav>
        <main className="min-h-screen w-full overflow-x-auto p-4 md:p-8 md:mt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
