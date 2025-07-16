import { NavLink } from "react-router-dom";
import {  FaUsers, FaMoneyCheck, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import { FaMoneyCheckAlt } from "react-icons/fa";

// Example icon mapping (you can improve it)
const icons = {
  overview: <MdDashboard />,
  "work-sheet": <AiOutlineFileText />,
  "payment-history": <FaMoneyCheck />,
  "employee-list": <FaUsers />,
  progress: <GiProgression />,
  "all-employee": <FaUsers />,
  payroll: <FaMoneyCheckAlt />,
  settings: <FaCog />,
};

// Example menu array
const menu = [
  {
    path: "/dashboard/overview",
    label: "Dashboard",
    key: "overview",
    role: ["admin", "hr", "employee"],
  },
  {
    path: "/dashboard/work-sheet",
    label: "Task Records",
    key: "work-sheet",
    role: ["employee"],
  },
  {
    path: "/dashboard/payment-history",
    label: "Payment History",
    key: "payment-history",
    role: ["employee"],
  },
  {
    path: "/dashboard/employee-list",
    label: "Employees",
    key: "employee-list",
    role: ["hr"],
  },
  {
    path: "/dashboard/progress",
    label: "Progress",
    key: "progress",
    role: ["hr"],
  },
  {
    path: "/dashboard/all-employee",
    label: "All Employees",
    key: "all-employee",
    role: ["admin"],
  },
  {
    path: "/dashboard/payroll",
    label: "Payroll",
    key: "payroll",
    role: ["admin"],
  },
];

export default function SidebarMenu({ userRole, setSidebarToggle }) {
  return (
    <nav className="flex flex-col mt-3">
      {menu
        .filter((item) => item.role.includes(userRole))
        .map((item) => (
          <NavLink
            onClick={() => setSidebarToggle(false)}
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-[6px] px-5 py-3 border-l-4    hover:bg-[#266dfb10] font-secondary  ${
                isActive
                  ? "bg-[#266dfb10] font-semibold text-[#266dfb]  border-[#266dfb] text-base"
                  : "border-transparent text-[#333333] dark:text-white"
              }`
            }
          >
            <span className="text-base text-gray-500 dark:text-gray-200">
              {icons[item.key]}
            </span>
            <span className="font-secondary text-[15.5px]">{item.label}</span>
          </NavLink>
        ))}
    </nav>
  );
}
