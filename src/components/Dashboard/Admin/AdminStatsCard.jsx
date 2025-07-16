import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, UserCog, User, DollarSign } from "lucide-react";

export default function AdminStatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 font-secondary">
      <Card className="bg-gradient-to-tr from-green-500 to-green-700 text-white shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <DollarSign className="text-white h-6 w-6" />
          <h3 className="text-sm">This Month's Salary</h3>
          <p className="text-2xl font-bold">৳ {stats.monthlySalary}</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <Users className="text-white h-6 w-6" />
          <h3 className="text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-tr from-purple-500 to-purple-700 text-white shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <ShieldCheck className="text-white h-6 w-6" />
          <h3 className="text-sm">Admins</h3>
          <p className="text-2xl font-bold">{stats.admins}</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-tr from-teal-500 to-teal-700 text-white shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <UserCog className="text-white h-6 w-6" />
          <h3 className="text-sm">HRs</h3>
          <p className="text-2xl font-bold">{stats.hrs}</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <User className="text-white h-6 w-6" />
          <h3 className="text-sm">Employees</h3>
          <p className="text-2xl font-bold">{stats.employees}</p>
        </CardContent>
      </Card>
    </div>
  );
}
