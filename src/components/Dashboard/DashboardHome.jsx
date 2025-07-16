import useAuth from "@/hook/useAuth";
import EmployeeOverview from "./Employee/EmployeeOverview";
import HrOverview from "./HR/HrOverview";
import AdminDashboard from "./Admin/AdminDashboard";
import Unauthorized from "@/pages/Unauthorized";
import Spinner from "../Dashboard/Spinner";

export default function DashboardHome() {
  const { user } = useAuth();

  if (!user) return <Spinner />;

  switch (user.role) {
    case "employee":
      return <EmployeeOverview />;
    case "hr":
      return <HrOverview />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Unauthorized />;
  }
}
