import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaMoneyCheck, FaCog } from "react-icons/fa";

// Example icon mapping (you can improve it)
const icons = {
  overview: <FaTachometerAlt />,
  "work-sheet": <FaMoneyCheck />,
  "payment-history": <FaMoneyCheck />,
  "employee-list": <FaUsers />,
  progress: <FaUsers />,
  "all-employee": <FaUsers />,
  payroll: <FaMoneyCheck />,
  settings: <FaCog />,
};

// Example menu array
const menu = [
  {
    path: "/dashboard/overview",
    label: "Overview",
    key: "overview",
    role: ["admin", "hr", "employee"],
  },
  {
    path: "/dashboard/work-sheet",
    label: "Work-Sheet",
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
    label: "Employee List",
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
    label: "All Employee",
    key: "all-employee",
    role: ["admin"],
  },
  {
    path: "/dashboard/payroll",
    label: "Payroll",
    key: "payroll",
    role: ["admin"],
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    key: "settings",
    role: ["admin", "hr", "employee"],
  },
];

export default function SidebarMenu({ userRole, isCollapsed, setSidebarToggle }) {
  return (
    <nav className="flex flex-col mt-3">
      {menu
        // .filter((item) => item.role.includes(userRole))
        .map((item) => (
          <NavLink
            onClick={() => setSidebarToggle(false)}
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 border-l-4    hover:bg-[#266dfb10] font-secondary  ${
                isActive
                  ? "bg-[#266dfb10] font-semibold text-[#266dfb]  border-[#266dfb] text-base"
                  : "border-transparent text-gray-500"
              }`
            }
          >
            <span className="text-xl">{icons[item.key]}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
    </nav>
  );
}
