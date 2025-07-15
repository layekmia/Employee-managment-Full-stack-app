// import EmployeeOverview from "./EmployeeOverview";
// import HROverview from "./HROverview";
// import AdminOverview from "./AdminOverview";
// import useAuth from "@/hooks/useAuth"; // your auth hook

import useAuth from "@/hook/useAuth";
import EmployeeOverview from "./EmployeeOverview";

export default function DashboardHome() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  // switch (user.role) {
  //   case "employee":
  //     return <EmployeeOverview />;
  //   case "hr":
  //     return <HROverview />;
  //   case "admin":
  //     return <AdminOverview />;
  //   default:
  //     return <div>Unauthorized Access</div>;
  // }
   return <EmployeeOverview/>
}
