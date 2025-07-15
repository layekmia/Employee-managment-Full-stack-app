// import EmployeeOverview from "./EmployeeOverview";
// import HROverview from "./HROverview";
// import AdminOverview from "./AdminOverview";
// import useAuth from "@/hooks/useAuth"; // your auth hook

import useAuth from "@/hook/useAuth";
import EmployeeOverview from "./Employee/EmployeeOverview";
import HrDashboardCards from "./HR/HrOverview";
import HrOverview from "./HR/HrOverview";
import AdminDashboard from "./Admin/AdminDashboard";
import Unauthorized from "@/pages/Unauthorized";

export default function DashboardHome() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  // switch (user.role) {
  //   case "employee":
  //     return <EmployeeOverview />;
  //   case "hr":
  //     return <HrOverview />;
  //   case "admin":
  //     return <AdminDashboard />;
  //   default:
  //     return <Unauthorized/>;
  // }
  return <EmployeeOverview/>
}
